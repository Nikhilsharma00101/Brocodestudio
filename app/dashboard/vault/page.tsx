import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ChevronLeft, FolderKey, FileText, Image as ImageIcon, Video, Lock, Unlock, CreditCard, CheckCircle2 } from "lucide-react";
import { DownloadButton } from "@/components/dashboard/DownloadButton";

export default async function VaultPage() {
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }

    // Fetch user and all their project assets with unlock status
    const user = await prisma.user.findUnique({
        where: { clerkId: userId },
        include: {
            projects: {
                orderBy: { updatedAt: "desc" },
                include: {
                    assets: { orderBy: { createdAt: "desc" } },
                }
            }
        }
    });

    if (!user) {
        redirect("/sign-in");
    }

    const hasAnyProject = user.projects.length > 0;

    const getIconForType = (type: string) => {
        switch (type) {
            case "DOCUMENT": return <FileText className="text-blue-400" size={18} />;
            case "IMAGE": return <ImageIcon className="text-emerald-400" size={18} />;
            case "VIDEO": return <Video className="text-purple-400" size={18} />;
            default: return <FileText className="text-slate-400" size={18} />;
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
                        Assets are unlocked upon payment completion.
                    </p>
                </div>
            </div>

            {!hasAnyProject ? (
                <div className="p-16 border border-slate-200/50 rounded-3xl text-center glass-card flex flex-col items-center">
                    <FolderKey className="text-slate-300 mb-6" size={48} strokeWidth={1} />
                    <h3 className="text-lg font-bold font-brand mb-1 text-slate-800 uppercase tracking-widest">Vault is Secure</h3>
                    <p className="text-slate-500 text-sm">Assets will be synced automatically upon finalization.</p>
                </div>
            ) : (
                <div className="space-y-12">
                    {user.projects.map((project) => {
                        const isUnlocked = project.isUnlocked;
                        const isApproved = project.reviewStatus === "APPROVED";
                        const hasAssets = project.assets.length > 0;

                        return (
                            <div key={project.id} className="space-y-5">
                                {/* Project Section Header */}
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-7 h-7 rounded-full flex items-center justify-center border
                                            ${isUnlocked ? "bg-emerald-50 border-emerald-200" : "bg-slate-100 border-slate-200"}`}
                                        >
                                            {isUnlocked
                                                ? <Unlock size={13} className="text-emerald-600" />
                                                : <Lock size={13} className="text-slate-400" />}
                                        </div>
                                        <h3 className="font-bold text-slate-800 tracking-tight">{project.title}</h3>
                                        <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-md border
                                            ${isUnlocked
                                                ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                                                : "bg-slate-100 text-slate-500 border-slate-200"}`}
                                        >
                                            {isUnlocked ? "Unlocked" : "Locked"}
                                        </span>
                                    </div>
                                    <Link
                                        href={`/dashboard/project/${project.id}`}
                                        className="text-[10px] text-slate-400 hover:text-indigo-600 uppercase tracking-widest font-bold transition-colors"
                                    >
                                        View Timeline →
                                    </Link>
                                </div>

                                {/* No assets yet */}
                                {!hasAssets && (
                                    <div className="p-10 rounded-2xl border-2 border-dashed border-slate-200 text-center text-slate-400">
                                        <FolderKey size={28} className="mx-auto mb-2 opacity-40" strokeWidth={1.5} />
                                        <p className="text-xs font-medium uppercase tracking-widest">No assets released yet for this project.</p>
                                    </div>
                                )}

                                {/* Assets Grid */}
                                {hasAssets && (
                                    <div className="relative">
                                        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500
                                            ${!isUnlocked ? "blur-sm pointer-events-none select-none opacity-60" : ""}`}
                                        >
                                            {project.assets.map((asset) => (
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
                                                    </div>
                                                    <div className="mt-8 pt-6 border-t border-slate-200/50 flex items-center justify-between">
                                                        <span className="text-[10px] text-slate-400 font-mono tracking-wider bg-slate-50 px-2 py-1 rounded">
                                                            {new Date(asset.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                                                        </span>
                                                        <DownloadButton url={asset.url} filename={asset.name} className="px-4 py-2 bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white rounded-lg text-[10px] font-bold tracking-wider uppercase transition-all flex items-center gap-2 shadow-sm" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Lock Overlay */}
                                        {!isUnlocked && (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-white/70 backdrop-blur-[2px] border border-slate-200/60 shadow-sm">
                                                <div className="text-center max-w-sm px-6 py-8">
                                                    <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 shadow-md flex items-center justify-center mx-auto mb-5">
                                                        <Lock size={28} className="text-slate-400" strokeWidth={1.5} />
                                                    </div>
                                                    <h4 className="text-xl font-bold font-brand text-slate-900 mb-2">Vault Locked</h4>
                                                    <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                                                        {isApproved
                                                            ? "You approved the demo. Complete payment to instantly unlock all your assets."
                                                            : "Review and approve the demo first, then complete payment to unlock your assets."}
                                                    </p>

                                                    {isApproved ? (
                                                        <Link
                                                            href={`/dashboard/payment-demo/${project.id}`}
                                                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all shadow-lg shadow-indigo-500/20 hover:-translate-y-0.5"
                                                        >
                                                            <CreditCard size={15} />
                                                            Complete Payment to Unlock
                                                        </Link>
                                                    ) : (
                                                        <Link
                                                            href={`/dashboard/project/${project.id}/review`}
                                                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white font-bold text-sm transition-all shadow-md hover:-translate-y-0.5"
                                                        >
                                                            <CheckCircle2 size={15} />
                                                            Review &amp; Approve Demo First
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

