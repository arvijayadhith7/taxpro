"use client";

import React from "react";
import { HelpCircle, Phone, Mail } from "lucide-react";

export default function GSTHelpPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="border-b pb-2">
        <h2 className="text-xl font-bold text-gray-800">GST Help & Support</h2>
        <p className="text-sm text-gray-500">Contact the GST Helpdesk or download user manuals.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border rounded-md shadow-sm p-5 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b">
            <HelpCircle className="h-6 w-6 text-gov-blue" />
            <h3 className="font-bold text-gray-800 text-base">Frequently Asked Questions</h3>
          </div>
          <ul className="space-y-3 text-sm">
            <li>
              <h4 className="font-bold text-gray-700">How to file GSTR-1?</h4>
              <p className="text-xs text-gray-500 mt-1">GSTR-1 must be filed before the 11th of the succeeding month with details of all outward supplies.</p>
            </li>
            <li>
              <h4 className="font-bold text-gray-700">What is GSTR-3B?</h4>
              <p className="text-xs text-gray-500 mt-1">GSTR-3B is a monthly self-declaration return containing summary details of outward supplies and input tax credit claimed.</p>
            </li>
          </ul>
        </div>

        <div className="bg-white border rounded-md shadow-sm p-5 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b">
            <Phone className="h-6 w-6 text-gov-blue" />
            <h3 className="font-bold text-gray-800 text-base">GST Helpdesk</h3>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-400" />
              <span>Toll Free: 1800-103-4786</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-400" />
              <span>Email: helpdesk@gst.gov.in</span>
            </div>
            <p className="text-xs text-gray-500 italic mt-2">Operating Hours: 9:00 AM to 9:00 PM (Monday to Saturday)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
