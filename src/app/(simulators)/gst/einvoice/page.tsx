"use client";

import React, { useState } from "react";
import { FileCode, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function GSTEInvoicePage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedIrn, setGeneratedIrn] = useState<string | null>(null);

  const handleGenerateIrn = () => {
    setIsGenerating(true);
    setGeneratedIrn(null);
    
    // Simulate API delay
    setTimeout(() => {
      const mockIrn = Array.from({length: 64}, () => Math.floor(Math.random() * 16).toString(16)).join('');
      setGeneratedIrn(mockIrn);
      setIsGenerating(false);
      toast.success("E-Invoice generated successfully!", {
        description: "IRN has been registered with the IRP."
      });
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="border-b pb-2">
        <h2 className="text-xl font-bold text-gray-800">E-Invoice System</h2>
        <p className="text-sm text-gray-500">Generate Invoice Reference Number (IRN) and QR codes for B2B supplies.</p>
      </div>

      <div className="bg-white border rounded-md shadow-sm p-6 text-center max-w-xl mx-auto space-y-4">
        <FileCode className="h-12 w-12 text-gov-blue mx-auto" />
        <h3 className="text-lg font-bold text-gray-800">Generate IRN / E-Invoice</h3>
        <p className="text-sm text-gray-600">
          This system is integrated with the main GST portal for real-time reporting of business invoices. For academic practice, e-invoice generation is simulated when adding invoices in the <strong>GSTR-1 B2B invoices</strong> table.
        </p>
        
        <div className="pt-4 border-t border-gray-100 flex flex-col items-center space-y-4">
          <button
            onClick={handleGenerateIrn}
            disabled={isGenerating}
            className="bg-gov-blue text-white px-6 py-2.5 rounded shadow-sm font-semibold hover:bg-blue-800 flex items-center justify-center gap-2 transition-all min-w-[200px]"
          >
            {isGenerating ? (
              <><Loader2 className="h-4 w-4 animate-spin" /> Connecting to IRP...</>
            ) : (
              "Generate Mock IRN"
            )}
          </button>
          
          {generatedIrn && (
            <div className="w-full bg-green-50 border border-green-200 p-4 rounded-md text-left space-y-2 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center gap-2 text-green-800 font-bold">
                <CheckCircle2 className="h-5 w-5" />
                IRN Generated Successfully
              </div>
              <div className="text-xs font-mono text-gray-600 break-all bg-white p-2 border border-gray-200 rounded">
                {generatedIrn}
              </div>
              <p className="text-xs text-green-700 mt-2">
                * Note: This is a simulated 64-character hash for academic purposes.
              </p>
            </div>
          )}
        </div>

        <div className="bg-blue-50 border border-blue-200 p-3 rounded text-left text-xs text-gov-blue mt-4">
          <p><strong>Practice tip:</strong> Check the "B2B Invoices" tile in GSTR-1 return preparer to practice details entry.</p>
        </div>
      </div>
    </div>
  );
}
