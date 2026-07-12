import { CorrelationExercise, CorrelationPairId } from "./correlationTypes";

export const correlationQuestions: Record<CorrelationPairId, CorrelationExercise[]> = {
  "presente-presente-subjuntivo": [
    {
      sentence: "______ que você ______ o dever agora mesmo.",
      pairId: "presente-presente-subjuntivo",
      pairLabel: "Presente do Indicativo + Presente do Subjuntivo",
      verbs: [
        { infinitive: "exigir", tense: "Presente do Indicativo", correctAnswer: "Exijo" },
        { infinitive: "fazer", tense: "Presente do Subjuntivo", correctAnswer: "faça" },
      ],
      explanation:
        "O verbo principal no Presente do Indicativo ('Exijo') exige que a oração subordinada esteja no Presente do Subjuntivo ('faça'), pois expressa exigência sobre algo ainda não realizado.",
    },
    {
      sentence: "O professor ______ que os alunos ______ atenção às explicações.",
      pairId: "presente-presente-subjuntivo",
      pairLabel: "Presente do Indicativo + Presente do Subjuntivo",
      verbs: [
        { infinitive: "pedir", tense: "Presente do Indicativo", correctAnswer: "pede" },
        { infinitive: "prestar", tense: "Presente do Subjuntivo", correctAnswer: "prestem" },
      ],
      explanation:
        "'Pede' (Presente do Indicativo, fato atual) correlaciona-se com 'prestem' (Presente do Subjuntivo), pois o verbo de pedido rege subjuntivo na oração subordinada.",
    },
    {
      sentence: "A banca ______ que os candidatos ______ o edital com atenção.",
      pairId: "presente-presente-subjuntivo",
      pairLabel: "Presente do Indicativo + Presente do Subjuntivo",
      verbs: [
        { infinitive: "recomendar", tense: "Presente do Indicativo", correctAnswer: "recomenda" },
        { infinitive: "ler", tense: "Presente do Subjuntivo", correctAnswer: "leiam" },
      ],
      explanation:
        "'Recomenda' (Presente do Indicativo) rege a oração subordinada no Presente do Subjuntivo ('leiam'), padrão comum com verbos de recomendação/sugestão.",
    },
  ],
  "futuro-subjuntivo-futuro-presente": [
    {
      sentence: "Se você ______ o dever, ele ______ com você.",
      pairId: "futuro-subjuntivo-futuro-presente",
      pairLabel: "Futuro do Subjuntivo + Futuro do Presente do Indicativo",
      verbs: [
        { infinitive: "fazer", tense: "Futuro do Subjuntivo", correctAnswer: "fizer" },
        { infinitive: "conversar", tense: "Futuro do Presente", correctAnswer: "conversará" },
      ],
      explanation:
        "Em orações condicionais introduzidas por 'se', a condição hipotética futura ('fizer') pede o Futuro do Subjuntivo, e a consequência ('conversará') vai para o Futuro do Presente do Indicativo.",
    },
    {
      sentence: "Quando você ______ o dever, eu ______ contente.",
      pairId: "futuro-subjuntivo-futuro-presente",
      pairLabel: "Futuro do Subjuntivo + Futuro do Presente do Indicativo",
      verbs: [
        { infinitive: "fazer", tense: "Futuro do Subjuntivo", correctAnswer: "fizer" },
        { infinitive: "ficar", tense: "Futuro do Presente", correctAnswer: "ficarei" },
      ],
      explanation:
        "Conectivos temporais como 'quando' também correlacionam o Futuro do Subjuntivo ('fizer') com o Futuro do Presente ('ficarei') na oração principal.",
    },
    {
      sentence: "Se os candidatos ______ o edital, eles ______ melhor preparados.",
      pairId: "futuro-subjuntivo-futuro-presente",
      pairLabel: "Futuro do Subjuntivo + Futuro do Presente do Indicativo",
      verbs: [
        { infinitive: "seguir", tense: "Futuro do Subjuntivo", correctAnswer: "seguirem" },
        { infinitive: "estar", tense: "Futuro do Presente", correctAnswer: "estarão" },
      ],
      explanation:
        "'Seguirem' (Futuro do Subjuntivo, 3ª pessoa do plural) expressa condição futura; 'estarão' (Futuro do Presente) expressa a consequência certa dessa condição.",
    },
  ],
  "imperfeito-subjuntivo-futuro-preterito": [
    {
      sentence: "Se você ______ o dever, eu ______ suas respostas.",
      pairId: "imperfeito-subjuntivo-futuro-preterito",
      pairLabel: "Pretérito Imperfeito do Subjuntivo + Futuro do Pretérito do Indicativo",
      verbs: [
        { infinitive: "fazer", tense: "Pretérito Imperfeito do Subjuntivo", correctAnswer: "fizesse" },
        { infinitive: "ler", tense: "Futuro do Pretérito", correctAnswer: "leria" },
      ],
      explanation:
        "Uma condição hipotética mais remota ou pouco provável ('fizesse', Imperfeito do Subjuntivo) correlaciona-se com o Futuro do Pretérito ('leria'), indicando um resultado condicionado que não se concretizou.",
    },
    {
      sentence: "Se eu ______ mais tempo, ______ todo o edital com calma.",
      pairId: "imperfeito-subjuntivo-futuro-preterito",
      pairLabel: "Pretérito Imperfeito do Subjuntivo + Futuro do Pretérito do Indicativo",
      verbs: [
        { infinitive: "ter", tense: "Pretérito Imperfeito do Subjuntivo", correctAnswer: "tivesse" },
        { infinitive: "revisar", tense: "Futuro do Pretérito", correctAnswer: "revisaria" },
      ],
      explanation:
        "'Tivesse' (Imperfeito do Subjuntivo) expressa hipótese contrária à realidade presente; 'revisaria' (Futuro do Pretérito) expressa a consequência condicionada — par clássico cobrado em provas de concurso.",
    },
    {
      sentence: "Se ele ______ mais cedo, não ______ atraso na prova.",
      pairId: "imperfeito-subjuntivo-futuro-preterito",
      pairLabel: "Pretérito Imperfeito do Subjuntivo + Futuro do Pretérito do Indicativo",
      verbs: [
        { infinitive: "estudar", tense: "Pretérito Imperfeito do Subjuntivo", correctAnswer: "estudasse" },
        { infinitive: "sofrer", tense: "Futuro do Pretérito", correctAnswer: "sofreria" },
      ],
      explanation:
        "'Estudasse' (Imperfeito do Subjuntivo) apresenta uma hipótese não realizada; 'sofreria' (Futuro do Pretérito) apresenta a consequência hipotética correspondente.",
    },
  ],
};
