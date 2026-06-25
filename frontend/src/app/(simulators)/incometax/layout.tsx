"use client";

import React from "react";
import { GovHeader } from "@/components/gov/GovHeader";
import { MegaNav } from "@/components/gov/MegaNav";
import { PortalSidebar } from "@/components/gov/PortalSidebar";

export default function IncomeTaxLayout({ children }: { children: React.ReactNode }) {
  // Navigation specifically for Income Tax
  const incomeTaxNavItems = [
    { title: "Dashboard", href: "/incometax/dashboard" },
    {
      title: "e-File",
      items: [
        { title: "Income Tax Returns", href: "/incometax/itr" },
        { title: "File Income Tax Return", href: "/incometax/itr" },
        { title: "View Filed Returns", href: "/incometax/itr" },
        { title: "e-Verify Return", href: "/incometax/itr" },
      ]
    },
    {
      title: "Services",
      items: [
        { title: "Annual Information Statement (AIS)", href: "/incometax/compliance/form-26as" },
        { title: "Link Aadhaar", href: "/incometax/profile" },
        { title: "Know Your AO", href: "/incometax/profile" },
        { title: "Refund Status", href: "/incometax/compliance/refund-tracker" },
      ]
    },
    {
      title: "Pending Actions",
      items: [
        { title: "Worklist", href: "/incometax/notices" },
        { title: "Response to Outstanding Demand", href: "/incometax/notices" },
        { title: "e-Proceedings", href: "/incometax/notices" },
      ]
    },
    { title: "Grievances", href: "/incometax/reports" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <GovHeader />
      <MegaNav items={incomeTaxNavItems} />
      
      <div className="flex-1 flex w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        {/* <PortalSidebar /> */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
