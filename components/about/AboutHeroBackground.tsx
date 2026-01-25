"use client";

import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
import { useEffect } from "react";

export const AboutHeroBackground = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const dx = useSpring(mouseX, springConfig);
    const dy = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            const x = clientX - innerWidth / 2;
            const y = clientY - innerHeight / 2;
            mouseX.set(x);
            mouseY.set(y);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none bg-[#fdfdfd]">
            {/* Perspective Grid Floor */}
            <motion.div
                style={{
                    rotateX: 60,
                    perspective: "1200px",
                    transformStyle: "preserve-3d",
                }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-[120%] opacity-[0.15]"
            >
                {/* Grid Lines - Horizontal */}
                <div className="absolute inset-0"
                    style={{
                        backgroundImage: "linear-gradient(to bottom, #94a3b8 1px, transparent 1px)",
                        backgroundSize: "100% 40px"
                    }}
                />

                {/* Grid Lines - Vertical */}
                <div className="absolute inset-0"
                    style={{
                        backgroundImage: "linear-gradient(to right, #94a3b8 1px, transparent 1px)",
                        backgroundSize: "40px 100%"
                    }}
                />

                {/* Infinite Floor Fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#fdfdfd] via-transparent to-transparent h-full" />
            </motion.div>

            {/* Floating Architectural Pillars */}
            <div className="absolute inset-0">
                {[...Array(6)].map((_, i) => (
                    <Pillar key={i} index={i} dx={dx} dy={dy} />
                ))}
            </div>

            {/* Background Gradient Blurs */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-cyan-200/20 blur-[100px] rounded-full mix-blend-multiply" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-violet-200/20 blur-[100px] rounded-full mix-blend-multiply" />

            {/* Decorative Numbers */}
            <div className="absolute top-20 right-10 flex flex-col items-end opacity-20 font-mono text-xs text-slate-400">
                <div>COORD_X: 45.231</div>
                <div>COORD_Y: 12.902</div>
                <div>STATUS: ACTIVE</div>
            </div>

            {/* Subtle Grain */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
            />
        </div>
    );
};

function Pillar({ index, dx, dy }: { index: number; dx: MotionValue<number>; dy: MotionValue<number> }) {
    const x = useTransform(dx, (v: number) => v * (0.02 + index * 0.01));
    const y = useTransform(dy, (v: number) => v * (0.02 + index * 0.01));

    return (
        <motion.div
            className="absolute w-[1px] bg-gradient-to-b from-transparent via-primary/10 to-transparent"
            style={{
                height: "70%",
                left: `${10 + index * 18}%`,
                top: "5%",
                x,
                y,
            }}
            animate={{
                opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
                duration: 10 + index * 3,
                repeat: Infinity,
                ease: "easeInOut",
            }}
        >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-primary/20 blur-[1px]" />
            <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-4 h-4 border border-primary/20 rounded-full" />
            <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-2 h-2 bg-primary/10 rounded-full" />
        </motion.div>
    );
}

