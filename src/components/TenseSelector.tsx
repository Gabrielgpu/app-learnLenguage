"use client";

import React from "react";
import { TENSE_OPTIONS, TenseOption } from "@/lib/tenseOptions";
import { VerbTenseLabel } from "@/lib/tenseMapping";

interface TenseSelectorProps {
  options?: TenseOption[];
  selected: string[];
  onToggle: (tenseId: VerbTenseLabel) => void;
  className?: string;
}

export default function TenseSelector({
  options = TENSE_OPTIONS,
  selected,
  onToggle,
  className,
}: TenseSelectorProps) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${className ?? ""}`}>
      {options.map((opt) => {
        const Icon = opt.icon;
        const isSelected = selected.includes(opt.id);

        return (
          <button
            key={opt.id}
            onClick={() => onToggle(opt.id)}
            className={`flex flex-col text-left p-5 rounded-2xl border bg-dark-card transition-all cursor-pointer group shadow-lg ${opt.shadow} ${
              isSelected ? opt.selectedBorder : opt.border
            }`}
          >
            <div
              className={`p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 group-hover:text-zinc-100 transition-colors self-start mb-4 ${
                isSelected ? "bg-gradient-to-tr from-brand-purple/20 to-brand-cyan/20 border-brand-purple/30 text-zinc-100" : ""
              }`}
            >
              <Icon className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-zinc-200 text-base mb-1.5 group-hover:text-zinc-100">
              {opt.title}
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed mb-4 flex-grow">
              {opt.description}
            </p>
            <div className="text-[10px] text-zinc-500 border-t border-zinc-800/80 pt-3 italic font-medium w-full">
              {opt.example}
            </div>
          </button>
        );
      })}
    </div>
  );
}
