import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Monitor, RotateCcw, CheckCircle2, Clock, ExternalLink, ChevronRight } from "lucide-react";
import { ReviewActionPanel } from "@/components/dashboard/ReviewActionPanel";

function formatDate(date: Date | string) {
    return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default async function ReviewPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { userId } = await auth();
    if (!userId) redirect("/sign-in");

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) redirect("/sign-in");

    const project = await prisma.project.findUnique({
        where: { id },
        include: {
            demoScreenshots: { orderBy: { createdAt: "asc" } },
            revisions: { orderBy: { createdAt: "desc" } },
        },
    });

    // Security: only the project owner may view this
    if (!project || project.clientId !== user.id) redirect("/dashboard");

    type DemoAsset = NonNullable<typeof project>['demoScreenshots'][number];
    type Revision = NonNullable<typeof project>['revisions'][number];

    // If no demo URL has been set yet, redirect back to timeline
    if (!project.demoUrl) redirect(`/dashboard/project/${id}`);

    const reviewStatusLabel: Record<string, string> = {
        PENDING_REVIEW: "Awaiting Review",
        CHANGES_REQUESTED: "Revision Pending",
        APPROVED: "Approved",
    };

    const isApproved = project.reviewStatus === "APPROVED";
    const hasRevisions = project.revisions.length > 0;

    return (
        <div className="space-y-10 animate-in fade-in zoom-in-[0.99] duration-500 relative z-10">

            {/* ── Breadcrumb ────────────────────────────────── */}
            <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold">
                <Link href="/dashboard" className="hover:text-indigo-600 transition-colors">Dashboard</Link>
                <ChevronRight size={13} />
                <Link href={`/dashboard/project/${id}`} className="hover:text-indigo-600 transition-colors">{project.title}</Link>
                <ChevronRight size={13} />
                <span className="text-slate-600">Review Room</span>
            </div>

            {/* ── Page Header ───────────────────────────────── */}
            <div className="border-b border-slate-200/70 pb-8">
                <Link
                    href={`/dashboard/project/${id}`}
                    className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] font-bold uppercase text-slate-400 hover:text-indigo-600 transition-colors mb-5 group"
                >
                    <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Timeline
                </Link>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold font-heading tracking-tighter text-slate-900 mb-2">
                            {project.title}
                            <span className="text-indigo-400 ml-2">— Review Room</span>
                        </h2>
                        <p className="text-slate-500 text-sm">
                            Preview your project below and share your feedback or approve to proceed to payment.
                        </p>
                    </div>

                    <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-xs font-bold uppercase tracking-widest shrink-0 self-start
                        ${isApproved
                            ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                            : project.reviewStatus === "CHANGES_REQUESTED"
                                ? "bg-orange-50 border-orange-200 text-orange-700"
                                : "bg-amber-50 border-amber-200 text-amber-700"}`}
                    >
                        {isApproved
                            ? <CheckCircle2 size={13} />
                            : project.reviewStatus === "CHANGES_REQUESTED"
                                ? <RotateCcw size={13} />
                                : <Clock size={13} />}
                        {reviewStatusLabel[project.reviewStatus] ?? project.reviewStatus}
                    </div>
                </div>
            </div>

            {/* ── Two Column Layout ─────────────────────────── */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-8 items-start">

                {/* ── LEFT: Demo Preview ─────────────────────── */}
                <div className="space-y-6">

                    {/* Iframe Embed */}
                    <div className="glass-card rounded-2xl overflow-hidden">
                        <div className="flex items-center gap-3 px-5 py-3.5 border-b border-slate-200/50 bg-slate-50/50">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-400/70" />
                                <div className="w-3 h-3 rounded-full bg-amber-400/70" />
                                <div className="w-3 h-3 rounded-full bg-emerald-400/70" />
                            </div>
                            <div className="flex-1 px-4 py-1.5 rounded-md bg-white border border-slate-200 text-xs text-slate-500 font-mono truncate">
                                {project.demoUrl}
                            </div>
                            <a
                                href={project.demoUrl ?? "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-slate-400 hover:text-indigo-600 transition-colors"
                            >
                                <ExternalLink size={14} />
                            </a>
                        </div>

                        <div className="relative" style={{ paddingBottom: "62.5%", height: 0 }}>
                            <iframe
                                src={project.demoUrl ?? ""}
                                title="Project Demo Preview"
                                className="absolute inset-0 w-full h-full border-0"
                                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                                loading="lazy"
                            />
                        </div>
                    </div>

                    {/* Screenshot Gallery */}
                    {project.demoScreenshots.length > 0 && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                                <Monitor size={13} />
                                Feature Screenshots ({project.demoScreenshots.length})
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {project.demoScreenshots.map((shot: DemoAsset) => (
                                    <a
                                        key={shot.id}
                                        href={shot.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative aspect-video rounded-xl overflow-hidden border border-slate-200 bg-slate-50 block hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                                    >
                                        <Image
                                            src={shot.url}
                                            alt={shot.caption ?? "Screenshot"}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        {shot.caption && (
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-2.5">
                                                <p className="text-white text-[11px] font-medium leading-snug">{shot.caption}</p>
                                            </div>
                                        )}
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Revision History (if any) */}
                    {hasRevisions && (
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                                <RotateCcw size={13} />
                                Your Previous Revision Requests
                            </div>
                            <div className="space-y-3">
                                {project.revisions.map((rev: Revision) => (
                                    <div
                                        key={rev.id}
                                        className={`p-4 rounded-xl border flex items-start gap-3
                                            ${rev.status === "OPEN"
                                                ? "bg-orange-50/60 border-orange-200"
                                                : "bg-slate-50/60 border-slate-200"}`}
                                    >
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5
                                            ${rev.status === "OPEN" ? "bg-orange-100" : "bg-emerald-100"}`}
                                        >
                                            {rev.status === "OPEN"
                                                ? <RotateCcw size={11} className="text-orange-500" />
                                                : <CheckCircle2 size={11} className="text-emerald-500" />}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-slate-700 leading-relaxed">{rev.feedback}</p>
                                            <div className="flex items-center gap-3 mt-1.5">
                                                <span className="text-[10px] text-slate-400 font-mono">{formatDate(rev.createdAt)}</span>
                                                <span className={`text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded
                                                    ${rev.status === "OPEN" ? "bg-orange-100 text-orange-600" : "bg-emerald-100 text-emerald-600"}`}>
                                                    {rev.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* ── RIGHT: Sticky Action Panel ─────────────── */}
                <div className="xl:sticky xl:top-24 space-y-4">
                    <div className="glass-premium p-6 rounded-2xl shadow-sm border border-slate-200/60 space-y-5">
                        <div>
                            <h3 className="text-lg font-bold font-brand text-slate-900 mb-1">Your Review</h3>
                            <p className="text-xs text-slate-500 leading-relaxed">
                                Watch the demo, browse the screenshots, then submit your decision below.
                            </p>
                        </div>
                        <div className="h-px bg-slate-100" />
                        <ReviewActionPanel
                            projectId={project.id}
                            reviewStatus={project.reviewStatus}
                        />
                    </div>

                    {/* Quick Info */}
                    <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/50 space-y-3">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Project Info</p>
                        <div className="space-y-2 text-xs">
                            <InfoRow label="Project" value={project.title} />
                            <InfoRow label="Progress" value={`${project.progress}%`} />
                            <InfoRow label="Screenshots" value={`${project.demoScreenshots.length} uploaded`} />
                            <InfoRow label="Revisions" value={`${project.revisions.length} submitted`} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-slate-400">{label}</span>
            <span className="text-slate-700 font-semibold text-right max-w-[60%] truncate">{value}</span>
        </div>
    );
}
