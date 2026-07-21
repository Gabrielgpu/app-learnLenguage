import { create } from "zustand";
import {
  FillBlankExercise,
  FillBlankAnswer,
  CheckFillBlankResponse,
} from "./fillBlankTypes";
import { fetchWithApiKeys } from "./aiApiClient";
import { useProgressStore } from "./progress/progressStore";
import { fillBlankKey } from "./progress/keys";
import { pickDueTarget } from "./progress/selection";

type FillBlankPhase = "home" | "fillblank-exercise" | "fillblank-result";

interface FillBlankState {
  phase: FillBlankPhase;
  selectedTenses: string[];
  currentExercise: FillBlankExercise | null;
  currentExerciseSource: string;
  answers: FillBlankAnswer[];
  loading: boolean;
  error: string | null;

  toggleTense: (tense: string) => void;
  startFillBlank: () => Promise<void>;
  submitFillBlank: (userAnswer: string) => Promise<void>;
  nextFillBlank: () => Promise<void>;
  resetFillBlank: () => void;
}

const TOTAL_EXERCISES = 5;

async function fetchExercise(
  selectedTenses: string[],
  excludeSentences: string[]
): Promise<{ exercise: FillBlankExercise; source: string }> {
  const target = pickDueTarget(
    "complete-frase",
    useProgressStore.getState().items,
    selectedTenses
  );

  const response = await fetchWithApiKeys("/api/fill-blank-exercise", {
    selectedTenses,
    excludeSentences,
    targetVerb: target?.verb,
    targetTense: target?.tense,
  });

  if (!response.ok) {
    throw new Error("Erro ao gerar exercício de Complete a Frase.");
  }

  const exercise: FillBlankExercise = await response.json();
  const source = response.headers.get("x-data-source") || "mock";
  return { exercise, source };
}

async function checkAnswer(
  exercise: FillBlankExercise,
  userAnswer: string
): Promise<CheckFillBlankResponse> {
  const response = await fetchWithApiKeys("/api/check-fill-blank", {
    sentence: exercise.sentence,
    verb: exercise.verb,
    tense: exercise.tense,
    correctAnswer: exercise.correctAnswer,
    userAnswer,
  });

  if (!response.ok) {
    const isCorrect =
      userAnswer.trim().toLowerCase() === exercise.correctAnswer.trim().toLowerCase();
    return {
      isCorrect,
      feedback: isCorrect ? "Correto!" : `A resposta correta é "${exercise.correctAnswer}".`,
      feedbackType: isCorrect ? "correct" : "other",
    };
  }

  return response.json();
}

export const useFillBlankStore = create<FillBlankState>((set, get) => ({
  phase: "home",
  selectedTenses: [],
  currentExercise: null,
  currentExerciseSource: "mock",
  answers: [],
  loading: false,
  error: null,

  toggleTense: (tense) => {
    const { selectedTenses } = get();
    if (selectedTenses.includes(tense)) {
      set({ selectedTenses: selectedTenses.filter((t) => t !== tense) });
    } else {
      set({ selectedTenses: [...selectedTenses, tense] });
    }
  },

  startFillBlank: async () => {
    const { selectedTenses } = get();
    if (selectedTenses.length === 0) return;

    set({
      phase: "fillblank-exercise",
      answers: [],
      loading: true,
      error: null,
      currentExercise: null,
    });

    try {
      const { exercise, source } = await fetchExercise(selectedTenses, []);
      set({ currentExercise: exercise, currentExerciseSource: source, loading: false });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Erro ao carregar exercício.",
        loading: false,
      });
    }
  },

  submitFillBlank: async (userAnswer: string) => {
    const { currentExercise, answers } = get();
    if (!currentExercise) return;

    set({ loading: true });

    const recordProgress = (isCorrect: boolean) => {
      const { verb, tense } = currentExercise;
      useProgressStore
        .getState()
        .recordAnswer(fillBlankKey(verb, tense), "complete-frase", isCorrect, { verb, tense });
    };

    try {
      const result = await checkAnswer(currentExercise, userAnswer);
      const newAnswer: FillBlankAnswer = {
        exercise: currentExercise,
        userAnswer,
        isCorrect: result.isCorrect,
        feedback: result.feedback,
        feedbackType: result.feedbackType,
      };
      set({ answers: [...answers, newAnswer], loading: false });
      recordProgress(result.isCorrect);
    } catch {
      const isCorrect =
        userAnswer.trim().toLowerCase() === currentExercise.correctAnswer.trim().toLowerCase();
      const newAnswer: FillBlankAnswer = {
        exercise: currentExercise,
        userAnswer,
        isCorrect,
        feedback: isCorrect ? "Correto!" : `A resposta correta é "${currentExercise.correctAnswer}".`,
        feedbackType: isCorrect ? "correct" : "other",
      };
      set({ answers: [...answers, newAnswer], loading: false });
      recordProgress(isCorrect);
    }
  },

  nextFillBlank: async () => {
    const { answers, selectedTenses } = get();

    if (answers.length >= TOTAL_EXERCISES) {
      set({ phase: "fillblank-result" });
      return;
    }

    set({ loading: true, error: null, currentExercise: null });

    try {
      const excludeSentences = answers.map((a) => a.exercise.sentence);
      const { exercise, source } = await fetchExercise(selectedTenses, excludeSentences);
      set({ currentExercise: exercise, currentExerciseSource: source, loading: false });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Erro ao carregar próximo exercício.",
        loading: false,
      });
    }
  },

  resetFillBlank: () => {
    set({
      phase: "home",
      selectedTenses: [],
      currentExercise: null,
      currentExerciseSource: "mock",
      answers: [],
      loading: false,
      error: null,
    });
  },
}));
