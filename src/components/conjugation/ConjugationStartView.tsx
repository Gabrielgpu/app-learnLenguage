"use client";

import React from "react";
import { useConjugationStore } from "@/lib/conjugationStore";
import { Difficulty } from "@/lib/conjugationTypes";
import TenseSelector from "@/components/TenseSelector";
import { ArrowRight, PenLine, Zap, Shield, Flame } from "lucide-react";

export default function ConjugationStartView() {
  const {
    difficulty,
    setDifficulty,
    selectedTenses,
    toggleTense,
    startConjugation,
    loading: conjLoading,
  } = useConjugationStore();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 flex flex-col animate-slide-up">
      <div className="max-w-2xl mx-auto w-full border border-dark-border bg-dark-card rounded-2xl p-6 shadow-xl mb-6">
        {/* Title */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-brand-purple/20 to-brand-cyan/20 border border-brand-purple/30">
            <PenLine className="w-5 h-5 text-brand-purple-light" />
          </div>
          <div>
            <h3 className="font-extrabold text-zinc-100 text-base leading-tight">
              ✍️ Conjugação Prática
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              Escreva a conjugação correta — sem escolha múltipla
            </p>
          </div>
        </div>

        <p className="text-xs text-zinc-400 leading-relaxed">
          Receba um verbo no infinitivo e conjugue-o corretamente. A IA avalia sua resposta e fornece
          explicações detalhadas. Ideal para treino ativo de memorização.
        </p>
      </div>

      {/* Tense Selector */}
      <div className="mb-6">
        <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2 px-1">
          Tempos verbais (opcional)
        </p>
        <TenseSelector selected={selectedTenses} onToggle={toggleTense} />
        <p className="text-[10px] text-zinc-600 mt-2 px-1">
          Nenhum selecionado = todos os tempos verbais.
        </p>
      </div>

      <div className="max-w-2xl mx-auto w-full border border-dark-border bg-dark-card rounded-2xl p-6 shadow-xl">
        {/* Difficulty Selector */}
        <div className="mb-5">
          <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider mb-2">
            Dificuldade
          </p>
          <div className="grid grid-cols-3 gap-2">
            {([
              { id: "easy" as Difficulty, label: "Fácil", desc: "Verbos regulares", icon: Zap, color: "border-brand-green/40 bg-brand-green/5 text-brand-green ring-brand-green" },
              { id: "medium" as Difficulty, label: "Médio", desc: "Misto", icon: Shield, color: "border-brand-cyan/40 bg-brand-cyan/5 text-brand-cyan ring-brand-cyan" },
              { id: "hard" as Difficulty, label: "Difícil", desc: "Irregulares", icon: Flame, color: "border-brand-red/40 bg-brand-red/5 text-brand-red ring-brand-red" },
            ] as const).map(({ id, label, desc, icon: Icon, color }) => {
              const isSelected = difficulty === id;
              return (
                <button
                  key={id}
                  onClick={() => setDifficulty(id)}
                  className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl border text-center transition-all cursor-pointer ${
                    isSelected
                      ? `${color} ring-1`
                      : "border-dark-border hover:border-zinc-700 bg-zinc-900/40 text-zinc-500"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? "" : "text-zinc-600"}`} />
                  <span className={`text-xs font-bold ${isSelected ? "" : "text-zinc-400"}`}>
                    {label}
                  </span>
                  <span className={`text-[10px] ${isSelected ? "opacity-80" : "text-zinc-600"}`}>
                    {desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={startConjugation}
          disabled={conjLoading}
          className="w-full py-3.5 font-extrabold text-zinc-950 rounded-xl transition-all duration-300 shadow-lg shadow-brand-purple/10 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed bg-gradient-to-r from-brand-purple to-brand-cyan hover:opacity-95"
        >
          {conjLoading ? (
            <div className="w-5 h-5 rounded-full border-2 border-zinc-950 border-t-transparent animate-spin" />
          ) : (
            <>
              Iniciar Conjugação Prática
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
