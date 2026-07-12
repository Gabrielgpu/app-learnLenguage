// Types for Modo Correlação Verbal

import { FeedbackType } from "./conjugationTypes";

export type CorrelationPairId =
  | "presente-presente-subjuntivo"
  | "futuro-subjuntivo-futuro-presente"
  | "imperfeito-subjuntivo-futuro-preterito";

export interface CorrelationVerb {
  infinitive: string; // infinitivo, e.g. "fazer"
  tense: string;
  correctAnswer: string;
}

export interface CorrelationExercise {
  sentence: string; // contém "______" duas vezes, na ordem dos verbos
  pairId: CorrelationPairId;
  pairLabel: string; // "Presente do Indicativo + Presente do Subjuntivo"
  verbs: [CorrelationVerb, CorrelationVerb];
  explanation: string;
}

export interface CorrelationAnswer {
  exercise: CorrelationExercise;
  userAnswers: [string, string];
  isCorrect: boolean; // ambas as lacunas corretas
  blankResults: [boolean, boolean];
  feedback: string;
  feedbackType: FeedbackType;
}

export const BLANK_PLACEHOLDER = "______";
