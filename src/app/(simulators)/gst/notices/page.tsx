"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search, Filter, Download } from "lucide-react";

export default function GSTNoticesPage() {
  const [activeTab, setActiveTab] = useState("notices");

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link href="/gst/dashboard" className="text-blue-600 hover:text-blue-800">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h2 className="text-xl font-bold text-gray-800">Notices and Orders</h2>
        </div>
      </div>

      <div className="bg-white border border-gray-200 shadow-sm rounded-md overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button 
            className={`px-6 py-3 text-sm font-bold border-b-2 ${activeTab === 'notices' ? 'border-gov-blue text-gov-blue' : 'border-transparent text-gray-600 hover:bg-gray-50'}`}
            onClick={() => setActiveTab('notices')}
          >
            Notices
          </button>
          <button 
            className={`px-6 py-3 text-sm font-bold border-b-2 ${activeTab === 'orders' ? 'border-gov-blue text-gov-blue' : 'border-transparent text-gray-600 hover:bg-gray-50'}`}
            onClick={() => setActiveTab('orders')}
          >
            Orders
          </button>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input type="text" placeholder="Search by Reference Number or Type" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm font-bold flex items-center gap-2 hover:bg-gray-50">
              <Filter className="h-4 w-4" /> Filter
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-100 text-[#0f1d3a]">
                  <th className="border border-gray-300 p-3 text-left">Notice/Order Type</th>
                  <th className="border border-gray-300 p-3 text-left">Reference Number</th>
                  <th className="border border-gray-300 p-3 text-left">Date of Issuance</th>
                  <th className="border border-gray-300 p-3 text-left">Due Date</th>
                  <th className="border border-gray-300 p-3 text-center">Status</th>
                  <th className="border border-gray-300 p-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={6} className="border border-gray-300 p-8 text-center text-gray-500 font-semibold">
                    No active {activeTab} found for your GSTIN.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
