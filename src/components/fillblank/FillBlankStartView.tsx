"use client";

import React from "react";
import { useFillBlankStore } from "@/lib/fillBlankStore";
import TenseSelector from "../TenseSelector";
import { ArrowRight, Puzzle } from "lucide-react";

export default function FillBlankStartView() {
  const { selectedTenses, toggleTense, startFillBlank, loading } = useFillBlankStore();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 flex flex-col animate-slide-up">
      <div className="text-center mb-10 space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-dark-border text-xs text-zinc-400 font-semibold mb-2">
          <Puzzle className="w-3.5 h-3.5 text-teal-400" />
          <span>🧩 Complete a Frase</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-500 leading-tight">
          Preencha a lacuna com a{" "}
          <span className="bg-gradient-to-r from-teal-400 via-sky-400 to-brand-cyan bg-clip-text text-transparent">
            conjugação correta
          </span>
        </h2>
        <p className="text-sm md:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed">
          Selecione um ou mais tempos verbais abaixo. Você recebe uma frase com uma lacuna e o verbo no
          infinitivo — complete considerando o contexto.
        </p>
      </div>

      <div className="mb-6">
        <TenseSelector selected={selectedTenses} onToggle={toggleTense} />
      </div>

      <div className="flex flex-col items-center mb-4">
        <button
          onClick={startFillBlank}
          disabled={selectedTenses.length === 0 || loading}
          className="w-full sm:w-64 px-6 py-3.5 font-extrabold text-zinc-950 rounded-xl transition-all duration-300 shadow-xl shadow-teal-500/10 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none bg-gradient-to-r from-teal-500 to-sky-400 hover:opacity-95"
        >
          {loading ? (
            <div className="w-5 h-5 rounded-full border-2 border-zinc-950 border-t-transparent animate-spin" />
          ) : (
            <>
              Iniciar Complete a Frase
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
            </>
          )}
        </button>
        {selectedTenses.length === 0 && (
          <span className="text-xs text-zinc-600 mt-2.5">
            Selecione pelo menos um tempo verbal para habilitar
          </span>
        )}
      </div>
    </div>
  );
}
