"use client";

import React from "react";
import Link from "next/link";
import { Building2, Search, Bell, LogOut, Download } from "lucide-react";

export default function GSTLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#f0f4f7] font-sans">
      {/* Topmost gov bar */}
      <div className="bg-[#0f1d3a] h-6 flex items-center justify-end px-4 text-[11px] text-white/80 gap-4">
        <span>Screen Reader Access</span>
        <span>A- A A+</span>
        <span>English</span>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-gray-200 py-3 px-6 shadow-sm flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/GST_Logo.svg/1200px-GST_Logo.svg.png" alt="GST Logo" className="h-12 object-contain" />
          <div className="flex flex-col border-l border-gray-300 pl-3">
            <h1 className="text-xl font-bold text-[#0f1d3a] leading-tight tracking-tight">Goods and Services Tax</h1>
            <span className="text-[10px] uppercase font-bold text-blue-800 tracking-wider">Government of India</span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-[#0f1d3a]">M/S ACADEMY TRADERS</p>
            <p className="text-xs text-gray-500">GSTIN: 33ABCDE1234F1Z5</p>
          </div>
          <div className="h-8 w-px bg-gray-300 hidden md:block"></div>
          <div className="flex gap-4">
            <button className="text-[#0f1d3a] hover:text-blue-600"><Search className="h-5 w-5" /></button>
            <button className="text-[#0f1d3a] hover:text-blue-600"><Bell className="h-5 w-5" /></button>
            <Link href="/" className="text-red-600 hover:text-red-800 flex items-center gap-1 text-sm font-semibold">
              <LogOut className="h-4 w-4" /> Logout
            </Link>
          </div>
        </div>
      </header>

      {/* Blue Navigation Bar */}
      <nav className="bg-[#0e2243] text-white">
        <div className="flex px-4 overflow-x-auto">
          <Link href="/gst/dashboard" className="px-5 py-3 text-sm font-semibold hover:bg-white/10 border-b-4 border-transparent hover:border-blue-400">Dashboard</Link>
          <Link href="/gst/services" className="px-5 py-3 text-sm font-semibold hover:bg-white/10 border-b-4 border-transparent hover:border-blue-400">Services</Link>
          <Link href="/gst/law" className="px-5 py-3 text-sm font-semibold hover:bg-white/10 border-b-4 border-transparent hover:border-blue-400">GST Law</Link>
          <Link href="/gst/downloads" className="px-5 py-3 text-sm font-semibold hover:bg-white/10 border-b-4 border-transparent hover:border-blue-400">Downloads</Link>
          <Link href="/gst/search" className="px-5 py-3 text-sm font-semibold hover:bg-white/10 border-b-4 border-transparent hover:border-blue-400">Search Taxpayer</Link>
          <Link href="/gst/help" className="px-5 py-3 text-sm font-semibold hover:bg-white/10 border-b-4 border-transparent hover:border-blue-400">Help and Taxpayer Facilities</Link>
          <Link href="/gst/einvoice" className="px-5 py-3 text-sm font-semibold hover:bg-white/10 border-b-4 border-transparent hover:border-blue-400">e-Invoice</Link>
        </div>
      </nav>

      <main className="flex-1 w-full max-w-[1200px] mx-auto p-4 md:p-6">
        {children}
      </main>

      <footer className="bg-[#1e1e1e] text-gray-400 text-xs py-6 mt-10">
        <div className="max-w-[1200px] mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">Website Policies</a>
            <a href="#" className="hover:text-white">Help</a>
            <a href="#" className="hover:text-white">Contact Us</a>
          </div>
          <p>© 2026 Goods and Services Tax Network (GSTN). All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
