import React from "react";
import { cn } from "@/lib/utils";

interface ComplianceScoreProps {
  score: number; // 0 to 100
  title?: string;
  subtitle?: string;
  className?: string;
}

export function ComplianceScore({ score, title = "Compliance Rating", subtitle = "Excellent", className }: ComplianceScoreProps) {
  // Determine color based on score
  const getColor = (val: number) => {
    if (val >= 90) return "text-gov-green";
    if (val >= 70) return "text-gov-yellow";
    return "text-gov-red";
  };
  
  const getStrokeColor = (val: number) => {
    if (val >= 90) return "stroke-gov-green";
    if (val >= 70) return "stroke-gov-yellow";
    return "stroke-gov-red";
  };

  const colorClass = getColor(score);
  const strokeClass = getStrokeColor(score);
  
  // SVG properties for the circular gauge
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className={cn("flex flex-col items-center justify-center p-4 bg-white rounded-lg border border-border shadow-sm", className)}>
      <h3 className="text-sm font-bold text-gov-blue mb-4 uppercase tracking-wider">{title}</h3>
      
      <div className="relative flex items-center justify-center">
        {/* Background Circle */}
        <svg className="transform -rotate-90 w-32 h-32">
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-surface"
          />
          {/* Progress Circle */}
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={cn("transition-all duration-1000 ease-out", strokeClass)}
            strokeLinecap="round"
          />
        </svg>
        
        {/* Score Text inside circle */}
        <div className="absolute flex flex-col items-center justify-center">
          <span className={cn("text-3xl font-extrabold tracking-tighter", colorClass)}>
            {score}
          </span>
          <span className="text-[10px] text-text-muted font-bold uppercase">/ 100</span>
        </div>
      </div>
      
      {subtitle && (
        <p className={cn("mt-4 text-sm font-medium", colorClass)}>
          Status: {subtitle}
        </p>
      )}
    </div>
  );
}
