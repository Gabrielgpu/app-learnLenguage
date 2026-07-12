import { NextResponse } from "next/server";
import { CheckCorrelationResponse, CorrelationVerb } from "@/lib/correlationTypes";
import { FeedbackType } from "@/lib/conjugationTypes";

function sanitize(msg: string) {
  return msg
    .replace(/xai-[A-Za-z0-9_-]+/g, "[redacted]")
    .replace(/sk-[A-Za-z0-9_-]+/g, "[redacted]")
    .slice(0, 300);
}

function simpleCheck(
  userAnswers: [string, string],
  correctAnswers: [string, string]
): CheckCorrelationResponse {
  const blankResults: [boolean, boolean] = [
    userAnswers[0].trim().toLowerCase() === correctAnswers[0].trim().toLowerCase(),
    userAnswers[1].trim().toLowerCase() === correctAnswers[1].trim().toLowerCase(),
  ];
  const isCorrect = blankResults[0] && blankResults[1];

  if (isCorrect) {
    return {
      isCorrect: true,
      blankResults,
      feedback: `✅ Correto! "${correctAnswers[0]}" e "${correctAnswers[1]}" formam a correlação verbal correta.`,
      feedbackType: "correct",
    };
  }

  const wrongParts: string[] = [];
  if (!blankResults[0]) wrongParts.push(`a 1ª lacuna deveria ser "${correctAnswers[0]}"`);
  if (!blankResults[1]) wrongParts.push(`a 2ª lacuna deveria ser "${correctAnswers[1]}"`);

  return {
    isCorrect: false,
    blankResults,
    feedback: `Resposta incorreta: ${wrongParts.join(" e ")}.`,
    feedbackType: "other",
  };
}

function normalizeCheckResponse(parsed: unknown): CheckCorrelationResponse | null {
  if (!parsed || typeof parsed !== "object") return null;
  const d = parsed as Partial<CheckCorrelationResponse>;
  const validTypes: FeedbackType[] = ["correct", "typo", "wrong_tense", "wrong_person", "other"];
  if (typeof d.isCorrect !== "boolean" || !d.feedback || !d.feedbackType) return null;
  if (!Array.isArray(d.blankResults) || d.blankResults.length !== 2) return null;
  if (!validTypes.includes(d.feedbackType as FeedbackType)) return null;
  return d as CheckCorrelationResponse;
}

const systemPrompt = `Você é um professor de português brasileiro especializado em Correlação Verbal. Avalie se as duas respostas do usuário completam corretamente as duas lacunas de uma frase, respeitando o par de tempos verbais correlacionados.
Sempre responda SOMENTE em JSON, sem markdown.`;

function buildUserPrompt(
  sentence: string,
  pairLabel: string,
  verbs: [{ infinitive: string; tense: string; correctAnswer: string }, { infinitive: string; tense: string; correctAnswer: string }],
  userAnswers: [string, string]
): string {
  return `A frase era: "${sentence}"
O par de correlação verbal usado era: "${pairLabel}"
1º verbo: "${verbs[0].infinitive}" no tempo "${verbs[0].tense}", resposta correta: "${verbs[0].correctAnswer}"
2º verbo: "${verbs[1].infinitive}" no tempo "${verbs[1].tense}", resposta correta: "${verbs[1].correctAnswer}"
O usuário respondeu: 1ª lacuna = "${userAnswers[0]}", 2ª lacuna = "${userAnswers[1]}"

Avalie e retorne SOMENTE este JSON:
{
  "isCorrect": true ou false,
  "blankResults": [true ou false, true ou false],
  "feedbackType": "correct" | "typo" | "wrong_tense" | "other",
  "feedback": "Mensagem curta e didática para o usuário (máximo 3 frases), explicando qual lacuna errou e por quê, se for o caso."
}

Regras para feedbackType:
- "correct": ambas as respostas corretas
- "typo": pelo menos uma resposta tem apenas 1 caractere diferente do correto (erro de digitação)
- "wrong_tense": o usuário conjugou algum verbo corretamente mas em outro tempo verbal, quebrando a correlação
- "other": erro gramatical de outra natureza`;
}

export async function POST(request: Request) {
  try {
    const { sentence, pairLabel, verbs, userAnswers } = await request.json();

    if (
      !sentence ||
      !pairLabel ||
      !Array.isArray(verbs) ||
      verbs.length !== 2 ||
      !Array.isArray(userAnswers) ||
      userAnswers.length !== 2
    ) {
      return NextResponse.json({ error: "Dados incompletos." }, { status: 400 });
    }

    const verbsTuple = verbs as [CorrelationVerb, CorrelationVerb];
    const userAnswersTuple = userAnswers as [string, string];

    const xaiKey =
      request.headers.get("x-grok-api-key") ||
      process.env.GROK_API_KEY ||
      process.env.XAI_API_KEY;
    const geminiKey =
      request.headers.get("x-gemini-api-key") || process.env.GEMINI_API_KEY;
    const openaiKey =
      request.headers.get("x-openai-api-key") || process.env.OPENAI_API_KEY;

    let result: CheckCorrelationResponse | null = null;

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
              { role: "user", content: buildUserPrompt(sentence, pairLabel, verbsTuple, userAnswersTuple) },
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
          console.error("check-correlation: Grok error", sanitize(await res.text()));
        }
      } catch (e) {
        console.error("check-correlation: Grok exception", e);
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
                    { text: systemPrompt + "\n\n" + buildUserPrompt(sentence, pairLabel, verbsTuple, userAnswersTuple) },
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
          console.error("check-correlation: Gemini error", sanitize(await res.text()));
        }
      } catch (e) {
        console.error("check-correlation: Gemini exception", e);
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
              { role: "user", content: buildUserPrompt(sentence, pairLabel, verbsTuple, userAnswersTuple) },
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
          console.error("check-correlation: OpenAI error", sanitize(await res.text()));
        }
      } catch (e) {
        console.error("check-correlation: OpenAI exception", e);
      }
    }

    // ── Fallback: simple string comparison ───────────────────────────────────
    if (!result) {
      result = simpleCheck(
        userAnswersTuple,
        [verbsTuple[0].correctAnswer, verbsTuple[1].correctAnswer]
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("check-correlation route error:", error);
    return NextResponse.json(
      { error: "Erro interno ao verificar resposta." },
      { status: 500 }
    );
  }
}
