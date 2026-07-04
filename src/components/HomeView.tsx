"use client";

import React, { useState } from "react";
import { useQuizStore } from "@/lib/store";
import { useConjugationStore } from "@/lib/conjugationStore";
import { Difficulty } from "@/lib/conjugationTypes";
import { Clock, CheckCircle2, RotateCcw, ArrowRight, BookOpen, PenLine, Zap, Shield, Flame } from "lucide-react";

import ReviewSection from "./review/ReviewSection";

export default function HomeView() {
  const { verbTenses, toggleVerbTense, startQuiz, loading } = useQuizStore();
  const { difficulty, setDifficulty, startConjugation, loading: conjLoading } = useConjugationStore();
  const [selectedReviewTense, setSelectedReviewTense] = useState<string | null>(null);

  const activeReviewTense = (selectedReviewTense && verbTenses.includes(selectedReviewTense as typeof verbTenses[number]))
    ? selectedReviewTense
    : (verbTenses.length > 0 ? verbTenses[0] : null);

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
      <div className="flex flex-col items-center mb-10">
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

      {/* ── Divider ──────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-4 mb-8">
        <div className="flex-1 h-px bg-dark-border" />
        <span className="text-xs font-bold text-zinc-600 uppercase tracking-widest">
          Também disponível
        </span>
        <div className="flex-1 h-px bg-dark-border" />
      </div>

      {/* ── Conjugação Prática Card ───────────────────────────────────────── */}
      <div className="border border-dark-border bg-dark-card rounded-2xl p-6 shadow-xl mb-8">
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

        <p className="text-xs text-zinc-400 leading-relaxed mb-5">
          Receba um verbo no infinitivo e conjugue-o corretamente. A IA avalia sua resposta e fornece
          explicações detalhadas. Ideal para treino ativo de memorização.
        </p>

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

      {/* Conjugation Review Section (Home Page) */}
      {activeReviewTense && (
        <ReviewSection
          selectedTenses={verbTenses}
          activeTense={activeReviewTense}
          onSelectTense={setSelectedReviewTense}
        />
      )}
    </div>
  );
}
