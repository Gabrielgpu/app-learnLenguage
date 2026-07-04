"use client";

import React from "react";
import { Lightbulb } from "lucide-react";

interface QuickTipCardProps {
  tip: string;
  title?: string;
}

export default function QuickTipCard({ tip, title = "Dica Rápida" }: QuickTipCardProps) {
  return (
    <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-zinc-900/80 to-zinc-950/80 border border-brand-purple/20 shadow-lg shadow-brand-purple/5 flex gap-3 items-start animate-fade-in">
      <div className="p-2 rounded-lg bg-brand-purple/10 border border-brand-purple/20 text-brand-purple-light shrink-0">
        <Lightbulb className="w-4 h-4" />
      </div>
      <div className="space-y-1">
        <h5 className="text-xs font-extrabold text-zinc-200 tracking-wide uppercase">
          {title}
        </h5>
        <p className="text-xs text-zinc-400 leading-relaxed font-medium">
          {tip}
        </p>
      </div>
    </div>
  );
}
