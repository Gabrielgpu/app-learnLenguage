"use client";

import React from "react";
import { useDerivedVerbStore } from "@/lib/derivedVerbStore";
import DerivedVerbRulesPanel from "./DerivedVerbRulesPanel";
import DerivedVerbGroupSelector from "./DerivedVerbGroupSelector";
import { ArrowRight, Repeat } from "lucide-react";

export default function DerivedVerbStartView() {
  const { selectedGroups, toggleGroup, startDerivedVerb } = useDerivedVerbStore();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 flex flex-col animate-slide-up">
      <div className="text-center mb-10 space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-dark-border text-xs text-zinc-400 font-semibold mb-2">
          <Repeat className="w-3.5 h-3.5 text-emerald-400" />
          <span>Verbos Derivados</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-500 leading-tight">
          Verbos derivados de pôr, ter, vir e ver{" "}
          <span className="bg-gradient-to-r from-emerald-400 via-lime-400 to-brand-cyan bg-clip-text text-transparent">
            seguem o mesmo padrão
          </span>
        </h2>
        <p className="text-sm md:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed">
          Estude as 4 famílias de verbos derivados abaixo e depois pratique completando frases com
          o verbo primitivo e o seu derivado, lado a lado.
        </p>
      </div>

      <DerivedVerbRulesPanel />

      <div className="mb-6">
        <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider px-1 mb-3">
          Escolha quais famílias praticar
        </p>
        <DerivedVerbGroupSelector selected={selectedGroups} onToggle={toggleGroup} />
      </div>

      <div className="flex flex-col items-center mb-4">
        <button
          onClick={startDerivedVerb}
          disabled={selectedGroups.length === 0}
          className="w-full sm:w-64 px-6 py-3.5 font-extrabold text-zinc-950 rounded-xl transition-all duration-300 shadow-xl shadow-emerald-500/10 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none bg-gradient-to-r from-emerald-500 to-lime-400 hover:opacity-95"
        >
          Iniciar Verbos Derivados
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
        </button>
        {selectedGroups.length === 0 && (
          <span className="text-xs text-zinc-600 mt-2.5">
            Selecione pelo menos uma família para habilitar
          </span>
        )}
      </div>
    </div>
  );
}
