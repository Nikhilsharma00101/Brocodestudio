"use client";

import { useState, useTransition } from "react";
import { approveDemo, requestRevision } from "@/app/actions/review";
import {
    CheckCircle2, MessageSquarePlus, Loader2, AlertTriangle,
    PartyPopper, Send, X, ThumbsUp, RotateCcw
} from "lucide-react";
import { useRouter } from "next/navigation";

interface ReviewActionPanelProps {
    projectId: string;
    reviewStatus: string;
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; description: string }> = {
    PENDING_REVIEW: {
        label: "Awaiting Your Review",
        color: "text-amber-600",
        bg: "bg-amber-50 border-amber-200",
        description: "Please watch the demo above and share your feedback.",
    },
    CHANGES_REQUESTED: {
        label: "Revision Submitted",
        color: "text-orange-600",
        bg: "bg-orange-50 border-orange-200",
        description: "Your feedback has been sent. We'll update the demo and notify you.",
    },
    APPROVED: {
        label: "Demo Approved!",
        color: "text-emerald-600",
        bg: "bg-emerald-50 border-emerald-200",
        description: "Great choice! Proceed to payment to unlock your final assets.",
    },
};

export function ReviewActionPanel({ projectId, reviewStatus }: ReviewActionPanelProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const [mode, setMode] = useState<"idle" | "revision">("idle");
    const [feedback, setFeedback] = useState("");
    const [actionType, setActionType] = useState<"approve" | "revision" | null>(null);
    const [result, setResult] = useState<{ type: "success" | "error"; message: string } | null>(null);

    const config = STATUS_CONFIG[reviewStatus] ?? STATUS_CONFIG.PENDING_REVIEW;
    const isProcessed = reviewStatus !== "PENDING_REVIEW";

    function handleApprove() {
        setResult(null);
        setActionType("approve");
        startTransition(async () => {
            const res = await approveDemo(projectId);
            if (res.success) {
                setResult({ type: "success", message: "Demo approved! Head to the Vault to complete your payment." });
                router.refresh();
            } else {
                setResult({ type: "error", message: res.error ?? "Something went wrong." });
                setActionType(null);
            }
        });
    }

    function handleRevisionSubmit() {
        if (!feedback.trim()) {
            setResult({ type: "error", message: "Please describe what changes you need." });
            return;
        }
        setResult(null);
        setActionType("revision");
        startTransition(async () => {
            const res = await requestRevision(projectId, feedback);
            if (res.success) {
                setFeedback("");
                setMode("idle");
                setResult({ type: "success", message: "Revision request sent! We'll be in touch soon." });
                router.refresh();
            } else {
                setResult({ type: "error", message: res.error ?? "Something went wrong." });
                setActionType(null);
            }
        });
    }

    return (
        <div className="space-y-5">

            {/* Status Banner */}
            <div className={`flex items-start gap-3 p-4 rounded-xl border ${config.bg}`}>
                {reviewStatus === "APPROVED" ? (
                    <ThumbsUp size={16} className={`${config.color} shrink-0 mt-0.5`} />
                ) : reviewStatus === "CHANGES_REQUESTED" ? (
                    <RotateCcw size={16} className={`${config.color} shrink-0 mt-0.5`} />
                ) : (
                    <AlertTriangle size={16} className={`${config.color} shrink-0 mt-0.5`} />
                )}
                <div>
                    <p className={`text-sm font-bold ${config.color}`}>{config.label}</p>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{config.description}</p>
                </div>
            </div>

            {/* Action Result Banner */}
            {result && (
                <div className={`flex items-start gap-2.5 p-4 rounded-xl border text-sm font-semibold animate-in fade-in slide-in-from-top-2 duration-300
                    ${result.type === "success"
                        ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                        : "bg-red-50 border-red-200 text-red-700"}`}
                >
                    {result.type === "success"
                        ? <PartyPopper size={15} className="shrink-0 mt-0.5" />
                        : <AlertTriangle size={15} className="shrink-0 mt-0.5" />}
                    {result.message}
                </div>
            )}

            {/* Actions — only available before approval */}
            {!isProcessed && mode === "idle" && (
                <div className="flex flex-col gap-3">
                    <button
                        onClick={handleApprove}
                        disabled={isPending}
                        className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm transition-all disabled:opacity-50 shadow-lg shadow-emerald-500/20 hover:-translate-y-0.5 active:translate-y-0"
                    >
                        {isPending && actionType === "approve" ? (
                            <><Loader2 size={15} className="animate-spin" /> Processing...</>
                        ) : (
                            <><CheckCircle2 size={15} /> Approve Demo — Looks Great!</>
                        )}
                    </button>

                    <button
                        onClick={() => setMode("revision")}
                        disabled={isPending}
                        className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-slate-100 hover:bg-orange-50 text-slate-700 hover:text-orange-700 font-bold text-sm border border-slate-200 hover:border-orange-200 transition-all disabled:opacity-50"
                    >
                        <MessageSquarePlus size={15} />
                        Request Revision
                    </button>
                </div>
            )}

            {/* Revision Form */}
            {!isProcessed && mode === "revision" && (
                <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className="flex items-center justify-between">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500">
                            Describe the changes needed
                        </label>
                        <button
                            onClick={() => { setMode("idle"); setFeedback(""); setResult(null); }}
                            className="text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            <X size={15} />
                        </button>
                    </div>
                    <textarea
                        rows={5}
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="e.g. The hero section color should be darker, and the CTA button text needs to change to 'Get Started'..."
                        disabled={isPending}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition-all leading-relaxed disabled:opacity-50"
                    />
                    <button
                        onClick={handleRevisionSubmit}
                        disabled={isPending || !feedback.trim()}
                        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white font-bold text-sm transition-all disabled:opacity-50 shadow-md hover:-translate-y-0.5 active:translate-y-0"
                    >
                        {isPending && actionType === "revision" ? (
                            <><Loader2 size={15} className="animate-spin" /> Sending...</>
                        ) : (
                            <><Send size={15} /> Submit Revision Request</>
                        )}
                    </button>
                </div>
            )}

            {/* If approved, show vault link */}
            {reviewStatus === "APPROVED" && (
                <a
                    href="/dashboard/vault"
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all shadow-lg shadow-indigo-500/20 hover:-translate-y-0.5"
                >
                    <PartyPopper size={15} />
                    Go to Vault &amp; Complete Payment
                </a>
            )}
        </div>
    );
}
