"use client";

import Link from "next/link";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

import { Hero } from "@/components/home/Hero";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { Testimonials } from "@/components/home/Testimonials";
import { CTASection } from "@/components/home/CTASection";

import { ServicesOverview } from "@/components/home/ServicesOverview";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <Hero />

      {/* SERVICES OVERVIEW */}
      <ServicesOverview />

      {/* FEATURED WORK */}
      <FeaturedWork />

      {/* WHY CHOOSE US */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Decorative Circle */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-b from-blue-50/50 to-violet-50/50 rounded-full blur-3xl opacity-50 -z-10" />

        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative">
              {/* Abstract Visual Placeholder */}
              <div className="aspect-square rounded-[3rem] border border-white shadow-2xl overflow-hidden relative">
                <Image
                  src="/why_choose_us_team_1769332803987.png"
                  alt="BroCode Team"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent z-10" />
                <div className="absolute bottom-10 left-10 right-10 z-20">
                  <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/50 shadow-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex -space-x-3">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white" />
                        ))}
                      </div>
                      <span className="text-sm font-semibold text-white/90">Trusted by 50+ Brands</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider mb-2 block">Why BroCode?</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                Not Just Freelancers.<br />
                We Are a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">Creative Team.</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We don&apos;t just deliver code; we deliver results. Our team works collaboratively to ensure every pixel serves a purpose.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  "Team-Based Approach",
                  "Premium Design Quality",
                  "Performance Focused",
                  "Support & Scalability"
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                    <span className="font-medium text-foreground">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Link href="/about">
                  <Button variant="outline" className="rounded-full px-8">Learn About Us</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS TIMELINE */}
      <ProcessTimeline />

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* CTA SECTION */}
      <CTASection />
    </div>
  );
}

