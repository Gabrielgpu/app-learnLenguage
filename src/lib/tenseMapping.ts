export const VERB_TENSE_TO_CODE = {
  "Presente do Indicativo": "PRESENTE_INDICATIVO",
  "Pretérito Perfeito": "PRETERITO_PERFEITO",
  "Pretérito Imperfeito": "PRETERITO_IMPERFEITO",
  "Pretérito Mais-que-perfeito": "PRETERITO_MAIS_QUE_PERFEITO",
  "Futuro do Presente": "FUTURO_DO_PRESENTE",
  "Futuro do Pretérito": "FUTURO_DO_PRETERITO",
  "Futuro do Subjuntivo": "FUTURO_DO_SUBJUNTIVO",
} as const;

export type VerbTenseLabel = keyof typeof VERB_TENSE_TO_CODE;
export type TenseCode = (typeof VERB_TENSE_TO_CODE)[VerbTenseLabel];

export function toTenseCode(verbTense: string): TenseCode | null {
  return VERB_TENSE_TO_CODE[verbTense as VerbTenseLabel] ?? null;
}
