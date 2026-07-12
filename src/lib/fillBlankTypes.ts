// Types for Modo Complete a Frase

import { FeedbackType } from "./conjugationTypes";

export interface FillBlankExercise {
  sentence: string; // contains "______" as the blank placeholder
  verb: string; // infinitive, e.g. "fazer"
  tense: string;
  correctAnswer: string;
  explanation: string;
}

export interface FillBlankAnswer {
  exercise: FillBlankExercise;
  userAnswer: string;
  isCorrect: boolean;
  feedback: string;
  feedbackType: FeedbackType;
}

export interface CheckFillBlankResponse {
  isCorrect: boolean;
  feedback: string;
  feedbackType: FeedbackType;
}

export const BLANK_PLACEHOLDER = "______";
