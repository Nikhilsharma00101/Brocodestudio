"use client";

import { motion } from "framer-motion";
import React from "react";

export const ContactBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none bg-[#fdfdfd]">
            {/* Base Engineering Grid */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #000 1px, transparent 1px),
                        linear-gradient(to bottom, #000 1px, transparent 1px)
                    `,
                    backgroundSize: "40px 40px",
                }}
            />

            {/* Pulsing Communications Network */}
            <div className="absolute inset-0">
                <svg className="w-full h-full opacity-[0.05]" viewBox="0 0 1000 1000" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="transparent" />
                            <stop offset="50%" stopColor="currentColor" />
                            <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                    </defs>
                    <g className="text-cyan-500">
                        <motion.path
                            d="M 100,200 L 300,400 L 100,600 M 300,400 L 500,400"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeDasharray="10 10"
                            animate={{ strokeDashoffset: [0, -40] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.path
                            d="M 900,100 L 700,300 L 800,500 L 600,700"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeDasharray="15 5"
                            animate={{ strokeDashoffset: [0, 40] }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.circle
                            cx="300" cy="400" r="4"
                            initial={{ scale: 0.8, opacity: 0.3 }}
                            animate={{ scale: [0.8, 1.5, 0.8], opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            fill="currentColor"
                        />
                        <motion.circle
                            cx="700" cy="300" r="3"
                            initial={{ scale: 0.8, opacity: 0.3 }}
                            animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.3, 0.8, 0.3] }}
                            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                            fill="currentColor"
                        />
                    </g>
                    <g className="text-violet-500">
                        <motion.path
                            d="M 200,800 L 500,700 L 800,900"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeDasharray="20 10"
                            animate={{ strokeDashoffset: [0, 60] }}
                            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                        />
                        <circle cx="500" cy="700" r="2" fill="currentColor" />
                    </g>
                </svg>
            </div>

            {/* Floating Technical HUD Elements */}
            <div className="absolute inset-0 font-mono text-[10px] uppercase tracking-[0.2em] text-primary/30">
                {/* Top Left Corner */}
                <div className="absolute top-8 left-8 border-l border-t border-primary/20 p-4">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                        <span>Link_Status: Active</span>
                    </div>
                    <div>FREQ: 2.4 / 5.0 GHz</div>
                </div>

                {/* Top Right Corner */}
                <div className="absolute top-8 right-8 border-r border-t border-primary/20 p-4 text-right">
                    <div className="mb-1">Packet_Receive: [OK]</div>
                    <div className="text-[8px] opacity-70">Latency: 12ms</div>
                </div>

                {/* Bottom Left Corner */}
                <div className="absolute bottom-12 left-8 border-l border-b border-primary/20 p-4">
                    <div className="mb-1">BROCODE_IO // v4.0.1</div>
                    <div className="flex gap-1 h-1 items-end">
                        {[...Array(4)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-1 bg-primary/40"
                                animate={{ height: [4, 12, 4] }}
                                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                            />
                        ))}
                    </div>
                </div>

                {/* Bottom Right Corner */}
                <div className="absolute bottom-12 right-8 border-r border-b border-primary/20 p-4 text-right">
                    <div className="mb-1">COORD: 12.9716, 77.5946</div>
                    <div className="text-[8px] opacity-70">STATION: BLR_HUB</div>
                </div>
            </div>

            {/* Large Motion Graphics */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Rotating Radial Scanner */}
                <motion.div
                    className="absolute -top-[10%] -right-[10%] w-[600px] h-[600px] border border-cyan-500/10 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                >
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-cyan-500/20 to-transparent" />
                </motion.div>

                {/* Vertical Data Stream */}
                <div className="absolute left-[15%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-violet-500/10 to-transparent">
                    <motion.div
                        className="w-full h-20 bg-gradient-to-b from-transparent via-violet-400 to-transparent"
                        animate={{ top: ["-10%", "110%"] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                </div>

                {/* Large Background Text */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] select-none">
                    <motion.h2
                        className="text-[25vw] font-black tracking-tighter"
                        animate={{ scale: [1, 1.05, 1], opacity: [0.02, 0.03, 0.02] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    >
                        CONNECT
                    </motion.h2>
                </div>
            </div>

            {/* Shifting Data Bits - Subtle Hex/Binary drift */}
            <div className="absolute top-[20%] left-[20%] opacity-[0.03] font-mono text-[8px] space-y-1 select-none">
                {["0x4A6F696E", "0x5573", "0x42726F4300", "0x444556"].map((hex, i) => (
                    <motion.div
                        key={i}
                        animate={{ x: [0, 20, 0], opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 5, repeat: Infinity, delay: i * 1 }}
                    >
                        {hex}
                    </motion.div>
                ))}
            </div>

            {/* Signal Pulse from the Hub */}
            <div className="absolute bottom-12 right-12 w-4 h-4 pointer-events-none">
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute inset-0 border border-primary/30 rounded-full"
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ scale: [1, 10, 15], opacity: [0.5, 0.2, 0] }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            delay: i * 1.3,
                            ease: "easeOut",
                        }}
                    />
                ))}
            </div>

            {/* Ambient Globs */}
            <div className="absolute top-1/4 -left-[10%] w-[50%] h-[50%] bg-cyan-100/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-1/3 -right-[10%] w-[40%] h-[40%] bg-violet-100/20 blur-[100px] rounded-full" />

            {/* Noise Overlay */}
            <div className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />
        </div>
    );
};
