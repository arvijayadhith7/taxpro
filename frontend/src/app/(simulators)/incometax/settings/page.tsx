"use client";

import React from "react";
import { Settings, Shield, Bell, Key, Users } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gov-blue font-display">Account Settings</h1>
        <p className="text-sm text-text-muted mt-1">Configure security preferences and digital signature certificates</p>
      </div>

      <div className="space-y-6">
        {/* Security Section */}
        <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border bg-surface flex items-center gap-2">
            <Shield className="h-5 w-5 text-gov-blue" />
            <h2 className="font-bold text-gov-blue">E-Filing Vault Security</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h4 className="text-sm font-semibold text-text">Login using Net Banking / Aadhaar OTP</h4>
                <p className="text-xs text-text-muted mt-0.5">Require multi-factor authorization whenever logging into the portal</p>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4 text-gov-blue focus:ring-gov-blue border-gray-300 rounded" />
            </div>

            <div className="flex justify-between items-start gap-4 border-t border-border pt-4">
              <div>
                <h4 className="text-sm font-semibold text-text">Register Digital Signature Certificate (DSC)</h4>
                <p className="text-xs text-text-muted mt-0.5">Required for signing returns of companies and audits</p>
              </div>
              <button className="text-xs bg-white border border-gov-blue text-gov-blue px-3 py-1.5 rounded font-semibold hover:bg-gov-blue-pale transition-colors">
                Register DSC
              </button>
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border bg-surface flex items-center gap-2">
            <Bell className="h-5 w-5 text-gov-blue" />
            <h2 className="font-bold text-gov-blue">Alerts & Notifications</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h4 className="text-sm font-semibold text-text">SMS Alerts</h4>
                <p className="text-xs text-text-muted mt-0.5">Receive updates on filing confirmations and notices via registered mobile</p>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4 text-gov-blue focus:ring-gov-blue border-gray-300 rounded" />
            </div>

            <div className="flex justify-between items-start gap-4 border-t border-border pt-4">
              <div>
                <h4 className="text-sm font-semibold text-text">Email Communications</h4>
                <p className="text-xs text-text-muted mt-0.5">Receive copy of filed forms and legal orders via email</p>
              </div>
              <input type="checkbox" defaultChecked className="h-4 w-4 text-gov-blue focus:ring-gov-blue border-gray-300 rounded" />
            </div>
          </div>
        </div>

        {/* Representatives Section */}
        <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border bg-surface flex items-center gap-2">
            <Users className="h-5 w-5 text-gov-blue" />
            <h2 className="font-bold text-gov-blue">Authorized Representative Assessees</h2>
          </div>
          <div className="p-6">
            <p className="text-xs text-text-muted mb-4">You have not authorized any Chartered Accountant (CA) or tax representative to access your account.</p>
            <button className="text-xs bg-gov-blue text-white px-4 py-2 rounded font-semibold hover:bg-gov-blue-light transition-colors">
              Add Representative
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
