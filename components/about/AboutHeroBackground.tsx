"use client";

import { motion } from "framer-motion";
import React from "react";

export const AboutHeroBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none bg-[#fdfdfd]">
            {/* Perspective Grid Floor */}
            <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-[100%] opacity-[0.28]"
                style={{
                    perspective: "1000px",
                    transformStyle: "preserve-3d",
                }}
            >
                <motion.div
                    initial={{ rotateX: 60, y: 0 }}
                    animate={{ y: [0, 40, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, #06b6d4 1px, transparent 1px),
                            linear-gradient(to bottom, #06b6d4 1px, transparent 1px)
                        `,
                        backgroundSize: "60px 60px",
                        maskImage: "linear-gradient(to bottom, transparent, black 40%, black 80%, transparent)",
                    }}
                />
            </div>

            {/* Floating Architectural Pillars */}
            <div className="absolute inset-0">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-[2px] bg-gradient-to-b from-transparent via-violet-500/20 to-transparent"
                        style={{
                            height: "60%",
                            left: `${15 + i * 20}%`,
                            top: "10%",
                        }}
                        animate={{
                            y: [-20, 20, -20],
                            opacity: [0.4, 0.8, 0.4],
                        }}
                        transition={{
                            duration: 8 + i * 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i,
                        }}
                    >
                        {/* Data Node on the pillar */}
                        <div className="absolute top-1/4 -left-1 w-2 h-2 bg-cyan-400 rotate-45 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                        <div className="absolute top-3/4 -left-1 w-2 h-2 bg-violet-400 rotate-45 shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
                    </motion.div>
                ))}
            </div>

            {/* Scanning Laser Line */}
            <motion.div
                className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />

            {/* Large Decorative Text Labels (Blueprint Style) */}
            <div className="absolute inset-0 select-none overflow-hidden text-primary/20">
                <div className="absolute top-[15%] left-[5%] font-mono text-[10px] tracking-[0.5em] uppercase">
                    BROCODE_STUDIO // INNOVATION_LAB
                </div>
                <div className="absolute bottom-[30%] right-[10%] font-mono text-[12px] tracking-[0.5em] uppercase text-right">
                    CRAFTING_DIGITAL_DREAMS
                </div>
                <div className="absolute top-[20%] right-[5%] font-mono text-[10px] rotate-90 tracking-widest uppercase whitespace-nowrap">
                    DESIGN // BUILD // SCALE
                </div>
            </div>

            {/* Structural Geometry - Isometric Slabs */}
            <div className="absolute top-1/4 right-[10%] w-32 h-48 opacity-[0.1]">
                <div className="absolute inset-0 border border-primary rotate-[15deg] skew-x-[10deg]" />
                <div className="absolute inset-0 border border-primary -rotate-[5deg] -translate-x-4 translate-y-4" />
            </div>

            <div className="absolute bottom-1/4 left-[5%] w-48 h-32 opacity-[0.1]">
                <div className="absolute inset-0 border border-primary -rotate-[15deg] skew-y-[10deg]" />
                <div className="absolute inset-0 border border-primary rotate-[5deg] translate-x-4 -translate-y-4" />
            </div>

            {/* Corner Light Aura */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-500/20 blur-[140px] rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-violet-500/20 blur-[140px] rounded-full -translate-x-1/2 translate-y-1/2" />

            {/* Subtle Noise/Grain texture for high-end feel */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />
        </div>
    );
};
