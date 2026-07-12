export function getApiKeys() {
  if (typeof window === "undefined") return {};
  return {
    grokKey: localStorage.getItem("grok_api_key") || "",
    geminiKey: localStorage.getItem("gemini_api_key") || "",
    openaiKey: localStorage.getItem("openai_api_key") || "",
  };
}

export async function fetchWithApiKeys(url: string, body: unknown): Promise<Response> {
  const { grokKey, geminiKey, openaiKey } = getApiKeys();
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(grokKey ? { "x-grok-api-key": grokKey } : {}),
      ...(geminiKey ? { "x-gemini-api-key": geminiKey } : {}),
      ...(openaiKey ? { "x-openai-api-key": openaiKey } : {}),
    },
    body: JSON.stringify(body),
  });
}
