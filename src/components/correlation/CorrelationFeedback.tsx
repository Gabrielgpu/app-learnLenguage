"use client";

import React from "react";
import { CorrelationAnswer } from "@/lib/correlationTypes";
import FeedbackPanel from "@/components/FeedbackPanel";
import { Check, X } from "lucide-react";

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

  return (
    <FeedbackPanel
      isCorrect={isCorrect}
      feedbackType={feedbackType}
      feedback={feedback}
      explanation={exercise.explanation}
      explanationLabel={exercise.pairLabel}
      onNext={onNext}
      isLastQuestion={questionNumber >= totalQuestions}
      buttonClassName="bg-gradient-to-r from-fuchsia-500 to-violet-400 shadow-fuchsia-500/5"
      correctSummary={
        <>
          <span className="font-mono font-bold text-brand-green">
            {exercise.verbs[0].correctAnswer}
          </span>{" "}
          +{" "}
          <span className="font-mono font-bold text-brand-green">
            {exercise.verbs[1].correctAnswer}
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
                {exercise.verbs[i].correctAnswer}
              </span>
            </span>
          ))}
        </>
      }
    />
  );
}
