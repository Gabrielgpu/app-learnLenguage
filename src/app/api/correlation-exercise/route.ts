import { NextResponse } from "next/server";
import { CorrelationExercise, CorrelationPairId } from "@/lib/correlationTypes";
import { correlationQuestions } from "@/lib/correlationQuestions";
import { CORRELATION_RULES } from "@/lib/correlationRules";

const ALL_PAIR_IDS = Object.keys(correlationQuestions) as CorrelationPairId[];

function getMockExercise(
  selectedPairs: CorrelationPairId[],
  excludeSentences: string[]
): CorrelationExercise {
  const pairPool = selectedPairs.length > 0 ? selectedPairs : ALL_PAIR_IDS;
  const pool = pairPool.flatMap((p) => correlationQuestions[p] || []);

  const filtered = pool.filter((q) => !excludeSentences.includes(q.sentence));
  const source = filtered.length > 0 ? filtered : pool;

  return (
    source[Math.floor(Math.random() * source.length)] ||
    correlationQuestions["presente-presente-subjuntivo"][0]
  );
}

function sanitize(msg: string) {
  return msg
    .replace(/xai-[A-Za-z0-9_-]+/g, "[redacted]")
    .replace(/sk-[A-Za-z0-9_-]+/g, "[redacted]")
    .slice(0, 300);
}

function normalizeExercise(parsed: unknown): CorrelationExercise | null {
  if (!parsed || typeof parsed !== "object") return null;
  const d = parsed as Partial<CorrelationExercise>;
  if (!d.sentence || !d.pairId || !d.pairLabel || !d.explanation) return null;
  if (!Array.isArray(d.verbs) || d.verbs.length !== 2) return null;
  const [v1, v2] = d.verbs;
  if (!v1?.infinitive || !v1?.tense || !v1?.correctAnswer) return null;
  if (!v2?.infinitive || !v2?.tense || !v2?.correctAnswer) return null;
  const blankCount = d.sentence.split("______").length - 1;
  if (blankCount !== 2) return null;
  return d as CorrelationExercise;
}

const RULES_DESCRIPTION = CORRELATION_RULES.map(
  (r) => `- ${r.label}: ${r.description} Exemplo: "${r.example}"`
).join("\n");

const systemPrompt = `Você é um professor de português brasileiro especializado em concursos públicos (VUNESP, FGV, CEBRASPE).
Gere exercícios do tópico "Correlação Verbal" (a relação obrigatória entre o tempo verbal da oração subordinada e o da oração principal) no formato JSON especificado. Seja preciso gramaticalmente.

As regras de correlação verbal válidas são:
${RULES_DESCRIPTION}`;

function buildUserPrompt(
  selectedPairs: CorrelationPairId[],
  excludeSentences: string[]
): string {
  const pairsToUse = selectedPairs.length > 0 ? selectedPairs : ALL_PAIR_IDS;
  const rulesPart = CORRELATION_RULES.filter((r) => pairsToUse.includes(r.id))
    .map((r) => `"${r.id}" (${r.label})`)
    .join(", ");

  const excludePart =
    excludeSentences.length > 0
      ? `NÃO use as seguintes frases já utilizadas nesta sessão: ${excludeSentences.join(" | ")}.`
      : "";

  return `Gere UM exercício de "Correlação Verbal" com as seguintes regras:
- Escolha UMA das seguintes regras de correlação: ${rulesPart}.
- A frase deve conter DUAS lacunas, cada uma representada por "______" (6 sublinhados), uma para cada verbo a ser conjugado, na ordem em que aparecem na frase.
- ${excludePart}
- Contexto de concurso público (pode incluir um pequeno fragmento de texto formal).
- Retorne SOMENTE o JSON abaixo, sem markdown:
{
  "sentence": "Frase com as lacunas ______ e ______ no lugar das conjugações, na ordem correta",
  "pairId": "id da regra escolhida, um dos valores: presente-presente-subjuntivo, futuro-subjuntivo-futuro-presente, imperfeito-subjuntivo-futuro-preterito",
  "pairLabel": "nome legível do par de tempos verbais usado",
  "verbs": [
    { "infinitive": "infinitivo do 1º verbo", "tense": "nome do tempo do 1º verbo", "correctAnswer": "conjugação correta do 1º verbo" },
    { "infinitive": "infinitivo do 2º verbo", "tense": "nome do tempo do 2º verbo", "correctAnswer": "conjugação correta do 2º verbo" }
  ],
  "explanation": "Explicação gramatical breve e clara sobre por que esse par de tempos se correlaciona (1-2 frases)"
}`;
}

export async function POST(request: Request) {
  try {
    const { selectedPairs = [], excludeSentences = [] } = await request.json();

    const xaiKey =
      request.headers.get("x-grok-api-key") ||
      process.env.GROK_API_KEY ||
      process.env.XAI_API_KEY;
    const geminiKey =
      request.headers.get("x-gemini-api-key") || process.env.GEMINI_API_KEY;
    const openaiKey =
      request.headers.get("x-openai-api-key") || process.env.OPENAI_API_KEY;

    let exercise: CorrelationExercise | null = null;
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
              { role: "user", content: buildUserPrompt(selectedPairs, excludeSentences) },
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
          console.error("correlation-exercise: Grok error", sanitize(await res.text()));
        }
      } catch (e) {
        console.error("correlation-exercise: Grok exception", e);
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
                    { text: systemPrompt + "\n\n" + buildUserPrompt(selectedPairs, excludeSentences) },
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
          console.error("correlation-exercise: Gemini error", sanitize(await res.text()));
        }
      } catch (e) {
        console.error("correlation-exercise: Gemini exception", e);
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
              { role: "user", content: buildUserPrompt(selectedPairs, excludeSentences) },
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
          console.error("correlation-exercise: OpenAI error", sanitize(await res.text()));
        }
      } catch (e) {
        console.error("correlation-exercise: OpenAI exception", e);
      }
    }

    // ── Mock fallback ────────────────────────────────────────────────────────
    if (!exercise) {
      exercise = getMockExercise(selectedPairs, excludeSentences);
      dataSource = "mock";
    }

    return NextResponse.json(exercise, {
      headers: { "x-data-source": dataSource },
    });
  } catch (error) {
    console.error("correlation-exercise route error:", error);
    return NextResponse.json(
      { error: "Erro interno ao gerar exercício." },
      { status: 500 }
    );
  }
}
