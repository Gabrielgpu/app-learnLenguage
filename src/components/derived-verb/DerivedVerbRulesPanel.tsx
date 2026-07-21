"use client";

import React from "react";
import { Lightbulb } from "lucide-react";
import { DERIVED_VERB_RULES } from "@/lib/derivedVerbRules";

export default function DerivedVerbRulesPanel() {
  return (
    <div className="mb-8 space-y-3">
      <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider px-1">
        As 4 famílias de verbos derivados
      </p>
      {DERIVED_VERB_RULES.map((rule) => (
        <div
          key={rule.id}
          className="p-4 rounded-xl bg-gradient-to-r from-zinc-900/80 to-zinc-950/80 border border-emerald-500/20 shadow-lg shadow-emerald-500/5 flex gap-3 items-start"
        >
          <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
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
