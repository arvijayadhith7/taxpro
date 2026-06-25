"use client";

import React from "react";
import { Mail, AlertCircle } from "lucide-react";

export default function TDSCommunicationsPage() {
  const letters = [
    { id: "COM-001", subject: "Intimation u/s 200A for Form 26Q - FY 2024-25 Q3", date: "10-Jun-2026", type: "Notice", status: "Pending Response" },
    { id: "COM-002", subject: "Prior Intimation of Defaults - Form 24Q Q4", date: "15-May-2026", type: "Alert", status: "Read" },
    { id: "COM-003", subject: "Verification of PAN Errors in Statement Filing", date: "02-Apr-2026", type: "Letter", status: "Resolved" },
  ];

  return (
    <div className="space-y-4 text-xs">
      <div className="border-b pb-2 mb-4">
        <h2 className="text-[#1f497d] font-bold text-lg">Communications & Inbox</h2>
        <p className="text-gray-600">Official letters, notices, and demands sent to your TAN account.</p>
      </div>

      <div className="bg-white border border-[#b9c9dc] rounded-sm p-4">
        <div className="space-y-3">
          {letters.map((l) => (
            <div key={l.id} className="border border-gray-200 rounded p-3 flex justify-between items-start hover:bg-slate-50 cursor-pointer">
              <div className="flex gap-3">
                <div className={`p-2 rounded-full ${l.status === 'Pending Response' ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-600'}`}>
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-[13px]">{l.subject}</h4>
                  <p className="text-gray-500 mt-1">Reference ID: {l.id} | Date: {l.date} | Type: {l.type}</p>
                </div>
              </div>
              <div>
                <span className={`px-2.5 py-1 rounded font-bold text-[10px] ${
                  l.status === 'Pending Response' ? 'bg-red-100 text-red-700' :
                  l.status === 'Read' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                }`}>
                  {l.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
