"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function GSTSearchPage() {
  const [gstin, setGstin] = useState("");
  const [result, setResult] = useState<any>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    if (gstin.trim().length === 15) {
      setResult({
        legalName: "ACADEMY TRADERS PRIVATE LIMITED",
        tradeName: "Academy Traders",
        state: "Delhi",
        dateOfReg: "01-Jul-2017",
        taxpayerType: "Regular",
        status: "Active"
      });
    } else {
      setResult(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="border-b pb-2">
        <h2 className="text-xl font-bold text-gray-800">Search Taxpayer by GSTIN</h2>
        <p className="text-sm text-gray-500">Verify a taxpayer's registration details and legal name using their GSTIN.</p>
      </div>

      <div className="bg-white border rounded-md shadow-sm p-6">
        <form onSubmit={handleSearch} className="max-w-md space-y-4">
          <div className="space-y-2">
            <Label htmlFor="gstin-input" className="text-xs font-bold text-gray-600">Enter GSTIN *</Label>
            <div className="flex gap-2">
              <Input
                id="gstin-input"
                placeholder="e.g. 07ABCDE1234F1Z5"
                className="uppercase font-semibold tracking-wider"
                value={gstin}
                onChange={(e) => setGstin(e.target.value.toUpperCase())}
                maxLength={15}
              />
              <button type="submit" className="bg-gov-blue text-white px-4 rounded hover:bg-blue-800 flex items-center gap-1 font-bold text-sm">
                <Search className="h-4 w-4" /> Search
              </button>
            </div>
          </div>
        </form>

        {searched && (
          <div className="mt-6 border-t pt-6">
            {result ? (
              <div className="bg-slate-50 border rounded p-4 space-y-3 max-w-xl text-sm">
                <h3 className="font-bold text-gov-blue border-b pb-2 text-base">Taxpayer Details</h3>
                <div className="grid grid-cols-2 gap-y-2">
                  <div className="text-gray-500">Legal Name:</div>
                  <div className="font-bold text-gray-800">{result.legalName}</div>
                  
                  <div className="text-gray-500">Trade Name:</div>
                  <div className="font-bold text-gray-800">{result.tradeName}</div>
                  
                  <div className="text-gray-500">State jurisdiction:</div>
                  <div className="font-semibold text-gray-850">{result.state}</div>
                  
                  <div className="text-gray-500">Date of Registration:</div>
                  <div className="font-semibold text-gray-850">{result.dateOfReg}</div>
                  
                  <div className="text-gray-500">Taxpayer Type:</div>
                  <div className="font-semibold text-gray-850">{result.taxpayerType}</div>
                  
                  <div className="text-gray-500">GSTIN Status:</div>
                  <div>
                    <span className="bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded text-xs">{result.status}</span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gov-red font-bold">Invalid GSTIN. Please enter a valid 15-character GSTIN (e.g. 07ABCDE1234F1Z5).</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
