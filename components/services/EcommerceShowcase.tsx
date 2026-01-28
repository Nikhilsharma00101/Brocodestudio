"use client";

import { motion } from "framer-motion";
import {
    ShoppingCart,
    CreditCard,
    Database,
    Lock,
    LayoutDashboard,
    Palette,
    Cpu,
    Sparkles,
    MoveRight,
    CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

const ecommerceFeatures = [
    {
        title: "Secure Payment System",
        description: "Integration with Razorpay, Stripe, or PayPal for safe and seamless customer transactions.",
        icon: CreditCard,
        color: "text-emerald-500",
        bg: "bg-emerald-500/10"
    },
    {
        title: "Dynamic Database",
        description: "Real-time inventory tracking and customer data management with high-speed performance.",
        icon: Database,
        color: "text-blue-500",
        bg: "bg-blue-500/10"
    },
    {
        title: "User Authentication",
        description: "Secure login systems and protected user profiles to keep customer data safe.",
        icon: Lock,
        color: "text-indigo-500",
        bg: "bg-indigo-500/10"
    },
    {
        title: "Admin Dashboard",
        description: "Complete control panel to manage products, categories, orders, and business insights.",
        icon: LayoutDashboard,
        color: "text-purple-500",
        bg: "bg-purple-500/10"
    },
    {
        title: "Unique Custom Theme",
        description: "Bespoke design built with custom code specifically for your brand’s identity.",
        icon: Palette,
        color: "text-pink-500",
        bg: "bg-pink-500/10"
    },
    {
        title: "Advanced Tech Stack",
        description: "Built with Next.js 15 for superior speed, SEO ranking, and modern reliability.",
        icon: Cpu,
        color: "text-cyan-500",
        bg: "bg-cyan-500/10"
    }
];

export function EcommerceShowcase() {
    const router = useRouter();

    return (
        <section className="relative mt-40 py-20 overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 blur-[120px] rounded-full pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-7xl mx-auto px-4 relative z-10"
            >
                <div className="glass-premium relative overflow-hidden rounded-[50px] border-primary/5 shadow-2xl">
                    {/* Inner Glass Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-primary/5 pointer-events-none" />

                    {/* Main Content Grid */}
                    <div className="relative grid grid-cols-1 lg:grid-cols-2">
                        {/* Interactive Side */}
                        <div className="p-8 md:p-16 lg:p-24 flex flex-col justify-center relative overflow-hidden group">
                            {/* Decorative Floating Icon */}
                            <motion.div
                                animate={{
                                    y: [0, -20, 0],
                                    rotate: [0, 5, 0]
                                }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-10 -left-10 w-40 h-40 bg-primary/2 rounded-full flex items-center justify-center border border-primary/5 opacity-50 pointer-events-none"
                            >
                                <ShoppingCart className="w-12 h-12 text-primary/10" />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-bold uppercase tracking-[0.2em] mb-10 w-fit text-primary"
                            >
                                <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
                                Enterprise Solution
                            </motion.div>

                            <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter leading-[0.9] text-balance">
                                Full Custom <br />
                                <span className="text-gradient">E-commerce</span>
                            </h2>

                            <p className="text-lg text-muted-foreground mb-12 leading-relaxed max-w-md font-medium">
                                We build high-performance online stores with integrated payments, scaling databases, and a powerful admin dashboard to manage your entire business.
                            </p>

                            <div className="flex flex-col gap-8 mb-12">
                                <div className="flex items-center gap-6">
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block">Complete Project Package</span>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-5xl md:text-6xl font-black tracking-tighter text-primary">₹45,000</span>
                                            <span className="text-primary/40 font-bold text-xl">*</span>
                                        </div>
                                    </div>

                                    <div className="h-16 w-px bg-primary/10 hidden sm:block" />

                                    <div className="hidden sm:block">
                                        <div className="flex -space-x-2 mb-2">
                                            {[1, 2, 3, 4].map(i => (
                                                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold">
                                                    {String.fromCharCode(64 + i)}
                                                </div>
                                            ))}
                                        </div>
                                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Trusted by Scaling Brands</span>
                                    </div>
                                </div>

                                <Button
                                    onClick={() => router.push("/contact")}
                                    className="h-16 px-12 rounded-2xl bg-primary text-white hover:bg-primary/90 transition-all duration-500 shadow-2xl shadow-primary/20 group w-full sm:w-fit overflow-hidden relative"
                                >
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-scan"
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    />
                                    <span className="flex items-center gap-3 font-bold uppercase tracking-[0.2em] text-xs relative z-10">
                                        Launch My Store
                                        <MoveRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                                    </span>
                                </Button>
                            </div>

                            <div className="flex items-start gap-4 p-5 rounded-2xl bg-amber-50/60 border border-amber-200/50 max-w-sm shadow-sm">
                                <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                                <p className="text-[11px] text-amber-900/80 font-semibold leading-relaxed">
                                    <span className="text-amber-700 block mb-1 uppercase tracking-wider text-[9px]">Note on Pricing</span>
                                    This is the starting price for a standard e-commerce setup. The final investment may vary depending on the total number of products and any additional custom features you require.
                                </p>
                            </div>
                        </div>

                        {/* Feature Ecosystem side */}
                        <div className="bg-slate-50/80 p-8 md:p-16 lg:p-24 relative overflow-hidden">
                            <div className="absolute inset-0 noise-bg opacity-[0.05] pointer-events-none" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12 relative z-10">
                                {ecommerceFeatures.map((feature, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.1 * idx }}
                                        className="group"
                                    >
                                        <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center border border-white mb-6 shadow-sm group-hover:scale-110 group-hover:shadow-md transition-all duration-500`}>
                                            <feature.icon className={`w-6 h-6 ${feature.color}`} />
                                        </div>
                                        <h4 className="text-base font-bold tracking-tight text-primary mb-3 flex items-center gap-2">
                                            {feature.title}
                                        </h4>
                                        <p className="text-[13px] text-muted-foreground leading-relaxed font-medium">
                                            {feature.description}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Floating Decorative Elements */}
                            <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mb-32" />
                            <div className="absolute top-0 left-0 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl -ml-24 -mt-24" />
                        </div>
                    </div>
                </div>

                {/* Technical Stack Badges */}
                <div className="mt-16 flex flex-wrap justify-center items-center gap-6 md:gap-12">
                    <span className="text-[10px] font-bold text-muted-foreground/30 uppercase tracking-[0.4em]">Ecosystem Powered By</span>
                    <div className="flex flex-wrap justify-center gap-6 md:gap-10 opacity-60">
                        {["Next.js 15", "PostgreSQL", "Tailwind v4", "Stripe/Razorpay", "Redis", "Clerk/Auth0"].map((tech) => (
                            <div key={tech} className="flex items-center gap-2 group cursor-default">
                                <div className="w-1 h-1 rounded-full bg-primary/30 group-hover:bg-primary transition-colors" />
                                <span className="text-[11px] font-bold uppercase tracking-widest text-primary/70 group-hover:text-primary transition-colors">{tech}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
