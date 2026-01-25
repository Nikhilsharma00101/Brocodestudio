"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
    Lock,
    Shield,
    Eye,
    UserCheck,
    Share2,
    ExternalLink,
    Mail,
    MessageSquare,
    ShieldCheck,
    FileText,
    Zap,
    Cpu,
    ArrowRight
} from "lucide-react";

const sections = [
    {
        id: "intro",
        title: "Introduction",
        icon: <Eye size={20} className="text-cyan-500" />,
        content: "Thank you for visiting BroCode Studio (\"we,\" \"us,\" or \"our\"). We respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or contact us for services."
    },
    {
        id: "collection",
        title: "1. Information We Collect",
        icon: <UserCheck size={20} className="text-violet-500" />,
        content: "We collect information that you voluntarily provide to us when you fill out our contact form (Name, Email, Project Details), contact us via WhatsApp or email directly, or subscribe to any newsletters or updates.",
        details: ["Contact Information (Name, Email)", "Project Specifications", "Communication History", "Automated Usage Data (IP, Browser Type)"]
    },
    {
        id: "usage",
        title: "2. How We Use Your Information",
        icon: <Zap size={20} className="text-amber-500" />,
        content: "We use the collected information to respond to your inquiries, provide quotes, deliver web development services, improve our website's functionality, and comply with legal obligations.",
        details: ["Service Delivery", "Client Communication", "UX Enhancement", "Legal Compliance"]
    },
    {
        id: "protection",
        title: "3. Data Protection and Security",
        icon: <ShieldCheck size={20} className="text-emerald-500" />,
        content: "We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. However, please note that no method of transmission over the Internet is 100% secure."
    },
    {
        id: "sharing",
        title: "4. Sharing of Information",
        icon: <Share2 size={20} className="text-blue-500" />,
        content: "We do not sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information with our business partners and trusted affiliates."
    },
    {
        id: "third-party",
        title: "5. Third-Party Links",
        icon: <ExternalLink size={20} className="text-purple-500" />,
        content: "Our website may contain links to third-party websites (e.g., GitHub, LinkedIn, Twitter). We are not responsible for the privacy practices or content of these external sites."
    },
    {
        id: "rights",
        title: "6. Your Rights",
        icon: <Lock size={20} className="text-rose-500" />,
        content: "You have the right to request access to the personal information we hold about you, to request corrections, or to request deletion of your data. Contact us to exercise these rights."
    }
];

export default function PrivacyPage() {
    const [mounted, setMounted] = useState(false);
    const [activeSection, setActiveSection] = useState("intro");
    const [year, setYear] = useState<number>(new Date().getFullYear());
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setMounted(true);
            setYear(new Date().getFullYear());
        }, 0);
        return () => clearTimeout(timer);

        const handleScroll = () => {
            const scrollPosition = window.scrollY + 200;
            for (const section of sections) {
                const element = document.getElementById(section.id);
                if (element) {
                    const top = element.offsetTop;
                    const height = element.offsetHeight;
                    if (scrollPosition >= top && scrollPosition < top + height) {
                        setActiveSection(section.id);
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-[#fdfdfd] relative">
            {/* --- BACKGROUND DECOR --- */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.05)_0%,transparent_50%)]" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02]" />

                {/* Technical Grid Overlay */}
                <svg className="absolute inset-0 w-full h-full text-slate-100" fill="none">
                    <defs>
                        <pattern id="privacy-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M 60 0 L 0 0 0 60" stroke="currentColor" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#privacy-grid)" />
                </svg>

                {/* Animated Light Rays */}
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/5 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-violet-500/5 blur-[120px] rounded-full animate-pulse" />
            </div>

            {/* --- SCROLL PROGRESS BAR --- */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-violet-500 z-[100] origin-left"
                style={{ scaleX }}
            />

            <div className="container relative z-10 mx-auto px-4 md:px-6 pt-40 pb-32">
                <div className="flex flex-col lg:flex-row gap-16">

                    {/* --- LEFT SIDEBAR (STICKY NAV) --- */}
                    <div className="lg:w-1/4">
                        <div className="sticky top-32 space-y-8">
                            <div className="space-y-2">
                                <span className="text-[10px] font-mono tracking-[0.4em] text-cyan-600 font-bold uppercase">System_Protocol</span>
                                <h1 className="text-4xl font-logo font-black tracking-tighter text-slate-900 uppercase">
                                    Privacy<br />Vault
                                </h1>
                                <div className="h-1 w-12 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full" />
                            </div>

                            <nav className="space-y-1">
                                {sections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => {
                                            const el = document.getElementById(section.id);
                                            el?.scrollIntoView({ behavior: "smooth", block: "center" });
                                        }}
                                        className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all group ${activeSection === section.id
                                            ? "bg-slate-900 text-white shadow-xl shadow-slate-200"
                                            : "text-slate-500 hover:bg-slate-50"
                                            }`}
                                    >
                                        <div className={`transition-colors ${activeSection === section.id ? "text-cyan-400" : "text-slate-400 group-hover:text-slate-900"}`}>
                                            {section.icon}
                                        </div>
                                        <span className="truncate">{section.title.split('. ').pop()}</span>
                                    </button>
                                ))}
                            </nav>

                            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                    <Shield className="text-cyan-600 w-5 h-5" />
                                    <span className="text-[10px] font-mono font-bold text-slate-400 tracking-widest uppercase">Encryption_Active</span>
                                </div>
                                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                                    All personal data is processed through secure channels within the BroCode Studio infrastructure.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* --- MAIN CONTENT --- */}
                    <div className="lg:w-3/4 space-y-12">
                        {/* Header Info */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-slate-100">
                            <div className="space-y-2">
                                <h2 className="text-xl font-bold text-slate-900">Platform Privacy Standards</h2>
                                <p className="text-slate-500 text-sm">Review our comprehensive legal framework for data governance.</p>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                <span className="text-[10px] font-mono text-slate-400 font-bold tracking-widest">LAST_MODIFIED</span>
                                <span className="bg-slate-100 text-slate-900 text-[11px] font-bold px-3 py-1 rounded-full border border-slate-200 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    JANUARY {year}
                                </span>
                            </div>
                        </div>

                        {/* Sections List */}
                        <div className="space-y-12">
                            {sections.map((section, idx) => (
                                <motion.section
                                    key={section.id}
                                    id={section.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className={`relative group p-8 md:p-12 rounded-[2.5rem] bg-white border border-slate-100 transition-all duration-500 ${activeSection === section.id
                                        ? "shadow-2xl shadow-slate-200/50 border-cyan-500/20"
                                        : "hover:border-slate-200"
                                        }`}
                                >
                                    {/* Sidebar Technical Label */}
                                    <div className="absolute -left-4 top-12 h-12 w-1 bg-gradient-to-b from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                    <div className="flex flex-col md:flex-row gap-8">
                                        <div className="flex-shrink-0">
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${activeSection === section.id
                                                ? "bg-slate-900 text-white rotate-[10deg]"
                                                : "bg-slate-50 text-slate-400 group-hover:rotate-[5deg]"
                                                }`}>
                                                {section.icon}
                                            </div>
                                        </div>

                                        <div className="space-y-6 flex-grow">
                                            <div className="space-y-2">
                                                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                                                    PROTOCOL_0{idx + 1}
                                                </span>
                                                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                                                    {section.title}
                                                </h3>
                                            </div>

                                            <div className="prose prose-slate prose-lg max-w-none text-slate-500 leading-relaxed font-medium">
                                                <p>{section.content}</p>

                                                {section.details && (
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                                                        {section.details.map((detail, dIdx) => (
                                                            <div key={dIdx} className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 group/item hover:bg-white transition-colors">
                                                                <div className="w-2 h-2 rounded-full bg-cyan-500/30 group-hover/item:rotate-12 transition-transform shadow-[0_0_8px_rgba(6,182,212,0.3)]" />
                                                                <span className="text-xs font-bold text-slate-700">{detail}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Corner Decoration */}
                                    <div className="absolute top-8 right-8 text-slate-50 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Cpu size={40} />
                                    </div>
                                </motion.section>
                            ))}
                        </div>

                        {/* --- CONTACT MODULE --- */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/10 blur-[80px] rounded-full" />

                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
                                <div className="space-y-4 max-w-md">
                                    <div className="flex items-center justify-center md:justify-start gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                                            <FileText className="text-cyan-400" />
                                        </div>
                                        <span className="text-[10px] font-mono font-bold text-cyan-400 tracking-widest uppercase">Legal_Support</span>
                                    </div>
                                    <h2 className="text-3xl font-bold tracking-tight">Still have queries regarding your data?</h2>
                                    <p className="text-white/60 font-medium">Our legal team is available for direct consultation regarding any privacy concerns.</p>
                                </div>

                                <div className="flex flex-col gap-4 w-full md:w-auto">
                                    <a href="mailto:hello@brocode.com" className="w-full md:w-64 flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                                        <div className="flex items-center gap-4">
                                            <Mail className="text-cyan-400" size={20} />
                                            <span className="font-bold text-sm">hello@brocode.com</span>
                                        </div>
                                        <ArrowRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" size={16} />
                                    </a>
                                    <a href="https://wa.me/919876543210" target="_blank" className="w-full md:w-64 flex items-center justify-between p-5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 transition-all group shadow-xl shadow-emerald-500/20">
                                        <div className="flex items-center gap-4 text-white">
                                            <MessageSquare size={20} fill="currentColor" />
                                            <span className="font-bold text-sm">Live Chat Hub</span>
                                        </div>
                                        <ArrowRight className="opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" size={16} />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Final Footer Spacer - to reveal the creative footer beautifully */}
            <div className="h-20 bg-gradient-to-b from-transparent to-slate-50/50" />
        </div>
    );
}
