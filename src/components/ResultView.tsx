"use client";

import React from "react";
import { useQuizStore } from "@/lib/store";
import { Award, ArrowLeft, RefreshCw, Check, X, ChevronDown, ChevronUp } from "lucide-react";

export default function ResultView() {
  const { answers, resetQuiz, startQuiz } = useQuizStore();
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);

  const correctCount = answers.filter((a) => a.isCorrect).length;
  const totalCount = answers.length || 5;
  const scorePercent = Math.round((correctCount / totalCount) * 100);

  const getMessageAndColor = () => {
    if (scorePercent === 100) {
      return {
        title: "Perfeito! Domínio absoluto! 🏆",
        desc: "Você gabaritou todas as questões! Está pronto para qualquer banca de concurso.",
        color: "text-brand-green border-brand-green/20 bg-brand-green/5",
        gradient: "from-brand-green to-emerald-400",
      };
    }
    if (scorePercent >= 80) {
      return {
        title: "Excelente desempenho! 🌟",
        desc: "Você dominou a maior parte das regras desse tempo verbal. Continue assim!",
        color: "text-brand-cyan border-brand-cyan/20 bg-brand-cyan/5",
        gradient: "from-brand-cyan to-blue-400",
      };
    }
    if (scorePercent >= 60) {
      return {
        title: "Muito bom! 📚",
        desc: "Bom aproveitamento. Revise os detalhes para alcançar a nota máxima na prova.",
        color: "text-brand-purple-light border-brand-purple/20 bg-brand-purple/5",
        gradient: "from-brand-purple to-purple-400",
      };
    }
    return {
      title: "Continue praticando! 💪",
      desc: "Os tempos verbais podem ser traiçoeiros. Estude as explicações e tente de novo!",
      color: "text-amber-500 border-amber-500/20 bg-amber-500/5",
      gradient: "from-amber-500 to-orange-400",
    };
  };

  const info = getMessageAndColor();

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 flex flex-col animate-slide-up">
      {/* Score Header Card */}
      <div className="border border-dark-border bg-dark-card rounded-3xl p-6 md:p-8 shadow-2xl text-center mb-8 relative overflow-hidden">
        {/* Glow behind */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-brand-purple/15 rounded-full blur-3xl" />

        {/* Circular score */}
        <div className="relative w-36 h-36 mx-auto mb-6 flex items-center justify-center">
          {/* SVG ring */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="44"
              className="stroke-zinc-800"
              strokeWidth="8"
              fill="transparent"
            />
            <circle
              cx="50"
              cy="50"
              r="44"
              className="stroke-brand-purple"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 44}
              strokeDashoffset={2 * Math.PI * 44 * (1 - scorePercent / 100)}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 1s ease-out-in" }}
            />
          </svg>
          {/* Inner content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl md:text-4xl font-extrabold text-zinc-100 leading-none">
              {scorePercent}%
            </span>
            <span className="text-[10px] text-zinc-400 mt-1 uppercase tracking-wider font-semibold">
              {correctCount} / {totalCount} acertos
            </span>
          </div>
        </div>

        <div className="relative z-10 space-y-2">
          <h3 className="text-xl md:text-2xl font-extrabold text-zinc-100">
            {info.title}
          </h3>
          <p className="text-zinc-400 text-sm max-w-md mx-auto leading-relaxed">
            {info.desc}
          </p>
        </div>
      </div>

      {/* Review Section Title */}
      <h3 className="font-extrabold text-lg text-zinc-200 mb-4 flex items-center gap-2">
        <Award className="w-5 h-5 text-brand-purple" />
        Revisão das Questões
      </h3>

      {/* Question Breakdown List */}
      <div className="space-y-3 mb-8">
        {answers.map((ans, idx) => {
          const isExpanded = expandedIndex === idx;
          return (
            <div
              key={idx}
              className={`border border-dark-border bg-dark-card rounded-2xl overflow-hidden transition-colors ${
                isExpanded ? "border-zinc-800" : "hover:border-zinc-800"
              }`}
            >
              {/* Question Header */}
              <button
                onClick={() => toggleExpand(idx)}
                className="w-full p-4 flex items-start gap-3 text-left cursor-pointer transition-colors"
              >
                <div
                  className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                    ans.isCorrect ? "bg-brand-green/10 text-brand-green" : "bg-brand-red/10 text-brand-red"
                  }`}
                >
                  {ans.isCorrect ? <Check className="w-4 h-4 stroke-[3]" /> : <X className="w-4 h-4 stroke-[3]" />}
                </div>
                <div className="flex-grow min-w-0 pr-2">
                  <div className="text-xs text-zinc-500 font-semibold mb-1">
                    Questão {idx + 1}
                  </div>
                  <p className="text-zinc-200 text-sm font-semibold truncate leading-tight">
                    {ans.question.question}
                  </p>
                </div>
                <div className="text-zinc-400 self-center">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {/* Collapsible details */}
              {isExpanded && (
                <div className="px-4 pb-5 border-t border-dark-border bg-zinc-950/30 space-y-4 animate-fade-in pt-4">
                  <div className="text-zinc-300 text-xs md:text-sm font-medium leading-relaxed whitespace-pre-wrap">
                    {ans.question.question}
                  </div>

                  {/* Options */}
                  <div className="space-y-2">
                    {ans.question.options.map((opt, index) => {
                      const letter = ["A", "B", "C", "D", "E"][index];
                      const isCorrect = ans.question.correctAnswer === letter;
                      const isUserSelected = ans.selectedOption === letter;

                      // Clean up prefix if the option already contains it
                      const cleanOption = (text: string, ltr: string) => {
                        const prefixRegex = new RegExp(`^\\s*${ltr}\\s*\\)?\\s*[-.:]?\\s*`, "i");
                        return text.replace(prefixRegex, "");
                      };
                      const optionText = `${letter}) ${cleanOption(opt, letter)}`;

                      let optStyle = "border-dark-border text-zinc-400 bg-zinc-900/10";
                      if (isCorrect) {
                        optStyle = "border-brand-green bg-brand-green/10 text-brand-green font-medium";
                      } else if (isUserSelected) {
                        optStyle = "border-brand-red bg-brand-red/10 text-brand-red font-medium";
                      }

                      return (
                        <div
                          key={letter}
                          className={`p-3 rounded-xl border text-xs leading-relaxed flex items-center justify-between ${optStyle}`}
                        >
                          <span>{optionText}</span>
                          {isCorrect && (
                            <span className="text-[10px] bg-brand-green/20 text-brand-green font-bold uppercase px-1.5 py-0.5 rounded-md">
                              Gabarito
                            </span>
                          )}
                          {!isCorrect && isUserSelected && (
                            <span className="text-[10px] bg-brand-red/20 text-brand-red font-bold uppercase px-1.5 py-0.5 rounded-md">
                              Sua Escolha
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation card */}
                  <div className="p-4 bg-zinc-900/60 border border-dark-border rounded-xl">
                    <div className="text-[11px] font-bold text-brand-cyan uppercase tracking-wider mb-1.5">
                      Explicação
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed whitespace-pre-wrap">
                      {ans.question.explanation}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <button
          onClick={resetQuiz}
          className="flex-1 py-4 border border-dark-border hover:border-zinc-700 bg-zinc-900/40 hover:bg-zinc-900/80 active:scale-95 text-zinc-300 font-bold rounded-xl text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Outro Tempo Verbal
        </button>
        <button
          onClick={startQuiz}
          className="flex-1 py-4 bg-gradient-to-r from-brand-purple to-brand-cyan hover:opacity-95 active:scale-95 text-zinc-950 font-extrabold rounded-xl text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xl shadow-brand-purple/5"
        >
          <RefreshCw className="w-4 h-4 stroke-[2.5]" />
          Refazer Estudo
        </button>
      </div>
    </div>
  );
}
