"use client";

import React from "react";
import { DataTable } from "@/components/gov/DataTable";
import { GST_INVOICES } from "@/lib/mockData";
import { StatusBadge } from "@/components/gov/StatusBadge";
import { Plus } from "lucide-react";

export default function InvoicesPage() {
  const columns = [
    { accessorKey: "id", header: "Invoice Number" },
    { accessorKey: "date", header: "Date" },
    { accessorKey: "recipient", header: "Recipient Name" },
    { accessorKey: "gstin", header: "GSTIN/UIN" },
    { 
      accessorKey: "value", 
      header: "Taxable Value (₹)",
      cell: ({ row }: any) => row.original.value.toLocaleString("en-IN")
    },
    { 
      accessorKey: "tax", 
      header: "Tax Amount (₹)",
      cell: ({ row }: any) => row.original.tax.toLocaleString("en-IN")
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
          <h1 className="text-2xl font-bold text-gov-blue font-display">Invoice Management System (IRP)</h1>
          <p className="text-sm text-text-muted mt-1">Manage e-Invoices and outward supplies</p>
        </div>
        <button className="bg-gov-blue text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gov-blue-light transition-colors flex items-center gap-2">
          <Plus className="h-4 w-4" /> Add Invoice
        </button>
      </div>

      <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border bg-surface">
          <h2 className="text-lg font-bold text-gov-blue">B2B Invoices - April 2026</h2>
        </div>
        <div className="p-4">
          <DataTable 
            columns={columns} 
            data={GST_INVOICES} 
            searchKey="recipient" 
            searchPlaceholder="Search by Recipient Name..."
            onExport={() => alert("Exporting CSV...")}
          />
        </div>
      </div>
    </div>
  );
}
