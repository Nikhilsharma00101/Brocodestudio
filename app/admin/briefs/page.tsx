import { getBriefs } from "@/app/actions/brief";
import { BriefStatusBadge } from "@/components/admin/BriefStatusBadge";
import { FileText, Clock, User, Calendar, ArrowRight, Inbox } from "lucide-react";
import Link from "next/link";
import type { ProjectBrief } from "@prisma/client";

const PROJECT_TYPE_LABELS: Record<string, string> = {
    LANDING_PAGE: "Landing Page",
    FULL_STACK: "Full Stack App",
    UI_DESIGN: "UI/UX Design",
    ECOMMERCE: "E-commerce Store",
    OTHER: "Custom Project",
};

const BUDGET_LABELS: Record<string, string> = {
    UNDER_500: "Under $500",
    "500_1000": "$500 – $1,000",
    "1000_3000": "$1,000 – $3,000",
    "3000_5000": "$3,000 – $5,000",
    ABOVE_5000: "$5,000+",
    FLEXIBLE: "Flexible",
};

function formatDate(date: Date | string) {
    return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

export default async function BriefsPage() {
    const { briefs } = await getBriefs();

    const pending = briefs?.filter((b: ProjectBrief) => b.status === "PENDING") ?? [];
    const accepted = briefs?.filter((b: ProjectBrief) => b.status === "ACCEPTED") ?? [];
    const rejected = briefs?.filter((b: ProjectBrief) => b.status === "REJECTED") ?? [];

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 mt-8">

            {/* Header */}
            <div className="bg-card/40 border border-border/50 rounded-2xl p-6 backdrop-blur-sm shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-bold font-heading mb-1 tracking-tight text-foreground flex items-center gap-3">
                            <Inbox size={28} className="text-accent-foreground" />
                            Incoming Briefs
                        </h2>
                        <p className="text-muted-foreground text-sm font-medium">
                            Review, quote, and accept briefs submitted by prospective clients.
                        </p>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                        <Stat label="Total" value={briefs?.length ?? 0} color="text-foreground" />
                        <Stat label="Pending" value={pending.length} color="text-amber-400" />
                        <Stat label="Accepted" value={accepted.length} color="text-emerald-400" />
                        <Stat label="Rejected" value={rejected.length} color="text-red-400" />
                    </div>
                </div>
            </div>

            {/* Brief Cards */}
            {(!briefs || briefs.length === 0) ? (
                <div className="text-center p-24 text-muted-foreground glass-card rounded-[2rem] flex flex-col items-center gap-4">
                    <FileText size={56} className="text-border" />
                    <h3 className="text-2xl font-bold text-foreground font-brand">No briefs yet</h3>
                    <p className="text-base font-medium text-muted-foreground">
                        Once a visitor submits a project brief, it will appear here.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {briefs.map((brief: ProjectBrief) => (
                        <Link
                            key={brief.id}
                            href={`/admin/briefs/${brief.id}`}
                            className="group block"
                        >
                            <div className="h-full p-6 glass-card rounded-[1.5rem] flex flex-col gap-4 hover:ring-1 hover:ring-accent/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-lg">

                                {/* Top Row: Status + Type */}
                                <div className="flex items-start justify-between gap-3">
                                    <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-lg bg-accent/10 text-accent-foreground border border-accent/20">
                                        {PROJECT_TYPE_LABELS[brief.projectType] ?? brief.projectType}
                                    </span>
                                    <BriefStatusBadge status={brief.status} size="sm" />
                                </div>

                                {/* Client Info */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <User size={14} className="text-muted-foreground shrink-0" />
                                        <span className="font-bold text-foreground text-base leading-tight truncate">
                                            {brief.name}
                                        </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground truncate pl-5">
                                        {brief.email}
                                    </p>
                                </div>

                                {/* Description preview */}
                                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                                    {brief.description}
                                </p>

                                {/* Footer */}
                                <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/50">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar size={12} />
                                        {formatDate(brief.createdAt)}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock size={12} />
                                        {BUDGET_LABELS[brief.budgetRange] ?? brief.budgetRange}
                                    </div>
                                </div>

                                {/* CTA */}
                                <div className="flex items-center justify-end gap-1.5 text-accent-foreground text-xs font-bold group-hover:gap-3 transition-all duration-200">
                                    View Brief <ArrowRight size={14} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

function Stat({ label, value, color }: { label: string; value: number; color: string }) {
    return (
        <div className="flex flex-col items-center px-4 py-2 rounded-xl border border-border bg-muted/30 min-w-[60px]">
            <span className={`text-2xl font-bold font-mono ${color}`}>{value}</span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">{label}</span>
        </div>
    );
}
