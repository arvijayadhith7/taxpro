"use client";

import React from "react";
import { Download } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/components/gov/DataTable";
import { AIS_SUMMARY } from "@/lib/mockData";

export default function AISPage() {
  const tdsColumns = [
    { accessorKey: "code", header: "Section Code" },
    { accessorKey: "desc", header: "Description" },
    { accessorKey: "count", header: "Transaction Count" },
    { 
      accessorKey: "amount", 
      header: "Amount (₹)",
      cell: ({ row }: any) => `₹ ${row.original.amount.toLocaleString("en-IN")}`
    },
  ];

  const sftColumns = [
    { accessorKey: "code", header: "SFT Code" },
    { accessorKey: "desc", header: "Description" },
    { accessorKey: "count", header: "Transaction Count" },
    { 
      accessorKey: "amount", 
      header: "Amount (₹)",
      cell: ({ row }: any) => `₹ ${row.original.amount.toLocaleString("en-IN")}`
    },
  ];

  const taxColumns = [
    { accessorKey: "type", header: "Tax Type" },
    { accessorKey: "challanNo", header: "Challan Serial No." },
    { accessorKey: "bsr", header: "BSR Code" },
    { accessorKey: "date", header: "Date of Deposit" },
    { 
      accessorKey: "amount", 
      header: "Amount (₹)",
      cell: ({ row }: any) => `₹ ${row.original.amount.toLocaleString("en-IN")}`
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gov-blue font-display">Annual Information Statement (AIS)</h1>
          <p className="text-sm text-text-muted mt-1">Financial Year 2025-26 | PAN: ABCDE1234F</p>
        </div>
        <button className="bg-white border border-border text-gov-blue px-4 py-2 rounded-md text-sm font-medium hover:bg-surface transition-colors flex items-center gap-2">
          <Download className="h-4 w-4" /> Download PDF
        </button>
      </div>

      <div className="bg-white rounded-lg border border-border shadow-sm p-1">
        <Tabs defaultValue="part-b1" className="w-full">
          <TabsList className="w-full justify-start bg-transparent border-b border-border rounded-none h-auto p-0 overflow-x-auto">
            <TabsTrigger value="part-a" className="data-[state=active]:border-b-2 data-[state=active]:border-gov-orange data-[state=active]:text-gov-blue data-[state=active]:shadow-none rounded-none py-3 px-6 text-sm font-medium">
              Part A - General Info
            </TabsTrigger>
            <TabsTrigger value="part-b1" className="data-[state=active]:border-b-2 data-[state=active]:border-gov-orange data-[state=active]:text-gov-blue data-[state=active]:shadow-none rounded-none py-3 px-6 text-sm font-medium">
              Part B1 - TDS/TCS Info
            </TabsTrigger>
            <TabsTrigger value="part-b2" className="data-[state=active]:border-b-2 data-[state=active]:border-gov-orange data-[state=active]:text-gov-blue data-[state=active]:shadow-none rounded-none py-3 px-6 text-sm font-medium">
              Part B2 - SFT Info
            </TabsTrigger>
            <TabsTrigger value="part-b3" className="data-[state=active]:border-b-2 data-[state=active]:border-gov-orange data-[state=active]:text-gov-blue data-[state=active]:shadow-none rounded-none py-3 px-6 text-sm font-medium">
              Part B3 - Payment of Taxes
            </TabsTrigger>
          </TabsList>
          
          <div className="p-6">
            <TabsContent value="part-a" className="mt-0">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-xs text-text-muted mb-1">PAN</p>
                  <p className="text-sm font-semibold">ABCDE1234F</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted mb-1">Name</p>
                  <p className="text-sm font-semibold">JAYESH KUMAR</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted mb-1">Date of Birth</p>
                  <p className="text-sm font-semibold">15/08/1985</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted mb-1">Aadhaar</p>
                  <p className="text-sm font-semibold">Linked</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="part-b1" className="mt-0 space-y-4">
              <h3 className="text-lg font-bold text-gov-blue">Information relating to TDS/TCS</h3>
              <DataTable columns={tdsColumns} data={AIS_SUMMARY.tds} />
            </TabsContent>
            
            <TabsContent value="part-b2" className="mt-0 space-y-4">
              <h3 className="text-lg font-bold text-gov-blue">Information relating to Specified Financial Transactions (SFT)</h3>
              <DataTable columns={sftColumns} data={AIS_SUMMARY.sft} />
            </TabsContent>

            <TabsContent value="part-b3" className="mt-0 space-y-4">
              <h3 className="text-lg font-bold text-gov-blue">Information relating to Payment of Taxes</h3>
              <DataTable columns={taxColumns} data={AIS_SUMMARY.taxes} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
