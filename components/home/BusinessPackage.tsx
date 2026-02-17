"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Palette, Globe, Layout, CreditCard, Megaphone, MapPin, Store } from "lucide-react";
import { cn } from "@/lib/utils";

// Placeholder images since generation failed - using high quality Unsplash images
const items = [
    {
        title: "Premium Websites",
        description: "High-performance, custom-coded websites that drive conversions.",
        icon: Globe,
        image: "/services/websites.png",
        className: "md:col-span-2 md:row-span-2",
        href: "/services/website-design",
    },
    {
        title: "Logo Design",
        description: "Memorable brand identities.",
        icon: Palette,
        image: "/services/logo.png",
        className: "md:col-span-1 md:row-span-1",
        href: "/services/logo-design",
    },
    {
        title: "Visiting Cards",
        description: "Premium tangible impressions.",
        icon: CreditCard,
        image: "/services/visiting-card.png",
        className: "md:col-span-1 md:row-span-1",
        href: "/services/visiting-card-design",
    },
    {
        title: "Banner Designs",
        description: "Captivating digital & print banners.",
        icon: Layout,
        image: "/services/banner.png",
        className: "md:col-span-2 md:row-span-1",
        href: "/services/banner-design",
    },
    {
        title: "Pamphlet Design",
        description: "Informative & aesthetic brochures.",
        icon: Store,
        image: "/services/pamphlet.png",
        className: "md:col-span-1 md:row-span-1",
        href: "/services/pamphlet-design",
    },
    {
        title: "Flex Boards",
        description: "Large format outdoor signage.",
        icon: Megaphone,
        image: "/services/flex.png",
        className: "md:col-span-1 md:row-span-1",
        href: "/services/flex-board-design",
    },
    {
        title: "Google Business Profile",
        description: "Local SEO domination.",
        icon: MapPin,
        image: "/services/GBP.png",
        className: "md:col-span-1 md:row-span-1",
        href: "/services/google-business-profile",
    },
];

export function BusinessPackage() {
    return (
        <section className="py-24 bg-secondary/30 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10" />

            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-20 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-4">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
                            Service Ecosystem
                        </span>

                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight leading-[0.9]">
                            Everything Your <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-700 to-violet-800">
                                Business Needs.
                            </span>
                        </h2>

                        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
                            A comprehensive suite of creative services designed to build, market, and scale your brand from day one.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[250px] gap-4">
                    {items.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className={cn(
                                "group relative rounded-3xl overflow-hidden bg-white dark:bg-gray-900 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 dark:border-gray-800",
                                item.className
                            )}
                        >
                            <Link href={item.href} className="flex h-full w-full">
                                {/* Image Background */}
                                <div className="absolute inset-0">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300" />
                                </div>

                                {/* Content */}
                                <div className="relative z-10 flex flex-col justify-end p-6 h-full w-full">
                                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="bg-white/20 backdrop-blur-md p-2 rounded-xl text-white">
                                                <item.icon className="w-5 h-5" />
                                            </div>
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white rounded-full p-2 text-black">
                                                <ArrowUpRight className="w-4 h-4" />
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                                        <p className="text-sm text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 line-clamp-2">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
