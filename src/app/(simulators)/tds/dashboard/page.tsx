"use client";

import React from "react";
import Link from "next/link";
import { AlertTriangle, FileText, Download, CheckCircle2 } from "lucide-react";

export default function TDSDashboardPage() {
  return (
    <div className="space-y-4">
      <div className="border-b pb-2 mb-4">
        <h2 className="text-[#1f497d] font-bold text-lg">Dashboard</h2>
        <p className="text-xs text-gray-600">Overview of your TDS/TCS statements and defaults.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Defaults Summary */}
        <div className="border border-[#b9c9dc] rounded-sm">
          <div className="bg-[#d2e0f0] text-[#1f497d] font-bold text-xs p-2 border-b border-[#b9c9dc]">
            Summary of Defaults (Current Financial Year)
          </div>
          <div className="p-3 bg-white text-xs">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="p-1.5 text-left font-bold text-[#1f497d] border-r border-gray-200">Nature of Default</th>
                  <th className="p-1.5 text-right font-bold text-[#1f497d]">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="p-1.5 border-r border-gray-200">Short Payment</td>
                  <td className="p-1.5 text-right font-mono font-bold text-gray-500">0.00</td>
                </tr>
                <tr>
                  <td className="p-1.5 border-r border-gray-200">Short Deduction</td>
                  <td className="p-1.5 text-right font-mono font-bold text-gray-500">0.00</td>
                </tr>
                <tr>
                  <td className="p-1.5 border-r border-gray-200">Interest on Late Payment</td>
                  <td className="p-1.5 text-right font-mono font-bold text-gray-500">0.00</td>
                </tr>
                <tr>
                  <td className="p-1.5 border-r border-gray-200">Late Filing Fee (Sec 234E)</td>
                  <td className="p-1.5 text-right font-mono font-bold text-gray-500">0.00</td>
                </tr>
              </tbody>
            </table>
            <div className="mt-2 text-right">
              <Link href="/tds/defaults" className="text-blue-600 hover:underline">View Detailed Justification Report</Link>
            </div>
          </div>
        </div>

        {/* Statement Status */}
        <div className="border border-[#b9c9dc] rounded-sm">
          <div className="bg-[#d2e0f0] text-[#1f497d] font-bold text-xs p-2 border-b border-[#b9c9dc]">
            Statement Status (Last 2 Quarters)
          </div>
          <div className="p-3 bg-white text-xs">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-200">
                  <th className="p-1.5 text-center font-bold text-[#1f497d] border-r">Form</th>
                  <th className="p-1.5 text-center font-bold text-[#1f497d] border-r">FY / Qtr</th>
                  <th className="p-1.5 text-center font-bold text-[#1f497d] border-r">Status</th>
                  <th className="p-1.5 text-center font-bold text-[#1f497d]">Token Number</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-center">
                <tr>
                  <td colSpan={4} className="p-4 text-gray-500 font-semibold">No statements filed recently.</td>
                </tr>
              </tbody>
            </table>
            <div className="mt-2 text-right">
              <Link href="/tds/statements" className="text-blue-600 hover:underline">View All Statements</Link>
            </div>
          </div>
        </div>

        {/* Action Items */}
        <div className="border border-[#b9c9dc] rounded-sm md:col-span-2">
          <div className="bg-[#d2e0f0] text-[#1f497d] font-bold text-xs p-2 border-b border-[#b9c9dc]">
            Pending Actions & Communications
          </div>
          <div className="p-3 bg-white text-xs space-y-2">
            <div className="flex items-start gap-2 bg-yellow-50 p-2 border border-yellow-200 rounded">
              <AlertTriangle className="h-4 w-4 text-orange-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#1f497d]">Notice u/s 200A</span>
                <p className="text-gray-600 mt-1">Intimation has been generated for Form 26Q (FY 2024-25, Q3) regarding short deduction. Please download the justification report and pay the outstanding demand.</p>
              </div>
            </div>
            <div className="flex items-start gap-2 bg-blue-50 p-2 border border-blue-200 rounded">
              <FileText className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#1f497d]">Conso File Available</span>
                <p className="text-gray-600 mt-1">Requested Conso File for Form 24Q (FY 2025-26, Q4) is now available for download. Request No: REQ9876543.</p>
                <button className="mt-1 text-blue-600 hover:underline font-bold flex items-center gap-1"><Download className="h-3 w-3" /> Download Now</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
