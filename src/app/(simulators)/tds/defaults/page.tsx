"use client";

import React from "react";
import { AlertCircle, Download, FileText } from "lucide-react";

export default function TDSDefaultsPage() {
  return (
    <div className="space-y-4 text-xs">
      <div className="border-b pb-2 mb-4">
        <h2 className="text-[#1f497d] font-bold text-lg">Outstanding Defaults</h2>
        <p className="text-gray-600">Track and pay short payments, short deductions, and interest demands.</p>
      </div>

      <div className="bg-white border border-[#b9c9dc] rounded-sm p-4 space-y-4">
        <div className="bg-yellow-50 border border-yellow-200 p-3 rounded flex gap-2">
          <AlertCircle className="h-4 w-4 text-yellow-600 flex-shrink-0" />
          <p className="text-yellow-800">
            <strong>Default Notice u/s 200A:</strong> A short deduction of <strong>₹ 1,250.00</strong> was identified for Form 26Q in FY 2024-25 Q3. Interest u/s 201(1A) has been computed.
          </p>
        </div>

        <table className="w-full border-collapse border border-gray-200 text-left">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200 text-[#1f497d]">
              <th className="p-2 font-bold border-r">F.Y. / Quarter</th>
              <th className="p-2 font-bold border-r">Form</th>
              <th className="p-2 font-bold border-r">Short Deduction (₹)</th>
              <th className="p-2 font-bold border-r">Interest / Fees (₹)</th>
              <th className="p-2 font-bold border-r">Total Outstanding (₹)</th>
              <th className="p-2 font-bold text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-slate-50">
              <td className="p-2 border-r font-bold">2024-25 / Q3</td>
              <td className="p-2 border-r font-bold">26Q</td>
              <td className="p-2 border-r">1,000.00</td>
              <td className="p-2 border-r">250.00</td>
              <td className="p-2 border-r font-bold text-red-600">1,250.00</td>
              <td className="p-2 text-center flex justify-center gap-2">
                <button className="bg-gov-blue text-white px-2 py-1 font-bold rounded-sm hover:bg-blue-800">
                  Pay Now
                </button>
                <button className="border border-gray-300 text-gray-700 px-2 py-1 font-bold rounded-sm hover:bg-gray-100 flex items-center gap-1">
                  <Download className="h-3 w-3" /> Justification
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
