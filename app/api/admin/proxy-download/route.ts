import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function GET(req: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const url = req.nextUrl.searchParams.get('url');
        const filename = req.nextUrl.searchParams.get('filename') || 'download';

        if (!url) {
            return new NextResponse("Missing URL parameter", { status: 400 });
        }

        // Fetch the file from Cloudinary (server-side, avoiding CORS)
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Failed to fetch from remote URL: ${response.statusText}`);
        }

        // Get the file buffer
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Determine content type
        const contentType = response.headers.get('content-type') || 'application/octet-stream';

        // Return the file with headers forcing a download
        return new NextResponse(buffer, {
            headers: {
                'Content-Type': contentType,
                'Content-Disposition': `attachment; filename="${encodeURIComponent(filename)}"`,
                'Content-Length': buffer.length.toString(),
            },
        });

    } catch (error: any) {
        console.error("[PROXY_DOWNLOAD_ERROR]", error);
        return new NextResponse(`Download failed: ${error.message}`, { status: 500 });
    }
}
