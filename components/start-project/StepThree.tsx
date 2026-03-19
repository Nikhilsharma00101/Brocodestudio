"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { WizardData } from "./BriefingWizard";
import { BriefAssetInput } from "@/app/actions/brief";

interface Props {
  data: WizardData;
  updateData: (fields: Partial<WizardData>) => void;
  onNext: () => void;
  onBack: () => void;
}

interface UploadingFile {
  id: string;
  name: string;
  progress: number;
}

export function StepThree({ data, updateData, onNext, onBack }: Props) {
  const [uploading, setUploading] = useState<UploadingFile[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    // Max 8 total assets
    if (data.assets.length + files.length > 8) {
      setUploadError("Maximum 8 reference images allowed.");
      return;
    }

    setUploadError(null);

    for (const file of files) {
      const tempId = Math.random().toString(36).slice(2);
      setUploading((prev) => [...prev, { id: tempId, name: file.name, progress: 0 }]);

      try {
        // Get a Cloudinary signature from our public API
        const sigRes = await fetch("/api/upload-signature", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ folder: "brocodestudio/briefs" }),
        });
        const { signature, timestamp, apiKey, cloudName, folder } = await sigRes.json();

        const formData = new FormData();
        formData.append("file", file);
        formData.append("signature", signature);
        formData.append("timestamp", timestamp);
        formData.append("api_key", apiKey);
        formData.append("folder", folder);

        const uploadRes = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          { method: "POST", body: formData }
        );
        const uploadData = await uploadRes.json();

        if (uploadData.secure_url) {
          const newAsset: BriefAssetInput = {
            url: uploadData.secure_url,
            publicId: uploadData.public_id,
            description: "",
          };
          updateData({ assets: [...data.assets, newAsset] });
        }
      } catch {
        setUploadError(`Failed to upload ${file.name}. Please try again.`);
      } finally {
        setUploading((prev) => prev.filter((u) => u.id !== tempId));
      }
    }

    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function updateDescription(index: number, description: string) {
    const updated = [...data.assets];
    updated[index] = { ...updated[index], description };
    updateData({ assets: updated });
  }

  function removeAsset(index: number) {
    updateData({ assets: data.assets.filter((_, i) => i !== index) });
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-1">Add reference images</h2>
      <p className="text-slate-500 mb-8 text-sm">
        Upload logos, inspiration screenshots, or brand assets. This step is optional but very helpful.
      </p>

      {/* Upload Zone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="relative mb-6 border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center cursor-pointer hover:border-cyan-300 hover:bg-cyan-50/30 transition-all duration-200 group"
      >
        <div className="text-4xl mb-3">📁</div>
        <p className="font-semibold text-slate-700 group-hover:text-cyan-600 transition-colors">
          Click to upload reference images
        </p>
        <p className="text-xs text-slate-400 mt-1">PNG, JPG, WEBP up to 10MB each. Max 8 images.</p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Upload Error */}
      {uploadError && (
        <div className="mb-4 px-4 py-2 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
          {uploadError}
        </div>
      )}

      {/* Uploading indicators */}
      {uploading.map((u) => (
        <div key={u.id} className="mb-2 flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl border border-slate-100">
          <div className="w-4 h-4 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin shrink-0" />
          <span className="text-sm text-slate-600 text-ellipsis overflow-hidden whitespace-nowrap">Uploading {u.name}...</span>
        </div>
      ))}

      {/* Uploaded Assets Grid */}
      {data.assets.length > 0 && (
        <div className="space-y-4 mb-6">
          {data.assets.map((asset, index) => (
            <div key={asset.publicId} className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              {/* Thumbnail */}
              <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border border-slate-200">
                <Image src={asset.url} alt="Reference" fill className="object-cover" />
              </div>
              {/* Description Input */}
              <div className="flex-1">
                <input
                  type="text"
                  value={asset.description}
                  onChange={(e) => updateDescription(index, e.target.value)}
                  placeholder="Describe this image (e.g. 'Our current logo', 'Inspiration for the hero section')"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 outline-none text-slate-800 placeholder:text-slate-300 text-sm transition-all"
                />
                <button
                  type="button"
                  onClick={() => removeAsset(index)}
                  className="mt-2 text-xs text-red-400 hover:text-red-500 transition-colors font-medium"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

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
          disabled={uploading.length > 0}
          className="flex-1 py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 transition-all duration-200 shadow-lg shadow-cyan-500/20 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
        >
          {uploading.length > 0 ? "Uploading..." : "Continue →"}
        </button>
      </div>
    </div>
  );
}
