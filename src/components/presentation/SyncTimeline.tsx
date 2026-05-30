"use client";

import React from "react";
import { CheckCircle } from "lucide-react";
import { TIMELINE_STEPS } from "./mockData";

interface SyncTimelineProps {
  currentStep: number;
}

export const SyncTimeline: React.FC<SyncTimelineProps> = React.memo(({ currentStep }) => {
  return (
    <div className="glass-card p-6 rounded-3xl border border-secondary/10 space-y-4">
      <h4 className="text-xs font-bold uppercase tracking-wider text-white">Fluxo do Processamento</h4>
      
      <div className="relative pl-6 space-y-4 border-l border-white/10 ml-2">
        {TIMELINE_STEPS.map((stepItem) => {
          const isCompleted = currentStep >= stepItem.step;
          const isActive = currentStep === stepItem.step;
          return (
            <div key={stepItem.step} className="relative transition duration-300">
              {/* Dot indicator */}
              <div className={`absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                isCompleted 
                  ? "bg-secondary scale-110 shadow-[0_0_8px_rgba(233,195,73,0.8)]" 
                  : "bg-[#444748]"
              }`} />
              
              <div className={`space-y-0.5 ${isActive ? "text-secondary-fixed font-semibold" : "text-gray-400"}`}>
                <h5 className="text-xs font-bold flex items-center gap-1.5">
                  {stepItem.label}
                  {isCompleted && <CheckCircle className="w-3 h-3 text-secondary" />}
                </h5>
                <p className="text-[10px] text-[#8e9192] leading-tight">{stepItem.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

SyncTimeline.displayName = "SyncTimeline";
