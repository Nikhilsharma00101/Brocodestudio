"use client";

import { motion } from "framer-motion";
import { Users, Target, Lightbulb, Code2 } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { AboutHeroBackground } from "@/components/about/AboutHeroBackground";

// About Page Content
export default function AboutPage() {
    return (
        <div className="relative overflow-hidden pt-32 pb-20">
            <AboutHeroBackground />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <span className="text-secondary-foreground/60 text-sm font-semibold uppercase tracking-widest block mb-4">
                        Who We Are
                    </span>
                    <h1 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight">
                        More Than Digital.<br />
                        <span className="text-gradient">We Are Partners.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                        BroCode Studio isn&apos;t just a service provider. We are a collective of passionate creatives, developers, and strategists dedicated to transforming your vision into digital reality.
                    </p>
                </motion.div>

                {/* Vision & Mission */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                    <GlassCard className="p-10 border-cyan-100/50">
                        <Target className="w-12 h-12 text-cyan-500 mb-6" />
                        <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            To empower businesses with premium, high-performance digital tools that not only look stunning but drive measurable growth and engagement.
                        </p>
                    </GlassCard>
                    <GlassCard className="p-10 border-violet-100/50">
                        <Lightbulb className="w-12 h-12 text-violet-500 mb-6" />
                        <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            To become the go-to digital partners for ambitious brands, setting new standards for design excellence and technical precision in the industry.
                        </p>
                    </GlassCard>
                </div>

                {/* Team Values */}
                <div className="mb-20">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">The BroCode Difference</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <ValueCard
                            icon={<Users className="w-8 h-8 text-blue-500" />}
                            title="Collaborative Spirit"
                            description="We believe the best ideas come from teamwork. We work with you, not just for you."
                        />
                        <ValueCard
                            icon={<Code2 className="w-8 h-8 text-indigo-500" />}
                            title="Technical Mastery"
                            description="Beautiful design meets clean, efficient code. We don't compromise on performance."
                        />
                        <ValueCard
                            icon={<Target className="w-8 h-8 text-purple-500" />}
                            title="Result Oriented"
                            description="Every pixel and every line of code is crafted with your business goals in mind."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function ValueCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
    return (
        <div className="flex flex-col items-center text-center p-6">
            <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-6">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">{description}</p>
        </div>
    );
}
