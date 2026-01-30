"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue, useTransform } from "framer-motion";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Work", href: "/work" },
    { name: "Process", href: "/process" },
];

const CYCLES = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+";

const ScrambleLink = ({
    href,
    children,
    isActive,
    isHovered,
    onMouseEnter,
    onMouseLeave
}: {
    href: string,
    children: string,
    isActive: boolean,
    isHovered: boolean,
    onMouseEnter: () => void,
    onMouseLeave: () => void
}) => {
    const [text, setText] = useState(children);


    if (!isHovered && text !== children) {
        setText(children);
    }

    useEffect(() => {
        if (!isHovered) {
            return;
        }

        let pos = 0;
        const interval = setInterval(() => {
            const scrambled = children.split("").map((char, index) => {
                if (index < pos) return children[index];
                return CYCLES[Math.floor(Math.random() * CYCLES.length)];
            }).join("");

            setText(scrambled);

            if (pos >= children.length) {
                clearInterval(interval);
            }

            pos += 0.4;
        }, 40);

        return () => {
            clearInterval(interval);
            setText(children);
        };
    }, [isHovered, children]);

    return (
        <Link
            href={href}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={cn(
                "relative flex items-center justify-center px-6 py-3 text-sm font-bold tracking-wide transition-colors duration-300 overflow-hidden rounded-full font-mono",
                isActive ? "text-cyan-950" : "text-slate-500 hover:text-cyan-900"
            )}
        >
            {/* Active/Hover Background Pill using LayoutId for smooth sliding */}
            <AnimatePresence>
                {/* Active State Background (Permanent) */}
                {isActive && (
                    <motion.div
                        layoutId="nav-active-bg"
                        className="absolute inset-0 bg-cyan-400 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                )}

                {/* Hover State - Glass Effect (Transient) */}
                {isHovered && !isActive && (
                    <motion.div
                        layoutId="nav-hover-bg"
                        className="absolute inset-0 bg-slate-200/50 backdrop-blur-sm rounded-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    />
                )}
            </AnimatePresence>

            <span className="relative z-10 flex items-center gap-1">
                {/* Animated Brackets for Active State */}
                {isActive && <span className="opacity-0 w-0 overflow-hidden animate-in fade-in zoom-in duration-300 md:w-auto md:opacity-100">{`{`}</span>}
                {text}
                {isActive && <span className="opacity-0 w-0 overflow-hidden animate-in fade-in zoom-in duration-300 md:w-auto md:opacity-100">{`}`}</span>}
            </span>
        </Link>
    );
};

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
                    maxWidth: isScrolled ? "950px" : "1400px",
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
                    <div className="relative flex items-center justify-center w-10 h-10 overflow-hidden rounded-xl bg-slate-950 group-hover:bg-slate-900 transition-colors duration-500">
                        <Image
                            src="/logo-futuristic.png"
                            alt="BroCode Logo"
                            width={32}
                            height={32}
                            className="relative z-10 mix-blend-screen"
                        />
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
                <nav className="hidden md:flex items-center gap-2 relative bg-white/5 backdrop-blur-sm p-1.5 rounded-full border border-white/10 shadow-inner">
                    {navLinks.map((link) => (
                        <ScrambleLink
                            key={link.name}
                            href={link.href}
                            isActive={pathname === link.href}
                            isHovered={hoveredLink === link.name}
                            onMouseEnter={() => setHoveredLink(link.name)}
                            onMouseLeave={() => setHoveredLink(null)}
                        >
                            {link.name}
                        </ScrambleLink>
                    ))}
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

            {/* Mobile Menu Overlay - "The Digital Curtain" */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ clipPath: "circle(0% at 100% 0%)" }}
                        animate={{ clipPath: "circle(150% at 100% 0%)" }}
                        exit={{ clipPath: "circle(0% at 100% 0%)" }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 bg-slate-950 z-[45] flex flex-col justify-between p-8 md:hidden pointer-events-auto overflow-hidden"
                    >
                        {/* Background Grid Decoration */}
                        <div className="absolute inset-0 z-0 opacity-10"
                            style={{
                                backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                                backgroundSize: "40px 40px"
                            }}
                        />

                        {/* Top Decoration */}
                        <div className="relative z-10 flex justify-between items-center opacity-50">
                            <span className="text-xs font-mono text-cyan-400">{"/// SYSTEM_NAV_V2.0"}</span>
                            <span className="text-xs font-mono text-cyan-400">SECURE_CONNECTION</span>
                        </div>

                        {/* Navigation Links */}
                        <div className="relative z-10 flex flex-col justify-center space-y-2 mt-10">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 + (i * 0.1), duration: 0.5, ease: "easeOut" }}
                                    className="group"
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-end gap-4"
                                    >
                                        <span className="text-xs font-mono text-cyan-500 mb-2 opacity-50 group-hover:opacity-100 transition-opacity">0{i + 1}</span>
                                        <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-200 group-hover:from-cyan-400 group-hover:to-violet-500 transition-all duration-300 uppercase tracking-tighter">
                                            {link.name}
                                        </span>
                                    </Link>
                                    <div className="h-[1px] w-full bg-slate-800 mt-2 group-hover:bg-cyan-500/30 transition-colors duration-500 origin-left scale-x-0 group-hover:scale-x-100" />
                                </motion.div>
                            ))}
                        </div>

                        {/* Bottom Actions */}
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="relative z-10 space-y-6"
                        >
                            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block">
                                <Button variant="gradient" size="lg" className="w-full text-lg font-bold py-6 group">
                                    <span className="mr-2">Initiate Contact</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>

                            <div className="flex justify-between items-end border-t border-slate-800 pt-6">
                                <div className="flex flex-col text-xs text-slate-500 font-mono">
                                    <span>BroCode Studio</span>
                                    <span>© 2026</span>
                                </div>
                                <div className="flex gap-4">
                                    {/* Social Placeholders or other small links could go here */}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
