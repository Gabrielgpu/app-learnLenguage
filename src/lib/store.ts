import { create } from "zustand";
import { Question } from "./mockQuestions";

export interface AnsweredQuestion {
  question: Question;
  selectedOption: string; // "A", "B", "C", "D", "E"
  isCorrect: boolean;
  dataSource: string; // "grok" | "gemini" | "openai" | "mock"
  verbTense: string; // Keep track of which tense this question belonged to
}

interface QuizState {
  phase: "home" | "quiz" | "result";
  verbTenses: ("Presente do Indicativo" | "Pretérito Perfeito" | "Pretérito Imperfeito")[];
  currentQuestion: Question | null;
  currentQuestionTense: "Presente do Indicativo" | "Pretérito Perfeito" | "Pretérito Imperfeito" | null;
  currentQuestionSource: string;
  answers: AnsweredQuestion[];
  loading: boolean;
  error: string | null;
  
  // Actions
  toggleVerbTense: (tense: "Presente do Indicativo" | "Pretérito Perfeito" | "Pretérito Imperfeito") => void;
  startQuiz: () => Promise<void>;
  submitAnswer: (optionLetter: string) => void;
  nextQuestion: () => Promise<void>;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>((set, get) => ({
  phase: "home",
  verbTenses: [],
  currentQuestion: null,
  currentQuestionTense: null,
  currentQuestionSource: "mock",
  answers: [],
  loading: false,
  error: null,

  toggleVerbTense: (tense) => {
    const { verbTenses } = get();
    if (verbTenses.includes(tense)) {
      set({ verbTenses: verbTenses.filter((t) => t !== tense) });
    } else {
      set({ verbTenses: [...verbTenses, tense] });
    }
  },

  startQuiz: async () => {
    const { verbTenses } = get();
    if (verbTenses.length === 0) return;

    // Pick a random tense from the selected ones for the first question
    const selectedTense = verbTenses[Math.floor(Math.random() * verbTenses.length)];

    set({ 
      phase: "quiz", 
      answers: [], 
      loading: true, 
      error: null, 
      currentQuestion: null,
      currentQuestionTense: selectedTense
    });

    try {
      const grokKey = typeof window !== "undefined" ? localStorage.getItem("grok_api_key") || "" : "";
      const geminiKey = typeof window !== "undefined" ? localStorage.getItem("gemini_api_key") || "" : "";
      const openaiKey = typeof window !== "undefined" ? localStorage.getItem("openai_api_key") || "" : "";

      const response = await fetch("/api/generate-question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(grokKey ? { "x-grok-api-key": grokKey } : {}),
          ...(geminiKey ? { "x-gemini-api-key": geminiKey } : {}),
          ...(openaiKey ? { "x-openai-api-key": openaiKey } : {}),
        },
        body: JSON.stringify({ verbTense: selectedTense, excludeTexts: [] }),
      });

      if (!response.ok) {
        throw new Error("Erro ao gerar questão da IA.");
      }

      const questionData: Question = await response.json();
      const dataSource = response.headers.get("x-data-source") || "mock";

      set({
        currentQuestion: questionData,
        currentQuestionSource: dataSource,
        loading: false,
      });
    } catch (err: any) {
      set({
        error: err.message || "Erro desconhecido ao carregar questão.",
        loading: false,
      });
    }
  },

  submitAnswer: (optionLetter) => {
    const { currentQuestion, currentQuestionTense, currentQuestionSource, answers } = get();
    if (!currentQuestion || !currentQuestionTense) return;

    const isCorrect = optionLetter.toUpperCase() === currentQuestion.correctAnswer.toUpperCase();
    
    const newAnswer: AnsweredQuestion = {
      question: currentQuestion,
      selectedOption: optionLetter,
      isCorrect,
      dataSource: currentQuestionSource,
      verbTense: currentQuestionTense,
    };

    set({
      answers: [...answers, newAnswer],
    });
  },

  nextQuestion: async () => {
    const { answers, verbTenses } = get();
    if (answers.length >= 5) {
      set({ phase: "result" });
      return;
    }

    if (verbTenses.length === 0) return;
    
    // Pick a random tense from the selected ones for the next question
    const selectedTense = verbTenses[Math.floor(Math.random() * verbTenses.length)];

    set({ 
      loading: true, 
      error: null, 
      currentQuestion: null,
      currentQuestionTense: selectedTense
    });

    try {
      const grokKey = typeof window !== "undefined" ? localStorage.getItem("grok_api_key") || "" : "";
      const geminiKey = typeof window !== "undefined" ? localStorage.getItem("gemini_api_key") || "" : "";
      const openaiKey = typeof window !== "undefined" ? localStorage.getItem("openai_api_key") || "" : "";

      const excludeTexts = answers.map((a) => a.question.question);

      const response = await fetch("/api/generate-question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(grokKey ? { "x-grok-api-key": grokKey } : {}),
          ...(geminiKey ? { "x-gemini-api-key": geminiKey } : {}),
          ...(openaiKey ? { "x-openai-api-key": openaiKey } : {}),
        },
        body: JSON.stringify({ verbTense: selectedTense, excludeTexts }),
      });

      if (!response.ok) {
        throw new Error("Erro ao gerar questão da IA.");
      }

      const questionData: Question = await response.json();
      const dataSource = response.headers.get("x-data-source") || "mock";

      set({
        currentQuestion: questionData,
        currentQuestionSource: dataSource,
        loading: false,
      });
    } catch (err: any) {
      set({
        error: err.message || "Erro ao carregar próxima questão.",
        loading: false,
      });
    }
  },

  resetQuiz: () => {
    set({
      phase: "home",
      verbTenses: [],
      currentQuestion: null,
      currentQuestionTense: null,
      currentQuestionSource: "mock",
      answers: [],
      loading: false,
      error: null,
    });
  },
}));
