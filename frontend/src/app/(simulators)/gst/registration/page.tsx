"use client";

import React from "react";
import { Download, CheckCircle, Shield, FileText } from "lucide-react";
import { StatusBadge } from "@/components/gov/StatusBadge";

export default function GSTRegistrationPage() {
  const regDetails = {
    gstin: "07ABCDE1234F1Z5",
    legalName: "JAYESH KUMAR",
    tradeName: "XYZ ENTERPRISES",
    constitution: "Proprietorship",
    regDate: "12/04/2021",
    status: "Active",
    taxpayerType: "Regular",
    stateJurisdiction: "Ward 82, Delhi",
    centerJurisdiction: "Range 15, Division 2, Delhi North",
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gov-blue font-display">GST Registration Profile</h1>
          <p className="text-sm text-text-muted mt-1">Authorized tax registration credentials</p>
        </div>
        <button className="bg-gov-blue text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gov-blue-light transition-colors flex items-center gap-2">
          <Download className="h-4 w-4" /> Download Reg Certificate (REG-06)
        </button>
      </div>

      {/* Main Reg Card */}
      <div className="bg-white border border-border rounded-lg shadow-sm overflow-hidden">
        <div className="bg-surface border-b border-border px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-gov-blue" />
            <h2 className="font-bold text-gov-blue">Registration Details</h2>
          </div>
          <StatusBadge status={regDetails.status} />
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <p className="text-xs text-text-muted mb-1">GSTIN</p>
            <p className="text-sm font-bold font-mono text-gov-blue">{regDetails.gstin}</p>
          </div>
          <div>
            <p className="text-xs text-text-muted mb-1">Legal Name of Business</p>
            <p className="text-sm font-semibold">{regDetails.legalName}</p>
          </div>
          <div>
            <p className="text-xs text-text-muted mb-1">Trade Name</p>
            <p className="text-sm font-semibold">{regDetails.tradeName}</p>
          </div>
          <div>
            <p className="text-xs text-text-muted mb-1">Constitution of Business</p>
            <p className="text-sm font-semibold">{regDetails.constitution}</p>
          </div>
          <div>
            <p className="text-xs text-text-muted mb-1">Date of Registration</p>
            <p className="text-sm font-semibold">{regDetails.regDate}</p>
          </div>
          <div>
            <p className="text-xs text-text-muted mb-1">Taxpayer Type</p>
            <p className="text-sm font-semibold">{regDetails.taxpayerType}</p>
          </div>
          <div>
            <p className="text-xs text-text-muted mb-1">State Jurisdiction</p>
            <p className="text-sm font-semibold">{regDetails.stateJurisdiction}</p>
          </div>
          <div>
            <p className="text-xs text-text-muted mb-1">Central Jurisdiction</p>
            <p className="text-sm font-semibold">{regDetails.centerJurisdiction}</p>
          </div>
        </div>
      </div>

      {/* Jurisdiction Office Map */}
      <div className="bg-white border border-border rounded-lg shadow-sm p-6">
        <h3 className="font-bold text-gov-blue mb-4">Principal Place of Business</h3>
        <p className="text-sm text-text mb-2">123, Vasant Vihar, New Delhi - 110057</p>
        <div className="bg-slate-50 border border-border p-4 rounded text-xs text-text-muted space-y-2 mt-4">
          <p><strong>Contact Details:</strong> jayesh.k****@gmail.com | +91-98765*****8</p>
          <p><strong>Nature of Business Activity:</strong> Retail Business, Software development services</p>
        </div>
      </div>
    </div>
  );
}
