import { Clock, CheckCircle2, XCircle } from "lucide-react";

interface BriefStatusBadgeProps {
    status: string;
    size?: "sm" | "md";
}

export function BriefStatusBadge({ status, size = "md" }: BriefStatusBadgeProps) {
    const config = {
        PENDING: {
            icon: Clock,
            label: "Pending",
            className: "bg-amber-500/10 text-amber-400 border-amber-500/30",
        },
        ACCEPTED: {
            icon: CheckCircle2,
            label: "Accepted",
            className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
        },
        REJECTED: {
            icon: XCircle,
            label: "Rejected",
            className: "bg-red-500/10 text-red-400 border-red-500/30",
        },
    }[status] ?? {
        icon: Clock,
        label: status,
        className: "bg-muted text-muted-foreground border-border",
    };

    const Icon = config.icon;
    const isSmall = size === "sm";

    return (
        <span
            className={`inline-flex items-center gap-1.5 font-bold uppercase tracking-widest border rounded-full
                ${isSmall ? "text-[9px] px-2.5 py-1" : "text-[10px] px-3 py-1.5"}
                ${config.className}`}
        >
            <Icon size={isSmall ? 10 : 12} />
            {config.label}
        </span>
    );
}
