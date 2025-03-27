
import { GeminiResponse } from "@/types";
import { toast } from "sonner";

const API_KEY = "AIzaSyDc7u7wTVdDG3zP18xnELKs0HX7-hImkmc";
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

const systemPrompt = `
You are a component builder AI. You create high-quality, functional React components based on user prompts.
You must always return a response in the following JSON format:
{
  "html": "<!-- HTML code here, escaped properly for JSON -->",
  "css": "/* CSS code here, escaped properly for JSON */",
  "javascript": "// JavaScript code here, escaped properly for JSON",
  "explanation": "Brief explanation of the component"
}

The component should be responsive, accessible, and follow modern web development best practices.
Include all necessary imports in the JavaScript section.
Ensure the CSS is well-organized and the HTML is semantic.
Do not include React import statements, they will be added automatically.
Use Tailwind CSS for styling when possible.
`;

export async function generateComponent(prompt: string): Promise<GeminiResponse> {
  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: systemPrompt }]
          },
          {
            role: 'user',
            parts: [{ text: prompt }]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          topK: 32,
          topP: 0.95,
          maxOutputTokens: 8192,
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    // Extract the text from the response
    const generatedText = data.candidates[0].content.parts[0].text;
    
    // Find the JSON part within the text
    const jsonMatch = generatedText.match(/```json\n([\s\S]*?)\n```/) || 
                      generatedText.match(/{[\s\S]*?}/);
    
    if (!jsonMatch) {
      throw new Error("Failed to extract JSON from response");
    }
    
    // Parse the JSON
    let jsonStr = jsonMatch[0];
    if (jsonStr.startsWith('```json')) {
      jsonStr = jsonMatch[1];
    }
    
    const parsedResponse = JSON.parse(jsonStr);
    
    return {
      html: parsedResponse.html || "",
      css: parsedResponse.css || "",
      javascript: parsedResponse.javascript || "",
      explanation: parsedResponse.explanation || "No explanation provided"
    };
  } catch (error) {
    console.error("Error generating component:", error);
    toast.error("Failed to generate component. Please try again.");
    return {
      html: "",
      css: "",
      javascript: "",
      explanation: "Error generating component. Please try again."
    };
  }
}
