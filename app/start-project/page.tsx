import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start a Project | BroCode Studio",
  description: "Tell us about your project vision. Submit your brief and we'll get back to you with a custom quote.",
};

import { BriefingWizard } from "@/components/start-project/BriefingWizard";

export default function StartProjectPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Decorative blobs */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-cyan-100/40 to-violet-100/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-blue-100/30 to-indigo-100/30 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-200/50 rounded-full text-sm font-semibold text-cyan-700 mb-4">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            Zero-Touch Workflow
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 leading-tight">
            Let&apos;s Build{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-violet-600">
              Something Great
            </span>
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Fill out the brief below. No meetings, no back-and-forth — just tell us your vision and we&apos;ll handle the rest.
          </p>
        </div>

        {/* Wizard */}
        <BriefingWizard />
      </div>
    </div>
  );
}
