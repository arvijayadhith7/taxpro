"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Save, AlertCircle, CheckCircle2 } from "lucide-react";

export default function CreateChallanPage() {
  const [formData, setFormData] = useState({
    reason: "Monthly Payment",
    cgst: "",
    sgst: "",
    igst: "",
    cess: "",
    penalty: "",
    fee: "",
    others: ""
  });
  const [isGenerated, setIsGenerated] = useState(false);
  const [cpin, setCpin] = useState("");

  const handleGenerate = () => {
    // Generate a random 14-digit CPIN
    const newCpin = Math.floor(10000000000000 + Math.random() * 90000000000000).toString();
    setCpin(newCpin);
    setIsGenerated(true);
  };

  const totalAmount = [
    formData.cgst, formData.sgst, formData.igst, formData.cess, 
    formData.penalty, formData.fee, formData.others
  ].reduce((acc, val) => acc + (parseFloat(val) || 0), 0);

  if (isGenerated) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Link href="/gst/dashboard" className="text-blue-600 hover:text-blue-800">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h2 className="text-xl font-bold text-gray-800">Challan Generated Successfully</h2>
        </div>

        <div className="bg-white border border-green-200 shadow-sm rounded-md overflow-hidden p-8 text-center">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Challan Created</h3>
          <p className="text-gray-600 mb-6">Your Common Portal Identification Number (CPIN) is:</p>
          
          <div className="bg-gray-100 border border-gray-300 p-4 rounded-md inline-block mb-6">
            <span className="text-3xl font-mono font-bold tracking-widest text-[#0f1d3a]">{cpin}</span>
          </div>
          
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <button className="bg-gov-blue text-white px-6 py-2 rounded text-sm font-bold shadow-sm hover:bg-blue-800">
              Download Challan
            </button>
            <button className="bg-white border border-gov-blue text-gov-blue px-6 py-2 rounded text-sm font-bold shadow-sm hover:bg-blue-50">
              Make Payment
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link href="/gst/dashboard" className="text-blue-600 hover:text-blue-800">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h2 className="text-xl font-bold text-gray-800">Create Challan</h2>
        </div>
      </div>

      <div className="bg-white border border-gray-200 shadow-sm rounded-md overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 p-4">
          <h3 className="font-bold text-sm text-[#0f1d3a]">Details of Deposit</h3>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-2">Reason for Challan <span className="text-red-500">*</span></label>
            <select 
              value={formData.reason}
              onChange={(e) => setFormData({...formData, reason: e.target.value})}
              className="w-full md:w-1/2 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="Monthly Payment">Monthly Payment for Quarterly Return</option>
              <option value="Any Other Payment">Any Other Payment</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-[#0f1d3a] text-white">
                  <th className="border border-gray-300 p-2 text-left w-1/4">Major Head</th>
                  <th className="border border-gray-300 p-2 text-center" colSpan={4}>Minor Head (Amount in ₹)</th>
                  <th className="border border-gray-300 p-2 text-right">Total (₹)</th>
                </tr>
                <tr className="bg-gray-100 text-[#0f1d3a] text-xs">
                  <th className="border border-gray-300 p-2"></th>
                  <th className="border border-gray-300 p-2 text-center">Tax</th>
                  <th className="border border-gray-300 p-2 text-center">Interest</th>
                  <th className="border border-gray-300 p-2 text-center">Penalty</th>
                  <th className="border border-gray-300 p-2 text-center">Fee</th>
                  <th className="border border-gray-300 p-2 text-right"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-3 font-semibold">CGST (0005)</td>
                  <td className="border border-gray-300 p-2">
                    <input type="number" value={formData.cgst} onChange={e => setFormData({...formData, cgst: e.target.value})} className="w-full p-1 border rounded text-right" placeholder="0" />
                  </td>
                  <td className="border border-gray-300 p-2"><input type="number" className="w-full p-1 border rounded text-right" placeholder="0" /></td>
                  <td className="border border-gray-300 p-2"><input type="number" className="w-full p-1 border rounded text-right" placeholder="0" /></td>
                  <td className="border border-gray-300 p-2"><input type="number" className="w-full p-1 border rounded text-right" placeholder="0" /></td>
                  <td className="border border-gray-300 p-3 text-right font-mono font-bold bg-gray-50">{formData.cgst || "0.00"}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3 font-semibold">IGST (0008)</td>
                  <td className="border border-gray-300 p-2">
                    <input type="number" value={formData.igst} onChange={e => setFormData({...formData, igst: e.target.value})} className="w-full p-1 border rounded text-right" placeholder="0" />
                  </td>
                  <td className="border border-gray-300 p-2"><input type="number" className="w-full p-1 border rounded text-right" placeholder="0" /></td>
                  <td className="border border-gray-300 p-2"><input type="number" className="w-full p-1 border rounded text-right" placeholder="0" /></td>
                  <td className="border border-gray-300 p-2"><input type="number" className="w-full p-1 border rounded text-right" placeholder="0" /></td>
                  <td className="border border-gray-300 p-3 text-right font-mono font-bold bg-gray-50">{formData.igst || "0.00"}</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-3 font-semibold">SGST/UTGST (0006)</td>
                  <td className="border border-gray-300 p-2">
                    <input type="number" value={formData.sgst} onChange={e => setFormData({...formData, sgst: e.target.value})} className="w-full p-1 border rounded text-right" placeholder="0" />
                  </td>
                  <td className="border border-gray-300 p-2"><input type="number" className="w-full p-1 border rounded text-right" placeholder="0" /></td>
                  <td className="border border-gray-300 p-2"><input type="number" className="w-full p-1 border rounded text-right" placeholder="0" /></td>
                  <td className="border border-gray-300 p-2"><input type="number" className="w-full p-1 border rounded text-right" placeholder="0" /></td>
                  <td className="border border-gray-300 p-3 text-right font-mono font-bold bg-gray-50">{formData.sgst || "0.00"}</td>
                </tr>
                <tr className="bg-blue-50">
                  <td colSpan={5} className="border border-gray-300 p-3 text-right font-bold text-gov-blue">Total Challan Amount:</td>
                  <td className="border border-gray-300 p-3 text-right font-mono font-bold text-lg text-gov-blue">₹ {totalAmount.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex justify-end gap-4">
            <Link href="/gst/dashboard" className="px-6 py-2 border border-gray-300 rounded text-sm font-bold shadow-sm hover:bg-gray-50 text-gray-700">
              CANCEL
            </Link>
            <button 
              onClick={handleGenerate}
              disabled={totalAmount <= 0}
              className={`px-6 py-2 rounded text-sm font-bold shadow-sm ${totalAmount > 0 ? 'bg-gov-blue text-white hover:bg-blue-800' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            >
              GENERATE CHALLAN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
