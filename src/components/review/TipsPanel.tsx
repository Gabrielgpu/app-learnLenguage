"use client";

import React from "react";
import { VerbTenseInfo } from "@/data/types";
import { AlertTriangle, AlertCircle } from "lucide-react";

interface TipsPanelProps {
  info: VerbTenseInfo;
}

export default function TipsPanel({ info }: TipsPanelProps) {
  // Use explicit traps if defined, otherwise fall back to observations
  const trapsToDisplay = info.traps && info.traps.length > 0 ? info.traps : info.observations;

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="bg-amber-500/5 border border-amber-500/10 rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-2 border-b border-amber-500/10 pb-3">
          <AlertTriangle className="w-5 h-5 text-amber-500" />
          <h4 className="font-extrabold text-sm text-amber-500 uppercase tracking-wider">
            Atenção às Pegadinhas Comuns
          </h4>
        </div>

        <div className="space-y-3">
          {trapsToDisplay.map((trap, idx) => (
            <div
              key={idx}
              className="p-3.5 bg-zinc-900/50 border border-dark-border/80 hover:border-amber-500/20 rounded-xl flex items-start gap-3 transition-colors group"
            >
              <div className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 text-xs font-bold mt-0.5 group-hover:scale-105 transition-transform">
                <AlertCircle className="w-3.5 h-3.5" />
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-medium whitespace-pre-wrap">
                {trap}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
