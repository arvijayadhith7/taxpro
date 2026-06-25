"use client";

import React from "react";
import Link from "next/link";
import { LogOut, Home, User, Settings, HelpCircle, FileText } from "lucide-react";

export default function TDSLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#ffffff] font-sans">
      {/* Top Header */}
      <header className="bg-white py-2 px-4 flex justify-between items-center border-b-[3px] border-[#c00000]">
        <div className="flex items-center gap-3">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/200px-Emblem_of_India.svg.png" alt="Emblem" className="h-14 object-contain" />
          <div className="flex flex-col border-l-2 border-gray-300 pl-3">
            <h1 className="text-2xl font-bold text-[#c00000] tracking-tighter leading-none">TRACES</h1>
            <span className="text-[10px] font-bold text-[#1f497d] tracking-wide mt-0.5">TDS Reconciliation Analysis and Correction Enabling System</span>
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <div className="text-xs text-[#1f497d] font-bold mb-1">
            Welcome, ACADEMY TRADERS (DELA12345B)
          </div>
          <div className="flex items-center gap-3 text-[11px] text-gray-600 font-semibold">
            <Link href="/" className="hover:text-[#c00000] flex items-center gap-1"><Home className="h-3 w-3" /> Home</Link>
            <span className="text-gray-300">|</span>
            <Link href="#" className="hover:text-[#c00000] flex items-center gap-1"><User className="h-3 w-3" /> Profile</Link>
            <span className="text-gray-300">|</span>
            <Link href="/" className="hover:text-[#c00000] flex items-center gap-1"><LogOut className="h-3 w-3" /> Logout</Link>
          </div>
        </div>
      </header>

      {/* Main Navigation - specific to TRACES */}
      <nav className="bg-[#1f497d] text-white text-xs font-bold border-b-2 border-orange-400">
        <div className="flex max-w-[1200px] mx-auto">
          <Link href="/tds/dashboard" className="px-4 py-2 hover:bg-[#32629e] border-r border-[#32629e]">Dashboard</Link>
          <Link href="/tds/statements" className="px-4 py-2 hover:bg-[#32629e] border-r border-[#32629e]">Statements / Payments</Link>
          <Link href="/tds/communications" className="px-4 py-2 hover:bg-[#32629e] border-r border-[#32629e]">Communications</Link>
          <Link href="/tds/defaults" className="px-4 py-2 hover:bg-[#32629e] border-r border-[#32629e]">Defaults</Link>
          <Link href="/tds/downloads" className="px-4 py-2 hover:bg-[#32629e] border-r border-[#32629e]">Downloads</Link>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-1 w-full max-w-[1200px] mx-auto flex gap-4 p-4">
        {/* Left Sidebar (Typical TRACES style) */}
        <aside className="w-56 flex-shrink-0 hidden md:block">
          <div className="border border-[#b9c9dc] rounded-sm overflow-hidden mb-4">
            <div className="bg-[#d2e0f0] text-[#1f497d] font-bold text-xs p-2 border-b border-[#b9c9dc]">
              Quick Links
            </div>
            <ul className="text-xs text-blue-800 bg-[#f4f8fb] p-2 space-y-2">
              <li><button onClick={() => { import("sonner").then((mod) => mod.toast.info("Downloading Form 26AS mock data...")); }} className="hover:underline flex items-center gap-1.5 text-left"><FileText className="h-3 w-3" /> View Tax Credit (Form 26AS)</button></li>
              <li><button onClick={() => { import("sonner").then((mod) => mod.toast.info("Conso file request simulated.")); }} className="hover:underline flex items-center gap-1.5 text-left"><FileText className="h-3 w-3" /> Request for Conso File</button></li>
              <li><button onClick={() => { import("sonner").then((mod) => mod.toast.info("Justification report will be available in 24 hours.")); }} className="hover:underline flex items-center gap-1.5 text-left"><FileText className="h-3 w-3" /> Request for Justification Report</button></li>
              <li><button onClick={() => { import("sonner").then((mod) => mod.toast.info("Simulating Form 16/16A generation...")); }} className="hover:underline flex items-center gap-1.5 text-left"><FileText className="h-3 w-3" /> Request for Form 16/16A</button></li>
            </ul>
          </div>
          
          <div className="border border-[#b9c9dc] rounded-sm overflow-hidden">
            <div className="bg-[#d2e0f0] text-[#1f497d] font-bold text-xs p-2 border-b border-[#b9c9dc]">
              Help & Support
            </div>
            <ul className="text-[11px] text-gray-700 bg-white p-2 space-y-2">
              <li>Toll Free: 1800 103 0344</li>
              <li>Email: contactus@tdscpc.gov.in</li>
            </ul>
          </div>
        </aside>

        <main className="flex-1 border border-gray-200 shadow-sm bg-white p-4">
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-[#1f497d] text-white text-[11px] py-2 text-center mt-auto border-t-[3px] border-orange-400">
        <p>Copyright © 2026. TRACES - TDS Reconciliation Analysis and Correction Enabling System</p>
      </footer>
    </div>
  );
}
