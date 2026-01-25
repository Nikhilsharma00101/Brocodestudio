"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue, useTransform } from "framer-motion";
import { Menu, X, ArrowRight, Sparkles, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Work", href: "/work" },
    { name: "Process", href: "/process" },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);
    const pathname = usePathname();

    // Smooth scroll progress for various effects
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Spotlight effect mouse position
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spotlight background transformation
    const spotlightBg = useTransform(
        [mouseX, mouseY],
        ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(6, 182, 212, 0.05), transparent 80%)`
    );

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            mouseX.set(clientX);
            mouseY.set(clientY);
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [mouseX, mouseY]);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 md:p-6 pointer-events-none">
            {/* Main Navbar Container - Adaptive Island */}
            <motion.div
                initial={false}
                animate={{
                    width: isScrolled ? "auto" : "100%",
                    maxWidth: isScrolled ? "900px" : "1400px",
                    y: isScrolled ? 0 : 0,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 30 }}
                className={cn(
                    "relative z-50 flex items-center justify-between w-full h-16 md:h-18 px-4 md:px-8 pointer-events-auto rounded-full transition-all duration-500",
                    isScrolled
                        ? "glass-premium shadow-[0_8px_32px_rgba(0,0,0,0.08)] backdrop-blur-2xl border-white/40"
                        : "bg-transparent border-transparent"
                )}
            >
                {/* Spotlight Background Effect (Only on Desktop & Scrolled) */}
                {isScrolled && (
                    <motion.div
                        className="pointer-events-none absolute -inset-px rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{
                            background: spotlightBg,
                        }}
                    />
                )}

                {/* Logo Section */}
                <Link href="/" className="flex items-center gap-3 z-50 group select-none cursor-pointer">
                    <div className="relative flex items-center justify-center w-10 h-10 overflow-hidden rounded-xl bg-slate-950 group-hover:bg-primary transition-colors duration-500">
                        <Terminal className="w-5 h-5 text-cyan-400 group-hover:text-white transition-colors" />
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl md:text-2xl font-logo font-bold tracking-tight text-slate-900 leading-none">
                            BroCode
                            <span className="relative inline-flex items-center">
                                <span className="text-cyan-500">.</span>
                                <span className="absolute -right-1 -top-1 flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500"></span>
                                </span>
                            </span>
                        </span>
                        <div className="flex items-center gap-1.5 overflow-hidden">
                            <motion.span
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-slate-400"
                            >
                                Studio
                            </motion.span>
                            <span className="h-[1px] w-4 bg-slate-200 group-hover:w-8 group-hover:bg-cyan-500 transition-all duration-500" />
                        </div>
                    </div>
                </Link>

                {/* Desktop Navigation - Morphing Background Dock */}
                <nav className="hidden md:flex items-center gap-1 relative px-1 py-1 rounded-full">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                onMouseEnter={() => setHoveredLink(link.name)}
                                onMouseLeave={() => setHoveredLink(null)}
                                className={cn(
                                    "relative px-5 py-2.5 text-sm font-semibold rounded-full transition-colors duration-300",
                                    isActive ? "text-slate-950" : "text-slate-500 hover:text-slate-900"
                                )}
                            >
                                {/* Hover Background */}
                                <AnimatePresence>
                                    {hoveredLink === link.name && (
                                        <motion.div
                                            layoutId="navHover"
                                            className="absolute inset-0 bg-slate-100/80 rounded-full -z-10"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                </AnimatePresence>

                                {/* Active Indicator Dot */}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeIndicator"
                                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-500 shadow-[0_0_8px_#06b6d4]"
                                    />
                                )}

                                <span className="relative z-10">{link.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Action Section */}
                <div className="flex items-center gap-2 md:gap-4">
                    <Link href="/contact" className="hidden md:block">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-950 text-white text-sm font-bold overflow-hidden transition-all shadow-[0_0_20px_rgba(0,0,0,0.1)] hover:shadow-[0_0_25px_rgba(6,182,212,0.2)]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <Sparkles className="relative w-4 h-4 text-cyan-400 group-hover:text-white transition-colors" />
                            <span className="relative">Let&apos;s Talk</span>
                            <ArrowRight className="relative w-4 h-4 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" />
                        </motion.button>
                    </Link>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={cn(
                            "p-2.5 rounded-xl transition-all md:hidden relative z-50",
                            isScrolled ? "bg-slate-100 text-slate-950" : "bg-white/10 text-slate-900 backdrop-blur-md"
                        )}
                    >
                        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                {/* Scroll Progress Bar - Internal to the island when scrolled */}
                {isScrolled && (
                    <motion.div
                        className="absolute bottom-0 left-8 right-8 h-[2px] bg-slate-100 overflow-hidden rounded-full"
                    >
                        <motion.div
                            className="h-full bg-gradient-to-r from-cyan-500 to-violet-600 origin-left"
                            style={{ scaleX }}
                        />
                    </motion.div>
                )}
            </motion.div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
                        exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                        className="fixed inset-0 bg-white/80 z-[45] flex flex-col items-center justify-center space-y-6 md:hidden pointer-events-auto"
                    >
                        {navLinks.map((link, i) => (
                            <motion.div
                                key={link.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Link
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-3xl font-bold text-slate-950 hover:text-cyan-500 transition-colors"
                                >
                                    {link.name}
                                </Link>
                            </motion.div>
                        ))}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button variant="gradient" size="lg" className="rounded-full px-12 h-14 text-lg font-bold">
                                    Start Project
                                </Button>
                            </Link>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
