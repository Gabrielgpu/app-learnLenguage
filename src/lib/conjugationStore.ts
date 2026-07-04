import { create } from "zustand";
import {
  ConjugationExercise,
  ConjugationAnswer,
  Difficulty,
  CheckConjugationResponse,
} from "./conjugationTypes";

type ConjugationPhase =
  | "home"
  | "conjugation-exercise"
  | "conjugation-result";

interface ConjugationState {
  // Navigation
  phase: ConjugationPhase;

  // Session config
  difficulty: Difficulty;
  selectedTenses: string[];

  // Current exercise
  currentExercise: ConjugationExercise | null;
  currentExerciseSource: string;
  hintsUsed: number;

  // Session history
  answers: ConjugationAnswer[];

  // UI state
  loading: boolean;
  error: string | null;

  // Actions
  setDifficulty: (d: Difficulty) => void;
  toggleTense: (tense: string) => void;
  startConjugation: () => Promise<void>;
  useHint: () => void;
  submitConjugation: (userAnswer: string) => Promise<void>;
  nextExercise: () => Promise<void>;
  resetConjugation: () => void;
}

const TOTAL_EXERCISES = 5;

function getApiKeys() {
  if (typeof window === "undefined") return {};
  return {
    grokKey: localStorage.getItem("grok_api_key") || "",
    geminiKey: localStorage.getItem("gemini_api_key") || "",
    openaiKey: localStorage.getItem("openai_api_key") || "",
  };
}

async function fetchExercise(
  difficulty: Difficulty,
  selectedTenses: string[],
  excludeVerbs: string[]
): Promise<{ exercise: ConjugationExercise; source: string }> {
  const { grokKey, geminiKey, openaiKey } = getApiKeys();
  const response = await fetch("/api/conjugation-exercise", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(grokKey ? { "x-grok-api-key": grokKey } : {}),
      ...(geminiKey ? { "x-gemini-api-key": geminiKey } : {}),
      ...(openaiKey ? { "x-openai-api-key": openaiKey } : {}),
    },
    body: JSON.stringify({ difficulty, selectedTenses, excludeVerbs }),
  });

  if (!response.ok) {
    throw new Error("Erro ao gerar exercício de conjugação.");
  }

  const exercise: ConjugationExercise = await response.json();
  const source = response.headers.get("x-data-source") || "mock";
  return { exercise, source };
}

async function checkAnswer(
  exercise: ConjugationExercise,
  userAnswer: string
): Promise<CheckConjugationResponse> {
  const { grokKey, geminiKey, openaiKey } = getApiKeys();
  const response = await fetch("/api/check-conjugation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(grokKey ? { "x-grok-api-key": grokKey } : {}),
      ...(geminiKey ? { "x-gemini-api-key": geminiKey } : {}),
      ...(openaiKey ? { "x-openai-api-key": openaiKey } : {}),
    },
    body: JSON.stringify({
      verb: exercise.verb,
      tense: exercise.tense,
      person: exercise.person,
      correctAnswer: exercise.correctAnswer,
      userAnswer,
      fullConjugation: exercise.fullConjugation,
    }),
  });

  if (!response.ok) {
    // Fallback to simple comparison
    const isCorrect =
      userAnswer.trim().toLowerCase() ===
      exercise.correctAnswer.trim().toLowerCase();
    return {
      isCorrect,
      feedback: isCorrect
        ? "Correto!"
        : `A resposta correta é "${exercise.correctAnswer}".`,
      feedbackType: isCorrect ? "correct" : "other",
    };
  }

  return response.json();
}

function calcScore(isCorrect: boolean, hintsUsed: number): number {
  if (!isCorrect) return 0;
  return Math.max(3 - hintsUsed, 1);
}

export const useConjugationStore = create<ConjugationState>((set, get) => ({
  phase: "home",
  difficulty: "medium",
  selectedTenses: [],
  currentExercise: null,
  currentExerciseSource: "mock",
  hintsUsed: 0,
  answers: [],
  loading: false,
  error: null,

  setDifficulty: (d) => set({ difficulty: d }),

  toggleTense: (tense) => {
    const { selectedTenses } = get();
    if (selectedTenses.includes(tense)) {
      set({ selectedTenses: selectedTenses.filter((t) => t !== tense) });
    } else {
      set({ selectedTenses: [...selectedTenses, tense] });
    }
  },

  startConjugation: async () => {
    set({
      phase: "conjugation-exercise",
      answers: [],
      loading: true,
      error: null,
      currentExercise: null,
      hintsUsed: 0,
    });

    try {
      const { difficulty, selectedTenses } = get();
      const { exercise, source } = await fetchExercise(
        difficulty,
        selectedTenses,
        []
      );
      set({
        currentExercise: exercise,
        currentExerciseSource: source,
        loading: false,
      });
    } catch (err) {
      set({
        error:
          err instanceof Error ? err.message : "Erro ao carregar exercício.",
        loading: false,
      });
    }
  },

  useHint: () => {
    const { hintsUsed } = get();
    if (hintsUsed < 3) {
      set({ hintsUsed: hintsUsed + 1 });
    }
  },

  submitConjugation: async (userAnswer: string) => {
    const { currentExercise, hintsUsed, answers } = get();
    if (!currentExercise) return;

    set({ loading: true });

    try {
      const result = await checkAnswer(currentExercise, userAnswer);
      const score = calcScore(result.isCorrect, hintsUsed);

      const newAnswer: ConjugationAnswer = {
        exercise: currentExercise,
        userAnswer,
        isCorrect: result.isCorrect,
        hintsUsed,
        feedback: result.feedback,
        feedbackType: result.feedbackType,
        score,
      };

      set({ answers: [...answers, newAnswer], loading: false });
    } catch {
      // Fallback
      const isCorrect =
        userAnswer.trim().toLowerCase() ===
        currentExercise.correctAnswer.trim().toLowerCase();
      const score = calcScore(isCorrect, hintsUsed);
      const newAnswer: ConjugationAnswer = {
        exercise: currentExercise,
        userAnswer,
        isCorrect,
        hintsUsed,
        feedback: isCorrect
          ? "Correto!"
          : `A resposta correta é "${currentExercise.correctAnswer}".`,
        feedbackType: isCorrect ? "correct" : "other",
        score,
      };
      set({ answers: [...answers, newAnswer], loading: false });
    }
  },

  nextExercise: async () => {
    const { answers, difficulty, selectedTenses } = get();

    if (answers.length >= TOTAL_EXERCISES) {
      set({ phase: "conjugation-result" });
      return;
    }

    set({ loading: true, error: null, currentExercise: null, hintsUsed: 0 });

    try {
      const excludeVerbs = answers.map((a) => a.exercise.verb);
      const { exercise, source } = await fetchExercise(
        difficulty,
        selectedTenses,
        excludeVerbs
      );
      set({
        currentExercise: exercise,
        currentExerciseSource: source,
        loading: false,
      });
    } catch (err) {
      set({
        error:
          err instanceof Error
            ? err.message
            : "Erro ao carregar próximo exercício.",
        loading: false,
      });
    }
  },

  resetConjugation: () => {
    set({
      phase: "home",
      difficulty: "medium",
      selectedTenses: [],
      currentExercise: null,
      currentExerciseSource: "mock",
      hintsUsed: 0,
      answers: [],
      loading: false,
      error: null,
    });
  },
}));
