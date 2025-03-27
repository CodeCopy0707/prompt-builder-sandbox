
import { useState } from "react";
import PromptInput from "./PromptInput";
import Preview from "./Preview";
import CodePreview from "./CodePreview";
import { ComponentData, GeminiResponse } from "@/types";
import { generateComponent } from "@/utils/gemini";
import { toast } from "sonner";
import { SparklesIcon } from "lucide-react";

const BuilderLayout = () => {
  const [componentData, setComponentData] = useState<ComponentData | null>(null);
  const [explanation, setExplanation] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePromptSubmit = async (prompt: string) => {
    setIsLoading(true);
    
    try {
      const response = await generateComponent(prompt);
      
      if (!response.html && !response.css && !response.javascript) {
        toast.error("Failed to generate component. Please try a different prompt.");
        return;
      }
      
      setComponentData({
        html: response.html,
        css: response.css,
        javascript: response.javascript
      });
      
      setExplanation(response.explanation);
      toast.success("Component generated successfully!");
    } catch (error) {
      console.error("Error generating component:", error);
      toast.error("An error occurred while generating the component.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 pt-24 pb-16 animate-fade-in">
      <div className="mb-8 text-center">
        <div className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
          <div className="flex items-center gap-1">
            <SparklesIcon size={14} />
            <span>Powered by Google Gemini</span>
          </div>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">
          Build Components with AI
        </h1>
        <p className="text-foreground/70 max-w-2xl mx-auto">
          Describe the component you want to create, and our AI will generate it instantly.
          Preview the result and get the code to use in your project.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <div className="space-y-6">
          <PromptInput onSubmit={handlePromptSubmit} isLoading={isLoading} />
          <Preview componentData={componentData} />
        </div>
        
        <div>
          <CodePreview componentData={componentData} explanation={explanation} />
        </div>
      </div>
    </div>
  );
};

export default BuilderLayout;
