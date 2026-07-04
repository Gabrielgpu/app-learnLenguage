import { NextResponse } from "next/server";
import { mockQuestions, Question } from "@/lib/mockQuestions";
import { getRandomCachedQuestion, saveQuestionToCache } from "@/lib/quizCache";
import { toTenseCode } from "@/lib/tenseMapping";

function sanitizeApiError(message: string) {
  return message
    .replace(/xai-[A-Za-z0-9_-]+/g, "[redacted-api-key]")
    .replace(/sk-[A-Za-z0-9_-]+/g, "[redacted-api-key]")
    .replace(/\s+/g, " ")
    .slice(0, 240);
}

const questionSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    question: { type: "string" },
    options: {
      type: "array",
      minItems: 5,
      maxItems: 5,
      items: { type: "string" },
    },
    correctAnswer: {
      type: "string",
      enum: ["A", "B", "C", "D", "E"],
    },
    explanation: { type: "string" },
  },
  required: ["question", "options", "correctAnswer", "explanation"],
};

async function getApiError(response: Response) {
  const contentType = response.headers.get("content-type") || "";

  try {
    if (contentType.includes("application/json")) {
      const data = await response.json();
      const message =
        data?.error?.message ||
        data?.error ||
        data?.message ||
        JSON.stringify(data);

      return sanitizeApiError(String(message));
    }

    return sanitizeApiError(await response.text());
  } catch {
    return "Nao foi possivel ler o corpo do erro da API.";
  }
}

function normalizeQuestionData(parsed: unknown): Question | null {
  if (!parsed || typeof parsed !== "object") return null;

  const data = parsed as Partial<Question>;
  if (!data.question || !Array.isArray(data.options) || !data.correctAnswer || !data.explanation) {
    return null;
  }

  let correctLetter = data.correctAnswer.trim().substring(0, 1).toUpperCase();
  if (!["A", "B", "C", "D", "E"].includes(correctLetter)) {
    correctLetter = "A";
  }

  return {
    question: data.question,
    options: data.options,
    correctAnswer: correctLetter,
    explanation: data.explanation,
  };
}

function extractOpenAIOutputText(data: unknown) {
  if (!data || typeof data !== "object") return "";

  const response = data as {
    output_text?: unknown;
    output?: Array<{
      content?: Array<{
        text?: unknown;
        type?: unknown;
      }>;
    }>;
  };

  if (typeof response.output_text === "string") {
    return response.output_text;
  }

  return (
    response.output
      ?.flatMap((item) => item.content || [])
      .filter((content) => content.type === "output_text" && typeof content.text === "string")
      .map((content) => content.text)
      .join("") || ""
  );
}

export async function POST(request: Request) {
  try {
    const { verbTense, excludeTexts = [] } = await request.json();
    
    if (!verbTense || !mockQuestions[verbTense]) {
      return NextResponse.json(
        { error: "Tempo verbal inválido ou não fornecido." },
        { status: 400 }
      );
    }

    const xaiApiKey = request.headers.get("x-grok-api-key") || process.env.GROK_API_KEY || process.env.XAI_API_KEY;
    const geminiApiKey = request.headers.get("x-gemini-api-key") || process.env.GEMINI_API_KEY;
    const openaiApiKey = request.headers.get("x-openai-api-key") || process.env.OPENAI_API_KEY;

    let questionData: Question | null = null;
    let dataSource = "mock";
    let aiProviderAttempted = "none";
    let aiFailureReason = "";

    if (xaiApiKey) {
      aiProviderAttempted = "grok";
      try {
        const response = await fetch("https://api.x.ai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${xaiApiKey}`,
          },
          body: JSON.stringify({
            model: "grok-4.3",
            messages: [
              {
                role: "system",
                content: `Você é um professor de português especialista em concursos públicos brasileiros (VUNESP, FGV e CEBRASPE). 
Sua tarefa é gerar uma questão inédita de múltipla escolha sobre o tempo verbal indicado pelo usuário.
Regras:
1. Contexto de prova de concurso (pode incluir um pequeno fragmento de texto).
2. Forneça exatamente 5 alternativas (A a E) no formato: ["A) Texto da alternativa", "B) Texto da alternativa", ...].
3. Exatamente 1 alternativa deve ser correta.
4. Nível intermediário/avançado de concurso.
5. Forneça uma explicação gramatical detalhada e didática justificando a resposta correta e refutando as incorretas.
6. A resposta DEVE ser um objeto JSON válido, sem crases de bloco de código markdown.`
              },
              {
                role: "user",
                content: `Gere uma questão de múltipla escolha em formato JSON sobre o tempo verbal: ${verbTense}.
A resposta deve seguir rigidamente este esquema:
{
  "question": "Texto do enunciado da questão...",
  "options": ["A) ...", "B) ...", "C) ...", "D) ...", "E) ..."],
  "correctAnswer": "A letra correspondente da correta (A, B, C, D ou E)",
  "explanation": "Explicação gramatical..."
}
${excludeTexts && excludeTexts.length > 0 ? `\nATENÇÃO: Evite a todo custo gerar questões repetidas. NÃO use contextos ou enunciados similares a estes que já foram exibidos ao usuário nesta sessão:\n${excludeTexts.map((t: string) => `- ${t}`).join("\n")}` : ""}`
              }
            ],
            response_format: { type: "json_object" },
            temperature: 0.7,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const parsed = JSON.parse(data.choices[0].message.content);
          const normalizedQuestion = normalizeQuestionData(parsed);
          if (normalizedQuestion) {
            questionData = normalizedQuestion;
            dataSource = "grok";
          }
        } else {
          aiFailureReason = `Grok/xAI retornou HTTP ${response.status}: ${await getApiError(response)}`;
          console.error(aiFailureReason);
        }
      } catch (err) {
        aiFailureReason = `Erro ao chamar a API da Grok/xAI: ${err instanceof Error ? err.message : String(err)}`;
        console.error(aiFailureReason);
      }
    } else if (geminiApiKey) {
      aiProviderAttempted = "gemini";
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiApiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              contents: [
                {
                  role: "user",
                  parts: [
                    {
                      text: `Você é um professor de português especialista em concursos públicos brasileiros (VUNESP, FGV e CEBRASPE). 
Gere uma questão inédita de múltipla escolha sobre o tempo verbal: ${verbTense}.
Regras:
1. Contexto de prova de concurso (com um pequeno texto ou frase de enunciado).
2. Forneça exatamente 5 alternativas (A a E) no formato: ["A) Texto da alternativa", "B) Texto da alternativa", ...].
3. Apenas 1 alternativa deve ser correta.
4. Forneça uma explicação gramatical clara de por que a resposta está certa e as outras erradas.
5. Retorne os dados EXATAMENTE no seguinte formato JSON (não adicione formatação markdown como \`\`\`json):
{
  "question": "Texto do enunciado da questão...",
  "options": ["A) ...", "B) ...", "C) ...", "D) ...", "E) ..."],
  "correctAnswer": "Apenas a letra da correta (A, B, C, D ou E)",
  "explanation": "Explicação gramatical..."
}
${excludeTexts && excludeTexts.length > 0 ? `\nATENÇÃO: Evite a todo custo gerar questões repetidas. NÃO use contextos ou enunciados similares a estes que já foram exibidos ao usuário nesta sessão:\n${excludeTexts.map((t: string) => `- ${t}`).join("\n")}` : ""}`
                    }
                  ]
                }
              ],
              generationConfig: {
                responseMimeType: "application/json",
                temperature: 0.7,
              }
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const text = data.candidates[0].content.parts[0].text;
          const parsed = JSON.parse(text);
          const normalizedQuestion = normalizeQuestionData(parsed);
          if (normalizedQuestion) {
            questionData = normalizedQuestion;
            dataSource = "gemini";
          }
        } else {
          aiFailureReason = `Gemini retornou HTTP ${response.status}: ${await getApiError(response)}`;
          console.error(aiFailureReason);
        }
      } catch (err) {
        aiFailureReason = `Erro ao chamar a API do Gemini: ${err instanceof Error ? err.message : String(err)}`;
        console.error(aiFailureReason);
      }
    } else if (openaiApiKey) {
      aiProviderAttempted = "openai";
      try {
        const response = await fetch("https://api.openai.com/v1/responses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${openaiApiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-5.4-mini",
            input: [
              {
                role: "system",
                content: `Você é um professor de português especialista em concursos públicos brasileiros (VUNESP, FGV e CEBRASPE).
Sua tarefa é gerar uma questão inédita de múltipla escolha sobre o tempo verbal indicado pelo usuário.
Regras:
1. Contexto de prova de concurso (pode incluir um pequeno fragmento de texto).
2. Forneça exatamente 5 alternativas (A a E) no formato: ["A) Texto da alternativa", "B) Texto da alternativa", ...].
3. Exatamente 1 alternativa deve ser correta.
4. Nível intermediário/avançado de concurso.
5. Forneça uma explicação gramatical detalhada e didática justificando a resposta correta e refutando as incorretas.`,
              },
              {
                role: "user",
                content: `Gere uma questão de múltipla escolha sobre o tempo verbal: ${verbTense}.
${excludeTexts && excludeTexts.length > 0 ? `\nATENÇÃO: Evite a todo custo gerar questões repetidas. NÃO use contextos ou enunciados similares a estes que já foram exibidos ao usuário nesta sessão:\n${excludeTexts.map((t: string) => `- ${t}`).join("\n")}` : ""}`,
              },
            ],
            store: false,
            text: {
              format: {
                type: "json_schema",
                name: "grammar_question",
                strict: true,
                schema: questionSchema,
              },
            },
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const text = extractOpenAIOutputText(data);
          const parsed = JSON.parse(text);
          const normalizedQuestion = normalizeQuestionData(parsed);
          if (normalizedQuestion) {
            questionData = normalizedQuestion;
            dataSource = "openai";
          }
        } else {
          aiFailureReason = `OpenAI retornou HTTP ${response.status}: ${await getApiError(response)}`;
          console.error(aiFailureReason);
        }
      } catch (err) {
        aiFailureReason = `Erro ao chamar a API da OpenAI: ${err instanceof Error ? err.message : String(err)}`;
        console.error(aiFailureReason);
      }
    }

    const tenseCode = toTenseCode(verbTense);
    if (questionData && dataSource !== "mock" && tenseCode) {
      await saveQuestionToCache(tenseCode, questionData, dataSource);
    }

    if (!questionData && tenseCode) {
      const cachedQuestion = await getRandomCachedQuestion(tenseCode, excludeTexts);
      if (cachedQuestion) {
        questionData = cachedQuestion;
        dataSource = "cache";
      }
    }

    if (!questionData) {
      const list = mockQuestions[verbTense];
      let filteredList = list.filter((q) => !excludeTexts.includes(q.question));
      if (filteredList.length === 0) {
        filteredList = list;
      }
      const randomIndex = Math.floor(Math.random() * filteredList.length);
      questionData = filteredList[randomIndex];
      dataSource = "mock";
    }

    return NextResponse.json(questionData, {
      headers: {
        "x-data-source": dataSource,
        "x-ai-provider-attempted": aiProviderAttempted,
        ...(aiFailureReason ? { "x-ai-failure-reason": sanitizeApiError(aiFailureReason) } : {}),
      },
    });

  } catch (error) {
    console.error("Erro interno na rota generate-question:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}
