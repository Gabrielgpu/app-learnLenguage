"use client";

import React from "react";
import { VerbTenseInfo } from "@/data/types";
import { HelpCircle, MessageSquare } from "lucide-react";

interface ExamplesPanelProps {
  info: VerbTenseInfo;
}

export default function ExamplesPanel({ info }: ExamplesPanelProps) {
  return (
    <div className="space-y-4 animate-fade-in">
      <div className="space-y-3">
        {info.examples && info.examples.length > 0 ? (
          info.examples.map((ex, idx) => (
            <div
              key={idx}
              className="p-4 bg-dark-card hover:bg-dark-card-hover border border-dark-border rounded-xl space-y-2.5 transition-all duration-300 shadow-sm flex gap-3.5 items-start group"
            >
              <div className="p-2 rounded-lg bg-brand-green/10 border border-brand-green/20 text-brand-green shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div className="space-y-1.5 flex-1">
                <p className="text-sm font-semibold text-zinc-100 italic leading-relaxed">
                  &ldquo;{ex.sentence}&rdquo;
                </p>
                <p className="text-xs text-zinc-400 font-medium leading-relaxed bg-zinc-900/40 border border-dark-border/40 px-3 py-1.5 rounded-lg">
                  <span className="text-brand-green font-bold text-[10px] uppercase tracking-wider block mb-0.5">Explicação</span>
                  {ex.explanation}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center text-zinc-500">
            <HelpCircle className="w-8 h-8 text-zinc-600 mb-2" />
            <p className="text-xs">Nenhum exemplo disponível para este tempo verbal.</p>
          </div>
        )}
      </div>
    </div>
  );
}
