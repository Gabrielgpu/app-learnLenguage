import { VerbTenseInfo } from "./types";

export const futuroDoSubjuntivoData: VerbTenseInfo = {
  id: "Futuro do Subjuntivo",
  title: "Futuro do Subjuntivo",
  description: "Expressa possibilidade ou condição relacionada ao futuro, utilizada principalmente em orações subordinadas.",
  usage: [
    "Ação hipotética futura, dependente de outra ação (Ex: Quando ele vier, conversaremos).",
    "Condição para que outro fato futuro se realize (Ex: Se chover, cancelaremos o passeio).",
    "Introduzida por conectivos como quando, se, logo que, assim que, sempre que e enquanto."
  ],
  groups: [
    {
      conjugation: "1ª Conjugação (-AR)",
      endings: [
        { person: "Eu", ending: "Se eu falar" },
        { person: "Tu", ending: "Se tu falares" },
        { person: "Ele/Ela", ending: "Se ele/ela falar" },
        { person: "Nós", ending: "Se nós falarmos" },
        { person: "Vós", ending: "Se vós falardes" },
        { person: "Eles/Elas", ending: "Se eles/elas falarem" }
      ]
    },
    {
      conjugation: "2ª Conjugação (-ER)",
      endings: [
        { person: "Eu", ending: "Se eu vender" },
        { person: "Tu", ending: "Se tu venderes" },
        { person: "Ele/Ela", ending: "Se ele/ela vender" },
        { person: "Nós", ending: "Se nós vendermos" },
        { person: "Vós", ending: "Se vós venderdes" },
        { person: "Eles/Elas", ending: "Se eles/elas venderem" }
      ]
    },
    {
      conjugation: "3ª Conjugação (-IR)",
      endings: [
        { person: "Eu", ending: "Se eu partir" },
        { person: "Tu", ending: "Se tu partires" },
        { person: "Ele/Ela", ending: "Se ele/ela partir" },
        { person: "Nós", ending: "Se nós partirmos" },
        { person: "Vós", ending: "Se vós partirdes" },
        { person: "Eles/Elas", ending: "Se eles/elas partirem" }
      ]
    }
  ],
  examples: [
    {
      sentence: "Quando ele vier, conversaremos sobre o projeto.",
      explanation: "'Vier' (verbo vir) está no Futuro do Subjuntivo, indicando uma condição futura para a ação de 'conversar'."
    },
    {
      sentence: "Se chover, cancelaremos o passeio.",
      explanation: "'Chover' no Futuro do Subjuntivo expressa uma hipótese futura que condiciona o cancelamento."
    },
    {
      sentence: "Assim que terminarem a prova, poderão sair.",
      explanation: "'Terminarem' (verbo terminar, regular) está flexionado na 3ª pessoa do plural do Futuro do Subjuntivo."
    }
  ],
  observations: [
    "O Futuro do Subjuntivo é formado a partir da 3ª pessoa do plural do Pretérito Perfeito do Indicativo, retirando-se a terminação '-am' e acrescentando-se as desinências próprias do modo.",
    "Verbos irregulares no Pretérito Perfeito mantêm a mesma irregularidade aqui: fizeram → fizer; trouxeram → trouxer; vieram → vier; disseram → disser.",
    "Para os verbos regulares, a forma da 1ª e 3ª pessoa do singular coincide com o próprio infinitivo (Ex: 'falar', 'vender', 'partir')."
  ],
  traps: [
    "Cuidado para não confundir 'Quando ele vem' (Presente do Indicativo, fato habitual) com 'Quando ele vier' (Futuro do Subjuntivo, condição futura hipotética).",
    "Não confunda a forma 'fizer' (Futuro do Subjuntivo) com 'fazer' (infinitivo) ou 'fez' (Pretérito Perfeito) — são conjugações distintas do mesmo verbo."
  ],
  contestTips: [
    "As bancas costumam pedir a derivação correta a partir da 3ª pessoa do plural do Pretérito Perfeito, cobrando verbos irregulares como 'trazer' (trouxer), 'dizer' (disser) e 'pôr' (puser).",
    "É comum a cobrança dos conectivos que introduzem orações no Futuro do Subjuntivo: quando, se, logo que, assim que, sempre que e enquanto, sempre seguidos por esse tempo verbal."
  ]
};
