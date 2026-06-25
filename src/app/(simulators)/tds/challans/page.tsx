"use client";

import React from "react";
import { Download, Plus } from "lucide-react";
import { DataTable } from "@/components/gov/DataTable";
import { TDS_CHALLANS } from "@/lib/mockData";
import { StatusBadge } from "@/components/gov/StatusBadge";

export default function TDSChallansPage() {
  const columns = [
    { accessorKey: "challanNo", header: "Challan No." },
    { accessorKey: "bsr", header: "BSR Code" },
    { accessorKey: "date", header: "Date of Deposit" },
    { accessorKey: "section", header: "Section Code" },
    { 
      accessorKey: "amount", 
      header: "Amount (₹)",
      cell: ({ row }: any) => `₹ ${row.original.amount.toLocaleString("en-IN")}`
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
          <h1 className="text-2xl font-bold text-gov-blue font-display">TDS Challan Status Inquiry</h1>
          <p className="text-sm text-text-muted mt-1">TAN: DELA12345B | ACME CORP LTD</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-border text-gov-blue px-4 py-2 rounded-md text-sm font-medium hover:bg-surface transition-colors flex items-center gap-2">
            <Download className="h-4 w-4" /> Download CSI File
          </button>
          <button className="bg-gov-blue text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gov-blue-light transition-colors flex items-center gap-2">
            <Plus className="h-4 w-4" /> Add Challan
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border bg-surface">
          <h2 className="text-lg font-bold text-gov-blue">Challan Details - Financial Year 2026-27</h2>
        </div>
        <div className="p-4">
          <DataTable columns={columns} data={TDS_CHALLANS} />
        </div>
      </div>
    </div>
  );
}
