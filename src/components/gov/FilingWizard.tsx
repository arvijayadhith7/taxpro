import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Step {
  id: string;
  title: string;
  description?: string;
}

interface FilingWizardProps {
  steps: Step[];
  currentStep: number;
  children: React.ReactNode;
  onNext?: () => void;
  onPrev?: () => void;
  onComplete?: () => void;
  isNextDisabled?: boolean;
  nextLabel?: string;
}

export function FilingWizard({
  steps,
  currentStep,
  children,
  onNext,
  onPrev,
  onComplete,
  isNextDisabled,
  nextLabel = "Save & Next"
}: FilingWizardProps) {
  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="flex flex-col h-full">
      {/* Progress Header */}
      <div className="bg-white border-b border-border px-6 py-4 overflow-x-auto">
        <nav aria-label="Progress" className="min-w-max">
          <ol role="list" className="flex items-center">
            {steps.map((step, index) => {
              const isCompleted = index < currentStep;
              const isCurrent = index === currentStep;
              
              return (
                <li key={step.id} className={cn("relative flex-shrink-0", index !== steps.length - 1 ? "pr-8 sm:pr-20" : "")}>
                  <div className="flex items-center">
                    <div
                      className={cn(
                        "relative flex h-8 w-8 items-center justify-center rounded-full border-2",
                        isCompleted
                          ? "border-gov-green bg-gov-green text-white"
                          : isCurrent
                          ? "border-gov-blue bg-white text-gov-blue"
                          : "border-border bg-white text-text-muted"
                      )}
                    >
                      {isCompleted ? (
                        <Check className="h-4 w-4 text-white" aria-hidden="true" />
                      ) : (
                        <span className="text-sm font-medium">{index + 1}</span>
                      )}
                    </div>
                    <div className="hidden sm:block ml-3">
                      <p className={cn("text-xs font-bold uppercase tracking-wide", 
                        isCompleted ? "text-gov-green" : isCurrent ? "text-gov-blue" : "text-text-muted"
                      )}>
                        {step.title}
                      </p>
                    </div>
                  </div>
                  {/* Connector Line */}
                  {index !== steps.length - 1 && (
                    <div
                      className={cn(
                        "absolute top-4 left-10 -ml-px h-0.5 w-full sm:w-16 transition-colors",
                        isCompleted ? "bg-gov-green" : "bg-border"
                      )}
                    />
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 bg-surface">
        <div className="bg-white rounded-lg border border-border shadow-sm p-6 min-h-[400px]">
          {children}
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="bg-white border-t border-border px-6 py-4 flex items-center justify-between sticky bottom-0 z-10">
        <button
          onClick={onPrev}
          disabled={currentStep === 0}
          className="px-6 py-2 border border-border rounded-md text-sm font-medium text-text bg-white hover:bg-surface disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Back
        </button>
        
        <div className="flex gap-3">
          <button className="px-6 py-2 border border-gov-blue text-gov-blue rounded-md text-sm font-medium hover:bg-gov-blue-pale transition-colors">
            Save Draft
          </button>
          
          {isLastStep ? (
            <button
              onClick={onComplete}
              disabled={isNextDisabled}
              className="px-6 py-2 bg-gov-green text-white rounded-md text-sm font-medium hover:bg-green-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isNextDisabled ? "Submitting..." : "Submit Return"}
            </button>
          ) : (
            <button
              onClick={onNext}
              disabled={isNextDisabled}
              className="px-6 py-2 bg-gov-blue text-white rounded-md text-sm font-medium hover:bg-gov-blue-light transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {nextLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
