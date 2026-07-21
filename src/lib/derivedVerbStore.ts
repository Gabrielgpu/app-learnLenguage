import { create } from "zustand";
import {
  DerivedVerbExercise,
  DerivedVerbAnswer,
  DerivedVerbGroupId,
} from "./derivedVerbTypes";
import { derivedVerbQuestions } from "./derivedVerbQuestions";
import { FeedbackType } from "./conjugationTypes";
import { useProgressStore } from "./progress/progressStore";
import { derivedVerbKey } from "./progress/keys";
import { weightedPickMany } from "./progress/selection";
import { ProgressMap } from "./progress/types";

type DerivedVerbPhase = "home" | "derived-verb-exercise" | "derived-verb-result";

const TOTAL_EXERCISES = 5;
const ALL_GROUP_IDS = Object.keys(derivedVerbQuestions) as DerivedVerbGroupId[];

function buildSession(
  selectedGroups: DerivedVerbGroupId[],
  progress: ProgressMap
): DerivedVerbExercise[] {
  const groupPool = selectedGroups.length > 0 ? selectedGroups : ALL_GROUP_IDS;
  const candidates = groupPool.flatMap((groupId) =>
    derivedVerbQuestions[groupId].map((exercise, index) => ({
      item: exercise,
      key: derivedVerbKey(groupId, index),
    }))
  );
  return weightedPickMany(candidates, progress, TOTAL_EXERCISES);
}

function checkAnswers(
  exercise: DerivedVerbExercise,
  userAnswers: [string, string]
): { isCorrect: boolean; blankResults: [boolean, boolean]; feedback: string; feedbackType: FeedbackType } {
  const blankResults: [boolean, boolean] = [
    userAnswers[0].trim().toLowerCase() === exercise.rootVerb.correctAnswer.trim().toLowerCase(),
    userAnswers[1].trim().toLowerCase() === exercise.derivedVerb.correctAnswer.trim().toLowerCase(),
  ];
  const isCorrect = blankResults[0] && blankResults[1];

  if (isCorrect) {
    return {
      isCorrect: true,
      blankResults,
      feedback: `✅ Correto! "${exercise.rootVerb.correctAnswer}" e "${exercise.derivedVerb.correctAnswer}" seguem exatamente o mesmo padrão de conjugação.`,
      feedbackType: "correct",
    };
  }

  const wrongParts: string[] = [];
  if (!blankResults[0]) wrongParts.push(`a 1ª lacuna deveria ser "${exercise.rootVerb.correctAnswer}"`);
  if (!blankResults[1]) wrongParts.push(`a 2ª lacuna deveria ser "${exercise.derivedVerb.correctAnswer}"`);

  return {
    isCorrect: false,
    blankResults,
    feedback: `Resposta incorreta: ${wrongParts.join(" e ")}.`,
    feedbackType: "other",
  };
}

interface DerivedVerbState {
  phase: DerivedVerbPhase;
  selectedGroups: DerivedVerbGroupId[];
  session: DerivedVerbExercise[];
  currentExercise: DerivedVerbExercise | null;
  answers: DerivedVerbAnswer[];

  toggleGroup: (groupId: DerivedVerbGroupId) => void;
  startDerivedVerb: () => void;
  submitDerivedVerb: (userAnswers: [string, string]) => void;
  nextDerivedVerb: () => void;
  resetDerivedVerb: () => void;
}

export const useDerivedVerbStore = create<DerivedVerbState>((set, get) => ({
  phase: "home",
  selectedGroups: [],
  session: [],
  currentExercise: null,
  answers: [],

  toggleGroup: (groupId) => {
    const { selectedGroups } = get();
    if (selectedGroups.includes(groupId)) {
      set({ selectedGroups: selectedGroups.filter((g) => g !== groupId) });
    } else {
      set({ selectedGroups: [...selectedGroups, groupId] });
    }
  },

  startDerivedVerb: () => {
    const { selectedGroups } = get();
    if (selectedGroups.length === 0) return;

    const progress = useProgressStore.getState().items;
    const session = buildSession(selectedGroups, progress);
    set({
      phase: "derived-verb-exercise",
      session,
      currentExercise: session[0] ?? null,
      answers: [],
    });
  },

  submitDerivedVerb: (userAnswers: [string, string]) => {
    const { currentExercise, answers } = get();
    if (!currentExercise) return;

    const result = checkAnswers(currentExercise, userAnswers);
    const newAnswer: DerivedVerbAnswer = {
      exercise: currentExercise,
      userAnswers,
      ...result,
    };
    set({ answers: [...answers, newAnswer] });

    const { groupId } = currentExercise;
    const index = derivedVerbQuestions[groupId].indexOf(currentExercise);
    useProgressStore.getState().recordAnswer(
      derivedVerbKey(groupId, index),
      "verbos-derivados",
      result.isCorrect,
      {
        verb: currentExercise.derivedVerb.infinitive,
        tense: currentExercise.derivedVerb.tense,
        pairId: groupId,
        index,
      }
    );
  },

  nextDerivedVerb: () => {
    const { session, answers } = get();

    if (answers.length >= session.length) {
      set({ phase: "derived-verb-result" });
      return;
    }

    set({ currentExercise: session[answers.length] });
  },

  resetDerivedVerb: () => {
    set({
      phase: "home",
      selectedGroups: [],
      session: [],
      currentExercise: null,
      answers: [],
    });
  },
}));
