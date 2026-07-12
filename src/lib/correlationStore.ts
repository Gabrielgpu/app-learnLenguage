import { create } from "zustand";
import {
  CorrelationExercise,
  CorrelationAnswer,
  CheckCorrelationResponse,
  CorrelationPairId,
} from "./correlationTypes";

type CorrelationPhase = "home" | "correlation-exercise" | "correlation-result";

interface CorrelationState {
  phase: CorrelationPhase;
  selectedPairs: CorrelationPairId[];
  currentExercise: CorrelationExercise | null;
  currentExerciseSource: string;
  answers: CorrelationAnswer[];
  loading: boolean;
  error: string | null;

  togglePair: (pairId: CorrelationPairId) => void;
  startCorrelation: () => Promise<void>;
  submitCorrelation: (userAnswers: [string, string]) => Promise<void>;
  nextCorrelation: () => Promise<void>;
  resetCorrelation: () => void;
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
  selectedPairs: CorrelationPairId[],
  excludeSentences: string[]
): Promise<{ exercise: CorrelationExercise; source: string }> {
  const { grokKey, geminiKey, openaiKey } = getApiKeys();
  const response = await fetch("/api/correlation-exercise", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(grokKey ? { "x-grok-api-key": grokKey } : {}),
      ...(geminiKey ? { "x-gemini-api-key": geminiKey } : {}),
      ...(openaiKey ? { "x-openai-api-key": openaiKey } : {}),
    },
    body: JSON.stringify({ selectedPairs, excludeSentences }),
  });

  if (!response.ok) {
    throw new Error("Erro ao gerar exercício de Correlação Verbal.");
  }

  const exercise: CorrelationExercise = await response.json();
  const source = response.headers.get("x-data-source") || "mock";
  return { exercise, source };
}

async function checkAnswers(
  exercise: CorrelationExercise,
  userAnswers: [string, string]
): Promise<CheckCorrelationResponse> {
  const { grokKey, geminiKey, openaiKey } = getApiKeys();
  const response = await fetch("/api/check-correlation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(grokKey ? { "x-grok-api-key": grokKey } : {}),
      ...(geminiKey ? { "x-gemini-api-key": geminiKey } : {}),
      ...(openaiKey ? { "x-openai-api-key": openaiKey } : {}),
    },
    body: JSON.stringify({
      sentence: exercise.sentence,
      pairLabel: exercise.pairLabel,
      verbs: exercise.verbs,
      userAnswers,
    }),
  });

  if (!response.ok) {
    const blankResults: [boolean, boolean] = [
      userAnswers[0].trim().toLowerCase() === exercise.verbs[0].correctAnswer.trim().toLowerCase(),
      userAnswers[1].trim().toLowerCase() === exercise.verbs[1].correctAnswer.trim().toLowerCase(),
    ];
    const isCorrect = blankResults[0] && blankResults[1];
    return {
      isCorrect,
      blankResults,
      feedback: isCorrect
        ? "Correto!"
        : `As respostas corretas são "${exercise.verbs[0].correctAnswer}" e "${exercise.verbs[1].correctAnswer}".`,
      feedbackType: isCorrect ? "correct" : "other",
    };
  }

  return response.json();
}

export const useCorrelationStore = create<CorrelationState>((set, get) => ({
  phase: "home",
  selectedPairs: [],
  currentExercise: null,
  currentExerciseSource: "mock",
  answers: [],
  loading: false,
  error: null,

  togglePair: (pairId) => {
    const { selectedPairs } = get();
    if (selectedPairs.includes(pairId)) {
      set({ selectedPairs: selectedPairs.filter((p) => p !== pairId) });
    } else {
      set({ selectedPairs: [...selectedPairs, pairId] });
    }
  },

  startCorrelation: async () => {
    const { selectedPairs } = get();
    if (selectedPairs.length === 0) return;

    set({
      phase: "correlation-exercise",
      answers: [],
      loading: true,
      error: null,
      currentExercise: null,
    });

    try {
      const { exercise, source } = await fetchExercise(selectedPairs, []);
      set({ currentExercise: exercise, currentExerciseSource: source, loading: false });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Erro ao carregar exercício.",
        loading: false,
      });
    }
  },

  submitCorrelation: async (userAnswers: [string, string]) => {
    const { currentExercise, answers } = get();
    if (!currentExercise) return;

    set({ loading: true });

    try {
      const result = await checkAnswers(currentExercise, userAnswers);
      const newAnswer: CorrelationAnswer = {
        exercise: currentExercise,
        userAnswers,
        isCorrect: result.isCorrect,
        blankResults: result.blankResults,
        feedback: result.feedback,
        feedbackType: result.feedbackType,
      };
      set({ answers: [...answers, newAnswer], loading: false });
    } catch {
      const blankResults: [boolean, boolean] = [
        userAnswers[0].trim().toLowerCase() ===
          currentExercise.verbs[0].correctAnswer.trim().toLowerCase(),
        userAnswers[1].trim().toLowerCase() ===
          currentExercise.verbs[1].correctAnswer.trim().toLowerCase(),
      ];
      const isCorrect = blankResults[0] && blankResults[1];
      const newAnswer: CorrelationAnswer = {
        exercise: currentExercise,
        userAnswers,
        isCorrect,
        blankResults,
        feedback: isCorrect
          ? "Correto!"
          : `As respostas corretas são "${currentExercise.verbs[0].correctAnswer}" e "${currentExercise.verbs[1].correctAnswer}".`,
        feedbackType: isCorrect ? "correct" : "other",
      };
      set({ answers: [...answers, newAnswer], loading: false });
    }
  },

  nextCorrelation: async () => {
    const { answers, selectedPairs } = get();

    if (answers.length >= TOTAL_EXERCISES) {
      set({ phase: "correlation-result" });
      return;
    }

    set({ loading: true, error: null, currentExercise: null });

    try {
      const excludeSentences = answers.map((a) => a.exercise.sentence);
      const { exercise, source } = await fetchExercise(selectedPairs, excludeSentences);
      set({ currentExercise: exercise, currentExerciseSource: source, loading: false });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Erro ao carregar próximo exercício.",
        loading: false,
      });
    }
  },

  resetCorrelation: () => {
    set({
      phase: "home",
      selectedPairs: [],
      currentExercise: null,
      currentExerciseSource: "mock",
      answers: [],
      loading: false,
      error: null,
    });
  },
}));
