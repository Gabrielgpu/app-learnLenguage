import { FillBlankExercise } from "./fillBlankTypes";

export const fillBlankQuestions: Record<string, FillBlankExercise[]> = {
  "Presente do Indicativo": [
    {
      sentence: "Todos os dias, o gerente ______ os relatórios antes das 9h.",
      verb: "revisar",
      tense: "Presente do Indicativo",
      correctAnswer: "revisa",
      explanation: "O Presente do Indicativo indica um hábito ('todos os dias'). Para 'revisar' (1ª conjugação), a 3ª pessoa do singular é 'revisa'."
    },
    {
      sentence: "Nós sempre ______ o mesmo caminho para o trabalho.",
      verb: "seguir",
      tense: "Presente do Indicativo",
      correctAnswer: "seguimos",
      explanation: "Ação habitual no presente. 'Seguir' (3ª conjugação) na 1ª pessoa do plural: 'seguimos'."
    }
  ],
  "Pretérito Perfeito": [
    {
      sentence: "Ontem à noite, os candidatos ______ a prova sem dificuldades.",
      verb: "concluir",
      tense: "Pretérito Perfeito",
      correctAnswer: "concluíram",
      explanation: "Ação totalmente concluída no passado ('ontem'). 'Concluir' na 3ª pessoa do plural do Pretérito Perfeito: 'concluíram'."
    },
    {
      sentence: "Eu já ______ o processo seletivo na semana passada.",
      verb: "finalizar",
      tense: "Pretérito Perfeito",
      correctAnswer: "finalizei",
      explanation: "Fato pontual e concluído no passado. 'Finalizar' na 1ª pessoa do singular do Pretérito Perfeito: 'finalizei'."
    }
  ],
  "Pretérito Imperfeito": [
    {
      sentence: "Antigamente, os funcionários ______ o expediente às 8h.",
      verb: "iniciar",
      tense: "Pretérito Imperfeito",
      correctAnswer: "iniciavam",
      explanation: "Hábito frequente no passado ('antigamente'). 'Iniciar' na 3ª pessoa do plural do Pretérito Imperfeito: 'iniciavam'."
    },
    {
      sentence: "Enquanto ele estudava, nós ______ o restante do material.",
      verb: "revisar",
      tense: "Pretérito Imperfeito",
      correctAnswer: "revisávamos",
      explanation: "Ação contínua e simultânea no passado. 'Revisar' na 1ª pessoa do plural do Pretérito Imperfeito: 'revisávamos'."
    }
  ],
  "Pretérito Mais-que-perfeito": [
    {
      sentence: "Quando chegamos ao teatro, o espetáculo já ______.",
      verb: "começar",
      tense: "Pretérito Mais-que-perfeito",
      correctAnswer: "começara",
      explanation: "Ação concluída antes de outra ação passada ('chegamos'). 'Começar' na 3ª pessoa do singular do Pretérito Mais-que-perfeito simples: 'começara'."
    },
    {
      sentence: "Os candidatos ______ o edital antes mesmo de a banca divulgá-lo oficialmente.",
      verb: "prever",
      tense: "Pretérito Mais-que-perfeito",
      correctAnswer: "previram",
      explanation: "Ação anterior a outra ação passada. 'Prever' na 3ª pessoa do plural do Pretérito Mais-que-perfeito: 'previram'."
    }
  ],
  "Futuro do Presente": [
    {
      sentence: "Amanhã nós ______ o projeto final da disciplina.",
      verb: "concluir",
      tense: "Futuro do Presente",
      correctAnswer: "concluiremos",
      explanation: "Fato certo que ocorrerá após o momento da fala. 'Concluir' na 1ª pessoa do plural do Futuro do Presente: 'concluiremos'."
    },
    {
      sentence: "O edital determina que a banca ______ o resultado até sexta-feira.",
      verb: "divulgar",
      tense: "Futuro do Presente",
      correctAnswer: "divulgará",
      explanation: "Determinação/obrigação futura, comum em editais. 'Divulgar' na 3ª pessoa do singular do Futuro do Presente: 'divulgará'."
    }
  ],
  "Futuro do Pretérito": [
    {
      sentence: "Ele afirmou que ______ conosco na próxima viagem.",
      verb: "viajar",
      tense: "Futuro do Pretérito",
      correctAnswer: "viajaria",
      explanation: "Fato posterior a outro fato passado ('afirmou'). 'Viajar' na 3ª pessoa do singular do Futuro do Pretérito: 'viajaria'."
    },
    {
      sentence: "Se houvesse mais tempo, eu ______ todo o edital com calma.",
      verb: "revisar",
      tense: "Futuro do Pretérito",
      correctAnswer: "revisaria",
      explanation: "Hipótese condicionada. 'Revisar' na 1ª pessoa do singular do Futuro do Pretérito: 'revisaria'."
    }
  ],
  "Futuro do Subjuntivo": [
    {
      sentence: "Quando vocês ______ a prova, poderão sair da sala.",
      verb: "terminar",
      tense: "Futuro do Subjuntivo",
      correctAnswer: "terminarem",
      explanation: "Condição futura hipotética após 'quando'. 'Terminar' na 3ª pessoa do plural do Futuro do Subjuntivo: 'terminarem'."
    },
    {
      sentence: "Se ele ______ a verdade, tudo se resolverá rapidamente.",
      verb: "dizer",
      tense: "Futuro do Subjuntivo",
      correctAnswer: "disser",
      explanation: "Condição introduzida por 'se'. 'Dizer' deriva de 'disseram' (Pretérito Perfeito): 3ª pessoa do singular do Futuro do Subjuntivo é 'disser'."
    }
  ]
};
