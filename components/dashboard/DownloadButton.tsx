"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";

interface DownloadButtonProps {
    url: string;
    filename: string;
    className?: string;
}

export function DownloadButton({ url, filename, className }: DownloadButtonProps) {
    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = async (e: React.MouseEvent) => {
        e.preventDefault();

        if (isDownloading) return;
        setIsDownloading(true);

        try {
            // Fetch the file through our server-side API proxy to bypass Cloudinary CORS
            const proxyUrl = `/api/download?url=${encodeURIComponent(url)}&filename=${encodeURIComponent(filename)}`;
            const response = await fetch(proxyUrl);
            if (!response.ok) {
                const text = await response.text();
                throw new Error(text || "Network response was not ok");
            }

            const blob = await response.blob();

            if (blob.size === 0) {
                throw new Error("Downloaded file is empty");
            }

            // Create a temporary object URL for the blob
            const blobUrl = window.URL.createObjectURL(blob);

            // Create a temporary anchor element and trigger download
            const a = document.createElement("a");
            a.style.display = "none";
            a.href = blobUrl;
            a.download = filename;

            // Append, click, and cleanup after a short delay
            document.body.appendChild(a);
            a.click();

            // Give the browser time to initiate the download before cleanup
            setTimeout(() => {
                window.URL.revokeObjectURL(blobUrl);
                document.body.removeChild(a);
            }, 1000);
        } catch (error) {
            console.error("Download failed:", error);
            // Fallback: just open in a new tab if blob fetching fails
            window.open(url, "_blank");
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <button
            onClick={handleDownload}
            disabled={isDownloading}
            className={className || "px-4 py-2 bg-accent/10 hover:bg-accent text-accent hover:text-black rounded-lg text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-wait"}
        >
            {isDownloading ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
            {isDownloading ? "Downloading..." : "Download"}
        </button>
    );
}
