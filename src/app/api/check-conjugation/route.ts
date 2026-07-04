import { NextResponse } from "next/server";
import { CheckConjugationResponse, FeedbackType } from "@/lib/conjugationTypes";

function sanitize(msg: string) {
  return msg
    .replace(/xai-[A-Za-z0-9_-]+/g, "[redacted]")
    .replace(/sk-[A-Za-z0-9_-]+/g, "[redacted]")
    .slice(0, 300);
}

function simpleCheck(
  userAnswer: string,
  correctAnswer: string
): CheckConjugationResponse {
  const ua = userAnswer.trim().toLowerCase();
  const ca = correctAnswer.trim().toLowerCase();

  if (ua === ca) {
    return {
      isCorrect: true,
      feedback: `✅ Correto! A conjugação "${correctAnswer}" está perfeita.`,
      feedbackType: "correct",
    };
  }

  // Check for typo (edit distance <= 1)
  if (Math.abs(ua.length - ca.length) <= 1) {
    let diffs = 0;
    const shorter = ua.length <= ca.length ? ua : ca;
    const longer = ua.length <= ca.length ? ca : ua;
    let i = 0,
      j = 0;
    while (i < shorter.length && j < longer.length) {
      if (shorter[i] !== longer[j]) {
        diffs++;
        if (ua.length !== ca.length) j++;
        else { i++; j++; }
      } else {
        i++;
        j++;
      }
    }
    diffs += longer.length - j;
    if (diffs <= 1) {
      return {
        isCorrect: false,
        feedback: `Provavelmente houve apenas um erro de digitação. A resposta correta é "${correctAnswer}".`,
        feedbackType: "typo",
      };
    }
  }

  return {
    isCorrect: false,
    feedback: `A resposta correta é "${correctAnswer}".`,
    feedbackType: "other",
  };
}

function normalizeCheckResponse(parsed: unknown): CheckConjugationResponse | null {
  if (!parsed || typeof parsed !== "object") return null;
  const d = parsed as Partial<CheckConjugationResponse>;
  const validTypes: FeedbackType[] = ["correct", "typo", "wrong_tense", "wrong_person", "other"];
  if (typeof d.isCorrect !== "boolean" || !d.feedback || !d.feedbackType) return null;
  if (!validTypes.includes(d.feedbackType as FeedbackType)) return null;
  return d as CheckConjugationResponse;
}

const systemPrompt = `Você é um professor de português brasileiro. Avalie se a conjugação verbal do usuário está correta e forneça feedback inteligente.
Sempre responda SOMENTE em JSON, sem markdown.`;

function buildUserPrompt(
  verb: string,
  tense: string,
  person: string,
  correctAnswer: string,
  userAnswer: string
): string {
  return `O exercício pedia a conjugação do verbo "${verb}" no "${tense}", para a pessoa "${person}".
A resposta correta é: "${correctAnswer}"
O usuário respondeu: "${userAnswer}"

Avalie e retorne SOMENTE este JSON:
{
  "isCorrect": true ou false,
  "feedbackType": "correct" | "typo" | "wrong_tense" | "wrong_person" | "other",
  "feedback": "Mensagem curta e didática para o usuário (máximo 3 frases). Se errado, explique o erro de forma construtiva."
}

Regras para feedbackType:
- "correct": resposta correta
- "typo": a resposta tem apenas 1 caractere diferente (erro de digitação)
- "wrong_tense": o usuário conjugou corretamente mas em outro tempo verbal
- "wrong_person": o usuário conjugou corretamente mas para outra pessoa
- "other": erro gramatical de outra natureza`;
}

export async function POST(request: Request) {
  try {
    const { verb, tense, person, correctAnswer, userAnswer } =
      await request.json();

    if (!verb || !tense || !person || !correctAnswer || userAnswer === undefined) {
      return NextResponse.json({ error: "Dados incompletos." }, { status: 400 });
    }

    const xaiKey =
      request.headers.get("x-grok-api-key") ||
      process.env.GROK_API_KEY ||
      process.env.XAI_API_KEY;
    const geminiKey =
      request.headers.get("x-gemini-api-key") || process.env.GEMINI_API_KEY;
    const openaiKey =
      request.headers.get("x-openai-api-key") || process.env.OPENAI_API_KEY;

    let result: CheckConjugationResponse | null = null;

    // ── Try xAI/Grok ────────────────────────────────────────────────────────
    if (!result && xaiKey) {
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
                content: buildUserPrompt(verb, tense, person, correctAnswer, userAnswer),
              },
            ],
            response_format: { type: "json_object" },
            temperature: 0.3,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          const parsed = JSON.parse(data.choices[0].message.content);
          result = normalizeCheckResponse(parsed);
        } else {
          console.error("check-conjugation: Grok error", sanitize(await res.text()));
        }
      } catch (e) {
        console.error("check-conjugation: Grok exception", e);
      }
    }

    // ── Try Gemini ───────────────────────────────────────────────────────────
    if (!result && geminiKey) {
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
                        buildUserPrompt(verb, tense, person, correctAnswer, userAnswer),
                    },
                  ],
                },
              ],
              generationConfig: {
                responseMimeType: "application/json",
                temperature: 0.3,
              },
            }),
          }
        );
        if (res.ok) {
          const data = await res.json();
          const text = data.candidates[0].content.parts[0].text;
          const parsed = JSON.parse(text);
          result = normalizeCheckResponse(parsed);
        } else {
          console.error("check-conjugation: Gemini error", sanitize(await res.text()));
        }
      } catch (e) {
        console.error("check-conjugation: Gemini exception", e);
      }
    }

    // ── Try OpenAI ───────────────────────────────────────────────────────────
    if (!result && openaiKey) {
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
                content: buildUserPrompt(verb, tense, person, correctAnswer, userAnswer),
              },
            ],
            response_format: { type: "json_object" },
            temperature: 0.3,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          const parsed = JSON.parse(data.choices[0].message.content);
          result = normalizeCheckResponse(parsed);
        } else {
          console.error("check-conjugation: OpenAI error", sanitize(await res.text()));
        }
      } catch (e) {
        console.error("check-conjugation: OpenAI exception", e);
      }
    }

    // ── Fallback: simple string comparison ───────────────────────────────────
    if (!result) {
      result = simpleCheck(userAnswer, correctAnswer);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("check-conjugation route error:", error);
    return NextResponse.json(
      { error: "Erro interno ao verificar resposta." },
      { status: 500 }
    );
  }
}
