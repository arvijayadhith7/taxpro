"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Building2, FileText, ShieldCheck, Calculator, Fingerprint, LogOut, User } from "lucide-react";

const portals = [
  {
    id: "incometax",
    title: "Income Tax E-Filing",
    description: "File ITR forms, check refund status, view AIS, and manage your income tax compliance.",
    icon: FileText,
    color: "bg-blue-600",
    hoverColor: "hover:border-blue-500",
    iconBg: "bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
  },
  {
    id: "gst",
    title: "GST Common Portal",
    description: "Register for GST, file GSTR-1 & 3B, generate e-way bills, and manage GST compliance.",
    icon: ShieldCheck,
    color: "bg-emerald-600",
    hoverColor: "hover:border-emerald-500",
    iconBg: "bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white",
  },
  {
    id: "tds",
    title: "TDS CPC (TRACES)",
    description: "Download Form 26AS, manage challans, file quarterly TDS statements, and track defaults.",
    icon: Calculator,
    color: "bg-purple-600",
    hoverColor: "hover:border-purple-500",
    iconBg: "bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white",
  },
  {
    id: "aadhaar",
    title: "Aadhaar (UIDAI) Portal",
    description: "Link PAN with Aadhaar, apply for a new Aadhaar, or check your enrollment status.",
    icon: Fingerprint,
    color: "bg-orange-600",
    hoverColor: "hover:border-orange-500",
    iconBg: "bg-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white",
  },
];

export default function PortalSelectPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center font-sans">
        <p className="text-text-muted">Loading...</p>
      </div>
    );
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      {/* Header */}
      <div className="h-1 bg-gov-orange w-full"></div>
      <header className="bg-gov-blue text-white py-3 px-6 lg:px-12 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-3">
          <Building2 className="h-8 w-8 text-gov-orange" />
          <div>
            <h1 className="text-xl font-bold tracking-wide">National Tax Portal</h1>
            <p className="text-xs text-blue-200">Department of Revenue, Ministry of Finance</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-blue-200">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">{session.user?.name || session.user?.pan || "User"}</span>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center gap-1.5 bg-white/10 border border-white/20 text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-white/20 transition"
          >
            <LogOut className="h-3.5 w-3.5" />
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 lg:p-12">
        <div className="max-w-3xl w-full text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gov-blue mb-3">
            Welcome, {session.user?.name || "Student"}!
          </h2>
          <p className="text-text-muted text-base">
            Select the portal you would like to work on today.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl w-full">
          {portals.map((portal) => {
            const Icon = portal.icon;
            return (
              <Link
                key={portal.id}
                href={`/${portal.id}/dashboard`}
                className={`group bg-white p-6 rounded-xl border-2 border-transparent ${portal.hoverColor} shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col`}
              >
                <div className={`h-14 w-14 rounded-xl flex items-center justify-center ${portal.iconBg} transition-all duration-200 mb-4`}>
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-bold text-text mb-2">{portal.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{portal.description}</p>
              </Link>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gov-blue text-white text-center py-4 text-xs border-t-2 border-gov-orange">
        <p>© 2026 National Tax Portal. Designed and developed by National Informatics Centre (NIC).</p>
      </footer>
    </div>
  );
}
