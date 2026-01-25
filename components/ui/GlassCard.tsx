/**
 * @file components/ui/GlassCard.tsx
 * @description A stylized card component with a glassmorphism effect and optional hover animations.
 */

"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export function GlassCard({ children, className, hoverEffect = true, ...props }: GlassCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={hoverEffect ? { y: -5, transition: { duration: 0.2 } } : {}}
            className={cn(
                "glass-card relative overflow-hidden rounded-3xl",
                className
            )}
            {...props}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100 pointer-events-none" />
            {children}
        </motion.div>
    );
}
