import { VerbTenseInfo } from "./types";

export const presenteData: VerbTenseInfo = {
  id: "Presente do Indicativo",
  title: "Presente do Indicativo",
  description: "Expressa um fato atual, uma ação habitual, uma verdade científica/universal ou um futuro próximo com valor de certeza.",
  usage: [
    "Ação que ocorre no momento da fala (Ex: Eu escrevo agora).",
    "Hábito ou rotina (Ex: Eu estudo todos os dias).",
    "Verdades científicas ou fatos permanentes (Ex: A Terra gira em torno do Sol).",
    "Futuro próximo com tom de convicção (Ex: Amanhã eu faço o exame)."
  ],
  groups: [
    {
      conjugation: "1ª Conjugação (-AR)",
      endings: [
        { person: "Eu", ending: "-o (ex: cant-o)" },
        { person: "Tu", ending: "-as (ex: cant-as)" },
        { person: "Ele/Ela", ending: "-a (ex: cant-a)" },
        { person: "Nós", ending: "-amos (ex: cant-amos)" },
        { person: "Vós", ending: "-ais (ex: cant-ais)" },
        { person: "Eles/Elas", ending: "-am (ex: cant-am)" }
      ]
    },
    {
      conjugation: "2ª Conjugação (-ER)",
      endings: [
        { person: "Eu", ending: "-o (ex: vend-o)" },
        { person: "Tu", ending: "-es (ex: vend-es)" },
        { person: "Ele/Ela", ending: "-e (ex: vend-e)" },
        { person: "Nós", ending: "-emos (ex: vend-emos)" },
        { person: "Vós", ending: "-eis (ex: vend-eis)" },
        { person: "Eles/Elas", ending: "-em (ex: vend-em)" }
      ]
    },
    {
      conjugation: "3ª Conjugação (-IR)",
      endings: [
        { person: "Eu", ending: "-o (ex: part-o)" },
        { person: "Tu", ending: "-es (ex: part-es)" },
        { person: "Ele/Ela", ending: "-e (ex: part-e)" },
        { person: "Nós", ending: "-imos (ex: part-imos)" },
        { person: "Vós", ending: "-is (ex: part-is)" },
        { person: "Eles/Elas", ending: "-em (ex: part-em)" }
      ]
    }
  ],
  examples: [
    {
      sentence: "Eu estudo Português para passar no concurso público.",
      explanation: "Indica uma ação habitual e contínua no presente."
    },
    {
      sentence: "A água ferve a 100 graus Celsius.",
      explanation: "Expressa uma verdade científica geral."
    },
    {
      sentence: "Nós partimos para Brasília na próxima semana.",
      explanation: "Presente com valor de futuro próximo (muito comum no cotidiano e em provas)."
    }
  ],
  observations: [
    "Cuidado com os verbos terminados em -IAR (como mediar, ansiar, remediar, incendiar, odiar - regra do MARIO). Eles mudam a raiz nas formas rizotônicas (Eu medeio, Tu medeias, Ele medeia, Eles medeiam). O verbo 'premiar' é regular (Eu premio).",
    "Verbos como Pedir e Medir têm alteração na 1ª pessoa do singular: Eu peço, Eu meço (e não 'ped-o' ou 'med-o').",
    "O verbo Pôr pertence à 2ª conjugação (-ER), pois historicamente era 'poer'. Suas conjugações no presente são: Eu ponho, Tu pões, Ele põe, Nós pomos, Vós pondes, Eles põem."
  ],
  traps: [
    "A famosa regra do M.A.R.I.O.: verbos Mediar, Ansiar, Remediar, Incendiar e Odiar sofrem alteração na raiz nas formas rizotônicas (Eu medeio, Tu medeias, Ele medeia, Eles medeiam). O verbo 'premiar', por outro lado, é regular (Eu premio, Tu premias).",
    "Mudança na 1ª pessoa do singular em verbos terminados em -DIR e -DIR/MIR: Pedir vira 'Eu peço', Medir vira 'Eu meço', Ouvir vira 'Eu ouço'. Não caia na armadilha de escrever 'pedo' ou 'medo'!"
  ],
  contestTips: [
    "O verbo PÔR (e seus derivados como repor, depor, propor) pertence à 2ª CONJUGAÇÃO (-ER), pois origina-se do latim 'ponere' (antigo 'poer'). Isso cai com frequência em questões de classificação gramatical.",
    "Derivados do verbo TER e VIR levam acento diferencial na 3ª pessoa do plural do presente: Ele tem / Eles têm; Ele vem / Eles vêm; Ele mantém / Eles mantêm."
  ]
};
