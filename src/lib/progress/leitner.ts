// Sistema de caixas de Leitner (5 caixas) — funções puras, sem dependência de storage

import { ProgressEntry, ProgressEntryMeta, ProgressMode } from "./types";

export const BOX_INTERVAL_DAYS = [0, 1, 3, 7, 16] as const;
const DAY_MS = 86_400_000;

export function createEntry(
  key: string,
  mode: ProgressMode,
  meta: ProgressEntryMeta,
  now: number = Date.now()
): ProgressEntry {
  return {
    key,
    mode,
    box: 1,
    dueAt: now,
    streak: 0,
    timesSeen: 0,
    timesCorrect: 0,
    lastSeenAt: null,
    createdAt: now,
    meta,
  };
}

export function applyResult(
  entry: ProgressEntry,
  isCorrect: boolean,
  now: number = Date.now()
): ProgressEntry {
  const box = isCorrect ? (Math.min(entry.box + 1, 5) as ProgressEntry["box"]) : 1;
  const intervalDays = BOX_INTERVAL_DAYS[box - 1];

  return {
    ...entry,
    box,
    dueAt: now + intervalDays * DAY_MS,
    streak: isCorrect ? entry.streak + 1 : 0,
    timesSeen: entry.timesSeen + 1,
    timesCorrect: entry.timesCorrect + (isCorrect ? 1 : 0),
    lastSeenAt: now,
  };
}

export function isDue(entry: ProgressEntry, now: number = Date.now()): boolean {
  return entry.dueAt <= now;
}

export function masteryPercent(entries: ProgressEntry[]): number {
  if (entries.length === 0) return 0;
  const mastered = entries.filter((e) => e.box >= 4).length;
  return Math.round((mastered / entries.length) * 100);
}
