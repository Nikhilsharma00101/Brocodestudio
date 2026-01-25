"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface CreativeCTAProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    variant?: "primary" | "secondary" | "outline";
    showArrow?: boolean;
    magnetic?: boolean;
}

export const CreativeCTA = ({
    children,
    onClick,
    className,
    variant = "primary",
    magnetic = true,
}: CreativeCTAProps) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Magnetic effect motion values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!magnetic || !buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        // Limited movement
        mouseX.set(distanceX * 0.3);
        mouseY.set(distanceY * 0.3);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
    };

    const variants = {
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-white/10 backdrop-blur-md text-foreground border border-white/20",
        outline: "bg-transparent border-2 border-primary text-primary hover:bg-primary/5",
    };

    return (
        <motion.button
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={{ x, y }}
            className={cn(
                "relative flex items-center justify-center gap-3 px-10 py-5 rounded-full font-bold text-lg overflow-hidden transition-shadow duration-500",
                variants[variant],
                isHovered && "shadow-[0_0_40px_rgba(var(--primary-rgb),0.3)]",
                className
            )}
        >
            {/* Liquid Background Effect */}
            <motion.div
                initial={false}
                animate={{
                    clipPath: isHovered
                        ? "circle(150% at 50% 50%)"
                        : "circle(0% at 50% 50%)",
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className={cn(
                    "absolute inset-0 z-0",
                    variant === "primary" ? "bg-gradient-to-br from-cyan-500 to-violet-600" : "bg-white/20"
                )}
            />

            {/* Shine / Glare Effect */}
            <motion.div
                animate={{
                    left: isHovered ? "100%" : "-100%",
                }}
                transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0, ease: "linear" }}
                className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 z-10 pointer-events-none"
            />

            {/* Content Area */}
            <div className="relative z-20 flex items-center gap-2">
                {children}
            </div>

            {/* Border Glow for Primary */}
            {variant === "primary" && (
                <div className="absolute inset-0 rounded-full border border-white/30 z-30 pointer-events-none opacity-50" />
            )}
        </motion.button>
    );
};
