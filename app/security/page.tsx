"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
    Lock,
    Server,
    Activity,
    Key,
    Database,
    Mail,
    MessageSquare,
    ArrowRight,
    ShieldCheck,
    Zap,
    Bug,
    ShieldAlert
} from "lucide-react";

const securitySections = [
    {
        id: "infra",
        title: "1. Infrastructure Security",
        icon: <Server size={20} className="text-cyan-500" />,
        content: "Our infrastructure is built on world-class cloud providers (AWS/Vercel) with multi-region redundancy and DDoS protection. We utilize edge computing to minimize attack surfaces and ensure high availability.",
        details: ["Isolated VPC Environments", "Edge DDoS Protection", "WAF Integration", "CDN Security"]
    },
    {
        id: "encryption",
        title: "2. Data Encryption",
        icon: <Database size={20} className="text-violet-500" />,
        content: "We implement industry-standard encryption for data both in transit (TLS 1.3) and at rest (AES-256). All API communications are secured with JSON Web Tokens (JWT) and stringent CORS policies.",
        details: ["TLS 1.3 In-Transit", "AES-256 At-Rest", "Secure Key Management", "Encrypted Backups"]
    },
    {
        id: "access",
        title: "3. Access Control",
        icon: <Key size={20} className="text-amber-500" />,
        content: "Access to sensitive production systems is strictly limited to authorized personnel using Multi-Factor Authentication (MFA) and Principle of Least Privilege (PoLP).",
        details: ["MFA/2FA Enforcement", "RBAC Architecture", "Audit Logging", "Session Monitoring"]
    },
    {
        id: "monitoring",
        title: "4. Continuous Monitoring",
        icon: <Activity size={20} className="text-emerald-500" />,
        content: "We utilize automated security scanning and real-time observability tools to detect anomalies and potential threats. System logs are analyzed 24/7 for suspicious activity.",
        details: ["Real-time SIEM", "Vulnerability Scanning", "Performance Metrics", "Error Tracking"]
    },
    {
        id: "application",
        title: "5. Application Security",
        icon: <Zap size={20} className="text-blue-500" />,
        content: "Each piece of code undergoes rigorous security audits and automated testing (SAST/DAST) to prevent common vulnerabilities like SQL Injection, XSS, and CSRF.",
        details: ["OWASP Top 10 Compliance", "Sanitized Inputs", "Secure Header Management", "CSRF Protection"]
    },
    {
        id: "compliance",
        title: "6. Security Compliance",
        icon: <ShieldCheck size={20} className="text-rose-500" />,
        content: "We adhere to best practices in data protection. Our development workflows follow secure SDLC principles to ensure privacy and security are integrated from the start.",
        details: ["Secure SDLC", "Privacy by Design", "Regular Audits", "Data Governance"]
    }
];

export default function SecurityPage() {
    const [mounted, setMounted] = useState(false);
    const [activeSection, setActiveSection] = useState("infra");
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
            for (const section of securitySections) {
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
            {/* --- CYBER-SECURITY BACKGROUND --- */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_20%_0%,rgba(6,182,212,0.05)_0%,transparent_50%)]" />

                {/* Technical Grid Overlay */}
                <svg className="absolute inset-0 w-full h-full text-slate-100" fill="none">
                    <defs>
                        <pattern id="security-grid" width="100" height="100" patternUnits="userSpaceOnUse">
                            <path d="M 100 0 L 0 0 0 100" stroke="currentColor" strokeWidth="0.5" />
                            <circle cx="2" cy="2" r="1" fill="currentColor" opacity="0.3" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#security-grid)" />
                </svg>

                {/* Animated HUD Circles */}
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] border border-dashed border-cyan-500/10 rounded-full"
                />
            </div>

            {/* --- TOP PROGRESS TRACKER --- */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-600 via-violet-600 to-emerald-600 z-[100] origin-left"
                style={{ scaleX }}
            />

            <div className="container relative z-10 mx-auto px-4 md:px-6 pt-40 pb-32">
                <div className="flex flex-col lg:flex-row gap-16">

                    {/* --- SECURITY SIDE NAV --- */}
                    <div className="lg:w-1/4">
                        <div className="sticky top-32 space-y-8">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <ShieldAlert size={14} className="text-cyan-500 animate-pulse" />
                                    <span className="text-[10px] font-mono tracking-[0.4em] text-slate-400 font-bold uppercase">Safe_Protocol</span>
                                </div>
                                <h1 className="text-4xl font-logo font-black tracking-tighter text-slate-900 uppercase leading-none">
                                    Security<br />Intel
                                </h1>
                                <p className="text-[11px] text-cyan-600 font-bold font-mono tracking-tighter">SEC_LEVEL: ALPHA</p>
                            </div>

                            <nav className="space-y-1 bg-white/50 backdrop-blur-md p-4 rounded-[2.5rem] border border-slate-100 shadow-sm">
                                {securitySections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => {
                                            const el = document.getElementById(section.id);
                                            el?.scrollIntoView({ behavior: "smooth", block: "center" });
                                        }}
                                        className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-[13px] font-bold transition-all group ${activeSection === section.id
                                            ? "bg-slate-900 text-white shadow-2xl shadow-slate-300"
                                            : "text-slate-500 hover:bg-slate-50"
                                            }`}
                                    >
                                        <div className={`transition-transform duration-300 ${activeSection === section.id ? "text-cyan-400 scale-110" : "text-slate-300 group-hover:text-slate-900 group-hover:rotate-12"}`}>
                                            {section.icon}
                                        </div>
                                        <span className="truncate">{section.title.split('. ').pop()}</span>
                                    </button>
                                ))}
                            </nav>

                            <div className="p-8 rounded-[2.5rem] bg-slate-900 text-white relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[40px] rounded-full" />
                                <div className="relative z-10 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Lock className="text-cyan-400 w-5 h-5" />
                                        <span className="text-[10px] font-mono font-bold tracking-widest uppercase">System_Shield_v2</span>
                                    </div>
                                    <p className="text-[11px] text-white/50 leading-relaxed font-medium">
                                        We leverage cutting-edge cryptographic standards to ensure your digital assets remain impenetrable.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- MAIN SECURITY CONTENT --- */}
                    <div className="lg:w-3/4 space-y-12">
                        {/* Status Header */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-slate-100">
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Infrastructure & Safety Overview</h2>
                                <p className="text-slate-500 text-sm font-medium">Detailed breakdown of our architectural defensive layers.</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Global_Status</p>
                                    <p className="text-[11px] font-bold text-emerald-500 flex items-center justify-end gap-2">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        SYSTEMS_SECURE
                                    </p>
                                </div>
                                <div className="h-10 w-[1px] bg-slate-200" />
                                <div className="bg-slate-100 text-slate-900 text-[11px] font-bold px-4 py-2.5 rounded-xl border border-slate-200">
                                    V.{year}.02
                                </div>
                            </div>
                        </div>

                        {/* Interactive Security Cards */}
                        <div className="grid grid-cols-1 gap-8">
                            {securitySections.map((section, idx) => (
                                <motion.section
                                    key={section.id}
                                    id={section.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                                    className={`relative group p-10 md:p-14 rounded-[3.5rem] bg-white border border-slate-100 transition-all duration-500 ${activeSection === section.id
                                        ? "shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] border-cyan-500/20"
                                        : "hover:border-slate-200"
                                        }`}
                                >
                                    <div className="flex flex-col md:flex-row gap-12">
                                        <div className="flex-shrink-0">
                                            <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center transition-all duration-500 ${activeSection === section.id
                                                ? "bg-slate-900 text-white rotate-[15deg] shadow-xl"
                                                : "bg-slate-50 text-slate-400 group-hover:rotate-[5deg]"
                                                }`}>
                                                {section.icon}
                                            </div>
                                        </div>

                                        <div className="space-y-8 flex-grow">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-3">
                                                    <span className="text-[10px] font-mono font-bold text-cyan-600 uppercase tracking-widest">
                                                        MODULE_CRITICAL
                                                    </span>
                                                    <div className="h-[1px] w-12 bg-slate-100" />
                                                </div>
                                                <h3 className="text-3xl font-bold text-slate-900 tracking-tighter">
                                                    {section.title}
                                                </h3>
                                            </div>

                                            <p className="text-lg text-slate-500 leading-relaxed font-medium">
                                                {section.content}
                                            </p>

                                            {section.details && (
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
                                                    {section.details.map((detail, dIdx) => (
                                                        <div key={dIdx} className="flex items-center gap-4 p-5 rounded-[1.5rem] bg-slate-50/50 border border-slate-100 group/item hover:bg-white hover:shadow-lg hover:shadow-slate-100/50 transition-all">
                                                            <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center group-hover/item:rotate-12 transition-transform">
                                                                <ShieldCheck size={18} className="text-emerald-500" />
                                                            </div>
                                                            <span className="text-xs font-bold text-slate-800 tracking-wide uppercase">{detail}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* HUD Decorative Element */}
                                    <div className="absolute top-10 right-10 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                                        <Bug size={80} />
                                    </div>
                                </motion.section>
                            ))}
                        </div>

                        {/* --- SECURITY HUB CONTACT --- */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-slate-900 rounded-[4rem] p-12 md:p-16 text-white relative overflow-hidden group"
                        >
                            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.05]" />
                            <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/10 blur-[100px] rounded-full group-hover:bg-cyan-500/20 transition-colors duration-700" />

                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                                <div className="space-y-6 text-center md:text-left">
                                    <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10">
                                        <ShieldCheck size={18} className="text-cyan-400" />
                                        <span className="text-[11px] font-mono font-bold text-cyan-400 tracking-widest uppercase">Security_Operations_Center</span>
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-logo font-bold tracking-tight leading-none uppercase">Need a security<br />audit for your product?</h2>
                                    <p className="text-white/60 font-medium text-lg max-w-lg">Our security architects are ready to review your infrastructure and implement industry-standard protection layers.</p>
                                </div>

                                <div className="flex flex-col gap-5 w-full md:w-auto">
                                    <a href="mailto:security@brocode.com" className="group flex items-center justify-between p-6 px-8 w-full md:w-80 rounded-[2.5rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                                        <div className="flex items-center gap-5">
                                            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center">
                                                <Mail className="text-cyan-400" size={24} />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-[10px] font-mono text-white/40 uppercase">E-Mail_Protocol</p>
                                                <p className="font-bold text-base">security@brocode.com</p>
                                            </div>
                                        </div>
                                        <ArrowRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" size={20} />
                                    </a>
                                    <a href="https://wa.me/919876543210" target="_blank" className="group flex items-center justify-between p-6 px-8 w-full md:w-80 rounded-[2.5rem] bg-white text-slate-900 hover:bg-cyan-400 transition-all shadow-2xl shadow-cyan-500/10">
                                        <div className="flex items-center gap-5">
                                            <div className="w-12 h-12 rounded-2xl bg-slate-900/5 flex items-center justify-center">
                                                <MessageSquare size={24} className="text-slate-900" />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-[10px] font-mono text-slate-400 uppercase tracking-tighter">Urgent_Intercept</p>
                                                <p className="font-bold text-base">WhatsApp Secure</p>
                                            </div>
                                        </div>
                                        <ArrowRight className="text-slate-900 group-hover:translate-x-1 transition-all" size={20} />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Sub-footer transition */}
            <div className="h-40 bg-gradient-to-b from-transparent to-[#020617]" />
        </div>
    );
}
