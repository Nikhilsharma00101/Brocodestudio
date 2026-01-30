"use client";

import { Check, Rocket, Shield, Zap, Sparkles, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRouter } from "next/navigation";
import { ServicesBackground } from "@/components/services/ServicesBackground";
import { EcommerceShowcase } from "@/components/services/EcommerceShowcase";
import { CreativeServices } from "@/components/services/CreativeServices";

const packages = [
    {
        name: "STARTER PACKAGE",
        price: "₹9,999",
        description: "Ideal for new and small businesses starting their online presence.",
        icon: Rocket,
        gradient: "from-cyan-500/20 to-blue-500/20",
        accent: "border-cyan-500/50",
        features: [
            {
                title: "1-Page Business Website",
                items: [
                    "Mobile-friendly landing page",
                    "Basic sections: About, Services, Contact",
                    "Call Now & WhatsApp buttons"
                ]
            },
            {
                title: "Basic Google Business Profile (GBP)",
                items: [
                    "Google Business Profile setup",
                    "Correct business category selection",
                    "Basic business description",
                    "Address, map pin, contact details"
                ]
            },
            {
                title: "Basic Logo",
                items: [
                    "1 simple professional logo",
                    "Delivered in PNG/JPG format"
                ]
            }
        ],
        recommended: false,
    },
    {
        name: "STANDARD PACKAGE",
        price: "₹18,999",
        description: "Best for growing businesses that want better visibility and branding.",
        icon: Shield,
        gradient: "from-violet-500/20 to-purple-500/20",
        accent: "border-violet-500/50",
        features: [
            {
                title: "Up to 5-Page Website",
                items: [
                    "Home, About, Services, Contact",
                    "One additional page (FAQ / Gallery / Products / Team / Doctor)",
                    "Fully responsive on all devices"
                ]
            },
            {
                title: "Optimized Google Business Profile",
                items: [
                    "Keyword-optimized business description",
                    "Services section fully added",
                    "Business hours & service areas configured",
                    "Profile optimized for better local visibility"
                ]
            },
            {
                title: "AI-Assisted Content & Image Generation",
                items: [
                    "Website content written/refined using AI assistance",
                    "AI-generated industry-relevant images",
                    "Manual review and final editing included"
                ]
            },
            {
                title: "Logo Design / Refinement",
                items: [
                    "Existing logo refinement OR new logo creation",
                    "2–3 logo concepts provided"
                ]
            },
            {
                title: "Visiting Card Redesign",
                items: [
                    "Front & back visiting card design",
                    "QR code (Google Map or Website)",
                    "Print-ready PDF and digital sharing format"
                ]
            }
        ],
        recommended: true,
    },
    {
        name: "PREMIUM PACKAGE",
        price: "₹29,999",
        description: "Complete professional branding and online presence for established businesses.",
        icon: Zap,
        gradient: "from-blue-500/20 to-indigo-500/20",
        accent: "border-blue-500/50",
        features: [
            {
                title: "Up to 10-Page Advanced Website",
                items: [
                    "Custom high-end layout & UI components",
                    "Advanced animations & micro-interactions",
                    "Fully optimized for mobile, tablet & desktop"
                ]
            },
            {
                title: "Premium AI & Content Strategy",
                items: [
                    "Full website copywriting & brand voice setup",
                    "AI-generated high-definition industry visuals",
                    "Strategic content structure for conversion"
                ]
            },
            {
                title: "Vanguard SEO & Performance",
                items: [
                    "Advanced On-page SEO optimization",
                    "Speed & Core Web Vitals engineering",
                    "Technical SEO (Sitemaps, Schema Markup)"
                ]
            },
            {
                title: "Google Business Mastery",
                items: [
                    "Full professional profile optimization",
                    "Product & Service catalogs setup",
                    "Strategy for review growth & local ranking"
                ]
            },
            {
                title: "Complete Identity Suite",
                items: [
                    "5 Professional Logo concepts & source files",
                    "Premium Double-sided Visiting Card design",
                    "3 complete revision cycles"
                ]
            },
            {
                title: "Priority Launch & Support",
                items: [
                    "Priority development timeline",
                    "1 month of technical maintenance",
                    "3 complete revision cycles"
                ]
            }
        ],
        recommended: false,
    },
];

const termItems = [
    {
        icon: Rocket,
        title: "Base Investment",
        content: "Prices are starting amounts and may vary based on specific business requirements and project complexity.",
        color: "text-cyan-600",
        bg: "bg-cyan-50"
    },
    {
        icon: Shield,
        title: "Hosting & Domain",
        content: "External costs like hosting, domain procurement, and SSL certificates are handled separately unless specified.",
        color: "text-violet-600",
        bg: "bg-violet-50"
    },
    {
        icon: Zap,
        title: "Execution Timeline",
        content: "Project delivery schedules are calculated from the point of final content approval and resource availability.",
        color: "text-blue-600",
        bg: "bg-blue-50"
    },
    {
        icon: Sparkles,
        title: "AI-Powered Assets",
        content: "We utilize advanced AI for illustrative imagery and content refinement to ensure modern high-end visuals.",
        color: "text-indigo-600",
        bg: "bg-indigo-50"
    },
    {
        icon: Check,
        title: "Revision Policy",
        content: "Iterative refinements are tiered by package: Starter (1), Standard (2), and Premium (3) full revision cycles.",
        color: "text-emerald-600",
        bg: "bg-emerald-50"
    },
    {
        icon: MoveRight,
        title: "Digital Handover",
        content: "Complete source files and platform access are delivered digitally upon project milestone completion.",
        color: "text-orange-600",
        bg: "bg-orange-50"
    }
];

function FeatureItem({ items }: { items: string[] }) {
    return (
        <ul className="mt-2 space-y-2 ml-4">
            {items.map((item, idx) => (
                <li key={idx} className="text-xs text-foreground/80 flex items-start gap-2.5 leading-snug">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0 mt-1" />
                    {item}
                </li>
            ))}
        </ul>
    );
}

function PackageCard({ pkg, index }: { pkg: typeof packages[0]; index: number }) {
    const router = useRouter();
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = (mouseX / width) - 0.5;
        const yPct = (mouseY / height) - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 1 }}
            whileInView={{
                opacity: 1,
                y: 0,
                scale: pkg.recommended ? 1.05 : 1
            }}
            viewport={{ once: true }}
            transition={{
                delay: index * 0.1,
                duration: 0.6,
                scale: { duration: 0.4, ease: "easeOut" }
            }}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => router.push("/contact")}
            className={`group relative h-full perspective-1000 cursor-pointer ${pkg.recommended ? "z-20" : "z-10"}`}
        >
            {/* Background Glow */}
            <div className={`absolute -inset-6 rounded-[48px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br ${pkg.gradient} blur-[60px] pointer-events-none`} />

            {/* Recommended Tag */}
            {pkg.recommended && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-30">
                    <motion.div
                        animate={{ y: [0, -3, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="bg-primary text-white text-[10px] font-bold uppercase py-2 px-8 rounded-full shadow-[0_10px_30px_rgba(15,23,42,0.3)] tracking-widest border border-white/20 whitespace-nowrap flex items-center gap-2"
                    >
                        <Sparkles className="w-3 h-3 text-yellow-400" />
                        Most Popular Choice
                    </motion.div>
                </div>
            )}

            <div className={`
                glass-premium relative h-full flex flex-col p-8 md:p-10 rounded-[40px] overflow-hidden transition-all duration-500 antialiased
                ${pkg.recommended ? "border-primary/25 border-glow shadow-[0_20px_50px_rgba(0,0,0,0.1)]" : "border-white/50 hover:border-primary/20 shadow-xl"}
            `}
            >
                {/* Noise Texture */}
                <div className="noise-bg absolute inset-0 z-0 pointer-events-none opacity-[0.03]" />

                {/* Refractive Light Streak */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent skew-y-[-12deg] -translate-y-full group-hover:translate-y-[200%] transition-transform duration-[1500ms] pointer-events-none" />

                <div className="relative z-10 flex flex-col h-full">
                    <div className="flex justify-between items-start mb-8">
                        <div className={`p-4 rounded-[20px] bg-gradient-to-br ${pkg.gradient} border border-white/60 shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                            <pkg.icon className={`w-7 h-7 ${pkg.name.includes("STARTER") ? "text-cyan-600" : pkg.name.includes("STANDARD") ? "text-violet-600" : "text-blue-600"}`} />
                        </div>
                        <div className="text-right">
                            <span className="text-3xl font-bold tracking-tight text-primary block">{pkg.price}</span>
                            <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Starting from</span>
                        </div>
                    </div>

                    <h3 className="text-xl font-bold mb-3 tracking-tight uppercase group-hover:text-primary transition-colors duration-300">{pkg.name}</h3>
                    <p className="text-sm text-foreground/90 font-medium mb-8 leading-relaxed min-h-[48px] group-hover:text-foreground transition-colors">{pkg.description}</p>

                    <div className="space-y-8 mb-10 flex-grow">
                        {pkg.features.map((feature, fIdx) => (
                            <div key={fIdx} className="relative group/feature">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${pkg.name.includes("STARTER") ? "bg-cyan-100/50 border-cyan-200 text-cyan-700" :
                                        pkg.name.includes("STANDARD") ? "bg-violet-100/50 border-violet-200 text-violet-700" :
                                            "bg-blue-100/50 border-blue-200 text-blue-700"
                                        } group-hover/feature:scale-110 group-hover:shadow-[0_0_15px_rgba(0,0,0,0.05)]`}>
                                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                                    </div>
                                    <span className="text-sm font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">{feature.title}</span>
                                </div>
                                <FeatureItem items={feature.items} />
                            </div>
                        ))}
                    </div>

                    <Button
                        variant={pkg.recommended ? "gradient" : "outline"}
                        onClick={(e) => {
                            e.stopPropagation();
                            router.push("/contact");
                        }}
                        className={`w-full group/btn relative overflow-hidden h-14 rounded-2xl text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-500 ${pkg.recommended
                            ? "shadow-[0_15px_30px_-5px_rgba(15,23,42,0.25)] hover:shadow-[0_20px_40px_-5px_rgba(15,23,42,0.35)]"
                            : "hover:bg-primary hover:text-white border-primary/20"
                            }`}
                    >
                        <span className="relative z-10 flex items-center justify-center gap-3">
                            {pkg.name.includes("STARTER") ? "Choose Starter" : pkg.name.includes("STANDARD") ? "Get Standard" : "Go Premium"}
                            <MoveRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform duration-300" />
                        </span>
                        {pkg.recommended && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-[1200ms]" />
                        )}
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}

export default function ServicesClient() {
    return (
        <div className="relative min-h-screen selection:bg-primary/10">
            <ServicesBackground />

            <div className="container relative z-10 mx-auto px-4 md:px-6 pt-32 pb-24">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-bold uppercase tracking-widest text-primary mb-6"
                    >
                        <Sparkles className="w-3 h-3 text-yellow-500" />
                        Investment Plans
                    </motion.div>

                    <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-[1.1] tracking-tight text-balance">
                        Strategic <span className="text-gradient">Pricing</span> for Growth
                    </h1>
                    <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
                        We don&apos;t just build websites; we engineer digital presence. Choose a package that aligns with your business objectives.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-stretch max-w-7xl mx-auto relative px-4">
                    {/* Background Decorative Element */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[120%] bg-[image:radial-gradient(50%_50%_at_50%_50%,rgba(15,23,42,0.02)_0%,transparent_100%)] pointer-events-none" />

                    {packages.map((pkg, index) => (
                        <PackageCard key={pkg.name} pkg={pkg} index={index} />
                    ))}
                </div>

                <EcommerceShowcase />

                <CreativeServices />

                <div className="mt-40 relative">
                    <div className="text-center max-w-2xl mx-auto mb-16 px-4 text-balance">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-bold uppercase tracking-widest text-primary mb-6"
                        >
                            <Shield className="w-3 h-3 text-primary" />
                            Alignment Foundations
                        </motion.div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Terms & Strategic <span className="text-gradient">Alignment</span></h2>
                        <p className="text-muted-foreground text-sm leading-relaxed">Everything you need to know about our collaboration process and project expectations.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
                        {termItems.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="group glass-premium p-8 rounded-[32px] border-white/60 hover:border-primary/20 transition-all duration-300 relative overflow-hidden"
                            >
                                <div className={`absolute top-0 right-0 w-24 h-24 ${item.bg} opacity-0 group-hover:opacity-100 transition-opacity blur-2xl rounded-full -mr-12 -mt-12`} />
                                <div className="relative z-10">
                                    <div className={`p-3 rounded-2xl ${item.bg} ${item.color} w-fit mb-6 border border-white/50 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                                        <item.icon className="w-5 h-5 flex-shrink-0" />
                                    </div>
                                    <h4 className="text-base font-bold mb-3 tracking-tight text-foreground">{item.title}</h4>
                                    <p className="text-xs text-foreground/70 font-medium leading-relaxed transition-colors group-hover:text-foreground/90">{item.content}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Decorative bottom element */}
                    <div className="mt-20 text-center pb-20">
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/40">© BROCODE STUDIO // EST. 2024</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
