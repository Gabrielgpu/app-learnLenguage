// Chaves estáveis por item, usadas pelo sistema de repetição espaçada

import { PERSON_KEYS } from "../conjugationTypes";
import { CorrelationPairId } from "../correlationTypes";
import { DerivedVerbGroupId } from "../derivedVerbTypes";

export function conjugationKey(verb: string, tense: string, person: string): string {
  const personKey = PERSON_KEYS[person] ?? person;
  return `conj:${verb}:${tense}:${personKey}`;
}

export function fillBlankKey(verb: string, tense: string): string {
  return `fb:${verb}:${tense}`;
}

export function correlationKey(pairId: CorrelationPairId, index: number): string {
  return `corr:${pairId}:${index}`;
}

export function derivedVerbKey(groupId: DerivedVerbGroupId, index: number): string {
  return `der:${groupId}:${index}`;
}
