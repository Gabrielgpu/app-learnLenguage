import { VerbTenseInfo } from "./types";

export const futuroDoPresenteData: VerbTenseInfo = {
  id: "Futuro do Presente",
  title: "Futuro do Presente do Indicativo",
  description: "Expressa um fato que ocorrerá posteriormente ao momento atual.",
  usage: [
    "Ação ou fato que certamente acontecerá após o momento da fala (Ex: Amanhã eu estudarei).",
    "Previsões, promessas e planos futuros com grau de certeza (Ex: Eles viajarão nas férias).",
    "Frequente em editais, contratos e textos normativos para indicar obrigações futuras ('O candidato entregará...')."
  ],
  groups: [
    {
      conjugation: "1ª Conjugação (-AR)",
      endings: [
        { person: "Eu", ending: "-rei (ex: cantar + ei = cantarei)" },
        { person: "Tu", ending: "-rás (ex: cantar + ás = cantarás)" },
        { person: "Ele/Ela", ending: "-rá (ex: cantar + á = cantará)" },
        { person: "Nós", ending: "-remos (ex: cantar + emos = cantaremos)" },
        { person: "Vós", ending: "-reis (ex: cantar + eis = cantareis)" },
        { person: "Eles/Elas", ending: "-rão (ex: cantar + ão = cantarão)" }
      ]
    },
    {
      conjugation: "2ª Conjugação (-ER)",
      endings: [
        { person: "Eu", ending: "-rei (ex: vender + ei = venderei)" },
        { person: "Tu", ending: "-rás (ex: vender + ás = venderás)" },
        { person: "Ele/Ela", ending: "-rá (ex: vender + á = venderá)" },
        { person: "Nós", ending: "-remos (ex: vender + emos = venderemos)" },
        { person: "Vós", ending: "-reis (ex: vender + eis = vendereis)" },
        { person: "Eles/Elas", ending: "-rão (ex: vender + ão = venderão)" }
      ]
    },
    {
      conjugation: "3ª Conjugação (-IR)",
      endings: [
        { person: "Eu", ending: "-rei (ex: partir + ei = partirei)" },
        { person: "Tu", ending: "-rás (ex: partir + ás = partirás)" },
        { person: "Ele/Ela", ending: "-rá (ex: partir + á = partirá)" },
        { person: "Nós", ending: "-remos (ex: partir + emos = partiremos)" },
        { person: "Vós", ending: "-reis (ex: partir + eis = partireis)" },
        { person: "Eles/Elas", ending: "-rão (ex: partir + ão = partirão)" }
      ]
    }
  ],
  examples: [
    {
      sentence: "Amanhã eu estudarei para a prova de português.",
      explanation: "O verbo 'estudarei' indica um fato certo que ocorrerá após o momento da fala."
    },
    {
      sentence: "Eles viajarão nas férias de julho.",
      explanation: "'Viajarão' expressa um plano futuro com boa certeza de realização."
    },
    {
      sentence: "Antes de sair, eu já terei terminado o relatório.",
      explanation: "Forma composta (Futuro do Presente Composto): auxiliar 'ter' no Futuro do Presente + particípio, indicando ação futura concluída antes de outra ação futura."
    }
  ],
  observations: [
    "Diferente dos demais tempos verbais, as terminações do Futuro do Presente são adicionadas ao infinitivo completo do verbo (e não ao radical), sendo idênticas nas três conjugações.",
    "Na linguagem coloquial, é comum substituir o Futuro do Presente pela perífrase 'ir' (presente) + infinitivo: 'estudarei' vira 'vou estudar'.",
    "O Futuro do Presente Composto (ex: 'terei terminado') expressa um fato que estará concluído antes de outro acontecimento futuro, mas seu estudo aprofundado fica para uma fase futura da plataforma."
  ],
  traps: [
    "Cuidado para não confundir com o Pretérito Mais-que-perfeito: 'falará' (com acento, terminação -á) é Futuro do Presente; 'falara' (sem acento, terminação -a) é Pretérito Mais-que-perfeito.",
    "Verbos como 'dizer', 'fazer' e 'trazer' são irregulares no Futuro do Presente, pois contraem o radical: dizer → direi; fazer → farei; trazer → trarei (e não 'dizerei', 'fazerei', 'trazerei')."
  ],
  contestTips: [
    "As bancas costumam explorar a diferença de sentido entre o Futuro do Presente (certeza) e o Futuro do Pretérito (hipótese/condição): 'ele viajará' × 'ele viajaria'.",
    "Fique atento às formas irregulares mais cobradas: direi/dirás..., farei/farás..., trarei/trarás... — todas derivadas da contração do radical antes do -rei."
  ]
};
