import { VerbTenseInfo } from "./types";

export const futuroDoPreteritoData: VerbTenseInfo = {
  id: "Futuro do Pretérito",
  title: "Futuro do Pretérito do Indicativo",
  description: "Expressa hipótese, condição ou um fato futuro em relação a um momento passado.",
  usage: [
    "Fato posterior a outro fato ocorrido no passado (Ex: Ele disse que viajaria).",
    "Hipótese ou possibilidade condicionada a algo (Ex: Se tivesse dinheiro, compraria uma casa).",
    "Pedidos mais educados e sugestões atenuadas (Ex: Eu gostaria de fazer uma pergunta)."
  ],
  groups: [
    {
      conjugation: "1ª Conjugação (-AR)",
      endings: [
        { person: "Eu", ending: "-ria (ex: cantar + ia = cantaria)" },
        { person: "Tu", ending: "-rias (ex: cantar + ias = cantarias)" },
        { person: "Ele/Ela", ending: "-ria (ex: cantar + ia = cantaria)" },
        { person: "Nós", ending: "-ríamos (ex: cantar + íamos = cantaríamos)" },
        { person: "Vós", ending: "-ríeis (ex: cantar + íeis = cantaríeis)" },
        { person: "Eles/Elas", ending: "-riam (ex: cantar + iam = cantariam)" }
      ]
    },
    {
      conjugation: "2ª Conjugação (-ER)",
      endings: [
        { person: "Eu", ending: "-ria (ex: vender + ia = venderia)" },
        { person: "Tu", ending: "-rias (ex: vender + ias = venderias)" },
        { person: "Ele/Ela", ending: "-ria (ex: vender + ia = venderia)" },
        { person: "Nós", ending: "-ríamos (ex: vender + íamos = venderíamos)" },
        { person: "Vós", ending: "-ríeis (ex: vender + íeis = venderíeis)" },
        { person: "Eles/Elas", ending: "-riam (ex: vender + iam = venderiam)" }
      ]
    },
    {
      conjugation: "3ª Conjugação (-IR)",
      endings: [
        { person: "Eu", ending: "-ria (ex: partir + ia = partiria)" },
        { person: "Tu", ending: "-rias (ex: partir + ias = partirias)" },
        { person: "Ele/Ela", ending: "-ria (ex: partir + ia = partiria)" },
        { person: "Nós", ending: "-ríamos (ex: partir + íamos = partiríamos)" },
        { person: "Vós", ending: "-ríeis (ex: partir + íeis = partiríeis)" },
        { person: "Eles/Elas", ending: "-riam (ex: partir + iam = partiriam)" }
      ]
    }
  ],
  examples: [
    {
      sentence: "Ele disse que viajaria assim que possível.",
      explanation: "'Viajaria' expressa um fato futuro em relação a um momento passado ('disse')."
    },
    {
      sentence: "Eu gostaria de fazer uma pergunta.",
      explanation: "Uso de cortesia: forma mais educada do que 'eu quero fazer uma pergunta'."
    },
    {
      sentence: "Se tivesse dinheiro, teria viajado no ano passado.",
      explanation: "Forma composta (Futuro do Pretérito Composto): auxiliar 'ter' no Futuro do Pretérito + particípio, indicando um fato que poderia ter acontecido após outro fato passado."
    }
  ],
  observations: [
    "O Futuro do Pretérito também é chamado de 'Condicional' em algumas gramáticas, por seu forte valor de hipótese e condição.",
    "Assim como no Futuro do Presente, as terminações são adicionadas ao infinitivo completo do verbo, sendo idênticas nas três conjugações.",
    "O Futuro do Pretérito Composto (ex: 'teria viajado') expressa um fato que poderia ter acontecido após outro fato passado, mas seu estudo aprofundado fica para uma fase futura da plataforma."
  ],
  traps: [
    "Cuidado para não confundir com o Pretérito Imperfeito: 'ele viajaria' (Futuro do Pretérito, hipótese) × 'ele viajava' (Pretérito Imperfeito, hábito passado).",
    "Os mesmos verbos irregulares do Futuro do Presente mantêm a irregularidade aqui: dizer → diria; fazer → faria; trazer → traria (radical contraído antes do -ia)."
  ],
  contestTips: [
    "As bancas costumam cobrar a distinção de sentido entre 'viajará' (certeza no futuro) e 'viajaria' (hipótese/condição), pedindo a reescrita de uma forma para outra.",
    "É comum aparecer em questões sobre cortesia e discurso indireto: 'Ele disse que compraria a casa' equivale ao discurso direto 'Eu comprarei a casa', transposto para o passado."
  ]
};
