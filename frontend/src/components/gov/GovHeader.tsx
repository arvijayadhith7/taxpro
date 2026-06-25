"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Building2, Bell, User, LogOut, Search, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function GovHeader() {
  const pathname = usePathname();
  const { data: session } = useSession();
  
  const [mounted, setMounted] = React.useState(false);
  
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const userName = mounted ? (session?.user?.name || "CITIZEN") : "";
  const userPan = mounted ? (session?.user?.pan || "N/A") : "";

  // Determine active portal
  const isGST = pathname?.startsWith("/gst");
  const isTDS = pathname?.startsWith("/tds");
  const isAadhaar = pathname?.startsWith("/aadhaar");
  const isIncomeTax = pathname?.startsWith("/incometax") || (!isGST && !isTDS && !isAadhaar);

  const handlePortalSwitch = (e: React.ChangeEvent<HTMLSelectElement>) => {
    window.location.href = `/${e.target.value}/dashboard`;
  };

  // --------------------------------------------------------
  // Aadhaar (UIDAI) Header
  // --------------------------------------------------------
  if (isAadhaar) {
    return (
      <header className="bg-white border-b-4 border-blue-800 shadow-sm z-50 sticky top-0 w-full">
        <div className="flex items-center justify-between px-6 py-2">
          <div className="flex items-center gap-4">
            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/Aadhaar_Logo.svg/1200px-Aadhaar_Logo.svg.png" alt="Aadhaar Logo" className="h-12 object-contain" />
            <div className="border-l-2 border-gray-300 pl-4 py-1 hidden md:block">
              <h1 className="text-xl font-bold text-blue-900 leading-tight">myAadhaar</h1>
              <p className="text-xs text-gray-500">Unique Identification Authority of India</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <select value="aadhaar" onChange={handlePortalSwitch} className="bg-gray-100 border border-gray-300 text-xs px-2 py-1 rounded outline-none text-gray-700">
              <option value="aadhaar">Aadhaar (UIDAI)</option>
              <option value="incometax">Income Tax</option>
              <option value="gst">GST Portal</option>
              <option value="tds">TDS TRACES</option>
            </select>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <User className="h-5 w-5 text-gray-500" />
              <span className="font-semibold hidden sm:inline">{userName}</span>
            </div>
            <button onClick={() => signOut({ callbackUrl: '/' })} className="text-red-600 hover:bg-red-50 p-2 rounded-full transition" title="Logout">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>
    );
  }

  // --------------------------------------------------------
  // GST Portal Header
  // --------------------------------------------------------
  if (isGST) {
    return (
      <header className="bg-[#1e40af] text-white shadow-md z-50 sticky top-0 w-full">
        <div className="flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-4">
            <div className="bg-white p-1 rounded">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/GST_Logo.svg/1200px-GST_Logo.svg.png" alt="GST Logo" className="h-10 object-contain" />
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold tracking-wide">Goods and Services Tax</h1>
              <p className="text-xs text-blue-200">Government of India</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <select value="gst" onChange={handlePortalSwitch} className="bg-blue-800 border-none text-xs px-2 py-1 rounded outline-none text-white">
              <option value="aadhaar">Aadhaar (UIDAI)</option>
              <option value="incometax">Income Tax</option>
              <option value="gst">GST Portal</option>
              <option value="tds">TDS TRACES</option>
            </select>
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold">{userName}</p>
              <p className="text-[10px] text-blue-200 uppercase">GSTIN User</p>
            </div>
            <button onClick={() => signOut({ callbackUrl: '/' })} className="text-white hover:bg-blue-700 p-2 rounded transition border border-blue-400 text-xs font-bold flex items-center gap-1">
              LOGOUT
            </button>
          </div>
        </div>
        {/* Fake Sub-nav for GST */}
        <div className="bg-white text-blue-900 border-b border-gray-200 text-sm font-semibold flex px-6">
          <Link href="/gst/dashboard" className="px-4 py-2 border-b-2 border-blue-600 text-blue-700">Dashboard</Link>
          <Link href="#" className="px-4 py-2 hover:bg-gray-50 border-b-2 border-transparent">Services</Link>
          <Link href="#" className="px-4 py-2 hover:bg-gray-50 border-b-2 border-transparent">GST Law</Link>
          <Link href="/gst/downloads" className="px-4 py-2 hover:bg-gray-50 border-b-2 border-transparent">Downloads</Link>
        </div>
      </header>
    );
  }

  // --------------------------------------------------------
  // TDS TRACES Header
  // --------------------------------------------------------
  if (isTDS) {
    return (
      <header className="bg-white border-b border-gray-300 shadow-sm z-50 sticky top-0 w-full font-sans">
        <div className="h-1 bg-blue-900 w-full" />
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-3">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_India.svg/200px-Emblem_of_India.svg.png" alt="Emblem" className="h-12 object-contain" />
            <div>
              <h1 className="text-xl font-bold text-blue-900">TRACES</h1>
              <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">TDS Reconciliation Analysis and Correction Enabling System</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <select value="tds" onChange={handlePortalSwitch} className="bg-gray-100 border border-gray-300 px-1 py-0.5 outline-none">
              <option value="aadhaar">Aadhaar</option>
              <option value="incometax">Income Tax</option>
              <option value="gst">GST Portal</option>
              <option value="tds">TDS TRACES</option>
            </select>
            <div className="border-l border-gray-300 pl-3">
              <span className="font-bold text-gray-800">TAN User: </span>
              <span className="text-gray-600">{userName}</span>
            </div>
            <button onClick={() => signOut({ callbackUrl: '/' })} className="bg-red-600 text-white px-3 py-1 text-[11px] font-bold hover:bg-red-700">
              LOGOUT
            </button>
          </div>
        </div>
      </header>
    );
  }

  // --------------------------------------------------------
  // Default: Income Tax e-Filing 2.0
  // --------------------------------------------------------
  return (
    <header className="bg-[#1e3a8a] text-white shadow-md z-50 sticky top-0 w-full">
      <div className="h-1 bg-[#ea580c] w-full" />
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-5">
          <img src="https://upload.wikimedia.org/wikipedia/en/thumb/8/87/Income_Tax_Department_logo.svg/1200px-Income_Tax_Department_logo.svg.png" alt="Income Tax Logo" className="h-10 object-contain bg-white rounded-full p-0.5" />
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-wide">e-Filing 2.0</span>
            <span className="text-[10px] text-orange-400 font-semibold tracking-wider uppercase">Income Tax Department</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <select value="incometax" onChange={handlePortalSwitch} className="bg-blue-900 border border-blue-700 text-xs px-2 py-1 rounded outline-none text-white">
            <option value="aadhaar">Aadhaar (UIDAI)</option>
            <option value="incometax">Income Tax</option>
            <option value="gst">GST Portal</option>
            <option value="tds">TDS TRACES</option>
          </select>
          
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-sm font-semibold">{userName}</span>
            <span className="text-[10px] text-blue-200">PAN: {userPan}</span>
          </div>
          
          <button onClick={() => signOut({ callbackUrl: '/' })} className="bg-white text-blue-900 font-bold px-4 py-1.5 rounded-full text-xs hover:bg-blue-50 transition flex items-center gap-1">
            <LogOut className="h-3 w-3" /> Logout
          </button>
        </div>
      </div>
    </header>
  );
}
