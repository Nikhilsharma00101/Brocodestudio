"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { usePathname, useSearchParams } from "next/navigation";

export default function SmoothScroll() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Initialize Lenis with "high standard" precision settings
        const lenis = new Lenis({
            duration: 1.2, // Slightly tighter response than 1.5
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease-out for premium feel
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
        if (lenisRef.current) {
            // If there's a hash in the URL (anchor link), let the browser/Lenis handle it naturally
            // Otherwise, scroll to top
            if (!window.location.hash) {
                lenisRef.current.scrollTo(0, { immediate: true });
            }
        }
    }, [pathname, searchParams]);

    return null;
}
