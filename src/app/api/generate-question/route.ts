import { NextResponse } from "next/server";
import { mockQuestions, Question } from "@/lib/mockQuestions";

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

    let questionData: Question | null = null;
    let dataSource = "mock";

    if (xaiApiKey) {
      try {
        const response = await fetch("https://api.x.ai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${xaiApiKey}`,
          },
          body: JSON.stringify({
            model: "grok-2-1212",
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
          if (parsed.question && Array.isArray(parsed.options) && parsed.correctAnswer && parsed.explanation) {
            // Standardize correctAnswer to be just the letter
            let correctLetter = parsed.correctAnswer.trim().substring(0, 1).toUpperCase();
            if (!["A", "B", "C", "D", "E"].includes(correctLetter)) {
              correctLetter = "A"; // Fallback
            }
            questionData = {
              question: parsed.question,
              options: parsed.options,
              correctAnswer: correctLetter,
              explanation: parsed.explanation,
            };
            dataSource = "grok";
          }
        }
      } catch (err) {
        console.error("Erro ao chamar a API da Grok/xAI:", err);
      }
    } else if (geminiApiKey) {
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
          if (parsed.question && Array.isArray(parsed.options) && parsed.correctAnswer && parsed.explanation) {
            let correctLetter = parsed.correctAnswer.trim().substring(0, 1).toUpperCase();
            if (!["A", "B", "C", "D", "E"].includes(correctLetter)) {
              correctLetter = "A";
            }
            questionData = {
              question: parsed.question,
              options: parsed.options,
              correctAnswer: correctLetter,
              explanation: parsed.explanation,
            };
            dataSource = "gemini";
          }
        }
      } catch (err) {
        console.error("Erro ao chamar a API do Gemini:", err);
      }
    }

    // Fallback if no keys or API call failed
    if (!questionData) {
      const list = mockQuestions[verbTense];
      // Filter out already used mock questions to avoid repeat in demo mode
      let filteredList = list.filter((q) => !excludeTexts.includes(q.question));
      if (filteredList.length === 0) {
        filteredList = list;
      }
      const randomIndex = Math.floor(Math.random() * filteredList.length);
      questionData = filteredList[randomIndex];
      dataSource = "mock";
    }

    // Return the response with data-source header
    return NextResponse.json(questionData, {
      headers: {
        "x-data-source": dataSource,
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
