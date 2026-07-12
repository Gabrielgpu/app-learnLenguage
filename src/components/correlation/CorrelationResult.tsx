"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useCorrelationStore } from "@/lib/correlationStore";
import { CorrelationAnswer } from "@/lib/correlationTypes";
import { Check, X, Home, RotateCcw, Trophy, AlertTriangle } from "lucide-react";

const TOTAL_EXERCISES = 5;

function getPerformanceLabel(percent: number) {
  if (percent >= 90) return { label: "Excelente!", color: "text-brand-green" };
  if (percent >= 70) return { label: "Muito Bom!", color: "text-brand-cyan" };
  if (percent >= 50) return { label: "Bom!", color: "text-amber-400" };
  return { label: "Continue Praticando", color: "text-brand-red" };
}

export default function CorrelationResult() {
  const { answers, startCorrelation, resetCorrelation } = useCorrelationStore();
  const router = useRouter();

  const correct = answers.filter((a) => a.isCorrect).length;
  const percent = Math.round((correct / TOTAL_EXERCISES) * 100);
  const { label, color } = getPerformanceLabel(percent);

  const circumference = 2 * Math.PI * 42;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 md:py-12 flex flex-col animate-slide-up">
      <div className="text-center mb-8">
        <div className="inline-flex p-3 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-500/20 mb-4">
          <Trophy className="w-8 h-8 text-fuchsia-400" />
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-100 mb-1">Sessão Concluída!</h2>
        <p className="text-zinc-400 text-sm">Modo Correlação Verbal</p>
      </div>

      <div className="flex flex-col items-center mb-8">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 96 96">
            <circle cx="48" cy="48" r="42" fill="none" stroke="#27272a" strokeWidth="8" />
            <circle
              cx="48"
              cy="48"
              r="42"
              fill="none"
              stroke="url(#correlationScoreGrad)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="correlationScoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d946ef" />
                <stop offset="100%" stopColor="#a78bfa" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-black text-zinc-100">{correct}</span>
            <span className="text-xs text-zinc-500 font-semibold">/ {TOTAL_EXERCISES} corretas</span>
          </div>
        </div>
        <p className={`mt-3 text-lg font-extrabold ${color}`}>{label}</p>
        <p className="text-xs text-zinc-500 mt-1">{percent}% de aproveitamento</p>
      </div>

      <div className="space-y-3 mb-8">
        <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider px-1 mb-2">
          Revisão dos exercícios
        </p>
        {answers.map((answer: CorrelationAnswer, i) => (
          <div
            key={i}
            className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${
              answer.isCorrect ? "border-brand-green/20 bg-brand-green/5" : "border-brand-red/20 bg-brand-red/5"
            }`}
          >
            <div className={`p-1.5 rounded-lg shrink-0 ${answer.isCorrect ? "bg-brand-green/10" : "bg-brand-red/10"}`}>
              {answer.isCorrect ? (
                <Check className="w-4 h-4 text-brand-green stroke-[2.5]" />
              ) : answer.feedbackType === "typo" ? (
                <AlertTriangle className="w-4 h-4 text-amber-400 stroke-[2.5]" />
              ) : (
                <X className="w-4 h-4 text-brand-red stroke-[2.5]" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="text-xs text-zinc-500">{answer.exercise.pairLabel}</span>
              </div>
              <div className="flex items-center gap-3 text-xs flex-wrap">
                <span className="text-zinc-400">
                  Correto:{" "}
                  <span className="font-mono font-bold text-brand-green">
                    {answer.exercise.verbs[0].correctAnswer} / {answer.exercise.verbs[1].correctAnswer}
                  </span>
                </span>
                {!answer.isCorrect && (
                  <span className="text-zinc-500">
                    Você:{" "}
                    <span className="font-mono text-brand-red">
                      {answer.userAnswers[0] || "—"} / {answer.userAnswers[1] || "—"}
                    </span>
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => { resetCorrelation(); router.push("/"); }}
          className="flex-1 py-3.5 border border-dark-border bg-zinc-900/50 hover:bg-zinc-800 text-zinc-300 font-semibold rounded-xl text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4" />
          Voltar ao Menu
        </button>
        <button
          onClick={startCorrelation}
          className="flex-1 py-3.5 bg-gradient-to-r from-fuchsia-500 to-violet-400 hover:opacity-95 active:scale-95 text-zinc-950 font-extrabold rounded-xl text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-fuchsia-500/10"
        >
          <RotateCcw className="w-4 h-4" />
          Praticar Novamente
        </button>
      </div>
    </div>
  );
}
