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
    {
      sentence: "O edital ______ que os candidatos ______ pontualmente.",
      pairId: "presente-presente-subjuntivo",
      pairLabel: "Presente do Indicativo + Presente do Subjuntivo",
      verbs: [
        { infinitive: "exigir", tense: "Presente do Indicativo", correctAnswer: "exige" },
        { infinitive: "comparecer", tense: "Presente do Subjuntivo", correctAnswer: "compareçam" },
      ],
      explanation:
        "'Exige' (Presente do Indicativo, 3ª pessoa) rege a subordinada no Presente do Subjuntivo ('compareçam'), pois expressa exigência sobre uma ação futura ainda não realizada.",
    },
    {
      sentence: "Eu ______ que você ______ com mais cuidado.",
      pairId: "presente-presente-subjuntivo",
      pairLabel: "Presente do Indicativo + Presente do Subjuntivo",
      verbs: [
        { infinitive: "pedir", tense: "Presente do Indicativo", correctAnswer: "Peço" },
        { infinitive: "revisar", tense: "Presente do Subjuntivo", correctAnswer: "revise" },
      ],
      explanation:
        "'Peço' (Presente do Indicativo, 1ª pessoa) rege a subordinada no Presente do Subjuntivo ('revise'), padrão típico de verbos de pedido.",
    },
    {
      sentence: "A lei ______ que todos ______ as normas.",
      pairId: "presente-presente-subjuntivo",
      pairLabel: "Presente do Indicativo + Presente do Subjuntivo",
      verbs: [
        { infinitive: "determinar", tense: "Presente do Indicativo", correctAnswer: "determina" },
        { infinitive: "seguir", tense: "Presente do Subjuntivo", correctAnswer: "sigam" },
      ],
      explanation:
        "'Determina' (Presente do Indicativo) expressa uma determinação que rege o Presente do Subjuntivo ('sigam') na oração subordinada.",
    },
    {
      sentence: "Nós ______ que a banca ______ o gabarito o quanto antes.",
      pairId: "presente-presente-subjuntivo",
      pairLabel: "Presente do Indicativo + Presente do Subjuntivo",
      verbs: [
        { infinitive: "esperar", tense: "Presente do Indicativo", correctAnswer: "esperamos" },
        { infinitive: "divulgar", tense: "Presente do Subjuntivo", correctAnswer: "divulgue" },
      ],
      explanation:
        "'Esperamos' (Presente do Indicativo) expressa expectativa e rege o Presente do Subjuntivo ('divulgue') na oração subordinada.",
    },
    {
      sentence: "O chefe ______ que a equipe ______ o relatório até amanhã.",
      pairId: "presente-presente-subjuntivo",
      pairLabel: "Presente do Indicativo + Presente do Subjuntivo",
      verbs: [
        { infinitive: "solicitar", tense: "Presente do Indicativo", correctAnswer: "solicita" },
        { infinitive: "entregar", tense: "Presente do Subjuntivo", correctAnswer: "entregue" },
      ],
      explanation:
        "'Solicita' (Presente do Indicativo) rege a subordinada no Presente do Subjuntivo ('entregue'), padrão comum com verbos de solicitação.",
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
    {
      sentence: "Quando os candidatos ______ o resultado, muitos ______ aliviados.",
      pairId: "futuro-subjuntivo-futuro-presente",
      pairLabel: "Futuro do Subjuntivo + Futuro do Presente do Indicativo",
      verbs: [
        { infinitive: "saber", tense: "Futuro do Subjuntivo", correctAnswer: "souberem" },
        { infinitive: "ficar", tense: "Futuro do Presente", correctAnswer: "ficarão" },
      ],
      explanation:
        "'Souberem' (Futuro do Subjuntivo) expressa condição temporal futura; 'ficarão' (Futuro do Presente) expressa a consequência que se seguirá.",
    },
    {
      sentence: "Se ela ______ ao evento, todos a ______.",
      pairId: "futuro-subjuntivo-futuro-presente",
      pairLabel: "Futuro do Subjuntivo + Futuro do Presente do Indicativo",
      verbs: [
        { infinitive: "vir", tense: "Futuro do Subjuntivo", correctAnswer: "vier" },
        { infinitive: "aplaudir", tense: "Futuro do Presente", correctAnswer: "aplaudirão" },
      ],
      explanation:
        "'Vier' (Futuro do Subjuntivo de 'vir') apresenta a condição futura; 'aplaudirão' (Futuro do Presente) apresenta a consequência certa.",
    },
    {
      sentence: "Quando eu ______ a prova, ______ para casa.",
      pairId: "futuro-subjuntivo-futuro-presente",
      pairLabel: "Futuro do Subjuntivo + Futuro do Presente do Indicativo",
      verbs: [
        { infinitive: "terminar", tense: "Futuro do Subjuntivo", correctAnswer: "terminar" },
        { infinitive: "ir", tense: "Futuro do Presente", correctAnswer: "irei" },
      ],
      explanation:
        "Para verbos regulares de 1ª conjugação, o Futuro do Subjuntivo tem a mesma forma do infinitivo ('terminar'); a consequência vai para o Futuro do Presente ('irei').",
    },
    {
      sentence: "Se vocês ______ as instruções, não ______ dificuldades.",
      pairId: "futuro-subjuntivo-futuro-presente",
      pairLabel: "Futuro do Subjuntivo + Futuro do Presente do Indicativo",
      verbs: [
        { infinitive: "seguir", tense: "Futuro do Subjuntivo", correctAnswer: "seguirem" },
        { infinitive: "ter", tense: "Futuro do Presente", correctAnswer: "terão" },
      ],
      explanation:
        "'Seguirem' (Futuro do Subjuntivo) expressa condição futura; 'terão' (Futuro do Presente) expressa a consequência negada.",
    },
    {
      sentence: "Quando a banca ______ o edital, os candidatos ______ a inscrição.",
      pairId: "futuro-subjuntivo-futuro-presente",
      pairLabel: "Futuro do Subjuntivo + Futuro do Presente do Indicativo",
      verbs: [
        { infinitive: "publicar", tense: "Futuro do Subjuntivo", correctAnswer: "publicar" },
        { infinitive: "fazer", tense: "Futuro do Presente", correctAnswer: "farão" },
      ],
      explanation:
        "'Publicar' (Futuro do Subjuntivo, mesma forma do infinitivo para verbos regulares) expressa a condição futura; 'farão' (Futuro do Presente) expressa a consequência.",
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
    {
      sentence: "Se eu ______ a resposta, ______ imediatamente.",
      pairId: "imperfeito-subjuntivo-futuro-preterito",
      pairLabel: "Pretérito Imperfeito do Subjuntivo + Futuro do Pretérito do Indicativo",
      verbs: [
        { infinitive: "saber", tense: "Pretérito Imperfeito do Subjuntivo", correctAnswer: "soubesse" },
        { infinitive: "responder", tense: "Futuro do Pretérito", correctAnswer: "responderia" },
      ],
      explanation:
        "'Soubesse' (Imperfeito do Subjuntivo) expressa hipótese contrária ao fato; 'responderia' (Futuro do Pretérito) expressa a consequência condicionada.",
    },
    {
      sentence: "Se ele ______ mais cedo, ______ o trem.",
      pairId: "imperfeito-subjuntivo-futuro-preterito",
      pairLabel: "Pretérito Imperfeito do Subjuntivo + Futuro do Pretérito do Indicativo",
      verbs: [
        { infinitive: "sair", tense: "Pretérito Imperfeito do Subjuntivo", correctAnswer: "saísse" },
        { infinitive: "pegar", tense: "Futuro do Pretérito", correctAnswer: "pegaria" },
      ],
      explanation:
        "'Saísse' (Imperfeito do Subjuntivo) expressa hipótese; 'pegaria' (Futuro do Pretérito) expressa a consequência condicionada a essa hipótese.",
    },
    {
      sentence: "Se nós ______ mais recursos, ______ o projeto.",
      pairId: "imperfeito-subjuntivo-futuro-preterito",
      pairLabel: "Pretérito Imperfeito do Subjuntivo + Futuro do Pretérito do Indicativo",
      verbs: [
        { infinitive: "ter", tense: "Pretérito Imperfeito do Subjuntivo", correctAnswer: "tivéssemos" },
        { infinitive: "expandir", tense: "Futuro do Pretérito", correctAnswer: "expandiríamos" },
      ],
      explanation:
        "'Tivéssemos' (Imperfeito do Subjuntivo, 1ª pessoa do plural) expressa hipótese; 'expandiríamos' (Futuro do Pretérito) expressa a consequência condicionada.",
    },
    {
      sentence: "Se a banca ______ o prazo, os candidatos ______ mais tempo.",
      pairId: "imperfeito-subjuntivo-futuro-preterito",
      pairLabel: "Pretérito Imperfeito do Subjuntivo + Futuro do Pretérito do Indicativo",
      verbs: [
        { infinitive: "prorrogar", tense: "Pretérito Imperfeito do Subjuntivo", correctAnswer: "prorrogasse" },
        { infinitive: "ter", tense: "Futuro do Pretérito", correctAnswer: "teriam" },
      ],
      explanation:
        "'Prorrogasse' (Imperfeito do Subjuntivo) expressa hipótese; 'teriam' (Futuro do Pretérito) expressa a consequência condicionada a essa hipótese.",
    },
    {
      sentence: "Se eu ______ a todas as aulas, ______ melhor preparado.",
      pairId: "imperfeito-subjuntivo-futuro-preterito",
      pairLabel: "Pretérito Imperfeito do Subjuntivo + Futuro do Pretérito do Indicativo",
      verbs: [
        { infinitive: "assistir", tense: "Pretérito Imperfeito do Subjuntivo", correctAnswer: "assistisse" },
        { infinitive: "estar", tense: "Futuro do Pretérito", correctAnswer: "estaria" },
      ],
      explanation:
        "'Assistisse' (Imperfeito do Subjuntivo) expressa hipótese contrária à realidade; 'estaria' (Futuro do Pretérito) expressa a consequência condicionada.",
    },
  ],
};
