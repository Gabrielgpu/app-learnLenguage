import { presenteData } from "./presente";
import { preteritoPerfeitoData } from "./preterito-perfeito";
import { preteritoImperfeitoData } from "./preterito-imperfeito";
import { VerbTenseInfo } from "./types";

export * from "./types";

export const verbTenseReferences: Record<string, VerbTenseInfo> = {
  "Presente do Indicativo": presenteData,
  "Pretérito Perfeito": preteritoPerfeitoData,
  "Pretérito Imperfeito": preteritoImperfeitoData,
};

export function getVerbTenseInfo(tense: string): VerbTenseInfo | null {
  return verbTenseReferences[tense] || null;
}
