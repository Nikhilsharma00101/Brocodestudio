import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
    ArrowLeft,
    Lightbulb,
    Palette,
    Code2,
    SearchCheck,
    Rocket,
    CheckCircle2,
    Circle,
} from "lucide-react";

const PHASES = [
    { key: "Planning", label: "Planning", description: "Defining scope, architecture, and project roadmap.", icon: Lightbulb, color: "text-indigo-500", bg: "bg-indigo-50 border-indigo-100" },
    { key: "Design", label: "Design", description: "Crafting wireframes, UI/UX, and visual identity.", icon: Palette, color: "text-blue-500", bg: "bg-blue-50 border-blue-100" },
    { key: "Development", label: "Development", description: "Building features, integrations, and core logic.", icon: Code2, color: "text-emerald-500", bg: "bg-emerald-50 border-emerald-100" },
    { key: "Review", label: "Review", description: "Quality assurance, client feedback, and polish.", icon: SearchCheck, color: "text-amber-500", bg: "bg-amber-50 border-amber-100" },
    { key: "Completed", label: "Completed", description: "Launched, delivered, and operational.", icon: Rocket, color: "text-purple-500", bg: "bg-purple-50 border-purple-100" },
];

function getPhaseStatus(phaseKey: string, currentStatus: string) {
    const phaseIndex = PHASES.findIndex((p) => p.key === phaseKey);
    const currentIndex = PHASES.findIndex((p) => p.key === currentStatus);
    if (phaseIndex < currentIndex) return "completed";
    if (phaseIndex === currentIndex) return "current";
    return "upcoming";
}

export default async function ProjectTimelinePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }

    const user = await prisma.user.findUnique({
        where: { clerkId: userId },
    });

    if (!user) {
        redirect("/sign-in");
    }

    const project = await prisma.project.findUnique({
        where: { id },
        include: { assets: true },
    });

    if (!project || project.clientId !== user.id) {
        redirect("/dashboard");
    }

    const currentPhaseIndex = PHASES.findIndex((p) => p.key === project.status);

    return (
        <div className="space-y-12 animate-in fade-in zoom-in-[0.99] duration-500 relative z-10">
            {/* Header */}
            <div className="border-b border-slate-200/50 pb-8">
                <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] font-bold uppercase text-slate-400 hover:text-indigo-600 transition-colors mb-6 group"
                >
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    Return to Dashboard
                </Link>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold font-heading tracking-tighter mb-2 text-slate-900">
                            {project.title}
                        </h2>
                        <p className="text-slate-500 text-sm tracking-wide">Execution Timeline & Status</p>
                    </div>
                    <div className="px-4 py-2 rounded-lg bg-white border border-slate-200 shadow-sm flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)] animate-pulse" />
                        <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest">
                            {project.status}
                        </span>
                    </div>
                </div>
            </div>

            {/* Overall Progress */}
            <div className="p-6 md:p-8 rounded-2xl glass-card">
                <div className="flex justify-between items-end mb-4">
                    <span className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-bold">Lifecycle Completion</span>
                    <span className="text-3xl font-bold font-brand tracking-tighter text-slate-900">{project.progress}<span className="text-lg text-slate-400 font-sans">%</span></span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 border border-slate-200/50 overflow-hidden shadow-inner">
                    <div
                        className="bg-[image:var(--gradient-primary)] h-full rounded-full transition-all duration-1000 ease-out shadow-sm relative"
                        style={{ width: `${project.progress}%` }}
                    >
                        <div className="absolute inset-0 bg-white/20" />
                    </div>
                </div>
            </div>

            {/* Timeline */}
            <div className="relative pl-6 md:pl-10 py-4">
                {/* Vertical line - Thin & Subtle */}
                <div className="absolute left-[2.4rem] md:left-[3.4rem] top-0 bottom-0 w-px bg-gradient-to-b from-white/[0.1] via-white/[0.02] to-transparent pointer-events-none" />

                <div className="space-y-6">
                    {PHASES.map((phase, index) => {
                        const status = getPhaseStatus(phase.key, project.status);
                        const Icon = phase.icon;

                        return (
                            <div key={phase.key} className={`relative flex items-start gap-6 group transition-all duration-500 ${status === "upcoming" ? "opacity-40 grayscale" : "opacity-100"}`}>
                                {/* Node / Dot */}
                                <div className="relative z-10 flex-shrink-0 mt-2">
                                    {status === "completed" ? (
                                        <div className="w-8 h-8 rounded-full bg-white border border-emerald-200 shadow-sm flex items-center justify-center">
                                            <CheckCircle2 size={14} className="text-emerald-500" />
                                        </div>
                                    ) : status === "current" ? (
                                        <div className="w-8 h-8 rounded-full bg-white border-2 border-indigo-500 flex items-center justify-center shadow-[0_4px_10px_rgba(99,102,241,0.2)]">
                                            <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                                        </div>
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center">
                                            <Circle size={10} className="text-slate-300" strokeWidth={3} />
                                        </div>
                                    )}
                                </div>

                                {/* Content Card */}
                                <div
                                    className={`flex-1 p-6 rounded-2xl border transition-all duration-500 ${status === "current"
                                        ? "glass-premium"
                                        : status === "completed"
                                            ? "bg-transparent border-transparent"
                                            : "bg-transparent border-transparent"
                                        }`}
                                >
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-2">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2.5 rounded-xl border ${phase.bg} ${status === "current" ? "shadow-sm bg-white" : ""}`}>
                                                <Icon size={16} className={phase.color} />
                                            </div>
                                            <div>
                                                <h3 className={`text-lg font-bold tracking-tight ${status === "current" ? "text-slate-900" : "text-slate-700"}`}>
                                                    {phase.label}
                                                </h3>
                                                <div className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-semibold mt-0.5">
                                                    Phase 0{index + 1}
                                                </div>
                                            </div>
                                        </div>

                                        {status === "current" && (
                                            <span className="sm:ml-auto w-fit px-3 py-1 rounded-sm text-[9px] font-bold bg-indigo-50 text-indigo-600 border border-indigo-100 uppercase tracking-[0.2em]">
                                                Active Session
                                            </span>
                                        )}
                                    </div>
                                    <p className={`text-sm leading-relaxed mt-4 sm:ml-14 ${status === "current" ? "text-slate-600 font-medium" : "text-slate-500"}`}>
                                        {phase.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Project Metadata Footer */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-slate-200/50">
                <div className="glass-card p-4 rounded-xl">
                    <p className="text-[9px] text-slate-500 mb-1 uppercase tracking-[0.2em] font-bold">Assets Synced</p>
                    <p className="text-2xl font-brand font-bold text-slate-800">{String(project.assets.length).padStart(2, '0')}</p>
                </div>
                <div className="glass-card p-4 rounded-xl">
                    <p className="text-[9px] text-slate-500 mb-1 uppercase tracking-[0.2em] font-bold">Current Phase</p>
                    <p className="text-2xl font-brand font-bold text-slate-800">0{currentPhaseIndex + 1}<span className="text-sm text-slate-400 font-sans">/0{PHASES.length}</span></p>
                </div>
                <div className="col-span-2 md:col-span-2 glass-card p-4 rounded-xl flex flex-col justify-center">
                    <p className="text-[9px] text-slate-500 mb-1 uppercase tracking-[0.2em] font-bold">Last Modified</p>
                    <p className="text-sm font-semibold text-slate-700 tracking-wide">
                        {new Date(project.updatedAt).toLocaleString("en-US", { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' })}
                    </p>
                </div>
            </div>
        </div>
    );
}
