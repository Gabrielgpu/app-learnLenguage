"use client";

import React from "react";
import { CorrelationAnswer } from "@/lib/correlationTypes";
import { Check, X, AlertTriangle, Lightbulb, ArrowRight } from "lucide-react";

interface CorrelationFeedbackProps {
  answer: CorrelationAnswer;
  onNext: () => void;
  questionNumber: number;
  totalQuestions: number;
}

export default function CorrelationFeedback({
  answer,
  onNext,
  questionNumber,
  totalQuestions,
}: CorrelationFeedbackProps) {
  const { isCorrect, feedbackType, feedback, exercise, userAnswers, blankResults } = answer;
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
              <span className="font-mono font-bold text-brand-green">
                {exercise.verbs[0].correctAnswer}
              </span>{" "}
              +{" "}
              <span className="font-mono font-bold text-brand-green">
                {exercise.verbs[1].correctAnswer}
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
            <div className="flex flex-col gap-1.5 text-sm">
              {[0, 1].map((i) => (
                <span key={i} className="text-zinc-400 flex items-center gap-1.5">
                  {blankResults[i] ? (
                    <Check className="w-3.5 h-3.5 text-brand-green shrink-0" />
                  ) : (
                    <X className="w-3.5 h-3.5 text-brand-red shrink-0" />
                  )}
                  {i === 0 ? "1ª lacuna" : "2ª lacuna"}:{" "}
                  <span className="font-mono font-bold text-brand-red">
                    {userAnswers[i] || <em className="opacity-50">vazia</em>}
                  </span>{" "}
                  → correto:{" "}
                  <span className="font-mono font-bold text-brand-green">
                    {exercise.verbs[i].correctAnswer}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="flex items-start gap-3 p-4 rounded-xl border border-dark-border bg-zinc-900/40 text-sm">
        <Lightbulb className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
        <p className="text-zinc-300 leading-relaxed">{feedback}</p>
      </div>

      <div className="p-4 rounded-xl border border-dark-border bg-zinc-900/30 text-sm">
        <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1.5">
          {exercise.pairLabel}
        </p>
        <p className="text-zinc-300 leading-relaxed">{exercise.explanation}</p>
      </div>

      <button
        onClick={onNext}
        className="w-full py-4 bg-gradient-to-r from-fuchsia-500 to-violet-400 hover:opacity-95 active:scale-95 text-zinc-950 font-extrabold rounded-xl transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-xl shadow-fuchsia-500/5"
      >
        {isLastQuestion ? "Ver Resultado" : "Próxima Frase"}
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
      </button>
    </div>
  );
}
