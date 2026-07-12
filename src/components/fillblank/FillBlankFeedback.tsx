"use client";

import React from "react";
import { FillBlankAnswer } from "@/lib/fillBlankTypes";
import { Check, X, AlertTriangle, Lightbulb, ArrowRight } from "lucide-react";

interface FillBlankFeedbackProps {
  answer: FillBlankAnswer;
  onNext: () => void;
  questionNumber: number;
  totalQuestions: number;
}

export default function FillBlankFeedback({
  answer,
  onNext,
  questionNumber,
  totalQuestions,
}: FillBlankFeedbackProps) {
  const { isCorrect, feedbackType, feedback, exercise, userAnswer } = answer;
  const isLastQuestion = questionNumber >= totalQuestions;

  return (
    <div className="space-y-5 animate-slide-up">
      {isCorrect ? (
        <div className="flex items-start gap-4 p-5 rounded-2xl border border-brand-green/30 bg-brand-green/5">
          <div className="p-2 bg-brand-green/10 rounded-xl shrink-0">
            <Check className="w-6 h-6 text-brand-green stroke-[2.5]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-brand-green text-base">Correto!</p>
            <p className="text-sm text-zinc-300 mt-1">
              <span className="font-mono font-bold text-brand-green">{exercise.correctAnswer}</span>
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
                <span className="font-mono font-bold text-brand-green">{exercise.correctAnswer}</span>
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-start gap-3 p-4 rounded-xl border border-dark-border bg-zinc-900/40 text-sm">
        <Lightbulb className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
        <p className="text-zinc-300 leading-relaxed">{feedback}</p>
      </div>

      <div className="p-4 rounded-xl border border-dark-border bg-zinc-900/30 text-sm">
        <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5">Explicação</p>
        <p className="text-zinc-300 leading-relaxed">{exercise.explanation}</p>
      </div>

      <button
        onClick={onNext}
        className="w-full py-4 bg-gradient-to-r from-brand-purple to-brand-cyan hover:opacity-95 active:scale-95 text-zinc-950 font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-xl shadow-brand-purple/5"
      >
        {isLastQuestion ? "Ver Resultado" : "Próxima Frase"}
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
      </button>
    </div>
  );
}
