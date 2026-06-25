"use client";

import React from "react";
import { Download, FileSpreadsheet, BarChart2, TrendingUp, DollarSign } from "lucide-react";

export default function ReportsPage() {
  const annualTaxPaid = [
    { year: "AY 2025-26", amount: 145200, percentage: 100 },
    { year: "AY 2024-25", amount: 128400, percentage: 88 },
    { year: "AY 2023-24", amount: 110500, percentage: 76 },
    { year: "AY 2022-23", amount: 95000, percentage: 65 },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gov-blue font-display">Tax Compliance Reports</h1>
          <p className="text-sm text-text-muted mt-1">Historical summaries and analytics of payments and filings</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-border text-gov-blue px-4 py-2 rounded-md text-sm font-medium hover:bg-surface transition-colors flex items-center gap-2">
            <FileSpreadsheet className="h-4 w-4" /> Export Excel
          </button>
          <button className="bg-gov-blue text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gov-blue-light transition-colors flex items-center gap-2">
            <Download className="h-4 w-4" /> Download PDF Report
          </button>
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Trend Bar Chart */}
        <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gov-blue flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-gov-orange" />
              Direct Tax Paid Trend
            </h3>
            <span className="text-xs text-text-muted">Assessment Years</span>
          </div>

          <div className="space-y-4">
            {annualTaxPaid.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-text">{item.year}</span>
                  <span className="font-bold text-gov-blue">₹ {item.amount.toLocaleString("en-IN")}</span>
                </div>
                <div className="w-full bg-slate-100 h-6 rounded-md overflow-hidden relative border border-slate-200">
                  <div 
                    className="bg-gradient-to-r from-gov-blue/80 to-gov-blue h-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deductions Breakdown */}
        <div className="bg-white p-6 rounded-lg border border-border shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gov-blue flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-gov-orange" />
              Tax Deducted at Source (TDS) Share
            </h3>
            <span className="text-xs text-text-muted">FY 2025-26</span>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-md transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 bg-gov-blue rounded-full"></div>
                <div>
                  <p className="text-sm font-semibold text-text">Salary TDS (Sec 192)</p>
                  <p className="text-xs text-text-muted">ACME CORP LTD</p>
                </div>
              </div>
              <p className="text-sm font-bold text-text">₹ 1,25,000</p>
            </div>

            <div className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-md transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 bg-gov-orange rounded-full"></div>
                <div>
                  <p className="text-sm font-semibold text-text">Interest Income (Sec 194A)</p>
                  <p className="text-xs text-text-muted">HDFC BANK</p>
                </div>
              </div>
              <p className="text-sm font-bold text-text">₹ 4,500</p>
            </div>

            <div className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-md transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 bg-gov-green rounded-full"></div>
                <div>
                  <p className="text-sm font-semibold text-text">Dividend Income (Sec 194)</p>
                  <p className="text-xs text-text-muted">RELIANCE IND</p>
                </div>
              </div>
              <p className="text-sm font-bold text-text">₹ 1,500</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
