"use client";

import React, { useState } from "react";
import { FileText, Download, Plus, Trash2, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface Deductee {
  pan: string;
  name: string;
  grossAmount: number;
  tdsAmount: number;
  section: string;
}

export default function Form24QPage() {
  const [view, setView] = useState<"dashboard" | "prepare">("dashboard");
  const [step, setStep] = useState<number>(1);
  const [deductees, setDeductees] = useState<Deductee[]>([]);
  
  // Deductee Form state
  const [pan, setPan] = useState("");
  const [name, setName] = useState("");
  const [grossAmount, setGrossAmount] = useState("");
  const [tdsAmount, setTdsAmount] = useState("");
  const [section, setSection] = useState("192");

  // Statement Metadata
  const [tan] = useState("DELA12345B");
  const [fy] = useState("2025-26");
  const [qtr] = useState("Q4");

  const handleAddDeductee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pan || !name || !grossAmount || !tdsAmount) {
      alert("Please fill all deductee fields.");
      return;
    }

    const newDeductee: Deductee = {
      pan: pan.toUpperCase(),
      name,
      grossAmount: Number(grossAmount),
      tdsAmount: Number(tdsAmount),
      section
    };

    setDeductees([...deductees, newDeductee]);
    setPan("");
    setName("");
    setGrossAmount("");
    setTdsAmount("");
    alert("Deductee record added successfully!");
  };

  const handleDeleteDeductee = (idx: number) => {
    setDeductees(deductees.filter((_, i) => i !== idx));
  };

  const totalGross = deductees.reduce((acc, c) => acc + c.grossAmount, 0);
  const totalTds = deductees.reduce((acc, c) => acc + c.tdsAmount, 0);

  const [filedStatements, setFiledStatements] = useState([
    { qtr: "Q1", receipt: "PRN-12345", date: "15-Jul-2025", type: "Regular", status: "Processed" },
    { qtr: "Q2", receipt: "PRN-67890", date: "15-Oct-2025", type: "Regular", status: "Processed with Defaults" },
    { qtr: "Q3", receipt: "PRN-54321", date: "15-Jan-2026", type: "Correction", status: "Processed" },
    { qtr: "Q4", receipt: "-", date: "-", type: "-", status: "Pending" },
  ]);

  const handleFileReturn = () => {
    alert(`Form 24Q Statement for ${fy} ${qtr} filed successfully!\nPRN Receipt Number: PRN-${Math.floor(10000 + Math.random() * 90000)}`);
    setFiledStatements(prev => 
      prev.map(s => s.qtr === "Q4" ? { qtr: "Q4", receipt: "PRN-99887", date: new Date().toLocaleDateString("en-IN"), type: "Regular", status: "Processed" } : s)
    );
    setView("dashboard");
    setDeductees([]);
    setStep(1);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto text-xs">
      
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 border-b">
        <div className="flex items-center gap-3">
          {view === "prepare" && (
            <button onClick={() => setView("dashboard")} className="text-[#1f497d] hover:bg-slate-100 p-1.5 rounded-full transition">
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}
          <div>
            <h1 className="text-lg font-bold text-[#1f497d]">
              {view === "prepare" ? `Prepare Form 24Q Statement - ${qtr}` : "Form 24Q (Salary TDS Returns)"}
            </h1>
            <p className="text-gray-500">TAN: {tan} | Assessment Year: 2026-27</p>
          </div>
        </div>
        {view === "dashboard" && (
          <button 
            onClick={() => setView("prepare")}
            className="bg-[#1f497d] text-white px-4 py-2 font-bold hover:bg-[#32629e] flex items-center gap-2"
          >
            <FileText className="h-4 w-4" /> File New Statement (Q4)
          </button>
        )}
      </div>

      {view === "dashboard" ? (
        /* Dashboard / History View */
        <div className="bg-white rounded border border-[#b9c9dc] overflow-hidden">
          <div className="p-3 bg-[#d2e0f0] border-b border-[#b9c9dc]">
            <h2 className="font-bold text-[#1f497d]">Filing History</h2>
          </div>
          <div className="divide-y">
            {filedStatements.map((item, idx) => (
              <div key={idx} className="p-4 flex justify-between items-center hover:bg-slate-50">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-gov-blue rounded flex items-center justify-center font-bold text-lg border">
                    {item.qtr}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">Quarter {item.qtr.replace('Q', '')} Return</h3>
                    <p className="text-gray-500">PRN: {item.receipt} | Date: {item.date} | Type: {item.type}</p>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold inline-block mt-1 ${
                      item.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
                <div>
                  {item.status === "Pending" ? (
                    <button 
                      onClick={() => setView("prepare")}
                      className="bg-gov-blue text-white px-4 py-1.5 font-bold hover:bg-blue-800"
                    >
                      Prepare Online
                    </button>
                  ) : (
                    <span className="text-gray-400 font-bold">Filing Completed</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Form 24Q Return Preparation Wizard */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Progress / Sidebar */}
          <div className="bg-white border rounded p-4 h-fit space-y-3">
            <h3 className="font-bold text-[#1f497d] border-b pb-2">Steps</h3>
            <ul className="space-y-3">
              <li className={`flex gap-2 items-center ${step === 1 ? 'font-bold text-[#1f497d]' : 'text-gray-500'}`}>
                <div className={`h-5 w-5 rounded-full flex items-center justify-center border font-semibold ${step === 1 ? 'bg-blue-50 border-gov-blue text-gov-blue' : ''}`}>1</div>
                <span>Deductor details</span>
              </li>
              <li className={`flex gap-2 items-center ${step === 2 ? 'font-bold text-[#1f497d]' : 'text-gray-500'}`}>
                <div className={`h-5 w-5 rounded-full flex items-center justify-center border font-semibold ${step === 2 ? 'bg-blue-50 border-gov-blue text-gov-blue' : ''}`}>2</div>
                <span>Deductee (Annexure I)</span>
              </li>
              <li className={`flex gap-2 items-center ${step === 3 ? 'font-bold text-[#1f497d]' : 'text-gray-500'}`}>
                <div className={`h-5 w-5 rounded-full flex items-center justify-center border font-semibold ${step === 3 ? 'bg-blue-50 border-gov-blue text-gov-blue' : ''}`}>3</div>
                <span>Review & File</span>
              </li>
            </ul>
          </div>

          {/* Wizard Content */}
          <div className="lg:col-span-2 bg-white border rounded p-5 space-y-6">
            
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="font-bold text-[#1f497d] border-b pb-2 text-sm">Deductor Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>TAN of Deductor</Label>
                    <Input value={tan} readOnly className="bg-slate-50 uppercase font-semibold" />
                  </div>
                  <div>
                    <Label>PAN of Deductor</Label>
                    <Input value="DELA12345B" readOnly className="bg-slate-50 uppercase font-semibold" />
                  </div>
                  <div className="col-span-2">
                    <Label>Employer Name</Label>
                    <Input value="ACADEMY TRADERS" readOnly className="bg-slate-50" />
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <button onClick={() => setStep(2)} className="bg-[#1f497d] text-white px-6 py-2 font-bold hover:bg-[#32629e]">
                    Next Step
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h3 className="font-bold text-[#1f497d] border-b pb-2 text-sm">Salary Details & TDS Annexure</h3>
                
                {/* Annexure Form */}
                <form onSubmit={handleAddDeductee} className="bg-slate-50 border p-4 rounded space-y-3">
                  <h4 className="font-bold text-gray-800">Add Employee Record</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Employee PAN *</Label>
                      <Input 
                        placeholder="e.g. ABCDE1234F" 
                        value={pan} 
                        onChange={e => setPan(e.target.value.toUpperCase())}
                        maxLength={10} 
                        className="uppercase"
                      />
                    </div>
                    <div>
                      <Label>Employee Name *</Label>
                      <Input 
                        placeholder="e.g. Rahul Sharma" 
                        value={name} 
                        onChange={e => setName(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Gross Salary Credited (₹) *</Label>
                      <Input 
                        type="number"
                        placeholder="e.g. 75000" 
                        value={grossAmount} 
                        onChange={e => setGrossAmount(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label>Tax Deducted (₹) *</Label>
                      <Input 
                        type="number"
                        placeholder="e.g. 5000" 
                        value={tdsAmount} 
                        onChange={e => setTdsAmount(e.target.value)}
                      />
                    </div>
                  </div>
                  <button type="submit" className="bg-gov-blue text-white px-4 py-2 font-bold rounded flex items-center gap-1 hover:bg-blue-800">
                    <Plus className="h-4 w-4" /> Save Record
                  </button>
                </form>

                {/* Deductees Table */}
                <div className="space-y-2">
                  <h4 className="font-bold text-gray-800">Employee List</h4>
                  {deductees.length === 0 ? (
                    <p className="text-gray-500 italic">No employees added yet.</p>
                  ) : (
                    <table className="w-full text-xs text-left border">
                      <thead>
                        <tr className="bg-gray-100 border-b">
                          <th className="p-2">PAN</th>
                          <th className="p-2">Name</th>
                          <th className="p-2 text-right">Gross Salary (₹)</th>
                          <th className="p-2 text-right">TDS (₹)</th>
                          <th className="p-2 text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {deductees.map((d, idx) => (
                          <tr key={idx}>
                            <td className="p-2 font-mono font-bold">{d.pan}</td>
                            <td className="p-2 font-semibold">{d.name}</td>
                            <td className="p-2 text-right font-mono">{d.grossAmount.toLocaleString("en-IN")}</td>
                            <td className="p-2 text-right font-mono text-gov-red font-bold">{d.tdsAmount.toLocaleString("en-IN")}</td>
                            <td className="p-2 text-center">
                              <button onClick={() => handleDeleteDeductee(idx)} className="text-red-500 hover:text-red-700">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>

                <div className="flex justify-between pt-4 border-t">
                  <button onClick={() => setStep(1)} className="border border-gray-300 text-gray-700 px-6 py-2 font-bold hover:bg-gray-50">Back</button>
                  <button onClick={() => setStep(3)} className="bg-[#1f497d] text-white px-6 py-2 font-bold hover:bg-[#32629e]">Next Step</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="font-bold text-[#1f497d] border-b pb-2 text-sm">Verify Return Statement</h3>
                <div className="border p-4 bg-gray-50 space-y-2 rounded">
                  <div className="flex justify-between font-semibold"><span>Quarter</span><span>{qtr}</span></div>
                  <div className="flex justify-between font-semibold"><span>Total Employees Reported</span><span>{deductees.length}</span></div>
                  <div className="flex justify-between font-semibold"><span>Total Gross Salary Credited</span><span>₹ {totalGross.toLocaleString("en-IN")}</span></div>
                  <div className="flex justify-between font-bold text-gov-blue border-t pt-2 mt-2"><span>Total TDS Liability</span><span>₹ {totalTds.toLocaleString("en-IN")}</span></div>
                </div>

                <div className="flex justify-between pt-4 border-t">
                  <button onClick={() => setStep(2)} className="border border-gray-300 text-gray-700 px-6 py-2 font-bold hover:bg-gray-50">Back</button>
                  <button onClick={handleFileReturn} className="bg-gov-green text-white px-8 py-2 font-bold hover:bg-green-700 flex items-center gap-1">
                    File Statement
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
}
