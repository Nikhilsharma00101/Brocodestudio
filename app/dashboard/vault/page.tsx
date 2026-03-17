import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ChevronLeft, FolderKey, FileText, Image as ImageIcon, Video } from "lucide-react";
import { DownloadButton } from "@/components/dashboard/DownloadButton";

export default async function VaultPage() {
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }

    // Fetch user and all their project assets
    const user = await prisma.user.findUnique({
        where: { clerkId: userId },
        include: {
            projects: {
                include: {
                    assets: {
                        orderBy: { createdAt: 'desc' }
                    }
                }
            }
        }
    });

    if (!user) {
        redirect("/sign-in");
    }

    // Flatten assets from all projects
    const allAssets = user.projects.flatMap(project =>
        project.assets.map(asset => ({
            ...asset,
            projectName: project.title
        }))
    ).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    const getIconForType = (type: string) => {
        switch (type) {
            case 'DOCUMENT': return <FileText className="text-blue-400" size={18} />;
            case 'IMAGE': return <ImageIcon className="text-emerald-400" size={18} />;
            case 'VIDEO': return <Video className="text-purple-400" size={18} />;
            default: return <FileText className="text-white/40" size={18} />;
        }
    };

    return (
        <div className="space-y-12 animate-in fade-in zoom-in-[0.99] duration-500 relative z-10">
            {/* Minimal Back Button */}
            <div className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors w-fit group mb-6">
                <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <Link href="/dashboard" className="text-[10px] font-bold tracking-[0.2em] uppercase">Return to Operations</Link>
            </div>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-start gap-6 border-b border-slate-200/50 pb-8">
                <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-500 shadow-sm">
                    <FolderKey size={32} strokeWidth={1.5} />
                </div>
                <div>
                    <h2 className="text-3xl md:text-5xl font-bold font-heading tracking-tighter text-slate-900 mb-2">Global Asset Vault</h2>
                    <p className="text-slate-500 text-sm max-w-xl leading-relaxed">
                        A secure, centralized repository for all high-resolution branding, compliance documentation, and project deliverables.
                    </p>
                </div>
            </div>

            {allAssets.length === 0 ? (
                <div className="p-16 border border-slate-200/50 rounded-3xl text-center glass-card flex flex-col items-center">
                    <FolderKey className="text-slate-300 mb-6" size={48} strokeWidth={1} />
                    <h3 className="text-lg font-bold font-brand mb-1 text-slate-800 uppercase tracking-widest">Vault is Secure</h3>
                    <p className="text-slate-500 text-sm">Assets will be synced automatically upon finalization.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allAssets.map((asset) => (
                        <div key={asset.id} className="group p-6 glass-card rounded-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full hover:shadow-lg hover:shadow-indigo-500/5">
                            <div>
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm text-slate-700 group-hover:text-indigo-600 transition-colors">
                                        {getIconForType(asset.type)}
                                    </div>
                                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] bg-slate-50 text-slate-500 px-3 py-1.5 rounded-md border border-slate-200">
                                        {asset.type}
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2 truncate" title={asset.name}>
                                    {asset.name}
                                </h3>
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                                    <p className="text-xs text-slate-500 font-medium tracking-wide truncate" title={asset.projectName}>
                                        {asset.projectName}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-200/50 flex items-center justify-between">
                                <span className="text-[10px] text-slate-400 font-mono tracking-wider bg-slate-50 px-2 py-1 rounded">
                                    {asset.createdAt.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                </span>
                                <DownloadButton url={asset.url} filename={asset.name} className="px-4 py-2 bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white rounded-lg text-[10px] font-bold tracking-wider uppercase transition-all flex items-center gap-2 shadow-sm" />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
