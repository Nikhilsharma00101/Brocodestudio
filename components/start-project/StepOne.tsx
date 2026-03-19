"use client";

import { WizardData } from "./BriefingWizard";

const PROJECT_TYPES = [
  { id: "LANDING_PAGE", label: "Landing Page", icon: "🖥️", desc: "High-converting single page" },
  { id: "FULL_STACK", label: "Full Stack App", icon: "⚙️", desc: "Complex web application" },
  { id: "UI_DESIGN", label: "UI/UX Design", icon: "🎨", desc: "Figma designs & prototypes" },
  { id: "ECOMMERCE", label: "E-Commerce", icon: "🛒", desc: "Online store & payment flow" },
  { id: "OTHER", label: "Something Else", icon: "✨", desc: "Tell us your unique idea" },
];

const BUDGET_RANGES = ["Under $500", "$500 – $1,000", "$1,000 – $3,000", "$3,000 – $5,000", "$5,000+"];
const TIMELINES = ["ASAP (1–2 weeks)", "1 Month", "2–3 Months", "Flexible"];

interface Props {
  data: WizardData;
  updateData: (fields: Partial<WizardData>) => void;
  onNext: () => void;
}

export function StepOne({ data, updateData, onNext }: Props) {
  const canProceed = data.projectType && data.budgetRange && data.timeline;

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-1">What are we building?</h2>
      <p className="text-slate-500 mb-8 text-sm">Select your project type and give us a sense of scope.</p>

      {/* Project Type */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-slate-700 mb-3">Project Type <span className="text-red-400">*</span></label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {PROJECT_TYPES.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => updateData({ projectType: type.id })}
              className={`relative flex flex-col items-start p-4 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer ${
                data.projectType === type.id
                  ? "border-cyan-500 bg-cyan-50/50 shadow-sm shadow-cyan-100"
                  : "border-slate-100 bg-white hover:border-slate-200 hover:shadow-sm"
              }`}
            >
              <span className="text-2xl mb-2">{type.icon}</span>
              <span className="font-semibold text-slate-800 text-sm">{type.label}</span>
              <span className="text-xs text-slate-400 mt-0.5">{type.desc}</span>
              {data.projectType === type.id && (
                <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-cyan-500 flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Budget */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-slate-700 mb-3">Budget Range <span className="text-red-400">*</span></label>
        <div className="flex flex-wrap gap-2">
          {BUDGET_RANGES.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => updateData({ budgetRange: b })}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                data.budgetRange === b
                  ? "bg-violet-600 border-violet-600 text-white shadow-sm shadow-violet-200"
                  : "border-slate-200 text-slate-600 hover:border-violet-300 hover:text-violet-600"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="mb-10">
        <label className="block text-sm font-semibold text-slate-700 mb-3">Preferred Timeline <span className="text-red-400">*</span></label>
        <div className="flex flex-wrap gap-2">
          {TIMELINES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => updateData({ timeline: t })}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                data.timeline === t
                  ? "bg-slate-900 border-slate-900 text-white"
                  : "border-slate-200 text-slate-600 hover:border-slate-400"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onNext}
        disabled={!canProceed}
        className="w-full py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 transition-all duration-200 shadow-lg shadow-cyan-500/20 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
      >
        Continue →
      </button>
    </div>
  );
}
