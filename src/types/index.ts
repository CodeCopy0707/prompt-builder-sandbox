
export interface GeminiResponse {
  html: string;
  css: string;
  javascript: string;
  explanation: string;
}

export interface ComponentData {
  html: string;
  css: string;
  javascript: string;
}

export interface TechStack {
  id: string;
  name: string;
  description: string;
  category: "frontend" | "backend" | "database" | "visualization";
}

export interface AIModel {
  id: string;
  name: string;
  description: string;
  context: number;
  latency: "low" | "medium" | "high";
  quality: "medium" | "high" | "highest";
}

export interface ProjectMetrics {
  componentsGenerated: number;
  apiEndpoints: number;
  codeQualityScore: number;
  performanceScore: number;
}

export interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  available?: boolean;
  coming?: boolean;
}
