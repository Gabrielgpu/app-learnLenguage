"use client";

import React from "react";
import { useCorrelationStore } from "@/lib/correlationStore";
import CorrelationRulesPanel from "./CorrelationRulesPanel";
import CorrelationPairSelector from "./CorrelationPairSelector";
import { ArrowRight, GitBranch } from "lucide-react";

export default function CorrelationStartView() {
  const { selectedPairs, togglePair, startCorrelation } = useCorrelationStore();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 flex flex-col animate-slide-up">
      <div className="text-center mb-10 space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-dark-border text-xs text-zinc-400 font-semibold mb-2">
          <GitBranch className="w-3.5 h-3.5 text-fuchsia-400" />
          <span>Correlação Verbal</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-500 leading-tight">
          Domine os pares de tempos verbais que{" "}
          <span className="bg-gradient-to-r from-fuchsia-400 via-violet-400 to-brand-purple-light bg-clip-text text-transparent">
            combinam entre si
          </span>
        </h2>
        <p className="text-sm md:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed">
          Estude as 3 regras de correlação verbal abaixo e depois pratique completando frases com
          as duas lacunas correlacionadas.
        </p>
      </div>

      <CorrelationRulesPanel />

      <div className="mb-6">
        <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider px-1 mb-3">
          Escolha quais regras praticar
        </p>
        <CorrelationPairSelector selected={selectedPairs} onToggle={togglePair} />
      </div>

      <div className="flex flex-col items-center mb-4">
        <button
          onClick={startCorrelation}
          disabled={selectedPairs.length === 0}
          className="w-full sm:w-64 px-6 py-3.5 font-extrabold text-zinc-950 rounded-xl transition-all duration-300 shadow-xl shadow-fuchsia-500/10 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none bg-gradient-to-r from-fuchsia-500 to-violet-400 hover:opacity-95"
        >
          Iniciar Correlação Verbal
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
        </button>
        {selectedPairs.length === 0 && (
          <span className="text-xs text-zinc-600 mt-2.5">
            Selecione pelo menos uma regra para habilitar
          </span>
        )}
      </div>
    </div>
  );
}
