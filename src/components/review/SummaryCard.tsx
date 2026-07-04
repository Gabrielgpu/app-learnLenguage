"use client";

import React from "react";
import { VerbTenseInfo } from "@/data/types";
import { CheckCircle2, Bookmark } from "lucide-react";

interface SummaryCardProps {
  info: VerbTenseInfo;
}

export default function SummaryCard({ info }: SummaryCardProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Intro info box */}
      <div className="p-5 rounded-2xl bg-zinc-900/30 border border-dark-border/60 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-brand-purple flex items-center gap-1.5">
          <Bookmark className="w-4 h-4" />
          <span>Conceito Base</span>
        </h4>
        <p className="text-sm text-zinc-300 leading-relaxed font-medium">
          O <strong className="text-zinc-200">{info.title}</strong> é fundamental para construir frases corretas e expressar precisamente o aspecto temporal das ações. Compreender sua aplicação prática é um diferencial indispensável em provas e no cotidiano acadêmico.
        </p>
      </div>

      {/* Usage lists */}
      {info.usage && info.usage.length > 0 && (
        <div className="space-y-3.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-brand-cyan flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>Casos de Emprego (Quando Utilizar)</span>
          </h4>
          <div className="grid grid-cols-1 gap-3">
            {info.usage.map((use, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-dark-card hover:bg-dark-card-hover border border-dark-border transition-all duration-300 flex items-start gap-3.5 shadow-sm group"
              >
                <span className="w-6 h-6 rounded-lg bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan flex items-center justify-center shrink-0 text-xs font-bold mt-0.5 group-hover:scale-110 transition-transform">
                  {idx + 1}
                </span>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-medium">
                  {use}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
