"use client";

import React, { useState } from "react";
import { Download, FileText, Printer } from "lucide-react";
import { useSession } from "next-auth/react";

export default function Form26ASPage() {
  const { data: session } = useSession();
  
  const [expandedRow, setExpandedRow] = useState<string | null>("deductor-1");

  return (
    <div className="max-w-5xl mx-auto space-y-6 font-sans">
      
      {/* TRACES Top Header Bar (matches actual HTML export) */}
      <div className="flex justify-between items-end border-b-2 border-gray-400 pb-2 mb-6">
        <div>
          <h1 className="text-xl font-bold text-[#b42e12]">Annual Tax Statement under Section 203AA of the Income-tax Act, 1961</h1>
          <h2 className="text-lg font-bold text-gray-800">Form 26AS</h2>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1 text-sm bg-gray-100 border border-gray-300 px-3 py-1 hover:bg-gray-200">
            <Printer className="h-4 w-4" /> Print
          </button>
          <button className="flex items-center gap-1 text-sm bg-gray-100 border border-gray-300 px-3 py-1 hover:bg-gray-200">
            <Download className="h-4 w-4" /> Export as PDF
          </button>
        </div>
      </div>

      {/* Taxpayer Details Table */}
      <table className="w-full text-xs border-collapse border border-black">
        <tbody>
          <tr>
            <td className="border border-black p-1.5 font-bold bg-[#f4f4f4] w-[20%]">Permanent Account Number</td>
            <td className="border border-black p-1.5 font-bold uppercase w-[30%]">{session?.user?.pan || "ABCDE1234F"}</td>
            <td className="border border-black p-1.5 font-bold bg-[#f4f4f4] w-[20%]">Financial Year</td>
            <td className="border border-black p-1.5 font-bold w-[30%]">2025-26</td>
          </tr>
          <tr>
            <td className="border border-black p-1.5 font-bold bg-[#f4f4f4]">Status of PAN</td>
            <td className="border border-black p-1.5 font-bold">Active</td>
            <td className="border border-black p-1.5 font-bold bg-[#f4f4f4]">Assessment Year</td>
            <td className="border border-black p-1.5 font-bold">2026-27</td>
          </tr>
          <tr>
            <td className="border border-black p-1.5 font-bold bg-[#f4f4f4]">Name of Assessee</td>
            <td colSpan={3} className="border border-black p-1.5 font-bold">{session?.user?.name || "TAXPAYER NAME"}</td>
          </tr>
          <tr>
            <td className="border border-black p-1.5 font-bold bg-[#f4f4f4]">Address of Assessee</td>
            <td colSpan={3} className="border border-black p-1.5">123, TAXPAYER STREET, CHENNAI, TAMIL NADU - 600001</td>
          </tr>
        </tbody>
      </table>

      {/* PART A */}
      <div className="mt-8">
        <h3 className="text-[13px] font-bold text-white bg-[#5588c8] p-1.5 border border-black border-b-0">
          PART A - Details of Tax Deducted at Source
        </h3>
        <table className="w-full text-xs border-collapse border border-black text-center">
          <thead>
            <tr className="bg-[#d3e3f6]">
              <th className="border border-black p-1.5">Sr. No.</th>
              <th className="border border-black p-1.5">Name of Deductor</th>
              <th className="border border-black p-1.5">TAN of Deductor</th>
              <th className="border border-black p-1.5">Total Amount Paid / Credited (Rs.)</th>
              <th className="border border-black p-1.5">Total Tax Deducted (Rs.)</th>
              <th className="border border-black p-1.5">Total TDS Deposited (Rs.)</th>
            </tr>
          </thead>
          <tbody>
            {/* Deductor 1 Header */}
            <tr className="bg-gray-50 font-bold hover:bg-gray-100 cursor-pointer" onClick={() => setExpandedRow(expandedRow === "deductor-1" ? null : "deductor-1")}>
              <td className="border border-black p-1.5 text-blue-600 underline">1 {expandedRow === "deductor-1" ? "[-]" : "[+]"}</td>
              <td className="border border-black p-1.5 text-left">TECH SOLUTIONS PVT LTD</td>
              <td className="border border-black p-1.5">MUMT12345C</td>
              <td className="border border-black p-1.5 text-right">8,50,000.00</td>
              <td className="border border-black p-1.5 text-right">45,000.00</td>
              <td className="border border-black p-1.5 text-right">45,000.00</td>
            </tr>
            {/* Deductor 1 Transactions (Expandable) */}
            {expandedRow === "deductor-1" && (
              <tr>
                <td colSpan={6} className="border border-black p-0">
                  <table className="w-full text-xs border-collapse bg-[#ffffee]">
                    <thead>
                      <tr className="bg-[#fff9c4]">
                        <th className="border border-black p-1">Sr. No.</th>
                        <th className="border border-black p-1">Section Under Which Deduction Made</th>
                        <th className="border border-black p-1">Transaction Date</th>
                        <th className="border border-black p-1">Amount Paid / Credited (Rs.)</th>
                        <th className="border border-black p-1">Tax Deducted (Rs.)</th>
                        <th className="border border-black p-1">Tax Deposited (Rs.)</th>
                        <th className="border border-black p-1">Date of Deposit</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-black p-1 text-center">1</td>
                        <td className="border border-black p-1 text-center">192 (Salary)</td>
                        <td className="border border-black p-1 text-center">31-Jul-2025</td>
                        <td className="border border-black p-1 text-right">2,83,333.33</td>
                        <td className="border border-black p-1 text-right">15,000.00</td>
                        <td className="border border-black p-1 text-right">15,000.00</td>
                        <td className="border border-black p-1 text-center">07-Aug-2025</td>
                      </tr>
                      <tr>
                        <td className="border border-black p-1 text-center">2</td>
                        <td className="border border-black p-1 text-center">192 (Salary)</td>
                        <td className="border border-black p-1 text-center">31-Oct-2025</td>
                        <td className="border border-black p-1 text-right">2,83,333.33</td>
                        <td className="border border-black p-1 text-right">15,000.00</td>
                        <td className="border border-black p-1 text-right">15,000.00</td>
                        <td className="border border-black p-1 text-center">07-Nov-2025</td>
                      </tr>
                      <tr>
                        <td className="border border-black p-1 text-center">3</td>
                        <td className="border border-black p-1 text-center">31-Jan-2026</td>
                        <td className="border border-black p-1 text-center">192 (Salary)</td>
                        <td className="border border-black p-1 text-right">2,83,333.34</td>
                        <td className="border border-black p-1 text-right">15,000.00</td>
                        <td className="border border-black p-1 text-right">15,000.00</td>
                        <td className="border border-black p-1 text-center">07-Feb-2026</td>
                      </tr>
                      <tr className="font-bold bg-[#fff9c4]">
                        <td colSpan={3} className="border border-black p-1 text-right">Total</td>
                        <td className="border border-black p-1 text-right">8,50,000.00</td>
                        <td className="border border-black p-1 text-right">45,000.00</td>
                        <td className="border border-black p-1 text-right">45,000.00</td>
                        <td className="border border-black p-1"></td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            )}

            {/* Deductor 2 Header */}
            <tr className="bg-gray-50 font-bold hover:bg-gray-100 cursor-pointer" onClick={() => setExpandedRow(expandedRow === "deductor-2" ? null : "deductor-2")}>
              <td className="border border-black p-1.5 text-blue-600 underline">2 {expandedRow === "deductor-2" ? "[-]" : "[+]"}</td>
              <td className="border border-black p-1.5 text-left">STATE BANK OF INDIA</td>
              <td className="border border-black p-1.5">SBIN000123</td>
              <td className="border border-black p-1.5 text-right">45,000.00</td>
              <td className="border border-black p-1.5 text-right">4,500.00</td>
              <td className="border border-black p-1.5 text-right">4,500.00</td>
            </tr>
            {/* Deductor 2 Transactions (Expandable) */}
            {expandedRow === "deductor-2" && (
              <tr>
                <td colSpan={6} className="border border-black p-0">
                  <table className="w-full text-xs border-collapse bg-[#ffffee]">
                    <thead>
                      <tr className="bg-[#fff9c4]">
                        <th className="border border-black p-1">Sr. No.</th>
                        <th className="border border-black p-1">Section Under Which Deduction Made</th>
                        <th className="border border-black p-1">Transaction Date</th>
                        <th className="border border-black p-1">Amount Paid / Credited (Rs.)</th>
                        <th className="border border-black p-1">Tax Deducted (Rs.)</th>
                        <th className="border border-black p-1">Tax Deposited (Rs.)</th>
                        <th className="border border-black p-1">Date of Deposit</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-black p-1 text-center">1</td>
                        <td className="border border-black p-1 text-center">194A (Interest)</td>
                        <td className="border border-black p-1 text-center">31-Mar-2026</td>
                        <td className="border border-black p-1 text-right">45,000.00</td>
                        <td className="border border-black p-1 text-right">4,500.00</td>
                        <td className="border border-black p-1 text-right">4,500.00</td>
                        <td className="border border-black p-1 text-center">07-Apr-2026</td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            )}

            {/* Total Row */}
            <tr className="bg-[#d3e3f6] font-bold">
              <td colSpan={3} className="border border-black p-1.5 text-right">Total</td>
              <td className="border border-black p-1.5 text-right">8,95,000.00</td>
              <td className="border border-black p-1.5 text-right">49,500.00</td>
              <td className="border border-black p-1.5 text-right">49,500.00</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* PART C */}
      <div className="mt-8">
        <h3 className="text-[13px] font-bold text-white bg-[#5588c8] p-1.5 border border-black border-b-0">
          PART C - Details of Tax Paid (other than TDS or TCS)
        </h3>
        <table className="w-full text-xs border-collapse border border-black text-center">
          <thead>
            <tr className="bg-[#d3e3f6]">
              <th className="border border-black p-1.5">Sr. No.</th>
              <th className="border border-black p-1.5">Major Head</th>
              <th className="border border-black p-1.5">Minor Head</th>
              <th className="border border-black p-1.5">Tax (Rs.)</th>
              <th className="border border-black p-1.5">Surcharge (Rs.)</th>
              <th className="border border-black p-1.5">Education Cess (Rs.)</th>
              <th className="border border-black p-1.5">Others (Rs.)</th>
              <th className="border border-black p-1.5">Total Tax (Rs.)</th>
              <th className="border border-black p-1.5">BSR Code</th>
              <th className="border border-black p-1.5">Date of Deposit</th>
              <th className="border border-black p-1.5">Challan Serial Number</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black p-1.5">1</td>
              <td className="border border-black p-1.5">021 (Income Tax)</td>
              <td className="border border-black p-1.5">100 (Advance Tax)</td>
              <td className="border border-black p-1.5 text-right">10,000.00</td>
              <td className="border border-black p-1.5 text-right">0.00</td>
              <td className="border border-black p-1.5 text-right">0.00</td>
              <td className="border border-black p-1.5 text-right">0.00</td>
              <td className="border border-black p-1.5 text-right font-bold">10,000.00</td>
              <td className="border border-black p-1.5">1234567</td>
              <td className="border border-black p-1.5">15-Dec-2025</td>
              <td className="border border-black p-1.5">98765</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="text-[10px] text-gray-500 mt-8 mb-8 text-center italic">
        * This is a simulated TRACES Form 26AS matching the actual HTML output for academic practice.
      </div>

    </div>
  );
}
