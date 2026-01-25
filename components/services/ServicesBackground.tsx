"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState, useMemo } from "react";

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

const MemoizedParticle = ({ index }: { index: number }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const unusedIndex = index;
    const [randoms] = useState(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        xOffset: Math.random() * 40 - 20,
        duration: 10 + Math.random() * 10,
        delay: Math.random() * 5
    }));

    return (
        <motion.div
            className="absolute w-1 h-1 bg-indigo-600/30 rounded-full"
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
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMounted(true);
        }, 0);

        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20,
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none bg-[#fcfcfc]">
            {/* Base Grid */}
            <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                    backgroundImage: "linear-gradient(to right, #6366f1 1px, transparent 1px), linear-gradient(to bottom, #6366f1 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />

            {/* Large Isometric Framework */}
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

            {/* Floating 3D Wireframe Cubes */}
            <div className="absolute inset-0">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute"
                        style={{
                            left: `${15 + i * 15}%`,
                            top: `${20 + (i % 3) * 25}%`,
                            x: mousePosition.x * (i + 1) * 0.2,
                            y: mousePosition.y * (i + 1) * 0.2,
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                            opacity: [0.15, 0.35, 0.15],
                            scale: [1, 1.1, 1],
                            rotate: [0, 90, 180, 270, 360]
                        }}
                        transition={{
                            duration: 20 + i * 5,
                            repeat: Infinity,
                            ease: "linear",
                            delay: i * 2
                        }}
                    >
                        <svg width="120" height="120" viewBox="0 0 100 100" className="text-indigo-600 fill-none stroke-current stroke-[0.8]">
                            {/* Cube wireframe */}
                            <path d="M50 10 L85 30 L85 70 L50 90 L15 70 L15 30 Z" />
                            <path d="M50 10 L50 90" />
                            <path d="M15 30 L50 50 L85 30" />
                            <path d="M50 50 L50 90" />
                        </svg>
                    </motion.div>
                ))}
            </div>

            {/* Dynamic Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.25]">
                <motion.path
                    d="M -100 200 Q 200 100 400 300 T 800 100 T 1200 400 T 1600 200"
                    fill="none"
                    stroke="url(#gradient1)"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.path
                    d="M -100 600 Q 300 800 600 500 T 1000 700 T 1400 400"
                    fill="none"
                    stroke="url(#gradient2)"
                    strokeWidth="2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
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

            {/* Kinetic Typography - Value Strings */}
            <div className="absolute inset-0 flex flex-col justify-around py-20 overflow-hidden select-none">
                {["SCALABLE", "TRANSPARENT", "PREMIUM", "DATA-DRIVEN"].map((text, idx) => (
                    <motion.div
                        key={idx}
                        className="text-[12vw] font-black text-black/[0.04] leading-none whitespace-nowrap"
                        style={{ x: idx % 2 === 0 ? "-10%" : "10%" }}
                        animate={{ x: idx % 2 === 0 ? ["-10%", "5%"] : ["10%", "-5%"] }}
                        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                    >
                        {text} {text} {text}
                    </motion.div>
                ))}
            </div>

            {/* Mouse Follow Spotlight */}
            <motion.div
                className="absolute inset-0 z-0 opacity-[0.5]"
                style={{
                    background: `radial-gradient(800px circle at ${mousePosition.x * 50 + 50}% ${mousePosition.y * 50 + 50}%, rgba(99, 102, 241, 0.12), transparent 80%)`,
                }}
            />

            {/* Floating Technical Markers */}
            <div className="absolute inset-0">
                {mounted && [...Array(15)].map((_, i) => (
                    <MemoizedTechnicalMarker key={i} index={i} />
                ))}
            </div>

            {/* Radial Glows */}
            <div className="absolute top-1/4 left-1/4 w-[60%] h-[60%] bg-indigo-200/20 blur-[150px] rounded-full" />
            <div className="absolute bottom-1/4 right-1/4 w-[60%] h-[60%] bg-cyan-200/20 blur-[150px] rounded-full" />

            {/* Floating Abstract Particles */}
            <div className="absolute inset-0">
                {mounted && [...Array(20)].map((_, i) => (
                    <MemoizedParticle key={`p-${i}`} index={i} />
                ))}
            </div>

            {/* Grainy Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.04] mix-blend-multiply pointer-events-none"
                style={{
                    backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
                }}
            />
        </div>
    );
};
