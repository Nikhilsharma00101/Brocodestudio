"use client";

import { WizardData } from "./BriefingWizard";

interface Props {
  data: WizardData;
  updateData: (fields: Partial<WizardData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepTwo({ data, updateData, onNext, onBack }: Props) {
  const canProceed = data.description.trim().length >= 30;

  function updateFeature(index: number, value: string) {
    const updated = [...data.keyFeatures];
    updated[index] = value;
    updateData({ keyFeatures: updated });
  }

  function addFeature() {
    updateData({ keyFeatures: [...data.keyFeatures, ""] });
  }

  function removeFeature(index: number) {
    if (data.keyFeatures.length <= 1) return;
    updateData({ keyFeatures: data.keyFeatures.filter((_, i) => i !== index) });
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-1">Tell us your vision</h2>
      <p className="text-slate-500 mb-8 text-sm">The more detail you give us, the better we can bring it to life.</p>

      {/* Description */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Project Description <span className="text-red-400">*</span>
        </label>
        <textarea
          value={data.description}
          onChange={(e) => updateData({ description: e.target.value })}
          placeholder="Describe your project in detail. What problem does it solve? What do you want users to feel when they use it? What do you love about similar products?"
          rows={5}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 outline-none resize-none text-slate-800 placeholder:text-slate-300 text-sm transition-all"
        />
        <div className="flex justify-between mt-1">
          <span className={`text-xs ${data.description.length < 30 ? "text-red-400" : "text-green-500"}`}>
            {data.description.length < 30 ? `${30 - data.description.length} more characters needed` : "✓ Great detail!"}
          </span>
          <span className="text-xs text-slate-400">{data.description.length} chars</span>
        </div>
      </div>

      {/* Target Audience */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-slate-700 mb-2">Target Audience</label>
        <input
          type="text"
          value={data.targetAudience}
          onChange={(e) => updateData({ targetAudience: e.target.value })}
          placeholder="e.g. Small business owners, Gen Z consumers, B2B SaaS companies..."
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 outline-none text-slate-800 placeholder:text-slate-300 text-sm transition-all"
        />
      </div>

      {/* Key Features */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-slate-700 mb-2">Key Features / Must-Haves</label>
        <div className="space-y-2">
          {data.keyFeatures.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 text-xs flex items-center justify-center shrink-0 font-bold">
                {index + 1}
              </span>
              <input
                type="text"
                value={feature}
                onChange={(e) => updateFeature(index, e.target.value)}
                placeholder={`Feature ${index + 1}, e.g. User login, Payment integration...`}
                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 outline-none text-slate-800 placeholder:text-slate-300 text-sm transition-all"
              />
              {data.keyFeatures.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="p-2 text-slate-300 hover:text-red-400 transition-colors"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
        {data.keyFeatures.length < 8 && (
          <button
            type="button"
            onClick={addFeature}
            className="mt-3 text-sm text-cyan-600 hover:text-cyan-700 font-medium flex items-center gap-1 transition-colors"
          >
            <span className="text-lg leading-none">+</span> Add another feature
          </button>
        )}
      </div>

      {/* Nav Buttons */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-4 rounded-2xl font-semibold text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all duration-200"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canProceed}
          className="flex-1 py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 transition-all duration-200 shadow-lg shadow-cyan-500/20 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
