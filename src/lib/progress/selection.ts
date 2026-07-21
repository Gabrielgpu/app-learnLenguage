// Seleção ponderada por repetição espaçada, reaproveitável entre modos

import { ProgressEntry, ProgressEntryMeta, ProgressMap, ProgressMode } from "./types";
import { isDue } from "./leitner";

function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function weightOf(entry: ProgressEntry): number {
  return 6 - entry.box; // caixa 1 -> peso 5, caixa 5 -> peso 1
}

function weightedSampleWithoutReplacement<T>(
  pool: { item: T; weight: number }[],
  count: number
): T[] {
  const remaining = [...pool];
  const picked: T[] = [];

  while (remaining.length > 0 && picked.length < count) {
    const totalWeight = remaining.reduce((sum, p) => sum + p.weight, 0);
    let roll = Math.random() * totalWeight;
    let chosenIndex = remaining.length - 1;
    for (let i = 0; i < remaining.length; i++) {
      roll -= remaining[i].weight;
      if (roll <= 0) {
        chosenIndex = i;
        break;
      }
    }
    picked.push(remaining[chosenIndex].item);
    remaining.splice(chosenIndex, 1);
  }

  return picked;
}

/**
 * Prioriza itens due (ou nunca vistos) entre os candidatos; completa o
 * restante com itens não-due, ponderados por caixa (caixas menores = mais chance).
 */
export function weightedPickMany<T>(
  candidates: { item: T; key: string }[],
  progress: ProgressMap,
  count: number,
  now: number = Date.now()
): T[] {
  const due: T[] = [];
  const notDue: { item: T; weight: number }[] = [];

  for (const candidate of candidates) {
    const entry = progress[candidate.key];
    if (!entry || isDue(entry, now)) {
      due.push(candidate.item);
    } else {
      notDue.push({ item: candidate.item, weight: weightOf(entry) });
    }
  }

  const shuffledDue = shuffle(due);
  const selected = shuffledDue.slice(0, count);

  if (selected.length < count) {
    const fill = weightedSampleWithoutReplacement(notDue, count - selected.length);
    selected.push(...fill);
  }

  return selected;
}

/**
 * Retorna um alvo (verbo/tempo/pessoa) dentre os itens due de um modo,
 * ponderado por caixa. Usado pelos modos gerados por IA (sem universo fechado),
 * para influenciar qual verbo/tempo é pedido em seguida.
 */
export function pickDueTarget(
  mode: ProgressMode,
  progress: ProgressMap,
  allowedTenses?: string[],
  now: number = Date.now()
): ProgressEntryMeta | null {
  const dueEntries = Object.values(progress).filter((entry) => {
    if (entry.mode !== mode || !isDue(entry, now)) return false;
    if (allowedTenses && allowedTenses.length > 0) {
      return !!entry.meta.tense && allowedTenses.includes(entry.meta.tense);
    }
    return true;
  });

  if (dueEntries.length === 0) return null;

  const weighted = dueEntries.map((entry) => ({ item: entry, weight: weightOf(entry) }));
  const [picked] = weightedSampleWithoutReplacement(weighted, 1);
  return picked ? picked.meta : null;
}
