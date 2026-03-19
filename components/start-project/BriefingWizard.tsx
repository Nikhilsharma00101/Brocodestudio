"use client";

import { useState } from "react";
import { createBrief, type BriefAssetInput } from "@/app/actions/brief";

// Step components
import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";
import { StepThree } from "./StepThree";
import { StepFour } from "./StepFour";
import { SuccessScreen } from "./SuccessScreen";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
export interface WizardData {
  // Step 1
  projectType: string;
  budgetRange: string;
  timeline: string;
  // Step 2
  description: string;
  targetAudience: string;
  keyFeatures: string[];
  // Step 3
  assets: BriefAssetInput[];
  // Step 4
  name: string;
  email: string;
  agreedToTerms: boolean;
}

const INITIAL_DATA: WizardData = {
  projectType: "",
  budgetRange: "",
  timeline: "",
  description: "",
  targetAudience: "",
  keyFeatures: [""],
  assets: [],
  name: "",
  email: "",
  agreedToTerms: false,
};

const STEPS = ["Project Type", "Your Vision", "References", "Contact"];

// ─────────────────────────────────────────────
// Main Wizard
// ─────────────────────────────────────────────
export function BriefingWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<WizardData>(INITIAL_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function updateData(fields: Partial<WizardData>) {
    setData((prev) => ({ ...prev, ...fields }));
  }

  function nextStep() {
    setError(null);
    setCurrentStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function prevStep() {
    setError(null);
    setCurrentStep((s) => Math.max(s - 1, 0));
  }

  async function handleSubmit() {
    if (!data.agreedToTerms) {
      setError("Please agree to the terms to continue.");
      return;
    }
    setIsSubmitting(true);
    setError(null);

    const result = await createBrief({
      name: data.name,
      email: data.email,
      projectType: data.projectType,
      description: data.description,
      targetAudience: data.targetAudience,
      keyFeatures: data.keyFeatures.filter(Boolean).join("\n"),
      budgetRange: data.budgetRange,
      timeline: data.timeline,
      assets: data.assets,
    });

    setIsSubmitting(false);
    if (result.success) {
      setIsSuccess(true);
    } else {
      setError(result.error || "Something went wrong. Please try again.");
    }
  }

  if (isSuccess) return <SuccessScreen name={data.name} />;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        {/* Step Labels */}
        <div className="flex justify-between mb-3">
          {STEPS.map((step, i) => (
            <span
              key={step}
              className={`text-xs font-semibold tracking-wide uppercase transition-colors duration-300 ${
                i === currentStep
                  ? "text-cyan-600"
                  : i < currentStep
                  ? "text-violet-500"
                  : "text-slate-300"
              }`}
            >
              {step}
            </span>
          ))}
        </div>
        {/* Track */}
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-violet-600 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
          />
        </div>
        {/* Step count */}
        <p className="text-right text-xs text-slate-400 mt-2">
          Step {currentStep + 1} of {STEPS.length}
        </p>
      </div>

      {/* Card */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white shadow-xl shadow-slate-200/50 p-8 md:p-10">
        {/* Error Banner */}
        {error && (
          <div className="mb-6 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Step Content */}
        {currentStep === 0 && (
          <StepOne data={data} updateData={updateData} onNext={nextStep} />
        )}
        {currentStep === 1 && (
          <StepTwo data={data} updateData={updateData} onNext={nextStep} onBack={prevStep} />
        )}
        {currentStep === 2 && (
          <StepThree data={data} updateData={updateData} onNext={nextStep} onBack={prevStep} />
        )}
        {currentStep === 3 && (
          <StepFour
            data={data}
            updateData={updateData}
            onSubmit={handleSubmit}
            onBack={prevStep}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
}
