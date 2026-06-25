"use client";

import React from "react";
import Link from "next/link";
import { Building2, FileText, ArrowRight, ShieldCheck, Clock, Calculator, Fingerprint } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Header */}
      <div className="h-1 bg-gov-orange w-full"></div>
      <header className="bg-gov-blue text-white py-3 px-6 lg:px-12 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-3">
          <Building2 className="h-8 w-8 text-gov-orange" />
          <div>
            <h1 className="text-xl font-bold tracking-wide">National Tax Portal</h1>
            <p className="text-xs text-blue-200">Department of Revenue, Ministry of Finance</p>
          </div>
        </div>
        <div className="flex gap-4">
          <Link href="/login" className="bg-white text-gov-blue px-6 py-2 rounded-sm font-semibold text-sm hover:bg-gray-100 transition">
            Login
          </Link>
          <button className="bg-transparent border border-white/40 text-white px-4 py-2 rounded-sm font-semibold text-sm hover:bg-white/10 transition hidden sm:block">
            Register
          </button>
        </div>
      </header>

      {/* Ticker */}
      <div className="bg-gov-blue-pale border-b border-blue-200 py-2 px-6 flex items-center overflow-hidden whitespace-nowrap">
        <span className="bg-gov-red text-white text-xs font-bold px-2 py-1 mr-3 rounded-sm uppercase">Update</span>
        <div className="text-sm text-gov-blue font-medium animate-marquee">
          Last date to file ITR for AY 2026-27 is 31st July 2026. Avoid late fees. | Link your PAN with Aadhaar immediately. | Beware of phishing emails claiming to offer tax refunds.
        </div>
      </div>

      <main className="flex-1 bg-surface">
        {/* Hero Section */}
        <div className="bg-white border-b border-border pt-12 pb-16 px-6 lg:px-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gov-blue/5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gov-orange/5 rounded-full translate-y-1/2 -translate-x-1/3"></div>
          
          <div className="max-w-3xl mx-auto relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gov-blue mb-4 leading-tight">
              A Unified Portal for Tax Compliance
            </h2>
            <p className="text-lg text-text-muted mb-8">
              Seamlessly file Income Tax, manage GST returns, and track TDS compliance securely in one place.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="#services" className="bg-gov-blue text-white px-8 py-3 rounded-md font-semibold hover:bg-gov-blue/90 transition shadow-sm flex items-center justify-center gap-2">
                File Returns Now <ArrowRight className="h-4 w-4" />
              </Link>
              <button className="bg-white text-gov-blue border border-gov-blue px-8 py-3 rounded-md font-semibold hover:bg-gov-blue-pale transition shadow-sm">
                Know Your Tax Status
              </button>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div id="services" className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <h3 className="text-2xl font-bold text-text mb-8 text-center">Key Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg border border-border shadow-sm hover:shadow-md transition group flex flex-col">
              <div className="h-12 w-12 bg-gov-blue-pale rounded-full flex items-center justify-center text-gov-blue mb-4 group-hover:bg-gov-blue group-hover:text-white transition">
                <FileText className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-bold text-text mb-2">Income Tax Filing</h4>
              <p className="text-sm text-text-muted mb-4 line-clamp-3 flex-1">File ITR forms, check refund status, and view Annual Information Statement (AIS).</p>
              <Link href="/login?portal=incometax" className="text-gov-blue font-semibold text-sm flex items-center gap-1 group-hover:underline mt-auto">
                Access Service <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg border border-border shadow-sm hover:shadow-md transition group flex flex-col">
              <div className="h-12 w-12 bg-gov-blue-pale rounded-full flex items-center justify-center text-gov-blue mb-4 group-hover:bg-gov-blue group-hover:text-white transition">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-bold text-text mb-2">GST Compliance</h4>
              <p className="text-sm text-text-muted mb-4 line-clamp-3 flex-1">Register for GST, file GSTR-1 & 3B, and generate e-way bills seamlessly.</p>
              <Link href="/login?portal=gst" className="text-gov-blue font-semibold text-sm flex items-center gap-1 group-hover:underline mt-auto">
                Access Service <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg border border-border shadow-sm hover:shadow-md transition group flex flex-col">
              <div className="h-12 w-12 bg-gov-blue-pale rounded-full flex items-center justify-center text-gov-blue mb-4 group-hover:bg-gov-blue group-hover:text-white transition">
                <Calculator className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-bold text-text mb-2">TDS Management</h4>
              <p className="text-sm text-text-muted mb-4 line-clamp-3 flex-1">Download Form 26AS, manage challans, and file quarterly statements.</p>
              <Link href="/login?portal=tds" className="text-gov-blue font-semibold text-sm flex items-center gap-1 group-hover:underline mt-auto">
                Access Service <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg border border-border shadow-sm hover:shadow-md transition group flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gov-orange text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">NEW</div>
              <div className="h-12 w-12 bg-gov-blue-pale rounded-full flex items-center justify-center text-gov-blue mb-4 group-hover:bg-gov-blue group-hover:text-white transition">
                <Fingerprint className="h-6 w-6" />
              </div>
              <h4 className="text-lg font-bold text-text mb-2">Aadhaar Services</h4>
              <p className="text-sm text-text-muted mb-4 line-clamp-3 flex-1">Link your PAN with Aadhaar, apply for a new Aadhaar, or check enrollment status.</p>
              <Link href="/login?portal=aadhaar" className="text-gov-blue font-semibold text-sm flex items-center gap-1 group-hover:underline mt-auto">
                Access Service <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-gov-blue text-white pt-12 pb-6 px-6 lg:px-12 border-t-4 border-gov-orange">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <h5 className="font-bold text-lg mb-4">National Tax Portal</h5>
            <p className="text-sm text-blue-200 max-w-sm">
              An initiative by the Government to provide a single window for all taxpayer services, ensuring transparency and ease of compliance.
            </p>
          </div>
          <div>
            <h5 className="font-bold text-lg mb-4">Quick Links</h5>
            <ul className="space-y-2 text-sm text-blue-200">
              <li><a href="#" className="hover:text-white">Tax Calculator</a></li>
              <li><a href="#" className="hover:text-white">Form 26AS</a></li>
              <li><a href="#" className="hover:text-white">Verify PAN</a></li>
              <li><a href="#" className="hover:text-white">Track Refund</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-lg mb-4">Help & Support</h5>
            <ul className="space-y-2 text-sm text-blue-200">
              <li><a href="#" className="hover:text-white">Contact Us</a></li>
              <li><a href="#" className="hover:text-white">Grievance Redressal</a></li>
              <li><a href="#" className="hover:text-white">FAQs</a></li>
              <li><a href="#" className="hover:text-white">Video Tutorials</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto border-t border-blue-800 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-blue-300">
          <p>© 2026 National Tax Portal. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Use</a>
            <a href="#" className="hover:text-white">Accessibility Statement</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
