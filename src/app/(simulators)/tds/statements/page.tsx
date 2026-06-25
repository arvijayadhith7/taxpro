"use client";

import React from "react";
import { FileText, Search } from "lucide-react";

export default function TDSStatementsPage() {
  const statements = [
    { form: "24Q", fy: "2025-26", qtr: "Q4", status: "Processed", date: "15-May-2026", token: "1234567890" },
    { form: "26Q", fy: "2025-26", qtr: "Q4", status: "Processed", date: "12-May-2026", token: "0987654321" },
    { form: "24Q", fy: "2025-26", qtr: "Q3", status: "Processed", date: "15-Feb-2026", token: "4567890123" },
    { form: "26Q", fy: "2025-26", qtr: "Q3", status: "Processed", date: "10-Feb-2026", token: "7890123456" },
  ];

  return (
    <div className="space-y-4 text-xs">
      <div className="border-b pb-2 mb-4">
        <h2 className="text-[#1f497d] font-bold text-lg">Filing Statements</h2>
        <p className="text-gray-600">Track and view history of submitted TDS/TCS statements.</p>
      </div>

      <div className="bg-white border border-[#b9c9dc] rounded-sm p-4">
        <div className="flex gap-4 items-end mb-4 bg-slate-50 p-3 border border-gray-200">
          <div>
            <label className="font-bold text-gray-700 block mb-1">Financial Year</label>
            <select className="border border-gray-300 p-1 bg-white rounded-sm w-36">
              <option>2025-26</option>
              <option>2024-25</option>
            </select>
          </div>
          <div>
            <label className="font-bold text-gray-700 block mb-1">Quarter</label>
            <select className="border border-gray-300 p-1 bg-white rounded-sm w-36">
              <option>All Quarters</option>
              <option>Q1</option>
              <option>Q2</option>
              <option>Q3</option>
              <option>Q4</option>
            </select>
          </div>
          <button className="bg-[#1f497d] text-white px-4 py-1.5 font-bold rounded-sm flex items-center gap-1 hover:bg-[#32629e]">
            <Search className="h-3.5 w-3.5" /> Search
          </button>
        </div>

        <table className="w-full border-collapse border border-gray-200 text-left">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200 text-[#1f497d]">
              <th className="p-2 font-bold border-r">Form Type</th>
              <th className="p-2 font-bold border-r">Financial Year</th>
              <th className="p-2 font-bold border-r">Quarter</th>
              <th className="p-2 font-bold border-r">Date of Filing</th>
              <th className="p-2 font-bold border-r">Status</th>
              <th className="p-2 font-bold">Token/Receipt Number</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {statements.map((s, idx) => (
              <tr key={idx} className="hover:bg-slate-50">
                <td className="p-2 border-r font-bold">{s.form}</td>
                <td className="p-2 border-r">{s.fy}</td>
                <td className="p-2 border-r">{s.qtr}</td>
                <td className="p-2 border-r">{s.date}</td>
                <td className="p-2 border-r text-green-600 font-bold">{s.status}</td>
                <td className="p-2 font-mono font-bold">{s.token}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
