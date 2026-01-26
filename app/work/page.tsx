"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { WorkBackground } from "@/components/work/WorkBackground";
import { ArrowUpRight, Eye, Layers, Zap } from "lucide-react";
import Link from "next/link";

import { projects, Project } from "@/app/data/projects";



const CinematicProject = ({ project, index }: { project: Project, index: number }) => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Opposite movements for cinematic tension
    const imageX = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const invertedImageX = useTransform(imageX, (v) => -v);
    const textX = useTransform(scrollYProgress, [0, 1], [-50, 50]);
    const invertedTextX = useTransform(textX, (v) => -v);
    const imageRotate = useTransform(scrollYProgress, [0, 1], [5, -5]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const isEven = index % 2 === 0;

    return (
        <section ref={sectionRef} className="min-h-screen flex items-center justify-center relative py-20 px-4 md:px-0">
            <motion.div
                style={{ opacity }}
                className={`container mx-auto flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-10 md:gap-20`}
            >
                {/* Visual Side */}
                <div className="w-full md:w-3/5 perspective-2000">
                    <motion.div
                        style={{
                            x: isEven ? imageX : invertedImageX,
                            rotateY: isEven ? -15 : 15,
                            rotate: imageRotate
                        }}
                        className="relative group cursor-none"
                    >
                        <div className="relative aspect-[16/10] md:aspect-[4/3] overflow-hidden rounded-[40px] shadow-2xl">
                            {/* Inner Glow Border */}
                            <div className="absolute inset-0 border-[20px] border-white/5 z-10 pointer-events-none" />

                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 ease-out"
                            />

                            {/* Atmospheric Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                            {/* Hover Reveal Items */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
                                <Button className="rounded-full bg-white text-black hover:bg-black hover:text-white px-8 h-12 gap-2 shadow-xl">
                                    <Eye className="w-4 h-4" />
                                    Explore Blueprint
                                </Button>
                            </div>
                        </div>

                        {/* Floating Decorative Elements */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-10 -right-10 hidden md:block"
                        >
                            <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/40 shadow-lg">
                                <Layers className="w-6 h-6 text-indigo-600 mb-2" />
                                <div className="text-[10px] font-mono text-slate-400">STRUCT_V0{index + 1}</div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Textual Side */}
                <div className="w-full md:w-2/5 relative z-10">
                    <motion.div style={{ x: isEven ? textX : invertedTextX }}>
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-[120px] font-black opacity-[0.05] absolute -left-12 -top-16 select-none leading-none">
                                {project.id}
                            </span>
                            <div className="w-10 h-px bg-black/20" />
                            <span className="font-mono text-xs tracking-[0.4em] uppercase text-indigo-600 font-bold">
                                {project.category}
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-7xl font-black mb-8 leading-none italic tracking-tighter text-slate-900">
                            {project.title}
                        </h2>

                        <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-md">
                            {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-10">
                            {project.stack.map((tag: string) => (
                                <span key={tag} className="px-4 py-1.5 rounded-full bg-slate-100 text-slate-500 font-mono text-[10px] tracking-wider uppercase">
                                    {tag}
                                </span >
                            ))}
                        </div>

                        <Link href={`/work/${project.slug}`} className="group flex items-center gap-3 w-fit">
                            <div className="w-14 h-14 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-300">
                                <ArrowUpRight className="w-6 h-6 rotate-0 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                            </div>
                            <span className="text-sm font-bold uppercase tracking-widest">View Case Study</span>
                        </Link>
                    </motion.div>
                </div>
            </motion.div>

            {/* Cinematic Background Lines */}
            <div className={`absolute top-1/2 ${isEven ? 'right-0' : 'left-0'} w-1/2 h-[1px] bg-gradient-to-r from-transparent via-black/5 to-transparent -z-10`} />
        </section>
    );
};

export default function WorkPage() {
    const [particles] = useState(() => Array.from({ length: 5 }).map((_, i) => ({
        x: Math.random() * 100 - 50,
        duration: 1 + Math.random(),
        delay: i * 0.2,
        left: `${20 + i * 15}%`
    })));

    // Removed unused mousePosition state


    return (
        <main className="relative bg-[#fcfcfc] selection:bg-black selection:text-white overflow-hidden">
            <WorkBackground />

            {/* Extreme Hero Header */}
            <section className="min-h-screen flex flex-col justify-center relative px-6 md:px-12 pointer-events-none">
                <div className="container mx-auto">
                    <div className="relative mb-8">
                        <motion.div
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 0.1 }}
                            className="text-[15vw] md:text-[25vw] font-black leading-none select-none text-slate-900 flex justify-center w-full"
                        >
                            WORKS
                        </motion.div>
                        <div className="absolute inset-0 flex flex-col justify-center pointer-events-auto">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="flex items-center gap-4 mb-6"
                            >
                                <Zap className="w-5 h-5 text-indigo-600 fill-indigo-600 animate-pulse" />
                                <span className="font-mono text-sm tracking-[0.5em] font-bold uppercase">Archive // 2025</span>
                            </motion.div>

                            <h1 className="text-6xl md:text-[10rem] font-black leading-[0.8] tracking-tighter text-slate-900 max-w-6xl">
                                BEYOND THE<br />
                                <span className="text-gradient hover:animate-pulse transition-all">PIXELS</span>
                            </h1>
                        </div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="max-w-xl md:ml-auto md:text-right pointer-events-auto"
                    >
                        <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed italic">
                            &quot;Crafting digital legacies where strategy meets high-concept artistry.&quot;
                        </p>
                        <div className="mt-8 flex md:justify-end gap-10">
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold">12+</span>
                                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400">Awards</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-3xl font-bold">400%</span>
                                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400">Avg Growth</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Vertical Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400">Scroll to Explore</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-black/20 to-transparent" />
                </motion.div>
            </section>

            {/* Cinematic Storyboard Sections */}
            <div className="relative pb-40">
                {projects.map((project, index) => (
                    <CinematicProject key={project.id} project={project} index={index} />
                ))}
            </div>

            {/* Extraordinary Bottom Call - High Contrast Dark Section */}
            <section className="relative py-40 overflow-hidden bg-[#020617] mt-20">
                {/* Advanced Atmospheric Background */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_#6366f115_0%,_transparent_70%)]" />
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.1, 0.15, 0.1],
                            x: [0, 50, -50, 0],
                            y: [0, -50, 50, 0]
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full"
                    />
                </div>

                <div className="container mx-auto text-center relative z-10 px-6">
                    <motion.div
                        whileInView={{ y: [20, 0], opacity: [0, 1] }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-12"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/60">New Chapter</span>
                    </motion.div>

                    <h2 className="text-7xl md:text-[11vw] font-black text-white leading-[0.85] tracking-tighter mb-20 drop-shadow-2xl">
                        <span className="block opacity-60">READY TO</span>
                        <motion.span
                            initial={{ x: -100, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 1, ease: "circOut" }}
                            className="block text-gradient mt-4"
                        >
                            ELEVATE?
                        </motion.span>
                    </h2>

                    <div className="flex justify-center">
                        <Link href="/contact" className="relative group">
                            {/* Extraordinary CTA Outer Glow */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full blur-2xl opacity-10 group-hover:opacity-30 transition-opacity duration-500" />

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative flex items-center gap-6 px-12 py-8 bg-white rounded-full overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.1)] transition-all duration-500"
                            >
                                {/* Moving Internal Shimmer Effect */}
                                <motion.div
                                    className="absolute inset-x-[-100%] inset-y-0 bg-gradient-to-r from-transparent via-indigo-100 to-transparent skew-x-[35deg]"
                                    animate={{ x: ["-100%", "200%"] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                />

                                {/* Background "Liquid" Expansion on Hover */}
                                <div className="absolute inset-0 bg-black translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)]" />

                                <span className="relative z-10 text-2xl md:text-3xl font-black uppercase tracking-tighter text-black group-hover:text-white transition-colors duration-300">
                                    Let&apos;s Launch
                                </span>

                                <div className="relative z-10 w-12 h-12 rounded-full bg-black group-hover:bg-white flex items-center justify-center transition-colors duration-300">
                                    <ArrowUpRight className="w-6 h-6 text-white group-hover:text-black group-hover:rotate-45 transition-all duration-500" />
                                </div>

                                {/* Extra Visual: Floating Particles */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                    {particles.map((p, i) => (
                                        <motion.div
                                            key={i}
                                            className="absolute w-1 h-1 bg-white rounded-full"
                                            animate={{
                                                y: [0, -50],
                                                x: p.x,
                                                opacity: [0.8, 0]
                                            }}
                                            transition={{
                                                duration: p.duration,
                                                repeat: Infinity,
                                                delay: p.delay
                                            }}
                                            style={{
                                                left: p.left,
                                                bottom: "0px"
                                            }}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        </Link>
                    </div>

                    {/* Meta Info */}
                    <div className="mt-32 pt-20 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-10">
                        <div className="flex items-center gap-10">
                            <div className="text-left">
                                <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">Status</div>
                                <div className="text-sm font-bold text-white flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-500" />
                                    Booking for Q2 2025
                                </div>
                            </div>
                            <div className="text-left">
                                <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1">Loc</div>
                                <div className="text-sm font-bold text-white uppercase tracking-tight">Worldwide • Rem</div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="p-4 rounded-2xl border border-white/10 bg-white/5 text-white/60 text-xs font-mono">
                                0x_STUDIO_ACCESS_GRANTED
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
