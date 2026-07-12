import { CorrelationPairId } from "./correlationTypes";

export interface CorrelationRule {
  id: CorrelationPairId;
  label: string;
  description: string;
  example: string;
}

export const CORRELATION_RULES: CorrelationRule[] = [
  {
    id: "presente-presente-subjuntivo",
    label: "Presente do Indicativo + Presente do Subjuntivo",
    description:
      "Um verbo principal no Presente do Indicativo que expressa desejo, exigência ou pedido rege uma oração subordinada no Presente do Subjuntivo.",
    example: "Exijo que você faça o dever.",
  },
  {
    id: "futuro-subjuntivo-futuro-presente",
    label: "Futuro do Subjuntivo + Futuro do Presente do Indicativo",
    description:
      "Em orações condicionais ou temporais introduzidas por 'se' ou 'quando', a condição hipotética futura vai para o Futuro do Subjuntivo e a consequência para o Futuro do Presente do Indicativo.",
    example: "Se fizer o dever, ele conversará com você.",
  },
  {
    id: "imperfeito-subjuntivo-futuro-preterito",
    label: "Pretérito Imperfeito do Subjuntivo + Futuro do Pretérito do Indicativo",
    description:
      "Uma condição hipotética mais remota ou contrária à realidade, no Pretérito Imperfeito do Subjuntivo, correlaciona-se com o Futuro do Pretérito do Indicativo na oração principal.",
    example: "Se você fizesse o dever, eu leria suas respostas.",
  },
];
