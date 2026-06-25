"use client";

import React from "react";
import { Check, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RefundTrackerPage() {
  const steps = [
    { id: 1, title: "Return Filed", date: "15-Jul-2025", status: "completed" },
    { id: 2, title: "Return Verified", date: "16-Jul-2025", status: "completed" },
    { id: 3, title: "Processing Completed", date: "12-Aug-2025", status: "completed" },
    { id: 4, title: "Refund Determined", date: "12-Aug-2025", amount: "₹ 12,500", status: "completed" },
    { id: 5, title: "Refund Sent to Banker", date: "18-Aug-2025", status: "current" },
    { id: 6, title: "Refund Credited", date: "Expected by 25-Aug-2025", status: "upcoming" },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gov-blue font-display">Refund Status</h1>
        <p className="text-sm text-text-muted mt-1">Track your Income Tax Refund for AY 2025-26</p>
      </div>

      <div className="bg-white rounded-lg border border-border shadow-sm p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 p-4 bg-surface rounded-md border border-border">
          <div>
            <p className="text-xs text-text-muted mb-1">PAN</p>
            <p className="text-sm font-semibold">ABCDE1234F</p>
          </div>
          <div>
            <p className="text-xs text-text-muted mb-1">Assessment Year</p>
            <p className="text-sm font-semibold">2025-26</p>
          </div>
          <div>
            <p className="text-xs text-text-muted mb-1">Mode of Payment</p>
            <p className="text-sm font-semibold">Direct Credit (NECS)</p>
          </div>
          <div>
            <p className="text-xs text-text-muted mb-1">Account Mask</p>
            <p className="text-sm font-semibold">XXXXXX7890</p>
          </div>
        </div>

        <div className="relative pl-4 sm:pl-8 py-4">
          <div className="absolute left-[27px] sm:left-[43px] top-4 bottom-4 w-0.5 bg-border"></div>
          
          <div className="space-y-8 relative">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-start gap-4 sm:gap-6">
                <div className={cn(
                  "relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 bg-white",
                  step.status === "completed" ? "border-gov-green text-gov-green" : 
                  step.status === "current" ? "border-gov-blue text-gov-blue" : 
                  "border-border text-text-muted"
                )}>
                  {step.status === "completed" ? (
                    <Check className="h-4 w-4" />
                  ) : step.status === "current" ? (
                    <Clock className="h-4 w-4 animate-pulse" />
                  ) : (
                    <span className="h-2 w-2 rounded-full bg-border" />
                  )}
                </div>
                <div className="flex flex-col pt-1.5">
                  <h3 className={cn(
                    "text-sm font-bold",
                    step.status === "completed" ? "text-text" : 
                    step.status === "current" ? "text-gov-blue" : 
                    "text-text-muted"
                  )}>
                    {step.title}
                  </h3>
                  <p className="text-xs text-text-muted mt-1">{step.date}</p>
                  {step.amount && (
                    <p className="text-sm font-semibold text-gov-green mt-1">{step.amount}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-gov-yellow/90">
          <strong>Note:</strong> Refund is typically credited within 7-10 working days after it is sent to the banker. Please ensure your bank account is pre-validated.
        </div>
      </div>
    </div>
  );
}
