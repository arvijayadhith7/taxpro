"use client";

import React, { useState } from "react";
import { Link2, AlertCircle, CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function LinkPanPage() {
  const [pan, setPan] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<"idle" | "verifying" | "linked" | "failed">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pan || !aadhaar || !name) {
      toast.error("Please fill in all details.");
      return;
    }

    setStatus("verifying");
    
    // Simulate API delay
    setTimeout(() => {
      // Basic mock validation
      if (pan.length !== 10) {
        setStatus("failed");
        setErrorMessage("Invalid PAN format. Please ensure it is 10 characters.");
        return;
      }
      if (aadhaar.length !== 12) {
        setStatus("failed");
        setErrorMessage("Invalid Aadhaar number. Must be exactly 12 digits.");
        return;
      }
      
      // Success simulation
      setStatus("linked");
      toast.success("Aadhaar-PAN linking successful!", {
        description: `PAN ${pan.toUpperCase()} has been linked to Aadhaar ${aadhaar}.`
      });
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="border-b pb-2">
        <h2 className="text-2xl font-bold text-gray-800">Link Aadhaar with PAN</h2>
        <p className="text-sm text-gray-500 mt-1">As per CBDT guidelines, linking Aadhaar with PAN is mandatory.</p>
      </div>

      {status === "linked" ? (
        <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center space-y-4 animate-in fade-in zoom-in-95">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-green-800">Your PAN is linked to Aadhaar!</h3>
          <p className="text-green-700 max-w-md mx-auto">
            Your PAN <strong className="uppercase">{pan}</strong> has been successfully linked with Aadhaar number ending in <strong>{aadhaar.slice(-4)}</strong>.
          </p>
          <div className="pt-6">
            <Link href="/aadhaar/dashboard" className="bg-green-600 text-white px-6 py-2.5 rounded shadow hover:bg-green-700 font-semibold transition">
              Return to Dashboard
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-red-800 px-6 py-4">
                <h3 className="text-white font-bold flex items-center gap-2">
                  <Link2 className="h-5 w-5" /> Linking Details
                </h3>
              </div>
              <form onSubmit={handleLink} className="p-6 space-y-5">
                {status === "failed" && (
                  <div className="bg-red-50 border-l-4 border-red-600 p-4 text-sm text-red-800 flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
                    <div>
                      <strong>Linking Failed:</strong> {errorMessage}
                    </div>
                  </div>
                )}
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">PAN Number <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 uppercase focus:ring-2 focus:ring-red-800 focus:border-red-800 outline-none transition"
                    placeholder="e.g. ABCDE1234F"
                    maxLength={10}
                    value={pan}
                    onChange={(e) => setPan(e.target.value.toUpperCase())}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Aadhaar Number <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-red-800 focus:border-red-800 outline-none transition"
                    placeholder="12 digit Aadhaar Number"
                    maxLength={12}
                    value={aadhaar}
                    onChange={(e) => setAadhaar(e.target.value.replace(/[^0-9]/g, ''))}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Name as per Aadhaar <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 uppercase focus:ring-2 focus:ring-red-800 focus:border-red-800 outline-none transition"
                    placeholder="Enter full name exactly as printed on Aadhaar"
                    value={name}
                    onChange={(e) => setName(e.target.value.toUpperCase())}
                  />
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
                  <button type="button" className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md font-semibold hover:bg-gray-50 transition">
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={status === "verifying"}
                    className="bg-red-800 text-white px-6 py-2 rounded-md font-semibold hover:bg-red-900 transition flex items-center gap-2 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed min-w-[140px] justify-center"
                  >
                    {status === "verifying" ? (
                      <><Loader2 className="h-4 w-4 animate-spin" /> Verifying...</>
                    ) : (
                      "Link Aadhaar"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
              <h4 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
                <AlertCircle className="h-5 w-5" /> Important Note
              </h4>
              <ul className="text-sm text-yellow-900 space-y-2 list-disc pl-4">
                <li>Name, Date of Birth, and Gender as per PAN will be validated against your Aadhaar details.</li>
                <li>Please ensure that the "Name as per Aadhaar" is exactly same as printed on your Aadhaar card.</li>
                <li>If there is a mismatch, please get it corrected in either PAN or Aadhaar before linking.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
