"use client";

import React from "react";
import { Download } from "lucide-react";

export default function GSTDownloadsPage() {
  const utilities = [
    { title: "GSTR-1 Offline Utility", size: "18.4 MB", date: "12-May-2026" },
    { title: "GSTR-3B Offline Utility", size: "10.2 MB", date: "15-Apr-2026" },
    { title: "GST E-Way Bill Offline Tool", size: "5.6 MB", date: "01-Jan-2026" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="border-b pb-2">
        <h2 className="text-xl font-bold text-gray-800">GST Downloads</h2>
        <p className="text-sm text-gray-500">Offline utilities for returns filing and billing systems.</p>
      </div>

      <div className="bg-white border rounded-md shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b font-bold text-gray-700">
              <th className="p-3">Utility Name</th>
              <th className="p-3">File Size</th>
              <th className="p-3">Release Date</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {utilities.map((ut, idx) => (
              <tr key={idx} className="hover:bg-slate-50">
                <td className="p-3 font-semibold text-gray-800">{ut.title}</td>
                <td className="p-3 font-mono">{ut.size}</td>
                <td className="p-3">{ut.date}</td>
                <td className="p-3 text-center">
                  <button className="bg-gov-blue text-white px-3 py-1 text-xs font-bold rounded hover:bg-blue-800 inline-flex items-center gap-1">
                    <Download className="h-3 w-3" /> Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
