"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Terminal, Activity, Monitor, Layers, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const projects = [
    {
        title: "Fashion Today",
        subtitle: "Luxury E-commerce Platform",
        description: "An avant-garde digital boutique designed for high-end fashion, merging immersive cinematic visuals with a high-performance retail engine.",
        image: "/projects/fashion_today.png",
        color: "cyan",
        tags: ["E-commerce", "Luxury Retail", "Next.js"],
        stats: { loadTime: "1.0s", performance: "98%", status: "Live" },
        liveLink: "https://fashion-today-iota.vercel.app"
    },
    {
        title: "AURA Monochrome",
        subtitle: "Luxury E-commerce Vision",
        description: "A minimalist digital boutique pushing the boundaries of spatial layout and cinematic storytelling for ultra-high-end fashion.",
        image: "/projects/aura.png",
        color: "violet",
        tags: ["Spatial UI", "Headless CMS", "Fashion"],
        stats: { loadTime: "1.2s", performance: "96%", status: "Stable" }
    },
    {
        title: "NeuraCore AI",
        subtitle: "Neural Analytics Hub",
        description: "Advanced AI visualization platform mapping complex neural weights into interactive 3D topological data structures.",
        image: "/projects/neuracore.png",
        color: "emerald",
        tags: ["AI/ML", "Three.js", "Analytics"],
        stats: { loadTime: "1.5s", performance: "98%", status: "Live" }
    }
];

export function FeaturedWork() {
    return (
        <section className="relative py-32 overflow-hidden bg-white">
            {/* Background Grid & Decor */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] dark:opacity-[0.05]"
                    style={{ backgroundImage: 'linear-gradient(#000 1.5px, transparent 1.5px), linear-gradient(90deg, #000 1.5px, transparent 1.5px)', backgroundSize: '60px 60px' }}
                />
            </div>

            <div className="container relative z-10 px-4 md:px-6">
                {/* Section Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-12">
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3 mb-6"
                        >
                            <div className="p-2 rounded-lg bg-slate-900 text-white">
                                <Terminal className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-black uppercase tracking-[0.4em] text-slate-500">Project Synthesis</span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-8"
                        >
                            Translating <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-violet-600">Code into Art.</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-xl text-slate-500 max-w-xl leading-relaxed font-medium"
                        >
                            Our digital laboratory produces high-precision vessels for ambitious brands.
                            Each project is a distinct synthesis of engineering and vision.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                    >
                        <Link href="/work">
                            <Button variant="outline" className="h-16 px-8 rounded-2xl border-2 font-bold group bg-white shadow-xl hover:shadow-cyan-100 transition-all">
                                View Entire Archive
                                <ArrowUpRight className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>

                {/* Staggered Project Listing */}
                <div className="flex flex-col gap-32">
                    {projects.map((project, index) => (
                        <ProjectRow key={project.title} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function ProjectRow({ project, index }: { project: typeof projects[0]; index: number }) {
    const rowRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: rowRef,
        offset: ["start end", "end start"]
    });

    const isEven = index % 2 === 0;
    const xParallax = useTransform(scrollYProgress, [0, 1], isEven ? [-20, 20] : [20, -20]);
    const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);

    return (
        <div ref={rowRef} className={cn(
            "flex flex-col lg:flex-row items-center gap-12 lg:gap-24",
            !isEven && "lg:flex-row-reverse"
        )}>
            {/* Image Showcase */}
            <motion.div
                style={{ scale: imageScale }}
                className="w-full lg:w-3/5 group relative perspective-1000"
            >
                {/* Under-glow Effect */}
                <div className={cn(
                    "absolute -inset-4 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-700",
                    project.color === "cyan" ? "bg-cyan-500" :
                        project.color === "violet" ? "bg-violet-500" :
                            "bg-emerald-500"
                )} />

                <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden bg-slate-100 shadow-2xl border border-slate-200">
                    {project.liveLink && (
                        <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute inset-0 z-[35] cursor-pointer"
                            aria-label={`Visit ${project.title} live site`}
                        />
                    )}

                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />

                    {/* Creative Overlays: Noise & Scanlines */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay noise-bg" />
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_4px,3px_100%] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                        <div className="flex gap-4">
                            <div className="p-4 rounded-full bg-white text-slate-900 shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <ArrowUpRight className="w-8 h-8" />
                            </div>
                        </div>
                    </div>

                    {/* Technical HUD Corner Overlay */}
                    <div className="absolute top-8 right-8 flex flex-col items-end gap-2 pointer-events-none">
                        <div className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-[10px] font-mono text-white/80 uppercase tracking-tighter">
                            RES: 3840 x 2160
                        </div>
                        <div className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 text-[10px] font-mono text-white/80 uppercase tracking-tighter">
                            FPS: 60 [STABLE]
                        </div>
                    </div>
                </div>

                {/* Floating Meta Card (Parallax) */}
                <motion.div
                    style={{ x: xParallax }}
                    className={cn(
                        "hidden lg:block absolute -bottom-10 z-20 w-80 p-6 glass-premium rounded-3xl border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.1)]",
                        isEven ? "-right-10" : "-left-10"
                    )}
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Activity className="w-4 h-4 text-cyan-500" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Payload Diagnostics</span>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <span className="text-[8px] font-bold text-slate-400 uppercase">Load Delay</span>
                            <span className="text-sm font-black text-slate-900">{project.stats.loadTime}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[8px] font-bold text-slate-400 uppercase">Performance</span>
                            <span className="text-sm font-black text-slate-900">{project.stats.performance}</span>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Content Details */}
            <div className="w-full lg:w-2/5 flex flex-col">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-6"
                >
                    <div className="flex flex-col">
                        <span className={cn(
                            "text-[10px] font-black uppercase tracking-[0.4em] mb-2",
                            project.color === "cyan" ? "text-cyan-500" :
                                project.color === "violet" ? "text-violet-500" :
                                    "text-emerald-500"
                        )}>
                            {project.subtitle}
                        </span>
                        <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight transition-colors group-hover:text-cyan-600">
                            {project.title}
                        </h3>
                    </div>

                    <p className="text-lg text-slate-500 leading-relaxed font-medium">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                            <span key={tag} className="px-4 py-1.5 rounded-xl bg-slate-50 border border-slate-100 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="pt-8 flex items-center gap-6">
                        <Link href={`/work/${project.title.toLowerCase().replace(' ', '-')}`}>
                            <Button variant="primary" size="lg" className="h-14 px-8 rounded-2xl font-bold bg-slate-950 text-white hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
                                View Synthesis
                            </Button>
                        </Link>
                        <div className="flex items-center gap-4 text-slate-400">
                            <Monitor className="w-5 h-5 hover:text-slate-900 transition-colors cursor-pointer" />
                            <Layers className="w-5 h-5 hover:text-slate-900 transition-colors cursor-pointer" />
                            <Sparkles className="w-5 h-5 hover:text-slate-900 transition-colors cursor-pointer" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
