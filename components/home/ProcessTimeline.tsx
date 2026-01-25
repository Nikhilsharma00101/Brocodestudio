"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { Search, PenTool, Code2, Rocket, Terminal, Cpu, Layers, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
    {
        id: "01",
        icon: Search,
        title: "Deep Discovery",
        subtitle: "Architecture & Analysis",
        description: "We dive deep into your brand's DNA, mapping out the technical and visual requirements needed to dominate your market sector.",
        color: "cyan",
        stats: "Querying Database..."
    },
    {
        id: "02",
        icon: PenTool,
        title: "Creative Synthesis",
        subtitle: "Design & Interaction",
        description: "Translating discovery into a high-fidelity visual blueprint. We prototype responsive ecosystems that prioritize luxury and usability.",
        color: "violet",
        stats: "Rendering UI..."
    },
    {
        id: "03",
        icon: Code2,
        title: "Technical Forge",
        subtitle: "Development & Security",
        description: "Engineering the core. We build with extreme technical precision using Next.js, ensuring 100/100 performance and military-grade security.",
        color: "blue",
        stats: "Compiling..."
    },
    {
        id: "04",
        icon: Rocket,
        title: "Launch Sequence",
        subtitle: "Optimization & Scale",
        description: "Strategic deployment and real-time scaling. We monitor performance vitals to ensure your digital vessel maintains optimal trajectory.",
        color: "emerald",
        stats: "Stabilizing..."
    }
];

export function ProcessTimeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const pathLength = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    return (
        <section ref={containerRef} className="relative pt-32 pb-10 overflow-hidden bg-white">
            {/* --- BACKGROUND ARCHITECTURE --- */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
                        backgroundSize: '60px 60px'
                    }}
                />
            </div>

            <div className="container relative z-10 px-4 md:px-6">
                {/* HUD Header */}
                <div className="flex flex-col items-center text-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-3 px-6 py-2 rounded-full glass-premium border-white/40 mb-10"
                    >
                        <Terminal className="w-4 h-4 text-cyan-500" />
                        <span className="text-[10px] font-mono font-black uppercase tracking-[0.5em] text-slate-500">
                            Workflow.Manifest: Stable
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 mb-8"
                    >
                        How We <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-violet-600">Build.</span>
                    </motion.h2>
                    <p className="text-xl text-slate-500 max-w-2xl font-medium leading-relaxed">
                        A systematic, surgical approach to digital creation.
                        No guesswork. Just precision engineering.
                    </p>
                </div>

                {/* Timeline Engine */}
                <div className="relative">
                    {/* Central Backbone (Desktop) */}
                    <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-slate-100 -translate-x-1/2 overflow-hidden rounded-full">
                        <motion.div
                            style={{
                                height: "100%",
                                scaleY: pathLength,
                                transformOrigin: "top"
                            }}
                            className="w-full bg-gradient-to-b from-cyan-500 via-violet-500 to-emerald-500"
                        />
                    </div>

                    <div className="flex flex-col gap-24 lg:gap-0">
                        {steps.map((step, index) => (
                            <ProcessStep
                                key={step.id}
                                step={step}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Status Feed */}
            <div className="mt-20 flex justify-center opacity-20 hover:opacity-100 transition-opacity">
                <div className="flex gap-16 text-[10px] font-mono uppercase tracking-[0.3em] text-slate-400">
                    <span className="flex items-center gap-2"><Zap className="w-3 h-3" /> Input: Vision</span>
                    <span className="flex items-center gap-2 border-l border-slate-200 pl-16"><Layers className="w-3 h-3" /> Process: Evolution</span>
                    <span className="flex items-center gap-2 border-l border-slate-200 pl-16"><Cpu className="w-3 h-3" /> Output: Perfection</span>
                </div>
            </div>
        </section>
    );
}

function ProcessStep({ step, index }: { step: typeof steps[0]; index: number }) {
    const isEven = index % 2 === 0;

    return (
        <div className={cn(
            "flex flex-col lg:flex-row items-center justify-between w-full h-auto lg:h-[400px]",
            !isEven && "lg:flex-row-reverse"
        )}>
            {/* Step Card */}
            <motion.div
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="w-full lg:w-[45%] group"
            >
                <div className="relative p-10 bg-white border border-slate-100 rounded-[3rem] shadow-[0_10px_30px_rgba(0,0,0,0.02)] transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] hover:border-slate-200 lg:group-hover:translate-x-[20px] even:lg:group-hover:-translate-x-[20px]">
                    {/* Header HUD */}
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-50">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Phase Index</span>
                            <span className="text-xl font-black text-slate-900">{step.id}</span>
                        </div>
                        <div className={cn(
                            "px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest",
                            step.color === "cyan" ? "bg-cyan-50 text-cyan-600" :
                                step.color === "violet" ? "bg-violet-50 text-violet-600" :
                                    step.color === "blue" ? "bg-blue-50 text-blue-600" :
                                        "bg-emerald-50 text-emerald-600"
                        )}>
                            {step.stats}
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1">
                                {step.subtitle}
                            </span>
                            <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                                {step.title}
                            </h3>
                        </div>
                        <p className="text-lg text-slate-500 leading-relaxed font-sm">
                            {step.description}
                        </p>
                    </div>

                    {/* Decorative Corner Bracket */}
                    <div className={cn(
                        "absolute -bottom-2 -right-2 w-12 h-12 border-b-4 border-r-4 rounded-br-3xl transition-colors duration-500",
                        step.color === "cyan" ? "border-cyan-500/20" :
                            step.color === "violet" ? "border-violet-500/20" :
                                step.color === "blue" ? "border-blue-500/20" :
                                    "border-emerald-500/20"
                    )} />
                </div>
            </motion.div>

            {/* Central Marker */}
            <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center justify-center z-20">
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    className="relative"
                >
                    {/* Glow Ring */}
                    <div className={cn(
                        "absolute -inset-8 blur-2xl opacity-20 animate-pulse",
                        step.color === "cyan" ? "bg-cyan-500" :
                            step.color === "violet" ? "bg-violet-500" :
                                step.color === "blue" ? "bg-blue-500" :
                                    "bg-emerald-500"
                    )} />

                    {/* Main Node */}
                    <div className="relative w-20 h-20 rounded-2xl bg-slate-900 shadow-2xl flex items-center justify-center text-white p-5 border border-white/20">
                        <step.icon className="w-full h-full" />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-lg flex items-center justify-center text-[10px] font-black text-slate-900 shadow-lg border border-slate-100">
                            {step.id}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Spacer for empty side */}
            <div className="hidden lg:block w-[45%]" />
        </div>
    );
}
