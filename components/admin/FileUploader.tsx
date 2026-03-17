"use client";

import { useState } from "react";
import { useUpload } from "@/lib/useUpload";
import { UploadCloud, File, AlertCircle, CheckCircle2 } from "lucide-react";

export function FileUploader({
    projectId,
    onUploadSuccess,
}: {
    projectId: string;
    onUploadSuccess: (asset: any) => void;
}) {
    const [file, setFile] = useState<File | null>(null);
    const [assetName, setAssetName] = useState("");
    const { upload, isUploading, error } = useUpload();

    const handleUpload = async () => {
        if (!file || !assetName) return;

        try {
            const dbAsset = await upload(file, projectId, assetName);
            onUploadSuccess(dbAsset);
            setFile(null);
            setAssetName("");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="p-8 glass-card rounded-[2rem]">
            <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                Upload Asset to Vault
            </h3>

            <div className="space-y-6">
                <div>
                    <label className="block text-xs font-bold text-muted-foreground mb-2 uppercase tracking-wide">Asset Name</label>
                    <input
                        type="text"
                        className="w-full bg-background border border-border rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground font-medium shadow-sm transition-all"
                        placeholder="e.g. Final Logo HD"
                        value={assetName}
                        onChange={(e) => setAssetName(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-muted-foreground mb-2 uppercase tracking-wide">File</label>
                    <div className="relative group cursor-pointer">
                        <input
                            type="file"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                        />
                        <div className={`w-full border-2 border-dashed ${file ? 'border-primary/50 bg-primary/5' : 'border-border/80 bg-background group-hover:bg-muted/50 group-hover:border-border'} rounded-[1.5rem] p-10 flex flex-col items-center justify-center transition-all duration-300 text-center shadow-sm`}>
                            {file ? (
                                <>
                                    <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                        <CheckCircle2 className="w-8 h-8 text-primary" />
                                    </div>
                                    <p className="text-sm font-bold text-foreground mb-1">{file.name}</p>
                                    <p className="text-xs text-muted-foreground font-mono font-medium">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                </>
                            ) : (
                                <>
                                    <div className="w-14 h-14 bg-muted rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm border border-transparent group-hover:border-border">
                                        <UploadCloud className="w-6 h-6 text-muted-foreground" />
                                    </div>
                                    <p className="text-sm font-bold text-foreground">Click or drag file here</p>
                                    <p className="text-xs text-muted-foreground mt-2 font-medium">Supports multiple formats</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="flex items-center gap-2 text-red-600 text-xs bg-red-50 p-3.5 rounded-xl border border-red-100 font-bold">
                        <AlertCircle size={16} /> {error}
                    </div>
                )}

                <button
                    onClick={handleUpload}
                    disabled={!file || !assetName || isUploading}
                    className="w-full py-4 bg-[image:var(--gradient-primary)] text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-all shadow-md hover:shadow-cyan-500/20 active:scale-95 border-glow flex justify-center items-center gap-2"
                >
                    {isUploading ? <><UploadCloud className="animate-bounce w-5 h-5" /> Uploading...</> : "Secure Upload"}
                </button>
            </div>
        </div>
    );
}
