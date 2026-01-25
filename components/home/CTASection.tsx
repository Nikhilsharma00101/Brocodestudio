"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Zap, Command } from "lucide-react";

export function CTASection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { current } = containerRef;
        if (!current) return;
        const { left, top, width, height } = current.getBoundingClientRect();
        mouseX.set((e.clientX - left) / width);
        mouseY.set((e.clientY - top) / height);
    };

    const springConfig = { damping: 25, stiffness: 700 };
    const rotateX = useSpring(useTransform(mouseY, [0, 1], [15, -15]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [0, 1], [-15, 15]), springConfig);

    return (
        <section className="py-20 md:py-32 px-4 md:px-6 relative overflow-hidden bg-white">
            <div ref={containerRef} onMouseMove={handleMouseMove} className="container max-w-7xl mx-auto relative perspective-1000">
                <motion.div
                    style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                    className="relative rounded-[3rem] overflow-hidden bg-slate-900 shadow-2xl group"
                >
                    {/* Background Image Parallax layer */}
                    <div className="absolute inset-0 z-0">
                        <motion.div
                            style={{ y, scale: 1.1 }}
                            className="relative w-full h-full"
                        >
                            <Image
                                src="/cta_bg_creative.png"
                                alt="Abstract Digital Horizon"
                                fill
                                className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                                priority
                            />
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90" />

                        {/* Noise Texture Overlay */}
                        <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none noise-bg" />
                    </div>

                    {/* Content Layer */}
                    <div className="relative z-10 px-8 py-20 md:p-24 flex flex-col items-center text-center">

                        {/* Floating Badge */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-xl"
                        >
                            <Sparkles className="w-3 h-3 text-cyan-400" />
                            <span>System Ready to Launch</span>
                        </motion.div>

                        <motion.h2
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.9]"
                        >
                            Elevate Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-violet-300">
                                Digital Potential.
                            </span>
                        </motion.h2>

                        <motion.p
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="max-w-2xl text-xl text-slate-300 mb-12 font-medium leading-relaxed"
                        >
                            Stop settling for the template standard. We engineer bespoke digital experiences that captivate audiences and define market leaders.
                        </motion.p>

                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center gap-8"
                        >
                            <Link href="/contact" className="w-full sm:w-auto">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group relative w-full sm:w-auto h-20 px-12 rounded-[2rem] overflow-hidden bg-white shadow-[0_0_50px_-10px_rgba(255,255,255,0.3)] transition-all"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="absolute inset-0 noise-bg opacity-20" />
                                    <div className="absolute top-0 left-0 w-full h-[200%] bg-gradient-to-b from-transparent via-white/40 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 ease-in-out" />

                                    <span className="relative flex items-center justify-center gap-3 text-lg font-black tracking-wide text-slate-900 group-hover:text-white transition-colors duration-300">
                                        IGNITE PROJECT
                                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-900 text-white group-hover:bg-white group-hover:text-violet-600 transition-all duration-300">
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    </span>
                                </motion.button>
                            </Link>

                            <Link href="/work" className="w-full sm:w-auto">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group relative w-full sm:w-auto h-20 px-12 rounded-[2rem] overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 transition-all hover:bg-white/10 hover:border-white/30"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-transparent to-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="absolute -inset-[100%] bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] opacity-0 group-hover:opacity-20 animate-spin-slow" />

                                    <span className="relative flex items-center justify-center gap-3 text-lg font-bold tracking-wide text-white">
                                        <Command className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                                        VIEW SHOWCASE
                                    </span>
                                </motion.button>
                            </Link>
                        </motion.div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-10 left-10 p-4 border border-white/10 rounded-full hidden md:block animate-spin-slow">
                        <Zap className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div className="absolute bottom-10 right-10 flex items-center gap-4 text-xs font-mono text-slate-500 hidden md:flex">
                        <span>INIT_SEQUENCE_READY</span>
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    </div>

                    {/* Scanline */}
                    <div className="absolute left-0 top-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent h-[4px] w-full animate-scan-vertical" />

                </motion.div>
            </div>
        </section>
    );
}

// Add these custom animations to tailwind config if not present, or use framer-motion for them
// animate-spin-slow: animation: spin 10s linear infinite;
// animate-scan: animation: scan 3s linear infinite;
