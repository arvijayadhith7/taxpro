"use client";

import React, { useState } from "react";
import { Download, Search } from "lucide-react";

export default function TDSDownloadsPage() {
  const [downloadRequests, setDownloadRequests] = useState([
    { reqId: "REQ9876543", type: "Conso File - Form 24Q Q4", date: "22-Jun-2026", status: "Available", size: "1.4 MB" },
    { reqId: "REQ9876500", type: "Justification Report - Form 26Q Q3", date: "20-Jun-2026", status: "Available", size: "850 KB" },
    { reqId: "REQ9876123", type: "Form 16A PDF Utility", date: "15-May-2026", status: "Expired", size: "N/A" },
  ]);

  return (
    <div className="space-y-4 text-xs">
      <div className="border-b pb-2 mb-4">
        <h2 className="text-[#1f497d] font-bold text-lg">Requested Downloads</h2>
        <p className="text-gray-600">Download consolidated statements, justification reports, and PDF utilities.</p>
      </div>

      <div className="bg-white border border-[#b9c9dc] rounded-sm p-4">
        <div className="mb-4 bg-slate-50 border p-3">
          <h3 className="font-bold text-[#1f497d] mb-2">Request a New Download</h3>
          <div className="flex gap-4 items-end">
            <div>
              <label className="font-bold text-gray-700 block mb-1">Download Type</label>
              <select className="border border-gray-300 p-1 bg-white rounded-sm w-48">
                <option>Consolidated Statement (Conso File)</option>
                <option>Justification Report</option>
                <option>Form 16 / 16A Certificate</option>
                <option>PAN NSND Refusal List</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-gray-700 block mb-1">Financial Year</label>
              <select className="border border-gray-300 p-1 bg-white rounded-sm w-28">
                <option>2025-26</option>
                <option>2024-25</option>
              </select>
            </div>
            <button className="bg-[#1f497d] text-white px-4 py-1.5 font-bold rounded-sm hover:bg-[#32629e]">
              Submit Request
            </button>
          </div>
        </div>

        <table className="w-full border-collapse border border-gray-200 text-left">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200 text-[#1f497d]">
              <th className="p-2 font-bold border-r">Request ID</th>
              <th className="p-2 font-bold border-r">File Type / Description</th>
              <th className="p-2 font-bold border-r">Request Date</th>
              <th className="p-2 font-bold border-r">Status</th>
              <th className="p-2 font-bold border-r">File Size</th>
              <th className="p-2 font-bold text-center">Download</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {downloadRequests.map((r, idx) => (
              <tr key={idx} className="hover:bg-slate-50">
                <td className="p-2 border-r font-mono">{r.reqId}</td>
                <td className="p-2 border-r font-semibold">{r.type}</td>
                <td className="p-2 border-r">{r.date}</td>
                <td className="p-2 border-r">
                  <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                    r.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {r.status}
                  </span>
                </td>
                <td className="p-2 border-r font-mono">{r.size}</td>
                <td className="p-2 text-center">
                  {r.status === 'Available' ? (
                    <button className="bg-gov-blue text-white p-1 rounded hover:bg-blue-800 inline-flex items-center justify-center">
                      <Download className="h-3.5 w-3.5" />
                    </button>
                  ) : (
                    <span className="text-gray-400 font-bold">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
