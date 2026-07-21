"use client";

import React from "react";
import { ProgressEntry } from "@/lib/progress/types";
import { isDue, masteryPercent } from "@/lib/progress/leitner";
import ScoreRing from "@/components/ScoreRing";
import { Clock, Layers } from "lucide-react";

interface ProgressOverviewProps {
  entries: ProgressEntry[];
}

export default function ProgressOverview({ entries }: ProgressOverviewProps) {
  const percent = masteryPercent(entries);
  const dueCount = entries.filter((e) => isDue(e)).length;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-8 p-6 rounded-2xl border border-dark-border bg-dark-card mb-8">
      <ScoreRing percent={percent} gradientId="progressOverviewGrad" colors={["#22d3ee", "#a78bfa"]}>
        <span className="text-3xl font-black text-zinc-100">{percent}%</span>
        <span className="text-xs text-zinc-500 font-semibold">domínio</span>
      </ScoreRing>

      <div className="flex-1 grid grid-cols-2 gap-4 w-full">
        <div className="flex items-center gap-3 p-4 rounded-xl border border-dark-border bg-zinc-900/40">
          <div className="p-2 rounded-lg bg-brand-cyan/10 border border-brand-cyan/20">
            <Layers className="w-4 h-4 text-brand-cyan" />
          </div>
          <div>
            <p className="text-lg font-extrabold text-zinc-100 leading-none">{entries.length}</p>
            <p className="text-xs text-zinc-500 mt-1">itens acompanhados</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-4 rounded-xl border border-dark-border bg-zinc-900/40">
          <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <p className="text-lg font-extrabold text-zinc-100 leading-none">{dueCount}</p>
            <p className="text-xs text-zinc-500 mt-1">prontos para revisar</p>
          </div>
        </div>
      </div>
    </div>
  );
}
