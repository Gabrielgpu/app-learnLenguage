import { DerivedVerbGroupId } from "./derivedVerbTypes";

export interface DerivedVerbRule {
  id: DerivedVerbGroupId;
  label: string;
  description: string;
  example: string;
}

export const DERIVED_VERB_RULES: DerivedVerbRule[] = [
  {
    id: "por",
    label: "Verbos derivados de PÔR",
    description:
      "Repor, dispor, propor, compor e demais derivados de pôr são conjugados seguindo exatamente o mesmo padrão irregular do verbo primitivo, em todos os tempos e pessoas.",
    example: "Se o colaborador pusesse... → o colaborador repusesse.",
  },
  {
    id: "ter",
    label: "Verbos derivados de TER",
    description:
      "Manter, conter, obter, deter e demais derivados de ter seguem a conjugação idêntica à do verbo ter, inclusive nas formas irregulares do pretérito.",
    example: "Ontem eu tive uma reunião. → Ontem eu mantive a calma.",
  },
  {
    id: "vir",
    label: "Verbos derivados de VIR",
    description:
      "Intervir, convir, advir, provir e demais derivados de vir seguem a conjugação idêntica à do verbo vir, mesmo quando a forma parece bem diferente do infinitivo.",
    example: "O diretor veio ao encontro. → O diretor interveio a meu favor.",
  },
  {
    id: "ver",
    label: "Verbos derivados de VER",
    description:
      "Rever, prever, antever, entrever e demais derivados de ver seguem a conjugação idêntica à do verbo ver — cuidado, pois 'prever' costuma ser confundido com verbos regulares terminados em '-er'.",
    example: "Ontem eu vi os documentos. → Ontem eu previ o problema.",
  },
];
