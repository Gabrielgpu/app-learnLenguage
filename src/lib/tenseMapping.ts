export const VERB_TENSE_TO_CODE = {
  "Presente do Indicativo": "PRESENTE_INDICATIVO",
  "Pretérito Perfeito": "PRETERITO_PERFEITO",
  "Pretérito Imperfeito": "PRETERITO_IMPERFEITO",
} as const;

export type VerbTenseLabel = keyof typeof VERB_TENSE_TO_CODE;
export type TenseCode = (typeof VERB_TENSE_TO_CODE)[VerbTenseLabel];

export function toTenseCode(verbTense: string): TenseCode | null {
  return VERB_TENSE_TO_CODE[verbTense as VerbTenseLabel] ?? null;
}
