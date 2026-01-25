"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Quote, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
    {
        name: "Sarah Jenning",
        role: "CMO",
        company: "TechFlow",
        content: "BroCode transformed our digital presence completely. The attention to detail and premium design quality exceeded our expectations. They didn't just build a site; they engineered a brand experience that truly speaks to our high-end clientele.",
        rating: 5,
        color: "cyan"
    },
    {
        name: "Michael Chen",
        role: "Founder",
        company: "NovaBank",
        content: "Speed, creativity, and technical excellence. The team delivered a complex fintech dashboard that our users absolutely love. Their mastery over real-time data visualization and performant code is simply unmatched.",
        rating: 5,
        color: "violet"
    },
    {
        name: "Elena Rodriguez",
        role: "Director",
        company: "ArtVibe",
        content: "A true partner in innovation. They took our rough ideas and turned them into a stunning, functional reality. Their ability to mix luxury aesthetics with solid stability changed the game for our digital strategy.",
        rating: 5,
        color: "emerald"
    }
];

export function Testimonials() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const xLeft = useTransform(scrollYProgress, [0, 1], [-150, 150]);
    const xRight = useTransform(scrollYProgress, [0, 1], [150, -150]);

    return (
        <section ref={containerRef} className="relative pt-10 pb-32 overflow-hidden bg-white">
            {/* Ambient Background - Soft Light Streaks */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-slate-100 to-transparent" />
                <div className="absolute top-0 left-2/4 w-[1px] h-full bg-gradient-to-b from-transparent via-slate-100 to-transparent" />
                <div className="absolute top-0 left-3/4 w-[1px] h-full bg-gradient-to-b from-transparent via-slate-100 to-transparent" />

                <motion.div
                    style={{ y: xLeft }}
                    className="absolute top-0 left-1/3 w-64 h-64 bg-cyan-100/30 rounded-full blur-[120px]"
                />
                <motion.div
                    style={{ y: xRight }}
                    className="absolute bottom-0 right-1/3 w-96 h-96 bg-violet-100/30 rounded-full blur-[120px]"
                />
            </div>

            <div className="container relative z-10 px-4 md:px-6">
                <div className="max-w-4xl mx-auto text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-8 h-[2px] bg-slate-900" />
                            <span className="text-sm font-black uppercase tracking-[0.5em] text-slate-900">Voices</span>
                            <span className="w-8 h-[2px] bg-slate-900" />
                        </div>
                        <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-slate-900 mb-8 leading-[0.9]">
                            Our Clients <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-violet-600">Think Big.</span>
                        </h2>
                        <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-xl">
                            We don&apos;t just deliver projects; we build lasting legacies for brands who want to define the future.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                    {testimonials.map((t, i) => (
                        <TestimonialCard key={t.name} t={t} index={i} />
                    ))}
                </div>

                {/* Bottom Stats Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mt-32 grid grid-cols-2 lg:grid-cols-4 gap-8 pt-16 border-t border-slate-100"
                >
                    <StatItem label="Client Retention" value="98%" />
                    <StatItem label="Projects Launched" value="150+" />
                    <StatItem label="Average ROI" value="4.2x" />
                    <StatItem label="Technical uptime" value="99.9%" />
                </motion.div>
            </div>
        </section>
    );
}

function TestimonialCard({ t, index }: { t: typeof testimonials[0]; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.8 }}
            className="group relative flex flex-col"
        >
            {/* Card Content Container */}
            <div className="relative p-10 bg-white border border-slate-100 rounded-[3rem] shadow-[0_10px_40px_-20px_rgba(0,0,0,0.05)] transition-all duration-700 group-hover:shadow-[0_40px_80px_-25px_rgba(0,0,0,0.08)] group-hover:border-slate-200 group-hover:-translate-y-3">
                <div className="absolute top-8 right-10">
                    <Quote className={cn(
                        "w-12 h-12 transition-all duration-700 opacity-10 group-hover:opacity-100 group-hover:-translate-y-2",
                        t.color === "cyan" ? "text-cyan-500" :
                            t.color === "violet" ? "text-violet-500" :
                                "text-emerald-500"
                    )} />
                </div>

                {/* Star System */}
                <div className="flex gap-1 mb-8">
                    {[1, 2, 3, 4, 5].map(star => (
                        <Star key={star} className="w-3.5 h-3.5 fill-slate-900 text-slate-900" />
                    ))}
                </div>

                <p className="text-lg md:text-xl text-slate-900 font-medium leading-relaxed italic mb-12">
                    &quot;{t.content}&quot;
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-5">
                    <div className="relative">
                        <div className={cn(
                            "absolute -inset-1 rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-700",
                            t.color === "cyan" ? "bg-cyan-500" :
                                t.color === "violet" ? "bg-violet-500" :
                                    "bg-emerald-500"
                        )} />
                        <div className="relative w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center text-xl font-black text-white selection:bg-cyan-500">
                            {t.name.split(' ').map(n => n[0]).join('')}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <h4 className="text-xl font-black text-slate-900 tracking-tight">{t.name}</h4>
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                            {t.role} {'//'} <span className="text-slate-900">{t.company}</span>
                        </span>
                    </div>
                </div>

                {/* Decorative Bottom Trace */}
                <div className="absolute bottom-0 left-12 right-12 h-[3px] overflow-hidden rounded-full">
                    <motion.div
                        initial={{ x: "-100%" }}
                        whileInView={{ x: "100%" }}
                        transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                        className={cn(
                            "h-full w-24 blur-[2px]",
                            t.color === "cyan" ? "bg-cyan-500" :
                                t.color === "violet" ? "bg-violet-500" :
                                    "bg-emerald-500"
                        )}
                    />
                </div>
            </div>

            {/* Offset Decorative Shadow Element */}
            <div className="absolute inset-x-8 -bottom-4 h-8 bg-slate-50 border border-slate-100 rounded-full -z-10 group-hover:scale-105 transition-transform duration-700" />
        </motion.div>
    );
}

function StatItem({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-col items-center lg:items-start">
            <span className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-2">{label}</span>
            <span className="text-4xl font-black text-slate-900 tracking-tighter">{value}</span>
        </div>
    );
}
