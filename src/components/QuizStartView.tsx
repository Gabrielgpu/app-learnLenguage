"use client";

import React from "react";
import { useQuizStore } from "@/lib/store";
import TenseSelector from "./TenseSelector";
import { ArrowRight, BookOpen } from "lucide-react";

export default function QuizStartView() {
  const { verbTenses, toggleVerbTense, startQuiz, loading } = useQuizStore();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 flex flex-col animate-slide-up">
      {/* Intro */}
      <div className="text-center mb-10 space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-dark-border text-xs text-zinc-400 font-semibold mb-2">
          <BookOpen className="w-3.5 h-3.5 text-brand-purple" />
          <span>Foco em Concursos Públicos</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-500 leading-tight">
          Domine a conjugação verbal de forma{" "}
          <span className="bg-gradient-to-r from-brand-purple-light via-brand-cyan to-brand-green bg-clip-text text-transparent">
            inteligente e dinâmica
          </span>
        </h2>
        <p className="text-sm md:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed">
          Selecione um tempo verbal abaixo para gerar um simulado de 5 questões no estilo das principais bancas (VUNESP, FGV, CEBRASPE).
        </p>
      </div>

      {/* Cards Selection */}
      <div className="mb-6">
        <TenseSelector selected={verbTenses} onToggle={toggleVerbTense} />
      </div>

      {/* Button Action */}
      <div className="flex flex-col items-center mb-4">
        <button
          onClick={startQuiz}
          disabled={verbTenses.length === 0 || loading}
          className="w-full sm:w-64 px-6 py-3.5 font-extrabold text-zinc-950 rounded-xl transition-all duration-300 shadow-xl shadow-brand-purple/10 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none bg-gradient-to-r from-brand-purple to-brand-cyan hover:opacity-95"
        >
          {loading ? (
            <div className="w-5 h-5 rounded-full border-2 border-zinc-950 border-t-transparent animate-spin" />
          ) : (
            <>
              Iniciar estudo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
            </>
          )}
        </button>
        {verbTenses.length === 0 ? (
          <span className="text-xs text-zinc-600 mt-2.5">
            Selecione pelo menos um tempo verbal para habilitar
          </span>
        ) : (
          <span className="text-xs text-brand-cyan/80 mt-2.5 font-medium animate-fade-in">
            Você pode selecionar múltiplos tempos verbais para mesclar o simulado!
          </span>
        )}
      </div>
    </div>
  );
}
