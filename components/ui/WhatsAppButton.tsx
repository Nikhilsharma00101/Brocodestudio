"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
    return (
        <Link
            href="https://wa.me/919876543210"
            target="_blank"
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-emerald-500 rounded-full shadow-xl hover:bg-emerald-600 hover:scale-110 transition-all duration-300 animate-bounce-slow"
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle className="w-8 h-8 text-white" />
            <span className="absolute right-full mr-4 bg-white text-black text-xs font-bold px-2 py-1 rounded opacity-0 hover:opacity-100 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden md:block">
                Chat Now
            </span>
        </Link>
    );
}
