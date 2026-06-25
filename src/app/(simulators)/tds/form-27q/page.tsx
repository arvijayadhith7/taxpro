"use client";

import React from "react";
import { FileText } from "lucide-react";
import { StatusBadge } from "@/components/gov/StatusBadge";

export default function Form27QPage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gov-blue font-display">Form 27Q (Non-Resident Payments TDS)</h1>
          <p className="text-sm text-text-muted mt-1">TAN: DELA12345B | Assessment Year 2026-27</p>
        </div>
        <button className="bg-gov-blue text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gov-blue-light transition-colors flex items-center gap-2">
          <FileText className="h-4 w-4" /> File New Statement
        </button>
      </div>

      <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border bg-surface flex justify-between items-center">
          <h2 className="text-lg font-bold text-gov-blue">Filed Statements - Foreign/Non-Resident Payments</h2>
        </div>
        
        <div className="divide-y divide-border">
          {[
            { qtr: "Q1", receipt: "PRN-27Q-101", date: "15-Jul-2025", type: "Regular", status: "Processed" },
            { qtr: "Q2", receipt: "PRN-27Q-102", date: "15-Oct-2025", type: "Regular", status: "Processed" },
            { qtr: "Q3", receipt: "-", date: "-", type: "-", status: "Pending" },
            { qtr: "Q4", receipt: "-", date: "-", type: "-", status: "Pending" },
          ].map((item, idx) => (
            <div key={idx} className="p-5 flex flex-col md:flex-row justify-between gap-4 hover:bg-slate-50 transition-colors">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-16 h-16 bg-gov-blue-pale text-gov-blue rounded flex items-center justify-center font-bold text-xl border border-blue-200">
                  {item.qtr}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-text">Quarter {item.qtr.replace('Q', '')}</span>
                    <span className="text-xs bg-surface border border-border px-2 py-0.5 rounded text-text-muted">
                      {item.type}
                    </span>
                  </div>
                  <p className="text-sm text-text-muted">PRN: {item.receipt} | Filed on: {item.date}</p>
                  <StatusBadge status={item.status} className="mt-1" />
                </div>
              </div>
              
              <div className="flex items-center gap-3 self-start md:self-center">
                {item.status !== "Pending" ? (
                  <>
                    <button className="text-sm text-gov-blue hover:underline font-medium">Download Receipt</button>
                    <button className="text-sm text-gov-blue hover:underline font-medium">View Foreign Remittances</button>
                  </>
                ) : (
                  <button className="text-sm text-gov-blue hover:underline font-medium font-bold">Prepare Online</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
