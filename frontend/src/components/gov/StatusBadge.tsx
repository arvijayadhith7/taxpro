import React from "react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export type StatusType = "success" | "warning" | "error" | "info" | "default";

interface StatusBadgeProps {
  status: string;
  type?: StatusType;
  className?: string;
}

export function StatusBadge({ status, type, className }: StatusBadgeProps) {
  // Auto-determine type based on text if not explicitly provided
  let badgeType = type;
  if (!badgeType) {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes("success") || lowerStatus.includes("processed") || lowerStatus.includes("verified") || lowerStatus.includes("paid")) {
      badgeType = "success";
    } else if (lowerStatus.includes("pending") || lowerStatus.includes("awaiting") || lowerStatus.includes("submitted")) {
      badgeType = "warning";
    } else if (lowerStatus.includes("error") || lowerStatus.includes("overdue") || lowerStatus.includes("rejected") || lowerStatus.includes("failed")) {
      badgeType = "error";
    } else if (lowerStatus.includes("draft") || lowerStatus.includes("info")) {
      badgeType = "info";
    } else {
      badgeType = "default";
    }
  }

  const variants = {
    success: "bg-green-100 text-gov-green border-green-200 hover:bg-green-100",
    warning: "bg-yellow-100 text-gov-yellow border-yellow-200 hover:bg-yellow-100",
    error: "bg-red-100 text-gov-red border-red-200 hover:bg-red-100",
    info: "bg-blue-100 text-gov-blue border-blue-200 hover:bg-blue-100",
    default: "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-100",
  };

  return (
    <Badge variant="outline" className={cn("font-medium", variants[badgeType], className)}>
      {status}
    </Badge>
  );
}
