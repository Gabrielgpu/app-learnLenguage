// Types for Modo Conjugação Prática

export type Difficulty = "easy" | "medium" | "hard";

export type FeedbackType =
  | "correct"
  | "typo"
  | "wrong_tense"
  | "wrong_person"
  | "other";

export interface ConjugationExercise {
  verb: string;
  tense: string;
  person: string;
  correctAnswer: string;
  fullConjugation: Record<string, string>;
  explanation: string;
}

export interface ConjugationAnswer {
  exercise: ConjugationExercise;
  userAnswer: string;
  isCorrect: boolean;
  hintsUsed: number; // 0, 1, 2 or 3
  feedback: string;
  feedbackType: FeedbackType;
  score: number; // 3 correct no hints, 2 one hint, 1 two hints, 0 three hints or wrong
}

export interface CheckConjugationResponse {
  isCorrect: boolean;
  feedback: string;
  feedbackType: FeedbackType;
}

export const PERSONS = ["Eu", "Tu", "Ele/Ela", "Nós", "Vós", "Eles/Elas"] as const;
export type Person = (typeof PERSONS)[number];

export const PERSON_KEYS: Record<string, string> = {
  "Eu": "eu",
  "Tu": "tu",
  "Ele/Ela": "ele",
  "Nós": "nos",
  "Vós": "vos",
  "Eles/Elas": "eles",
};
