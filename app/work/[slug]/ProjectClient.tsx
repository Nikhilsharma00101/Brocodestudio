"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, Variants, useMotionValue } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Zap, BarChart3 } from "lucide-react";
import { useRef, useEffect } from "react";
import { Project } from "@/app/data/projects";

// Animation Variants
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3
        }
    }
};

const scaleIn: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
};

interface ProjectClientProps {
    project: Project;
    nextProject: Project | null;
}

export default function ProjectClient({ project, nextProject }: ProjectClientProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Parallax & Transform Logic
    const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
    const heroBlur = useTransform(scrollYProgress, [0, 0.2], [0, 10]);
    const heroY = useTransform(scrollYProgress, [0, 0.25], [0, 200]);
    const contentY = useTransform(scrollYProgress, [0.1, 0.3], [100, 0]);

    // Mouse follow effect for magnetic buttons
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = ({ clientX, clientY }: { clientX: number, clientY: number }) => {
            mouseX.set(clientX);
            mouseY.set(clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <main ref={containerRef} className="bg-[#0b0c10] min-h-screen relative overflow-hidden selection:bg-indigo-500 selection:text-white text-slate-200">
            {/* Ambient Background Noise */}
            <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: 'url("/noise.png")' }}></div>

            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600 z-50 origin-left"
                style={{ scaleX }}
            />

            {/* Floating Navigation */}
            <nav className="fixed top-6 left-0 w-full px-6 md:px-12 flex justify-between items-center z-40 pointer-events-none">
                <Link href="/work" className="pointer-events-auto group">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-3 bg-white/5 backdrop-blur-xl px-6 py-3 rounded-full border border-white/10 hover:border-white/20 transition-all shadow-[0_8px_32px_rgba(0,0,0,0.12)] group-hover:bg-white/10"
                    >
                        <ArrowLeft className="w-4 h-4 text-white group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-white/80 group-hover:text-white">Back to Base</span>
                    </motion.div>
                </Link>

                <div className="hidden md:flex items-center gap-4 bg-white/5 backdrop-blur-xl px-6 py-3 rounded-full border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-mono text-white/60 uppercase tracking-widest">System Online</span>
                </div>
            </nav>

            {/* Immersive Hero Section */}
            <section className="relative h-screen w-full overflow-hidden flex items-end">
                <motion.div
                    style={{ scale: heroScale, filter: `blur(${heroBlur}px)` }}
                    className="absolute inset-0 z-0"
                >
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-[#0b0c10]/50 to-transparent" />
                    <div className="absolute inset-0 bg-black/40" />
                </motion.div>

                <div className="relative z-10 w-full px-6 md:px-20 pb-20 max-w-[1800px] mx-auto">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        style={{ y: heroY }}
                        className="flex flex-col md:flex-row md:items-end justify-between gap-10"
                    >
                        <div className="max-w-4xl">
                            <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-6">
                                <div className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-mono font-bold uppercase tracking-[0.2em] rounded-sm">
                                    Project {project.id}
                                </div>
                                <span className="h-px w-12 bg-white/20" />
                                <span className="text-sm font-bold uppercase tracking-widest text-indigo-400">
                                    {project.category}
                                </span>
                            </motion.div>

                            <motion.h1 variants={fadeInUp} className="text-6xl md:text-[8vw] font-black leading-[0.85] tracking-tighter text-white mb-8 mix-blend-overlay">
                                {project.title.toUpperCase()}
                            </motion.h1>

                            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed font-light border-l-2 border-indigo-500 pl-6">
                                {project.description}
                            </motion.p>
                        </div>

                        <motion.div variants={scaleIn} className="flex flex-col gap-4 min-w-[200px]">
                            <div className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
                                <div className="text-xs uppercase tracking-widest text-slate-500 mb-2 font-mono">Role</div>
                                <div className="text-white font-medium text-lg">{project.role || "Lead Tech"}</div>
                            </div>
                            <div className="p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl hover:bg-white/10 transition-colors">
                                <div className="text-xs uppercase tracking-widest text-slate-500 mb-2 font-mono">Date</div>
                                <div className="text-white font-medium text-lg">{project.timeline || "2024 - Present"}</div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Mission Report / Content */}
            <motion.section
                style={{ y: contentY }}
                className="relative z-20 px-6 md:px-20 py-32 max-w-[1800px] mx-auto"
            >
                <div className="grid md:grid-cols-12 gap-20">
                    {/* Sticky Sidebar */}
                    <div className="md:col-span-4 relative">
                        <div className="sticky top-32">
                            <h3 className="text-xs font-mono text-indigo-500 uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
                                <Zap className="w-4 h-4" />
                                Core Analysis
                            </h3>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-10 leading-tight">
                                Challenges & <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Tactical Solutions</span>
                            </h2>
                            <p className="text-slate-400 leading-relaxed mb-12">
                                We approach every project as a unique ecosystem. Here is how we dissected the problem and engineered a breakthrough.
                            </p>

                            <div className="hidden md:block w-full h-[1px] bg-gradient-to-r from-white/20 to-transparent mb-12" />

                            <div className="flex flex-col gap-8">
                                <div className="flex gap-4">
                                    {project.stack.slice(0, 3).map((tech, i) => (
                                        <div key={i} className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] text-white/50 font-mono" title={tech}>
                                            {tech.substring(0, 2).toUpperCase()}
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col gap-8">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center justify-between">
                                            <h4 className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-[0.3em]">Deployment Node</h4>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[9px] font-mono text-white/30 uppercase tracking-tighter">Secure.0x82</span>
                                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_10px_rgba(99,102,241,1)]" />
                                            </div>
                                        </div>
                                        <div className="h-px w-full bg-gradient-to-r from-indigo-500/50 via-white/10 to-transparent" />
                                    </div>

                                    {project.liveLink ? (
                                        <div className="relative">
                                            {/* Minimalist Professional Link Module */}
                                            <a
                                                href={project.liveLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group/deploy block"
                                            >
                                                <motion.div
                                                    whileHover={{ y: -2 }}
                                                    className="relative p-6 rounded-[2rem] bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-colors duration-500 overflow-hidden"
                                                >
                                                    {/* Interactive Background Grid */}
                                                    <div className="absolute inset-0 opacity-10 group-hover/deploy:opacity-20 transition-opacity">
                                                        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '16px 16px' }} />
                                                    </div>

                                                    {/* Shifting Light Refraction */}
                                                    <motion.div
                                                        className="absolute inset-x-[-100%] top-0 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-20deg]"
                                                        animate={{ x: ["-100%", "200%"] }}
                                                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                                    />

                                                    <div className="relative z-10">
                                                        <div className="flex flex-col gap-4">
                                                            <div className="flex items-center justify-between">
                                                                <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Source Path</div>
                                                                <span className="text-[10px] font-mono text-indigo-400">ecoluxe.prod_v4</span>
                                                            </div>

                                                            <div className="py-2">
                                                                <span className="block text-sm font-mono text-white/60 mb-1">https://</span>
                                                                <h3 className="text-xl font-bold text-white tracking-tight group-hover/deploy:text-indigo-400 transition-colors">
                                                                    {project.liveLink.replace('https://', '')}
                                                                </h3>
                                                            </div>

                                                            <div className="pt-4 flex items-center justify-between">
                                                                <div className="flex items-center gap-2">
                                                                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-white group-hover/deploy:text-indigo-400 transition-colors">View Live Project</span>
                                                                    <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover/deploy:bg-indigo-600 group-hover/deploy:border-indigo-600 transition-all">
                                                                        <ArrowUpRight className="w-4 h-4" />
                                                                    </div>
                                                                </div>

                                                                {/* Dynamic Visual: Signal Bars */}
                                                                <div className="flex items-end gap-1 h-4">
                                                                    {[0.4, 0.7, 0.5, 0.9].map((h, i) => (
                                                                        <motion.div
                                                                            key={i}
                                                                            animate={{ height: [`${h * 100}%`, `${(h * 0.5) * 100}%`, `${h * 100}%`] }}
                                                                            transition={{ duration: 1 + i * 0.2, repeat: Infinity }}
                                                                            className="w-1 bg-indigo-500/40 rounded-full"
                                                                        />
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            </a>

                                            {/* Subtitle Telemetry */}
                                            <div className="mt-4 flex items-center justify-between px-2">
                                                <div className="flex items-center gap-4">
                                                    <div className="flex flex-col">
                                                        <span className="text-[8px] font-mono text-white/20 uppercase">Status</span>
                                                        <span className="text-[9px] font-mono text-green-500">Online</span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[8px] font-mono text-white/20 uppercase">Enc</span>
                                                        <span className="text-[9px] font-mono text-white/60">SSL-AES</span>
                                                    </div>
                                                </div>
                                                <div className="text-[8px] font-mono text-white/20 uppercase">Node_ID: BC-SY-02</div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="relative opacity-50 hover:opacity-100 transition-opacity duration-500">
                                            <div className="p-8 rounded-[2rem] border border-dashed border-white/10 bg-white/5 flex flex-col items-center justify-center gap-6 min-h-[200px]">
                                                <div className="relative">
                                                    <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full animate-pulse" />
                                                    <Zap className="w-8 h-8 text-white/40 relative z-10" />
                                                </div>

                                                <div className="text-center">
                                                    <h3 className="text-sm font-bold text-white tracking-widest uppercase mb-1">Transmission Offline</h3>
                                                    <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">Source Code Archived</span>
                                                </div>

                                                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/20 border border-white/5">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                                    <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest">Signal_Loss_0x99</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Flow */}
                    <div className="md:col-span-8 flex flex-col gap-20">
                        {/* Challenge Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="group relative p-10 md:p-16 bg-[#111218] rounded-[3rem] border border-white/5 overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
                                <span className="text-[12rem] font-black leading-none text-white">01</span>
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <span className="w-2 h-2 bg-red-500 rounded-full box-shadow-[0_0_10px_red]" />
                                The Problem
                            </h3>
                            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed font-light relative z-10">
                                {project.challenge || project.description}
                            </p>
                        </motion.div>

                        {/* Solution Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="group relative p-10 md:p-16 bg-gradient-to-br from-[#1a1b26] to-[#0f1016] rounded-[3rem] border border-indigo-500/20 overflow-hidden shadow-[0_0_50px_rgba(99,102,241,0.05)]"
                        >
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                            <div className="absolute bottom-0 left-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
                                <span className="text-[12rem] font-black leading-none text-white">02</span>
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <span className="w-2 h-2 bg-green-500 rounded-full box-shadow-[0_0_10px_green]" />
                                The Solution
                            </h3>
                            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed font-light relative z-10">
                                {project.solution || "Proprietary solution details unavailable."}
                            </p>


                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Impact Metric Grid */}
            {project.impact && (
                <section className="py-32 bg-[#050608] relative">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <div className="mb-20 flex flex-col md:flex-row items-end justify-between gap-8">
                            <div>
                                <h2 className="text-5xl md:text-7xl font-black text-white mb-4">IMPACT<br />METRICS</h2>
                                <p className="text-slate-500 max-w-md">Quantifiable results derived from our deployment.</p>
                            </div>
                            <div className="flex gap-2">
                                <div className="w-12 h-1 bg-indigo-600 rounded-full" />
                                <div className="w-12 h-1 bg-white/10 rounded-full" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {project.impact.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ y: -10 }}
                                    className="relative p-10 rounded-3xl bg-[#0f1016] border border-white/5 overflow-hidden group"
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-[50px] group-hover:bg-indigo-500/20 transition-all" />

                                    <div className="relative z-10">
                                        <div className="flex items-center gap-2 mb-6 text-slate-500">
                                            <BarChart3 className="w-4 h-4" />
                                            <span className="text-xs font-mono uppercase tracking-widest">{stat.label}</span>
                                        </div>
                                        <div className="text-6xl md:text-7xl font-bold text-white tracking-tighter group-hover:text-indigo-400 transition-colors">
                                            {stat.value}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Cinematic Gallery */}
            {project.gallery && (
                <section className="py-32 px-6 overflow-hidden">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-center mb-20"
                    >
                        <span className="text-indigo-500 font-mono text-xs uppercase tracking-[0.5em]">Visual Records</span>
                        <h2 className="text-6xl md:text-[10vw] font-black text-[#1a1b26] mt-4 select-none leading-none">GALLERY</h2>
                    </motion.div>

                    <div className="container mx-auto max-w-[1800px]">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                            {project.gallery.map((img, i) => (
                                <motion.div
                                    key={i}
                                    className={`relative rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 ease-out group ${i === 0 ? 'md:col-span-8 md:row-span-2 aspect-[16/9]' :
                                        i === 1 ? 'md:col-span-4 md:row-span-1 aspect-[4/3]' :
                                            'md:col-span-4 md:row-span-1 aspect-[4/3]'
                                        }`}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: i * 0.2 }}
                                >
                                    <Image
                                        src={img}
                                        alt="Project visual"
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Seamless Next Project */}
            {nextProject && (
                <Link href={`/work/${nextProject.slug}`}>
                    <section className="relative h-[80vh] flex flex-col items-center justify-center overflow-hidden cursor-none group bg-black">
                        <motion.div
                            className="absolute inset-0 z-0 opacity-40 group-hover:opacity-60 transition-opacity duration-700"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 1.5 }}
                        >
                            <Image
                                src={nextProject.image}
                                alt="Next Project"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors" />
                        </motion.div>

                        <div className="relative z-10 text-center mix-blend-difference text-white">
                            <span className="block text-sm font-mono uppercase tracking-[0.5em] mb-4">Next Entry</span>
                            <h2 className="text-[12vw] leading-none font-black tracking-tighter group-hover:scale-110 transition-transform duration-500">
                                {nextProject.title}
                            </h2>
                        </div>

                        <motion.div
                            style={{
                                x: mouseX,
                                y: mouseY,
                            }}
                            className="fixed top-0 left-0 w-24 h-24 bg-indigo-600 rounded-full blur-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-20 mix-blend-screen"
                        />
                    </section>
                </Link>
            )}
        </main>
    );
}
