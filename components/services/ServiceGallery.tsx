"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ServiceItem {
    projectId: string;
    projectTitle: string;
    image: string;
    liveLink?: string;
}

interface ServiceGalleryProps {
    title: string;
    description: string;
    items: ServiceItem[];
    objectFit?: "cover" | "contain";
}

export function ServiceGallery({ title, description, items, objectFit = "cover" }: ServiceGalleryProps) {
    const [selectedImage, setSelectedImage] = useState<ServiceItem | null>(null);

    // Filter out items without images just in case
    const validItems = items.filter(item => item.image);

    if (validItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
                <h2 className="text-3xl font-light mb-4">Coming Soon</h2>
                <p className="text-muted-foreground/60 max-w-md mx-auto">We are currently curating our finest work for the {title} collection.</p>
            </div>
        );
    }

    return (
        <section className="relative py-24 md:py-32 min-h-screen bg-background text-foreground overflow-hidden">
            <div className="container mx-auto px-4 md:px-8">
                {/* Header Section */}
                <div className="mb-24 md:mb-32 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 md:gap-16 border-b border-white/10 pb-12">
                    <div className="max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            <h4 className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase mb-6 flex items-center gap-3">
                                <span className="w-8 h-[1px] bg-primary/50"></span>
                                Portfolio Showcase v2
                            </h4>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[0.9] mb-6 text-foreground">
                                {title}
                            </h1>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                        className="max-w-md md:text-right"
                    >
                        <p className="text-lg text-muted-foreground/80 font-light leading-relaxed text-balance">
                            {description}
                        </p>
                    </motion.div>
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {validItems.map((item, index) => (
                        <motion.button
                            key={`${item.projectId}-${index}`}
                            layoutId={`card-${item.projectId}`}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
                            className="group flex flex-col items-start gap-4 w-full text-left"
                            onClick={() => setSelectedImage(item)}
                        >
                            <div className="relative w-full aspect-[4/3] overflow-hidden bg-secondary/5">
                                <motion.div
                                    whileHover={{ scale: 1.03 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="w-full h-full relative"
                                >
                                    <Image
                                        src={item.image}
                                        alt={item.projectTitle}
                                        fill
                                        className={`object-${objectFit} ${objectFit === "contain" ? "scale-90" : "scale-100"} transition-all duration-700 ease-out group-hover:opacity-90`}
                                    />

                                    {/* Minimal Overlay */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                </motion.div>
                            </div>

                            <div className="w-full flex justify-between items-center border-t border-white/10 pt-4 group-hover:border-white/30 transition-colors duration-300">
                                <h3 className="text-lg font-medium tracking-wide text-foreground group-hover:text-primary transition-colors duration-300">
                                    {item.projectTitle}
                                </h3>
                                <span className="text-xs text-muted-foreground/50 uppercase tracking-widest group-hover:translate-x-1 transition-transform duration-300">
                                    View
                                </span>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Modal Viewer */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 sm:p-8"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            layoutId={`card-${selectedImage.projectId}`}
                            className="relative w-full max-w-7xl max-h-[90vh] flex flex-col overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/20 hover:bg-white/10 text-white/70 hover:text-white transition-all backdrop-blur-sm"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="relative w-full flex-grow h-[60vh] md:h-[80vh] bg-black/50">
                                <Image
                                    src={selectedImage.image}
                                    alt={selectedImage.projectTitle}
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>

                            <div className="bg-black/80 backdrop-blur-md p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-t border-white/10">
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-medium text-white mb-2">{selectedImage.projectTitle}</h3>
                                    <p className="text-white/50 text-sm tracking-widest uppercase">Project Details</p>
                                </div>
                                {selectedImage.liveLink && (
                                    <a
                                        href={selectedImage.liveLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Button variant="outline" className="border-white/20 text-white hover:bg-white hover:text-black transition-colors rounded-none px-8 py-6 uppercase tracking-widest text-xs font-bold">
                                            Visit Live Site <ExternalLink className="w-3 h-3 ml-2" />
                                        </Button>
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
