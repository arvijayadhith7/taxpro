"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  Calculator,
  ShieldCheck,
  AlertCircle,
  BarChart3,
  User,
  Settings,
  HelpCircle,
  FileDigit,
  Receipt,
  FileCheck
} from "lucide-react";

interface SidebarSection {
  title?: string;
  items: {
    title: string;
    href: string;
    icon: React.ReactNode;
  }[];
}

export function PortalSidebar() {
  const pathname = usePathname();

  // Determine which sidebar sections to show based on the current path
  const getSections = (): SidebarSection[] => {
    // Default / Dashboard sections
    const defaultSections: SidebarSection[] = [
      {
        items: [
          { title: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
        ],
      },
      {
        title: "e-File",
        items: [
          { title: "Income Tax Returns", href: "/itr", icon: <FileText className="h-4 w-4" /> },
          { title: "GST Returns", href: "/gst/gstr-1", icon: <ShieldCheck className="h-4 w-4" /> },
          { title: "TDS Statements", href: "/tds/form-24q", icon: <Calculator className="h-4 w-4" /> },
        ],
      },
      {
        title: "Services",
        items: [
          { title: "Annual Info (AIS)", href: "/itr/ais", icon: <FileDigit className="h-4 w-4" /> },
          { title: "View Form 26AS", href: "/compliance/form-26as", icon: <FileCheck className="h-4 w-4" /> },
          { title: "Refund Status", href: "/compliance/refund-tracker", icon: <Receipt className="h-4 w-4" /> },
        ],
      },
      {
        title: "Compliance",
        items: [
          { title: "Notices & Orders", href: "/notices", icon: <AlertCircle className="h-4 w-4" /> },
          { title: "Reports", href: "/reports", icon: <BarChart3 className="h-4 w-4" /> },
        ],
      },
      {
        title: "Account",
        items: [
          { title: "My Profile", href: "/profile", icon: <User className="h-4 w-4" /> },
          { title: "Settings", href: "/settings", icon: <Settings className="h-4 w-4" /> },
        ],
      },
    ];

    // Contextual sidebar overrides could go here based on pathname
    // For now, return default sections
    return defaultSections;
  };

  const sections = getSections();

  return (
    <aside className="w-64 bg-surface border-r border-border h-[calc(100vh-116px)] sticky top-[116px] overflow-y-auto hidden lg:flex flex-col py-4">
      {sections.map((section, idx) => (
        <div key={idx} className="mb-6 px-3">
          {section.title && (
            <h4 className="px-3 mb-2 text-xs font-bold uppercase tracking-wider text-text-muted">
              {section.title}
            </h4>
          )}
          <ul className="space-y-1">
            {section.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors group",
                    pathname === item.href
                      ? "bg-gov-blue-pale text-gov-blue"
                      : "text-text hover:bg-white hover:text-gov-blue"
                  )}
                >
                  <span className={cn(
                    "transition-colors",
                    pathname === item.href ? "text-gov-blue" : "text-text-muted group-hover:text-gov-blue"
                  )}>
                    {item.icon}
                  </span>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
      
      <div className="mt-auto px-6 py-4 border-t border-border">
        <Link href="#" className="flex items-center gap-2 text-sm text-text-muted hover:text-gov-blue transition-colors">
          <HelpCircle className="h-4 w-4" />
          <span>Help & Support</span>
        </Link>
      </div>
    </aside>
  );
}
