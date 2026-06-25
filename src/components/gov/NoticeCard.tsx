import React from "react";
import { AlertCircle, FileText, Calendar, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/gov/StatusBadge";
import { cn } from "@/lib/utils";

interface NoticeCardProps {
  id: string;
  title: string;
  section: string;
  date: string;
  dueDate?: string;
  status: string;
  priority: "high" | "medium" | "low";
  description: string;
  onAction?: () => void;
}

export function NoticeCard({
  id,
  title,
  section,
  date,
  dueDate,
  status,
  priority,
  description,
  onAction
}: NoticeCardProps) {
  return (
    <div className={cn(
      "bg-white rounded-lg border shadow-sm p-5",
      priority === "high" ? "border-l-4 border-l-gov-red border-y-border border-r-border" : 
      priority === "medium" ? "border-l-4 border-l-gov-yellow border-y-border border-r-border" : 
      "border-border"
    )}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex gap-2 items-center">
          <StatusBadge status={status} />
          <span className="text-xs font-mono text-text-muted bg-surface px-2 py-0.5 rounded border border-border">
            Ref: {id}
          </span>
        </div>
        <span className="text-xs text-text-muted flex items-center">
          <Calendar className="h-3 w-3 mr-1" /> Issued: {date}
        </span>
      </div>
      
      <h3 className="text-lg font-bold text-gov-blue mb-1 flex items-center gap-2">
        {priority === "high" && <AlertCircle className="h-4 w-4 text-gov-red" />}
        {title}
      </h3>
      <p className="text-sm font-medium text-text mb-2">Under Section {section}</p>
      
      <p className="text-sm text-text-muted mb-5 line-clamp-2">
        {description}
      </p>
      
      <div className="flex justify-between items-center pt-4 border-t border-border mt-auto">
        <div className="text-sm">
          {dueDate && (
            <span className={cn("font-medium", priority === "high" ? "text-gov-red" : "text-text")}>
              Due Date: {dueDate}
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1">
            <FileText className="h-4 w-4" /> View Notice
          </Button>
          {onAction && (
            <Button size="sm" onClick={onAction} className="bg-gov-blue hover:bg-gov-blue-light gap-1">
              Respond <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
