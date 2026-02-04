"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { usePathname, useSearchParams } from "next/navigation";

export default function SmoothScroll() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Optimization: Detect touch device to disable lenis for native smooth scroll on mobile
        // This ensures 60fps+ native performance on phones/tablets
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        if (isTouch) {
            return;
        }

        // Initialize Lenis with "high standard" precision settings for Desktop
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
        });
        lenisRef.current = lenis;

        // Use requestAnimationFrame for smooth playback
        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    // Handle route changes - Scroll to top immediately for SPA feel
    useEffect(() => {
        // Only run if lenis is active (Desktop)
        if (lenisRef.current) {
            if (!window.location.hash) {
                lenisRef.current.scrollTo(0, { immediate: true });
            }
        } else {
            // Fallback for native scroll (Mobile)
            if (!window.location.hash) {
                window.scrollTo(0, 0);
            }
        }
    }, [pathname, searchParams]);

    return null;
}
