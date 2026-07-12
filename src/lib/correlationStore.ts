import { create } from "zustand";
import {
  CorrelationExercise,
  CorrelationAnswer,
  CorrelationPairId,
} from "./correlationTypes";
import { correlationQuestions } from "./correlationQuestions";
import { FeedbackType } from "./conjugationTypes";

type CorrelationPhase = "home" | "correlation-exercise" | "correlation-result";

const TOTAL_EXERCISES = 5;
const ALL_PAIR_IDS = Object.keys(correlationQuestions) as CorrelationPairId[];

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function buildSession(selectedPairs: CorrelationPairId[]): CorrelationExercise[] {
  const pairPool = selectedPairs.length > 0 ? selectedPairs : ALL_PAIR_IDS;
  const pool = pairPool.flatMap((p) => correlationQuestions[p] || []);
  return shuffle(pool).slice(0, TOTAL_EXERCISES);
}

function checkAnswers(
  exercise: CorrelationExercise,
  userAnswers: [string, string]
): { isCorrect: boolean; blankResults: [boolean, boolean]; feedback: string; feedbackType: FeedbackType } {
  const blankResults: [boolean, boolean] = [
    userAnswers[0].trim().toLowerCase() === exercise.verbs[0].correctAnswer.trim().toLowerCase(),
    userAnswers[1].trim().toLowerCase() === exercise.verbs[1].correctAnswer.trim().toLowerCase(),
  ];
  const isCorrect = blankResults[0] && blankResults[1];

  if (isCorrect) {
    return {
      isCorrect: true,
      blankResults,
      feedback: `✅ Correto! "${exercise.verbs[0].correctAnswer}" e "${exercise.verbs[1].correctAnswer}" formam a correlação verbal correta.`,
      feedbackType: "correct",
    };
  }

  const wrongParts: string[] = [];
  if (!blankResults[0]) wrongParts.push(`a 1ª lacuna deveria ser "${exercise.verbs[0].correctAnswer}"`);
  if (!blankResults[1]) wrongParts.push(`a 2ª lacuna deveria ser "${exercise.verbs[1].correctAnswer}"`);

  return {
    isCorrect: false,
    blankResults,
    feedback: `Resposta incorreta: ${wrongParts.join(" e ")}.`,
    feedbackType: "other",
  };
}

interface CorrelationState {
  phase: CorrelationPhase;
  selectedPairs: CorrelationPairId[];
  session: CorrelationExercise[];
  currentExercise: CorrelationExercise | null;
  answers: CorrelationAnswer[];

  togglePair: (pairId: CorrelationPairId) => void;
  startCorrelation: () => void;
  submitCorrelation: (userAnswers: [string, string]) => void;
  nextCorrelation: () => void;
  resetCorrelation: () => void;
}

export const useCorrelationStore = create<CorrelationState>((set, get) => ({
  phase: "home",
  selectedPairs: [],
  session: [],
  currentExercise: null,
  answers: [],

  togglePair: (pairId) => {
    const { selectedPairs } = get();
    if (selectedPairs.includes(pairId)) {
      set({ selectedPairs: selectedPairs.filter((p) => p !== pairId) });
    } else {
      set({ selectedPairs: [...selectedPairs, pairId] });
    }
  },

  startCorrelation: () => {
    const { selectedPairs } = get();
    if (selectedPairs.length === 0) return;

    const session = buildSession(selectedPairs);
    set({
      phase: "correlation-exercise",
      session,
      currentExercise: session[0] ?? null,
      answers: [],
    });
  },

  submitCorrelation: (userAnswers: [string, string]) => {
    const { currentExercise, answers } = get();
    if (!currentExercise) return;

    const result = checkAnswers(currentExercise, userAnswers);
    const newAnswer: CorrelationAnswer = {
      exercise: currentExercise,
      userAnswers,
      ...result,
    };
    set({ answers: [...answers, newAnswer] });
  },

  nextCorrelation: () => {
    const { session, answers } = get();

    if (answers.length >= session.length) {
      set({ phase: "correlation-result" });
      return;
    }

    set({ currentExercise: session[answers.length] });
  },

  resetCorrelation: () => {
    set({
      phase: "home",
      selectedPairs: [],
      session: [],
      currentExercise: null,
      answers: [],
    });
  },
}));
