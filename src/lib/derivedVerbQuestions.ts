import { DerivedVerbExercise, DerivedVerbGroupId } from "./derivedVerbTypes";

const PP = "Pretérito Perfeito do Indicativo";
const PIS = "Pretérito Imperfeito do Subjuntivo";
const FS = "Futuro do Subjuntivo";
const PI = "Presente do Indicativo";

export const derivedVerbQuestions: Record<DerivedVerbGroupId, DerivedVerbExercise[]> = {
  por: [
    {
      sentence: "Todo dia eu ______ (pôr) a chave no gancho e ______ (repor) o estoque da loja.",
      groupId: "por",
      groupLabel: "Verbos derivados de PÔR",
      rootVerb: { infinitive: "pôr", tense: PI, correctAnswer: "ponho" },
      derivedVerb: { infinitive: "repor", tense: PI, correctAnswer: "reponho" },
      explanation:
        "Repor é derivado de pôr e segue a mesma irregularidade no Presente do Indicativo: ponho → reponho.",
    },
    {
      sentence:
        "Ontem o funcionário ______ (pôr) os papéis na gaveta e depois ______ (repor) as canetas que faltavam.",
      groupId: "por",
      groupLabel: "Verbos derivados de PÔR",
      rootVerb: { infinitive: "pôr", tense: PP, correctAnswer: "pôs" },
      derivedVerb: { infinitive: "repor", tense: PP, correctAnswer: "repôs" },
      explanation:
        "No Pretérito Perfeito, pôr vira 'pôs' e repor segue o mesmo padrão: 'repôs' (com acento circunflexo, igual ao verbo primitivo).",
    },
    {
      sentence:
        "Se o colaborador ______ (pôr) mais empenho, o chefe também esperava que ele ______ (propor) novas soluções.",
      groupId: "por",
      groupLabel: "Verbos derivados de PÔR",
      rootVerb: { infinitive: "pôr", tense: PIS, correctAnswer: "pusesse" },
      derivedVerb: { infinitive: "propor", tense: PIS, correctAnswer: "propusesse" },
      explanation:
        "No Pretérito Imperfeito do Subjuntivo, pôr vira 'pusesse' e propor mantém o mesmo radical irregular: 'propusesse'.",
    },
    {
      sentence:
        "Quando ela ______ (pôr) a proposta em votação, o diretor ______ (dispor) de todos os recursos necessários.",
      groupId: "por",
      groupLabel: "Verbos derivados de PÔR",
      rootVerb: { infinitive: "pôr", tense: FS, correctAnswer: "puser" },
      derivedVerb: { infinitive: "dispor", tense: FS, correctAnswer: "dispuser" },
      explanation:
        "No Futuro do Subjuntivo, pôr vira 'puser' e dispor segue exatamente o mesmo padrão: 'dispuser'.",
    },
    {
      sentence:
        "O maestro ______ (pôr) atenção na orquestra e ______ (compor) uma nova sinfonia naquele mesmo ano.",
      groupId: "por",
      groupLabel: "Verbos derivados de PÔR",
      rootVerb: { infinitive: "pôr", tense: PP, correctAnswer: "pôs" },
      derivedVerb: { infinitive: "compor", tense: PP, correctAnswer: "compôs" },
      explanation:
        "Compor, assim como repor e dispor, é derivado de pôr e mantém a mesma forma irregular no Pretérito Perfeito: 'compôs'.",
    },
    {
      sentence:
        "Se você ______ (pôr) empenho nisso, quando ______ (propor) a ideia todos vão apoiar.",
      groupId: "por",
      groupLabel: "Verbos derivados de PÔR",
      rootVerb: { infinitive: "pôr", tense: FS, correctAnswer: "puser" },
      derivedVerb: { infinitive: "propor", tense: FS, correctAnswer: "propuser" },
      explanation:
        "Assim como em 'dispuser', propor no Futuro do Subjuntivo segue o padrão de pôr: puser → propuser.",
    },
  ],
  ter: [
    {
      sentence: "Ontem eu ______ (ter) uma reunião importante, mas ______ (manter) a calma o tempo todo.",
      groupId: "ter",
      groupLabel: "Verbos derivados de TER",
      rootVerb: { infinitive: "ter", tense: PP, correctAnswer: "tive" },
      derivedVerb: { infinitive: "manter", tense: PP, correctAnswer: "mantive" },
      explanation:
        "Manter é derivado de ter e segue a mesma conjugação no Pretérito Perfeito: tive → mantive.",
    },
    {
      sentence: "Ele ______ (ter) a informação e ______ (conter) a notícia até o momento certo.",
      groupId: "ter",
      groupLabel: "Verbos derivados de TER",
      rootVerb: { infinitive: "ter", tense: PP, correctAnswer: "teve" },
      derivedVerb: { infinitive: "conter", tense: PP, correctAnswer: "conteve" },
      explanation:
        "Conter segue exatamente a conjugação de ter no Pretérito Perfeito: teve → conteve.",
    },
    {
      sentence:
        "Se ele ______ (ter) mais tempo, provavelmente também ______ (obter) o resultado esperado.",
      groupId: "ter",
      groupLabel: "Verbos derivados de TER",
      rootVerb: { infinitive: "ter", tense: PIS, correctAnswer: "tivesse" },
      derivedVerb: { infinitive: "obter", tense: PIS, correctAnswer: "obtivesse" },
      explanation:
        "No Pretérito Imperfeito do Subjuntivo, ter vira 'tivesse' e obter mantém o mesmo radical: 'obtivesse'.",
    },
    {
      sentence: "Quando ele ______ (ter) a chance, ______ (manter) o mesmo compromisso de sempre.",
      groupId: "ter",
      groupLabel: "Verbos derivados de TER",
      rootVerb: { infinitive: "ter", tense: FS, correctAnswer: "tiver" },
      derivedVerb: { infinitive: "manter", tense: FS, correctAnswer: "mantiver" },
      explanation: "No Futuro do Subjuntivo, ter vira 'tiver' e manter segue o mesmo padrão: 'mantiver'.",
    },
    {
      sentence:
        "Se a polícia ______ (ter) provas suficientes, ela ______ (deter) o suspeito ainda hoje.",
      groupId: "ter",
      groupLabel: "Verbos derivados de TER",
      rootVerb: { infinitive: "ter", tense: FS, correctAnswer: "tiver" },
      derivedVerb: { infinitive: "deter", tense: FS, correctAnswer: "detiver" },
      explanation: "Deter, assim como manter e obter, segue a conjugação de ter: tiver → detiver.",
    },
    {
      sentence: "Nós ______ (ter) sorte na prova e ______ (obter) a aprovação no concurso.",
      groupId: "ter",
      groupLabel: "Verbos derivados de TER",
      rootVerb: { infinitive: "ter", tense: PP, correctAnswer: "tivemos" },
      derivedVerb: { infinitive: "obter", tense: PP, correctAnswer: "obtivemos" },
      explanation:
        "No Pretérito Perfeito, ter vira 'tivemos' na 1ª pessoa do plural e obter segue o mesmo padrão: 'obtivemos'.",
    },
  ],
  vir: [
    {
      sentence: "O diretor ______ (vir) à reunião e ______ (intervir) a favor da equipe.",
      groupId: "vir",
      groupLabel: "Verbos derivados de VIR",
      rootVerb: { infinitive: "vir", tense: PP, correctAnswer: "veio" },
      derivedVerb: { infinitive: "intervir", tense: PP, correctAnswer: "interveio" },
      explanation:
        "Intervir é derivado de vir e segue a mesma conjugação irregular no Pretérito Perfeito: veio → interveio.",
    },
    {
      sentence:
        "Se ele ______ (vir) mais cedo, talvez ______ (intervir) antes do problema piorar.",
      groupId: "vir",
      groupLabel: "Verbos derivados de VIR",
      rootVerb: { infinitive: "vir", tense: PIS, correctAnswer: "viesse" },
      derivedVerb: { infinitive: "intervir", tense: PIS, correctAnswer: "interviesse" },
      explanation:
        "No Pretérito Imperfeito do Subjuntivo, vir vira 'viesse' e intervir mantém o mesmo radical: 'interviesse'.",
    },
    {
      sentence: "Quando ele ______ (vir) à cidade, ______ (convir) conversarmos sobre o contrato.",
      groupId: "vir",
      groupLabel: "Verbos derivados de VIR",
      rootVerb: { infinitive: "vir", tense: FS, correctAnswer: "vier" },
      derivedVerb: { infinitive: "convir", tense: FS, correctAnswer: "convier" },
      explanation:
        "No Futuro do Subjuntivo, vir vira 'vier' e convir segue o mesmo padrão: 'convier' (como na expressão 'quando convier').",
    },
    {
      sentence:
        "Aquele acordo não ______ (vir) na hora certa, e por isso não ______ (convir) aos sócios.",
      groupId: "vir",
      groupLabel: "Verbos derivados de VIR",
      rootVerb: { infinitive: "vir", tense: PP, correctAnswer: "veio" },
      derivedVerb: { infinitive: "convir", tense: PP, correctAnswer: "conveio" },
      explanation: "Convir no Pretérito Perfeito segue vir: veio → conveio.",
    },
    {
      sentence:
        "Quando o financiamento ______ (vir) do banco, saberemos de onde ______ (provir) os recursos.",
      groupId: "vir",
      groupLabel: "Verbos derivados de VIR",
      rootVerb: { infinitive: "vir", tense: FS, correctAnswer: "vier" },
      derivedVerb: { infinitive: "provir", tense: FS, correctAnswer: "provier" },
      explanation: "Provir, assim como intervir e convir, segue a conjugação de vir: vier → provier.",
    },
    {
      sentence: "O apoio ______ (vir) rapidamente, e todos souberam de onde ______ (provir) aquela ajuda.",
      groupId: "vir",
      groupLabel: "Verbos derivados de VIR",
      rootVerb: { infinitive: "vir", tense: PP, correctAnswer: "veio" },
      derivedVerb: { infinitive: "provir", tense: PP, correctAnswer: "proveio" },
      explanation: "No Pretérito Perfeito, provir segue vir: veio → proveio.",
    },
  ],
  ver: [
    {
      sentence:
        "Ontem eu ______ (ver) o relatório e ______ (prever) alguns problemas para o mês seguinte.",
      groupId: "ver",
      groupLabel: "Verbos derivados de VER",
      rootVerb: { infinitive: "ver", tense: PP, correctAnswer: "vi" },
      derivedVerb: { infinitive: "prever", tense: PP, correctAnswer: "previ" },
      explanation:
        "Prever é derivado de ver e segue a mesma conjugação no Pretérito Perfeito: vi → previ.",
    },
    {
      sentence: "Ele ______ (ver) o contrato antigo e ______ (rever) cada cláusula com cuidado.",
      groupId: "ver",
      groupLabel: "Verbos derivados de VER",
      rootVerb: { infinitive: "ver", tense: PP, correctAnswer: "viu" },
      derivedVerb: { infinitive: "rever", tense: PP, correctAnswer: "reviu" },
      explanation: "Rever segue exatamente a conjugação de ver no Pretérito Perfeito: viu → reviu.",
    },
    {
      sentence:
        "Se o gerente ______ (ver) os documentos com atenção, ele já ______ (antever) o erro no cálculo.",
      groupId: "ver",
      groupLabel: "Verbos derivados de VER",
      rootVerb: { infinitive: "ver", tense: PIS, correctAnswer: "visse" },
      derivedVerb: { infinitive: "antever", tense: PIS, correctAnswer: "antevisse" },
      explanation:
        "No Pretérito Imperfeito do Subjuntivo, ver vira 'visse' e antever mantém o mesmo radical: 'antevisse'.",
    },
    {
      sentence: "Quando o gerente ______ (ver) os documentos, ele ______ (rever) o valor do contrato.",
      groupId: "ver",
      groupLabel: "Verbos derivados de VER",
      rootVerb: { infinitive: "ver", tense: FS, correctAnswer: "vir" },
      derivedVerb: { infinitive: "rever", tense: FS, correctAnswer: "revir" },
      explanation:
        "Cuidado: no Futuro do Subjuntivo, ver vira 'vir' (igual à forma do verbo vir) e rever segue o mesmo padrão: 'revir'.",
    },
    {
      sentence: "Quando ele ______ (ver) o cenário econômico, ______ (prever) uma queda nas vendas.",
      groupId: "ver",
      groupLabel: "Verbos derivados de VER",
      rootVerb: { infinitive: "ver", tense: FS, correctAnswer: "vir" },
      derivedVerb: { infinitive: "prever", tense: FS, correctAnswer: "previr" },
      explanation:
        "No Futuro do Subjuntivo, prever segue o mesmo padrão de ver: vir → previr (e não 'prever').",
    },
    {
      sentence: "Nós ______ (ver) apenas uma sombra, mas ______ (entrever) um vulto na escuridão.",
      groupId: "ver",
      groupLabel: "Verbos derivados de VER",
      rootVerb: { infinitive: "ver", tense: PP, correctAnswer: "vimos" },
      derivedVerb: { infinitive: "entrever", tense: PP, correctAnswer: "entrevimos" },
      explanation: "No Pretérito Perfeito, entrever segue ver: vimos → entrevimos.",
    },
  ],
};
