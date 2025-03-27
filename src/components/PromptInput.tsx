
import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";

interface PromptInputProps {
  onSubmit: (prompt: string) => Promise<void>;
  isLoading: boolean;
}

const PromptInput = ({ onSubmit, isLoading }: PromptInputProps) => {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }
    
    try {
      await onSubmit(prompt);
      // Don't clear the prompt in case user wants to modify and try again
    } catch (error) {
      console.error("Error submitting prompt:", error);
    }
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-sm border border-border animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="prompt" className="text-sm font-medium text-foreground/80">
            Describe the component you want to build
          </label>
          <textarea
            id="prompt"
            placeholder="E.g., Create a responsive pricing card with a hover effect, featuring a title, price, list of features, and a CTA button."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full h-32 p-3 bg-background rounded-md border border-input focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
            disabled={isLoading}
          />
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className={`px-4 py-2 rounded-md flex items-center gap-2 transition-all ${
              isLoading || !prompt.trim() 
                ? "bg-muted text-muted-foreground cursor-not-allowed" 
                : "bg-primary text-white hover:bg-primary/90"
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Send size={18} />
                <span>Generate</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PromptInput;
