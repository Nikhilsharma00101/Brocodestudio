"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { Users, Target, Lightbulb, Code2, ArrowUpRight, Zap, Shield, Sparkles, Binary, Cpu, Rocket } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { AboutHeroBackground } from "@/components/about/AboutHeroBackground";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * CTA 1: Cipher Core (Hero Primary)
 * Effect: A gravity-defying core with concentric data rings and character cipher morphing.
 */
function CipherCoreCTA({ text }: { text: string }) {
    const [isHovered, setIsHovered] = useState(false);
    const [displayText, setDisplayText] = useState(text);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$";

    useEffect(() => {
        if (!isHovered) {
            return;
        }
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayText(prev =>
                prev.split("").map((_, index) => {
                    if (index < iteration) return text[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join("")
            );
            if (iteration >= text.length) clearInterval(interval);
            iteration += 1 / 3;
        }, 30);
        return () => clearInterval(interval);
    }, [isHovered, text]);

    return (
        <motion.button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setDisplayText(text);
            }}
            className="relative group flex items-center justify-center"
        >
            {/* Concentric Energy Rings */}
            {[...Array(3)].map((_, i) => (
                <motion.div
                    key={i}
                    animate={{
                        rotate: isHovered ? [0, 360] : 0,
                        scale: isHovered ? 1 + i * 0.15 : 1,
                        opacity: isHovered ? 0.3 - i * 0.1 : 0
                    }}
                    transition={{ duration: 10 + i * 5, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border border-cyan-500 rounded-full"
                />
            ))}

            <div className="relative px-12 py-5 bg-black text-white rounded-full font-mono font-bold tracking-widest overflow-hidden border-2 border-white/10 group-hover:border-white/40 transition-colors">
                <motion.div
                    animate={{
                        background: isHovered
                            ? "conic-gradient(from 0deg, transparent, #06b6d4, transparent)"
                            : "none"
                    }}
                    className="absolute inset-0 opacity-20"
                />
                <span className="relative z-10 flex items-center gap-4">
                    {displayText}
                    <ArrowUpRight className={cn("w-5 h-5 transition-transform duration-500", isHovered && "rotate-45")} />
                </span>
            </div>
        </motion.button>
    );
}

/**
 * CTA 2: Prismatic Glass (Hero Secondary)
 * Effect: Spectral light dispersion that breaks into a rainbow at the edges based on mouse angle.
 */
function PrismaticGlassCTA({ children }: { children: React.ReactNode }) {
    const containerRef = useRef<HTMLButtonElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
            mouseX.set(e.clientX - rect.left);
            mouseY.set(e.clientY - rect.top);
        }
    };

    return (
        <button
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative group px-12 py-5 bg-white/5 backdrop-blur-xl rounded-full font-bold transition-all duration-700 overflow-hidden border border-white/20"
        >
            {/* Prismatic Edge Glow */}
            <motion.div
                style={{
                    left: useTransform(mouseX, (v) => `${v}px`),
                    top: useTransform(mouseY, (v) => `${v}px`),
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-tr from-rose-500 via-cyan-400 to-violet-600 blur-[40px] opacity-0 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
            />

            <span className="relative flex items-center gap-2 group-hover:scale-110 transition-transform duration-500 group-hover:text-white">
                {children}
            </span>
        </button>
    );
}

/**
 * CTA 3: Void Warp (Bottom Bridge)
 * Effect: Gravity-well distortion that pulls nearby design elements and particles into its center.
 * Integrated with a 3D depth expansion.
 */
function VoidWarpCTA({ children }: { children: React.ReactNode }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="relative p-20">
            <motion.button
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative z-20 px-20 py-10 bg-black text-white rounded-full font-black text-3xl tracking-tighter uppercase transition-all duration-1000 group"
                animate={{
                    letterSpacing: isHovered ? "0.2em" : "0em",
                    boxShadow: isHovered ? "0 0 80px rgba(6,182,212,0.6)" : "0 0 0px rgba(6,182,212,0)"
                }}
            >
                {/* Internal Warp Effect */}
                <span className="absolute inset-0 rounded-full overflow-hidden">
                    <motion.div
                        animate={{
                            scale: isHovered ? 2 : 1,
                            rotate: isHovered ? 180 : 0
                        }}
                        transition={{ duration: 2, ease: "circOut" }}
                        className="absolute inset-0 bg-gradient-to-br from-cyan-900 via-black to-violet-900 opacity-0 group-hover:opacity-100"
                    />
                </span>

                <span className="relative z-10">{children}</span>

                {/* Satellite Particles */}
                <AnimatePresence>
                    {isHovered && [...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ x: 0, y: 0, opacity: 0 }}
                            animate={{
                                x: Math.cos(i * 45) * 150,
                                y: Math.sin(i * 45) * 150,
                                opacity: [0, 1, 0],
                                scale: [0, 1.5, 0]
                            }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.1,
                                ease: "circOut"
                            }}
                            className="absolute top-1/2 left-1/2 w-2 h-2 bg-cyan-400 rounded-full blur-[1px]"
                        />
                    ))}
                </AnimatePresence>
            </motion.button>

            {/* Background Gravity Distortion */}
            <motion.div
                animate={{
                    scale: isHovered ? 1.5 : 0.8,
                    opacity: isHovered ? 0.1 : 0
                }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-[40px] border-cyan-500 rounded-full blur-[100px] pointer-events-none"
            />
        </div>
    );
}

export default function AboutPage() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

    return (
        <main ref={containerRef} className="relative bg-[#fdfdfd] overflow-hidden">
            <AboutHeroBackground />

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center pt-32 pb-20">
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                        {/* Left Content - Typography Focus */}
                        <div className="lg:col-span-7">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-secondary mb-6">
                                    <Sparkles className="w-4 h-4 text-cyan-600" />
                                    <span className="text-secondary-foreground/80 text-xs font-bold uppercase tracking-widest">
                                        Architecting Digital Futures
                                    </span>
                                </div>

                                <h1 className="text-5xl md:text-8xl font-bold mb-8 tracking-tight leading-[0.9]">
                                    Beyond Code.<br />
                                    <span className="text-gradient">Pure Innovation.</span>
                                </h1>

                                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mb-10">
                                    BroCode Studio is a high-performance digital collective. We bridge the gap between complex engineering and breathtaking design to build legacies, not just websites.
                                </p>

                                <div className="flex flex-wrap gap-8 items-center">
                                    <Link href="/contact">
                                        <CipherCoreCTA text="INITIATE_JOURNEY" />
                                    </Link>
                                    <Link href="/work">
                                        <PrismaticGlassCTA>
                                            REVEAL_PORTFOLIO
                                        </PrismaticGlassCTA>
                                    </Link>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Content - Visual Showcase & Stats */}
                        <div className="lg:col-span-5 relative">
                            <motion.div
                                style={{ y: y1 }}
                                className="relative z-10"
                            >
                                <GlassCard className="p-2 border-none bg-transparent shadow-none">
                                    <div className="relative rounded-3xl overflow-hidden aspect-square shadow-2xl">
                                        <Image
                                            src="/images/about/hero.png"
                                            alt="Digital Craftsmanship"
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                        {/* Floating Badge */}
                                        <motion.div
                                            animate={{ y: [0, -10, 0] }}
                                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                            className="absolute bottom-6 right-6 p-4 glass-card bg-white/10 border-white/20 text-white"
                                        >
                                            <div className="text-xs font-mono opacity-60">SYSTEM_STATUS</div>
                                            <div className="text-sm font-bold flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                                OPERATIONAL
                                            </div>
                                        </motion.div>
                                    </div>
                                </GlassCard>

                                {/* Decorative Floating Elements */}
                                <motion.div
                                    style={{ y: y2 }}
                                    className="absolute -top-12 -left-12 w-24 h-24 glass-card flex items-center justify-center p-4 border-cyan-500/20"
                                >
                                    <Binary className="w-8 h-8 text-cyan-500" />
                                </motion.div>
                                <motion.div
                                    style={{ y: y1 }}
                                    className="absolute -bottom-8 -right-8 w-32 h-32 glass-card flex items-center justify-center p-6 border-violet-500/20"
                                >
                                    <Cpu className="w-12 h-12 text-violet-500" />
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Stats Dashboard */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-24"
                    >
                        <StatItem value="100+" label="Projects Completed" icon={<Rocket className="w-5 h-5" />} />
                        <StatItem value="50+" label="Global Partners" icon={<Users className="w-5 h-5" />} />
                        <StatItem value="1.2M" label="Lines of Code" icon={<Code2 className="w-5 h-5" />} />
                        <StatItem value="99%" label="Success Rate" icon={<Zap className="w-5 h-5" />} />
                    </motion.div>
                </div>
            </section>

            {/* Our Story Section - Bento Style */}
            <section className="py-24 relative z-10">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">The BroCode DNA</h2>
                        <p className="text-muted-foreground text-lg">
                            We don&apos;t follow industry trends; we define them. Our philosophy is rooted in three core pillars that drive every project we touch.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <GlassCard className="p-8 group" hoverEffect={true}>
                            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6 group-hover:bg-cyan-500 group-hover:text-white transition-colors duration-500">
                                <Target className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Precision Engineering</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Our codebases are architected for scale, security, and extreme performance. We believe the back-end should be as beautiful as the front-end.
                            </p>
                        </GlassCard>

                        <GlassCard className="p-8 group" hoverEffect={true}>
                            <div className="w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center mb-6 group-hover:bg-violet-500 group-hover:text-white transition-colors duration-500">
                                <Lightbulb className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Emotive Design</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                We design experiences that resonate. Our visual language is crafted to evoke emotion while ensuring peak usability across all devices.
                            </p>
                        </GlassCard>

                        <GlassCard className="p-8 group" hoverEffect={true}>
                            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center mb-6 group-hover:bg-rose-500 group-hover:text-white transition-colors duration-500">
                                <Shield className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Unyielding Trust</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Transparency is our currency. We work alongside our clients as partners, ensuring clear communication and shared vision at every milestone.
                            </p>
                        </GlassCard>
                    </div>
                </div>
            </section>

            {/* Content Bridge */}
            <section className="py-24 relative z-10">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-4xl mx-auto flex flex-col items-center">
                        <h2 className="text-3xl md:text-7xl font-bold mb-8 tracking-tighter">Ready to Build the Future?</h2>
                        <p className="text-xl text-muted-foreground mb-4">
                            Whether you have a fully-formed idea or just a spark of inspiration, let&apos;s collaborate to make it legendary.
                        </p>
                        <Link href="/contact" className="inline-block">
                            <VoidWarpCTA>
                                TALK_BUSINESS
                            </VoidWarpCTA>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

function StatItem({ value, label, icon }: { value: string; label: string; icon: React.ReactNode }) {
    return (
        <GlassCard className="p-6 text-center border-none shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-center mb-3 text-primary/60">
                {icon}
            </div>
            <div className="text-3xl font-bold mb-1 font-mono tracking-tighter text-gradient">{value}</div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">{label}</div>
        </GlassCard>
    );
}
