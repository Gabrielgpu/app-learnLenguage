"use client";

import React, { useState } from "react";
import { VerbTenseInfo } from "@/data/types";
import { AlertCircle, HelpCircle, BookOpen, Layers, CheckCircle } from "lucide-react";

interface VerbReferenceCardProps {
  info: VerbTenseInfo;
}

export default function VerbReferenceCard({ info }: VerbReferenceCardProps) {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div className="w-full bg-dark-card border border-dark-border rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-brand-purple/5 flex flex-col h-full">
      {/* Header with gradient background */}
      <div className="relative p-6 bg-gradient-to-br from-zinc-900/90 to-zinc-950/95 border-b border-dark-border">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple/5 rounded-full blur-3xl" />
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-xs font-semibold text-brand-purple-light">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Ficha de Revisão</span>
          </div>
          <h3 className="text-xl font-extrabold text-zinc-100 bg-gradient-to-r from-zinc-100 to-zinc-300 bg-clip-text">
            {info.title}
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed font-medium">
            {info.description}
          </p>
        </div>
      </div>

      {/* Content body */}
      <div className="p-6 space-y-6 flex-1 overflow-y-auto">
        {/* Usage section */}
        {info.usage && info.usage.length > 0 && (
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-cyan flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-brand-cyan" />
              <span>Quando Utilizar</span>
            </h4>
            <ul className="grid grid-cols-1 gap-2">
              {info.usage.map((use, idx) => (
                <li
                  key={idx}
                  className="text-xs text-zinc-300 bg-zinc-900/50 border border-dark-border/40 p-2.5 rounded-xl flex items-start gap-2.5 leading-relaxed"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan shrink-0 mt-1.5" />
                  <span>{use}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Conjugation Tables (Tabbed for cleaner UX) */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-brand-purple-light flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-brand-purple-light" />
            <span>Tabelas de Conjugação Regular</span>
          </h4>

          {/* Tabs header */}
          <div className="flex bg-zinc-900/60 p-1 rounded-xl border border-dark-border">
            {info.groups.map((group, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`flex-1 py-2 text-center text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  activeTab === idx
                    ? "bg-brand-purple text-zinc-950 shadow-md shadow-brand-purple/10 scale-[1.02]"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {group.conjugation.split(" ")[0]} {/* Ex: "-AR" */}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="bg-zinc-900/30 border border-dark-border/50 rounded-xl overflow-hidden animate-fade-in">
            <div className="bg-zinc-900/50 px-4 py-2 border-b border-dark-border/50 text-[10px] uppercase font-bold tracking-wider text-zinc-500 flex justify-between">
              <span>Pessoa</span>
              <span>Terminação regular</span>
            </div>
            <div className="divide-y divide-dark-border/30">
              {info.groups[activeTab].endings.map((ending, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2.5 flex justify-between items-center text-xs hover:bg-zinc-900/20 transition-colors"
                >
                  <span className="font-semibold text-zinc-300">{ending.person}</span>
                  <span className="font-mono text-brand-cyan bg-zinc-900/80 px-2 py-0.5 rounded border border-dark-border/50 font-bold">
                    {ending.ending}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Examples Section */}
        {info.examples && info.examples.length > 0 && (
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-green flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-brand-green" />
              <span>Exemplos em Frases</span>
            </h4>
            <div className="space-y-2">
              {info.examples.map((ex, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-zinc-900/40 border-l-2 border-brand-green bg-gradient-to-r from-zinc-900/60 to-zinc-950/20 rounded-r-xl space-y-1"
                >
                  <p className="text-xs font-semibold text-zinc-100 italic leading-relaxed">
                    &ldquo;{ex.sentence}&rdquo;
                  </p>
                  <p className="text-[10px] text-zinc-400 font-medium leading-normal">
                    {ex.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Observations / Gotchas Section */}
        {info.observations && info.observations.length > 0 && (
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-500 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              <span>Fique de Olho (Dicas &amp; Irregulares)</span>
            </h4>
            <div className="bg-amber-500/5 border border-amber-500/10 rounded-xl p-3.5 space-y-2 text-xs">
              {info.observations.map((obs, idx) => (
                <div key={idx} className="flex gap-2 text-zinc-300 leading-relaxed">
                  <span className="text-amber-500 font-bold text-[10px] mt-0.5 shrink-0">⚠️</span>
                  <span className="text-[11px] whitespace-pre-wrap">{obs}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
