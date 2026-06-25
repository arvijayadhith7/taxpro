"use client";

import React from "react";
import { NoticeCard } from "@/components/gov/NoticeCard";
import { NOTICES } from "@/lib/mockData";

export default function NoticesPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gov-blue font-display">Notices & Orders</h1>
        <p className="text-sm text-text-muted mt-1">View and respond to communications from the Department</p>
      </div>

      <div className="space-y-4">
        {NOTICES.map((notice) => (
          <NoticeCard 
            key={notice.id} 
            {...notice} 
            onAction={notice.status !== "Closed" && notice.status !== "Resolved" ? () => alert(`Responding to ${notice.id}`) : undefined}
          />
        ))}
      </div>
    </div>
  );
}
