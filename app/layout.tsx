/**
 * @file app/layout.tsx
 * @description Root layout component for the BroCode Studio portfolio.
 * Handles global styles, fonts, and shared metadata.
 */

import { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans, Outfit, Syne } from "next/font/google"; // Use premium google fonts
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import JsonLd from "@/components/seo/JsonLd";
import ScrollToTop from "@/components/ScrollToTop";
import SmoothScroll from "@/components/SmoothScroll";

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

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "https://brocodestudio.com";

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  applicationName: "BroCode Studio",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  title: {
    default: "BroCode Studio | Premium Web Design & Development",
    template: "%s | BroCode Studio",
  },
  description: "We build high-performance, premium websites and web applications that convert visitors into clients. Specializing in Next.js, React, and modern UI/UX design.",
  keywords: [
    "Web Development",
    "Web Design",
    "Next.js Developer",
    "React Developer",
    "UI/UX Design",
    "Premium Websites",
    "BroCode Studio",
    "Frontend Development",
    "Full Stack Development",
    "Creative Agency",
  ],
  authors: [{ name: "BroCode Studio", url: "https://brocodestudio.com" }],
  creator: "BroCode Studio",
  publisher: "BroCode Studio",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "BroCode Studio | Premium Web Design & Development",
    description: "We build high-performance, premium websites and web applications that convert visitors into clients.",
    url: "https://brocodestudio.com",
    siteName: "BroCode Studio",
    images: [
      {
        url: "/og-image.png", // Ensure this image exists or is generated
        width: 1200,
        height: 630,
        alt: "BroCode Studio - Premium Web Development",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BroCode Studio | Premium Web Design & Development",
    description: "We build high-performance, premium websites and web applications that convert visitors into clients.",
    creator: "@brocodestudio", // Replace with actual handle if available
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
        <JsonLd />
        <ScrollToTop />
        <Navbar />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
        <Suspense fallback={null}>
          <SmoothScroll />
        </Suspense>
      </body>
    </html>
  );
}
