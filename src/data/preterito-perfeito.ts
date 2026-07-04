import { VerbTenseInfo } from "./types";

export const preteritoPerfeitoData: VerbTenseInfo = {
  id: "Pretérito Perfeito",
  title: "Pretérito Perfeito do Indicativo",
  description: "Expressa um fato que ocorreu no passado e foi completamente concluído antes do momento da fala.",
  usage: [
    "Ação pontual e perfeitamente delimitada no tempo passado (Ex: Ontem eu comprei um livro).",
    "Sucessão de fatos passados acabados (Ex: Ele chegou, guardou o casaco e sentou-se).",
    "Fato marcante ou pontual em uma narrativa (Ex: O carro parou de repente)."
  ],
  groups: [
    {
      conjugation: "1ª Conjugação (-AR)",
      endings: [
        { person: "Eu", ending: "-ei (ex: cante-i)" },
        { person: "Tu", ending: "-aste (ex: cant-aste)" },
        { person: "Ele/Ela", ending: "-ou (ex: cant-ou)" },
        { person: "Nós", ending: "-amos (ex: cant-amos)" },
        { person: "Vós", ending: "-astes (ex: cant-astes)" },
        { person: "Eles/Elas", ending: "-aram (ex: cant-aram)" }
      ]
    },
    {
      conjugation: "2ª Conjugação (-ER)",
      endings: [
        { person: "Eu", ending: "-i (ex: vend-i)" },
        { person: "Tu", ending: "-este (ex: vend-este)" },
        { person: "Ele/Ela", ending: "-eu (ex: vend-eu)" },
        { person: "Nós", ending: "-emos (ex: vend-emos)" },
        { person: "Vós", ending: "-estes (ex: vend-estes)" },
        { person: "Eles/Elas", ending: "-eram (ex: vend-eram)" }
      ]
    },
    {
      conjugation: "3ª Conjugação (-IR)",
      endings: [
        { person: "Eu", ending: "-i (ex: part-i)" },
        { person: "Tu", ending: "-iste (ex: part-iste)" },
        { person: "Ele/Ela", ending: "-iu (ex: part-iu)" },
        { person: "Nós", ending: "-imos (ex: part-imos)" },
        { person: "Vós", ending: "-istes (ex: part-istes)" },
        { person: "Eles/Elas", ending: "-iram (ex: part-iram)" }
      ]
    }
  ],
  examples: [
    {
      sentence: "A banca publicou o edital do concurso na última sexta-feira.",
      explanation: "Uma ação concluída em um momento exato e definido no passado."
    },
    {
      sentence: "Nós estudamos a matéria toda ontem à noite.",
      explanation: "Ação finalizada no passado próximo."
    },
    {
      sentence: "Eu fiz a prova e fui aprovado.",
      explanation: "Sequência de ações completamente acabadas."
    }
  ],
  observations: [
    "Cuidado com os verbos irregulares fortes no Pretérito Perfeito. Eles mudam radicalmente o radical e não seguem as terminações normais: Caber (coube), Trazer (trouxe), Fazer (fiz), Dizer (disse), Querer (quis), Saber (soube), Pôr (pus), Ver (vi, viu, vimos, viram), Ter (tive), Haver (houve).",
    "Verbo Ter vs Verbo Vir: No pretérito perfeito, 'Ter' é 'Tive' (Eu tive, ele teve, eles tiveram) e 'Vir' é 'Vim' (Eu vim, ele veio, eles vieram). Não confunda 'vir' (movimento) com 'ver' (visão: eu vi, ele viu).",
    "Verbos derivados mantêm a conjugação do primitivo: Intervir (derivado de vir) -> Ele interveio (como ele veio). Manter (derivado de ter) -> Ele manteve (como ele teve). Deter -> Ele deteve. Propor (derivado de pôr) -> Ele propôs (como ele pôs)."
  ],
  traps: [
    "Diferença entre TER e VIR no Pretérito Perfeito: 'Ter' vira 'Eu tive, ele teve, eles tiveram', enquanto 'Vir' (movimento) vira 'Eu vim, ele veio, eles vieram'. Não confunda com o verbo VER (visão: eu vi, ele viu, eles viram).",
    "Verbos irregulares fortes perdem as desinências regulares completamente: Caber (coube), Trazer (trouxe - com 'x' com som de 'ss'), Saber (soube), Fazer (fiz/fez)."
  ],
  contestTips: [
    "Verbos derivados seguem RIGOROSAMENTE a conjugação de seus verbos primitivos. Isso cai constantemente em provas: 'Intervir' (derivado de vir) faz 'Ele interveio' (e NÃO 'interviu'). 'Manter' e 'Deter' (derivados de ter) fazem 'Ele manteve/deteve' (e NÃO 'manteu/deteu'). 'Propor' (derivado de pôr) faz 'Ele propôs' (e NÃO 'propos')."
  ]
};
