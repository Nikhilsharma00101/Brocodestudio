"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
    Gavel,
    Code2,
    Handshake,
    CreditCard,
    Scale,
    AlertTriangle,
    Globe2,
    Mail,
    MessageSquare,
    ArrowRight,
    Terminal,
    ChevronRight
} from "lucide-react";

const termsSections = [
    {
        id: "acceptance",
        title: "1. Acceptance of Terms",
        icon: <Gavel size={20} className="text-cyan-500" />,
        content: "By accessing and using the services provided by BroCode Studio (\"we,\" \"us,\" or \"our\"), you agree to be bound by these Service Terms. If you do not agree with any part of these terms, you must not use our services."
    },
    {
        id: "services",
        title: "2. Scope of Services",
        icon: <Code2 size={20} className="text-violet-500" />,
        content: "BroCode Studio provides specialized digital solutions including but not limited to custom web infrastructure, UI/UX design, brand identity, and technical SEO orchestration. The specific scope of any project will be defined in a signed Statement of Work (SOW) or Project Agreement.",
        details: ["Frontend Development", "Backend Architecture", "E-commerce Systems", "Performance Optimization"]
    },
    {
        id: "collaboration",
        title: "3. Client Responsibilities",
        icon: <Handshake size={20} className="text-amber-500" />,
        content: "To ensure successful project execution, the client agrees to provide necessary assets, feedback, and approvals in a timely manner. Delays in providing these materials may result in project timeline adjustments.",
        details: ["Content Delivery", "Brand Guidelines", "Technical Access", "Prompt Feedback"]
    },
    {
        id: "ip",
        title: "4. Intellectual Property",
        icon: <Terminal size={20} className="text-emerald-500" />,
        content: "Upon full payment of all fees, all customized code, designs, and digital assets created specifically for the client shall become the property of the client. BroCode Studio retains ownership of its pre-existing tools, libraries, and proprietary methods used during development."
    },
    {
        id: "payment",
        title: "5. Financial Protocol",
        icon: <CreditCard size={20} className="text-blue-500" />,
        content: "Project engagement typically requires a 50% technical commencement fee, with the remaining balance due upon project completion or as per established milestones. All payments are non-refundable once work has commenced.",
        details: ["Milestone Payments", "Invoicing Schedules", "Late Fee Policies", "Currency: USD/INR"]
    },
    {
        id: "liability",
        title: "6. Limitation of Liability",
        icon: <AlertTriangle size={20} className="text-rose-500" />,
        content: "BroCode Studio shall not be liable for any indirect, incidental, or consequential damages arising out of the use or inability to use our services. We do not guarantee specific business outcomes or revenue targets."
    },
    {
        id: "governing",
        title: "7. Governing Law",
        icon: <Globe2 size={20} className="text-purple-500" />,
        content: "These terms and any separate agreements for services shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Bangalore, Karnataka."
    }
];

export default function TermsPage() {
    const [mounted, setMounted] = useState(false);
    const [activeSection, setActiveSection] = useState("acceptance");
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
            for (const section of termsSections) {
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
            {/* --- ARCHITECTURAL BACKGROUND --- */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_70%_0%,rgba(139,92,246,0.05)_0%,transparent_50%)]" />

                {/* Technical Grid Overlay */}
                <svg className="absolute inset-0 w-full h-full text-slate-100" fill="none">
                    <defs>
                        <pattern id="terms-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                            <path d="M 80 0 L 0 0 0 80" stroke="currentColor" strokeWidth="0.5" />
                            <circle cx="0" cy="0" r="1" fill="currentColor" opacity="0.2" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#terms-grid)" />
                </svg>

                {/* Floating Elements */}
                <motion.div
                    animate={{
                        rotate: 360,
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] border border-slate-200/50 rounded-full opacity-10"
                />
            </div>

            {/* --- TOP PROGRESS TRACKER --- */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-cyan-500 to-emerald-500 z-[100] origin-left"
                style={{ scaleX }}
            />

            <div className="container relative z-10 mx-auto px-4 md:px-6 pt-40 pb-32">
                <div className="flex flex-col lg:flex-row gap-16">

                    {/* --- SERVICE PROTOCOL NAV (SIDEBAR) --- */}
                    <div className="lg:w-1/4">
                        <div className="sticky top-32 space-y-8">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <span className="w-8 h-[1px] bg-violet-500" />
                                    <span className="text-[10px] font-mono tracking-[0.4em] text-violet-600 font-bold uppercase">Legal_Framework</span>
                                </div>
                                <h1 className="text-4xl font-logo font-black tracking-tighter text-slate-900 uppercase leading-none">
                                    Service<br />Terms
                                </h1>
                                <p className="text-[11px] text-slate-400 font-mono tracking-tighter uppercase">Protocol_v1.0.4</p>
                            </div>

                            <nav className="space-y-1 bg-white/50 backdrop-blur-sm p-4 rounded-[2rem] border border-slate-100">
                                {termsSections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => {
                                            const el = document.getElementById(section.id);
                                            el?.scrollIntoView({ behavior: "smooth", block: "center" });
                                        }}
                                        className={`w-full flex items-center justify-between gap-4 px-4 py-3 rounded-2xl text-[13px] font-bold transition-all group ${activeSection === section.id
                                            ? "bg-slate-900 text-white shadow-xl shadow-slate-200"
                                            : "text-slate-500 hover:bg-slate-50"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`transition-colors ${activeSection === section.id ? "text-violet-400" : "text-slate-300 group-hover:text-slate-900"}`}>
                                                {section.icon}
                                            </div>
                                            <span className="truncate">{section.title.split('. ').pop()}</span>
                                        </div>
                                        {activeSection === section.id && (
                                            <ChevronRight size={14} className="text-violet-400" />
                                        )}
                                    </button>
                                ))}
                            </nav>

                            <div className="p-6 rounded-[2rem] bg-violet-50/50 border border-violet-100 flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                    <Scale className="text-violet-600 w-5 h-5" />
                                    <span className="text-[10px] font-mono font-bold text-violet-600/60 tracking-widest uppercase">Compliance_Link</span>
                                </div>
                                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                                    These terms govern all project interactions and intellectual property transfers at BroCode Studio.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* --- MAIN TERMS CONTENT --- */}
                    <div className="lg:w-3/4 space-y-12">
                        {/* Status Header */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-slate-100">
                            <div className="space-y-2">
                                <h2 className="text-xl font-bold text-slate-900">Standard Service Protocols</h2>
                                <p className="text-slate-500 text-sm">Last update validated by our technical and legal departments.</p>
                            </div>
                            <div className="bg-slate-100 text-slate-900 text-[11px] font-bold px-4 py-2 rounded-full border border-slate-200 flex items-center gap-3">
                                <span className="flex h-2 w-2 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                                </span>
                                VERSION {year}.PROTOCOL_01
                            </div>
                        </div>

                        {/* Interactive Section Cards */}
                        <div className="space-y-8">
                            {termsSections.map((section, idx) => (
                                <motion.section
                                    key={section.id}
                                    id={section.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    className={`relative group p-10 rounded-[3rem] bg-white border border-slate-100 transition-all duration-500 ${activeSection === section.id
                                        ? "shadow-2xl shadow-violet-200/40 border-violet-500/20"
                                        : "hover:border-slate-200"
                                        }`}
                                >
                                    <div className="flex flex-col md:flex-row gap-10">
                                        <div className="flex-shrink-0">
                                            <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-all duration-500 ${activeSection === section.id
                                                ? "bg-slate-900 text-white shadow-lg"
                                                : "bg-slate-50 text-slate-400 group-hover:bg-slate-100 group-hover:text-slate-900"
                                                }`}>
                                                {section.icon}
                                            </div>
                                        </div>

                                        <div className="space-y-6 flex-grow">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-3 text-[10px] font-mono font-bold text-violet-500/60 uppercase tracking-widest">
                                                    <span>ARTICLE_0{idx + 1}</span>
                                                    <span className="w-1 h-1 rounded-full bg-slate-200" />
                                                    <span>CORE_POLICY</span>
                                                </div>
                                                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                                                    {section.title}
                                                </h3>
                                            </div>

                                            <div className="prose prose-slate prose-lg max-w-none text-slate-500 leading-relaxed font-medium">
                                                <p className="text-slate-600">{section.content}</p>

                                                {section.details && (
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
                                                        {section.details.map((detail, dIdx) => (
                                                            <div key={dIdx} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/80 border border-slate-100 group/item hover:bg-violet-50 hover:border-violet-100 transition-all">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-violet-400 group-hover/item:scale-150 transition-transform" />
                                                                <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">{detail}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.section>
                            ))}
                        </div>

                        {/* --- INQUIRY BRIDGE (CONTACT) --- */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-slate-900 rounded-[3.5rem] p-12 text-white relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-full opacity-10">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white rounded-full animate-ping" />
                            </div>

                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                                <div className="flex-grow space-y-4 text-center md:text-left">
                                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 border border-white/10">
                                        <MessageSquare size={16} className="text-violet-400" />
                                        <span className="text-[10px] font-mono font-bold text-violet-400 tracking-widest uppercase">Support_Terminal</span>
                                    </div>
                                    <h2 className="text-4xl font-logo font-bold tracking-tight">Need technical clarification?</h2>
                                    <p className="text-white/50 font-medium max-w-md">Our execution team can provide detailed breakdowns of our operational protocols and project agreements.</p>
                                </div>

                                <div className="flex flex-col gap-4 w-full md:w-auto">
                                    <a href="mailto:hello@brocode.com" className="group flex items-center justify-between p-6 w-full md:w-72 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
                                                <Mail className="text-violet-400" size={20} />
                                            </div>
                                            <div className="text-left">
                                                <p className="text-[10px] font-mono text-white/40 uppercase">E-Mail</p>
                                                <p className="font-bold text-sm">hello@brocode.com</p>
                                            </div>
                                        </div>
                                        <ArrowRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" size={20} />
                                    </a>
                                    <a href="https://wa.me/919876543210" target="_blank" className="group flex items-center justify-between p-6 w-full md:w-72 rounded-[2rem] bg-violet-600 hover:bg-violet-700 transition-all shadow-2xl shadow-violet-600/30">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                                                <MessageSquare size={20} fill="currentColor" />
                                            </div>
                                            <div className="text-left text-white">
                                                <p className="text-[10px] font-mono text-white/60 uppercase">Live_Connect</p>
                                                <p className="font-bold text-sm">WhatsApp Studio</p>
                                            </div>
                                        </div>
                                        <ArrowRight className="opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" size={20} />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Architectural spacer */}
            <div className="h-32 bg-gradient-to-t from-[#020617] to-transparent" />
        </div>
    );
}
