"use client";

import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Info, CheckCircle2, ShieldCheck, AlertCircle, ArrowRight, UserCircle, IndianRupee, FileText } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type FlowStep = "setup" | "status" | "form" | "instructions" | "summary" | "verification";

export default function ITRFilingPage() {
  const { data: session } = useSession();
  const router = useRouter();
  
  const [step, setStep] = useState<FlowStep>("setup");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Flow State
  const [ay, setAy] = useState("2026-27");
  const [mode, setMode] = useState("online");
  const [status, setStatus] = useState("individual");
  const [formType, setFormType] = useState("ITR-1");
  const [optNewRegime, setOptNewRegime] = useState("yes"); 
  
  // Confirmed sections in Summary
  const [confirmedSections, setConfirmedSections] = useState({
    personal: false,
    gti: false,
    deductions: false,
    taxesPaid: false,
    liability: false
  });

  // Income Details State
  const [salary, setSalary] = useState(850000);
  const [houseProperty, setHouseProperty] = useState(0);
  const [otherSources, setOtherSources] = useState(45000);
  
  // Deductions State
  const [sec80C, setSec80C] = useState(150000);
  const [sec80D, setSec80D] = useState(25000);

  // Taxes Paid
  const [tdsSalary, setTdsSalary] = useState(45000);
  const [advanceTax, setAdvanceTax] = useState(10000);

  // Computations
  const [grossIncome, setGrossIncome] = useState(0);
  const [totalDeductions, setTotalDeductions] = useState(0);
  const [taxableIncome, setTaxableIncome] = useState(0);
  const [totalTaxLiability, setTotalTaxLiability] = useState(0);
  const [netDueRefund, setNetDueRefund] = useState(0);

  // Verification
  const [expectedOtp, setExpectedOtp] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [otpError, setOtpError] = useState("");

  useEffect(() => {
    if (step === "verification" && !expectedOtp) {
      const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setExpectedOtp(newOtp);
      // Simulate sending an SMS
      setTimeout(() => {
        alert(`[SIMULATED SMS]\n\nYour Aadhaar OTP for e-Filing verification is ${newOtp}. Do not share this with anyone.`);
      }, 500);
    }
  }, [step, expectedOtp]);

  useEffect(() => {
    const gross = Number(salary) + Number(houseProperty) + Number(otherSources);
    setGrossIncome(gross);

    const stdDeduction = optNewRegime === "yes" ? 75000 : 50000;
    let deductions = stdDeduction;
    if (optNewRegime === "no") {
      deductions += (Number(sec80C) + Number(sec80D));
    }
    setTotalDeductions(deductions);

    const netTaxable = Math.max(0, gross - deductions);
    setTaxableIncome(netTaxable);

    let baseTax = 0;
    if (optNewRegime === "yes") {
      if (netTaxable > 300000) baseTax += Math.min(400000, netTaxable - 300000) * 0.05;
      if (netTaxable > 700000) baseTax += Math.min(300000, netTaxable - 700000) * 0.10;
      if (netTaxable > 1000000) baseTax += Math.min(200000, netTaxable - 1000000) * 0.15;
    } else {
      if (netTaxable > 250000) baseTax += Math.min(250000, netTaxable - 250000) * 0.05;
      if (netTaxable > 500000) baseTax += Math.min(500000, netTaxable - 500000) * 0.20;
    }
    
    const calculatedCess = baseTax * 0.04;
    const liability = baseTax + calculatedCess;
    setTotalTaxLiability(liability);

    const totalPaid = Number(tdsSalary) + Number(advanceTax);
    setNetDueRefund(liability - totalPaid);
  }, [salary, houseProperty, otherSources, sec80C, sec80D, optNewRegime, tdsSalary, advanceTax]);

  const toggleConfirm = (section: keyof typeof confirmedSections) => {
    setConfirmedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const allConfirmed = Object.values(confirmedSections).every(v => v);

  const handleSubmit = async () => {
    if (!verificationSuccess) {
      alert("Please verify via Aadhaar OTP.");
      return;
    }
    
    try {
      setIsSubmitting(true);
      const totalPaid = Number(tdsSalary) + Number(advanceTax);
      
      const payload = {
        assessmentYear: ay,
        formType,
        totalIncome: grossIncome,
        taxPaid: totalPaid,
        refundDue: netDueRefund <= 0 ? Math.abs(netDueRefund) : -netDueRefund,
      };

      const res = await fetch("/api/itr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      
      if (!res.ok) {
        throw new Error(result.details || result.error || "Failed");
      }

      alert(`ITR successfully e-filed!\nAcknowledgment Number: ${result.data.ackNumber}`);
      router.push("/incometax/dashboard");
    } catch (err: any) {
      alert("Error submitting the return: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto font-sans">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gov-blue">File Income Tax Return</h1>
        <div className="h-1 w-20 bg-gov-orange mt-2"></div>
      </div>

      <div className="bg-white border border-gray-200 shadow-sm rounded-md p-6">
        
        {/* Step 1: Setup */}
        {step === "setup" && (
          <div className="space-y-6">
            <h2 className="font-bold text-lg text-gray-800 border-b pb-2">Select Assessment Year</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Select Assessment Year</Label>
                <Select value={ay} onValueChange={(v) => setAy(v || "2026-27")}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2026-27">2026-27 (Current AY)</SelectItem>
                    <SelectItem value="2025-26">2025-26</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Select Mode of Filing</Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 border p-3 rounded w-full cursor-pointer hover:bg-gray-50 data-[active=true]:border-gov-blue data-[active=true]:bg-blue-50" data-active={mode === "online"}>
                    <input type="radio" name="mode" checked={mode === "online"} onChange={() => setMode("online")} className="hidden" />
                    <div className={`w-4 h-4 rounded-full border flex justify-center items-center ${mode === "online" ? "border-gov-blue" : "border-gray-300"}`}>
                      {mode === "online" && <div className="w-2 h-2 rounded-full bg-gov-blue"></div>}
                    </div>
                    <span className="font-semibold text-sm">Online (Recommended)</span>
                  </label>
                  <label className="flex items-center gap-2 border p-3 rounded w-full cursor-pointer hover:bg-gray-50 opacity-60">
                    <input type="radio" name="mode" disabled className="hidden" />
                    <div className="w-4 h-4 rounded-full border border-gray-300"></div>
                    <span className="font-semibold text-sm text-gray-500">Offline (Utility)</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button onClick={() => setStep("status")} className="bg-gov-blue text-white px-6 py-2 rounded font-semibold flex items-center gap-2 hover:bg-blue-800">
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Status */}
        {step === "status" && (
          <div className="space-y-6">
            <h2 className="font-bold text-lg text-gray-800 border-b pb-2">Please select the status applicable to you to proceed further</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-4 border rounded cursor-pointer hover:bg-gray-50 bg-blue-50 border-gov-blue">
                <input type="radio" checked readOnly className="h-4 w-4 text-gov-blue focus:ring-gov-blue" />
                <span className="font-semibold text-gov-blue">Individual</span>
              </label>
              <label className="flex items-center gap-3 p-4 border rounded opacity-50 cursor-not-allowed">
                <input type="radio" disabled className="h-4 w-4" />
                <span className="font-semibold">Hindu Undivided Family (HUF)</span>
              </label>
              <label className="flex items-center gap-3 p-4 border rounded opacity-50 cursor-not-allowed">
                <input type="radio" disabled className="h-4 w-4" />
                <span className="font-semibold">Others</span>
              </label>
            </div>
            <div className="flex justify-between">
              <button onClick={() => setStep("setup")} className="border border-gov-blue text-gov-blue px-6 py-2 rounded font-semibold hover:bg-blue-50">Back</button>
              <button onClick={() => setStep("form")} className="bg-gov-blue text-white px-6 py-2 rounded font-semibold hover:bg-blue-800">Continue</button>
            </div>
          </div>
        )}

        {/* Step 3: Form */}
        {step === "form" && (
          <div className="space-y-6">
            <h2 className="font-bold text-lg text-gray-800 border-b pb-2">Select ITR Form</h2>
            <div className="space-y-2">
              <Label>I know which ITR Form I need to file</Label>
              <Select value={formType} onValueChange={(v) => setFormType(v || "ITR-1")}>
                <SelectTrigger className="w-full md:w-1/2 font-semibold">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ITR-1">ITR-1</SelectItem>
                  <SelectItem value="ITR-2">ITR-2</SelectItem>
                  <SelectItem value="ITR-3">ITR-3</SelectItem>
                  <SelectItem value="ITR-4">ITR-4</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="bg-blue-50 p-4 rounded border border-blue-200">
              {formType === "ITR-1" && (
                <>
                  <h4 className="font-bold text-gov-blue text-sm">ITR-1 (Sahaj)</h4>
                  <p className="text-xs text-gray-600 mt-1">For individuals being a resident (other than not ordinarily resident) having total income upto Rs.50 lakh, having Income from Salaries, one house property, other sources (Interest etc.), and agricultural income upto Rs.5 thousand.</p>
                </>
              )}
              {formType === "ITR-2" && (
                <>
                  <h4 className="font-bold text-gov-blue text-sm">ITR-2</h4>
                  <p className="text-xs text-gray-600 mt-1">For Individuals and HUFs not having income from profits and gains of business or profession.</p>
                </>
              )}
              {formType === "ITR-3" && (
                <>
                  <h4 className="font-bold text-gov-blue text-sm">ITR-3</h4>
                  <p className="text-xs text-gray-600 mt-1">For individuals and HUFs having income from profits and gains of business or profession.</p>
                </>
              )}
              {formType === "ITR-4" && (
                <>
                  <h4 className="font-bold text-gov-blue text-sm">ITR-4 (Sugam)</h4>
                  <p className="text-xs text-gray-600 mt-1">For Individuals, HUFs and Firms (other than LLP) being a resident having total income upto Rs.50 lakh and having income from business and profession which is computed under sections 44AD, 44ADA or 44AE.</p>
                </>
              )}
            </div>
            <div className="flex justify-between">
              <button onClick={() => setStep("status")} className="border border-gov-blue text-gov-blue px-6 py-2 rounded font-semibold hover:bg-blue-50">Back</button>
              <button onClick={() => setStep("instructions")} className="bg-gov-blue text-white px-6 py-2 rounded font-semibold hover:bg-blue-800">Proceed with {formType}</button>
            </div>
          </div>
        )}

        {/* Step 4: Instructions */}
        {step === "instructions" && (
          <div className="space-y-6 text-center py-8">
            <h2 className="font-bold text-2xl text-gov-blue mb-2">Let's Validate your Pre-filled Data</h2>
            <p className="text-gray-600 text-sm max-w-lg mx-auto">
              We have pre-filled your return based on information available with the Income Tax Department. Please confirm that the details are correct.
            </p>
            <div className="flex justify-center mt-6">
              <button onClick={() => setStep("summary")} className="bg-gov-orange text-white px-8 py-3 rounded-md font-bold text-lg shadow-md hover:bg-orange-600 transition">
                Let's get started <ArrowRight className="inline h-5 w-5 ml-1" />
              </button>
            </div>
          </div>
        )}

        {/* Step 5: The Actual 5-Block Summary (The real deal) */}
        {step === "summary" && (
          <div className="space-y-6">
            <div className="bg-gray-50 border border-gray-200 p-4 rounded flex justify-between items-center text-sm">
              <span className="font-bold text-gray-700">PAN: <span className="text-gov-blue">{session?.user?.pan}</span></span>
              <span className="font-bold text-gray-700">AY: <span className="text-gov-blue">{ay}</span></span>
              <span className="font-bold text-gray-700">Form: <span className="text-gov-blue">{formType}</span></span>
            </div>

            <h2 className="font-bold text-xl text-gov-blue text-center mb-6">Please verify your returns summary</h2>

            <Accordion className="space-y-4">
              
              {/* 1. Personal Information */}
              <AccordionItem value="personal" className="border rounded-md shadow-sm bg-white overflow-hidden">
                <AccordionTrigger className="px-5 py-4 hover:bg-gray-50 hover:no-underline">
                  <div className="flex flex-1 items-center justify-between pr-4">
                    <div className="flex items-center gap-3">
                      <UserCircle className="h-8 w-8 text-gov-blue" />
                      <div className="text-left">
                        <p className="font-bold text-gov-blue text-base">Personal Information</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {confirmedSections.personal ? <span className="text-xs bg-green-100 text-green-800 font-bold px-2 py-1 rounded">CONFIRMED</span> : <span className="text-xs text-red-500 font-bold">Needs Confirmation</span>}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-5 border-t border-gray-200 bg-gray-50 space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div><p className="text-gray-500 text-xs">Name</p><p className="font-bold">{session?.user?.name || "TAXPAYER"}</p></div>
                    <div><p className="text-gray-500 text-xs">PAN</p><p className="font-bold uppercase">{session?.user?.pan}</p></div>
                    <div className="col-span-2">
                      <Label>Nature of Employment *</Label>
                      <Select defaultValue="private">
                        <SelectTrigger className="w-1/2 bg-white mt-1"><SelectValue /></SelectTrigger>
                        <SelectContent><SelectItem value="private">Private Sector</SelectItem><SelectItem value="govt">Government</SelectItem></SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="pt-4 flex justify-end">
                    <button onClick={() => toggleConfirm('personal')} className="bg-gov-blue text-white px-4 py-2 rounded text-sm font-semibold">{confirmedSections.personal ? "Edit" : "Confirm"}</button>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* 2. Gross Total Income */}
              <AccordionItem value="gti" className="border rounded-md shadow-sm bg-white overflow-hidden">
                <AccordionTrigger className="px-5 py-4 hover:bg-gray-50 hover:no-underline">
                  <div className="flex flex-1 items-center justify-between pr-4">
                    <div className="flex items-center gap-3">
                      <IndianRupee className="h-8 w-8 text-gov-blue" />
                      <div className="text-left">
                        <p className="font-bold text-gov-blue text-base">Gross Total Income</p>
                        <p className="text-sm font-mono text-gray-600 font-bold">₹ {grossIncome.toLocaleString("en-IN")}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {confirmedSections.gti ? <span className="text-xs bg-green-100 text-green-800 font-bold px-2 py-1 rounded">CONFIRMED</span> : <span className="text-xs text-red-500 font-bold">Needs Confirmation</span>}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-5 border-t border-gray-200 bg-gray-50 space-y-4">
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between items-center bg-white p-3 border rounded">
                      <Label>Income from Salary</Label>
                      <Input type="number" value={salary} onChange={e => setSalary(Number(e.target.value))} className="w-48 font-mono text-right" />
                    </div>
                    <div className="flex justify-between items-center bg-white p-3 border rounded">
                      <Label>Income from House Property</Label>
                      <Input type="number" value={houseProperty} onChange={e => setHouseProperty(Number(e.target.value))} className="w-48 font-mono text-right" />
                    </div>
                    <div className="flex justify-between items-center bg-white p-3 border rounded">
                      <Label>Income from Other Sources</Label>
                      <Input type="number" value={otherSources} onChange={e => setOtherSources(Number(e.target.value))} className="w-48 font-mono text-right" />
                    </div>
                  </div>
                  <div className="pt-4 flex justify-end">
                    <button onClick={() => toggleConfirm('gti')} className="bg-gov-blue text-white px-4 py-2 rounded text-sm font-semibold">{confirmedSections.gti ? "Edit" : "Confirm"}</button>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* 3. Total Deductions */}
              <AccordionItem value="deductions" className="border rounded-md shadow-sm bg-white overflow-hidden">
                <AccordionTrigger className="px-5 py-4 hover:bg-gray-50 hover:no-underline">
                  <div className="flex flex-1 items-center justify-between pr-4">
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="h-8 w-8 text-gov-blue" />
                      <div className="text-left">
                        <p className="font-bold text-gov-blue text-base">Total Deductions</p>
                        <p className="text-sm font-mono text-gray-600 font-bold">₹ {totalDeductions.toLocaleString("en-IN")}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {confirmedSections.deductions ? <span className="text-xs bg-green-100 text-green-800 font-bold px-2 py-1 rounded">CONFIRMED</span> : <span className="text-xs text-red-500 font-bold">Needs Confirmation</span>}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-5 border-t border-gray-200 bg-gray-50 space-y-4">
                  <div className="flex gap-4 items-center bg-amber-50 p-3 rounded border border-amber-200">
                    <Label className="font-bold">Are you opting for New Tax Regime?</Label>
                    <Select value={optNewRegime} onValueChange={(v) => setOptNewRegime(v || "yes")}>
                      <SelectTrigger className="w-32 bg-white"><SelectValue /></SelectTrigger>
                      <SelectContent><SelectItem value="yes">Yes</SelectItem><SelectItem value="no">No</SelectItem></SelectContent>
                    </Select>
                  </div>
                  {optNewRegime === "yes" ? (
                    <p className="text-sm text-gray-600 italic p-4 text-center">Standard deduction of ₹75,000 applied. No other deductions available.</p>
                  ) : (
                    <div className="space-y-4 text-sm">
                      <div className="flex justify-between items-center bg-white p-3 border rounded">
                        <Label>80C (Life Insurance, PPF)</Label>
                        <Input type="number" max={15000} value={sec80C} onChange={e => setSec80C(Number(e.target.value))} className="w-48 font-mono text-right" />
                      </div>
                      <div className="flex justify-between items-center bg-white p-3 border rounded">
                        <Label>80D (Health Insurance)</Label>
                        <Input type="number" max={25000} value={sec80D} onChange={e => setSec80D(Number(e.target.value))} className="w-48 font-mono text-right" />
                      </div>
                    </div>
                  )}
                  <div className="pt-4 flex justify-end">
                    <button onClick={() => toggleConfirm('deductions')} className="bg-gov-blue text-white px-4 py-2 rounded text-sm font-semibold">{confirmedSections.deductions ? "Edit" : "Confirm"}</button>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* 4. Tax Paid */}
              <AccordionItem value="taxesPaid" className="border rounded-md shadow-sm bg-white overflow-hidden">
                <AccordionTrigger className="px-5 py-4 hover:bg-gray-50 hover:no-underline">
                  <div className="flex flex-1 items-center justify-between pr-4">
                    <div className="flex items-center gap-3">
                      <FileText className="h-8 w-8 text-gov-blue" />
                      <div className="text-left">
                        <p className="font-bold text-gov-blue text-base">Tax Paid</p>
                        <p className="text-sm font-mono text-gray-600 font-bold">₹ {(Number(tdsSalary) + Number(advanceTax)).toLocaleString("en-IN")}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {confirmedSections.taxesPaid ? <span className="text-xs bg-green-100 text-green-800 font-bold px-2 py-1 rounded">CONFIRMED</span> : <span className="text-xs text-red-500 font-bold">Needs Confirmation</span>}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-5 border-t border-gray-200 bg-gray-50 space-y-4">
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between items-center bg-white p-3 border rounded">
                      <Label>TDS on Salary (As per 26AS)</Label>
                      <Input type="number" value={tdsSalary} onChange={e => setTdsSalary(Number(e.target.value))} className="w-48 font-mono text-right" />
                    </div>
                    <div className="flex justify-between items-center bg-white p-3 border rounded">
                      <Label>Advance Tax / Self Assessment Tax</Label>
                      <Input type="number" value={advanceTax} onChange={e => setAdvanceTax(Number(e.target.value))} className="w-48 font-mono text-right" />
                    </div>
                  </div>
                  <div className="pt-4 flex justify-end">
                    <button onClick={() => toggleConfirm('taxesPaid')} className="bg-gov-blue text-white px-4 py-2 rounded text-sm font-semibold">{confirmedSections.taxesPaid ? "Edit" : "Confirm"}</button>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* 5. Total Tax Liability */}
              <AccordionItem value="liability" className="border rounded-md shadow-sm bg-white overflow-hidden">
                <AccordionTrigger className="px-5 py-4 hover:bg-gray-50 hover:no-underline">
                  <div className="flex flex-1 items-center justify-between pr-4">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="h-8 w-8 text-gov-blue" />
                      <div className="text-left">
                        <p className="font-bold text-gov-blue text-base">Total Tax Liability</p>
                        <p className="text-sm font-mono text-gray-600 font-bold">₹ {totalTaxLiability.toLocaleString("en-IN")}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {confirmedSections.liability ? <span className="text-xs bg-green-100 text-green-800 font-bold px-2 py-1 rounded">CONFIRMED</span> : <span className="text-xs text-red-500 font-bold">Needs Confirmation</span>}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-5 border-t border-gray-200 bg-gray-50">
                  <div className="bg-white border rounded p-4 text-sm font-mono space-y-2">
                    <div className="flex justify-between"><span>Gross Total Income</span><span>₹ {grossIncome.toLocaleString("en-IN")}</span></div>
                    <div className="flex justify-between text-gov-red"><span>Less: Deductions</span><span>- ₹ {totalDeductions.toLocaleString("en-IN")}</span></div>
                    <div className="flex justify-between border-t border-b py-2 my-2 font-bold text-gov-blue"><span>Taxable Income</span><span>₹ {taxableIncome.toLocaleString("en-IN")}</span></div>
                    <div className="flex justify-between"><span>Total Tax Liability</span><span>₹ {totalTaxLiability.toLocaleString("en-IN")}</span></div>
                    <div className="flex justify-between text-gov-green"><span>Less: Tax Paid</span><span>- ₹ {(Number(tdsSalary) + Number(advanceTax)).toLocaleString("en-IN")}</span></div>
                  </div>
                  <div className="mt-4 p-4 text-center border-2 border-dashed bg-white">
                    {netDueRefund <= 0 ? (
                      <p className="text-lg font-bold text-gov-green">You are eligible for a refund of ₹ {Math.abs(netDueRefund).toLocaleString("en-IN")}</p>
                    ) : (
                      <p className="text-lg font-bold text-gov-red">You have a tax demand of ₹ {netDueRefund.toLocaleString("en-IN")}</p>
                    )}
                  </div>
                  <div className="pt-4 flex justify-end">
                    <button onClick={() => toggleConfirm('liability')} className="bg-gov-blue text-white px-4 py-2 rounded text-sm font-semibold">{confirmedSections.liability ? "Edit" : "Confirm"}</button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="flex justify-end pt-6 border-t mt-6">
              <button 
                disabled={!allConfirmed} 
                onClick={() => setStep("verification")}
                className="bg-gov-orange text-white px-8 py-3 rounded-md font-bold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Proceed to Verification
              </button>
            </div>
          </div>
        )}

        {/* Step 6: Verification */}
        {step === "verification" && (
          <div className="space-y-6">
            <h2 className="font-bold text-xl text-gov-blue border-b pb-2">e-Verify Return</h2>
            <div className="bg-blue-50 border border-blue-200 p-6 rounded text-center space-y-4">
              <ShieldCheck className="h-12 w-12 text-gov-blue mx-auto" />
              <p className="text-sm">An Aadhaar OTP has been sent to your registered mobile number ending in <b>XXXXXX1234</b>.</p>
              <div className="flex justify-center items-center gap-2">
                <Input 
                  placeholder="Enter 6-digit OTP" 
                  className="w-48 text-center font-mono text-lg tracking-widest" 
                  maxLength={6}
                  value={otpCode}
                  onChange={(e) => {
                    const val = e.target.value;
                    setOtpCode(val);
                    if (val.length === 6) {
                      if (val === expectedOtp) {
                        setVerificationSuccess(true);
                        setOtpError("");
                      } else {
                        setVerificationSuccess(false);
                        setOtpError("Invalid OTP entered.");
                      }
                    } else {
                      setVerificationSuccess(false);
                      setOtpError("");
                    }
                  }}
                />
              </div>
              {verificationSuccess && <p className="text-gov-green font-bold text-sm">OTP Verified Successfully!</p>}
              {otpError && <p className="text-gov-red font-bold text-sm">{otpError}</p>}
            </div>
            <div className="flex justify-between">
              <button onClick={() => setStep("summary")} className="border border-gov-blue text-gov-blue px-6 py-2 rounded font-semibold">Back</button>
              <button 
                onClick={handleSubmit} 
                disabled={!verificationSuccess || isSubmitting}
                className="bg-gov-green text-white px-8 py-2 rounded font-bold hover:bg-green-700 disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit Return"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
