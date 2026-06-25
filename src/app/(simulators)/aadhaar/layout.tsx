import React from "react";
import Link from "next/link";
import { Home, Link2, FileText, Settings, UserCircle } from "lucide-react";
import { GovHeader } from "@/components/gov/GovHeader";

export default function AadhaarLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <GovHeader />

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-border hidden md:flex flex-col shadow-sm">
          <nav className="flex-1 p-4 space-y-1">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-2 mt-4">Aadhaar Services</div>
            <Link href="/aadhaar/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold text-gray-700 hover:bg-red-50 hover:text-red-800">
              <Home className="h-4 w-4" /> My Aadhaar
            </Link>
            <Link href="/aadhaar/link-pan" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold text-gray-700 hover:bg-red-50 hover:text-red-800">
              <Link2 className="h-4 w-4" /> Link Aadhaar with PAN
            </Link>
            <Link href="/aadhaar/apply" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold text-gray-700 hover:bg-red-50 hover:text-red-800">
              <FileText className="h-4 w-4" /> Apply for New Aadhaar
            </Link>
            <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold text-gray-700 hover:bg-red-50 hover:text-red-800">
              <UserCircle className="h-4 w-4" /> Update Demographics
            </Link>

            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-2 mt-8">Settings</div>
            <Link href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold text-gray-700 hover:bg-red-50 hover:text-red-800">
              <Settings className="h-4 w-4" /> Preferences
            </Link>
          </nav>
          
          <div className="p-4 border-t border-border text-xs text-center text-gray-500 bg-gray-50">
            <p>UIDAI Simulator v1.0</p>
            <p className="mt-1">For Academic Practice</p>
          </div>
        </aside>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50 p-6 md:p-8">
          <div className="max-w-5xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
