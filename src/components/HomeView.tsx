"use client";

import React from "react";
import { useQuizStore } from "@/lib/store";
import { Clock, CheckCircle2, RotateCcw, ArrowRight, BookOpen } from "lucide-react";

export default function HomeView() {
  const { verbTenses, toggleVerbTense, startQuiz, loading } = useQuizStore();

  const options = [
    {
      id: "Presente do Indicativo" as const,
      title: "Presente do Indicativo",
      description: "Ações habituais, verdades universais ou fatos ocorrendo no momento da fala.",
      example: "Ex: 'O cientista busca explicar...' ou 'Eu corro diariamente.'",
      icon: Clock,
      color: "from-blue-500 to-cyan-400 font-cyan",
      shadow: "shadow-cyan-500/10",
      border: "hover:border-cyan-500/30 border-dark-border",
      selectedBorder: "border-brand-blue ring-1 ring-brand-blue bg-brand-blue/5",
    },
    {
      id: "Pretérito Perfeito" as const,
      title: "Pretérito Perfeito",
      description: "Ações totalmente concluídas e terminadas em um ponto definido do passado.",
      example: "Ex: 'Aprovou as diretrizes ontem à noite.' ou 'Nós propusemos a mudança.'",
      icon: CheckCircle2,
      color: "from-brand-purple to-purple-400",
      shadow: "shadow-brand-purple/10",
      border: "hover:border-brand-purple/30 border-dark-border",
      selectedBorder: "border-brand-purple ring-1 ring-brand-purple bg-brand-purple/5",
    },
    {
      id: "Pretérito Imperfeito" as const,
      title: "Pretérito Imperfeito",
      description: "Processos frequentes, contínuos ou habituais no passado, indicando duração.",
      example: "Ex: 'Antigamente nós visitávamos...' ou 'O relógio batia as horas.'",
      icon: RotateCcw,
      color: "from-pink-500 to-rose-400",
      shadow: "shadow-rose-500/10",
      border: "hover:border-rose-500/30 border-dark-border",
      selectedBorder: "border-rose-500 ring-1 ring-rose-500 bg-rose-500/5",
    },
  ];

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {options.map((opt) => {
          const Icon = opt.icon;
          const isSelected = verbTenses.includes(opt.id);

          return (
            <button
              key={opt.id}
              onClick={() => toggleVerbTense(opt.id)}
              className={`flex flex-col text-left p-5 rounded-2xl border bg-dark-card transition-all cursor-pointer group shadow-lg ${opt.shadow} ${
                isSelected ? opt.selectedBorder : opt.border
              }`}
            >
              <div
                className={`p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 group-hover:text-zinc-100 transition-colors self-start mb-4 ${
                  isSelected ? "bg-gradient-to-tr from-brand-purple/20 to-brand-cyan/20 border-brand-purple/30 text-zinc-100" : ""
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-zinc-200 text-base mb-1.5 group-hover:text-zinc-100">
                {opt.title}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed mb-4 flex-grow">
                {opt.description}
              </p>
              <div className="text-[10px] text-zinc-500 border-t border-zinc-800/80 pt-3 italic font-medium w-full">
                {opt.example}
              </div>
            </button>
          );
        })}
      </div>

      {/* Button Action */}
      <div className="flex flex-col items-center">
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
