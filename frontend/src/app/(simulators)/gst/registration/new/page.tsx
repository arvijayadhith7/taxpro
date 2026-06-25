"use client";

import React, { useState } from "react";
import { CheckCircle, ArrowRight, UserPlus, Building, Upload } from "lucide-react";
import Link from "next/link";

export default function NewGSTRegistrationPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto bg-white border border-green-200 rounded-lg p-8 text-center shadow-sm mt-10">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Application Submitted Successfully!</h2>
        <p className="text-gray-600 mb-6">
          Your application for New GST Registration has been successfully submitted. 
          Your Application Reference Number (ARN) is <strong className="text-gov-blue">AA0712210000001</strong>.
        </p>
        <Link 
          href="/gst/dashboard"
          className="bg-gov-blue text-white px-6 py-2 rounded font-medium hover:bg-blue-800 transition"
        >
          Go to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="border-b pb-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">New Registration</h1>
        <p className="text-sm text-gray-500 mt-1">Application for Registration under Section 22 of the CGST Act.</p>
      </div>

      <div className="flex gap-4 mb-8">
        <div className={`flex-1 pb-2 border-b-4 ${step >= 1 ? 'border-gov-blue text-gov-blue font-bold' : 'border-gray-200 text-gray-400'}`}>
          1. Business Details
        </div>
        <div className={`flex-1 pb-2 border-b-4 ${step >= 2 ? 'border-gov-blue text-gov-blue font-bold' : 'border-gray-200 text-gray-400'}`}>
          2. Promoters / Partners
        </div>
        <div className={`flex-1 pb-2 border-b-4 ${step >= 3 ? 'border-gov-blue text-gov-blue font-bold' : 'border-gray-200 text-gray-400'}`}>
          3. Verification
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border rounded shadow-sm p-6 space-y-6">
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in">
            <h3 className="font-bold text-gray-700 flex items-center gap-2 border-b pb-2">
              <Building className="h-5 w-5" /> Business Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Legal Name of Business (As per PAN)</label>
                <input required type="text" className="w-full border rounded p-2 text-sm" placeholder="Enter legal name" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">PAN</label>
                <input required type="text" className="w-full border rounded p-2 text-sm uppercase" placeholder="ABCDE1234F" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">State / UT</label>
                <select required className="w-full border rounded p-2 text-sm">
                  <option value="">Select State</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Karnataka">Karnataka</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Constitution of Business</label>
                <select required className="w-full border rounded p-2 text-sm">
                  <option value="">Select Constitution</option>
                  <option value="Proprietorship">Proprietorship</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Private Limited Company">Private Limited Company</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-in fade-in">
            <h3 className="font-bold text-gray-700 flex items-center gap-2 border-b pb-2">
              <UserPlus className="h-5 w-5" /> Details of Promoters / Partners
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">First Name</label>
                <input required type="text" className="w-full border rounded p-2 text-sm" placeholder="Enter first name" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Last Name</label>
                <input required type="text" className="w-full border rounded p-2 text-sm" placeholder="Enter last name" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Mobile Number</label>
                <input required type="tel" className="w-full border rounded p-2 text-sm" placeholder="9876543210" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Email Address</label>
                <input required type="email" className="w-full border rounded p-2 text-sm" placeholder="email@example.com" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-600 mb-1">Upload Photograph (JPG/PNG)</label>
                <div className="border-2 border-dashed rounded p-4 text-center text-gray-500 hover:bg-gray-50 cursor-pointer">
                  <Upload className="h-6 w-6 mx-auto mb-2" />
                  <span className="text-sm">Click to upload or drag and drop</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 animate-in fade-in">
            <h3 className="font-bold text-gray-700 flex items-center gap-2 border-b pb-2">
              <CheckCircle className="h-5 w-5" /> Verification
            </h3>
            <div className="bg-yellow-50 p-4 border border-yellow-200 rounded text-sm text-yellow-800">
              <input required type="checkbox" id="verify" className="mr-2" />
              <label htmlFor="verify">
                I hereby solemnly affirm and declare that the information given herein above is true and correct to the best of my knowledge and belief and nothing has been concealed therefrom.
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Name of Authorized Signatory</label>
                <select required className="w-full border rounded p-2 text-sm">
                  <option value="">Select Signatory</option>
                  <option value="1">JAYESH KUMAR</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Place</label>
                <input required type="text" className="w-full border rounded p-2 text-sm" placeholder="Enter Place" />
              </div>
            </div>
          </div>
        )}

        <div className="pt-4 border-t flex justify-between">
          {step > 1 ? (
            <button 
              type="button" 
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 text-sm border rounded hover:bg-gray-50 font-medium"
            >
              Back
            </button>
          ) : <div></div>}
          
          <button 
            type="submit" 
            className="px-6 py-2 text-sm bg-gov-blue text-white rounded hover:bg-blue-800 font-medium flex items-center gap-2"
          >
            {step === 3 ? "Submit with EVC" : "Save & Continue"}
            {step !== 3 && <ArrowRight className="h-4 w-4" />}
          </button>
        </div>
      </form>
    </div>
  );
}
