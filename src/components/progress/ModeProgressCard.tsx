"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import { ProgressEntry } from "@/lib/progress/types";
import { isDue } from "@/lib/progress/leitner";

interface ModeProgressCardProps {
  title: string;
  icon: LucideIcon;
  entries: ProgressEntry[];
  iconBg: string;
  iconColor: string;
  barColor: string;
}

export default function ModeProgressCard({
  title,
  icon: Icon,
  entries,
  iconBg,
  iconColor,
  barColor,
}: ModeProgressCardProps) {
  const dueCount = entries.filter((e) => isDue(e)).length;
  const boxCounts = [1, 2, 3, 4, 5].map(
    (box) => entries.filter((e) => e.box === box).length
  );
  const maxCount = Math.max(1, ...boxCounts);

  return (
    <div className="p-5 rounded-2xl border border-dark-border bg-dark-card">
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 rounded-lg border ${iconBg}`}>
          <Icon className={`w-4 h-4 ${iconColor}`} />
        </div>
        <h3 className="font-extrabold text-zinc-100 text-sm">{title}</h3>
      </div>

      {entries.length === 0 ? (
        <p className="text-xs text-zinc-500">
          Ainda sem histórico. Pratique este modo para começar a acompanhar seu progresso.
        </p>
      ) : (
        <>
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-3">
            <span>{entries.length} itens acompanhados</span>
            <span className="font-bold text-amber-400">{dueCount} para revisar</span>
          </div>
          <div className="flex items-end gap-1.5 h-12">
            {boxCounts.map((count, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full h-9 rounded bg-zinc-900/60 flex items-end overflow-hidden">
                  <div
                    className={`w-full rounded-t ${barColor}`}
                    style={{ height: `${(count / maxCount) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] text-zinc-600">{count}</span>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-zinc-600 mt-2 text-center">Caixas 1 → 5 (Leitner)</p>
        </>
      )}
    </div>
  );
}
