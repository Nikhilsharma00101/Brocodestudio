"use client";

import { useState, useTransition } from "react";
import { acceptBrief, rejectBrief } from "@/app/actions/brief";
import { CheckCircle2, XCircle, DollarSign, MessageSquare, Loader2, AlertTriangle, PartyPopper } from "lucide-react";
import { useRouter } from "next/navigation";

interface BriefDetailClientProps {
    briefId: string;
    status: string;
    quotedPrice?: number | null;
    adminNotes?: string | null;
}

export function BriefDetailClient({
    briefId,
    status,
    quotedPrice,
    adminNotes,
}: BriefDetailClientProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const [price, setPrice] = useState(quotedPrice?.toString() ?? "");
    const [notes, setNotes] = useState(adminNotes ?? "");
    const [actionType, setActionType] = useState<"accept" | "reject" | null>(null);
    const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const [confirmReject, setConfirmReject] = useState(false);

    const isAlreadyProcessed = status !== "PENDING";

    function handleAccept() {
        const priceNum = parseFloat(price);
        if (!price || isNaN(priceNum) || priceNum <= 0) {
            setFeedback({ type: "error", message: "Please enter a valid quoted price." });
            return;
        }
        setFeedback(null);
        setActionType("accept");

        startTransition(async () => {
            const result = await acceptBrief(briefId, priceNum, notes);
            if (result.success && result.projectId) {
                setFeedback({ type: "success", message: "Brief accepted! Redirecting to the new project..." });
                router.push(`/admin/projects/${result.projectId}`);
            } else if (result.success) {
                setFeedback({ type: "success", message: "Brief accepted! A project record has been created." });
                router.refresh();
            } else {
                setFeedback({ type: "error", message: result.error ?? "Something went wrong." });
                setActionType(null);
            }
        });
    }

    function handleReject() {
        if (!confirmReject) {
            setConfirmReject(true);
            return;
        }
        setConfirmReject(false);
        setActionType("reject");
        setFeedback(null);

        startTransition(async () => {
            const result = await rejectBrief(briefId);
            if (result.success) {
                setFeedback({ type: "success", message: "Brief has been rejected." });
                router.refresh();
            } else {
                setFeedback({ type: "error", message: result.error ?? "Something went wrong." });
                setActionType(null);
            }
        });
    }

    if (isAlreadyProcessed) {
        return (
            <div className={`p-5 rounded-2xl border flex items-start gap-3
                ${status === "ACCEPTED"
                    ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-400"
                    : "bg-red-500/5 border-red-500/20 text-red-400"}`}
            >
                {status === "ACCEPTED" ? (
                    <CheckCircle2 size={20} className="shrink-0 mt-0.5" />
                ) : (
                    <XCircle size={20} className="shrink-0 mt-0.5" />
                )}
                <div>
                    <p className="font-bold text-sm">
                        {status === "ACCEPTED"
                            ? `Brief accepted — quoted at $${quotedPrice?.toLocaleString()}`
                            : "Brief has been rejected."}
                    </p>
                    {adminNotes && (
                        <p className="text-xs mt-1 opacity-75 leading-relaxed">{adminNotes}</p>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-5">
            {/* Inline Feedback Banner */}
            {feedback && (
                <div className={`p-4 rounded-xl border flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300
                    ${feedback.type === "success"
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                        : "bg-red-500/10 border-red-500/30 text-red-400"}`}
                >
                    {feedback.type === "success" ? (
                        <PartyPopper size={17} className="shrink-0 mt-0.5" />
                    ) : (
                        <AlertTriangle size={17} className="shrink-0 mt-0.5" />
                    )}
                    <p className="text-sm font-semibold leading-snug">{feedback.message}</p>
                </div>
            )}

            {/* Quoted Price Input */}
            <div className="space-y-1.5">
                <label htmlFor="quotedPrice" className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <DollarSign size={12} />
                    Quoted Price (USD)
                </label>
                <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold text-sm">$</span>
                    <input
                        id="quotedPrice"
                        type="number"
                        min="1"
                        step="0.01"
                        placeholder="e.g. 1500"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        disabled={isPending}
                        className="w-full pl-8 pr-4 py-3 rounded-xl border border-border bg-muted/30 text-foreground text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/50 transition-all disabled:opacity-50"
                    />
                </div>
            </div>

            {/* Admin Notes Textarea */}
            <div className="space-y-1.5">
                <label htmlFor="adminNotes" className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    <MessageSquare size={12} />
                    Admin Notes <span className="text-muted-foreground/50 normal-case font-normal tracking-normal">(optional)</span>
                </label>
                <textarea
                    id="adminNotes"
                    rows={3}
                    placeholder="Internal notes about this project, e.g. timeline concerns, tech stack decisions..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    disabled={isPending}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-muted/30 text-foreground text-sm resize-none focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/50 transition-all disabled:opacity-50 leading-relaxed"
                />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
                {/* Accept Button */}
                <button
                    onClick={handleAccept}
                    disabled={isPending}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:-translate-y-0.5 active:translate-y-0"
                >
                    {isPending && actionType === "accept" ? (
                        <><Loader2 size={16} className="animate-spin" /> Accepting...</>
                    ) : (
                        <><CheckCircle2 size={16} /> Accept &amp; Quote</>
                    )}
                </button>

                {/* Reject Button */}
                <button
                    onClick={handleReject}
                    disabled={isPending}
                    className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                        ${confirmReject
                            ? "bg-red-500 text-white shadow-lg shadow-red-500/20 hover:bg-red-400"
                            : "bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30"}`}
                >
                    {isPending && actionType === "reject" ? (
                        <><Loader2 size={16} className="animate-spin" /> Rejecting...</>
                    ) : confirmReject ? (
                        <><AlertTriangle size={16} /> Confirm Reject</>
                    ) : (
                        <><XCircle size={16} /> Reject Brief</>
                    )}
                </button>
            </div>

            {confirmReject && (
                <p className="text-xs text-red-400/80 text-center animate-in fade-in duration-200">
                    Click &quot;Confirm Reject&quot; again to permanently reject this brief.
                </p>
            )}
        </div>
    );
}
