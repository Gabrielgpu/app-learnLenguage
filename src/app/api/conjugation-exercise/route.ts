import { NextResponse } from "next/server";
import { ConjugationExercise, Difficulty } from "@/lib/conjugationTypes";

// ── Mock exercises (fallback when no AI key available) ────────────────────────

const easyVerbs = [
  { verb: "abandonar", tense: "Presente do Indicativo" },
  { verb: "abraçar", tense: "Presente do Indicativo" },
  { verb: "abrigar", tense: "Presente do Indicativo" },
  { verb: "aceitar", tense: "Presente do Indicativo" },
  { verb: "acompanhar", tense: "Presente do Indicativo" },
  { verb: "aconselhar", tense: "Presente do Indicativo" },
  { verb: "acordar", tense: "Presente do Indicativo" },
  { verb: "acreditar", tense: "Presente do Indicativo" },
  { verb: "adorar", tense: "Presente do Indicativo" },
  { verb: "ajudar", tense: "Presente do Indicativo" },
  { verb: "alugar", tense: "Presente do Indicativo" },
  { verb: "amar", tense: "Presente do Indicativo" },
  { verb: "andar", tense: "Presente do Indicativo" },
  { verb: "anunciar", tense: "Presente do Indicativo" },
  { verb: "apagar", tense: "Presente do Indicativo" },
  { verb: "aprender", tense: "Presente do Indicativo" },
  { verb: "apresentar", tense: "Presente do Indicativo" },
  { verb: "arrumar", tense: "Presente do Indicativo" },
  { verb: "atender", tense: "Presente do Indicativo" },
  { verb: "atravessar", tense: "Presente do Indicativo" },
  { verb: "beber", tense: "Presente do Indicativo" },
  { verb: "brincar", tense: "Presente do Indicativo" },
  { verb: "caminhar", tense: "Presente do Indicativo" },
  { verb: "cantar", tense: "Presente do Indicativo" },
  { verb: "carregar", tense: "Presente do Indicativo" },
  { verb: "chegar", tense: "Presente do Indicativo" },
  { verb: "cozinhar", tense: "Presente do Indicativo" },
  { verb: "comprar", tense: "Presente do Indicativo" },
  { verb: "concordar", tense: "Presente do Indicativo" },
  { verb: "consertar", tense: "Presente do Indicativo" },
  { verb: "conversar", tense: "Presente do Indicativo" },
  { verb: "convidar", tense: "Presente do Indicativo" },
  { verb: "correr", tense: "Presente do Indicativo" },
  { verb: "cortar", tense: "Presente do Indicativo" },
  { verb: "dançar", tense: "Presente do Indicativo" },
  { verb: "decorar", tense: "Presente do Indicativo" },
  { verb: "deixar", tense: "Presente do Indicativo" },
  { verb: "descansar", tense: "Presente do Indicativo" },
  { verb: "desenhar", tense: "Presente do Indicativo" },
  { verb: "desligar", tense: "Presente do Indicativo" },
  { verb: "dividir", tense: "Presente do Indicativo" },
  { verb: "educar", tense: "Presente do Indicativo" },
  { verb: "emprestar", tense: "Presente do Indicativo" },
  { verb: "ensinar", tense: "Presente do Indicativo" },
  { verb: "entrar", tense: "Presente do Indicativo" },
  { verb: "escutar", tense: "Presente do Indicativo" },
  { verb: "esperar", tense: "Presente do Indicativo" },
  { verb: "estudar", tense: "Presente do Indicativo" },
  { verb: "explicar", tense: "Presente do Indicativo" },
  { verb: "fechar", tense: "Presente do Indicativo" },
  { verb: "fumar", tense: "Presente do Indicativo" },
  { verb: "ganhar", tense: "Presente do Indicativo" },
  { verb: "gostar", tense: "Presente do Indicativo" },
  { verb: "guardar", tense: "Presente do Indicativo" },
  { verb: "imaginar", tense: "Presente do Indicativo" },
  { verb: "jantar", tense: "Presente do Indicativo" },
  { verb: "jogar", tense: "Presente do Indicativo" },
  { verb: "lavar", tense: "Presente do Indicativo" },
  { verb: "lembrar", tense: "Presente do Indicativo" },
  { verb: "levantar", tense: "Presente do Indicativo" },
  { verb: "ligar", tense: "Presente do Indicativo" },
  { verb: "limpar", tense: "Presente do Indicativo" },
  { verb: "mandar", tense: "Presente do Indicativo" },
  { verb: "mostrar", tense: "Presente do Indicativo" },
  { verb: "morar", tense: "Presente do Indicativo" },
  { verb: "nadar", tense: "Presente do Indicativo" },
  { verb: "nascer", tense: "Presente do Indicativo" },
  { verb: "observar", tense: "Presente do Indicativo" },
  { verb: "olhar", tense: "Presente do Indicativo" },
  { verb: "participar", tense: "Presente do Indicativo" },
  { verb: "partir", tense: "Presente do Indicativo" },
  { verb: "passar", tense: "Presente do Indicativo" },
  { verb: "pedalar", tense: "Presente do Indicativo" },
  { verb: "pensar", tense: "Presente do Indicativo" },
  { verb: "perguntar", tense: "Presente do Indicativo" },
  { verb: "permitir", tense: "Presente do Indicativo" },
  { verb: "pintar", tense: "Presente do Indicativo" },
  { verb: "plantar", tense: "Presente do Indicativo" },
  { verb: "praticar", tense: "Presente do Indicativo" },
  { verb: "preparar", tense: "Presente do Indicativo" },
  { verb: "procurar", tense: "Presente do Indicativo" },
  { verb: "prometer", tense: "Presente do Indicativo" },
  { verb: "receber", tense: "Presente do Indicativo" },
  { verb: "recordar", tense: "Presente do Indicativo" },
  { verb: "responder", tense: "Presente do Indicativo" },
  { verb: "retirar", tense: "Presente do Indicativo" },
  { verb: "revisar", tense: "Presente do Indicativo" },
  { verb: "saltar", tense: "Presente do Indicativo" },
  { verb: "sentar", tense: "Presente do Indicativo" },
  { verb: "separar", tense: "Presente do Indicativo" },
  { verb: "sonhar", tense: "Presente do Indicativo" },
  { verb: "subir", tense: "Presente do Indicativo" },
  { verb: "telefonar", tense: "Presente do Indicativo" },
  { verb: "terminar", tense: "Presente do Indicativo" },
  { verb: "tirar", tense: "Presente do Indicativo" },
  { verb: "tomar", tense: "Presente do Indicativo" },
  { verb: "trabalhar", tense: "Presente do Indicativo" },
  { verb: "usar", tense: "Presente do Indicativo" },
  { verb: "vender", tense: "Presente do Indicativo" },
  { verb: "viajar", tense: "Presente do Indicativo" },
  { verb: "visitar", tense: "Presente do Indicativo" },
  { verb: "voltar", tense: "Presente do Indicativo" },
  { verb: "falar", tense: "Presente do Indicativo" },

  { verb: "abandonar", tense: "Pretérito Perfeito" },
  { verb: "abraçar", tense: "Pretérito Perfeito" },
  { verb: "abrigar", tense: "Pretérito Perfeito" },
  { verb: "aceitar", tense: "Pretérito Perfeito" },
  { verb: "acompanhar", tense: "Pretérito Perfeito" },
  { verb: "aconselhar", tense: "Pretérito Perfeito" },
  { verb: "acordar", tense: "Pretérito Perfeito" },
  { verb: "acreditar", tense: "Pretérito Perfeito" },
  { verb: "adorar", tense: "Pretérito Perfeito" },
  { verb: "ajudar", tense: "Pretérito Perfeito" },
  { verb: "alugar", tense: "Pretérito Perfeito" },
  { verb: "amar", tense: "Pretérito Perfeito" },
  { verb: "andar", tense: "Pretérito Perfeito" },
  { verb: "anunciar", tense: "Pretérito Perfeito" },
  { verb: "apagar", tense: "Pretérito Perfeito" },
  { verb: "aprender", tense: "Pretérito Perfeito" },
  { verb: "apresentar", tense: "Pretérito Perfeito" },
  { verb: "arrumar", tense: "Pretérito Perfeito" },
  { verb: "atender", tense: "Pretérito Perfeito" },
  { verb: "atravessar", tense: "Pretérito Perfeito" },
  { verb: "beber", tense: "Pretérito Perfeito" },
  { verb: "brincar", tense: "Pretérito Perfeito" },
  { verb: "caminhar", tense: "Pretérito Perfeito" },
  { verb: "cantar", tense: "Pretérito Perfeito" },
  { verb: "carregar", tense: "Pretérito Perfeito" },
  { verb: "chegar", tense: "Pretérito Perfeito" },
  { verb: "cozinhar", tense: "Pretérito Perfeito" },
  { verb: "comprar", tense: "Pretérito Perfeito" },
  { verb: "concordar", tense: "Pretérito Perfeito" },
  { verb: "consertar", tense: "Pretérito Perfeito" },
  { verb: "conversar", tense: "Pretérito Perfeito" },
  { verb: "convidar", tense: "Pretérito Perfeito" },
  { verb: "correr", tense: "Pretérito Perfeito" },
  { verb: "cortar", tense: "Pretérito Perfeito" },
  { verb: "dançar", tense: "Pretérito Perfeito" },
  { verb: "decorar", tense: "Pretérito Perfeito" },
  { verb: "deixar", tense: "Pretérito Perfeito" },
  { verb: "descansar", tense: "Pretérito Perfeito" },
  { verb: "desenhar", tense: "Pretérito Perfeito" },
  { verb: "desligar", tense: "Pretérito Perfeito" },
  { verb: "dividir", tense: "Pretérito Perfeito" },
  { verb: "educar", tense: "Pretérito Perfeito" },
  { verb: "emprestar", tense: "Pretérito Perfeito" },
  { verb: "ensinar", tense: "Pretérito Perfeito" },
  { verb: "entrar", tense: "Pretérito Perfeito" },
  { verb: "escutar", tense: "Pretérito Perfeito" },
  { verb: "esperar", tense: "Pretérito Perfeito" },
  { verb: "estudar", tense: "Pretérito Perfeito" },
  { verb: "explicar", tense: "Pretérito Perfeito" },
  { verb: "fechar", tense: "Pretérito Perfeito" },
  { verb: "fumar", tense: "Pretérito Perfeito" },
  { verb: "ganhar", tense: "Pretérito Perfeito" },
  { verb: "gostar", tense: "Pretérito Perfeito" },
  { verb: "guardar", tense: "Pretérito Perfeito" },
  { verb: "imaginar", tense: "Pretérito Perfeito" },
  { verb: "jantar", tense: "Pretérito Perfeito" },
  { verb: "jogar", tense: "Pretérito Perfeito" },
  { verb: "lavar", tense: "Pretérito Perfeito" },
  { verb: "lembrar", tense: "Pretérito Perfeito" },
  { verb: "levantar", tense: "Pretérito Perfeito" },
  { verb: "ligar", tense: "Pretérito Perfeito" },
  { verb: "limpar", tense: "Pretérito Perfeito" },
  { verb: "mandar", tense: "Pretérito Perfeito" },
  { verb: "mostrar", tense: "Pretérito Perfeito" },
  { verb: "morar", tense: "Pretérito Perfeito" },
  { verb: "nadar", tense: "Pretérito Perfeito" },
  { verb: "nascer", tense: "Pretérito Perfeito" },
  { verb: "observar", tense: "Pretérito Perfeito" },
  { verb: "olhar", tense: "Pretérito Perfeito" },
  { verb: "participar", tense: "Pretérito Perfeito" },
  { verb: "partir", tense: "Pretérito Perfeito" },
  { verb: "passar", tense: "Pretérito Perfeito" },
  { verb: "pedalar", tense: "Pretérito Perfeito" },
  { verb: "pensar", tense: "Pretérito Perfeito" },
  { verb: "perguntar", tense: "Pretérito Perfeito" },
  { verb: "permitir", tense: "Pretérito Perfeito" },
  { verb: "pintar", tense: "Pretérito Perfeito" },
  { verb: "plantar", tense: "Pretérito Perfeito" },
  { verb: "praticar", tense: "Pretérito Perfeito" },
  { verb: "preparar", tense: "Pretérito Perfeito" },
  { verb: "procurar", tense: "Pretérito Perfeito" },
  { verb: "prometer", tense: "Pretérito Perfeito" },
  { verb: "receber", tense: "Pretérito Perfeito" },
  { verb: "recordar", tense: "Pretérito Perfeito" },
  { verb: "responder", tense: "Pretérito Perfeito" },
  { verb: "retirar", tense: "Pretérito Perfeito" },
  { verb: "revisar", tense: "Pretérito Perfeito" },
  { verb: "saltar", tense: "Pretérito Perfeito" },
  { verb: "sentar", tense: "Pretérito Perfeito" },
  { verb: "separar", tense: "Pretérito Perfeito" },
  { verb: "sonhar", tense: "Pretérito Perfeito" },
  { verb: "subir", tense: "Pretérito Perfeito" },
  { verb: "telefonar", tense: "Pretérito Perfeito" },
  { verb: "terminar", tense: "Pretérito Perfeito" },
  { verb: "tirar", tense: "Pretérito Perfeito" },
  { verb: "tomar", tense: "Pretérito Perfeito" },
  { verb: "trabalhar", tense: "Pretérito Perfeito" },
  { verb: "usar", tense: "Pretérito Perfeito" },
  { verb: "vender", tense: "Pretérito Perfeito" },
  { verb: "viajar", tense: "Pretérito Perfeito" },
  { verb: "visitar", tense: "Pretérito Perfeito" },
  { verb: "voltar", tense: "Pretérito Perfeito" },
  { verb: "falar", tense: "Pretérito Perfeito" },


  { verb: "abandonar", tense: "Pretérito Imperfeito" },
  { verb: "abraçar", tense: "Pretérito Imperfeito" },
  { verb: "abrigar", tense: "Pretérito Imperfeito" },
  { verb: "aceitar", tense: "Pretérito Imperfeito" },
  { verb: "acompanhar", tense: "Pretérito Imperfeito" },
  { verb: "aconselhar", tense: "Pretérito Imperfeito" },
  { verb: "acordar", tense: "Pretérito Imperfeito" },
  { verb: "acreditar", tense: "Pretérito Imperfeito" },
  { verb: "adorar", tense: "Pretérito Imperfeito" },
  { verb: "ajudar", tense: "Pretérito Imperfeito" },
  { verb: "alugar", tense: "Pretérito Imperfeito" },
  { verb: "amar", tense: "Pretérito Imperfeito" },
  { verb: "andar", tense: "Pretérito Imperfeito" },
  { verb: "anunciar", tense: "Pretérito Imperfeito" },
  { verb: "apagar", tense: "Pretérito Imperfeito" },
  { verb: "aprender", tense: "Pretérito Imperfeito" },
  { verb: "apresentar", tense: "Pretérito Imperfeito" },
  { verb: "arrumar", tense: "Pretérito Imperfeito" },
  { verb: "atender", tense: "Pretérito Imperfeito" },
  { verb: "atravessar", tense: "Pretérito Imperfeito" },
  { verb: "beber", tense: "Pretérito Imperfeito" },
  { verb: "brincar", tense: "Pretérito Imperfeito" },
  { verb: "caminhar", tense: "Pretérito Imperfeito" },
  { verb: "cantar", tense: "Pretérito Imperfeito" },
  { verb: "carregar", tense: "Pretérito Imperfeito" },
  { verb: "chegar", tense: "Pretérito Imperfeito" },
  { verb: "cozinhar", tense: "Pretérito Imperfeito" },
  { verb: "comprar", tense: "Pretérito Imperfeito" },
  { verb: "concordar", tense: "Pretérito Imperfeito" },
  { verb: "consertar", tense: "Pretérito Imperfeito" },
  { verb: "conversar", tense: "Pretérito Imperfeito" },
  { verb: "convidar", tense: "Pretérito Imperfeito" },
  { verb: "correr", tense: "Pretérito Imperfeito" },
  { verb: "cortar", tense: "Pretérito Imperfeito" },
  { verb: "dançar", tense: "Pretérito Imperfeito" },
  { verb: "decorar", tense: "Pretérito Imperfeito" },
  { verb: "deixar", tense: "Pretérito Imperfeito" },
  { verb: "descansar", tense: "Pretérito Imperfeito" },
  { verb: "desenhar", tense: "Pretérito Imperfeito" },
  { verb: "desligar", tense: "Pretérito Imperfeito" },
  { verb: "dividir", tense: "Pretérito Imperfeito" },
  { verb: "educar", tense: "Pretérito Imperfeito" },
  { verb: "emprestar", tense: "Pretérito Imperfeito" },
  { verb: "ensinar", tense: "Pretérito Imperfeito" },
  { verb: "entrar", tense: "Pretérito Imperfeito" },
  { verb: "escutar", tense: "Pretérito Imperfeito" },
  { verb: "esperar", tense: "Pretérito Imperfeito" },
  { verb: "estudar", tense: "Pretérito Imperfeito" },
  { verb: "explicar", tense: "Pretérito Imperfeito" },
  { verb: "fechar", tense: "Pretérito Imperfeito" },
  { verb: "fumar", tense: "Pretérito Imperfeito" },
  { verb: "ganhar", tense: "Pretérito Imperfeito" },
  { verb: "gostar", tense: "Pretérito Imperfeito" },
  { verb: "guardar", tense: "Pretérito Imperfeito" },
  { verb: "imaginar", tense: "Pretérito Imperfeito" },
  { verb: "jantar", tense: "Pretérito Imperfeito" },
  { verb: "jogar", tense: "Pretérito Imperfeito" },
  { verb: "lavar", tense: "Pretérito Imperfeito" },
  { verb: "lembrar", tense: "Pretérito Imperfeito" },
  { verb: "levantar", tense: "Pretérito Imperfeito" },
  { verb: "ligar", tense: "Pretérito Imperfeito" },
  { verb: "limpar", tense: "Pretérito Imperfeito" },
  { verb: "mandar", tense: "Pretérito Imperfeito" },
  { verb: "mostrar", tense: "Pretérito Imperfeito" },
  { verb: "morar", tense: "Pretérito Imperfeito" },
  { verb: "nadar", tense: "Pretérito Imperfeito" },
  { verb: "nascer", tense: "Pretérito Imperfeito" },
  { verb: "observar", tense: "Pretérito Imperfeito" },
  { verb: "olhar", tense: "Pretérito Imperfeito" },
  { verb: "participar", tense: "Pretérito Imperfeito" },
  { verb: "partir", tense: "Pretérito Imperfeito" },
  { verb: "passar", tense: "Pretérito Imperfeito" },
  { verb: "pedalar", tense: "Pretérito Imperfeito" },
  { verb: "pensar", tense: "Pretérito Imperfeito" },
  { verb: "perguntar", tense: "Pretérito Imperfeito" },
  { verb: "permitir", tense: "Pretérito Imperfeito" },
  { verb: "pintar", tense: "Pretérito Imperfeito" },
  { verb: "plantar", tense: "Pretérito Imperfeito" },
  { verb: "praticar", tense: "Pretérito Imperfeito" },
  { verb: "preparar", tense: "Pretérito Imperfeito" },
  { verb: "procurar", tense: "Pretérito Imperfeito" },
  { verb: "prometer", tense: "Pretérito Imperfeito" },
  { verb: "receber", tense: "Pretérito Imperfeito" },
  { verb: "recordar", tense: "Pretérito Imperfeito" },
  { verb: "responder", tense: "Pretérito Imperfeito" },
  { verb: "retirar", tense: "Pretérito Imperfeito" },
  { verb: "revisar", tense: "Pretérito Imperfeito" },
  { verb: "saltar", tense: "Pretérito Imperfeito" },
  { verb: "sentar", tense: "Pretérito Imperfeito" },
  { verb: "separar", tense: "Pretérito Imperfeito" },
  { verb: "sonhar", tense: "Pretérito Imperfeito" },
  { verb: "subir", tense: "Pretérito Imperfeito" },
  { verb: "telefonar", tense: "Pretérito Imperfeito" },
  { verb: "terminar", tense: "Pretérito Imperfeito" },
  { verb: "tirar", tense: "Pretérito Imperfeito" },
  { verb: "tomar", tense: "Pretérito Imperfeito" },
  { verb: "trabalhar", tense: "Pretérito Imperfeito" },
  { verb: "usar", tense: "Pretérito Imperfeito" },
  { verb: "vender", tense: "Pretérito Imperfeito" },
  { verb: "viajar", tense: "Pretérito Imperfeito" },
  { verb: "visitar", tense: "Pretérito Imperfeito" },
  { verb: "voltar", tense: "Pretérito Imperfeito" },
  { verb: "falar", tense: "Pretérito Imperfeito" },

  { verb: "cantar", tense: "Pretérito Mais-que-perfeito" },
  { verb: "vender", tense: "Pretérito Mais-que-perfeito" },
  { verb: "partir", tense: "Pretérito Mais-que-perfeito" },
  { verb: "falar", tense: "Pretérito Mais-que-perfeito" },

  { verb: "cantar", tense: "Futuro do Presente" },
  { verb: "vender", tense: "Futuro do Presente" },
  { verb: "partir", tense: "Futuro do Presente" },
  { verb: "falar", tense: "Futuro do Presente" },

  { verb: "cantar", tense: "Futuro do Pretérito" },
  { verb: "vender", tense: "Futuro do Pretérito" },
  { verb: "partir", tense: "Futuro do Pretérito" },
  { verb: "falar", tense: "Futuro do Pretérito" },

  { verb: "cantar", tense: "Futuro do Subjuntivo" },
  { verb: "vender", tense: "Futuro do Subjuntivo" },
  { verb: "partir", tense: "Futuro do Subjuntivo" },
  { verb: "falar", tense: "Futuro do Subjuntivo" },
];

const hardVerbs = [
  { verb: "pôr", tense: "Presente do Indicativo" },
  { verb: "vir", tense: "Presente do Indicativo" },
  { verb: "ver", tense: "Pretérito Perfeito" },
  { verb: "dispor", tense: "Pretérito Imperfeito" },
  { verb: "manter", tense: "Presente do Indicativo" },
  { verb: "intervir", tense: "Pretérito Perfeito" },
  { verb: "requerer", tense: "Presente do Indicativo" },
  { verb: "pôr", tense: "Pretérito Mais-que-perfeito" },
  { verb: "vir", tense: "Pretérito Mais-que-perfeito" },
  { verb: "ver", tense: "Pretérito Mais-que-perfeito" },

  { verb: "dizer", tense: "Futuro do Presente" },
  { verb: "fazer", tense: "Futuro do Presente" },
  { verb: "trazer", tense: "Futuro do Presente" },

  { verb: "dizer", tense: "Futuro do Pretérito" },
  { verb: "fazer", tense: "Futuro do Pretérito" },
  { verb: "trazer", tense: "Futuro do Pretérito" },

  { verb: "dizer", tense: "Futuro do Subjuntivo" },
  { verb: "fazer", tense: "Futuro do Subjuntivo" },
  { verb: "trazer", tense: "Futuro do Subjuntivo" },
  { verb: "vir", tense: "Futuro do Subjuntivo" },
  { verb: "pôr", tense: "Futuro do Subjuntivo" },
];

const persons = ["Eu", "Tu", "Ele/Ela", "Nós", "Vós", "Eles/Elas"];

// A small hardcoded mock table for immediate fallback
const mockTable: Record<string, Record<string, Record<string, string>>> = {
  "abandonar": {
    "Presente do Indicativo": { eu: "abandono", tu: "abandonas", ele: "abandona", nos: "abandonamos", vos: "abandonais", eles: "abandonam" },
    "Pretérito Perfeito": { eu: "abandonei", tu: "abandonaste", ele: "abandonou", nos: "abandonamos", vos: "abandonastes", eles: "abandonaram" },
    "Pretérito Imperfeito": { eu: "abandonava", tu: "abandonavas", ele: "abandonava", nos: "abandonávamos", vos: "abandonáveis", eles: "abandonavam" }
  },
  "abraçar": {
    "Presente do Indicativo": { eu: "abraço", tu: "abraças", ele: "abraça", nos: "abraçamos", vos: "abraçais", eles: "abraçam" },
    "Pretérito Perfeito": { eu: "abracei", tu: "abraçaste", ele: "abraçou", nos: "abraçamos", vos: "abraçastes", eles: "abraçaram" },
    "Pretérito Imperfeito": { eu: "abraçava", tu: "abraçavas", ele: "abraçava", nos: "abraçávamos", vos: "abraçáveis", eles: "abraçavam" }
  },
  "abrigar": {
    "Presente do Indicativo": { eu: "abrigo", tu: "abrigas", ele: "abriga", nos: "abrigamos", vos: "abrigais", eles: "abrigam" },
    "Pretérito Perfeito": { eu: "abriguei", tu: "abrigaste", ele: "abrigou", nos: "abrigamos", vos: "abrigastes", eles: "abrigaram" },
    "Pretérito Imperfeito": { eu: "abrigava", tu: "abrigavas", ele: "abrigava", nos: "abrigávamos", vos: "abrigáveis", eles: "abrigavam" }
  },
  "aceitar": {
    "Presente do Indicativo": { eu: "aceito", tu: "aceitas", ele: "aceita", nos: "aceitamos", vos: "aceitais", eles: "aceitam" },
    "Pretérito Perfeito": { eu: "aceitei", tu: "aceitaste", ele: "aceitou", nos: "aceitamos", vos: "aceitastes", eles: "aceitaram" },
    "Pretérito Imperfeito": { eu: "aceitava", tu: "aceitavas", ele: "aceitava", nos: "aceitávamos", vos: "aceitáveis", eles: "aceitavam" }
  },
  "acompanhar": {
    "Presente do Indicativo": { eu: "acompanho", tu: "acompanhas", ele: "acompanha", nos: "acompanhamos", vos: "acompanhais", eles: "acompanham" },
    "Pretérito Perfeito": { eu: "acompanhei", tu: "acompanhaste", ele: "acompanhou", nos: "acompanhamos", vos: "acompanhastes", eles: "acompanharam" },
    "Pretérito Imperfeito": { eu: "acompanhava", tu: "acompanhavas", ele: "acompanhava", nos: "acompanhávamos", vos: "acompanháveis", eles: "acompanhavam" }
  },
  "aconselhar": {
    "Presente do Indicativo": { eu: "aconselho", tu: "aconselhas", ele: "aconselha", nos: "aconselhamos", vos: "aconselhais", eles: "aconselham" },
    "Pretérito Perfeito": { eu: "aconselhei", tu: "aconselhaste", ele: "aconselhou", nos: "aconselhamos", vos: "aconselhastes", eles: "aconselharam" },
    "Pretérito Imperfeito": { eu: "aconselhava", tu: "aconselhavas", ele: "aconselhava", nos: "aconselhávamos", vos: "aconselháveis", eles: "aconselhavam" }
  },
  "acordar": {
    "Presente do Indicativo": { eu: "acordo", tu: "acordas", ele: "acorda", nos: "acordamos", vos: "acordais", eles: "acordam" },
    "Pretérito Perfeito": { eu: "acordei", tu: "acordaste", ele: "acordou", nos: "acordamos", vos: "acordastes", eles: "acordaram" },
    "Pretérito Imperfeito": { eu: "acordava", tu: "acordavas", ele: "acordava", nos: "acordávamos", vos: "acordáveis", eles: "acordavam" }
  },
  "acreditar": {
    "Presente do Indicativo": { eu: "acredito", tu: "acreditas", ele: "acredita", nos: "acreditamos", vos: "acreditais", eles: "acreditam" },
    "Pretérito Perfeito": { eu: "acreditei", tu: "acreditaste", ele: "acreditou", nos: "acreditamos", vos: "acreditastes", eles: "acreditaram" },
    "Pretérito Imperfeito": { eu: "acreditava", tu: "acreditavas", ele: "acreditava", nos: "acreditávamos", vos: "acreditáveis", eles: "acreditavam" }
  },
  "adorar": {
    "Presente do Indicativo": { eu: "adoro", tu: "adoras", ele: "adora", nos: "adoramos", vos: "adorais", eles: "adoram" },
    "Pretérito Perfeito": { eu: "adorei", tu: "adoraste", ele: "adorou", nos: "adoramos", vos: "adorastes", eles: "adoraram" },
    "Pretérito Imperfeito": { eu: "adorava", tu: "adoravas", ele: "adorava", nos: "adorávamos", vos: "adoráveis", eles: "adoravam" }
  },
  "ajudar": {
    "Presente do Indicativo": { eu: "ajudo", tu: "ajudas", ele: "ajuda", nos: "ajudamos", vos: "ajudais", eles: "ajudam" },
    "Pretérito Perfeito": { eu: "ajudei", tu: "ajudaste", ele: "ajudou", nos: "ajudamos", vos: "ajudastes", eles: "ajudaram" },
    "Pretérito Imperfeito": { eu: "ajudava", tu: "ajudavas", ele: "ajudava", nos: "ajudávamos", vos: "ajudáveis", eles: "ajudavam" }
  },
  "alugar": {
    "Presente do Indicativo": { eu: "alugo", tu: "alugas", ele: "aluga", nos: "alugamos", vos: "alugais", eles: "alugam" },
    "Pretérito Perfeito": { eu: "aluguei", tu: "alugaste", ele: "alugou", nos: "alugamos", vos: "alugastes", eles: "alugaram" },
    "Pretérito Imperfeito": { eu: "alugava", tu: "alugavas", ele: "alugava", nos: "alugávamos", vos: "alugáveis", eles: "alugavam" }
  },
  "amar": {
    "Presente do Indicativo": { eu: "amo", tu: "amas", ele: "ama", nos: "amamos", vos: "amais", eles: "amam" },
    "Pretérito Perfeito": { eu: "amei", tu: "amaste", ele: "amou", nos: "amamos", vos: "amastes", eles: "amaram" },
    "Pretérito Imperfeito": { eu: "amava", tu: "amavas", ele: "amava", nos: "amávamos", vos: "amáveis", eles: "amavam" }
  },
  "andar": {
    "Presente do Indicativo": { eu: "ando", tu: "andas", ele: "anda", nos: "andamos", vos: "andais", eles: "andam" },
    "Pretérito Perfeito": { eu: "andei", tu: "andaste", ele: "andou", nos: "andamos", vos: "andastes", eles: "andaram" },
    "Pretérito Imperfeito": { eu: "andava", tu: "andavas", ele: "andava", nos: "andávamos", vos: "andáveis", eles: "andavam" }
  },
  "anunciar": {
    "Presente do Indicativo": { eu: "anuncio", tu: "anuncias", ele: "anuncia", nos: "anunciamos", vos: "anunciais", eles: "anunciam" },
    "Pretérito Perfeito": { eu: "anunciei", tu: "anunciaste", ele: "anunciou", nos: "anunciamos", vos: "anunciastes", eles: "anunciaram" },
    "Pretérito Imperfeito": { eu: "anunciava", tu: "anunciavas", ele: "anunciava", nos: "anunciávamos", vos: "anunciáveis", eles: "anunciavam" }
  },
  "apagar": {
    "Presente do Indicativo": { eu: "apago", tu: "apagas", ele: "apaga", nos: "apagamos", vos: "apagais", eles: "apagam" },
    "Pretérito Perfeito": { eu: "apaguei", tu: "apagaste", ele: "apagou", nos: "apagamos", vos: "apagastes", eles: "apagaram" },
    "Pretérito Imperfeito": { eu: "apagava", tu: "apagavas", ele: "apagava", nos: "apagávamos", vos: "apagáveis", eles: "apagavam" }
  },
  "aprender": {
    "Presente do Indicativo": { eu: "aprendo", tu: "aprendes", ele: "aprende", nos: "aprendemos", vos: "aprendeis", eles: "aprendem" },
    "Pretérito Perfeito": { eu: "aprendi", tu: "aprendeste", ele: "aprendeu", nos: "aprendemos", vos: "aprendestes", eles: "aprenderam" },
    "Pretérito Imperfeito": { eu: "aprendia", tu: "aprendias", ele: "aprendia", nos: "aprendíamos", vos: "aprendíeis", eles: "aprendiam" }
  },
  "apresentar": {
    "Presente do Indicativo": { eu: "apresento", tu: "apresentas", ele: "apresenta", nos: "apresentamos", vos: "apresentais", eles: "apresentam" },
    "Pretérito Perfeito": { eu: "apresentei", tu: "apresentaste", ele: "apresentou", nos: "apresentamos", vos: "apresentastes", eles: "apresentaram" },
    "Pretérito Imperfeito": { eu: "apresentava", tu: "apresentavas", ele: "apresentava", nos: "apresentávamos", vos: "apresentáveis", eles: "apresentavam" }
  },
  "arrumar": {
    "Presente do Indicativo": { eu: "arrumo", tu: "arrumas", ele: "arruma", nos: "arrumamos", vos: "arrumais", eles: "arrumam" },
    "Pretérito Perfeito": { eu: "arrumei", tu: "arrumaste", ele: "arrumou", nos: "arrumamos", vos: "arrumastes", eles: "arrumaram" },
    "Pretérito Imperfeito": { eu: "arrumava", tu: "arrumavas", ele: "arrumava", nos: "arrumávamos", vos: "arrumáveis", eles: "arrumavam" }
  },
  "atender": {
    "Presente do Indicativo": { eu: "atendo", tu: "atendes", ele: "atende", nos: "atendemos", vos: "atendeis", eles: "atendem" },
    "Pretérito Perfeito": { eu: "atendi", tu: "atendeste", ele: "atendeu", nos: "atendemos", vos: "atendestes", eles: "atenderam" },
    "Pretérito Imperfeito": { eu: "atendia", tu: "atendias", ele: "atendia", nos: "atendíamos", vos: "atendíeis", eles: "atendiam" }
  },
  "atravessar": {
    "Presente do Indicativo": { eu: "atravesso", tu: "atravessas", ele: "atravessa", nos: "atravessamos", vos: "atravessais", eles: "atravessam" },
    "Pretérito Perfeito": { eu: "atravessei", tu: "atravessaste", ele: "atravessou", nos: "atravessamos", vos: "atravessastes", eles: "atravessaram" },
    "Pretérito Imperfeito": { eu: "atravessava", tu: "atravessavas", ele: "atravessava", nos: "atravessávamos", vos: "atravessáveis", eles: "atravessavam" }
  },
  "beber": {
    "Presente do Indicativo": { eu: "bebo", tu: "bebes", ele: "bebe", nos: "bebemos", vos: "bebeis", eles: "bebem" },
    "Pretérito Perfeito": { eu: "bebi", tu: "bebeste", ele: "bebeu", nos: "bebemos", vos: "bebestes", eles: "beberam" },
    "Pretérito Imperfeito": { eu: "bebia", tu: "bebias", ele: "bebia", nos: "bebíamos", vos: "bebíeis", eles: "bebiam" }
  },
  "brincar": {
    "Presente do Indicativo": { eu: "brinco", tu: "brincas", ele: "brinca", nos: "brincamos", vos: "brincais", eles: "brincam" },
    "Pretérito Perfeito": { eu: "brinquei", tu: "brincaste", ele: "brincou", nos: "brincamos", vos: "brincastes", eles: "brincaram" },
    "Pretérito Imperfeito": { eu: "brincava", tu: "brincavas", ele: "brincava", nos: "brincávamos", vos: "brincáveis", eles: "brincavam" }
  },
  "caminhar": {
    "Presente do Indicativo": { eu: "caminho", tu: "caminhas", ele: "caminha", nos: "caminhamos", vos: "caminhais", eles: "caminham" },
    "Pretérito Perfeito": { eu: "caminhei", tu: "caminhaste", ele: "caminhou", nos: "caminhamos", vos: "caminhastes", eles: "caminharam" },
    "Pretérito Imperfeito": { eu: "caminhava", tu: "caminhavas", ele: "caminhava", nos: "caminhávamos", vos: "caminháveis", eles: "caminhavam" }
  },
  "cantar": {
    "Presente do Indicativo": { eu: "canto", tu: "cantas", ele: "canta", nos: "cantamos", vos: "cantais", eles: "cantam" },
    "Pretérito Perfeito": { eu: "cantei", tu: "cantaste", ele: "cantou", nos: "cantamos", vos: "cantastes", eles: "cantaram" },
    "Pretérito Imperfeito": { eu: "cantava", tu: "cantavas", ele: "cantava", nos: "cantávamos", vos: "cantáveis", eles: "cantavam" },
    "Pretérito Mais-que-perfeito": { eu: "cantara", tu: "cantaras", ele: "cantara", nos: "cantáramos", vos: "cantáreis", eles: "cantaram" },
    "Futuro do Presente": { eu: "cantarei", tu: "cantarás", ele: "cantará", nos: "cantaremos", vos: "cantareis", eles: "cantarão" },
    "Futuro do Pretérito": { eu: "cantaria", tu: "cantarias", ele: "cantaria", nos: "cantaríamos", vos: "cantaríeis", eles: "cantariam" },
    "Futuro do Subjuntivo": { eu: "cantar", tu: "cantares", ele: "cantar", nos: "cantarmos", vos: "cantardes", eles: "cantarem" }
  },
  "carregar": {
    "Presente do Indicativo": { eu: "carrego", tu: "carregas", ele: "carrega", nos: "carregamos", vos: "carregais", eles: "carregam" },
    "Pretérito Perfeito": { eu: "carreguei", tu: "carregaste", ele: "carregou", nos: "carregamos", vos: "carregastes", eles: "carregaram" },
    "Pretérito Imperfeito": { eu: "carregava", tu: "carregavas", ele: "carregava", nos: "carregávamos", vos: "carregáveis", eles: "carregavam" }
  },
  "chegar": {
    "Presente do Indicativo": { eu: "chego", tu: "chegas", ele: "chega", nos: "chegamos", vos: "chegais", eles: "chegam" },
    "Pretérito Perfeito": { eu: "cheguei", tu: "chegaste", ele: "chegou", nos: "chegamos", vos: "chegastes", eles: "chegaram" },
    "Pretérito Imperfeito": { eu: "chegava", tu: "chegavas", ele: "chegava", nos: "chegávamos", vos: "chegáveis", eles: "chegavam" }
  },
  "cozinhar": {
    "Presente do Indicativo": { eu: "cozinho", tu: "cozinhas", ele: "cozinha", nos: "cozinhamos", vos: "cozinhais", eles: "cozinham" },
    "Pretérito Perfeito": { eu: "cozinhei", tu: "cozinhaste", ele: "cozinhou", nos: "cozinhamos", vos: "cozinhastes", eles: "cozinharam" },
    "Pretérito Imperfeito": { eu: "cozinhava", tu: "cozinhavas", ele: "cozinhava", nos: "cozinhávamos", vos: "cozinháveis", eles: "cozinhavam" }
  },
  "comprar": {
    "Presente do Indicativo": { eu: "compro", tu: "compras", ele: "compra", nos: "compramos", vos: "comprais", eles: "compram" },
    "Pretérito Perfeito": { eu: "comprei", tu: "compraste", ele: "comprou", nos: "compramos", vos: "comprastes", eles: "compraram" },
    "Pretérito Imperfeito": { eu: "comprava", tu: "compravas", ele: "comprava", nos: "comprávamos", vos: "compráveis", eles: "compravam" }
  },
  "concordar": {
    "Presente do Indicativo": { eu: "concordo", tu: "concordas", ele: "concorda", nos: "concordamos", vos: "concordais", eles: "concordam" },
    "Pretérito Perfeito": { eu: "concordei", tu: "concordaste", ele: "concordou", nos: "concordamos", vos: "concordastes", eles: "concordaram" },
    "Pretérito Imperfeito": { eu: "concordava", tu: "concordavas", ele: "concordava", nos: "concordávamos", vos: "concordáveis", eles: "concordavam" }
  },
  "consertar": {
    "Presente do Indicativo": { eu: "conserto", tu: "consertas", ele: "conserta", nos: "consertamos", vos: "consertais", eles: "consertam" },
    "Pretérito Perfeito": { eu: "consertei", tu: "consertaste", ele: "consertou", nos: "consertamos", vos: "consertastes", eles: "consertaram" },
    "Pretérito Imperfeito": { eu: "consertava", tu: "consertavas", ele: "consertava", nos: "consertávamos", vos: "consertáveis", eles: "consertavam" }
  },
  "conversar": {
    "Presente do Indicativo": { eu: "converso", tu: "conversas", ele: "conversa", nos: "conversamos", vos: "conversais", eles: "conversam" },
    "Pretérito Perfeito": { eu: "conversei", tu: "conversaste", ele: "conversou", nos: "conversamos", vos: "conversastes", eles: "conversaram" },
    "Pretérito Imperfeito": { eu: "conversava", tu: "conversavas", ele: "conversava", nos: "conversávamos", vos: "conversáveis", eles: "conversavam" }
  },
  "convidar": {
    "Presente do Indicativo": { eu: "convido", tu: "convidas", ele: "convida", nos: "convidamos", vos: "convidais", eles: "convidam" },
    "Pretérito Perfeito": { eu: "convidei", tu: "convidaste", ele: "convidou", nos: "convidamos", vos: "convidastes", eles: "convidaram" },
    "Pretérito Imperfeito": { eu: "convidava", tu: "convidavas", ele: "convidava", nos: "convidávamos", vos: "convidáveis", eles: "convidavam" }
  },
  "correr": {
    "Presente do Indicativo": { eu: "corro", tu: "corres", ele: "corre", nos: "corremos", vos: "correis", eles: "correm" },
    "Pretérito Perfeito": { eu: "corri", tu: "correste", ele: "correu", nos: "corremos", vos: "correstes", eles: "correram" },
    "Pretérito Imperfeito": { eu: "corria", tu: "corrias", ele: "corria", nos: "corríamos", vos: "corríeis", eles: "corriam" }
  },
  "cortar": {
    "Presente do Indicativo": { eu: "corto", tu: "cortas", ele: "corta", nos: "cortamos", vos: "cortais", eles: "cortam" },
    "Pretérito Perfeito": { eu: "cortei", tu: "cortaste", ele: "cortou", nos: "cortamos", vos: "cortastes", eles: "cortaram" },
    "Pretérito Imperfeito": { eu: "cortava", tu: "cortavas", ele: "cortava", nos: "cortávamos", vos: "cortáveis", eles: "cortavam" }
  },
  "dançar": {
    "Presente do Indicativo": { eu: "danço", tu: "danças", ele: "dança", nos: "dançamos", vos: "dançais", eles: "dançam" },
    "Pretérito Perfeito": { eu: "dancei", tu: "dançaste", ele: "dançou", nos: "dançamos", vos: "dançastes", eles: "dançaram" },
    "Pretérito Imperfeito": { eu: "dançava", tu: "dançavas", ele: "dançava", nos: "dançávamos", vos: "dançáveis", eles: "dançavam" }
  },
  "decorar": {
    "Presente do Indicativo": { eu: "decoro", tu: "decoras", ele: "decora", nos: "decoramos", vos: "decorais", eles: "decoram" },
    "Pretérito Perfeito": { eu: "decorei", tu: "decoraste", ele: "decorou", nos: "decoramos", vos: "decorastes", eles: "decoraram" },
    "Pretérito Imperfeito": { eu: "decorava", tu: "decoravas", ele: "decorava", nos: "decorávamos", vos: "decoráveis", eles: "decoravam" }
  },
  "deixar": {
    "Presente do Indicativo": { eu: "deixo", tu: "deixas", ele: "deixa", nos: "deixamos", vos: "deixais", eles: "deixam" },
    "Pretérito Perfeito": { eu: "deixei", tu: "deixaste", ele: "deixou", nos: "deixamos", vos: "deixastes", eles: "deixaram" },
    "Pretérito Imperfeito": { eu: "deixava", tu: "deixavas", ele: "deixava", nos: "deixávamos", vos: "deixáveis", eles: "deixavam" }
  },
  "descansar": {
    "Presente do Indicativo": { eu: "descanso", tu: "descansas", ele: "descansa", nos: "descansamos", vos: "descansais", eles: "descansam" },
    "Pretérito Perfeito": { eu: "descansei", tu: "descansaste", ele: "descansou", nos: "descansamos", vos: "descansastes", eles: "descansaram" },
    "Pretérito Imperfeito": { eu: "descansava", tu: "descansavas", ele: "descansava", nos: "descansávamos", vos: "descansáveis", eles: "descansavam" }
  },
  "desenhar": {
    "Presente do Indicativo": { eu: "desenho", tu: "desenhas", ele: "desenha", nos: "desenhamos", vos: "desenhais", eles: "desenham" },
    "Pretérito Perfeito": { eu: "desenhei", tu: "desenhaste", ele: "desenhou", nos: "desenhamos", vos: "desenhastes", eles: "desenharam" },
    "Pretérito Imperfeito": { eu: "desenhava", tu: "desenhavas", ele: "desenhava", nos: "desenhávamos", vos: "desenháveis", eles: "desenhavam" }
  },
  "desligar": {
    "Presente do Indicativo": { eu: "desligo", tu: "desligas", ele: "desliga", nos: "desligamos", vos: "desligais", eles: "desligam" },
    "Pretérito Perfeito": { eu: "desliguei", tu: "desligaste", ele: "desligou", nos: "desligamos", vos: "desligastes", eles: "desligaram" },
    "Pretérito Imperfeito": { eu: "desligava", tu: "desligavas", ele: "desligava", nos: "desligávamos", vos: "desligáveis", eles: "desligavam" }
  },
  "dividir": {
    "Presente do Indicativo": { eu: "divido", tu: "divides", ele: "divide", nos: "dividimos", vos: "dividis", eles: "dividem" },
    "Pretérito Perfeito": { eu: "dividi", tu: "dividiste", ele: "dividiu", nos: "dividimos", vos: "dividistes", eles: "dividiram" },
    "Pretérito Imperfeito": { eu: "dividia", tu: "dividias", ele: "dividia", nos: "dividíamos", vos: "dividíeis", eles: "dividiam" }
  },
  "educar": {
    "Presente do Indicativo": { eu: "educo", tu: "educas", ele: "educa", nos: "educamos", vos: "educais", eles: "educam" },
    "Pretérito Perfeito": { eu: "eduquei", tu: "educaste", ele: "educou", nos: "educamos", vos: "educastes", eles: "educaram" },
    "Pretérito Imperfeito": { eu: "educava", tu: "educavas", ele: "educava", nos: "educávamos", vos: "educáveis", eles: "educavam" }
  },
  "emprestar": {
    "Presente do Indicativo": { eu: "empresto", tu: "emprestas", ele: "empresta", nos: "emprestamos", vos: "emprestais", eles: "emprestam" },
    "Pretérito Perfeito": { eu: "emprestei", tu: "emprestaste", ele: "emprestou", nos: "emprestamos", vos: "emprestastes", eles: "emprestaram" },
    "Pretérito Imperfeito": { eu: "emprestava", tu: "emprestavas", ele: "emprestava", nos: "emprestávamos", vos: "emprestáveis", eles: "emprestavam" }
  },
  "ensinar": {
    "Presente do Indicativo": { eu: "ensino", tu: "ensinas", ele: "ensina", nos: "ensinamos", vos: "ensinais", eles: "ensinam" },
    "Pretérito Perfeito": { eu: "ensinei", tu: "ensinaste", ele: "ensinou", nos: "ensinamos", vos: "ensinastes", eles: "ensinaram" },
    "Pretérito Imperfeito": { eu: "ensinava", tu: "ensinavas", ele: "ensinava", nos: "ensinávamos", vos: "ensináveis", eles: "ensinavam" }
  },
  "entrar": {
    "Presente do Indicativo": { eu: "entro", tu: "entras", ele: "entra", nos: "entramos", vos: "entrais", eles: "entram" },
    "Pretérito Perfeito": { eu: "entrei", tu: "entraste", ele: "entrou", nos: "entramos", vos: "entrastes", eles: "entraram" },
    "Pretérito Imperfeito": { eu: "entrava", tu: "entravas", ele: "entrava", nos: "entrávamos", vos: "entráveis", eles: "entravam" }
  },
  "escutar": {
    "Presente do Indicativo": { eu: "escuto", tu: "escutas", ele: "escuta", nos: "escutamos", vos: "escutais", eles: "escutam" },
    "Pretérito Perfeito": { eu: "escutei", tu: "escutaste", ele: "escutou", nos: "escutamos", vos: "escutastes", eles: "escutaram" },
    "Pretérito Imperfeito": { eu: "escutava", tu: "escutavas", ele: "escutava", nos: "escutávamos", vos: "escutáveis", eles: "escutavam" }
  },
  "esperar": {
    "Presente do Indicativo": { eu: "espero", tu: "esperas", ele: "espera", nos: "esperamos", vos: "esperais", eles: "esperam" },
    "Pretérito Perfeito": { eu: "esperei", tu: "esperaste", ele: "esperou", nos: "esperamos", vos: "esperastes", eles: "esperaram" },
    "Pretérito Imperfeito": { eu: "esperava", tu: "esperavas", ele: "esperava", nos: "esperávamos", vos: "esperáveis", eles: "esperavam" }
  },
  "estudar": {
    "Presente do Indicativo": { eu: "estudo", tu: "estudas", ele: "estuda", nos: "estudamos", vos: "estudais", eles: "estudam" },
    "Pretérito Perfeito": { eu: "estudei", tu: "estudaste", ele: "estudou", nos: "estudamos", vos: "estudastes", eles: "estudaram" },
    "Pretérito Imperfeito": { eu: "estudava", tu: "estudavas", ele: "estudava", nos: "estudávamos", vos: "estudáveis", eles: "estudavam" }
  },
  "explicar": {
    "Presente do Indicativo": { eu: "explico", tu: "explicas", ele: "explica", nos: "explicamos", vos: "explicais", eles: "explicam" },
    "Pretérito Perfeito": { eu: "expliquei", tu: "explicaste", ele: "explicou", nos: "explicamos", vos: "explicastes", eles: "explicaram" },
    "Pretérito Imperfeito": { eu: "explicava", tu: "explicavas", ele: "explicava", nos: "explicávamos", vos: "explicáveis", eles: "explicavam" }
  },
  "fechar": {
    "Presente do Indicativo": { eu: "fecho", tu: "fechas", ele: "fecha", nos: "fechamos", vos: "fechais", eles: "fecham" },
    "Pretérito Perfeito": { eu: "fechei", tu: "fechaste", ele: "fechou", nos: "fechamos", vos: "fechastes", eles: "fecharam" },
    "Pretérito Imperfeito": { eu: "fechava", tu: "fechavas", ele: "fechava", nos: "fechávamos", vos: "fecháveis", eles: "fechavam" }
  },
  "fumar": {
    "Presente do Indicativo": { eu: "fumo", tu: "fumas", ele: "fuma", nos: "fumamos", vos: "fumais", eles: "fumam" },
    "Pretérito Perfeito": { eu: "fumei", tu: "fumaste", ele: "fumou", nos: "fumamos", vos: "fumastes", eles: "fumaram" },
    "Pretérito Imperfeito": { eu: "fumava", tu: "fumavas", ele: "fumava", nos: "fumávamos", vos: "fumáveis", eles: "fumavam" }
  },
  "ganhar": {
    "Presente do Indicativo": { eu: "ganho", tu: "ganhas", ele: "ganha", nos: "ganhamos", vos: "ganhais", eles: "ganham" },
    "Pretérito Perfeito": { eu: "ganhei", tu: "ganhaste", ele: "ganhou", nos: "ganhamos", vos: "ganhastes", eles: "ganharam" },
    "Pretérito Imperfeito": { eu: "ganhava", tu: "ganhavas", ele: "ganhava", nos: "ganhávamos", vos: "ganháveis", eles: "ganhavam" }
  },
  "gostar": {
    "Presente do Indicativo": { eu: "gosto", tu: "gostas", ele: "gosta", nos: "gostamos", vos: "gostais", eles: "gostam" },
    "Pretérito Perfeito": { eu: "gostei", tu: "gostaste", ele: "gostou", nos: "gostamos", vos: "gostastes", eles: "gostaram" },
    "Pretérito Imperfeito": { eu: "gostava", tu: "gostavas", ele: "gostava", nos: "gostávamos", vos: "gostáveis", eles: "gostavam" }
  },
  "guardar": {
    "Presente do Indicativo": { eu: "guardo", tu: "guardas", ele: "guarda", nos: "guardamos", vos: "guardais", eles: "guardam" },
    "Pretérito Perfeito": { eu: "guardei", tu: "guardaste", ele: "guardou", nos: "guardamos", vos: "guardastes", eles: "guardaram" },
    "Pretérito Imperfeito": { eu: "guardava", tu: "guardavas", ele: "guardava", nos: "guardávamos", vos: "guardáveis", eles: "guardavam" }
  },
  "imaginar": {
    "Presente do Indicativo": { eu: "imagino", tu: "imaginas", ele: "imagina", nos: "imaginamos", vos: "imaginais", eles: "imaginam" },
    "Pretérito Perfeito": { eu: "imaginei", tu: "imaginaste", ele: "imaginou", nos: "imaginamos", vos: "imaginastes", eles: "imaginaram" },
    "Pretérito Imperfeito": { eu: "imaginava", tu: "imaginavas", ele: "imaginava", nos: "imaginávamos", vos: "imagináveis", eles: "imaginavam" }
  },
  "jantar": {
    "Presente do Indicativo": { eu: "janto", tu: "jantas", ele: "janta", nos: "jantamos", vos: "jantais", eles: "jantam" },
    "Pretérito Perfeito": { eu: "jantei", tu: "jantaste", ele: "jantou", nos: "jantamos", vos: "jantastes", eles: "jantaram" },
    "Pretérito Imperfeito": { eu: "jantava", tu: "jantavas", ele: "jantava", nos: "jantávamos", vos: "jantáveis", eles: "jantavam" }
  },
  "jogar": {
    "Presente do Indicativo": { eu: "jogo", tu: "jogas", ele: "joga", nos: "jogamos", vos: "jogais", eles: "jogam" },
    "Pretérito Perfeito": { eu: "joguei", tu: "jogaste", ele: "jogou", nos: "jogamos", vos: "jogastes", eles: "jogaram" },
    "Pretérito Imperfeito": { eu: "jogava", tu: "jogavas", ele: "jogava", nos: "jogávamos", vos: "jogáveis", eles: "jogavam" }
  },
  "lavar": {
    "Presente do Indicativo": { eu: "lavo", tu: "lavas", ele: "lava", nos: "lavamos", vos: "lavais", eles: "lavam" },
    "Pretérito Perfeito": { eu: "lavei", tu: "lavaste", ele: "lavou", nos: "lavamos", vos: "lavastes", eles: "lavaram" },
    "Pretérito Imperfeito": { eu: "lavava", tu: "lavavas", ele: "lavava", nos: "lavávamos", vos: "laváveis", eles: "lavavam" }
  },
  "lembrar": {
    "Presente do Indicativo": { eu: "lembro", tu: "lembras", ele: "lembra", nos: "lembramos", vos: "lembrais", eles: "lembram" },
    "Pretérito Perfeito": { eu: "lembrei", tu: "lembraste", ele: "lembrou", nos: "lembramos", vos: "lembrastes", eles: "lembraram" },
    "Pretérito Imperfeito": { eu: "lembrava", tu: "lembravas", ele: "lembrava", nos: "lembrávamos", vos: "lembráveis", eles: "lembravam" }
  },
  "levantar": {
    "Presente do Indicativo": { eu: "levanto", tu: "levantas", ele: "levanta", nos: "levantamos", vos: "levantais", eles: "levantam" },
    "Pretérito Perfeito": { eu: "levantei", tu: "levantaste", ele: "levantou", nos: "levantamos", vos: "levantastes", eles: "levantaram" },
    "Pretérito Imperfeito": { eu: "levantava", tu: "levantavas", ele: "levantava", nos: "levantávamos", vos: "levantáveis", eles: "levantavam" }
  },
  "ligar": {
    "Presente do Indicativo": { eu: "ligo", tu: "ligas", ele: "liga", nos: "ligamos", vos: "ligais", eles: "ligam" },
    "Pretérito Perfeito": { eu: "liguei", tu: "ligaste", ele: "ligou", nos: "ligamos", vos: "ligastes", eles: "ligaram" },
    "Pretérito Imperfeito": { eu: "ligava", tu: "ligavas", ele: "ligava", nos: "ligávamos", vos: "ligáveis", eles: "ligavam" }
  },
  "limpar": {
    "Presente do Indicativo": { eu: "limpo", tu: "limpas", ele: "limpa", nos: "limpamos", vos: "limpais", eles: "limpam" },
    "Pretérito Perfeito": { eu: "limpei", tu: "limpaste", ele: "limpou", nos: "limpamos", vos: "limpastes", eles: "limparam" },
    "Pretérito Imperfeito": { eu: "limpava", tu: "limpavas", ele: "limpava", nos: "limpávamos", vos: "limbáveis", eles: "limpavam" }
  },
  "mandar": {
    "Presente do Indicativo": { eu: "mando", tu: "mandas", ele: "manda", nos: "mandamos", vos: "mandais", eles: "mandam" },
    "Pretérito Perfeito": { eu: "mandei", tu: "mandaste", ele: "mandou", nos: "mandamos", vos: "mandastes", eles: "mandaram" },
    "Pretérito Imperfeito": { eu: "mandava", tu: "mandavas", ele: "mandava", nos: "mandávamos", vos: "mandáveis", eles: "mandavam" }
  },
  "mostrar": {
    "Presente do Indicativo": { eu: "mostro", tu: "mostras", ele: "mostra", nos: "mostramos", vos: "mostrais", eles: "mostram" },
    "Pretérito Perfeito": { eu: "mostrei", tu: "mostraste", ele: "mostrou", nos: "mostramos", vos: "mostrastes", eles: "mostraram" },
    "Pretérito Imperfeito": { eu: "mostrava", tu: "mostravas", ele: "mostrava", nos: "mostrávamos", vos: "mostráveis", eles: "mostravam" }
  },
  "morar": {
    "Presente do Indicativo": { eu: "moro", tu: "moras", ele: "mora", nos: "moramos", vos: "morais", eles: "moram" },
    "Pretérito Perfeito": { eu: "morei", tu: "moraste", ele: "morou", nos: "moramos", vos: "morastes", eles: "moraram" },
    "Pretérito Imperfeito": { eu: "morava", tu: "moravas", ele: "morava", nos: "morávamos", vos: "moráveis", eles: "moravam" }
  },
  "nadar": {
    "Presente do Indicativo": { eu: "nado", tu: "nadas", ele: "nada", nos: "nadamos", vos: "nadais", eles: "nadam" },
    "Pretérito Perfeito": { eu: "nadei", tu: "nadaste", ele: "nadou", nos: "nadamos", vos: "nadastes", eles: "nadaram" },
    "Pretérito Imperfeito": { eu: "nadava", tu: "nadavas", ele: "nadava", nos: "nadávamos", vos: "nadáveis", eles: "nadavam" }
  },
  "nascer": {
    "Presente do Indicativo": { eu: "nasço", tu: "nasces", ele: "nasce", nos: "nascemos", vos: "nasceis", eles: "nascem" },
    "Pretérito Perfeito": { eu: "nasci", tu: "nasceste", ele: "nasceu", nos: "nascemos", vos: "nascestes", eles: "nasceram" },
    "Pretérito Imperfeito": { eu: "nascia", tu: "nascias", ele: "nascia", nos: "nascíamos", vos: "nascíeis", eles: "nasciam" }
  },
  "observar": {
    "Presente do Indicativo": { eu: "observo", tu: "observas", ele: "observa", nos: "observamos", vos: "observais", eles: "observam" },
    "Pretérito Perfeito": { eu: "observei", tu: "observaste", ele: "observou", nos: "observamos", vos: "observastes", eles: "observaram" },
    "Pretérito Imperfeito": { eu: "observava", tu: "observavas", ele: "observava", nos: "observávamos", vos: "observáveis", eles: "observavam" }
  },
  "olhar": {
    "Presente do Indicativo": { eu: "olho", tu: "olhas", ele: "olha", nos: "olhamos", vos: "olhais", eles: "olham" },
    "Pretérito Perfeito": { eu: "olhei", tu: "olhaste", ele: "olhou", nos: "olhamos", vos: "olhastes", eles: "olharam" },
    "Pretérito Imperfeito": { eu: "olhava", tu: "olhavas", ele: "olhava", nos: "olhávamos", vos: "olháveis", eles: "olhavam" }
  },
  "participar": {
    "Presente do Indicativo": { eu: "participo", tu: "participas", ele: "participa", nos: "participamos", vos: "participais", eles: "participam" },
    "Pretérito Perfeito": { eu: "participei", tu: "participaste", ele: "participou", nos: "participamos", vos: "participastes", eles: "participaram" },
    "Pretérito Imperfeito": { eu: "participava", tu: "participavas", ele: "participava", nos: "participávamos", vos: "participáveis", eles: "participavam" }
  },
  "partir": {
    "Presente do Indicativo": { eu: "parto", tu: "partes", ele: "parte", nos: "partimos", vos: "partis", eles: "partem" },
    "Pretérito Perfeito": { eu: "parti", tu: "partiste", ele: "partiu", nos: "partimos", vos: "partistes", eles: "partiram" },
    "Pretérito Imperfeito": { eu: "partia", tu: "partias", ele: "partia", nos: "partíamos", vos: "partíeis", eles: "partiam" },
    "Pretérito Mais-que-perfeito": { eu: "partira", tu: "partiras", ele: "partira", nos: "partíramos", vos: "partíreis", eles: "partiram" },
    "Futuro do Presente": { eu: "partirei", tu: "partirás", ele: "partirá", nos: "partiremos", vos: "partireis", eles: "partirão" },
    "Futuro do Pretérito": { eu: "partiria", tu: "partirias", ele: "partiria", nos: "partiríamos", vos: "partiríeis", eles: "partiriam" },
    "Futuro do Subjuntivo": { eu: "partir", tu: "partires", ele: "partir", nos: "partirmos", vos: "partirdes", eles: "partirem" }
  },
  "passar": {
    "Presente do Indicativo": { eu: "passo", tu: "passas", ele: "passa", nos: "passamos", vos: "passais", eles: "passam" },
    "Pretérito Perfeito": { eu: "passei", tu: "passaste", ele: "passou", nos: "passamos", vos: "passastes", eles: "passaram" },
    "Pretérito Imperfeito": { eu: "passava", tu: "passavas", ele: "passava", nos: "passávamos", vos: "passáveis", eles: "passavam" }
  },
  "pedalar": {
    "Presente do Indicativo": { eu: "pedalo", tu: "pedalas", ele: "pedala", nos: "pedalamos", vos: "pedalais", eles: "pedalam" },
    "Pretérito Perfeito": { eu: "pedalei", tu: "pedalaste", ele: "pedalou", nos: "pedalamos", vos: "pedalastes", eles: "pedalaram" },
    "Pretérito Imperfeito": { eu: "pedalava", tu: "pedalavas", ele: "pedalava", nos: "pedalávamos", vos: "pedaláveis", eles: "pedalavam" }
  },
  "pensar": {
    "Presente do Indicativo": { eu: "penso", tu: "pensas", ele: "pensa", nos: "pensamos", vos: "pensais", eles: "pensam" },
    "Pretérito Perfeito": { eu: "pensei", tu: "pensaste", ele: "pensou", nos: "pensamos", vos: "pensastes", eles: "pensaram" },
    "Pretérito Imperfeito": { eu: "pensava", tu: "pensavas", ele: "pensava", nos: "pensávamos", vos: "pensáveis", eles: "pensavam" }
  },
  "perguntar": {
    "Presente do Indicativo": { eu: "pergunto", tu: "perguntas", ele: "pergunta", nos: "perguntamos", vos: "perguntais", eles: "perguntam" },
    "Pretérito Perfeito": { eu: "perguntei", tu: "perguntaste", ele: "perguntou", nos: "perguntamos", vos: "perguntastes", eles: "perguntaram" },
    "Pretérito Imperfeito": { eu: "perguntava", tu: "perguntavas", ele: "perguntava", nos: "perguntávamos", vos: "perguntáveis", eles: "perguntavam" }
  },
  "permitir": {
    "Presente do Indicativo": { eu: "permito", tu: "permites", ele: "permite", nos: "permitimos", vos: "permitis", eles: "permitem" },
    "Pretérito Perfeito": { eu: "permiti", tu: "permitiste", ele: "permitiu", nos: "permitimos", vos: "permitistes", eles: "permitiram" },
    "Pretérito Imperfeito": { eu: "permitia", tu: "permitias", ele: "permitia", nos: "permitíamos", vos: "permitíeis", eles: "permitiam" }
  },
  "pintar": {
    "Presente do Indicativo": { eu: "pinto", tu: "pintas", ele: "pinta", nos: "pintamos", vos: "pintais", eles: "pintam" },
    "Pretérito Perfeito": { eu: "pintei", tu: "pintaste", ele: "pintou", nos: "pintamos", vos: "pintastes", eles: "pintaram" },
    "Pretérito Imperfeito": { eu: "pintava", tu: "pintavas", ele: "pintava", nos: "pintávamos", vos: "pintáveis", eles: "pintavam" }
  },
  "plantar": {
    "Presente do Indicativo": { eu: "planto", tu: "plantas", ele: "planta", nos: "plantamos", vos: "plantais", eles: "plantam" },
    "Pretérito Perfeito": { eu: "plantei", tu: "plantaste", ele: "plantou", nos: "plantamos", vos: "plantastes", eles: "plantaram" },
    "Pretérito Imperfeito": { eu: "plantava", tu: "plantavas", ele: "plantava", nos: "plantávamos", vos: "plantáveis", eles: "plantavam" }
  },
  "praticar": {
    "Presente do Indicativo": { eu: "pratico", tu: "praticas", ele: "pratica", nos: "praticamos", vos: "praticais", eles: "praticam" },
    "Pretérito Perfeito": { eu: "pratiquei", tu: "praticaste", ele: "praticou", nos: "praticamos", vos: "praticastes", eles: "praticaram" },
    "Pretérito Imperfeito": { eu: "praticava", tu: "praticavas", ele: "praticava", nos: "praticávamos", vos: "praticáveis", eles: "praticavam" }
  },
  "preparar": {
    "Presente do Indicativo": { eu: "preparo", tu: "preparas", ele: "prepara", nos: "preparamos", vos: "preparais", eles: "preparam" },
    "Pretérito Perfeito": { eu: "preparei", tu: "preparaste", ele: "preparou", nos: "preparamos", vos: "preparastes", eles: "prepararam" },
    "Pretérito Imperfeito": { eu: "preparava", tu: "preparavas", ele: "preparava", nos: "preparávamos", vos: "preparáveis", eles: "preparavam" }
  },
  "procurar": {
    "Presente do Indicativo": { eu: "procuro", tu: "procuras", ele: "procura", nos: "procuramos", vos: "procurais", eles: "procuram" },
    "Pretérito Perfeito": { eu: "procurei", tu: "procuraste", ele: "procurou", nos: "procuramos", vos: "procurastes", eles: "procuraram" },
    "Pretérito Imperfeito": { eu: "procurava", tu: "procuravas", ele: "procurava", nos: "procurávamos", vos: "procuráveis", eles: "procuravam" }
  },
  "prometer": {
    "Presente do Indicativo": { eu: "prometo", tu: "prometes", ele: "promete", nos: "prometemos", vos: "prometeis", eles: "prometem" },
    "Pretérito Perfeito": { eu: "prometi", tu: "prometeste", ele: "prometeu", nos: "prometemos", vos: "prometestes", eles: "prometeram" },
    "Pretérito Imperfeito": { eu: "prometia", tu: "prometias", ele: "prometia", nos: "prometíamos", vos: "prometíeis", eles: "prometiam" }
  },
  "receber": {
    "Presente do Indicativo": { eu: "recebo", tu: "recebes", ele: "recebe", nos: "recebemos", vos: "recebeis", eles: "recebem" },
    "Pretérito Perfeito": { eu: "recebi", tu: "recebeste", ele: "recebeu", nos: "recebemos", vos: "recebestes", eles: "receberam" },
    "Pretérito Imperfeito": { eu: "recebia", tu: "recebias", ele: "recebia", nos: "recebíamos", vos: "recebíeis", eles: "recebiam" }
  },
  "recordar": {
    "Presente do Indicativo": { eu: "recordo", tu: "recordas", ele: "recorda", nos: "recordamos", vos: "recordais", eles: "recordam" },
    "Pretérito Perfeito": { eu: "recordei", tu: "recordaste", ele: "recordou", nos: "recordamos", vos: "recordastes", eles: "recordaram" },
    "Pretérito Imperfeito": { eu: "recordava", tu: "recordavas", ele: "recordava", nos: "recordávamos", vos: "recordáveis", eles: "recordavam" }
  },
  "responder": {
    "Presente do Indicativo": { eu: "respondo", tu: "respondes", ele: "responde", nos: "respondemos", vos: "respondeis", eles: "respondem" },
    "Pretérito Perfeito": { eu: "respondi", tu: "respondeste", ele: "respondeu", nos: "respondemos", vos: "respondestes", eles: "responderam" },
    "Pretérito Imperfeito": { eu: "respondia", tu: "respondias", ele: "respondia", nos: "respondíamos", vos: "respondíeis", eles: "respondiam" }
  },
  "retirar": {
    "Presente do Indicativo": { eu: "retiro", tu: "retiras", ele: "retira", nos: "retiramos", vos: "retirais", eles: "retiram" },
    "Pretérito Perfeito": { eu: "retirei", tu: "retiraste", ele: "retirou", nos: "retiramos", vos: "retirastes", eles: "retiraram" },
    "Pretérito Imperfeito": { eu: "retirava", tu: "retiravas", ele: "retirava", nos: "retirávamos", vos: "retiráveis", eles: "retiravam" }
  },
  "revisar": {
    "Presente do Indicativo": { eu: "reviso", tu: "revisas", ele: "revisa", nos: "revisamos", vos: "revisais", eles: "revisam" },
    "Pretérito Perfeito": { eu: "revisei", tu: "revisaste", ele: "revisou", nos: "revisamos", vos: "revisastes", eles: "revisaram" },
    "Pretérito Imperfeito": { eu: "revisava", tu: "revisavas", ele: "revisava", nos: "revisávamos", vos: "revisáveis", eles: "revisavam" }
  },
  "saltar": {
    "Presente do Indicativo": { eu: "salto", tu: "saltas", ele: "salta", nos: "saltamos", vos: "saltais", eles: "saltam" },
    "Pretérito Perfeito": { eu: "saltei", tu: "saltaste", ele: "saltou", nos: "saltamos", vos: "saltastes", eles: "saltaram" },
    "Pretérito Imperfeito": { eu: "saltava", tu: "saltavas", ele: "saltava", nos: "saltávamos", vos: "saltáveis", eles: "saltavam" }
  },
  "sentar": {
    "Presente do Indicativo": { eu: "sento", tu: "sentas", ele: "senta", nos: "sentamos", vos: "sentais", eles: "sentam" },
    "Pretérito Perfeito": { eu: "sentei", tu: "sentaste", ele: "sentou", nos: "sentamos", vos: "sentastes", eles: "sentaram" },
    "Pretérito Imperfeito": { eu: "sentava", tu: "sentavas", ele: "sentava", nos: "sentávamos", vos: "sentáveis", eles: "sentavam" }
  },
  "separar": {
    "Presente do Indicativo": { eu: "separo", tu: "separas", ele: "separa", nos: "separamos", vos: "separais", eles: "separam" },
    "Pretérito Perfeito": { eu: "separei", tu: "separaste", ele: "separou", nos: "separamos", vos: "separastes", eles: "separaram" },
    "Pretérito Imperfeito": { eu: "separava", tu: "separavas", ele: "separava", nos: "separávamos", vos: "separáveis", eles: "separavam" }
  },
  "sonhar": {
    "Presente do Indicativo": { eu: "sonho", tu: "sonhas", ele: "sonha", nos: "sonhamos", vos: "sonhais", eles: "sonham" },
    "Pretérito Perfeito": { eu: "sonhei", tu: "sonhaste", ele: "sonhou", nos: "sonhamos", vos: "sonrastes", eles: "sonharam" },
    "Pretérito Imperfeito": { eu: "sonhava", tu: "sonhavas", ele: "sonhava", nos: "sonhávamos", vos: "sonháveis", eles: "sonhavam" }
  },
  "subir": {
    "Presente do Indicativo": { eu: "subo", tu: "sobes", ele: "sobe", nos: "subimos", vos: "subis", eles: "sobem" },
    "Pretérito Perfeito": { eu: "subi", tu: "subiste", ele: "subiu", nos: "subimos", vos: "subistes", eles: "subiram" },
    "Pretérito Imperfeito": { eu: "subia", tu: "subias", ele: "subia", nos: "subíamos", vos: "subíeis", eles: "subiam" }
  },
  "telefonar": {
    "Presente do Indicativo": { eu: "telefono", tu: "telefonas", ele: "telefona", nos: "telefonamos", vos: "telefonais", eles: "telefonam" },
    "Pretérito Perfeito": { eu: "telefonei", tu: "telefonaste", ele: "telefonou", nos: "telefonamos", vos: "telefonastes", eles: "telefonaram" },
    "Pretérito Imperfeito": { eu: "telefonava", tu: "telefonavas", ele: "telefonava", nos: "telefonávamos", vos: "telefonáveis", eles: "telefonavam" }
  },
  "terminar": {
    "Presente do Indicativo": { eu: "termino", tu: "terminas", ele: "termina", nos: "terminamos", vos: "terminais", eles: "terminam" },
    "Pretérito Perfeito": { eu: "terminei", tu: "terminaste", ele: "terminou", nos: "terminamos", vos: "terminastes", eles: "terminaram" },
    "Pretérito Imperfeito": { eu: "terminava", tu: "terminavas", ele: "terminava", nos: "terminávamos", vos: "termináveis", eles: "terminavam" }
  },
  "tirar": {
    "Presente do Indicativo": { eu: "tiro", tu: "tiras", ele: "tira", nos: "tiramos", vos: "tirais", eles: "tiram" },
    "Pretérito Perfeito": { eu: "tirei", tu: "tiraste", ele: "tirou", nos: "tiramos", vos: "tirastes", eles: "tiraram" },
    "Pretérito Imperfeito": { eu: "tirava", tu: "tiravas", ele: "tirava", nos: "tirávamos", vos: "tiráveis", eles: "tiravam" }
  },
  "tomar": {
    "Presente do Indicativo": { eu: "tomo", tu: "tomas", ele: "toma", nos: "tomamos", vos: "tomais", eles: "tomam" },
    "Pretérito Perfeito": { eu: "tomei", tu: "tomaste", ele: "tomou", nos: "tomamos", vos: "tomastes", eles: "tomaram" },
    "Pretérito Imperfeito": { eu: "tomava", tu: "tomavas", ele: "tomava", nos: "tomávamos", vos: "tomáveis", eles: "tomavam" }
  },
  "trabalhar": {
    "Presente do Indicativo": { eu: "trabalho", tu: "trabalhas", ele: "trabalha", nos: "trabalhamos", vos: "trabalhais", eles: "trabalham" },
    "Pretérito Perfeito": { eu: "trabalhei", tu: "trabalhaste", ele: "trabalhou", nos: "trabalhamos", vos: "trabalhastes", eles: "trabalharam" },
    "Pretérito Imperfeito": { eu: "trabalhava", tu: "trabalhavas", ele: "trabalhava", nos: "trabalhávamos", vos: "trabalháveis", eles: "trabalhavam" }
  },
  "usar": {
    "Presente do Indicativo": { eu: "uso", tu: "usas", ele: "usa", nos: "usamos", vos: "usais", eles: "usam" },
    "Pretérito Perfeito": { eu: "usei", tu: "usaste", ele: "usou", nos: "usamos", vos: "usastes", eles: "usaram" },
    "Pretérito Imperfeito": { eu: "usava", tu: "usavas", ele: "usava", nos: "usávamos", vos: "usáveis", eles: "usavam" }
  },
  "vender": {
    "Presente do Indicativo": { eu: "vendo", tu: "vendes", ele: "vende", nos: "vendemos", vos: "vendeis", eles: "vendem" },
    "Pretérito Perfeito": { eu: "vendi", tu: "vendeste", ele: "vendeu", nos: "vendemos", vos: "vendestes", eles: "venderam" },
    "Pretérito Imperfeito": { eu: "vendia", tu: "vendias", ele: "vendia", nos: "vendíamos", vos: "vendíeis", eles: "vendiam" },
    "Pretérito Mais-que-perfeito": { eu: "vendera", tu: "venderas", ele: "vendera", nos: "vendêramos", vos: "vendêreis", eles: "venderam" },
    "Futuro do Presente": { eu: "venderei", tu: "venderás", ele: "venderá", nos: "venderemos", vos: "vendereis", eles: "venderão" },
    "Futuro do Pretérito": { eu: "venderia", tu: "venderias", ele: "venderia", nos: "venderíamos", vos: "venderíeis", eles: "venderiam" },
    "Futuro do Subjuntivo": { eu: "vender", tu: "venderes", ele: "vender", nos: "vendermos", vos: "venderdes", eles: "venderem" }
  },
  "viajar": {
    "Presente do Indicativo": { eu: "viajo", tu: "viajas", ele: "viaja", nos: "viajamos", vos: "viajais", eles: "viajam" },
    "Pretérito Perfeito": { eu: "viajei", tu: "viajaste", ele: "viajou", nos: "viajamos", vos: "viajastes", eles: "viajaram" },
    "Pretérito Imperfeito": { eu: "viajava", tu: "viajavas", ele: "viajava", nos: "viajávamos", vos: "viajáveis", eles: "viajavam" }
  },
  "visitar": {
    "Presente do Indicativo": { eu: "visito", tu: "visitas", ele: "visita", nos: "visitamos", vos: "visitais", eles: "visitam" },
    "Pretérito Perfeito": { eu: "visitei", tu: "visitaste", ele: "visitou", nos: "visitamos", vos: "visitastes", eles: "visitaram" },
    "Pretérito Imperfeito": { eu: "visitava", tu: "visitavas", ele: "visitava", nos: "visitávamos", vos: "visitáveis", eles: "visitavam" }
  },
  "voltar": {
    "Presente do Indicativo": { eu: "volto", tu: "voltas", ele: "volta", nos: "voltamos", vos: "voltais", eles: "voltam" },
    "Pretérito Perfeito": { eu: "voltei", tu: "voltaste", ele: "voltou", nos: "voltamos", vos: "voltastes", eles: "voltaram" },
    "Pretérito Imperfeito": { eu: "voltava", tu: "voltavas", ele: "voltava", nos: "voltávamos", vos: "voltáveis", eles: "voltavam" }
  },
  "falar": {
    "Presente do Indicativo": { eu: "falo", tu: "falas", ele: "fala", nos: "falamos", vos: "falais", eles: "falam" },
    "Pretérito Perfeito": { eu: "falei", tu: "falaste", ele: "falou", nos: "falamos", vos: "falastes", eles: "falaram" },
    "Pretérito Imperfeito": { eu: "falava", tu: "falavas", ele: "falava", nos: "falávamos", vos: "faláveis", eles: "falavam" },
    "Pretérito Mais-que-perfeito": { eu: "falara", tu: "falaras", ele: "falara", nos: "faláramos", vos: "faláreis", eles: "falaram" },
    "Futuro do Presente": { eu: "falarei", tu: "falarás", ele: "falará", nos: "falaremos", vos: "falareis", eles: "falarão" },
    "Futuro do Pretérito": { eu: "falaria", tu: "falarias", ele: "falaria", nos: "falaríamos", vos: "falaríeis", eles: "falariam" },
    "Futuro do Subjuntivo": { eu: "falar", tu: "falares", ele: "falar", nos: "falarmos", vos: "falardes", eles: "falarem" }
  },
  "dizer": {
    "Futuro do Presente": { eu: "direi", tu: "dirás", ele: "dirá", nos: "diremos", vos: "direis", eles: "dirão" },
    "Futuro do Pretérito": { eu: "diria", tu: "dirias", ele: "diria", nos: "diríamos", vos: "diríeis", eles: "diriam" },
    "Futuro do Subjuntivo": { eu: "disser", tu: "disseres", ele: "disser", nos: "dissermos", vos: "disserdes", eles: "disserem" }
  },
  "fazer": {
    "Futuro do Presente": { eu: "farei", tu: "farás", ele: "fará", nos: "faremos", vos: "fareis", eles: "farão" },
    "Futuro do Pretérito": { eu: "faria", tu: "farias", ele: "faria", nos: "faríamos", vos: "faríeis", eles: "fariam" },
    "Futuro do Subjuntivo": { eu: "fizer", tu: "fizeres", ele: "fizer", nos: "fizermos", vos: "fizerdes", eles: "fizerem" }
  },
  "trazer": {
    "Futuro do Presente": { eu: "trarei", tu: "trarás", ele: "trará", nos: "traremos", vos: "trareis", eles: "trarão" },
    "Futuro do Pretérito": { eu: "traria", tu: "trarias", ele: "traria", nos: "traríamos", vos: "traríeis", eles: "trariam" },
    "Futuro do Subjuntivo": { eu: "trouxer", tu: "trouxeres", ele: "trouxer", nos: "trouxermos", vos: "trouxerdes", eles: "trouxerem" }
  },
  "pôr": {
    "Presente do Indicativo": { eu: "ponho", tu: "pões", ele: "põe", nos: "pomos", vos: "pondes", eles: "põem" },
    "Pretérito Mais-que-perfeito": { eu: "pusera", tu: "puseras", ele: "pusera", nos: "puséramos", vos: "puséreis", eles: "puseram" },
    "Futuro do Subjuntivo": { eu: "puser", tu: "puseres", ele: "puser", nos: "pusermos", vos: "puserdes", eles: "puserem" }
  },
  "vir": {
    "Presente do Indicativo": { eu: "venho", tu: "vens", ele: "vem", nos: "vimos", vos: "vindes", eles: "vêm" },
    "Pretérito Mais-que-perfeito": { eu: "viera", tu: "vieras", ele: "viera", nos: "viéramos", vos: "viéreis", eles: "vieram" },
    "Futuro do Subjuntivo": { eu: "vier", tu: "vieres", ele: "vier", nos: "viermos", vos: "vierdes", eles: "vierem" }
  },
  "ver": {
    "Pretérito Perfeito": { eu: "vi", tu: "viste", ele: "viu", nos: "vimos", vos: "vistes", eles: "viram" },
    "Pretérito Mais-que-perfeito": { eu: "vira", tu: "viras", ele: "vira", nos: "víramos", vos: "víreis", eles: "viram" }
  },
  "dispor": {
    "Pretérito Imperfeito": { eu: "dispunha", tu: "dispunhas", ele: "dispunha", nos: "dispúnhamos", vos: "dispúnheis", eles: "dispunham" }
  },
  "manter": {
    "Presente do Indicativo": { eu: "mantenho", tu: "manténs", ele: "mantém", nos: "mantemos", vos: "mantendes", eles: "mantêm" }
  },
  "intervir": {
    "Pretérito Perfeito": { eu: "intervim", tu: "intervieste", ele: "interveio", nos: "interviemos", vos: "interviestes", eles: "intervieram" }
  },
  "requerer": {
    "Presente do Indicativo": { eu: "requeiro", tu: "requeres", ele: "requer", nos: "requeremos", vos: "requereis", eles: "requerem" }
  }
};

const personKeyMap: Record<string, string> = {
  "Eu": "eu",
  "Tu": "tu",
  "Ele/Ela": "ele",
  "Nós": "nos",
  "Vós": "vos",
  "Eles/Elas": "eles",
};

function getMockExercise(
  difficulty: Difficulty,
  selectedTenses: string[],
  excludeVerbs: string[]
): ConjugationExercise {
  const pool = difficulty === "easy"
    ? easyVerbs
    : difficulty === "hard"
    ? hardVerbs
    : [...easyVerbs, ...hardVerbs];

  const filtered = pool.filter(
    (v) =>
      !excludeVerbs.includes(v.verb) &&
      (selectedTenses.length === 0 || selectedTenses.includes(v.tense)) &&
      mockTable[v.verb]?.[v.tense]
  );

  const source = filtered.length > 0 ? filtered : pool.filter((v) => mockTable[v.verb]?.[v.tense]);
  const chosen = source[Math.floor(Math.random() * source.length)] || easyVerbs[0];
  const conjugation = mockTable[chosen.verb]?.[chosen.tense] ?? mockTable["falar"]["Presente do Indicativo"];

  const personList = Object.keys(personKeyMap);
  const person = personList[Math.floor(Math.random() * personList.length)];
  const personKey = personKeyMap[person];

  const isIrregular = hardVerbs.some((v) => v.verb === chosen.verb);

  return {
    verb: chosen.verb.toUpperCase(),
    tense: chosen.tense,
    person,
    correctAnswer: conjugation[personKey],
    fullConjugation: conjugation,
    explanation: isIrregular
      ? `"${chosen.verb}" é um verbo irregular no ${chosen.tense}.`
      : `"${chosen.verb}" é conjugado regularmente no ${chosen.tense}.`,
  };
}

function sanitize(msg: string) {
  return msg
    .replace(/xai-[A-Za-z0-9_-]+/g, "[redacted]")
    .replace(/sk-[A-Za-z0-9_-]+/g, "[redacted]")
    .slice(0, 300);
}

function normalizeExercise(parsed: unknown): ConjugationExercise | null {
  if (!parsed || typeof parsed !== "object") return null;
  const d = parsed as Partial<ConjugationExercise>;
  if (
    !d.verb ||
    !d.tense ||
    !d.person ||
    !d.correctAnswer ||
    !d.fullConjugation ||
    !d.explanation
  )
    return null;
  return d as ConjugationExercise;
}

const systemPrompt = `Você é um professor de português brasileiro especializado em concursos públicos (VUNESP, FGV, CEBRASPE).
Gere exercícios de conjugação verbal no formato JSON especificado. Seja preciso gramaticalmente.`;

function buildUserPrompt(
  difficulty: Difficulty,
  selectedTenses: string[],
  excludeVerbs: string[]
): string {
  const diffMap = {
    easy: "somente verbos regulares (ex: falar, estudar, vender, partir, correr, morar)",
    medium: "70% verbos regulares e 30% irregulares",
    hard: "somente verbos irregulares (ex: pôr, dispor, compor, manter, vir, ver, prover, intervir, requerer)",
  };

  const tensePart =
    selectedTenses.length > 0
      ? `Use um dos seguintes tempos verbais: ${selectedTenses.join(", ")}.`
      : "Use um dos seguintes tempos: Presente do Indicativo, Pretérito Perfeito, Pretérito Imperfeito, Pretérito Mais-que-perfeito, Futuro do Presente, Futuro do Pretérito ou Futuro do Subjuntivo.";

  const excludePart =
    excludeVerbs.length > 0
      ? `NÃO use os seguintes verbos já utilizados nesta sessão: ${excludeVerbs.join(", ")}.`
      : "";

  return `Gere UM exercício de conjugação verbal com as seguintes regras:
- Dificuldade: ${diffMap[difficulty]}
- ${tensePart}
- ${excludePart}
- Escolha uma pessoa gramatical aleatória (Eu, Tu, Ele/Ela, Nós, Vós ou Eles/Elas)
- Retorne SOMENTE o JSON abaixo, sem markdown:
{
  "verb": "infinitivo em MAIÚSCULAS",
  "tense": "nome do tempo verbal",
  "person": "pessoa gramatical (ex: Eu, Tu, Ele/Ela, Nós, Vós, Eles/Elas)",
  "correctAnswer": "conjugação correta para a pessoa/tempo",
  "fullConjugation": {
    "eu": "...",
    "tu": "...",
    "ele": "...",
    "nos": "...",
    "vos": "...",
    "eles": "..."
  },
  "explanation": "Explicação gramatical breve e clara (1-2 frases)"
}`;
}

export async function POST(request: Request) {
  try {
    const { difficulty = "medium", selectedTenses = [], excludeVerbs = [] } =
      await request.json();

    const xaiKey =
      request.headers.get("x-grok-api-key") ||
      process.env.GROK_API_KEY ||
      process.env.XAI_API_KEY;
    const geminiKey =
      request.headers.get("x-gemini-api-key") || process.env.GEMINI_API_KEY;
    const openaiKey =
      request.headers.get("x-openai-api-key") || process.env.OPENAI_API_KEY;

    let exercise: ConjugationExercise | null = null;
    let dataSource = "mock";

    // ── Try xAI/Grok ────────────────────────────────────────────────────────
    if (!exercise && xaiKey) {
      try {
        const res = await fetch("https://api.x.ai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${xaiKey}`,
          },
          body: JSON.stringify({
            model: "grok-4.3",
            messages: [
              { role: "system", content: systemPrompt },
              {
                role: "user",
                content: buildUserPrompt(difficulty, selectedTenses, excludeVerbs),
              },
            ],
            response_format: { type: "json_object" },
            temperature: 0.8,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const parsed = JSON.parse(data.choices[0].message.content);
          exercise = normalizeExercise(parsed);
          if (exercise) dataSource = "grok";
        } else {
          console.error(
            "conjugation-exercise: Grok error",
            sanitize(await res.text())
          );
        }
      } catch (e) {
        console.error("conjugation-exercise: Grok exception", e);
      }
    }

    // ── Try Gemini ───────────────────────────────────────────────────────────
    if (!exercise && geminiKey) {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [
                    {
                      text:
                        systemPrompt +
                        "\n\n" +
                        buildUserPrompt(difficulty, selectedTenses, excludeVerbs),
                    },
                  ],
                },
              ],
              generationConfig: {
                responseMimeType: "application/json",
                temperature: 0.8,
              },
            }),
          }
        );

        if (res.ok) {
          const data = await res.json();
          const text = data.candidates[0].content.parts[0].text;
          const parsed = JSON.parse(text);
          exercise = normalizeExercise(parsed);
          if (exercise) dataSource = "gemini";
        } else {
          console.error(
            "conjugation-exercise: Gemini error",
            sanitize(await res.text())
          );
        }
      } catch (e) {
        console.error("conjugation-exercise: Gemini exception", e);
      }
    }

    // ── Try OpenAI ───────────────────────────────────────────────────────────
    if (!exercise && openaiKey) {
      try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: systemPrompt },
              {
                role: "user",
                content: buildUserPrompt(difficulty, selectedTenses, excludeVerbs),
              },
            ],
            response_format: { type: "json_object" },
            temperature: 0.8,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const parsed = JSON.parse(data.choices[0].message.content);
          exercise = normalizeExercise(parsed);
          if (exercise) dataSource = "openai";
        } else {
          console.error(
            "conjugation-exercise: OpenAI error",
            sanitize(await res.text())
          );
        }
      } catch (e) {
        console.error("conjugation-exercise: OpenAI exception", e);
      }
    }

    // ── Mock fallback ────────────────────────────────────────────────────────
    if (!exercise) {
      exercise = getMockExercise(difficulty, selectedTenses, excludeVerbs);
      dataSource = "mock";
    }

    return NextResponse.json(exercise, {
      headers: { "x-data-source": dataSource },
    });
  } catch (error) {
    console.error("conjugation-exercise route error:", error);
    return NextResponse.json(
      { error: "Erro interno ao gerar exercício." },
      { status: 500 }
    );
  }
}
