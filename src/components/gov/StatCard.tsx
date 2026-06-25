import React from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  subtitle?: string;
  className?: string;
}

export function StatCard({ title, value, icon: Icon, trend, subtitle, className }: StatCardProps) {
  return (
    <div className={cn("bg-white rounded-lg border border-border p-5 shadow-sm flex flex-col", className)}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-text-muted">{title}</h3>
        <div className="p-2 bg-gov-blue-pale rounded-full text-gov-blue">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-auto">
        <div className="text-2xl font-bold text-text">{value}</div>
        {(trend || subtitle) && (
          <div className="mt-2 flex items-center text-xs">
            {trend && (
              <span className={cn("flex items-center font-medium mr-2", trend.isPositive ? "text-gov-green" : "text-gov-red")}>
                {trend.isPositive ? <ArrowUpRight className="h-3 w-3 mr-0.5" /> : <ArrowDownRight className="h-3 w-3 mr-0.5" />}
                {trend.value}
              </span>
            )}
            {subtitle && <span className="text-text-muted">{subtitle}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
