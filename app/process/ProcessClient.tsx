"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Search, Lightbulb, PenTool, Code, Rocket, ArrowRight } from "lucide-react";
import { ProcessBackground } from "@/components/process/ProcessBackground";
import { useRef } from "react";
import Link from "next/link";

const steps = [
    {
        id: 1,
        title: "Discovery & Analysis",
        subtitle: "PHASE_01",
        description: "We dive deep into your brand, understanding your goals, audience, and challenges to build a solid foundation. We conduct competitive research and user persona mapping.",
        icon: <Search className="w-6 h-6 text-cyan-500" />,
        color: "from-cyan-500 to-blue-500",
        tag: "RESEARCH"
    },
    {
        id: 2,
        title: "Strategic Roadmap",
        subtitle: "PHASE_02",
        description: "We craft a bespoke roadmap effectively connecting your vision with tangible digital solutions. Defining technical architecture and content strategy.",
        icon: <Lightbulb className="w-6 h-6 text-yellow-500" />,
        color: "from-yellow-500 to-orange-500",
        tag: "STRATEGY"
    },
    {
        id: 3,
        title: "Experiential Design",
        subtitle: "PHASE_03",
        description: "Our designers create intuitive, stunning interfaces that captivate users and embody your brand identity. High-fidelity wireframes and interactive prototypes.",
        icon: <PenTool className="w-6 h-6 text-violet-500" />,
        color: "from-violet-500 to-purple-500",
        tag: "DESIGN"
    },
    {
        id: 4,
        title: "Engineered Development",
        subtitle: "PHASE_04",
        description: "We turn designs into reality using clean, efficient, and scalable code that powers your growth. Robust backend systems and snappy frontend performance.",
        icon: <Code className="w-6 h-6 text-blue-500" />,
        color: "from-blue-500 to-indigo-500",
        tag: "BUILD"
    },
    {
        id: 5,
        title: "Deployment & Growth",
        subtitle: "PHASE_05",
        description: "We handle the deployment and provide ongoing support to ensure your digital presence stays flawless. Performance monitoring and conversion optimization.",
        icon: <Rocket className="w-6 h-6 text-green-500" />,
        color: "from-green-500 to-emerald-500",
        tag: "LAUNCH"
    },
];

export default function ProcessClient() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <main ref={containerRef} className="relative min-h-screen overflow-hidden">
            <ProcessBackground />

            {/* Content Wrap */}
            <div className="relative z-10 container mx-auto px-4 md:px-6 pt-32 pb-24">
                <div className="text-center max-w-3xl mx-auto mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.2em] uppercase bg-primary/5 border border-primary/10 rounded-full text-primary">
                            The Methodology
                        </span>
                        <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight">
                            Precision <span className="text-gradient">Workflow</span>
                        </h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            Interdisciplinary approach combining strategy, design, and engineering to deliver unparalleled digital experiences.
                        </p>
                    </motion.div>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    {/* Animated Connecting Path (Desktop) */}
                    <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-[2px] -translate-x-1/2 overflow-hidden bg-primary/[0.05]">
                        <motion.div
                            className="absolute top-0 left-0 w-full bg-gradient-to-b from-cyan-500 via-violet-500 to-emerald-500"
                            style={{ height: "100%", scaleY: pathLength, originY: 0 }}
                        />
                    </div>

                    <div className="space-y-32">
                        {steps.map((step, index) => (
                            <div
                                key={step.id}
                                className={`flex flex-col md:flex-row items-center gap-12 md:gap-0 ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                    }`}
                            >
                                {/* Content Side */}
                                <motion.div
                                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    className="w-full md:w-[42%] group"
                                >
                                    <div className={`relative p-8 rounded-3xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500 ${index % 2 === 0 ? "md:text-left" : "md:text-right"
                                        }`}>
                                        {/* Tag */}
                                        <div className={`absolute -top-3 ${index % 2 === 0 ? "left-8" : "right-8"} px-3 py-1 bg-black text-[10px] font-bold text-white tracking-widest rounded`}>
                                            {step.tag}
                                        </div>

                                        <div className="space-y-4">
                                            <span className="text-xs font-mono text-primary/40 font-bold tracking-widest block uppercase">
                                                {step.subtitle}
                                            </span>
                                            <h3 className="text-3xl font-black tracking-tight group-hover:text-primary transition-colors">
                                                {step.title}
                                            </h3>
                                            <p className="text-muted-foreground leading-relaxed text-lg">
                                                {step.description}
                                            </p>

                                            <div className={`flex items-center gap-2 pt-4 group-hover:gap-4 transition-all ${index % 2 !== 0 ? "justify-end" : ""}`}>
                                                <span className="text-sm font-bold tracking-tight">Explore Phase</span>
                                                <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Center Node (Desktop) */}
                                <div className="relative z-20 flex items-center justify-center w-20 md:w-16 shrink-0">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true }}
                                        className="relative group"
                                    >
                                        <div className={`absolute inset-[-8px] rounded-full bg-gradient-to-br ${step.color} opacity-20 blur-lg group-hover:opacity-40 transition-opacity animate-pulse`} />
                                        <div className="relative w-16 h-16 rounded-2xl bg-white border-2 border-primary/10 shadow-xl flex items-center justify-center rotate-45 group-hover:rotate-[225deg] transition-transform duration-700">
                                            <div className="-rotate-45 group-hover:-rotate-[225deg] transition-transform duration-700">
                                                {step.icon}
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Placeholder for Balance */}
                                <div className="hidden md:block md:w-[42%]" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-40 text-center"
                >
                    <div className="inline-block p-16 md:p-24 rounded-[4rem] bg-black text-white relative overflow-hidden group w-full max-w-5xl">
                        {/* Animated Mesh Gradient Background */}
                        <div className="absolute inset-0 opacity-40 group-hover:opacity-70 transition-opacity duration-700">
                            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[80%] bg-violet-600/30 blur-[120px] rounded-full animate-pulse" />
                            <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[80%] bg-cyan-600/30 blur-[120px] rounded-full animate-pulse [animation-delay:2s]" />
                        </div>

                        {/* Noise Texture Overlay */}
                        <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                            }}
                        />

                        <div className="relative z-10 space-y-8">
                            <motion.span
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                className="inline-block px-4 py-1.5 text-xs font-bold tracking-[0.3em] uppercase border border-white/20 rounded-full"
                            >
                                Get Started
                            </motion.span>

                            <h2 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter">
                                Ready to build the <br />
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-violet-400">Extraordinary?</span>
                            </h2>

                            <p className="text-white/60 mb-12 text-xl max-w-2xl mx-auto leading-relaxed">
                                Let&apos;s transform your vision into a market-leading digital product with our high-performance workflow.
                            </p>

                            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                                <Link href="/contact" className="relative group/btn cursor-pointer">
                                    {/* Glowing Border Wrap */}
                                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full blur opacity-40 group-hover/btn:opacity-100 transition duration-500 group-hover/btn:duration-200" />

                                    <span className="relative flex items-center gap-3 px-12 py-5 bg-white text-black font-black rounded-full hover:scale-105 transition-all duration-300">
                                        Start Your Project
                                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                    </span>
                                </Link>

                                <Link href="/work" className="px-10 py-5 bg-white/5 hover:bg-white/10 text-white font-bold rounded-full border border-white/10 transition-colors">
                                    View Our Work
                                </Link>
                            </div>
                        </div>

                        {/* Subtle Floating Labels */}
                        <div className="absolute bottom-8 left-12 font-mono text-[10px] text-white/20 tracking-widest hidden md:block">
                            EST. 2024 // BROCODE_LABS
                        </div>
                        <div className="absolute bottom-8 right-12 font-mono text-[10px] text-white/20 tracking-widest hidden md:block">
                            STATUS: READY_FOR_DEPLOYMENT
                        </div>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
