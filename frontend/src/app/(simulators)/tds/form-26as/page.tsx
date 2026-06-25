"use client";

import React, { useState } from "react";
import { Search, Download, FileText, CheckCircle } from "lucide-react";

export default function Form26ASPage() {
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-4 mb-4">
        <h2 className="text-xl font-bold text-[#1f497d]">View Tax Credit (Form 26AS)</h2>
        <p className="text-sm text-gray-500">Annual Tax Statement under Section 203AA</p>
      </div>

      <div className="bg-[#f4f8fb] border border-[#b9c9dc] rounded p-6">
        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-xs font-bold text-[#1f497d] mb-1">Assessment Year</label>
            <select required className="w-full border border-gray-300 rounded p-2 text-sm focus:border-gov-blue outline-none">
              <option value="2024-25">2024-25</option>
              <option value="2023-24">2023-24</option>
              <option value="2022-23">2022-23</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-[#1f497d] mb-1">View As</label>
            <select className="w-full border border-gray-300 rounded p-2 text-sm focus:border-gov-blue outline-none">
              <option value="HTML">HTML</option>
              <option value="Text">Text</option>
            </select>
          </div>
          <div className="flex gap-2 md:col-span-2">
            <button type="submit" className="bg-[#1f497d] text-white px-4 py-2 text-sm font-bold rounded hover:bg-[#32629e] transition flex items-center gap-2">
              <Search className="h-4 w-4" /> View / Download
            </button>
            <button type="button" onClick={() => setSearched(false)} className="bg-gray-200 text-gray-700 px-4 py-2 text-sm font-bold rounded hover:bg-gray-300 transition">
              Reset
            </button>
          </div>
        </form>
      </div>

      {searched && (
        <div className="bg-white border border-gray-200 rounded shadow-sm animate-in fade-in">
          <div className="bg-[#1f497d] text-white p-3 font-bold text-sm flex justify-between items-center">
            <span>PART A - Details of Tax Deducted at Source</span>
            <button className="bg-white text-[#1f497d] px-3 py-1 text-xs rounded font-bold hover:bg-gray-100 flex items-center gap-1">
              <Download className="h-3 w-3" /> Export to PDF
            </button>
          </div>
          <div className="overflow-x-auto p-4">
            <table className="w-full text-sm border-collapse border border-gray-200">
              <thead className="bg-[#f4f8fb] text-[#1f497d]">
                <tr>
                  <th className="border p-2 text-left">Sr. No.</th>
                  <th className="border p-2 text-left">Name of Deductor</th>
                  <th className="border p-2 text-left">TAN of Deductor</th>
                  <th className="border p-2 text-right">Total Amount Paid / Credited (₹)</th>
                  <th className="border p-2 text-right">Total Tax Deducted (₹)</th>
                  <th className="border p-2 text-right">Total Tax Deposited (₹)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="border p-2">1</td>
                  <td className="border p-2 font-semibold">INFOSYS LIMITED</td>
                  <td className="border p-2">BLRI00000A</td>
                  <td className="border p-2 text-right">15,00,000.00</td>
                  <td className="border p-2 text-right">1,50,000.00</td>
                  <td className="border p-2 text-right text-green-600 font-bold">1,50,000.00</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border p-2">2</td>
                  <td className="border p-2 font-semibold">STATE BANK OF INDIA</td>
                  <td className="border p-2">MUMS00000B</td>
                  <td className="border p-2 text-right">45,000.00</td>
                  <td className="border p-2 text-right">4,500.00</td>
                  <td className="border p-2 text-right text-green-600 font-bold">4,500.00</td>
                </tr>
                <tr className="bg-[#f4f8fb] font-bold text-[#1f497d]">
                  <td className="border p-2 text-right" colSpan={3}>Total</td>
                  <td className="border p-2 text-right">15,45,000.00</td>
                  <td className="border p-2 text-right">1,54,500.00</td>
                  <td className="border p-2 text-right">1,54,500.00</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t bg-green-50 text-green-800 text-sm flex items-start gap-2">
            <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <p><strong>Verification Status:</strong> The tax deposited by deductors matches the deductions claimed. No further action is required for these entries.</p>
          </div>
        </div>
      )}
    </div>
  );
}
