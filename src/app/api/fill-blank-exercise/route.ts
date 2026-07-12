import { NextResponse } from "next/server";
import { FillBlankExercise } from "@/lib/fillBlankTypes";
import { fillBlankQuestions } from "@/lib/fillBlankQuestions";

const ALL_TENSES = Object.keys(fillBlankQuestions);

function getMockExercise(
  selectedTenses: string[],
  excludeSentences: string[]
): FillBlankExercise {
  const tensePool = selectedTenses.length > 0 ? selectedTenses : ALL_TENSES;
  const pool = tensePool.flatMap((t) => fillBlankQuestions[t] || []);

  const filtered = pool.filter((q) => !excludeSentences.includes(q.sentence));
  const source = filtered.length > 0 ? filtered : pool;

  return source[Math.floor(Math.random() * source.length)] || fillBlankQuestions["Presente do Indicativo"][0];
}

function sanitize(msg: string) {
  return msg
    .replace(/xai-[A-Za-z0-9_-]+/g, "[redacted]")
    .replace(/sk-[A-Za-z0-9_-]+/g, "[redacted]")
    .slice(0, 300);
}

function normalizeExercise(parsed: unknown): FillBlankExercise | null {
  if (!parsed || typeof parsed !== "object") return null;
  const d = parsed as Partial<FillBlankExercise>;
  if (!d.sentence || !d.verb || !d.tense || !d.correctAnswer || !d.explanation) return null;
  if (!d.sentence.includes("___")) return null;
  return d as FillBlankExercise;
}

const systemPrompt = `Você é um professor de português brasileiro especializado em concursos públicos (VUNESP, FGV, CEBRASPE).
Gere exercícios de "Complete a Frase" (preenchimento de lacuna com a conjugação correta de um verbo) no formato JSON especificado. Seja preciso gramaticalmente.`;

function buildUserPrompt(selectedTenses: string[], excludeSentences: string[]): string {
  const tensePart =
    selectedTenses.length > 0
      ? `Use um dos seguintes tempos verbais: ${selectedTenses.join(", ")}.`
      : "Use um dos seguintes tempos: Presente do Indicativo, Pretérito Perfeito, Pretérito Imperfeito, Pretérito Mais-que-perfeito, Futuro do Presente, Futuro do Pretérito ou Futuro do Subjuntivo.";

  const excludePart =
    excludeSentences.length > 0
      ? `NÃO use as seguintes frases já utilizadas nesta sessão: ${excludeSentences.join(" | ")}.`
      : "";

  return `Gere UM exercício de "Complete a Frase" com as seguintes regras:
- ${tensePart}
- A frase deve conter uma lacuna representada por "______" (6 sublinhados) no lugar da conjugação do verbo indicado.
- ${excludePart}
- Contexto de concurso público (pode incluir um pequeno fragmento de texto formal).
- Retorne SOMENTE o JSON abaixo, sem markdown:
{
  "sentence": "Frase com a lacuna ______ no lugar da conjugação",
  "verb": "infinitivo do verbo em minúsculas",
  "tense": "nome do tempo verbal usado",
  "correctAnswer": "conjugação correta que preenche a lacuna",
  "explanation": "Explicação gramatical breve e clara (1-2 frases)"
}`;
}

export async function POST(request: Request) {
  try {
    const { selectedTenses = [], excludeSentences = [] } = await request.json();

    const xaiKey =
      request.headers.get("x-grok-api-key") ||
      process.env.GROK_API_KEY ||
      process.env.XAI_API_KEY;
    const geminiKey =
      request.headers.get("x-gemini-api-key") || process.env.GEMINI_API_KEY;
    const openaiKey =
      request.headers.get("x-openai-api-key") || process.env.OPENAI_API_KEY;

    let exercise: FillBlankExercise | null = null;
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
              { role: "user", content: buildUserPrompt(selectedTenses, excludeSentences) },
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
          console.error("fill-blank-exercise: Grok error", sanitize(await res.text()));
        }
      } catch (e) {
        console.error("fill-blank-exercise: Grok exception", e);
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
                  parts: [{ text: systemPrompt + "\n\n" + buildUserPrompt(selectedTenses, excludeSentences) }],
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
          console.error("fill-blank-exercise: Gemini error", sanitize(await res.text()));
        }
      } catch (e) {
        console.error("fill-blank-exercise: Gemini exception", e);
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
              { role: "user", content: buildUserPrompt(selectedTenses, excludeSentences) },
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
          console.error("fill-blank-exercise: OpenAI error", sanitize(await res.text()));
        }
      } catch (e) {
        console.error("fill-blank-exercise: OpenAI exception", e);
      }
    }

    // ── Mock fallback ────────────────────────────────────────────────────────
    if (!exercise) {
      exercise = getMockExercise(selectedTenses, excludeSentences);
      dataSource = "mock";
    }

    return NextResponse.json(exercise, {
      headers: { "x-data-source": dataSource },
    });
  } catch (error) {
    console.error("fill-blank-exercise route error:", error);
    return NextResponse.json(
      { error: "Erro interno ao gerar exercício." },
      { status: 500 }
    );
  }
}
