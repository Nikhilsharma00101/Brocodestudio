"use client";

import Link from "next/link";
import { WizardData } from "./BriefingWizard";

interface Props {
  data: WizardData;
  updateData: (fields: Partial<WizardData>) => void;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

export function StepFour({ data, updateData, onSubmit, onBack, isSubmitting }: Props) {
  const canSubmit =
    data.name.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) &&
    data.agreedToTerms;

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-1">Almost there!</h2>
      <p className="text-slate-500 mb-8 text-sm">
        Just your contact details and we&apos;ll have everything we need to start working on your quote.
      </p>

      {/* Name */}
      <div className="mb-5">
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Your Name <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => updateData({ name: e.target.value })}
          placeholder="John Smith"
          autoComplete="name"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 outline-none text-slate-800 placeholder:text-slate-300 text-sm transition-all"
        />
      </div>

      {/* Email */}
      <div className="mb-5">
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Email Address <span className="text-red-400">*</span>
        </label>
        <input
          type="email"
          value={data.email}
          onChange={(e) => updateData({ email: e.target.value })}
          placeholder="john@example.com"
          autoComplete="email"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 outline-none text-slate-800 placeholder:text-slate-300 text-sm transition-all"
        />
        <p className="mt-1.5 text-xs text-slate-400">
          We&apos;ll send your quote and portal access link here. We do not share your email.
        </p>
      </div>

      {/* Brief Summary */}
      <div className="mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Brief Summary</p>
        <div className="space-y-2 text-sm text-slate-700">
          <div className="flex justify-between">
            <span className="text-slate-400">Project Type</span>
            <span className="font-medium">{formatType(data.projectType)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Budget</span>
            <span className="font-medium">{data.budgetRange}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Timeline</span>
            <span className="font-medium">{data.timeline}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Reference Images</span>
            <span className="font-medium">{data.assets.length} uploaded</span>
          </div>
        </div>
      </div>

      {/* Terms Checkbox */}
      <div className="mb-8">
        <label className="flex items-start gap-3 cursor-pointer group">
          <div className="relative mt-0.5">
            <input
              type="checkbox"
              checked={data.agreedToTerms}
              onChange={(e) => updateData({ agreedToTerms: e.target.checked })}
              className="sr-only"
            />
            <div
              className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
                data.agreedToTerms
                  ? "bg-cyan-500 border-cyan-500"
                  : "border-slate-300 group-hover:border-cyan-300"
              }`}
            >
              {data.agreedToTerms && (
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </div>
          <span className="text-sm text-slate-500 leading-relaxed">
            I agree to the{" "}
            <Link href="/terms" target="_blank" className="text-cyan-600 hover:underline font-medium">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" target="_blank" className="text-cyan-600 hover:underline font-medium">
              Privacy Policy
            </Link>
            . I understand BroCode Studio will contact me regarding my project.
          </span>
        </label>
      </div>

      {/* Nav Buttons */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="px-6 py-4 rounded-2xl font-semibold text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200 disabled:opacity-40"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={!canSubmit || isSubmitting}
          className="flex-1 py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 transition-all duration-200 shadow-lg shadow-cyan-500/20 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Submitting...
            </>
          ) : (
            "🚀 Submit Brief"
          )}
        </button>
      </div>
    </div>
  );
}

function formatType(type: string): string {
  const map: Record<string, string> = {
    LANDING_PAGE: "Landing Page",
    FULL_STACK: "Full Stack App",
    UI_DESIGN: "UI/UX Design",
    ECOMMERCE: "E-Commerce",
    OTHER: "Custom Project",
  };
  return map[type] || type;
}
