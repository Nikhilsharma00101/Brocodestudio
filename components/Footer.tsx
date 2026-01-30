"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Terminal, Cpu, Database } from "lucide-react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";

const footerLinks = [
    {
        title: "Architecture",
        links: [
            { name: "About Studio", href: "/about" },
            { name: "Our Process", href: "/process" },
            { name: "Team Core", href: "#" },
            { name: "Contact Hub", href: "/contact" },
        ],
    },
    {
        title: "Capabilities",
        links: [
            { name: "Web Infrastructure", href: "/services" },
            { name: "Digital Branding", href: "/services" },
            { name: "SEO Systems", href: "/services" },
            { name: "Growth Logic", href: "/services" },
        ],
    },
    {
        title: "Protocol",
        links: [
            { name: "Privacy Ledger", href: "/privacy" },
            { name: "Service Terms", href: "/terms" },
            { name: "Security Info", href: "/security" },
        ],
    },
];

export function Footer() {
    const footerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: footerRef,
        offset: ["start end", "end end"]
    });

    const yParallax = useTransform(scrollYProgress, [0, 1], [100, 0]);
    const yParallaxLower = useTransform(scrollYProgress, [0, 1], [-50, 0]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

    // Mouse interaction for the "Interactive HUD"
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const [mounted, setMounted] = useState(false);
    const [year, setYear] = useState<number>(new Date().getFullYear());

    useEffect(() => {
        const timer = setTimeout(() => {
            setMounted(true);
            setYear(new Date().getFullYear());
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!footerRef.current) return;
        const rect = footerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    return (
        <footer
            ref={footerRef}
            onMouseMove={handleMouseMove}
            className="relative bg-[#020617] pt-32 pb-12 overflow-hidden selection:bg-cyan-500/30"
        >
            {/* --- ADVANCED BACKGROUND SYSTEM --- */}
            <div className="absolute inset-0 z-0 pointer-events-none select-none">
                {/* 1. Dynamic Network Background */}
                <svg className="absolute inset-0 w-full h-full opacity-10">
                    <defs>
                        <pattern id="network-grid" width="100" height="100" patternUnits="userSpaceOnUse">
                            <circle cx="2" cy="2" r="1.5" fill="white" />
                            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="4 4" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#network-grid)" />
                </svg>

                {mounted && (
                    <>
                        {/* 2. Interactive "Radar" Pulse at mouse position */}
                        <motion.div
                            className="absolute w-[600px] h-[600px] rounded-full border border-cyan-500/20"
                            style={{
                                left: mouseX,
                                top: mouseY,
                                x: "-50%",
                                y: "-50%",
                                background: "radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)"
                            }}
                        />

                        {/* 3. Floating Architectural Rectangles (Parallax) */}
                        <motion.div
                            style={{ y: yParallax, opacity }}
                            className="absolute top-[10%] right-[15%] w-64 h-96 border border-white/5 rotate-12 flex items-center justify-center"
                        >
                            <div className="w-full h-full border-l-2 border-t-2 border-cyan-500/20 -translate-x-4 -translate-y-4" />
                            <span className="absolute top-4 left-4 font-mono text-[8px] tracking-[0.3em] text-cyan-500/40 uppercase">System_Frame_01</span>
                        </motion.div>

                        <motion.div
                            style={{ y: yParallaxLower, opacity }}
                            className="absolute bottom-[20%] left-[5%] w-48 h-48 border border-white/5 -rotate-6"
                        >
                            <div className="w-full h-full border-r-2 border-b-2 border-violet-500/20 translate-x-4 translate-y-4" />
                            <span className="absolute bottom-4 right-4 font-mono text-[8px] tracking-[0.3em] text-violet-500/40 uppercase">Core_Module_B2</span>
                        </motion.div>
                    </>
                )}

                {/* 4. Scanning DNA lines */}
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent animate-scan"
                    style={{ top: '15%' }} />
                <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-violet-500/30 to-transparent animate-scan-reverse"
                    style={{ bottom: '15%' }} />

                {/* 5. Moving Coordinates Overlay */}
                <div className="absolute top-24 left-12 font-mono text-[10px] text-slate-700 space-y-1">
                    <div>LAT: 28.6139° N</div>
                    <div>LNG: 77.2090° E</div>
                    <div className="text-cyan-500/50">SYS: ACTIVE</div>
                </div>

                {/* 6. Huge Background Marquee */}
                <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 overflow-hidden opacity-[0.03] select-none pointer-events-none">
                    <motion.div
                        initial={{ x: "0%" }}
                        animate={{ x: "-50%" }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="whitespace-nowrap flex gap-20"
                    >
                        <span className="text-[25vw] font-logo font-black leading-none uppercase">Innovation Hub • BroCode Studio • Digital Dreamers •</span>
                        <span className="text-[25vw] font-logo font-black leading-none uppercase">Innovation Hub • BroCode Studio • Digital Dreamers •</span>
                    </motion.div>
                </div>
            </div>

            {/* --- MAIN CONTENT --- */}
            <div className="container relative z-10 mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
                    {/* Brand Section */}
                    <div className="lg:col-span-5 space-y-10">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <Link href="/" className="inline-block group">
                                <div className="flex flex-col items-start">
                                    <h2 className="text-5xl font-logo font-bold tracking-tighter text-white relative flex items-center gap-2">
                                        <div className="relative">
                                            <span className="relative z-10">BROCODE</span>
                                            <span className="absolute inset-0 blur-2xl bg-cyan-500/20 group-hover:bg-cyan-500/40 transition-colors" />
                                        </div>
                                        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center overflow-hidden">
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                                className="text-cyan-400"
                                            >
                                                <Cpu size={24} />
                                            </motion.div>
                                        </div>
                                    </h2>
                                    <div className="flex items-center gap-4 mt-2">
                                        <span className="h-[1px] w-20 bg-gradient-to-r from-cyan-500 to-transparent" />
                                        <span className="text-xs font-mono tracking-[0.5em] text-slate-500 uppercase">Studio_v2.0</span>
                                    </div>
                                </div>
                            </Link>

                            <p className="text-slate-400 text-xl leading-relaxed max-w-lg font-medium">
                                We engineer <span className="text-white">superior digital assets</span>. Merging high-performance architecture with aesthetic excellence.
                            </p>
                        </motion.div>

                        {/* Interactive Social Module */}
                        {/* Interactive Social Module - HIDDEN FOR NOW
                        <div className="flex flex-wrap items-center gap-10">
                            {[
                                { icon: <Instagram size={20} />, label: "INSTA" },
                                { icon: <Twitter size={20} />, label: "X.COM" },
                                { icon: <Linkedin size={20} />, label: "LINKED" },
                                { icon: <Github size={20} />, label: "GIT" }
                            ].map((social, idx) => (
                                <motion.a
                                    key={idx}
                                    href="#"
                                    whileHover={{ scale: 1.1, color: "#22d3ee" }}
                                    className="flex flex-col items-center gap-2 text-slate-500 transition-all group"
                                >
                                    <div className="p-3 rounded-full border border-slate-800 bg-slate-900 group-hover:border-cyan-500/50 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                                        {social.icon}
                                    </div>
                                    <span className="text-[10px] font-mono tracking-widest">{social.label}</span>
                                </motion.a>
                            ))}
                        </div>
                        */}
                    </div>

                    {/* Links Grid */}
                    <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-12">
                        {footerLinks.map((section, idx) => (
                            <motion.div
                                key={section.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="space-y-8"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 glow-cyan" />
                                    <h4 className="text-white font-bold tracking-[0.2em] text-[10px] uppercase">
                                        {section.title}
                                    </h4>
                                </div>
                                <ul className="space-y-4">
                                    {section.links.map((link) => (
                                        <li key={link.name}>
                                            <Link
                                                href={link.href}
                                                className="group flex flex-col items-start gap-1"
                                            >
                                                <span className="text-slate-400 group-hover:text-white transition-colors duration-300 flex items-center gap-2">
                                                    <span className="text-[10px] font-mono text-cyan-500/50 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                                                        {">"}
                                                    </span>
                                                    {link.name}
                                                </span>
                                                <span className="h-[1px] w-0 bg-cyan-500 group-hover:w-full transition-all duration-500" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* --- TECHNICAL HUD BAR --- */}
                <div className="pt-12 border-t border-slate-800/50">
                    <div className="flex flex-col xl:flex-row items-center justify-between gap-10">
                        {/* Status Panel */}
                        <div className="flex flex-wrap items-center justify-center gap-8">
                            <div className="bg-slate-900/50 border border-slate-800 px-5 py-3 rounded-xl flex items-center gap-4">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-6 h-6 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center">
                                            <div className="w-2 h-2 rounded-full bg-cyan-500/50" />
                                        </div>
                                    ))}
                                </div>
                                <div className="text-[10px] font-mono leading-none">
                                    <div className="text-slate-500 mb-1 tracking-tight">NODES_CONNECTED</div>
                                    <div className="text-white font-bold">54 ONLINE</div>
                                </div>
                            </div>

                            <div className="hidden sm:flex items-center gap-6 text-[10px] font-mono tracking-widest text-slate-500">
                                <div className="flex items-center gap-2">
                                    <Terminal size={14} className="text-cyan-500" />
                                    <span>V1.0.42_BUILD</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Database size={14} className="text-violet-500" />
                                    <span>DB_SECURE</span>
                                </div>
                            </div>
                        </div>

                        {/* Copyright & Info */}
                        <div className="flex items-center gap-12">
                            <div className="text-[11px] text-slate-500 font-medium">
                                © {year} BROCODE STUDIO.
                                <span className="hidden md:inline ml-2 text-slate-700 font-mono tracking-tighter">
                                    DESIGNED_&_ENGINEERED_WITH_PRECISION
                                </span>
                            </div>
                            <Link href="/contact">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    className="bg-white text-black px-6 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 hover:bg-cyan-400 transition-colors cursor-pointer"
                                >
                                    ESTABLISH_CONNECTION
                                    <ArrowRight size={14} />
                                </motion.div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Corner Decorative HUD */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-20 pointer-events-none">
                <div className="absolute top-8 right-8 w-16 h-[1px] bg-white" />
                <div className="absolute top-8 right-8 w-[1px] h-16 bg-white" />
                <div className="absolute top-10 right-10 w-4 h-4 border border-white" />
            </div>


        </footer>
    );
}
