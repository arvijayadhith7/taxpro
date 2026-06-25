"use client";

import React from "react";
import { User, Shield, MapPin, Building, CreditCard, CheckCircle2 } from "lucide-react";
import { USER_PROFILE } from "@/lib/mockData";

export default function ProfilePage() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gov-blue font-display">My Profile</h1>
        <p className="text-sm text-text-muted mt-1">Manage registration details and banking preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Personal info summary */}
        <div className="lg:col-span-2 space-y-6">
          {/* General details */}
          <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
            <div className="p-4 border-b border-border bg-surface flex items-center gap-2">
              <User className="h-5 w-5 text-gov-blue" />
              <h2 className="font-bold text-gov-blue">Primary Details</h2>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-text-muted mb-1">Full Name</p>
                <p className="text-sm font-semibold">{USER_PROFILE.name}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted mb-1 font-sans">PAN</p>
                <p className="text-sm font-bold font-mono text-gov-blue">{USER_PROFILE.pan}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted mb-1">Aadhaar Number</p>
                <p className="text-sm font-semibold">{USER_PROFILE.aadhaar}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted mb-1">Date of Birth</p>
                <p className="text-sm font-semibold">{USER_PROFILE.dob}</p>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
            <div className="p-4 border-b border-border bg-surface flex items-center gap-2">
              <MapPin className="h-5 w-5 text-gov-blue" />
              <h2 className="font-bold text-gov-blue">Contact Information</h2>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-text-muted mb-1">Email Address</p>
                <p className="text-sm font-semibold">{USER_PROFILE.email}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted mb-1">Mobile Number</p>
                <p className="text-sm font-semibold">{USER_PROFILE.phone}</p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs text-text-muted mb-1">Registered Address</p>
                <p className="text-sm font-semibold">{USER_PROFILE.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Jurisdiction & Bank Accounts */}
        <div className="space-y-6">
          {/* Jurisdiction */}
          <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
            <div className="p-4 border-b border-border bg-surface flex items-center gap-2">
              <Building className="h-5 w-5 text-gov-blue" />
              <h2 className="font-bold text-gov-blue">Assessing Officer (AO)</h2>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <p className="text-xs text-text-muted mb-0.5">Jurisdiction Ward</p>
                <p className="text-sm font-bold text-gov-blue">{USER_PROFILE.aoDetails.jurisdiction}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 border-t border-border pt-4">
                <div>
                  <p className="text-xs text-text-muted">Area Code</p>
                  <p className="text-sm font-semibold font-mono">{USER_PROFILE.aoDetails.areaCode}</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted">AO Type</p>
                  <p className="text-sm font-semibold font-mono">{USER_PROFILE.aoDetails.aoType}</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted">Range Code</p>
                  <p className="text-sm font-semibold font-mono">{USER_PROFILE.aoDetails.rangeCode}</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted">AO Number</p>
                  <p className="text-sm font-semibold font-mono">{USER_PROFILE.aoDetails.aoNumber}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bank Accounts */}
          <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
            <div className="p-4 border-b border-border bg-surface flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-gov-blue" />
              <h2 className="font-bold text-gov-blue">Refund Bank Accounts</h2>
            </div>
            <div className="p-4 space-y-3">
              {USER_PROFILE.bankAccounts.map((account) => (
                <div key={account.id} className="p-3 border border-border rounded-md hover:bg-slate-50 transition-colors flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold">{account.bank}</h4>
                    <p className="text-xs text-text-muted font-mono">{account.accountMask}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {account.validated && (
                      <span className="text-[10px] bg-green-50 border border-green-200 text-gov-green px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" /> Validated
                      </span>
                    )}
                    {account.eif && (
                      <span className="text-[10px] bg-blue-50 border border-blue-200 text-gov-blue px-2 py-0.5 rounded-full font-semibold">
                        Refund Active
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
