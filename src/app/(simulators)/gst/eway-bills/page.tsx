"use client";

import React from "react";
import { Plus, Download, FileSpreadsheet } from "lucide-react";
import { DataTable } from "@/components/gov/DataTable";
import { EWAY_BILLS } from "@/lib/mockData";
import { StatusBadge } from "@/components/gov/StatusBadge";

export default function EWayBillsPage() {
  const columns = [
    { 
      accessorKey: "ewbNo", 
      header: "E-Way Bill No.",
      cell: ({ row }: any) => <span className="font-bold text-gov-blue font-mono">{row.original.ewbNo}</span>
    },
    { accessorKey: "date", header: "Generated Date" },
    { accessorKey: "validUpto", header: "Valid Upto" },
    { accessorKey: "from", header: "From" },
    { accessorKey: "to", header: "To" },
    { 
      accessorKey: "value", 
      header: "Value (₹)",
      cell: ({ row }: any) => `₹ ${row.original.value.toLocaleString("en-IN")}`
    },
    { 
      accessorKey: "status", 
      header: "Status",
      cell: ({ row }: any) => <StatusBadge status={row.original.status} />
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gov-blue font-display">E-Way Bills</h1>
          <p className="text-sm text-text-muted mt-1">Generate and manage goods transit permits</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-border text-gov-blue px-4 py-2 rounded-md text-sm font-medium hover:bg-surface transition-colors flex items-center gap-2">
            <FileSpreadsheet className="h-4 w-4" /> Export CSV
          </button>
          <button className="bg-gov-blue text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gov-blue-light transition-colors flex items-center gap-2">
            <Plus className="h-4 w-4" /> Generate New EWB
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-lg border border-border shadow-sm">
          <h3 className="text-sm text-text-muted mb-1">Active Permits</h3>
          <p className="text-2xl font-bold text-gov-blue">1</p>
        </div>
        <div className="bg-white p-5 rounded-lg border border-border shadow-sm">
          <h3 className="text-sm text-text-muted mb-1">Total Generated (Current Month)</h3>
          <p className="text-2xl font-bold text-text">12</p>
        </div>
        <div className="bg-white p-5 rounded-lg border border-border shadow-sm">
          <h3 className="text-sm text-text-muted mb-1">Cancelled Permits</h3>
          <p className="text-2xl font-bold text-gov-red">0</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border bg-surface">
          <h2 className="text-lg font-bold text-gov-blue">Transit Documents</h2>
        </div>
        <div className="p-4">
          <DataTable columns={columns} data={EWAY_BILLS} searchKey="to" searchPlaceholder="Search by destination..." />
        </div>
      </div>
    </div>
  );
}
