"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Info, HelpCircle } from "lucide-react";

export default function GSTR3BPage() {
  const [status, setStatus] = useState("Saved");

  const tiles = [
    { 
      id: "3.1", 
      title: "3.1 Tax on outward and reverse charge inward supplies",
      igst: "14,850", cgst: "7,425", sgst: "7,425", cess: "0" 
    },
    { 
      id: "3.2", 
      title: "3.2 Inter-State supplies",
      igst: "0", cgst: "0", sgst: "0", cess: "0" 
    },
    { 
      id: "4", 
      title: "4. Eligible ITC",
      igst: "9,640", cgst: "5,820", sgst: "5,820", cess: "0" 
    },
    { 
      id: "5", 
      title: "5. Exempt, nil and Non GST inward supplies",
      inter: "0", intra: "0" 
    },
    { 
      id: "5.1", 
      title: "5.1 Interest and Late fee",
      igst: "0", cgst: "0", sgst: "0", cess: "0" 
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 border shadow-sm rounded-md">
        <div className="flex items-center gap-3">
          <Link href="/gst/dashboard" className="text-gov-blue hover:bg-blue-50 p-2 rounded-full transition">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-gray-800">GSTR-3B - Monthly Return</h1>
            <div className="flex gap-4 mt-1 text-sm font-semibold text-gray-600">
              <p>GSTIN: <span className="text-gov-blue">07ABCDE1234F1Z5</span></p>
              <p>Financial Year: <span className="text-gov-blue">2026-27</span></p>
              <p>Return Period: <span className="text-gov-blue">April</span></p>
              <p>Status: <span className="text-red-500">Not Filed</span></p>
            </div>
          </div>
        </div>
        <div>
          <button className="flex items-center gap-1 text-sm font-bold text-gov-blue hover:underline">
            <HelpCircle className="h-4 w-4" /> Help
          </button>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 p-3 rounded flex gap-2 text-sm text-gov-blue items-start">
        <Info className="h-5 w-5 mt-0.5 flex-shrink-0" />
        <div>
          <p>Please review your auto-drafted GSTR-3B based on your GSTR-1 and GSTR-2B. Click on the tiles to edit/view details.</p>
          <p className="font-bold mt-1">Due Date: 20/05/2026</p>
        </div>
      </div>

      {/* Tiles Grid */}
      <div className="bg-white border rounded-md shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Tile 3.1 */}
          <div className="border border-gray-300 rounded hover:shadow-md cursor-pointer transition">
            <div className="bg-gray-100 border-b p-3 min-h-[60px] flex items-center justify-center text-center">
              <h3 className="font-bold text-sm text-gray-800">{tiles[0].title}</h3>
            </div>
            <div className="p-4 grid grid-cols-2 gap-y-4 text-center text-sm bg-white">
              <div>
                <p className="text-gray-500 font-semibold">Integrated Tax (₹)</p>
                <p className="font-bold font-mono text-lg">{tiles[0].igst}</p>
              </div>
              <div>
                <p className="text-gray-500 font-semibold">Central Tax (₹)</p>
                <p className="font-bold font-mono text-lg">{tiles[0].cgst}</p>
              </div>
              <div>
                <p className="text-gray-500 font-semibold">State/UT Tax (₹)</p>
                <p className="font-bold font-mono text-lg">{tiles[0].sgst}</p>
              </div>
              <div>
                <p className="text-gray-500 font-semibold">Cess (₹)</p>
                <p className="font-bold font-mono text-lg">{tiles[0].cess}</p>
              </div>
            </div>
          </div>

          {/* Tile 3.2 */}
          <div className="border border-gray-300 rounded hover:shadow-md cursor-pointer transition">
            <div className="bg-gray-100 border-b p-3 min-h-[60px] flex items-center justify-center text-center">
              <h3 className="font-bold text-sm text-gray-800">{tiles[1].title}</h3>
            </div>
            <div className="p-4 grid grid-cols-2 gap-y-4 text-center text-sm bg-white">
              <div>
                <p className="text-gray-500 font-semibold">Integrated Tax (₹)</p>
                <p className="font-bold font-mono text-lg">{tiles[1].igst}</p>
              </div>
            </div>
          </div>

          {/* Tile 4 */}
          <div className="border border-gray-300 rounded hover:shadow-md cursor-pointer transition">
            <div className="bg-gray-100 border-b p-3 min-h-[60px] flex items-center justify-center text-center">
              <h3 className="font-bold text-sm text-gray-800">{tiles[2].title}</h3>
            </div>
            <div className="p-4 grid grid-cols-2 gap-y-4 text-center text-sm bg-white">
              <div>
                <p className="text-gray-500 font-semibold">Integrated Tax (₹)</p>
                <p className="font-bold font-mono text-lg text-gov-blue">{tiles[2].igst}</p>
              </div>
              <div>
                <p className="text-gray-500 font-semibold">Central Tax (₹)</p>
                <p className="font-bold font-mono text-lg">{tiles[2].cgst}</p>
              </div>
              <div>
                <p className="text-gray-500 font-semibold">State/UT Tax (₹)</p>
                <p className="font-bold font-mono text-lg">{tiles[2].sgst}</p>
              </div>
              <div>
                <p className="text-gray-500 font-semibold">Cess (₹)</p>
                <p className="font-bold font-mono text-lg">{tiles[2].cess}</p>
              </div>
            </div>
          </div>

          {/* Tile 5 */}
          <div className="border border-gray-300 rounded hover:shadow-md cursor-pointer transition">
            <div className="bg-gray-100 border-b p-3 min-h-[60px] flex items-center justify-center text-center">
              <h3 className="font-bold text-sm text-gray-800">{tiles[3].title}</h3>
            </div>
            <div className="p-4 grid grid-cols-2 gap-y-4 text-center text-sm bg-white h-[112px] items-center">
              <div>
                <p className="text-gray-500 font-semibold">Inter-State Supplies</p>
                <p className="font-bold font-mono text-lg">{tiles[3].inter}</p>
              </div>
              <div>
                <p className="text-gray-500 font-semibold">Intra-State Supplies</p>
                <p className="font-bold font-mono text-lg">{tiles[3].intra}</p>
              </div>
            </div>
          </div>

          {/* Tile 5.1 */}
          <div className="border border-gray-300 rounded hover:shadow-md cursor-pointer transition md:col-span-2 lg:col-span-1">
            <div className="bg-gray-100 border-b p-3 min-h-[60px] flex items-center justify-center text-center">
              <h3 className="font-bold text-sm text-gray-800">{tiles[4].title}</h3>
            </div>
            <div className="p-4 grid grid-cols-2 gap-y-4 text-center text-sm bg-white">
              <div>
                <p className="text-gray-500 font-semibold">Integrated Tax (₹)</p>
                <p className="font-bold font-mono text-lg">{tiles[4].igst}</p>
              </div>
              <div>
                <p className="text-gray-500 font-semibold">Central Tax (₹)</p>
                <p className="font-bold font-mono text-lg">{tiles[4].cgst}</p>
              </div>
              <div>
                <p className="text-gray-500 font-semibold">State/UT Tax (₹)</p>
                <p className="font-bold font-mono text-lg">{tiles[4].sgst}</p>
              </div>
              <div>
                <p className="text-gray-500 font-semibold">Cess (₹)</p>
                <p className="font-bold font-mono text-lg">{tiles[4].cess}</p>
              </div>
            </div>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-center gap-4 mt-8 pt-6 border-t border-gray-200">
          <button className="bg-white border border-gov-blue text-gov-blue px-6 py-2 rounded text-sm font-bold shadow-sm hover:bg-blue-50">
            SAVE GSTR3B
          </button>
          <button className="bg-gov-blue text-white px-6 py-2 rounded text-sm font-bold shadow-sm hover:bg-blue-800">
            PROCEED TO PAYMENT
          </button>
        </div>

      </div>

      <div className="text-center">
        <Link href="/gst/dashboard" className="text-gov-blue font-bold text-sm hover:underline">
          BACK TO DASHBOARD
        </Link>
      </div>
    </div>
  );
}
