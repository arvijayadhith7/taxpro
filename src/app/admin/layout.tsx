"use client";

import React from "react";
import Link from "next/link";
import { LogOut, LayoutDashboard, UserPlus, Users } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-sm">
      {/* Top Header */}
      <div className="h-1 bg-gov-orange w-full"></div>
      <header className="bg-gov-blue text-white py-3 px-6 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-3">
          <div className="bg-gov-orange text-white p-1.5 rounded font-extrabold text-xs">
            ADMIN
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-wide">National Tax Portal</h1>
            <p className="text-[10px] text-blue-200">Management & Simulator Administration</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-xs">
          <span className="font-semibold hidden sm:inline">Logged in: {session?.user?.name || "Administrator"}</span>
          <button 
            onClick={() => signOut({ callbackUrl: '/' })}
            className="bg-gov-red text-white px-3 py-1.5 rounded font-bold flex items-center gap-1.5 hover:bg-red-700 transition"
          >
            <LogOut className="h-3.5 w-3.5" /> Logout
          </button>
        </div>
      </header>

      {/* Navigation bar */}
      <nav className="bg-[#112a52] text-white/90 border-b border-[#0a1e3f]">
        <div className="max-w-7xl mx-auto flex px-6">
          <Link href="/admin/dashboard" className="px-4 py-3 text-xs font-bold hover:bg-white/10 flex items-center gap-1.5 border-b-2 border-gov-orange">
            <Users className="h-4 w-4" /> Manage Student Accounts
          </Link>
          <Link href="/" className="px-4 py-3 text-xs font-bold hover:bg-white/10 flex items-center gap-1.5 ml-auto">
            View Portal Main Page
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6">
        {children}
      </main>

      <footer className="bg-gov-blue text-white text-center py-4 text-xs border-t-2 border-gov-orange mt-auto">
        <p>© 2026 National Tax Portal. Administrator Access Panel.</p>
      </footer>
    </div>
  );
}
