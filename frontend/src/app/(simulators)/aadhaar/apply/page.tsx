"use client";

import React, { useState } from "react";
import { FileText, MapPin, User, Calendar, CheckCircle2, Loader2, Info } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function ApplyAadhaarPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    gender: "",
    mobile: "",
    email: "",
    address: "",
    state: "",
    pincode: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [enrollmentId, setEnrollmentId] = useState("");

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API delay for biometric booking
    setTimeout(() => {
      const mockEID = `EID-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(10000 + Math.random() * 90000)}`;
      setEnrollmentId(mockEID);
      setIsSubmitting(false);
      setStep(4);
      toast.success("Enrollment Application Submitted", {
        description: "Please visit the nearest center for biometrics."
      });
    }, 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="border-b pb-2">
        <h2 className="text-2xl font-bold text-gray-800">Apply for New Aadhaar</h2>
        <p className="text-sm text-gray-500 mt-1">Book an appointment for new Aadhaar enrollment. Biometric capture is required at the center.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Progress Tracker */}
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center relative">
            <div className="absolute left-0 top-1/2 w-full h-1 bg-gray-200 -z-10 -translate-y-1/2"></div>
            <div className={`absolute left-0 top-1/2 h-1 bg-red-800 -z-10 -translate-y-1/2 transition-all duration-500`} style={{ width: `${(step - 1) * 33.33}%` }}></div>
            
            {[
              { num: 1, label: "Demographics", icon: User },
              { num: 2, label: "Address", icon: MapPin },
              { num: 3, label: "Review", icon: FileText },
              { num: 4, label: "Confirmation", icon: CheckCircle2 }
            ].map((s) => (
              <div key={s.num} className="flex flex-col items-center gap-1 bg-gray-50 px-2">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= s.num ? 'bg-red-800 text-white' : 'bg-gray-200 text-gray-500 border-2 border-white'}`}>
                  <s.icon className="h-4 w-4" />
                </div>
                <span className={`text-xs font-semibold ${step >= s.num ? 'text-red-800' : 'text-gray-500'}`}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 md:p-8">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Demographic Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700">Full Name</label>
                  <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-red-800 focus:ring-1 focus:ring-red-800" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} placeholder="As per Proof of Identity" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Date of Birth</label>
                  <input type="date" className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-red-800 focus:ring-1 focus:ring-red-800" value={formData.dob} onChange={(e) => setFormData({...formData, dob: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Gender</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-red-800 focus:ring-1 focus:ring-red-800" value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Transgender">Transgender</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Mobile Number</label>
                  <input type="tel" className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-red-800 focus:ring-1 focus:ring-red-800" value={formData.mobile} onChange={(e) => setFormData({...formData, mobile: e.target.value})} maxLength={10} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Email (Optional)</label>
                  <input type="email" className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-red-800 focus:ring-1 focus:ring-red-800" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
              </div>
              <div className="flex justify-end pt-4 border-t">
                <button onClick={handleNext} disabled={!formData.fullName || !formData.dob || !formData.gender || !formData.mobile} className="bg-red-800 text-white px-6 py-2 rounded font-semibold hover:bg-red-900 disabled:opacity-50">Next Step</button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Address Details (As per Proof of Address)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-gray-700">House No/Bldg/Apt & Street</label>
                  <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-red-800 focus:ring-1 focus:ring-red-800" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">State</label>
                  <select className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-red-800 focus:ring-1 focus:ring-red-800" value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})}>
                    <option value="">Select State</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">PIN Code</label>
                  <input type="text" className="w-full border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-red-800 focus:ring-1 focus:ring-red-800" value={formData.pincode} onChange={(e) => setFormData({...formData, pincode: e.target.value.replace(/[^0-9]/g, '')})} maxLength={6} />
                </div>
              </div>
              <div className="flex justify-between pt-4 border-t">
                <button onClick={handleBack} className="px-6 py-2 border border-gray-300 text-gray-700 rounded font-semibold hover:bg-gray-50">Back</button>
                <button onClick={handleNext} disabled={!formData.address || !formData.state || !formData.pincode} className="bg-red-800 text-white px-6 py-2 rounded font-semibold hover:bg-red-900 disabled:opacity-50">Review Details</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <h3 className="text-lg font-bold text-gray-800 border-b pb-2">Review & Submit</h3>
              
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 text-sm text-blue-800 mb-6">
                Please verify your details carefully. These details will be printed on your Aadhaar card.
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm bg-gray-50 p-4 rounded-md border border-gray-200">
                <div className="text-gray-500">Full Name</div>
                <div className="font-semibold">{formData.fullName}</div>
                <div className="text-gray-500">Date of Birth</div>
                <div className="font-semibold">{formData.dob}</div>
                <div className="text-gray-500">Gender</div>
                <div className="font-semibold">{formData.gender}</div>
                <div className="text-gray-500">Mobile</div>
                <div className="font-semibold">{formData.mobile}</div>
                <div className="text-gray-500">Full Address</div>
                <div className="font-semibold col-span-2 mt-1 bg-white p-2 border rounded">{formData.address}, {formData.state} - {formData.pincode}</div>
              </div>

              <div className="flex justify-between pt-4 border-t">
                <button onClick={handleBack} className="px-6 py-2 border border-gray-300 text-gray-700 rounded font-semibold hover:bg-gray-50" disabled={isSubmitting}>Back</button>
                <button onClick={handleSubmit} disabled={isSubmitting} className="bg-red-800 text-white px-8 py-2 rounded font-bold hover:bg-red-900 flex items-center gap-2">
                  {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Booking Appointment...</> : "Submit Application"}
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center space-y-6 py-8 animate-in zoom-in-95">
              <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Application Submitted!</h3>
                <p className="text-gray-600 mt-2 max-w-md mx-auto">Your enrollment application has been saved. Please visit your nearest Aadhaar Enrollment Center with original documents for biometric capture.</p>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 max-w-sm mx-auto shadow-sm">
                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Enrollment ID (EID)</p>
                <p className="text-xl font-mono font-bold text-red-800 tracking-wide">{enrollmentId}</p>
              </div>

              <div className="pt-4">
                <Link href="/aadhaar/dashboard" className="bg-red-800 text-white px-8 py-2.5 rounded font-semibold hover:bg-red-900 inline-block">
                  Go to Dashboard
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
