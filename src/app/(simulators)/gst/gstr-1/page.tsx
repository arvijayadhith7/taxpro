"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Info, HelpCircle, Plus, Trash2, Check } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface Invoice {
  receiverGstin: string;
  invoiceNo: string;
  invoiceDate: string;
  taxableValue: number;
  rate: number;
  cgst: number;
  sgst: number;
  igst: number;
}

export default function GSTR1Page() {
  const [activeTab, setActiveTab] = useState("add");
  const [currentView, setCurrentView] = useState<"summary" | "b2b">("summary");
  
  // Invoices list state
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  
  // Form input states
  const [receiverGstin, setReceiverGstin] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("2026-04-20");
  const [taxableValue, setTaxableValue] = useState("");
  const [rate, setRate] = useState("18");

  // Add B2B Invoice handler
  const handleAddInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!receiverGstin || !invoiceNo || !taxableValue) {
      alert("Please fill in all mandatory fields.");
      return;
    }

    const valueNum = Number(taxableValue);
    const rateNum = Number(rate);
    const totalTax = (valueNum * rateNum) / 100;
    
    // Simple state-code check (07 is Delhi, same as our supplier GSTIN 07ABCDE1234F1Z5)
    const isIntrastate = receiverGstin.startsWith("07");
    
    const cgst = isIntrastate ? totalTax / 2 : 0;
    const sgst = isIntrastate ? totalTax / 2 : 0;
    const igst = isIntrastate ? 0 : totalTax;

    const newInvoice: Invoice = {
      receiverGstin: receiverGstin.toUpperCase(),
      invoiceNo,
      invoiceDate,
      taxableValue: valueNum,
      rate: rateNum,
      cgst,
      sgst,
      igst,
    };

    setInvoices([...invoices, newInvoice]);
    
    // Reset Form
    setReceiverGstin("");
    setInvoiceNo("");
    setTaxableValue("");
    alert("B2B Invoice added successfully!");
  };

  const handleDeleteInvoice = (idx: number) => {
    setInvoices(invoices.filter((_, i) => i !== idx));
  };

  const totalB2bTaxable = invoices.reduce((acc, curr) => acc + curr.taxableValue, 0);
  const totalB2bIgst = invoices.reduce((acc, curr) => acc + curr.igst, 0);
  const totalB2bCgst = invoices.reduce((acc, curr) => acc + curr.cgst, 0);
  const totalB2bSgst = invoices.reduce((acc, curr) => acc + curr.sgst, 0);

  const tiles = [
    { id: "b2b", title: "4A, 4B, 4C, 6B, 6C - B2B Invoices", count: invoices.length, saved: invoices.length },
    { id: "b2cl", title: "5A, 5B - B2C (Large) Invoices", count: 0, saved: 0 },
    { id: "exp", title: "6A - Exports Invoices", count: 0, saved: 0 },
    { id: "b2cs", title: "7 - B2C (Others)", count: 0, saved: 0 },
    { id: "nil", title: "8A, 8B, 8C, 8D - Nil Rated Supplies", count: 0, saved: 0 },
    { id: "cdnr", title: "9B - Credit / Debit Notes (Registered)", count: 0, saved: 0 },
    { id: "cdnur", title: "9B - Credit / Debit Notes (Unregistered)", count: 0, saved: 0 },
    { id: "adv", title: "11A(1), 11A(2) - Tax Liability (Advances Received)", count: 0, saved: 0 },
    { id: "adj", title: "11B(1), 11B(2) - Adjustment of Advances", count: 0, saved: 0 },
    { id: "hsn", title: "12 - HSN-wise-summary of outward supplies", count: invoices.length > 0 ? 1 : 0, saved: invoices.length > 0 ? 1 : 0 },
    { id: "docs", title: "13 - Documents Issued", count: invoices.length > 0 ? 1 : 0, saved: invoices.length > 0 ? 1 : 0 },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 text-sm">
      
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 border shadow-sm rounded-md">
        <div className="flex items-center gap-3">
          {currentView === "b2b" ? (
            <button onClick={() => setCurrentView("summary")} className="text-gov-blue hover:bg-blue-50 p-2 rounded-full transition">
              <ArrowLeft className="h-5 w-5" />
            </button>
          ) : (
            <Link href="/gst/dashboard" className="text-gov-blue hover:bg-blue-50 p-2 rounded-full transition">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          )}
          <div>
            <h1 className="text-xl font-bold text-gray-800">
              {currentView === "b2b" ? "GSTR-1 - B2B Invoice Entry (Table 4A, 4B)" : "GSTR-1 - Details of outward supplies of goods or services"}
            </h1>
            <div className="flex gap-4 mt-1 text-xs font-semibold text-gray-600">
              <p>GSTIN: <span className="text-gov-blue">07ABCDE1234F1Z5</span></p>
              <p>Financial Year: <span className="text-gov-blue">2026-27</span></p>
              <p>Return Period: <span className="text-gov-blue">April</span></p>
              <p>Status: <span className="text-red-500">{invoices.length > 0 ? "Draft Saved" : "Not Filed"}</span></p>
            </div>
          </div>
        </div>
        <div>
          <button className="flex items-center gap-1 text-xs font-bold text-gov-blue hover:underline">
            <HelpCircle className="h-4 w-4" /> Help
          </button>
        </div>
      </div>

      {currentView === "summary" ? (
        <>
          <div className="bg-blue-50 border border-blue-200 p-3 rounded flex gap-2 text-xs text-gov-blue items-start">
            <Info className="h-5 w-5 mt-0.5 flex-shrink-0" />
            <div>
              <p>You can add or amend records in the respective tables. <strong>Click on the B2B Invoices tile to enter simulated invoices.</strong></p>
              <p className="font-bold mt-1">Due Date: 11/05/2026</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white border rounded-md shadow-sm overflow-hidden">
            <div className="flex border-b">
              <button 
                className={`flex-1 py-3 text-center font-bold text-xs ${activeTab === 'add' ? 'bg-gov-blue text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setActiveTab("add")}
              >
                ADD RECORD DETAILS
              </button>
              <button 
                className={`flex-1 py-3 text-center font-bold text-xs ${activeTab === 'amend' ? 'bg-gov-blue text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setActiveTab("amend")}
              >
                AMEND RECORD DETAILS
              </button>
            </div>

            {/* Tiles Grid */}
            <div className="p-6">
              {activeTab === "add" && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {tiles.map((tile) => (
                    <div 
                      key={tile.id} 
                      onClick={() => tile.id === 'b2b' && setCurrentView("b2b")}
                      className={`border rounded-md hover:shadow-md transition cursor-pointer flex flex-col overflow-hidden group ${tile.id === 'b2b' ? 'ring-2 ring-gov-blue/20 hover:border-gov-blue' : ''}`}
                    >
                      <div className="bg-gray-100 border-b p-3 min-h-[60px] flex items-center justify-center text-center group-hover:bg-gov-blue group-hover:text-white transition">
                        <h3 className="font-bold text-xs leading-tight">{tile.title}</h3>
                      </div>
                      <div className="p-4 flex-grow flex flex-col justify-center items-center gap-2 bg-white">
                        <p className="text-gray-500 text-[10px]">Total Processed Records</p>
                        <p className="text-2xl font-bold text-gov-blue">{tile.count}</p>
                        <div className="w-full h-px bg-gray-200 my-1"></div>
                        <p className="text-gray-500 text-[10px]">Saved Records</p>
                        <p className="text-base font-bold text-gray-700">{tile.saved}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-between items-center bg-white p-4 border shadow-sm rounded-md">
            <div>
              <p className="font-bold text-gray-700">Summary Tax Value: ₹ {totalB2bTaxable.toLocaleString("en-IN")}</p>
              <p className="text-xs text-gray-500">CGST: ₹ {totalB2bCgst.toLocaleString("en-IN")} | SGST: ₹ {totalB2bSgst.toLocaleString("en-IN")} | IGST: ₹ {totalB2bIgst.toLocaleString("en-IN")}</p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => alert("GSTR-1 summary generated successfully based on entered B2B invoices.")}
                className="bg-white border border-gov-blue text-gov-blue px-6 py-2 rounded text-xs font-bold shadow-sm hover:bg-blue-50"
              >
                GENERATE SUMMARY
              </button>
            </div>
          </div>
        </>
      ) : (
        /* B2B Invoices Detailed Entry screen */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Add Invoice Form */}
          <div className="bg-white border rounded-md shadow-sm p-5 space-y-4 h-fit">
            <h3 className="font-bold text-base text-[#112a52] border-b pb-2">Add New B2B Invoice</h3>
            
            <form onSubmit={handleAddInvoice} className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="receiver-gstin">Receiver GSTIN *</Label>
                <Input 
                  id="receiver-gstin" 
                  placeholder="e.g. 07ABCDE5678R1Z9" 
                  value={receiverGstin}
                  onChange={e => setReceiverGstin(e.target.value.toUpperCase())}
                  maxLength={15}
                  className="uppercase font-semibold"
                />
                <span className="text-[10px] text-gray-500">Use 07 prefix for Intra-state (Delhi), others for Inter-state.</span>
              </div>

              <div className="space-y-1">
                <Label htmlFor="inv-no">Invoice Number *</Label>
                <Input 
                  id="inv-no" 
                  placeholder="e.g. INV-001" 
                  value={invoiceNo}
                  onChange={e => setInvoiceNo(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="inv-date">Invoice Date *</Label>
                <Input 
                  id="inv-date" 
                  type="date"
                  value={invoiceDate}
                  onChange={e => setInvoiceDate(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="tax-val">Taxable Value (₹) *</Label>
                <Input 
                  id="inv-val" 
                  type="number"
                  placeholder="e.g. 10000" 
                  value={taxableValue}
                  onChange={e => setTaxableValue(e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="gst-rate">GST Rate (%) *</Label>
                <select 
                  id="gst-rate" 
                  className="w-full border p-2 rounded bg-white text-sm"
                  value={rate}
                  onChange={e => setRate(e.target.value)}
                >
                  <option value="5">5%</option>
                  <option value="12">12%</option>
                  <option value="18">18%</option>
                  <option value="28">28%</option>
                </select>
              </div>

              <button 
                type="submit" 
                className="w-full bg-gov-blue text-white py-2 rounded text-xs font-bold hover:bg-blue-800 flex items-center justify-center gap-1 mt-4"
              >
                <Plus className="h-4 w-4" /> Save Invoice
              </button>
            </form>
          </div>

          {/* Invoices List */}
          <div className="bg-white border rounded-md shadow-sm p-5 lg:col-span-2 space-y-4">
            <h3 className="font-bold text-base text-[#112a52] border-b pb-2">Uploaded B2B Invoices</h3>
            
            {invoices.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p>No invoices added yet. Enter invoice details on the left to practice GSTR-1 data entry.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b text-gray-700">
                      <th className="p-2">Invoice No</th>
                      <th className="p-2">Receiver GSTIN</th>
                      <th className="p-2 text-right">Taxable Val (₹)</th>
                      <th className="p-2 text-right">Rate</th>
                      <th className="p-2 text-right">CGST (₹)</th>
                      <th className="p-2 text-right">SGST (₹)</th>
                      <th className="p-2 text-right">IGST (₹)</th>
                      <th className="p-2 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {invoices.map((inv, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="p-2 font-bold">{inv.invoiceNo}</td>
                        <td className="p-2 font-mono">{inv.receiverGstin}</td>
                        <td className="p-2 text-right font-mono">{inv.taxableValue.toLocaleString("en-IN")}</td>
                        <td className="p-2 text-right">{inv.rate}%</td>
                        <td className="p-2 text-right font-mono text-gray-600">{inv.cgst.toLocaleString("en-IN")}</td>
                        <td className="p-2 text-right font-mono text-gray-600">{inv.sgst.toLocaleString("en-IN")}</td>
                        <td className="p-2 text-right font-mono text-gov-blue">{inv.igst.toLocaleString("en-IN")}</td>
                        <td className="p-2 text-center">
                          <button onClick={() => handleDeleteInvoice(idx)} className="text-red-500 hover:text-red-700 p-1">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            <div className="flex justify-end pt-4 border-t">
              <button 
                onClick={() => setCurrentView("summary")}
                className="bg-gov-blue text-white px-6 py-2 rounded text-xs font-bold hover:bg-blue-800"
              >
                Back to Tiles View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
