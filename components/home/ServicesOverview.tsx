"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Layout, TrendingUp, Code2, Palette, Search, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const services = [
    {
        number: "01",
        title: "Digital Architecture",
        subtitle: "Web Design & Development",
        description: "We engineer high-performance digital ecosystems using Next.js and React. Every pixel is optimized for speed, accessibility, and luxury aesthetics.",
        icon: Layout,
        color: "cyan",
        tags: ["Next.js-14", "Framer Motion", "Vercel Core"],
    },
    {
        number: "02",
        title: "Visual Identity",
        subtitle: "Branding & Strategy",
        description: "Crafting memorable brand alphabets. We define visual systems that communicate authority and innovation through minimalist technical design.",
        icon: Palette,
        color: "violet",
        tags: ["Brand Books", "UI/UX", "Motion Design"],
    },
    {
        number: "03",
        title: "Strategic Growth",
        subtitle: "SEO & Performance",
        description: "Data-driven optimization that doesn't just increase traffic, but attracts the right visionary clients to your digital doorstep.",
        icon: TrendingUp,
        color: "blue",
        tags: ["SEO Core", "Conversion", "Analytics"],
    },
];

export function ServicesOverview() {
    return (
        <section className="relative py-32 overflow-hidden bg-[#fafafa]">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                {/* Outlined Background Text */}
                <div className="absolute top-20 left-10 text-[15rem] font-black text-slate-200/30 select-none pointer-events-none uppercase tracking-tighter -rotate-12 origin-top-left">
                    Expertise
                </div>
            </div>

            <div className="container relative z-10 px-4 md:px-6">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-8">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="flex items-center gap-3 mb-6"
                        >
                            <span className="w-12 h-[2px] bg-cyan-500" />
                            <span className="text-sm font-black uppercase tracking-[0.4em] text-cyan-500">Service Map</span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-black tracking-tight text-slate-900"
                        >
                            Engineered for <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-violet-600 italic">Unrivaled Quality.</span>
                        </motion.h2>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="lg:mb-4"
                    >
                        <Link href="/services">
                            <Button variant="outline" className="h-14 px-8 rounded-2xl border-2 font-bold group">
                                Explore All Services
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>

                {/* Service Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <ServiceCard key={service.number} service={service} index={index} />
                    ))}
                </div>

                {/* Bottom Technical Spec Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-24 pt-12 border-t border-slate-200 flex flex-wrap items-center justify-between gap-8 opacity-60"
                >
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase">
                            <ShieldCheck className="w-3 h-3" /> Secure Infrastructure
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase">
                            <Code2 className="w-3 h-3" /> Semantic Clean Code
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase">
                            <Search className="w-3 h-3" /> SEO Optimized Core
                        </div>
                    </div>
                    <div className="text-[10px] font-mono tracking-widest uppercase">
                        System.Node: Active // Latency: Low
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    const spotlightBg = useTransform(
        [mouseX, mouseY],
        ([x, y]) => `radial-gradient(300px circle at ${x}px ${y}px, rgba(6, 182, 212, 0.08), transparent 80%)`
    );

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative flex flex-col p-10 bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)] hover:-translate-y-2"
        >
            {/* Hover Spotlight */}
            <motion.div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: spotlightBg }}
            />

            {/* Corner Brackets */}
            <div className="absolute top-6 left-6 w-4 h-4 border-t-2 border-l-2 border-slate-100 group-hover:border-cyan-500/30 transition-colors" />
            <div className="absolute bottom-6 right-6 w-4 h-4 border-b-2 border-r-2 border-slate-100 group-hover:border-violet-500/30 transition-colors" />

            {/* Header Content */}
            <div className="flex justify-between items-start mb-12">
                <div className={cn(
                    "p-5 rounded-3xl transition-all duration-500 group-hover:scale-110",
                    service.color === "cyan" ? "bg-cyan-50 text-cyan-600 group-hover:bg-cyan-500 group-hover:text-white" :
                        service.color === "violet" ? "bg-violet-50 text-violet-600 group-hover:bg-violet-500 group-hover:text-white" :
                            "bg-blue-50 text-blue-600 group-hover:bg-blue-500 group-hover:text-white"
                )}>
                    <service.icon className="w-8 h-8" />
                </div>
                <span className="text-4xl font-black text-slate-100 group-hover:text-slate-200 transition-colors">
                    {service.number}
                </span>
            </div>

            {/* Body */}
            <div className="flex flex-col gap-4 mb-8">
                <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1">
                        {service.subtitle}
                    </span>
                    <h3 className="text-2xl font-black text-slate-900 leading-tight">
                        {service.title}
                    </h3>
                </div>
                <p className="text-slate-500 leading-relaxed font-medium">
                    {service.description}
                </p>
            </div>

            {/* Stats/Tags HUD */}
            <div className="mt-auto flex flex-wrap gap-2">
                {service.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-slate-50 text-[9px] font-bold text-slate-500 uppercase tracking-wider border border-slate-100">
                        {tag}
                    </span>
                ))}
            </div>

            {/* Interactive Progress Line */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-50 overflow-hidden">
                <motion.div
                    initial={{ x: "-100%" }}
                    whileInView={{ x: "0%" }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    className={cn(
                        "h-full w-full",
                        service.color === "cyan" ? "bg-cyan-500" :
                            service.color === "violet" ? "bg-violet-500" :
                                "bg-blue-500"
                    )}
                />
            </div>
        </motion.div>
    );
}
