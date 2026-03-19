"use client";

import Link from "next/link";

interface Props {
  name: string;
}

export function SuccessScreen({ name }: Props) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white shadow-xl shadow-slate-200/50 p-10 md:p-14 text-center">
        {/* Animated checkmark */}
        <div className="relative mx-auto w-24 h-24 mb-8">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-violet-600 opacity-20 animate-ping" />
          <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
          We&apos;ve got your brief, {name.split(" ")[0]}! 🎉
        </h2>
        <p className="text-slate-500 text-lg mb-8 leading-relaxed">
          Your project brief has been submitted successfully. Our team will review your details and send a custom quote to your email within <strong className="text-slate-700">24 hours</strong>.
        </p>

        {/* What happens next */}
        <div className="text-left mb-10 space-y-4">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">What happens next</p>
          {[
            { icon: "📧", step: "Quote Email", desc: "You'll receive a custom quote with pricing and timeline." },
            { icon: "🔐", step: "Portal Access", desc: "We'll invite you to your private Client Portal." },
            { icon: "🚀", step: "We start building", desc: "Once you approve, work begins immediately." },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="font-semibold text-slate-800 text-sm">{item.step}</p>
                <p className="text-slate-500 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <Link href="/">
          <button className="w-full py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 transition-all duration-200 shadow-lg shadow-cyan-500/20">
            ← Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
