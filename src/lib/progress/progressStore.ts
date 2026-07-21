import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProgressEntryMeta, ProgressMap, ProgressMode } from "./types";
import { applyResult, createEntry } from "./leitner";

interface ProgressState {
  items: ProgressMap;
  hasHydrated: boolean;
  recordAnswer: (
    key: string,
    mode: ProgressMode,
    isCorrect: boolean,
    meta?: ProgressEntryMeta
  ) => void;
  getEntry: (key: string) => ProgressMap[string] | undefined;
  getDueEntries: (mode?: ProgressMode) => ProgressMap[string][];
  resetProgress: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      items: {},
      hasHydrated: false,

      recordAnswer: (key, mode, isCorrect, meta = {}) => {
        const { items } = get();
        const existing = items[key] ?? createEntry(key, mode, meta);
        const updated = applyResult({ ...existing, meta }, isCorrect);
        set({ items: { ...items, [key]: updated } });
      },

      getEntry: (key) => get().items[key],

      getDueEntries: (mode) => {
        const now = Date.now();
        return Object.values(get().items).filter(
          (entry) => (!mode || entry.mode === mode) && entry.dueAt <= now
        );
      },

      resetProgress: () => set({ items: {} }),
    }),
    {
      name: "verb-progress-store",
      version: 1,
      onRehydrateStorage: () => (state) => {
        if (state) state.hasHydrated = true;
      },
    }
  )
);
