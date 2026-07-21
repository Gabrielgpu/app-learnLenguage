"use client";

import React from "react";
import { DerivedVerbAnswer, splitDerivedSuffix } from "@/lib/derivedVerbTypes";
import FeedbackPanel from "@/components/FeedbackPanel";
import { Check, X } from "lucide-react";

interface DerivedVerbFeedbackProps {
  answer: DerivedVerbAnswer;
  onNext: () => void;
  questionNumber: number;
  totalQuestions: number;
}

export default function DerivedVerbFeedback({
  answer,
  onNext,
  questionNumber,
  totalQuestions,
}: DerivedVerbFeedbackProps) {
  const { isCorrect, feedbackType, feedback, exercise, userAnswers, blankResults } = answer;
  const { prefix, shared } = splitDerivedSuffix(
    exercise.rootVerb.correctAnswer,
    exercise.derivedVerb.correctAnswer
  );

  return (
    <FeedbackPanel
      isCorrect={isCorrect}
      feedbackType={feedbackType}
      feedback={feedback}
      explanation={exercise.explanation}
      explanationLabel={exercise.groupLabel}
      onNext={onNext}
      isLastQuestion={questionNumber >= totalQuestions}
      buttonClassName="bg-gradient-to-r from-emerald-500 to-lime-400 shadow-emerald-500/5"
      correctSummary={
        <>
          <span className="font-mono font-bold text-brand-green">
            {exercise.rootVerb.correctAnswer}
          </span>{" "}
          +{" "}
          <span className="font-mono font-bold" title="A parte destacada é idêntica ao verbo primitivo">
            <span className="text-zinc-500">{prefix}</span>
            <span className="text-brand-green">{shared}</span>
          </span>
        </>
      }
      incorrectSummary={
        <>
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
                {i === 0 ? exercise.rootVerb.correctAnswer : exercise.derivedVerb.correctAnswer}
              </span>
            </span>
          ))}
        </>
      }
    />
  );
}
