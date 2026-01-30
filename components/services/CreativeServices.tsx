"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";

const services = [
    {
        id: 1,
        title: "Portfolio Websites",
        simpleTitle: "Your Professional Story",
        description: "Showcase your work and skills to the world. Perfect for freelancers and creatives.",
        color: "bg-orange-400",
        rotate: "-rotate-6",
        colSpan: "col-span-1 md:col-span-2",
        delay: 0
    },
    {
        id: 2,
        title: "Landing Pages",
        simpleTitle: "One-Page Impact",
        description: "Focus on one goal: Getting results. High-conversion designs for ads and campaigns.",
        color: "bg-cyan-400",
        rotate: "rotate-3",
        colSpan: "col-span-1 md:col-span-1",
        delay: 0.1
    },
    {
        id: 3,
        title: "Student Portfolios",
        simpleTitle: "Career Liftoff",
        description: "Stand out in job applications. A personal website that impresses recruiters.",
        color: "bg-fuchsia-400",
        rotate: "-rotate-3",
        colSpan: "col-span-1 md:col-span-1",
        delay: 0.2
    },
    {
        id: 4,
        title: "Banner Design",
        simpleTitle: "Visual Hooks",
        description: "Eye-catching graphics for social media, ads, or your website header.",
        color: "bg-emerald-400",
        rotate: "rotate-6",
        colSpan: "col-span-1 md:col-span-2",
        delay: 0.3
    },
];

export function CreativeServices() {
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);


    // Removed unused y and rotate transforms

    return (
        <section ref={containerRef} className="py-32 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-transparent pointer-events-none">
                <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col md:flex-row gap-12 items-start mb-20">
                    <div className="flex-1">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="inline-block px-4 py-2 rounded-full border border-primary/10 bg-primary/5 text-primary text-xs font-bold tracking-widest uppercase mb-6"
                        >
                            Imagine It, Build It
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-bold leading-tight"
                        >
                            We Craft <span className="text-gradient">Digital Art</span> <br />
                            <span className="text-muted-foreground/50 italic font-serif">Not just code.</span>
                        </motion.h2>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex-1 md:pt-16"
                    >
                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
                            From personal showcases to high-impact sales pages, we design with freedom. No templates, just pure creativity tailored to your story.
                        </p>
                    </motion.div>
                </div>

                {/* The "Scatter" Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 auto-rows-min">
                    {services.map((item, index) => (
                        <Card key={item.id} item={item} index={index} router={router} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function Card({ item, index, router }: { item: typeof services[0], index: number, router: ReturnType<typeof useRouter> }) {
    // Deterministic visual jitter based on index
    const randomY = (index % 5) * 10 - 20;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 + randomY, rotate: 0 }}
            whileInView={{
                opacity: 1,
                y: 0,
                rotate: item.rotate === "rotate-3" ? 3 : item.rotate === "-rotate-3" ? -3 : item.rotate === "rotate-6" ? 6 : -6
            }}
            whileHover={{
                y: -10,
                rotate: 0,
                scale: 1.02,
                zIndex: 10
            }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            onClick={() => router.push("/contact")}
            className={`
                group cursor-pointer relative p-1 rounded-[40px]
                ${item.colSpan}
                min-h-[300px] flex flex-col justify-between
            `}
        >
            {/* Morphing Border Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/40 dark:from-white/10 dark:to-white/5 backdrop-blur-xl rounded-[40px] border border-white/50 shadow-lg group-hover:shadow-2xl transition-all duration-500 overflow-hidden">
                <div className={`absolute top-0 right-0 w-32 h-32 ${item.color} opacity-20 blur-[50px] group-hover:opacity-40 transition-all duration-500 group-hover:scale-150`} />
                <div className="absolute inset-0 bg-white/50 dark:bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] font-black tracking-[0.2em] uppercase opacity-40">0{item.id}</span>
                        <div className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                            <ArrowUpRight className="w-5 h-5" />
                        </div>
                    </div>
                    <h3 className="text-3xl font-bold mb-2 tracking-tight group-hover:text-primary transition-colors">{item.simpleTitle}</h3>
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6 opacity-70">{item.title}</p>
                </div>

                <div>
                    <p className="text-foreground/80 font-medium leading-relaxed group-hover:text-foreground transition-colors">
                        {item.description}
                    </p>
                </div>
            </div>
        </motion.div>
    )
}
