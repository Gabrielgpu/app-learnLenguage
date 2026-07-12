import { presenteData } from "./presente";
import { preteritoPerfeitoData } from "./preterito-perfeito";
import { preteritoImperfeitoData } from "./preterito-imperfeito";
import { preteritoMaisQuePerfeitoData } from "./preterito-mais-que-perfeito";
import { futuroDoPresenteData } from "./futuro-do-presente";
import { futuroDoPreteritoData } from "./futuro-do-preterito";
import { futuroDoSubjuntivoData } from "./futuro-do-subjuntivo";
import { VerbTenseInfo } from "./types";

export * from "./types";

export const verbTenseReferences: Record<string, VerbTenseInfo> = {
  "Presente do Indicativo": presenteData,
  "Pretérito Perfeito": preteritoPerfeitoData,
  "Pretérito Imperfeito": preteritoImperfeitoData,
  "Pretérito Mais-que-perfeito": preteritoMaisQuePerfeitoData,
  "Futuro do Presente": futuroDoPresenteData,
  "Futuro do Pretérito": futuroDoPreteritoData,
  "Futuro do Subjuntivo": futuroDoSubjuntivoData,
};

export function getVerbTenseInfo(tense: string): VerbTenseInfo | null {
  return verbTenseReferences[tense] || null;
}
