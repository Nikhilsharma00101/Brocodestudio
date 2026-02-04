"use client";

import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
import React, { useEffect, useState } from "react";

const MemoizedTechnicalMarker = ({ index }: { index: number }) => {
    const [randoms] = useState(() => ({
        duration: 5 + Math.random() * 5,
        delay: Math.random() * 10
    }));

    return (
        <motion.div
            className="absolute flex items-center gap-2 font-mono text-[9px] text-indigo-600/40"
            style={{
                left: `${(index * 13) % 100}%`,
                top: `${(index * 17) % 100}%`,
            }}
            animate={{
                y: [0, -40, 0],
                opacity: [0, 0.4, 0],
                scale: [0.8, 1, 0.8],
            }}
            transition={{
                duration: randoms.duration,
                repeat: Infinity,
                delay: randoms.delay,
            }}
        >
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-600/50" />
            <span>0{index + 1} {"//"} SYS_0x{index.toString(16).toUpperCase()}</span>
        </motion.div>
    );
};

const MemoizedParticle = () => {
    const [randoms] = useState(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        xOffset: Math.random() * 40 - 20,
        duration: 10 + Math.random() * 10,
        delay: Math.random() * 5
    }));

    return (
        <motion.div
            className="absolute w-1 h-1 bg-indigo-600/30 rounded-full will-change-transform"
            style={{
                left: `${randoms.left}%`,
                top: `${randoms.top}%`,
            }}
            animate={{
                y: [0, -100, 0],
                x: [0, randoms.xOffset, 0],
                opacity: [0, 0.6, 0],
            }}
            transition={{
                duration: randoms.duration,
                repeat: Infinity,
                ease: "linear",
                delay: randoms.delay,
            }}
        />
    );
};

export const ServicesBackground = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth out the mouse movement
    const springConfig = { damping: 25, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Move setMounted to a timeout to avoid synchronous update warning
        const timer = setTimeout(() => setMounted(true), 0);

        const handleMouseMove = (e: MouseEvent) => {
            // Calculate normalized position between -1 and 1
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;
            mouseX.set(x);
            mouseY.set(y);
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            clearTimeout(timer);
        };
    }, [mouseX, mouseY]);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none bg-[#fcfcfc] will-change-auto">
            {/* Base Grid - Static */}
            <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                    backgroundImage: "linear-gradient(to right, #6366f1 1px, transparent 1px), linear-gradient(to bottom, #6366f1 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />

            {/* Large Isometric Framework - Static */}
            <div className="absolute inset-0 opacity-[0.06]">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="isoGrid" width="100" height="100" patternUnits="userSpaceOnUse">
                            <path d="M 100 0 L 0 50 L 100 100" fill="none" stroke="currentColor" strokeWidth="1" />
                            <path d="M 0 0 L 100 50 L 0 100" fill="none" stroke="currentColor" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#isoGrid)" />
                </svg>
            </div>

            {/* Floating 3D Wireframe Cubes - Optimized with MotionValues */}
            <div className="absolute inset-0">
                {[...Array(6)].map((_, i) => (
                    <CubeWireframe
                        key={i}
                        index={i}
                        mouseX={springX}
                        mouseY={springY}
                    />
                ))}
            </div>

            {/* Dynamic Connecting Lines - Reduced complexity */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.25]">
                <motion.path
                    d="M -100 200 Q 200 100 400 300 T 800 100 T 1200 400 T 1600 200"
                    fill="none"
                    stroke="url(#gradient1)"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="will-change-[stroke-dashoffset]"
                />
                <motion.path
                    d="M -100 600 Q 300 800 600 500 T 1000 700 T 1400 400"
                    fill="none"
                    stroke="url(#gradient2)"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="will-change-[stroke-dashoffset]"
                />
                <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
                        <stop offset="50%" stopColor="#6366f1" stopOpacity="1" />
                        <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
                        <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
                        <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Mouse Follow Spotlight - Optimized with transforms instead of background repaint */}
            <motion.div
                className="absolute inset-0 z-0 opacity-[0.5] will-change-transform"
                style={{
                    background: `radial-gradient(800px circle at 50% 50%, rgba(99, 102, 241, 0.12), transparent 80%)`,
                    x: useTransform(springX, [-1, 1], ["-20%", "20%"]),
                    y: useTransform(springY, [-1, 1], ["-20%", "20%"]),
                }}
            />

            {/* Floating Technical Markers */}
            <div className="absolute inset-0">
                {mounted && [...Array(10)].map((_, i) => (
                    <MemoizedTechnicalMarker key={i} index={i} />
                ))}
            </div>

            {/* Radial Glows - Static assets */}
            <div className="absolute top-1/4 left-1/4 w-[60%] h-[60%] bg-indigo-200/20 blur-[100px] rounded-full" />
            <div className="absolute bottom-1/4 right-1/4 w-[60%] h-[60%] bg-cyan-200/20 blur-[100px] rounded-full" />

            {/* Floating Abstract Particles */}
            <div className="absolute inset-0">
                {mounted && [...Array(25)].map((_, i) => (
                    <MemoizedParticle key={`p-${i}`} />
                ))}
            </div>

            {/* Optimized Noise Texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>
    );
};

// Separated component for better memory management
const CubeWireframe = ({ index, mouseX, mouseY }: { index: number, mouseX: MotionValue<number>, mouseY: MotionValue<number> }) => {
    const x = useTransform(mouseX, (val: number) => val * (index + 1) * 10);
    const y = useTransform(mouseY, (val: number) => val * (index + 1) * 10);

    return (
        <motion.div
            className="absolute will-change-transform"
            style={{
                left: `${15 + index * 15}%`,
                top: `${20 + (index % 3) * 25}%`,
                x,
                y,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
                opacity: [0.15, 0.35, 0.15],
                scale: [1, 1.1, 1],
                rotate: [0, 90, 180, 270, 360]
            }}
            transition={{
                duration: 20 + index * 5,
                repeat: Infinity,
                ease: "linear",
                delay: index * 2
            }}
        >
            <svg width="120" height="120" viewBox="0 0 100 100" className="text-indigo-600 fill-none stroke-current stroke-[0.8]">
                <path d="M50 10 L85 30 L85 70 L50 90 L15 70 L15 30 Z" />
                <path d="M50 10 L50 90" />
                <path d="M15 30 L50 50 L85 30" />
                <path d="M50 50 L50 90" />
            </svg>
        </motion.div>
    );
};
