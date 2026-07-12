"use client";

import React from "react";
import { Lightbulb } from "lucide-react";
import { CORRELATION_RULES } from "@/lib/correlationRules";

export default function CorrelationRulesPanel() {
  return (
    <div className="mb-8 space-y-3">
      <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider px-1">
        As 3 regras de correlação verbal
      </p>
      {CORRELATION_RULES.map((rule) => (
        <div
          key={rule.id}
          className="p-4 rounded-xl bg-gradient-to-r from-zinc-900/80 to-zinc-950/80 border border-brand-purple/20 shadow-lg shadow-brand-purple/5 flex gap-3 items-start"
        >
          <div className="p-2 rounded-lg bg-brand-purple/10 border border-brand-purple/20 text-brand-purple-light shrink-0">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <h5 className="text-xs font-extrabold text-zinc-200 tracking-wide uppercase">
              {rule.label}
            </h5>
            <p className="text-xs text-zinc-400 leading-relaxed font-medium">
              {rule.description}
            </p>
            <p className="text-[11px] text-zinc-500 italic mt-1">
              Ex: {rule.example}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
