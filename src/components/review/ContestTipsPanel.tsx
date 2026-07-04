"use client";

import React from "react";
import { VerbTenseInfo } from "@/data/types";
import { Target, Trophy } from "lucide-react";

interface ContestTipsPanelProps {
  info: VerbTenseInfo;
}

export default function ContestTipsPanel({ info }: ContestTipsPanelProps) {
  // Use explicit contestTips if defined, otherwise fallback to a generic message + observations
  const tipsToDisplay = info.contestTips && info.contestTips.length > 0 ? info.contestTips : info.observations;

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="bg-brand-purple/5 border border-brand-purple/10 rounded-2xl p-5 space-y-4">
        <div className="flex items-center gap-2 border-b border-brand-purple/10 pb-3">
          <Target className="w-5 h-5 text-brand-purple-light" />
          <h4 className="font-extrabold text-sm text-brand-purple-light uppercase tracking-wider">
            Foco no Edital: Dicas para Provas
          </h4>
        </div>

        <div className="space-y-3">
          {tipsToDisplay.map((tip, idx) => (
            <div
              key={idx}
              className="p-3.5 bg-zinc-900/50 border border-dark-border/80 hover:border-brand-purple/20 rounded-xl flex items-start gap-3 transition-colors group"
            >
              <div className="w-6 h-6 rounded-lg bg-brand-purple/10 text-brand-purple-light flex items-center justify-center shrink-0 text-xs font-bold mt-0.5 group-hover:scale-105 transition-transform">
                <Trophy className="w-3.5 h-3.5" />
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-medium whitespace-pre-wrap">
                {tip}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
