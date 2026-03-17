import { v2 as cloudinary } from 'cloudinary';

// Cloudinary connection configuration
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

/**
 * Uploads a file buffer or base64 string to Cloudinary.
 * @param file - Base64 data URI string of the file
 * @param folderName - Optional subfolder in Cloudinary
 * @param resourceType - 'image', 'video', 'raw', or 'auto'
 */
export async function uploadToCloudinary(
    file: string,
    folderName: string = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER || 'brocodestudio',
    resourceType: 'image' | 'video' | 'raw' | 'auto' = 'auto'
) {
    try {
        const result = await cloudinary.uploader.upload(file, {
            folder: folderName,
            resource_type: resourceType,
        });
        return result;
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw new Error('Failed to upload file to Cloudinary');
    }
}

/**
 * Get optimized Cloudinary URL for existing images
 */
export function getOptimizedUrl(publicId: string, width?: number, height?: number) {
    let transformation = 'f_auto,q_auto';
    if (width || height) {
        transformation += `,c_fill`;
        if (width) transformation += `,w_${width}`;
        if (height) transformation += `,h_${height}`;
    }

    return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${transformation}/${publicId}`;
}

export default cloudinary;
