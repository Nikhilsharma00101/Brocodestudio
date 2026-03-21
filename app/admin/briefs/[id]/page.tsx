import { getBriefById } from "@/app/actions/brief";
import { notFound } from "next/navigation";
import { BriefStatusBadge } from "@/components/admin/BriefStatusBadge";
import { BriefDetailClient } from "@/components/admin/BriefDetailClient";
import {
    ArrowLeft, User, Mail, Tag, FileText, Users, Zap,
    Banknote, Clock, Image as ImageIcon, ChevronRight, ExternalLink
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
type BriefAsset = NonNullable<Awaited<ReturnType<typeof getBriefById>>['brief']>['referenceAssets'][number];

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

const TIMELINE_LABELS: Record<string, string> = {
    ASAP: "As soon as possible",
    "1_WEEK": "Within 1 week",
    "2_WEEKS": "Within 2 weeks",
    "1_MONTH": "Within 1 month",
    "3_MONTHS": "Within 3 months",
    FLEXIBLE: "Flexible",
};

function formatDate(date: Date | string) {
    return new Date(date).toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}

interface InfoRowProps {
    icon: React.ReactNode;
    label: string;
    value: string;
}

function InfoRow({ icon, label, value }: InfoRowProps) {
    return (
        <div className="flex items-start gap-4 p-4 rounded-xl bg-muted/20 border border-border/50">
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center border border-accent/20 shrink-0 mt-0.5">
                <span className="text-accent-foreground">{icon}</span>
            </div>
            <div>
                <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-0.5">{label}</p>
                <p className="text-sm font-semibold text-foreground leading-snug">{value}</p>
            </div>
        </div>
    );
}

export default async function BriefDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { brief } = await getBriefById(id);
    if (!brief) notFound();

    const keyFeaturesList = brief.keyFeatures
        ? (brief.keyFeatures as string).split("\n").map((f: string) => f.trim()).filter(Boolean)
        : [];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 mt-8">

            {/* Back Navigation + Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                <Link href="/admin/briefs" className="flex items-center gap-1.5 hover:text-foreground transition-colors group">
                    <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
                    Incoming Briefs
                </Link>
                <ChevronRight size={14} className="opacity-40" />
                <span className="text-foreground font-semibold truncate">{brief.name}&apos;s Brief</span>
                <BriefStatusBadge status={brief.status} size="sm" />
            </div>

            {/* Page Title */}
            <div className="bg-card/40 border border-border/50 rounded-2xl p-6 backdrop-blur-sm shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold font-heading tracking-tight text-foreground flex items-center gap-3">
                            <FileText size={22} className="text-accent-foreground" />
                            {brief.name}&apos;s Project Brief
                        </h2>
                        <p className="text-muted-foreground text-sm mt-1">
                            Submitted on {formatDate(brief.createdAt)}
                        </p>
                    </div>

                    {/* If accepted, show link to created project */}
                    {brief.status === "ACCEPTED" && brief.project && (
                        <Link
                            href={`/admin/projects/${brief.project.id}`}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent/10 hover:bg-accent/20 text-accent-foreground border border-accent/30 text-sm font-bold transition-all"
                        >
                            View Created Project <ExternalLink size={14} />
                        </Link>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 items-start">

                {/* LEFT — Brief Details */}
                <div className="space-y-6">

                    {/* Client Info */}
                    <Section title="Client Information">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <InfoRow icon={<User size={15} />} label="Full Name" value={brief.name} />
                            <InfoRow icon={<Mail size={15} />} label="Email Address" value={brief.email} />
                            <InfoRow
                                icon={<Tag size={15} />}
                                label="Project Type"
                                value={PROJECT_TYPE_LABELS[brief.projectType] ?? brief.projectType}
                            />
                            <InfoRow
                                icon={<Banknote size={15} />}
                                label="Budget Range"
                                value={BUDGET_LABELS[brief.budgetRange] ?? brief.budgetRange}
                            />
                            <InfoRow
                                icon={<Clock size={15} />}
                                label="Timeline"
                                value={TIMELINE_LABELS[brief.timeline] ?? brief.timeline}
                            />
                        </div>
                    </Section>

                    {/* Project Description */}
                    <Section title="Project Description">
                        <div className="p-5 rounded-xl bg-muted/20 border border-border/50">
                            <p className="text-sm text-foreground leading-7 whitespace-pre-wrap">{brief.description}</p>
                        </div>
                    </Section>

                    {/* Target Audience */}
                    {brief.targetAudience && (
                        <Section title="Target Audience">
                            <div className="p-5 rounded-xl bg-muted/20 border border-border/50 flex items-start gap-3">
                                <Users size={16} className="text-accent-foreground shrink-0 mt-0.5" />
                                <p className="text-sm text-foreground leading-relaxed">{brief.targetAudience}</p>
                            </div>
                        </Section>
                    )}

                    {/* Key Features */}
                    {keyFeaturesList.length > 0 && (
                        <Section title="Key Features Requested">
                            <ul className="space-y-2">
                                {keyFeaturesList.map((feature: string, i: number) => (
                                    <li key={i} className="flex items-start gap-3 p-3 rounded-xl bg-muted/20 border border-border/40">
                                        <Zap size={14} className="text-accent-foreground shrink-0 mt-0.5" />
                                        <span className="text-sm text-foreground">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </Section>
                    )}

                    {/* Reference Images */}
                    {brief.referenceAssets && brief.referenceAssets.length > 0 && (
                        <Section title={`Reference Images (${brief.referenceAssets.length})`}>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {brief.referenceAssets.map((asset: BriefAsset) => (
                                    <div key={asset.id} className="group relative rounded-xl overflow-hidden border border-border/60 aspect-video bg-muted/30">
                                        <Image
                                            src={asset.url}
                                            alt={asset.description || "Reference image"}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        {asset.description && (
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-3">
                                                <p className="text-white text-xs font-medium leading-snug line-clamp-3">
                                                    {asset.description}
                                                </p>
                                            </div>
                                        )}
                                        <a
                                            href={asset.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <ExternalLink size={12} className="text-white" />
                                        </a>
                                    </div>
                                ))}
                            </div>
                            {brief.referenceAssets.every((a: BriefAsset) => !a.description) ? null : (
                                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                                    <ImageIcon size={11} />
                                    Hover over images to see the client&apos;s notes.
                                </p>
                            )}
                        </Section>
                    )}
                </div>

                {/* RIGHT — Admin Action Panel */}
                <div className="lg:sticky lg:top-24 space-y-4">
                    <div className="p-6 glass-card rounded-[1.5rem] space-y-5">
                        <div>
                            <h3 className="text-lg font-bold font-brand text-foreground mb-1">Admin Decision</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Set a quoted price and accept to auto-create the project and client record.
                            </p>
                        </div>
                        <div className="h-px bg-border/50" />
                        <BriefDetailClient
                            briefId={brief.id}
                            status={brief.status}
                            quotedPrice={brief.quotedPrice}
                            adminNotes={brief.adminNotes}
                        />
                    </div>

                    {/* Quick Summary Card */}
                    <div className="p-5 rounded-2xl bg-muted/20 border border-border/40 space-y-3">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Quick Summary</h4>
                        <div className="space-y-2 text-sm">
                            <QuickRow label="Type" value={PROJECT_TYPE_LABELS[brief.projectType] ?? brief.projectType} />
                            <QuickRow label="Budget" value={BUDGET_LABELS[brief.budgetRange] ?? brief.budgetRange} />
                            <QuickRow label="Timeline" value={TIMELINE_LABELS[brief.timeline] ?? brief.timeline} />
                            <QuickRow label="Images" value={`${brief.referenceAssets?.length ?? 0} reference(s)`} />
                            <QuickRow label="Features" value={`${keyFeaturesList.length} listed`} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{title}</h3>
            {children}
        </div>
    );
}

function QuickRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center justify-between gap-2">
            <span className="text-muted-foreground text-xs">{label}</span>
            <span className="text-foreground font-semibold text-xs text-right">{value}</span>
        </div>
    );
}
