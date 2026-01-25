"use client";

import { motion } from "framer-motion";


export const ProcessBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none bg-[#fcfcfc]">
            {/* Engineering Grid - Very Light */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #000 1px, transparent 1px),
                        linear-gradient(to bottom, #000 1px, transparent 1px)
                    `,
                    backgroundSize: "20px 20px",
                }}
            />
            <div
                className="absolute inset-0 opacity-[0.07]"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #000 1px, transparent 1px),
                        linear-gradient(to bottom, #000 1px, transparent 1px)
                    `,
                    backgroundSize: "100px 100px",
                }}
            />

            {/* Floating Technical Schematics */}
            <div className="absolute inset-0">
                {/* Schematic 1: Flowchart fragments */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 0.1, x: 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute top-[10%] left-[5%] w-64 h-64"
                >
                    <svg viewBox="0 0 200 200" className="w-full h-full text-primary fill-none stroke-current stroke-[0.5]">
                        <rect x="10" y="10" width="40" height="20" rx="2" />
                        <path d="M30 30 L30 50 L50 50" />
                        <rect x="50" y="40" width="40" height="20" rx="2" />
                        <path d="M70 60 L70 80 L50 80" />
                        <circle cx="40" cy="80" r="10" />
                        <path d="M40 90 L40 110" />
                        <path d="M20 110 L60 110 L40 130 Z" />
                    </svg>
                </motion.div>

                {/* Schematic 2: Concentric technical measurements */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[5%] right-[-5%] w-96 h-96 opacity-[0.08]"
                >
                    <svg viewBox="0 0 200 200" className="w-full h-full text-violet-600 fill-none stroke-current stroke-[0.5]">
                        <circle cx="100" cy="100" r="80" strokeDasharray="4 4" />
                        <circle cx="100" cy="100" r="60" />
                        <path d="M20 100 L180 100 M100 20 L100 180" strokeDasharray="2 2" />
                        {/* Tick marks */}
                        {[...Array(12)].map((_, i) => (
                            <line
                                key={i}
                                x1="100" y1="20" x2="100" y2="25"
                                transform={`rotate(${i * 30} 100 100)`}
                            />
                        ))}
                    </svg>
                </motion.div>

                {/* Schematic 3: Connection Nodes */}
                <div className="absolute top-[40%] right-[10%] w-48 h-48 opacity-[0.1]">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-cyan-500 fill-none stroke-current stroke-[1]">
                        <circle cx="20" cy="20" r="3" fill="currentColor" />
                        <circle cx="80" cy="20" r="3" fill="currentColor" />
                        <circle cx="50" cy="50" r="5" />
                        <circle cx="20" cy="80" r="3" fill="currentColor" />
                        <circle cx="80" cy="80" r="3" fill="currentColor" />
                        <path d="M20 20 L50 50 L80 20 M50 50 L20 80 M50 50 L80 80" />
                    </svg>
                </div>
            </div>

            {/* Pulsing Data Streams */}
            <div className="absolute inset-0">
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"
                        style={{
                            left: 0,
                            right: 0,
                            top: `${25 + i * 25}%`,
                        }}
                        animate={{
                            x: ["-100%", "100%"],
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: 10 + i * 2,
                            repeat: Infinity,
                            ease: "linear",
                            delay: i * 3,
                        }}
                    />
                ))}
            </div>

            {/* Technical Labels */}
            <div className="absolute inset-0 font-mono text-[9px] uppercase tracking-[0.3em] text-primary/30">
                <div className="absolute top-[5%] left-[50%] -translate-x-1/2">
                    {'BROCODE_STUDIO // DIGITAL_SYSTEMS_v4'}
                </div>
                <div className="absolute bottom-[5%] left-[5%] rotate-[-90deg] origin-left">
                    METHODOLOGY_DRIVEN_RESULTS
                </div>
                <div className="absolute top-[20%] right-[2%] rotate-90 origin-right">
                    IDEATION_TO_DEPLOYMENT
                </div>

                {/* Coordinate Markers */}
                <div className="absolute top-4 left-4">REL_ID: 2026.04</div>
                <div className="absolute top-4 right-4 text-right">CORE: OPTIMIZED</div>
                <div className="absolute bottom-4 left-4">BUILD: STABLE</div>
                <div className="absolute bottom-4 right-4 text-right">STATUS: PERFORMANCE</div>
            </div>

            {/* Animated Geometry */}
            <div className="absolute inset-0">
                <motion.div
                    className="absolute top-[15%] right-[25%] w-12 h-12 border border-violet-500/20"
                    animate={{
                        rotate: [0, 90, 180, 270, 360],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="absolute bottom-[30%] left-[20%] w-16 h-16 border border-cyan-500/20 rounded-full"
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            {/* Large Decorative Faint Background Text - Distributed */}
            <div className="absolute inset-0 select-none overflow-hidden pointer-events-none">
                <motion.h2
                    animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[10%] left-[-5%] text-[15vw] font-black text-black/[0.03] leading-none whitespace-nowrap -rotate-12"
                >
                    STRATEGY
                </motion.h2>
                <motion.h2
                    animate={{ y: [0, 25, 0], x: [0, -15, 0] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[45%] right-[-4%] text-[15vw] font-black text-black/[0.03] leading-none whitespace-nowrap rotate-6"
                >
                    EXECUTION
                </motion.h2>
                <motion.h2
                    animate={{ y: [0, -15, 0], x: [0, -10, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[20%] left-[5%] text-[15vw] font-black text-black/[0.03] leading-none whitespace-nowrap -rotate-3"
                >
                    RESULTS
                </motion.h2>
            </div>

            {/* Corner Globs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-100/30 blur-[100px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-100/30 blur-[100px] rounded-full" />

            {/* Noise Texture */}
            <div className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />
        </div>
    );
};
