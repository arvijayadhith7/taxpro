"use client";

import React from "react";
import Link from "next/link";
import { Fingerprint, Download, ShieldCheck, Link2, FileText, ArrowRight, Bell, User } from "lucide-react";

export default function AadhaarDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end border-b border-gray-200 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">My Aadhaar Dashboard</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your unique identity, view history, and access services.</p>
        </div>
        <div className="flex gap-3">
          <button className="p-2 text-gray-500 hover:text-red-800 bg-white border rounded-md shadow-sm relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </div>

      {/* Virtual Aadhaar Card */}
      <div className="bg-gradient-to-r from-blue-800 to-blue-600 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6 w-full">
            <div className="h-24 w-24 bg-white rounded-lg p-1 flex items-center justify-center shrink-0">
              <User className="h-16 w-16 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold tracking-wider mb-1 mt-2">XXXX XXXX 1234</h3>
              <p className="text-blue-100 font-medium">Virtual ID: 1234 5678 9012 3456</p>
            </div>
          </div>
          <div className="shrink-0 flex flex-col gap-2 w-full md:w-auto">
            <button className="bg-white text-blue-900 px-6 py-2 rounded-md font-bold text-sm hover:bg-gray-100 transition shadow-sm w-full md:w-auto flex items-center justify-center gap-2">
              <Download className="h-4 w-4" /> E-Aadhaar
            </button>
            <button className="bg-white/20 border border-white/40 text-white px-6 py-2 rounded-md font-bold text-sm hover:bg-white/30 transition shadow-sm w-full md:w-auto flex items-center justify-center gap-2">
              <ShieldCheck className="h-4 w-4" /> Lock Biometrics
            </button>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition">
          <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
            <Link2 className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Link Aadhaar</h3>
          <p className="text-sm text-gray-600 mb-4 h-10">Link your Aadhaar with PAN to comply with IT Department regulations.</p>
          <Link href="/aadhaar/link-pan" className="text-blue-700 font-bold text-sm flex items-center gap-1 hover:underline">
            Proceed <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition">
          <div className="h-12 w-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-4">
            <FileText className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Apply for Aadhaar</h3>
          <p className="text-sm text-gray-600 mb-4 h-10">Enroll for a new Aadhaar card. Book an appointment at an enrollment center.</p>
          <Link href="/aadhaar/apply" className="text-blue-700 font-bold text-sm flex items-center gap-1 hover:underline">
            Proceed <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-md transition">
          <div className="h-12 w-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-4">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Aadhaar Services</h3>
          <p className="text-sm text-gray-600 mb-4 h-10">Verify an Aadhaar number, check email/mobile, and generate Virtual ID.</p>
          <button className="text-gray-400 font-bold text-sm flex items-center gap-1 cursor-not-allowed">
            Coming Soon <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
