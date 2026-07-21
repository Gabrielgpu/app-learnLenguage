import { FeedbackType } from "./conjugationTypes";

export type DerivedVerbGroupId = "por" | "ter" | "vir" | "ver";

export interface DerivedVerbPart {
  infinitive: string;
  tense: string;
  correctAnswer: string;
}

export interface DerivedVerbExercise {
  sentence: string;
  groupId: DerivedVerbGroupId;
  groupLabel: string;
  rootVerb: DerivedVerbPart;
  derivedVerb: DerivedVerbPart;
  explanation: string;
}

export interface DerivedVerbAnswer {
  exercise: DerivedVerbExercise;
  userAnswers: [string, string];
  isCorrect: boolean;
  blankResults: [boolean, boolean];
  feedback: string;
  feedbackType: FeedbackType;
}

export const BLANK_PLACEHOLDER = "______";

/**
 * Encontra o maior sufixo comum (case-insensitive) entre a forma do verbo
 * derivado e a do verbo raiz, para destacar visualmente que o derivado
 * "herda" a terminação do primitivo (ex.: "manteve" = "man" + "teve").
 * Se não houver um sufixo limpo em comum, retorna a palavra inteira sem prefixo.
 */
export function splitDerivedSuffix(
  root: string,
  derived: string
): { prefix: string; shared: string } {
  const rootLower = root.toLowerCase();
  const derivedLower = derived.toLowerCase();

  if (rootLower.length > 0 && derivedLower.endsWith(rootLower) && derivedLower.length > rootLower.length) {
    const prefixLength = derived.length - root.length;
    return { prefix: derived.slice(0, prefixLength), shared: derived.slice(prefixLength) };
  }

  return { prefix: "", shared: derived };
}
