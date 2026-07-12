"use client";

import React from "react";
import { GitBranch } from "lucide-react";
import { CORRELATION_RULES } from "@/lib/correlationRules";
import { CorrelationPairId } from "@/lib/correlationTypes";

interface CorrelationPairSelectorProps {
  selected: CorrelationPairId[];
  onToggle: (pairId: CorrelationPairId) => void;
}

export default function CorrelationPairSelector({
  selected,
  onToggle,
}: CorrelationPairSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {CORRELATION_RULES.map((rule) => {
        const isSelected = selected.includes(rule.id);
        return (
          <button
            key={rule.id}
            onClick={() => onToggle(rule.id)}
            className={`flex flex-col text-left p-5 rounded-2xl border bg-dark-card transition-all cursor-pointer group shadow-lg shadow-fuchsia-500/10 ${
              isSelected ? "border-fuchsia-500/60" : "border-dark-border hover:border-fuchsia-500/30"
            }`}
          >
            <div
              className={`p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 group-hover:text-zinc-100 transition-colors self-start mb-4 ${
                isSelected
                  ? "bg-gradient-to-tr from-fuchsia-500/20 to-violet-400/20 border-fuchsia-500/30 text-zinc-100"
                  : ""
              }`}
            >
              <GitBranch className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-zinc-200 text-sm mb-1.5 group-hover:text-zinc-100">
              {rule.label}
            </h3>
            <p className="text-[11px] text-zinc-500 italic font-medium mt-auto pt-3 border-t border-zinc-800/80">
              {rule.example}
            </p>
          </button>
        );
      })}
    </div>
  );
}
