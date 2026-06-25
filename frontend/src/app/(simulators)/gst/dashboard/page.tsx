"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Search, Info, ExternalLink } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function GSTDashboardPage() {
  const { data: session } = useSession();
  
  const [financialYear, setFinancialYear] = useState("2026-27");
  const [quarter, setQuarter] = useState("Q1");
  const [period, setPeriod] = useState("Apr");
  const [showReturns, setShowReturns] = useState(false);

  const handleSearch = () => {
    setShowReturns(true);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Welcome Banner */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-md p-4 flex flex-col md:flex-row justify-between md:items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Welcome, {session?.user?.name || "TAXPAYER"}</h1>
          <p className="text-sm font-semibold text-gray-600 mt-1">GSTIN: <span className="font-bold text-gov-blue">{session?.user?.pan}1Z5</span></p>
        </div>
        <div className="mt-4 md:mt-0 text-right">
          <Link href="/gst/dashboard" className="text-xs text-blue-600 hover:underline inline-block">View Profile</Link>
          <div className="text-xs text-gray-500 mt-1">Last Login: 22-Jun-2026 05:40 PM</div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="flex gap-4">
        <button onClick={() => setShowReturns(false)} className="bg-gov-blue text-white px-6 py-2 rounded text-sm font-bold shadow-sm hover:bg-blue-800">
          Return Dashboard
        </button>
        <Link 
          href="/gst/create-challan"
          className="bg-white border border-gov-blue text-gov-blue px-6 py-2 rounded text-sm font-bold shadow-sm hover:bg-blue-50"
        >
          Create Challan
        </Link>
        <Link 
          href="/gst/notices"
          className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded text-sm font-bold shadow-sm hover:bg-gray-50 flex items-center"
        >
          Notices / Orders
        </Link>
      </div>

      {/* Return Search Filter */}
      <div className="bg-white border border-gray-200 shadow-sm rounded-md overflow-hidden">
        <div className="bg-gray-50 border-b border-gray-200 p-3">
          <h2 className="font-bold text-gray-800 text-sm">File Returns</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            <div className="space-y-2">
              <Label className="text-xs font-bold text-gray-600">Financial Year <span className="text-red-500">*</span></Label>
              <Select value={financialYear} onValueChange={(v) => setFinancialYear(v || '')}>
                <SelectTrigger className="border-gray-300 h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2026-27">2026-27</SelectItem>
                  <SelectItem value="2025-26">2025-26</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="text-xs font-bold text-gray-600">Quarter <span className="text-red-500">*</span></Label>
              <Select value={quarter} onValueChange={(v) => setQuarter(v || '')}>
                <SelectTrigger className="border-gray-300 h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Q1">Quarter 1</SelectItem>
                  <SelectItem value="Q2">Quarter 2</SelectItem>
                  <SelectItem value="Q3">Quarter 3</SelectItem>
                  <SelectItem value="Q4">Quarter 4</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="text-xs font-bold text-gray-600">Period <span className="text-red-500">*</span></Label>
              <Select value={period} onValueChange={(v) => setPeriod(v || '')}>
                <SelectTrigger className="border-gray-300 h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Apr">April</SelectItem>
                  <SelectItem value="May">May</SelectItem>
                  <SelectItem value="Jun">June</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <button 
                onClick={handleSearch}
                className="bg-gov-blue text-white px-6 py-2 h-9 rounded text-sm font-bold shadow-sm hover:bg-blue-800 w-full"
              >
                SEARCH
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Return Tiles (Shown after Search) */}
      {showReturns && (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 p-3 rounded flex gap-2 text-sm text-gov-blue items-center">
            <Info className="h-4 w-4" />
            <span>Please click on <span className="font-bold">'PREPARE ONLINE'</span> to file your returns. GSTR-2A and GSTR-2B are auto-drafted statements.</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* GSTR-1 */}
            <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden flex flex-col h-full">
              <div className="bg-gray-100 border-b border-gray-200 p-4 text-center">
                <h3 className="font-bold text-gray-800 text-lg">Details of outward supplies of goods or services</h3>
                <h2 className="text-2xl font-bold text-gov-blue my-1">GSTR1</h2>
              </div>
              <div className="p-4 flex-grow text-center text-sm space-y-2">
                <p className="text-gray-600 font-semibold">Due Date : <span className="text-gray-800">11/05/2026</span></p>
                <p className="text-xs text-gray-500 italic mt-2">Provides details of all outward supplies of B2B, B2C, Exports etc.</p>
              </div>
              <div className="grid grid-cols-2 border-t border-gray-200">
                <Link href="/gst/gstr-1" className="bg-gov-blue text-white text-center py-3 font-bold text-sm hover:bg-blue-800 transition">
                  PREPARE ONLINE
                </Link>
                <button className="bg-white text-gov-blue text-center py-3 font-bold text-sm border-l border-gray-200 hover:bg-gray-50 transition">
                  PREPARE OFFLINE
                </button>
              </div>
            </div>

            {/* GSTR-2A */}
            <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden flex flex-col h-full">
              <div className="bg-gray-100 border-b border-gray-200 p-4 text-center">
                <h3 className="font-bold text-gray-800 text-lg">Auto Drafted details</h3>
                <h2 className="text-2xl font-bold text-gray-500 my-1">GSTR2A</h2>
              </div>
              <div className="p-4 flex-grow text-center text-sm space-y-2">
                <p className="text-gray-600 font-semibold">View Only</p>
                <p className="text-xs text-gray-500 italic mt-2">Auto-populated details of inward supplies based on GSTR-1 filed by suppliers.</p>
              </div>
              <div className="border-t border-gray-200">
                <button className="w-full bg-white text-gov-blue text-center py-3 font-bold text-sm hover:bg-gray-50 transition">
                  VIEW
                </button>
              </div>
            </div>

            {/* GSTR-2B */}
            <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden flex flex-col h-full">
              <div className="bg-gray-100 border-b border-gray-200 p-4 text-center">
                <h3 className="font-bold text-gray-800 text-lg">Auto drafted ITC Statement</h3>
                <h2 className="text-2xl font-bold text-gray-500 my-1">GSTR2B</h2>
              </div>
              <div className="p-4 flex-grow text-center text-sm space-y-2">
                <p className="text-gray-600 font-semibold">Generated on: <span className="text-gray-800">14/05/2026</span></p>
                <p className="text-xs text-gray-500 italic mt-2">Static month-wise auto-drafted ITC statement.</p>
              </div>
              <div className="border-t border-gray-200">
                <button className="w-full bg-white text-gov-blue text-center py-3 font-bold text-sm hover:bg-gray-50 transition">
                  VIEW
                </button>
              </div>
            </div>

            {/* GSTR-3B */}
            <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden flex flex-col h-full">
              <div className="bg-gray-100 border-b border-gray-200 p-4 text-center">
                <h3 className="font-bold text-gray-800 text-lg">Monthly Return</h3>
                <h2 className="text-2xl font-bold text-gov-blue my-1">GSTR3B</h2>
              </div>
              <div className="p-4 flex-grow text-center text-sm space-y-2">
                <p className="text-gray-600 font-semibold">Due Date : <span className="text-gray-800">20/05/2026</span></p>
                <p className="text-xs text-gray-500 italic mt-2">Summary return of outward supplies and input tax credit claimed.</p>
              </div>
              <div className="grid grid-cols-2 border-t border-gray-200">
                <Link href="/gst/gstr-3b" className="bg-gov-blue text-white text-center py-3 font-bold text-sm hover:bg-blue-800 transition">
                  PREPARE ONLINE
                </Link>
                <button className="bg-white text-gov-blue text-center py-3 font-bold text-sm border-l border-gray-200 hover:bg-gray-50 transition">
                  PREPARE OFFLINE
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
