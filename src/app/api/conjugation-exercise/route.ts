import { NextResponse } from "next/server";
import { ConjugationExercise, Difficulty } from "@/lib/conjugationTypes";

// ── Mock exercises (fallback when no AI key available) ────────────────────────

const easyVerbs = [
  { verb: "falar", tense: "Presente do Indicativo" },
  { verb: "estudar", tense: "Presente do Indicativo" },
  { verb: "vender", tense: "Pretérito Perfeito" },
  { verb: "partir", tense: "Pretérito Perfeito" },
  { verb: "gostar", tense: "Pretérito Imperfeito" },
  { verb: "correr", tense: "Pretérito Imperfeito" },
];

const hardVerbs = [
  { verb: "pôr", tense: "Presente do Indicativo" },
  { verb: "vir", tense: "Presente do Indicativo" },
  { verb: "ver", tense: "Pretérito Perfeito" },
  { verb: "dispor", tense: "Pretérito Imperfeito" },
  { verb: "manter", tense: "Presente do Indicativo" },
  { verb: "intervir", tense: "Pretérito Perfeito" },
  { verb: "requerer", tense: "Presente do Indicativo" },
];

const persons = ["Eu", "Tu", "Ele/Ela", "Nós", "Vós", "Eles/Elas"];

// A small hardcoded mock table for immediate fallback
const mockTable: Record<string, Record<string, Record<string, string>>> = {
  "falar": {
    "Presente do Indicativo": { eu: "falo", tu: "falas", ele: "fala", nos: "falamos", vos: "falais", eles: "falam" },
    "Pretérito Perfeito": { eu: "falei", tu: "falaste", ele: "falou", nos: "falamos", vos: "falastes", eles: "falaram" },
    "Pretérito Imperfeito": { eu: "falava", tu: "falavas", ele: "falava", nos: "falávamos", vos: "faláveis", eles: "falavam" },
  },
  "estudar": {
    "Presente do Indicativo": { eu: "estudo", tu: "estudas", ele: "estuda", nos: "estudamos", vos: "estudais", eles: "estudam" },
    "Pretérito Perfeito": { eu: "estudei", tu: "estudaste", ele: "estudou", nos: "estudamos", vos: "estudastes", eles: "estudaram" },
    "Pretérito Imperfeito": { eu: "estudava", tu: "estudavas", ele: "estudava", nos: "estudávamos", vos: "estudáveis", eles: "estudavam" },
  },
  "vender": {
    "Presente do Indicativo": { eu: "vendo", tu: "vendes", ele: "vende", nos: "vendemos", vos: "vendeis", eles: "vendem" },
    "Pretérito Perfeito": { eu: "vendi", tu: "vendeste", ele: "vendeu", nos: "vendemos", vos: "vendestes", eles: "venderam" },
    "Pretérito Imperfeito": { eu: "vendia", tu: "vendias", ele: "vendia", nos: "vendíamos", vos: "vendíeis", eles: "vendiam" },
  },
  "partir": {
    "Presente do Indicativo": { eu: "parto", tu: "partes", ele: "parte", nos: "partimos", vos: "partis", eles: "partem" },
    "Pretérito Perfeito": { eu: "parti", tu: "partiste", ele: "partiu", nos: "partimos", vos: "partistes", eles: "partiram" },
    "Pretérito Imperfeito": { eu: "partia", tu: "partias", ele: "partia", nos: "partíamos", vos: "partíeis", eles: "partiam" },
  },
  "pôr": {
    "Presente do Indicativo": { eu: "ponho", tu: "pões", ele: "põe", nos: "pomos", vos: "pondes", eles: "põem" },
    "Pretérito Perfeito": { eu: "pus", tu: "puseste", ele: "pôs", nos: "pusemos", vos: "pusestes", eles: "puseram" },
    "Pretérito Imperfeito": { eu: "punha", tu: "punhas", ele: "punha", nos: "púnhamos", vos: "púnheis", eles: "punham" },
  },
  "vir": {
    "Presente do Indicativo": { eu: "venho", tu: "vens", ele: "vem", nos: "vimos", vos: "vindes", eles: "vêm" },
    "Pretérito Perfeito": { eu: "vim", tu: "vieste", ele: "veio", nos: "viemos", vos: "viestes", eles: "vieram" },
    "Pretérito Imperfeito": { eu: "vinha", tu: "vinhas", ele: "vinha", nos: "vínhamos", vos: "vínheis", eles: "vinham" },
  },
  "intervir": {
    "Presente do Indicativo": { eu: "intervenho", tu: "intervéns", ele: "intervém", nos: "intervimos", vos: "intervindes", eles: "intervêm" },
    "Pretérito Perfeito": { eu: "intervim", tu: "intervieste", ele: "interveio", nos: "intervimos", vos: "interviestes", eles: "intervieram" },
    "Pretérito Imperfeito": { eu: "intervinha", tu: "intervinhas", ele: "intervinha", nos: "intervínhamos", vos: "intervínheis", eles: "intervinham" },
  },
  "dispor": {
    "Presente do Indicativo": { eu: "disponho", tu: "dispões", ele: "dispõe", nos: "dispomos", vos: "dispondes", eles: "dispõem" },
    "Pretérito Perfeito": { eu: "dispus", tu: "dispuseste", ele: "dispôs", nos: "dispusemos", vos: "dispusestes", eles: "dispuseram" },
    "Pretérito Imperfeito": { eu: "dispunha", tu: "dispunhas", ele: "dispunha", nos: "dispúnhamos", vos: "dispúnheis", eles: "dispunham" },
  },
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

  return {
    verb: chosen.verb.toUpperCase(),
    tense: chosen.tense,
    person,
    correctAnswer: conjugation[personKey],
    fullConjugation: conjugation,
    explanation: `"${chosen.verb}" é conjugado regularmente no ${chosen.tense}.`,
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
      : "Use um dos seguintes tempos: Presente do Indicativo, Pretérito Perfeito ou Pretérito Imperfeito.";

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
