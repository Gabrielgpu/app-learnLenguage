import { VerbTenseInfo } from "./types";

export const preteritoMaisQuePerfeitoData: VerbTenseInfo = {
  id: "Pretérito Mais-que-perfeito",
  title: "Pretérito Mais-que-perfeito do Indicativo",
  description: "Expressa uma ação concluída antes de outra ação também ocorrida no passado.",
  usage: [
    "Ação ocorrida antes de outro fato passado (Ex: Quando chegui, ela já partira).",
    "Frequente em textos literários, narrativas históricas e documentos formais.",
    "Comum em reescritas e substituições de tempos verbais em concursos públicos."
  ],
  groups: [
    {
      conjugation: "1ª Conjugação (-AR)",
      endings: [
        { person: "Eu", ending: "-ara (ex: cant-ara)" },
        { person: "Tu", ending: "-aras (ex: cant-aras)" },
        { person: "Ele/Ela", ending: "-ara (ex: cant-ara)" },
        { person: "Nós", ending: "-áramos (ex: cant-áramos)" },
        { person: "Vós", ending: "-áreis (ex: cant-áreis)" },
        { person: "Eles/Elas", ending: "-aram (ex: cant-aram)" }
      ]
    },
    {
      conjugation: "2ª Conjugação (-ER)",
      endings: [
        { person: "Eu", ending: "-era (ex: vend-era)" },
        { person: "Tu", ending: "-eras (ex: vend-eras)" },
        { person: "Ele/Ela", ending: "-era (ex: vend-era)" },
        { person: "Nós", ending: "-êramos (ex: vend-êramos)" },
        { person: "Vós", ending: "-êreis (ex: vend-êreis)" },
        { person: "Eles/Elas", ending: "-eram (ex: vend-eram)" }
      ]
    },
    {
      conjugation: "3ª Conjugação (-IR)",
      endings: [
        { person: "Eu", ending: "-ira (ex: part-ira)" },
        { person: "Tu", ending: "-iras (ex: part-iras)" },
        { person: "Ele/Ela", ending: "-ira (ex: part-ira)" },
        { person: "Nós", ending: "-íramos (ex: part-íramos)" },
        { person: "Vós", ending: "-íreis (ex: part-íreis)" },
        { person: "Eles/Elas", ending: "-iram (ex: part-iram)" }
      ]
    }
  ],
  examples: [
    {
      sentence: "Quando chegamos ao aeroporto, o avião partira.",
      explanation: "A ação de 'partir' ocorreu antes da ação de 'chegar' no passado."
    },
    {
      sentence: "O juiz declarara encerrada a sessão quando os advogados protestaram.",
      explanation: "A declaração do encerramento foi concluída antes do protesto."
    },
    {
      sentence: "O espetáculo já começara quando a peça foi interrompida.",
      explanation: "Ação de começar anterior à interrupção."
    }
  ],
  observations: [
    "O Pretérito Mais-que-perfeito simples possui uso reduzido na linguagem cotidiana oral.",
    "Na fala corrente, normalmente utiliza-se a forma composta. Ex: 'Eu cantara' vira 'Eu tinha cantado' ou 'Eu havia cantado'.",
    "As formas de 1ª e 2ª pessoa do plural (Nós e Vós) são proparoxítonas e por isso sempre levam acento gráfico (áramos/áreis, êramos/êreis, íramos/íreis)."
  ],
  traps: [
    "Cuidado para não confundir a terminação -ra com o Futuro do Presente: 'falará' (com acento) é Futuro do Presente (ação que ocorrerá); 'falara' (sem acento) é Pretérito Mais-que-perfeito (ação que já ocorrera antes de outra).",
    "A forma composta correspondente utiliza o auxiliar ter/haver no Pretérito Imperfeito (tinha/havia) + Particípio, e não no Presente (não confunda 'tinha cantado' com 'tem cantado')."
  ],
  contestTips: [
    "As bancas costumam cobrar muito a correlação e reescrita entre a forma simples (cantara, vendera, partira) e a forma composta equivalente (tinha cantado, havia vendido, tinha partido).",
    "Na linha do tempo das ações de um texto, a forma no Mais-que-perfeito representa cronologicamente a ação mais antiga de todas (a primeira a acontecer)."
  ]
};
