"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Terminal, Cpu, Globe, Layers } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    // Parallax effects
    // Parallax effects
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const scale = useTransform(scrollY, [0, 300], [1, 0.9]);

    // Mouse movement for 3D tilt
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const x = (clientX / innerWidth) - 0.5;
        const y = (clientY / innerHeight) - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 100, damping: 30 });
    const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 100, damping: 30 });

    const gridRotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [65, 55]), { stiffness: 50, damping: 20 });
    const gridTranslateY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-80, -120]), { stiffness: 50, damping: 20 });

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative min-h-[100vh] flex items-center justify-center overflow-hidden pt-20 pb-32"
        >
            {/* --- ADVANCED BACKGROUND SYSTEM --- */}

            {/* 1. Perspective Grid (Interactive) */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <motion.div
                    className="absolute inset-0 opacity-[0.2] dark:opacity-[0.1]"
                    style={{
                        backgroundImage: `linear-gradient(to right, #64748b 1px, transparent 1px), linear-gradient(to bottom, #64748b 1px, transparent 1px)`,
                        backgroundSize: '50px 50px',
                        perspective: '1000px',
                        rotateX: gridRotateX,
                        y: gridTranslateY,
                        transformOrigin: 'top',
                    }}
                />

                {/* HUD Lines */}
                <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent" />
                <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-violet-500/20 to-transparent" />
                <div className="absolute left-0 top-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-500/10 to-transparent" />

                <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
            </div>

            {/* 2. Floating Technical Elements (Parallax) */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <FloatingTechIcon Icon={Cpu} delay={0} x="10%" y="20%" rotate={10} />
                <FloatingTechIcon Icon={Globe} delay={1} x="85%" y="15%" rotate={-15} />
                <FloatingTechIcon Icon={Layers} delay={2} x="12%" y="70%" rotate={5} />
                <FloatingTechIcon Icon={Terminal} delay={3} x="82%" y="80%" rotate={-10} />
            </div>

            {/* 3. Animated Light Orbs */}
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-violet-500/10 rounded-full blur-[140px] animate-pulse animation-delay-2000" />

            {/* --- MAIN CONTENT --- */}
            <div className="container relative z-10 px-4 md:px-6">
                <motion.div
                    style={{
                        opacity,
                        scale,
                        rotateX: tiltX,
                        rotateY: tiltY,
                        transformStyle: "preserve-3d"
                    }}
                    className="flex flex-col items-center text-center"
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="group relative mb-8"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-violet-600 rounded-full blur opacity-25 group-hover:opacity-100 transition duration-1000" />
                        <div className="relative flex items-center gap-3 px-6 py-2.5 bg-white/90 dark:bg-slate-950/90 backdrop-blur-2xl rounded-full border border-white/20 shadow-xl">
                            <div className="flex -space-x-1">
                                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse animation-delay-500" />
                                <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse animation-delay-1000" />
                            </div>
                            <span className="text-[10px] sm:text-xs font-black tracking-[0.3em] uppercase text-slate-600 dark:text-slate-400">
                                Luxury Technical Studio
                            </span>
                        </div>
                    </motion.div>

                    {/* Headline */}
                    <div className="relative mb-10">
                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] text-slate-900 selection:bg-cyan-500 selection:text-white"
                        >
                            <span className="inline-block hover:scale-[1.02] transition-transform duration-500">Engineering</span> <br />
                            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-br from-cyan-600 via-blue-700 to-violet-700 pb-4">
                                Digital Magic
                                <motion.span
                                    className="absolute bottom-4 left-0 w-full h-1.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 rounded-full"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ delay: 1, duration: 1.5, ease: "circOut" }}
                                />
                            </span>
                        </motion.h1>

                        {/* Decorative blueprint labels (Refined Background Text) */}
                        <motion.div
                            style={{
                                x: useTransform(mouseX, [-0.5, 0.5], [20, -20]),
                                y: useTransform(mouseY, [-0.5, 0.5], [20, -20]),
                            }}
                            className="absolute -top-16 left-1/2 -translate-x-1/2 text-[14rem] font-black select-none pointer-events-none -z-10 transition-colors duration-500"
                        >
                            <span className="text-transparent stroke-slate-200 dark:stroke-slate-800 opacity-40 uppercase tracking-[0.2em]" style={{ WebkitTextStroke: '2px currentColor' }}>
                                BroCode
                            </span>
                        </motion.div>

                        {/* Coordinate labels */}
                        <div className="hidden xl:block absolute -left-32 top-10 text-[10px] font-mono text-slate-400 rotate-90 tracking-[0.5em] uppercase">
                            X: <motion.span>{useTransform(mouseX, [-0.5, 0.5], ["-500", "500"])}</motion.span>
                        </div>
                        <div className="hidden xl:block absolute -right-32 top-10 text-[10px] font-mono text-slate-400 -rotate-90 tracking-[0.5em] uppercase">
                            Y: <motion.span>{useTransform(mouseY, [-0.5, 0.5], ["-500", "500"])}</motion.span>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="relative max-w-3xl mb-14">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ delay: 1.2, duration: 1 }}
                            className="absolute -left-4 -top-4 w-8 h-8 border-t-2 border-l-2 border-slate-200 rounded-tl-xl"
                        />
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ delay: 1.2, duration: 1 }}
                            className="absolute -right-4 -bottom-4 w-8 h-8 border-b-2 border-r-2 border-slate-200 rounded-br-xl"
                        />
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 1 }}
                            className="text-lg md:text-2xl text-slate-500 leading-relaxed font-medium px-4"
                        >
                            We build high-performance digital ecosystems for
                            <span className="text-slate-900 font-bold mx-2 italic">visionary brands</span>
                            who demand nothing less than perfection.
                        </motion.p>
                    </div>

                    {/* Actions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.8 }}
                        className="flex flex-col sm:flex-row items-center gap-8"
                    >
                        <Link href="/contact">
                            <Button
                                variant="gradient"
                                size="lg"
                                className="h-20 px-12 rounded-[2rem] text-xl font-black shadow-[0_30px_60px_-15px_rgba(6,182,212,0.4)] hover:shadow-[0_40px_70px_-10px_rgba(6,182,212,0.5)] transition-all group overflow-hidden relative"
                            >
                                <motion.div
                                    className="absolute inset-x-0 bottom-0 h-1.5 bg-white/30"
                                    initial={{ x: "-100%" }}
                                    animate={{ x: "100%" }}
                                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                />
                                <span className="flex items-center gap-3">
                                    Launch Project <Terminal className="w-6 h-6 animate-pulse" />
                                </span>
                            </Button>
                        </Link>

                        <Link href="/work" className="group">
                            <div className="flex items-center gap-4 text-slate-900 font-black text-xl hover:text-cyan-600 transition-all">
                                <span className="relative">
                                    Showcase
                                    <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-slate-200 group-hover:bg-cyan-600 transition-all origin-right scale-x-100 group-hover:scale-x-0" />
                                </span>
                                <div className="p-4 rounded-full border-2 border-slate-200 group-hover:border-cyan-600 group-hover:bg-cyan-500 group-hover:text-white transition-all shadow-xl group-hover:shadow-cyan-200">
                                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            {/* Bottom Tech Indicators (Interactive Terminal Style) */}
            <div className="absolute bottom-10 left-0 right-0 z-10 hidden lg:flex justify-center px-6">
                <div className="flex items-center gap-12 px-12 py-5 glass-premium rounded-3xl border-white/40 text-[10px] font-mono uppercase tracking-[0.4em] text-slate-500 shadow-2xl">
                    <div className="flex items-center gap-3">
                        <div className="flex gap-1">
                            <div className="w-1.5 h-3 bg-cyan-500 animate-pulse" />
                            <div className="w-1.5 h-3 bg-cyan-500/50 animate-pulse animation-delay-500" />
                        </div>
                        <span>Uptime: 99.9%</span>
                    </div>
                    <div className="flex items-center gap-4 border-l border-slate-200 pl-12 font-black text-slate-800">
                        <Layers className="w-3 h-3" />
                        <span>Full-Stack Mastery</span>
                    </div>
                    <div className="flex items-center gap-4 border-l border-slate-200 pl-12 text-slate-400">
                        <div className="w-2 h-2 rounded-full border border-slate-300 animate-spin" />
                        <span>Scanning Systems...</span>
                    </div>
                </div>
            </div>


            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
            >
                <div className="w-6 h-10 rounded-full border-2 border-slate-200 flex justify-center p-1.5">
                    <motion.div
                        className="w-1 h-2 bg-slate-200 rounded-full"
                        animate={{ y: [0, 12, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                    />
                </div>
            </motion.div>
        </section>
    );
}

function FloatingTechIcon({ Icon, delay, x, y, rotate }: { Icon: React.ElementType; delay: number; x: string; y: string; rotate: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ delay: 0.5 + delay, duration: 1 }}
            className="absolute hidden md:block" // Hidden on mobile for performance/clarity
            style={{ left: x, top: y, rotate: `${rotate}deg` }}
        >
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    rotate: [rotate, rotate + 5, rotate - 5, rotate]
                }}
                transition={{
                    repeat: Infinity,
                    duration: 5 + delay,
                    ease: "easeInOut"
                }}
                className="p-4 rounded-3xl bg-slate-900 text-white shadow-2xl"
            >
                <Icon className="w-8 h-8" />
            </motion.div>
        </motion.div>
    );
}
