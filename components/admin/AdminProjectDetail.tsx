/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Save, ChevronDown, Check, LayoutDashboard, PenTool, Code2, SearchCheck, CheckCircle2, MessageSquare, Clock, AlertCircle } from "lucide-react";
import Link from "next/link";
import { FileUploader } from "@/components/admin/FileUploader";
import { DemoPanel } from "@/components/admin/DemoPanel";

export default function AdminProjectDetail({ project, assets }: { project: any; assets: any[] }) {
    const router = useRouter();
    const [progress, setProgress] = useState(project.progress);
    const [status, setStatus] = useState(project.status);
    const [isSaving, setIsSaving] = useState(false);
    const [localAssets, setLocalAssets] = useState(assets);
    const [mounted, setMounted] = useState(false);

    const [isPhaseDropdownOpen, setIsPhaseDropdownOpen] = useState(false);
    const phaseDropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (phaseDropdownRef.current && !phaseDropdownRef.current.contains(event.target as Node)) {
                setIsPhaseDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const phases = [
        { id: "Planning", icon: LayoutDashboard, color: "text-blue-500", bg: "bg-blue-500/10" },
        { id: "Design", icon: PenTool, color: "text-purple-500", bg: "bg-purple-500/10" },
        { id: "Development", icon: Code2, color: "text-orange-500", bg: "bg-orange-500/10" },
        { id: "Review", icon: SearchCheck, color: "text-amber-500", bg: "bg-amber-500/10" },
        { id: "Completed", icon: CheckCircle2, color: "text-green-500", bg: "bg-green-500/10" }
    ];

    const currentPhase = phases.find(p => p.id === status) || phases[0];

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const res = await fetch(`/api/admin/projects/${project.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ progress, status })
            });
            if (res.ok) {
                router.refresh();
            }
        } catch (err) {
            console.error(err);
        }
        setIsSaving(false);
    };

    const handleUploadSuccess = (newAsset: any) => {
        setLocalAssets([newAsset, ...localAssets]);
        router.refresh();
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 relative z-10 pt-4">
            <div className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-all w-fit group">
                <div className="p-2 bg-muted rounded-full group-hover:bg-border/50 border border-transparent group-hover:border-border transition-colors">
                    <ChevronLeft size={18} />
                </div>
                <Link href="/admin" className="text-sm font-bold tracking-widest uppercase">Back to Roster</Link>
            </div>

            <div className="flex justify-between items-end border-b border-border/60 pb-8">
                <div>
                    <h2 className="text-4xl font-bold font-brand tracking-tight text-foreground">{project.title}</h2>
                    <p className="text-muted-foreground text-sm mt-2 font-medium">Client: <span className="font-semibold text-foreground">{project.client?.name ?? project.clientId.split('-')[0]}</span>
                        <span className="mx-2 text-border">·</span>
                        <span className="font-mono bg-muted px-2 py-0.5 rounded-md text-xs border border-border">{project.client?.email ?? ""}</span>
                    </p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-6 py-3 bg-[image:var(--gradient-primary)] text-white font-bold tracking-wide rounded-xl hover:opacity-90 active:scale-95 transition-all text-sm flex items-center gap-2 disabled:opacity-50 shadow-md hover:shadow-cyan-500/20 border-glow"
                >
                    <Save size={18} /> {isSaving ? "Saving Nexus..." : "Save Changes"}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Col: Controls */}
                <div className="lg:col-span-1 space-y-8">
                    <div className="p-8 glass-card rounded-[2rem] relative z-50">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                            Execution Status
                        </h3>

                        <div className="space-y-6 text-sm">
                            <div className="relative z-50" ref={phaseDropdownRef}>
                                <label className="block text-xs font-bold text-muted-foreground mb-2 uppercase tracking-wide">Phase</label>
                                <button
                                    onClick={() => setIsPhaseDropdownOpen(!isPhaseDropdownOpen)}
                                    className="w-full bg-background border border-border rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-foreground font-bold shadow-sm transition-all flex items-center justify-between group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`p-1.5 rounded-lg ${currentPhase.bg}`}>
                                            <currentPhase.icon className={`w-4 h-4 ${currentPhase.color}`} />
                                        </div>
                                        {status}
                                    </div>
                                    <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${isPhaseDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isPhaseDropdownOpen && (
                                    <div className="absolute z-[100] w-full mt-2 bg-card border border-border rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                        <ul className="py-2 flex flex-col gap-1 px-2">
                                            {phases.map((phase) => (
                                                <li
                                                    key={phase.id}
                                                    onClick={() => {
                                                        setStatus(phase.id);
                                                        setIsPhaseDropdownOpen(false);
                                                    }}
                                                    className={`px-3 py-2.5 rounded-lg flex items-center justify-between cursor-pointer transition-colors ${status === phase.id ? 'bg-primary/5' : 'hover:bg-muted/60'}`}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className={`p-1.5 rounded-lg ${phase.bg} transition-transform ${status === phase.id ? 'scale-110' : ''}`}>
                                                            <phase.icon className={`w-4 h-4 ${phase.color}`} />
                                                        </div>
                                                        <span className={`font-bold text-sm ${status === phase.id ? 'text-primary' : 'text-foreground'}`}>
                                                            {phase.id}
                                                        </span>
                                                    </div>
                                                    {status === phase.id && (
                                                        <Check className="w-4 h-4 text-primary" />
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <div>
                                <div className="flex justify-between items-end mb-3">
                                    <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wide">Progress</label>
                                    <span className="text-primary font-bold font-mono text-lg">{progress}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0" max="100"
                                    value={progress}
                                    onChange={(e) => setProgress(parseInt(e.target.value))}
                                    className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer
                                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full 
                                    [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:rounded-full"
                                    style={{
                                        background: `linear-gradient(to right, var(--color-primary) ${progress}%, var(--color-muted) ${progress}%)`
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <FileUploader projectId={project.id} onUploadSuccess={handleUploadSuccess} />
                </div>

                {/* Middle Col: Demo Panel */}
                <div className="lg:col-span-1">
                    <DemoPanel
                        projectId={project.id}
                        demoUrl={project.demoUrl ?? null}
                        demoScreenshots={project.demoScreenshots ?? []}
                        reviewStatus={project.reviewStatus}
                    />
                </div>

                {/* Right Col: Vault Preview */}
                <div className="lg:col-span-1">
                    <div className="p-8 glass-card rounded-[2rem] h-full flex flex-col">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                            Vault Registry
                        </h3>

                        {localAssets.length === 0 ? (
                            <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-border rounded-2xl bg-muted/30 text-muted-foreground py-20 min-h-[300px]">
                                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4 border border-border shadow-sm">
                                    <svg className="w-8 h-8 text-muted-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                    </svg>
                                </div>
                                <p className="text-sm font-medium">No assets deployed to the Vault yet.</p>
                            </div>
                        ) : (
                            <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-1">
                                {localAssets.map((asset: any) => (
                                    <div key={asset.id} className="p-5 bg-background border border-border shadow-sm rounded-2xl flex items-center justify-between group hover:border-primary/30 hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5">
                                        <div className="flex items-center gap-5">
                                            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center text-sm font-bold text-primary group-hover:bg-primary/10 transition-colors border border-transparent group-hover:border-primary/20">
                                                {asset.type.substring(0, 3)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-base text-foreground group-hover:text-primary transition-colors leading-tight">{asset.name}</p>
                                                <p className="text-xs text-muted-foreground font-mono mt-1 font-medium z-0">
                                                    {mounted ? new Date(asset.createdAt).toLocaleDateString() : '...'}
                                                </p>
                                            </div>
                                        </div>
                                        <a href={asset.url} target="_blank" rel="noreferrer" className="text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary px-4 py-2 rounded-lg hover:bg-primary/5 transition-colors">
                                            View Root
                                        </a>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Revision History ─────────────────────────── */}
            {project.revisions && project.revisions.length > 0 && (
                <div className="p-8 glass-card rounded-[2rem]">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6 flex items-center gap-2">
                        <MessageSquare size={14} className="text-orange-400" />
                        Client Revision Requests ({project.revisions.length})
                    </h3>
                    <div className="space-y-3">
                        {project.revisions.map((rev: any) => (
                            <div key={rev.id} className={`p-5 rounded-2xl border flex gap-4 items-start
                                ${rev.status === 'OPEN'
                                    ? 'border-orange-500/30 bg-orange-500/5'
                                    : 'border-border/50 bg-muted/20'}`}
                            >
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5
                                    ${rev.status === 'OPEN' ? 'bg-orange-500/20' : 'bg-muted'}`}
                                >
                                    {rev.status === 'OPEN'
                                        ? <AlertCircle size={13} className="text-orange-400" />
                                        : <CheckCircle2 size={13} className="text-emerald-400" />}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm text-foreground leading-relaxed">{rev.feedback}</p>
                                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <Clock size={10} />
                                            {mounted ? new Date(rev.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '...'}
                                        </span>
                                        <span className={`font-bold uppercase tracking-widest text-[9px] px-2 py-0.5 rounded-full
                                            ${rev.status === 'OPEN' ? 'bg-orange-500/10 text-orange-400' : 'bg-emerald-500/10 text-emerald-400'}`}
                                        >
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
    );
}
