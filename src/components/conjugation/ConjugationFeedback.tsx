"use client";

import React from "react";
import { ConjugationAnswer } from "@/lib/conjugationTypes";
import {
  Check,
  X,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

interface ConjugationFeedbackProps {
  answer: ConjugationAnswer;
  onNext: () => void;
  questionNumber: number;
  totalQuestions: number;
}

const personLabels: Record<string, string> = {
  eu: "Eu",
  tu: "Tu",
  ele: "Ele/Ela",
  nos: "Nós",
  vos: "Vós",
  eles: "Eles/Elas",
};

export default function ConjugationFeedback({
  answer,
  onNext,
  questionNumber,
  totalQuestions,
}: ConjugationFeedbackProps) {
  const [showFullTable, setShowFullTable] = useState(!answer.isCorrect);

  const { isCorrect, feedbackType, feedback, hintsUsed, score, exercise, userAnswer } = answer;

  const scoreStars =
    score === 3 ? "⭐⭐⭐" : score === 2 ? "⭐⭐" : score === 1 ? "⭐" : "";

  const isLastQuestion = questionNumber >= totalQuestions;

  return (
    <div className="space-y-5 animate-slide-up">
      {/* ── Result Banner ─────────────────────────────────────────────────── */}
      {isCorrect ? (
        <div className="flex items-start gap-4 p-5 rounded-2xl border border-brand-green/30 bg-brand-green/5">
          <div className="p-2 bg-brand-green/10 rounded-xl shrink-0">
            <Check className="w-6 h-6 text-brand-green stroke-[2.5]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-bold text-brand-green text-base">Correto!</p>
              {hintsUsed === 0 && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green font-semibold">
                  Sem dicas {scoreStars}
                </span>
              )}
              {hintsUsed > 0 && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-semibold">
                  {hintsUsed} dica{hintsUsed > 1 ? "s" : ""} usada{hintsUsed > 1 ? "s" : ""} {scoreStars}
                </span>
              )}
            </div>
            <p className="text-sm text-zinc-300 mt-1">
              <span className="font-mono font-bold text-brand-green">
                {exercise.correctAnswer}
              </span>
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-4 p-5 rounded-2xl border border-brand-red/30 bg-brand-red/5">
          <div className="p-2 bg-brand-red/10 rounded-xl shrink-0">
            {feedbackType === "typo" ? (
              <AlertTriangle className="w-6 h-6 text-amber-400 stroke-[2.5]" />
            ) : (
              <X className="w-6 h-6 text-brand-red stroke-[2.5]" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-brand-red text-base mb-1">
              {feedbackType === "typo" ? "Erro de digitação" : "Resposta incorreta"}
            </p>
            <div className="flex flex-col gap-1 text-sm">
              <span className="text-zinc-400">
                Sua resposta:{" "}
                <span className="font-mono font-bold text-brand-red">
                  {userAnswer || <em className="opacity-50">vazia</em>}
                </span>
              </span>
              <span className="text-zinc-400">
                Resposta correta:{" "}
                <span className="font-mono font-bold text-brand-green">
                  {exercise.correctAnswer}
                </span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ── Intelligent Feedback ──────────────────────────────────────────── */}
      <div className="flex items-start gap-3 p-4 rounded-xl border border-dark-border bg-zinc-900/40 text-sm">
        <Lightbulb className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
        <p className="text-zinc-300 leading-relaxed">{feedback}</p>
      </div>

      {/* ── Explanation ───────────────────────────────────────────────────── */}
      <div className="p-4 rounded-xl border border-dark-border bg-zinc-900/30 text-sm">
        <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5">
          Explicação
        </p>
        <p className="text-zinc-300 leading-relaxed">{exercise.explanation}</p>
      </div>

      {/* ── Full Conjugation Table ─────────────────────────────────────────── */}
      <div className="rounded-xl border border-dark-border overflow-hidden">
        <button
          onClick={() => setShowFullTable((v) => !v)}
          className="w-full flex items-center justify-between px-4 py-3 bg-zinc-900/60 hover:bg-zinc-800/60 transition-colors text-sm font-semibold text-zinc-300 cursor-pointer"
        >
          <span>
            Conjugação completa —{" "}
            <span className="text-brand-cyan font-mono">
              {exercise.verb.toLowerCase()}
            </span>{" "}
            <span className="text-zinc-500 font-normal">({exercise.tense})</span>
          </span>
          <ChevronDown
            className={`w-4 h-4 text-zinc-500 transition-transform ${
              showFullTable ? "rotate-180" : ""
            }`}
          />
        </button>

        {showFullTable && (
          <div className="animate-fade-in">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-dark-border bg-zinc-900/40">
                  <th className="text-left px-4 py-2 text-xs font-bold text-zinc-500 uppercase tracking-wider">
                    Pessoa
                  </th>
                  <th className="text-left px-4 py-2 text-xs font-bold text-zinc-500 uppercase tracking-wider">
                    Conjugação
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(exercise.fullConjugation).map(([key, value]) => {
                  const isCurrentPerson =
                    personLabels[key] === exercise.person;
                  return (
                    <tr
                      key={key}
                      className={`border-b border-dark-border/50 last:border-0 ${
                        isCurrentPerson
                          ? "bg-brand-purple/5"
                          : "hover:bg-zinc-900/40"
                      } transition-colors`}
                    >
                      <td
                        className={`px-4 py-2.5 font-medium ${
                          isCurrentPerson ? "text-brand-purple-light" : "text-zinc-400"
                        }`}
                      >
                        {personLabels[key] || key}
                        {isCurrentPerson && (
                          <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-brand-purple/20 text-brand-purple-light font-bold">
                            ← este
                          </span>
                        )}
                      </td>
                      <td
                        className={`px-4 py-2.5 font-mono font-bold ${
                          isCurrentPerson ? "text-brand-cyan" : "text-zinc-200"
                        }`}
                      >
                        {value}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Next Button ───────────────────────────────────────────────────── */}
      <button
        onClick={onNext}
        className="w-full py-4 bg-gradient-to-r from-brand-purple to-brand-cyan hover:opacity-95 active:scale-95 text-zinc-950 font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-xl shadow-brand-purple/5"
      >
        {isLastQuestion ? "Ver Resultado" : "Próximo Exercício"}
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
      </button>
    </div>
  );
}
