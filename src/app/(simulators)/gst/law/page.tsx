"use client";

import React from "react";
import { BookOpen } from "lucide-react";

export default function GSTLawPage() {
  const sections = [
    { title: "CGST Act, 2017", desc: "Central Goods and Services Tax Act containing rules for CGST levy and collection." },
    { title: "IGST Act, 2017", desc: "Integrated Goods and Services Tax rules for inter-state transactions." },
    { title: "GST Rules & Rates", desc: "Schedules of rates, notifications, circulars, and notifications." },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="border-b pb-2">
        <h2 className="text-xl font-bold text-gray-800">GST Law & Regulations</h2>
        <p className="text-sm text-gray-500">Access CGST, SGST, IGST Acts, Rules, Notifications and Circulars.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sections.map((sec, idx) => (
          <div key={idx} className="bg-white border rounded-md shadow-sm p-5 space-y-2 flex flex-col justify-between">
            <div>
              <BookOpen className="h-8 w-8 text-gov-blue mb-2" />
              <h3 className="font-bold text-gray-800 text-sm">{sec.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{sec.desc}</p>
            </div>
            <button className="bg-gov-blue text-white text-xs font-bold py-1.5 px-3 rounded mt-4 w-full hover:bg-blue-800">
              Download PDF
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
