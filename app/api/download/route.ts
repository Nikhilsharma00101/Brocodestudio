import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import cloudinary from '@/lib/cloudinary';
import { inflateRawSync } from 'zlib';

/**
 * Extract the first file from a ZIP buffer.
 * Uses the Central Directory (at end of ZIP) to get accurate file sizes,
 * since Cloudinary ZIPs use data descriptors (sizes are 0 in local headers).
 */
function extractFirstFileFromZip(zipBuffer: Buffer): Buffer {
    // Find the End of Central Directory record (EOCD)
    // EOCD signature: 0x06054b50
    let eocdOffset = -1;
    for (let i = zipBuffer.length - 22; i >= 0; i--) {
        if (zipBuffer.readUInt32LE(i) === 0x06054b50) {
            eocdOffset = i;
            break;
        }
    }

    if (eocdOffset === -1) {
        throw new Error('Invalid ZIP: End of Central Directory not found');
    }

    // Read the Central Directory offset from EOCD
    const cdOffset = zipBuffer.readUInt32LE(eocdOffset + 16);

    // Read the first Central Directory entry
    // Central Directory signature: 0x02014b50
    if (zipBuffer.readUInt32LE(cdOffset) !== 0x02014b50) {
        throw new Error('Invalid ZIP: Central Directory entry not found');
    }

    const compressionMethod = zipBuffer.readUInt16LE(cdOffset + 10);
    const compressedSize = zipBuffer.readUInt32LE(cdOffset + 20);
    const fileNameLength = zipBuffer.readUInt16LE(cdOffset + 28);
    const localHeaderOffset = zipBuffer.readUInt32LE(cdOffset + 42);

    // Now read the local file header to find where data starts
    const localExtraLength = zipBuffer.readUInt16LE(localHeaderOffset + 28);
    const localFileNameLength = zipBuffer.readUInt16LE(localHeaderOffset + 26);
    const dataStart = localHeaderOffset + 30 + localFileNameLength + localExtraLength;

    const compressedData = zipBuffer.subarray(dataStart, dataStart + compressedSize);

    if (compressionMethod === 0) {
        // Stored (no compression)
        return Buffer.from(compressedData);
    } else if (compressionMethod === 8) {
        // Deflate
        return Buffer.from(inflateRawSync(compressedData));
    } else {
        throw new Error(`Unsupported ZIP compression method: ${compressionMethod}`);
    }
}

// Map common MIME types to file extensions
function getExtensionFromContentType(contentType: string): string {
    const mimeMap: Record<string, string> = {
        'image/png': '.png',
        'image/jpeg': '.jpg',
        'image/jpg': '.jpg',
        'image/gif': '.gif',
        'image/webp': '.webp',
        'image/svg+xml': '.svg',
        'application/pdf': '.pdf',
        'video/mp4': '.mp4',
        'video/webm': '.webm',
        'application/zip': '.zip',
    };
    const baseMime = contentType.split(';')[0].trim().toLowerCase();
    return mimeMap[baseMime] || '';
}

// Extract file extension from a URL path
function getExtensionFromUrl(url: string): string {
    try {
        const pathname = new URL(url).pathname;
        const lastSegment = pathname.split('/').pop() || '';
        const dotIndex = lastSegment.lastIndexOf('.');
        if (dotIndex > 0) {
            return lastSegment.substring(dotIndex).toLowerCase();
        }
    } catch {
        // ignore
    }
    return '';
}

/**
 * Parse a Cloudinary URL to extract the public_id and resource_type.
 * Example: https://res.cloudinary.com/dyk47o3ai/image/upload/v1772201013/brocodestudio/op7btsq0f38sjci3mzmx.pdf
 */
function parseCloudinaryUrl(url: string) {
    try {
        const parsedUrl = new URL(url);
        const pathParts = parsedUrl.pathname.split('/');

        const uploadIndex = pathParts.indexOf('upload');
        if (uploadIndex === -1) return null;

        const resourceType = pathParts[uploadIndex - 1] || 'image';

        let afterUpload = pathParts.slice(uploadIndex + 1);

        // Skip version segment (e.g. v1772201013)
        if (afterUpload.length > 0 && /^v\d+$/.test(afterUpload[0])) {
            afterUpload = afterUpload.slice(1);
        }

        // Join remaining parts — this is the public_id WITH extension
        const fullPath = afterUpload.join('/');
        const lastDotIndex = fullPath.lastIndexOf('.');
        const publicId = lastDotIndex > 0 ? fullPath.substring(0, lastDotIndex) : fullPath;
        const extension = lastDotIndex > 0 ? fullPath.substring(lastDotIndex) : '';

        return { resourceType, publicId, extension };
    } catch {
        return null;
    }
}

export async function GET(req: NextRequest) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const url = req.nextUrl.searchParams.get('url');
        const rawFilename = req.nextUrl.searchParams.get('filename') || 'download';

        if (!url) {
            return new NextResponse("Missing URL parameter", { status: 400 });
        }

        let fileBuffer: Buffer = undefined!;
        let contentType = 'application/octet-stream';

        const cloudinaryInfo = parseCloudinaryUrl(url);

        if (cloudinaryInfo) {
            // The Cloudinary CDN (res.cloudinary.com) has ACL restrictions that block direct access.
            // We use the generate_archive API (api.cloudinary.com) which bypasses this restriction.
            // It downloads the file as a ZIP, and we extract the single file from it.
            console.log(`[DOWNLOAD] Using Cloudinary archive API: publicId=${cloudinaryInfo.publicId}, resourceType=${cloudinaryInfo.resourceType}`);

            const zipDownloadUrl = cloudinary.utils.download_zip_url({
                public_ids: [cloudinaryInfo.publicId],
                resource_type: cloudinaryInfo.resourceType as any,
                flatten_folders: true,
            });

            const zipResponse = await fetch(zipDownloadUrl);

            if (!zipResponse.ok) {
                throw new Error(`Cloudinary archive download failed: ${zipResponse.status}`);
            }

            const zipBuffer = Buffer.from(await zipResponse.arrayBuffer());
            console.log(`[DOWNLOAD] Got ZIP archive: ${zipBuffer.length} bytes`);

            // Extract the first file from the ZIP archive
            // ZIP format: files start with local file header signature 0x04034b50
            fileBuffer = extractFirstFileFromZip(zipBuffer);

            if (!fileBuffer || fileBuffer.length === 0) {
                throw new Error('Failed to extract file from ZIP archive');
            }

            console.log(`[DOWNLOAD] Extracted file: ${fileBuffer.length} bytes`);

            // Set content type based on file extension
            const ext = cloudinaryInfo.extension.toLowerCase();
            const extToMime: Record<string, string> = {
                '.pdf': 'application/pdf',
                '.png': 'image/png',
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.gif': 'image/gif',
                '.webp': 'image/webp',
                '.svg': 'image/svg+xml',
                '.mp4': 'video/mp4',
                '.webm': 'video/webm',
                '.zip': 'application/zip',
            };
            contentType = extToMime[ext] || contentType;
        } else {
            // Non-Cloudinary URL — fetch directly
            const response = await fetch(url, { cache: 'no-store' });
            if (!response.ok) {
                throw new Error(`Failed to fetch file: ${response.status} ${response.statusText}`);
            }
            const arrayBuffer = await response.arrayBuffer();
            fileBuffer = Buffer.from(arrayBuffer);
            contentType = response.headers.get('content-type') || contentType;
        }

        if (fileBuffer.length === 0) {
            throw new Error('Downloaded file is empty');
        }

        // Ensure filename has a proper extension
        let filename = rawFilename;
        const hasExtension = /\.[a-zA-Z0-9]{2,5}$/.test(filename);
        if (!hasExtension) {
            const ext = getExtensionFromUrl(url) || getExtensionFromContentType(contentType);
            if (ext) {
                filename = `${filename}${ext}`;
            }
        }

        const safeFilename = filename.replace(/[^\w\s\-_.()]/g, '_');

        return new NextResponse(new Uint8Array(fileBuffer), {
            headers: {
                'Content-Type': contentType,
                'Content-Disposition': `attachment; filename="${safeFilename}"; filename*=UTF-8''${encodeURIComponent(filename)}`,
                'Content-Length': fileBuffer.length.toString(),
                'Cache-Control': 'no-cache, no-store, must-revalidate',
            },
        });

    } catch (error: any) {
        console.error("[PROXY_DOWNLOAD_ERROR]", error);
        return new NextResponse(`Download failed: ${error.message}`, { status: 500 });
    }
}

