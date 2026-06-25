"use client";

import React from "react";
import { CreditCard, FileText, ClipboardList, RefreshCw } from "lucide-react";

import Link from "next/link";

export default function GSTServicesPage() {
  const serviceCategories = [
    {
      title: "Registration",
      icon: <ClipboardList className="h-6 w-6 text-gov-blue" />,
      links: [
        { name: "New Registration", href: "/gst/registration/new" },
        { name: "Track Application Status", href: "/gst/registration" },
        { name: "Application for Filing Clarifications", href: "#", alert: "Filing clarifications is auto-approved in the sandbox." }
      ]
    },
    {
      title: "Ledgers",
      icon: <CreditCard className="h-6 w-6 text-gov-blue" />,
      links: [
        { name: "Electronic Liability Register", href: "#", alert: "Liability Ledger balance: ₹ 0.00" },
        { name: "Electronic Cash Ledger", href: "#", alert: "Cash Ledger balance: ₹ 14,850.00" },
        { name: "Electronic Credit Ledger", href: "#", alert: "Credit Ledger balance: ₹ 9,640.00" }
      ]
    },
    {
      title: "Returns",
      icon: <FileText className="h-6 w-6 text-gov-blue" />,
      links: [
        { name: "Returns Dashboard", href: "/gst/dashboard" },
        { name: "Track Return Status", href: "/gst/dashboard" },
        { name: "ITC Comparison Utility", href: "#", alert: "ITC comparison matches perfectly with GSTR-2B." }
      ]
    },
    {
      title: "Payments",
      icon: <RefreshCw className="h-6 w-6 text-gov-blue" />,
      links: [
        { name: "Create Challan", href: "#", alert: "Challan generated for ₹ 14,850.00." },
        { name: "Challan History", href: "#", alert: "No past challan payments on record." },
        { name: "Track Payment Status", href: "#", alert: "All past tax payments are settled." }
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="border-b pb-2">
        <h2 className="text-xl font-bold text-gray-800">GST Services</h2>
        <p className="text-sm text-gray-500">Access ledgers, file returns, check registration status, and make tax payments.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {serviceCategories.map((cat, idx) => (
          <div key={idx} className="bg-white border rounded-md shadow-sm p-5 space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b">
              {cat.icon}
              <h3 className="font-bold text-gray-800 text-base">{cat.title}</h3>
            </div>
            <ul className="space-y-2 text-sm">
              {cat.links.map((link, lIdx) => (
                <li key={lIdx}>
                  {link.href === "#" ? (
                    <button 
                      onClick={() => alert(link.alert)}
                      className="text-gov-blue hover:underline text-left"
                    >
                      {link.name}
                    </button>
                  ) : (
                    <Link href={link.href} className="text-gov-blue hover:underline">
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
