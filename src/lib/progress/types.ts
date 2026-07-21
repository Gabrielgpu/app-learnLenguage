// Tipos para o sistema de repetição espaçada (progresso salvo localmente)

export type ProgressMode = "conjugacao" | "complete-frase" | "correlacao-verbal" | "verbos-derivados";

export interface ProgressEntryMeta {
  verb?: string;
  tense?: string;
  person?: string;
  pairId?: string;
  index?: number;
}

export interface ProgressEntry {
  key: string;
  mode: ProgressMode;
  box: 1 | 2 | 3 | 4 | 5;
  dueAt: number;
  streak: number;
  timesSeen: number;
  timesCorrect: number;
  lastSeenAt: number | null;
  createdAt: number;
  meta: ProgressEntryMeta;
}

export type ProgressMap = Record<string, ProgressEntry>;
