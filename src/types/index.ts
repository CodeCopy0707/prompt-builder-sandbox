
export interface ComponentData {
  html: string;
  css: string;
  javascript: string;
}

export interface GeminiResponse {
  html: string;
  css: string;
  javascript: string;
  explanation: string;
}

export interface PromptHistory {
  id: string;
  prompt: string;
  response: GeminiResponse;
  createdAt: Date;
}
