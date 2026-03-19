"use client";

import { useState, useTransition, useRef } from "react";
import { saveDemoUrl, addDemoScreenshot, deleteDemoScreenshot } from "@/app/actions/demo";
import {
    Monitor, Upload, Trash2, ExternalLink, Loader2,
    CheckCircle2, AlertTriangle, Globe, ImagePlus, X, Eye
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface DemoAsset {
    id: string;
    url: string;
    publicId: string;
    caption: string | null;
    createdAt: Date | string;
}

interface DemoPanelProps {
    projectId: string;
    demoUrl: string | null;
    demoScreenshots: DemoAsset[];
    reviewStatus: string;
}

// ─── Converts a File to base64 data URL ───
function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

const REVIEW_STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
    PENDING_REVIEW: { label: "Awaiting Client Review", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/30" },
    CHANGES_REQUESTED: { label: "Changes Requested", color: "text-red-400", bg: "bg-red-500/10 border-red-500/30" },
    APPROVED: { label: "Client Approved ✓", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/30" },
};

export function DemoPanel({ projectId, demoUrl, demoScreenshots, reviewStatus }: DemoPanelProps) {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isPending, startTransition] = useTransition();

    // Demo URL state
    const [urlInput, setUrlInput] = useState(demoUrl ?? "");
    const [urlFeedback, setUrlFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

    // Screenshot upload state
    const [screenshots, setScreenshots] = useState<DemoAsset[]>(demoScreenshots);
    const [uploadFile, setUploadFile] = useState<File | null>(null);
    const [uploadPreview, setUploadPreview] = useState<string | null>(null);
    const [captionInput, setCaptionInput] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [uploadFeedback, setUploadFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

    const reviewConfig = REVIEW_STATUS_CONFIG[reviewStatus] ?? REVIEW_STATUS_CONFIG.PENDING_REVIEW;

    // ── Save Demo URL ──────────────────────────────────────
    function handleSaveUrl() {
        setUrlFeedback(null);
        startTransition(async () => {
            const result = await saveDemoUrl(projectId, urlInput);
            if (result.success) {
                setUrlFeedback({ type: "success", message: "Demo URL saved successfully." });
                router.refresh();
            } else {
                setUrlFeedback({ type: "error", message: result.error ?? "Failed to save." });
            }
        });
    }

    // ── Screenshot File Selection ──────────────────────────
    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploadFile(file);
        const reader = new FileReader();
        reader.onload = () => setUploadPreview(reader.result as string);
        reader.readAsDataURL(file);
    }

    // ── Upload Screenshot ──────────────────────────────────
    async function handleUploadScreenshot() {
        if (!uploadFile) return;
        setIsUploading(true);
        setUploadFeedback(null);

        try {
            const base64 = await fileToBase64(uploadFile);
            const res = await fetch("/api/admin/demo-upload", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ file: base64, caption: captionInput, projectId }),
            });

            const data = await res.json();
            if (!res.ok || !data.success) throw new Error(data.error ?? "Upload failed.");

            // Save to DB via server action
            const saved = await addDemoScreenshot(projectId, data.url, data.publicId, captionInput);
            if (!saved.success || !saved.screenshot) throw new Error(saved.error ?? "DB save failed.");

            setScreenshots((prev) => [saved.screenshot as DemoAsset, ...prev]);
            setUploadFile(null);
            setUploadPreview(null);
            setCaptionInput("");
            if (fileInputRef.current) fileInputRef.current.value = "";
            setUploadFeedback({ type: "success", message: "Screenshot uploaded!" });
            router.refresh();
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Upload failed.";
            setUploadFeedback({ type: "error", message: errorMessage });
        } finally {
            setIsUploading(false);
        }
    }

    // ── Delete Screenshot ──────────────────────────────────
    async function handleDelete(id: string) {
        setDeletingId(id);
        const result = await deleteDemoScreenshot(id, projectId);
        if (result.success) {
            setScreenshots((prev) => prev.filter((s) => s.id !== id));
            router.refresh();
        }
        setDeletingId(null);
    }

    return (
        <div className="space-y-6">

            {/* ── Section Header ───────────────────────────── */}
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    Demo & Preview
                </h3>
                <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border ${reviewConfig.bg} ${reviewConfig.color}`}>
                    {reviewConfig.label}
                </span>
            </div>

            {/* ── Staging URL Card ─────────────────────────── */}
            <div className="p-6 glass-card rounded-[1.5rem] space-y-4">
                <div className="flex items-center gap-2 mb-1">
                    <Globe size={15} className="text-accent-foreground" />
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Staging / Preview URL</span>
                </div>

                <div className="flex gap-3">
                    <input
                        type="url"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        placeholder="https://your-staging-site.vercel.app"
                        disabled={isPending}
                        className="flex-1 px-4 py-3 rounded-xl border border-border bg-muted/30 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/50 transition-all font-medium disabled:opacity-50"
                    />
                    <button
                        onClick={handleSaveUrl}
                        disabled={isPending}
                        className="px-5 py-3 rounded-xl bg-accent/10 hover:bg-accent/20 text-accent-foreground font-bold text-sm border border-accent/30 transition-all disabled:opacity-50 flex items-center gap-2 whitespace-nowrap"
                    >
                        {isPending ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} />}
                        Save URL
                    </button>
                </div>

                {/* Live link */}
                {urlInput && urlInput.startsWith("http") && (
                    <a
                        href={urlInput}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-foreground hover:underline"
                    >
                        <ExternalLink size={11} />
                        Open staging site
                    </a>
                )}

                {urlFeedback && (
                    <Feedback type={urlFeedback.type} message={urlFeedback.message} />
                )}
            </div>

            {/* ── Screenshot Upload ────────────────────────── */}
            <div className="p-6 glass-card rounded-[1.5rem] space-y-4">
                <div className="flex items-center gap-2 mb-1">
                    <ImagePlus size={15} className="text-accent-foreground" />
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Upload Demo Screenshot</span>
                </div>

                {/* Drop Zone */}
                <div
                    className={`relative rounded-xl border-2 border-dashed transition-all duration-200 overflow-hidden
                        ${uploadPreview ? "border-accent/40 bg-accent/5" : "border-border bg-muted/20 hover:border-border/80"}`}
                    onClick={() => !uploadPreview && fileInputRef.current?.click()}
                    style={{ cursor: uploadPreview ? "default" : "pointer" }}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />

                    {uploadPreview ? (
                        <div className="relative aspect-video">
                            <Image src={uploadPreview} alt="Preview" fill className="object-contain" />
                            <button
                                onClick={(e) => { e.stopPropagation(); setUploadFile(null); setUploadPreview(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center hover:bg-black/80 transition-colors"
                            >
                                <X size={13} className="text-white" />
                            </button>
                        </div>
                    ) : (
                        <div className="py-10 flex flex-col items-center gap-2 text-muted-foreground">
                            <Upload size={24} className="mb-1" />
                            <p className="text-sm font-semibold text-foreground">Click to select screenshot</p>
                            <p className="text-xs">PNG, JPG, WebP supported</p>
                        </div>
                    )}
                </div>

                {/* Caption */}
                <input
                    type="text"
                    value={captionInput}
                    onChange={(e) => setCaptionInput(e.target.value)}
                    placeholder="Caption (optional) — e.g. Homepage Hero Section"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all"
                />

                <button
                    onClick={handleUploadScreenshot}
                    disabled={!uploadFile || isUploading}
                    className="w-full py-3 rounded-xl bg-[image:var(--gradient-primary)] text-white font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-md"
                >
                    {isUploading ? (
                        <><Loader2 size={15} className="animate-spin" /> Uploading...</>
                    ) : (
                        <><Upload size={15} /> Upload Screenshot</>
                    )}
                </button>

                {uploadFeedback && (
                    <Feedback type={uploadFeedback.type} message={uploadFeedback.message} />
                )}
            </div>

            {/* ── Screenshots Gallery ──────────────────────── */}
            {screenshots.length > 0 && (
                <div className="space-y-3">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        <Monitor size={12} />
                        Uploaded Screenshots ({screenshots.length})
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                        {screenshots.map((shot) => (
                            <div
                                key={shot.id}
                                className="group relative rounded-xl overflow-hidden border border-border/60 aspect-video bg-muted/30"
                            >
                                <Image
                                    src={shot.url}
                                    alt={shot.caption ?? "Demo screenshot"}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => setLightboxUrl(shot.url)}
                                        className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                                    >
                                        <Eye size={14} className="text-white" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(shot.id)}
                                        disabled={deletingId === shot.id}
                                        className="w-8 h-8 rounded-lg bg-red-500/70 hover:bg-red-500/90 flex items-center justify-center transition-colors disabled:opacity-50"
                                    >
                                        {deletingId === shot.id ? (
                                            <Loader2 size={13} className="animate-spin text-white" />
                                        ) : (
                                            <Trash2 size={13} className="text-white" />
                                        )}
                                    </button>
                                </div>

                                {/* Caption */}
                                {shot.caption && (
                                    <div className="absolute bottom-0 inset-x-0 bg-black/60 px-2 py-1.5">
                                        <p className="text-white text-[10px] font-medium truncate">{shot.caption}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ── Lightbox ─────────────────────────────────── */}
            {lightboxUrl && (
                <div
                    className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4 animate-in fade-in duration-200"
                    onClick={() => setLightboxUrl(null)}
                >
                    <button
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                        onClick={() => setLightboxUrl(null)}
                    >
                        <X size={20} className="text-white" />
                    </button>
                    <div className="relative max-w-5xl w-full max-h-[85vh] aspect-video" onClick={(e) => e.stopPropagation()}>
                        <Image src={lightboxUrl} alt="Screenshot" fill className="object-contain rounded-xl" />
                    </div>
                </div>
            )}
        </div>
    );
}

function Feedback({ type, message }: { type: "success" | "error"; message: string }) {
    return (
        <div className={`flex items-center gap-2 p-3 rounded-xl border text-sm font-semibold animate-in fade-in duration-200
            ${type === "success"
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                : "bg-red-500/10 border-red-500/30 text-red-400"}`}
        >
            {type === "success" ? <CheckCircle2 size={14} /> : <AlertTriangle size={14} />}
            {message}
        </div>
    );
}
