/**
 * @file app/layout.tsx
 * @description Root layout component for the BroCode Studio portfolio.
 * Handles global styles, fonts, and shared metadata.
 */

import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Outfit, Syne } from "next/font/google"; // Use premium google fonts
import "./globals.css";
import { cn } from "@/lib/utils";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-brand",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-logo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "BroCode Studio | Premium Full-Stack Developer",
  description: "I build high-performance, premium websites and web applications that convert visitors into clients.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased text-foreground flex flex-col",
          inter.variable,
          plusJakarta.variable,
          outfit.variable,
          syne.variable
        )}
      >
        <ScrollToTop />
        <Navbar />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
