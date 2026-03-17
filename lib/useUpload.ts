import { useState } from "react";

export function useUpload() {
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const upload = async (file: File, projectId: string, assetName: string) => {
        setIsUploading(true);
        setError(null);

        try {
            // 1. Convert file to Base64 for the API route
            const reader = new FileReader();
            const base64Promise = new Promise<string>((resolve, reject) => {
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = error => reject(error);
            });
            reader.readAsDataURL(file);
            const base64File = await base64Promise;

            // 2. Send to our Next.js API route
            const response = await fetch('/api/admin/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    file: base64File,
                    fileName: file.name,
                    projectId,
                    assetName,
                }),
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const data = await response.json();
            setIsUploading(false);
            return data.asset;
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'An error occurred during upload');
            setIsUploading(false);
            throw err;
        }
    };

    return { upload, isUploading, error };
}
