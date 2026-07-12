"use client";

import React from "react";
import { FillBlankAnswer } from "@/lib/fillBlankTypes";
import FeedbackPanel from "@/components/FeedbackPanel";

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

  return (
    <FeedbackPanel
      isCorrect={isCorrect}
      feedbackType={feedbackType}
      feedback={feedback}
      explanation={exercise.explanation}
      onNext={onNext}
      isLastQuestion={questionNumber >= totalQuestions}
      buttonClassName="bg-gradient-to-r from-brand-purple to-brand-cyan shadow-brand-purple/5"
      correctSummary={
        <span className="font-mono font-bold text-brand-green">{exercise.correctAnswer}</span>
      }
      incorrectSummary={
        <>
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
        </>
      }
    />
  );
}
