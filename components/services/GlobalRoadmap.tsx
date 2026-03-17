"use client";

import { motion } from "framer-motion";
import { Globe, Server, ShieldCheck, Zap } from "lucide-react";

const features = [
    {
        title: "Global Edge Infrastructure",
        description: "Your digital presence deployed across 30+ global edge locations. Ensuring blazing-fast load times whether your customers are in New York, Tokyo, or London.",
        icon: Server,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20"
    },
    {
        title: "Auto-Localization Engine",
        description: "Intelligently adapt content, currency, and formatting based on user geolocation, providing a native experience for international markets instantly.",
        icon: Globe,
        color: "text-indigo-500",
        bg: "bg-indigo-500/10",
        border: "border-indigo-500/20"
    },
    {
        title: "Universal Compliance",
        description: "Built-in architecture designed to meet international data protection standards including GDPR and CCPA, keeping your global operations secure.",
        icon: ShieldCheck,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20"
    },
    {
        title: "High-Volume Scaling",
        description: "Enterprise-grade architecture capable of handling viral traffic spikes seamlessly, ensuring your business never misses an international opportunity.",
        icon: Zap,
        color: "text-amber-500",
        bg: "bg-amber-500/10",
        border: "border-amber-500/20"
    }
];

export function GlobalRoadmap() {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container px-4 md:px-6 mx-auto relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-bold uppercase tracking-widest text-primary mb-6"
                    >
                        <Globe className="w-3 h-3 text-indigo-500" />
                        International Scale
                    </motion.div>

                    <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-[1.1] tracking-tight text-balance">
                        The <span className="text-gradient">Global</span> Nexus
                    </h2>
                    <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
                        Scale beyond borders. We engineer enterprise-grade platforms designed to capture international markets, delivering seamless experiences worldwide.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="group glass-premium p-8 rounded-[32px] border-white/60 hover:border-primary/20 transition-all duration-300 relative overflow-hidden"
                        >
                            <div className={`absolute top-0 right-0 w-32 h-32 ${feature.bg} opacity-0 group-hover:opacity-100 transition-opacity blur-3xl rounded-full -mr-16 -mt-16`} />

                            <div className="relative z-10">
                                <div className={`p-4 rounded-2xl ${feature.bg} ${feature.color} border ${feature.border} w-fit mb-6 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                                    <feature.icon className="w-6 h-6 flex-shrink-0" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4 tracking-tight text-foreground group-hover:text-primary transition-colors">{feature.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/90 transition-colors">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
