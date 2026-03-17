import { auth } from "@clerk/nextjs/server";
import { Clock, CheckCircle2, ChevronRight, Activity, FolderKey, Headset, FileText, Image as ImageIcon, Video } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import type { Project, Asset } from "@prisma/client";
import { DownloadButton } from "@/components/dashboard/DownloadButton";

export default async function DashboardPage() {
    const { userId } = await auth();

    if (!userId) {
        return null;
    }

    // Fetch the user and their projects with assets
    const user = await prisma.user.findUnique({
        where: { clerkId: userId },
        include: {
            projects: {
                orderBy: { updatedAt: 'desc' },
                include: {
                    assets: {
                        orderBy: { createdAt: 'desc' },
                        take: 5 // Get some recent assets per project
                    }
                }
            }
        }
    });

    if (!user) {
        return (
            <div className="glass-premium p-12 rounded-2xl text-center shadow-2xl mt-12 max-w-lg mx-auto">
                <Activity className="mx-auto mb-6 text-indigo-400 animate-pulse" size={32} />
                <h2 className="text-xl font-bold font-brand tracking-tight mb-2 text-slate-800">Synchronizing Identity</h2>
                <p className="text-slate-500 text-sm">Provisioning your dedicated client environment.</p>
            </div>
        );
    }

    // Collect recent assets globally for the new widget
    const recentAssets = user.projects
        .flatMap(p => p.assets.map(a => ({ ...a, projectName: p.title })))
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .slice(0, 3); // Top 3 most recent globally

    const getIconForType = (type: string) => {
        switch (type) {
            case 'DOCUMENT': return <FileText className="text-blue-500" size={16} />;
            case 'IMAGE': return <ImageIcon className="text-emerald-500" size={16} />;
            case 'VIDEO': return <Video className="text-purple-500" size={16} />;
            default: return <FileText className="text-slate-400" size={16} />;
        }
    };

    return (
        <div className="space-y-16 animate-in fade-in zoom-in-[0.99] duration-500 relative z-10">
            {/* Header Section */}
            <div>
                <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4 tracking-tighter text-slate-900">
                    Welcome, <span className="text-gradient drop-shadow-sm">{user.name?.split(' ')[0] || "Client"}</span>
                </h2>
                <p className="text-slate-500 text-lg max-w-2xl leading-relaxed">
                    Overview of your active engagements, recent deliverables, and strategic assets.
                </p>
            </div>

            {user.projects.length === 0 ? (
                <div className="glass-card p-16 rounded-3xl text-center relative overflow-hidden group hover:shadow-lg transition-all duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                        <div className="w-16 h-16 bg-white border border-slate-100 shadow-sm rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:border-indigo-100 transition-all duration-500">
                            <Clock className="text-indigo-400 group-hover:text-indigo-600 transition-colors" size={24} />
                        </div>
                        <h3 className="text-xl font-bold font-brand mb-2 text-slate-800">Awaiting Project Initiation</h3>
                        <p className="text-slate-500 text-sm">Your timeline and deliverables will populate here once scoping is complete.</p>
                    </div>
                </div>
            ) : (
                <div className="space-y-16">
                    {/* Command Center Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Quick Links (Left 8 cols) */}
                        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <Link href="/dashboard/vault" className="glass-card group relative p-6 rounded-2xl overflow-hidden flex flex-col justify-between min-h-[160px]">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100/50 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-indigo-200/50 transition-all duration-500 opacity-0 group-hover:opacity-100" />
                                <div className="relative z-10">
                                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-indigo-500 mb-4 group-hover:scale-110 transition-all duration-300">
                                        <FolderKey size={20} strokeWidth={2} />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800 mb-1 tracking-tight">Asset Vault</h3>
                                    <p className="text-xs text-slate-500 leading-relaxed group-hover:text-slate-700 transition-colors">Access high-res brand materials & compliance docs.</p>
                                </div>
                            </Link>

                            <div className="glass-card group relative p-6 rounded-2xl overflow-hidden flex flex-col justify-between cursor-pointer min-h-[160px]">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100/50 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-emerald-200/50 transition-all duration-500 opacity-0 group-hover:opacity-100" />
                                <div className="relative z-10">
                                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-emerald-500 mb-4 group-hover:scale-110 transition-all duration-300">
                                        <Headset size={20} strokeWidth={2} />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800 mb-1 tracking-tight">Active Strategy</h3>
                                    <p className="text-xs text-slate-500 leading-relaxed group-hover:text-slate-700 transition-colors">Connect with your dedicated global growth manager.</p>
                                </div>
                            </div>
                        </div>

                        {/* Recent Deliverables (Right 4 cols) */}
                        <div className="lg:col-span-5 glass-premium p-6 rounded-2xl bg-white flex flex-col">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-[0.15em]">Recent Deliverables</h3>
                                {recentAssets.length > 0 && (
                                    <Link href="/dashboard/vault" className="text-[10px] text-slate-400 hover:text-indigo-600 uppercase tracking-widest font-bold transition-colors">View Vault</Link>
                                )}
                            </div>

                            {recentAssets.length === 0 ? (
                                <div className="flex-1 flex flex-col items-center justify-center text-center text-slate-400 py-8">
                                    <FileText size={24} className="mb-3 opacity-50" strokeWidth={1.5} />
                                    <p className="text-xs uppercase tracking-widest font-medium">No assets synced yet</p>
                                </div>
                            ) : (
                                <div className="space-y-3 flex-1 flex flex-col justify-center">
                                    {recentAssets.map(asset => (
                                        <div key={asset.id} className="group flex items-center justify-between p-3 rounded-xl bg-slate-50/50 border border-slate-100 hover:border-slate-200 hover:bg-white hover:shadow-sm transition-all duration-300">
                                            <div className="flex items-center gap-3 overflow-hidden">
                                                <div className="p-2.5 bg-white shadow-sm rounded-lg border border-slate-100">
                                                    {getIconForType(asset.type)}
                                                </div>
                                                <div className="truncate">
                                                    <p className="text-sm font-semibold text-slate-800 group-hover:text-indigo-700 truncate transition-colors">{asset.name}</p>
                                                    <p className="text-[10px] text-slate-500 uppercase tracking-wider truncate mt-0.5 font-medium">{asset.projectName}</p>
                                                </div>
                                            </div>
                                            <div className="pl-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <DownloadButton url={asset.url} filename={asset.name} className="bg-slate-900 border-none text-white hover:bg-indigo-600 hover:scale-105" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Active Projects Container */}
                    <div>
                        <div className="flex items-center gap-4 mb-8">
                            <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">Active Engagements</h3>
                            <div className="h-px bg-gradient-to-r from-slate-200 to-transparent flex-1" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {user.projects.map((project: Project) => (
                                <div key={project.id} className="glass-card group p-6 rounded-2xl flex flex-col justify-between min-h-[240px]">
                                    <div>
                                        <div className="flex justify-between items-start mb-6">
                                            <div>
                                                <h3 className="text-xl font-bold font-brand tracking-tight mb-2 text-slate-800 group-hover:text-indigo-900 transition-colors">{project.title}</h3>
                                                <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest bg-slate-100 px-2 py-1 rounded w-fit">
                                                    {project.status === 'Completed' ? <CheckCircle2 size={12} className="text-emerald-500" /> : <Activity size={12} className="text-indigo-500" />}
                                                    <span>{project.status}</span>
                                                </div>
                                            </div>
                                            <div className="text-2xl font-bold font-brand tracking-tighter text-slate-900 flex items-baseline gap-1">
                                                {project.progress}<span className="text-sm text-slate-400 font-sans">%</span>
                                            </div>
                                        </div>

                                        <div className="w-full bg-slate-100 rounded-full h-2 mb-8 overflow-hidden shadow-inner">
                                            <div
                                                className="bg-[image:var(--gradient-primary)] h-full rounded-full transition-all duration-1000 ease-out relative"
                                                style={{ width: `${project.progress}%` }}
                                            >
                                                <div className="absolute inset-0 bg-white/20" />
                                            </div>
                                        </div>
                                    </div>

                                    <Link href={`/dashboard/project/${project.id}`} className="w-full py-3 mt-auto text-[11px] uppercase tracking-[0.15em] font-bold rounded-xl bg-slate-900 text-white hover:bg-indigo-600 flex items-center justify-center gap-2 transition-all shadow-md group-hover:shadow-lg">
                                        Explore Timeline <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
