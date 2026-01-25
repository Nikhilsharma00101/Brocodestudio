"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

const MemoizedMarker = ({ index }: { index: number }) => {
    const [randoms] = useState(() => ({
        duration: 7 + Math.random() * 5,
        delay: Math.random() * 5
    }));

    return (
        <motion.div
            className="absolute flex items-center gap-2 font-mono text-[9px] text-indigo-600/30"
            style={{
                left: `${(index * 17) % 95}%`,
                top: `${(index * 23) % 95}%`,
            }}
            animate={{
                y: [0, -30, 0],
                opacity: [0, 0.5, 0],
            }}
            transition={{
                duration: randoms.duration,
                repeat: Infinity,
                delay: randoms.delay,
            }}
        >
            <div className="w-1 h-1 rounded-full bg-indigo-600/40" />
            <span>ART-ORD_0x{index.toString(16).toUpperCase()} {"//"} {(80 + index * 2)}%</span>
        </motion.div>
    );
};

export const WorkBackground = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20,
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none bg-[#fcfcfc]">
            {/* Base Studio Grid */}
            <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #6366f1 1px, transparent 1px),
                        linear-gradient(to bottom, #6366f1 1px, transparent 1px)
                    `,
                    backgroundSize: "60px 60px",
                }}
            />

            {/* Large Decorative Text - Vertical */}
            <div className="absolute inset-y-0 left-10 flex flex-col justify-center gap-20 opacity-[0.03] select-none">
                {["PORTFOLIO", "SHOWCASE", "CRAFT", "IMPACT"].map((text, i) => (
                    <div key={i} className="text-[120px] font-black rotate-90 leading-none tracking-tighter">
                        {text}
                    </div>
                ))}
            </div>

            {/* Floating Layout Indicators (Blueprint style) */}
            <div className="absolute inset-0">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute border border-indigo-600/10 rounded-sm"
                        style={{
                            left: `${(i * 15 + 5) % 90}%`,
                            top: `${(i * 13 + 10) % 80}%`,
                            width: `${100 + (i % 3) * 50}px`,
                            height: `${80 + (i % 2) * 60}px`,
                        }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{
                            opacity: [0.1, 0.2, 0.1],
                            y: [0, -20, 0],
                            x: mousePosition.x * (i + 1) * 0.1
                        }}
                        transition={{
                            duration: 10 + i * 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border border-indigo-600/20" />
                        <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border border-indigo-600/20" />
                        <div className="absolute top-2 left-2 font-mono text-[8px] text-indigo-600/30">
                            0{i + 1} {"//"} SEC_BLK
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Animated Light Trails */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.15]">
                <motion.path
                    d="M 0 100 Q 250 50 500 150 T 1000 50 T 1500 200"
                    fill="none"
                    stroke="url(#workGradient1)"
                    strokeWidth="1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                />
                <defs>
                    <linearGradient id="workGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
                        <stop offset="50%" stopColor="#6366f1" stopOpacity="1" />
                        <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Dynamic Corner Accents */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/5 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />

            {/* Floating Technical Markers */}
            <div className="absolute inset-0">
                {[...Array(10)].map((_, i) => (
                    <MemoizedMarker key={i} index={i} />
                ))}
            </div>

            {/* Grain Texture */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
            />
        </div>
    );
};
