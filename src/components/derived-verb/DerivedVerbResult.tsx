"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useDerivedVerbStore } from "@/lib/derivedVerbStore";
import { DerivedVerbAnswer } from "@/lib/derivedVerbTypes";
import { getPerformanceLabel } from "@/lib/performance";
import ScoreRing from "@/components/ScoreRing";
import { Check, X, Home, RotateCcw, Trophy, AlertTriangle } from "lucide-react";

const TOTAL_EXERCISES = 5;

export default function DerivedVerbResult() {
  const { answers, startDerivedVerb, resetDerivedVerb } = useDerivedVerbStore();
  const router = useRouter();

  const correct = answers.filter((a) => a.isCorrect).length;
  const percent = Math.round((correct / TOTAL_EXERCISES) * 100);
  const { label, color } = getPerformanceLabel(percent);
  const isPerfect = correct === TOTAL_EXERCISES;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 md:py-12 flex flex-col animate-slide-up">
      <div className="text-center mb-8">
        <div className="inline-flex p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-4">
          <Trophy className="w-8 h-8 text-emerald-400" />
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-100 mb-1">Sessão Concluída!</h2>
        <p className="text-zinc-400 text-sm">Modo Verbos Derivados</p>
      </div>

      {isPerfect && (
        <div className="mb-6 text-center p-4 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 to-lime-400/10 animate-scale-in">
          <p className="text-lg font-extrabold text-emerald-300">
            🎉 Perfeito! Você dominou os verbos derivados.
          </p>
        </div>
      )}

      <div className="flex flex-col items-center mb-8">
        <ScoreRing percent={percent} gradientId="derivedVerbScoreGrad" colors={["#10b981", "#a3e635"]}>
          <span className="text-3xl font-black text-zinc-100">{correct}</span>
          <span className="text-xs text-zinc-500 font-semibold">/ {TOTAL_EXERCISES} corretas</span>
        </ScoreRing>
        <p className={`mt-3 text-lg font-extrabold ${color}`}>{label}</p>
        <p className="text-xs text-zinc-500 mt-1">{percent}% de aproveitamento</p>
      </div>

      <div className="space-y-3 mb-8">
        <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider px-1 mb-2">
          Revisão dos exercícios
        </p>
        {answers.map((answer: DerivedVerbAnswer, i) => (
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
                <span className="text-xs text-zinc-500">{answer.exercise.groupLabel}</span>
              </div>
              <div className="flex items-center gap-3 text-xs flex-wrap">
                <span className="text-zinc-400">
                  Correto:{" "}
                  <span className="font-mono font-bold text-brand-green">
                    {answer.exercise.rootVerb.correctAnswer} / {answer.exercise.derivedVerb.correctAnswer}
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
          onClick={() => { resetDerivedVerb(); router.push("/"); }}
          className="flex-1 py-3.5 border border-dark-border bg-zinc-900/50 hover:bg-zinc-800 text-zinc-300 font-semibold rounded-xl text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4" />
          Voltar ao Menu
        </button>
        <button
          onClick={startDerivedVerb}
          className="flex-1 py-3.5 bg-gradient-to-r from-emerald-500 to-lime-400 hover:opacity-95 active:scale-95 text-zinc-950 font-extrabold rounded-xl text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/10"
        >
          <RotateCcw className="w-4 h-4" />
          Praticar Novamente
        </button>
      </div>
    </div>
  );
}
