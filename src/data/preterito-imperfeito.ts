import { VerbTenseInfo } from "./types";

export const preteritoImperfeitoData: VerbTenseInfo = {
  id: "Pretérito Imperfeito",
  title: "Pretérito Imperfeito do Indicativo",
  description: "Expressa uma ação passada habitual, contínua, prolongada ou que estava ocorrendo quando outra ação aconteceu.",
  usage: [
    "Ação habitual ou repetitiva no passado (Ex: Antigamente, eu corria no parque).",
    "Ação contínua ou em andamento no passado (Ex: Ela lia quando o telefone tocou).",
    "Descrições de cenários, pessoas ou estados no passado (Ex: O dia estava chuvoso e frio).",
    "Expressão de cortesia ou polidez (Ex: Eu queria pedir um favor...)."
  ],
  groups: [
    {
      conjugation: "1ª Conjugação (-AR)",
      endings: [
        { person: "Eu", ending: "-ava (ex: cant-ava)" },
        { person: "Tu", ending: "-avas (ex: cant-avas)" },
        { person: "Ele/Ela", ending: "-ava (ex: cant-ava)" },
        { person: "Nós", ending: "-ávamos (ex: cant-ávamos)" },
        { person: "Vós", ending: "-áveis (ex: cant-áveis)" },
        { person: "Eles/Elas", ending: "-avam (ex: cant-avam)" }
      ]
    },
    {
      conjugation: "2ª Conjugação (-ER)",
      endings: [
        { person: "Eu", ending: "-ia (ex: vend-ia)" },
        { person: "Tu", ending: "-ias (ex: vend-ias)" },
        { person: "Ele/Ela", ending: "-ia (ex: vend-ia)" },
        { person: "Nós", ending: "-íamos (ex: vend-íamos)" },
        { person: "Vós", ending: "-íeis (ex: vend-íeis)" },
        { person: "Eles/Elas", ending: "-iam (ex: vend-iam)" }
      ]
    },
    {
      conjugation: "3ª Conjugação (-IR)",
      endings: [
        { person: "Eu", ending: "-ia (ex: part-ia)" },
        { person: "Tu", ending: "-ias (ex: part-ias)" },
        { person: "Ele/Ela", ending: "-ia (ex: part-ia)" },
        { person: "Nós", ending: "-íamos (ex: part-íamos)" },
        { person: "Vós", ending: "-íeis (ex: part-íeis)" },
        { person: "Eles/Elas", ending: "-iam (ex: part-iam)" }
      ]
    }
  ],
  examples: [
    {
      sentence: "Nas férias escolares, nós jogávamos bola até o anoitecer.",
      explanation: "Indica um hábito recorrente em uma época passada."
    },
    {
      sentence: "Eu estudava quando meu amigo me ligou.",
      explanation: "Ação em andamento que foi interrompida por outra ação pontual."
    },
    {
      sentence: "A sala de aula era grande e os alunos prestavam atenção.",
      explanation: "Usado para descrever um ambiente ou estado no passado."
    }
  ],
  observations: [
    "Dica de Ouro para Concursos: Existem APENAS 4 verbos irregulares no Pretérito Imperfeito do Indicativo: SER, TER, VIR e PÔR. Todos os outros verbos da língua portuguesa são perfeitamente regulares nesse tempo verbal!",
    "Conjugações dos 4 irregulares:\n" +
    "• SER: Eu era, Tu eras, Ele era, Nós éramos, Vós éreis, Eles eram.\n" +
    "• TER: Eu tinha, Tu tinhas, Ele tinha, Nós tínhamos, Vós tínheis, Eles tinham.\n" +
    "• VIR: Eu vinha, Tu vinhas, Ele vinha, Nós vínhamos, Vós vínheis, Eles vinham.\n" +
    "• PÔR: Eu punha, Tu punhas, Ele punha, Nós púnhamos, Vós púnheis, Eles punham.",
    "O Pretérito Imperfeito é muito cobrado em correlação verbal, especialmente com o Futuro do Pretérito (Ex: Se eu ESTUDASSE [Imp. Subjuntivo], PASSARIA [Fut. Pret. Indicativo] / Quando eu ESTUDAVA [Imp. Indicativo], costumava passar)."
  ],
  traps: [
    "Apenas 4 verbos são irregulares no Pretérito Imperfeito do Indicativo: SER (era), TER (tinha), VIR (vinha) e PÔR (punha). TODOS os demais verbos em português são regulares!",
    "Diferença entre o Imperfeito do Indicativo (cantava, partia) e o Imperfeito do Subjuntivo (cantasse, partisse). O do Indicativo expressa um fato habitual real no passado, enquanto o do Subjuntivo expressa hipótese ou condição."
  ],
  contestTips: [
    "Decorar as desinências modo-temporais (DMT) do Pretérito Imperfeito do Indicativo é essencial para provas: em verbos de 1ª conjugação é '-va' (cantava, estudavam) e em verbos de 2ª e 3ª conjugações é '-ia' (vendia, partíamos, queriam).",
    "Correlação verbal comum em provas: o Imperfeito do Subjuntivo correlaciona-se com o Futuro do Pretérito do Indicativo (Ex: Se eu *estudasse* [Subjuntivo], *passaria* [Indicativo]). Mas o Imperfeito do Indicativo também se correlaciona consigo mesmo ou com o Pretérito Perfeito para descrever ações em andamento cortadas por outra pontual."
  ]
};
