
import { useState } from "react";
import { Loader2, Send, Sparkles, HelpCircle, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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

  const examplePrompts = [
    "Create a responsive pricing card with a hover effect",
    "Build a testimonial carousel with user avatars",
    "Design a contact form with validation and error states"
  ];

  const handleExampleClick = (example: string) => {
    setPrompt(example);
  };

  return (
    <div className="w-full animate-fade-in">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="prompt" className="text-sm font-medium text-foreground flex items-center gap-2">
              <Sparkles size={16} className="text-primary" />
              Describe your component
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-full">
                      <HelpCircle size={14} />
                      <span className="sr-only">Help</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">
                      Be specific about design, functionality, and features you want included.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </label>
          </div>
          
          <Textarea
            id="prompt"
            placeholder="E.g., Create a responsive pricing card with a hover effect, featuring a title, price, list of features, and a CTA button."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full h-32 resize-none focus:ring-primary/20 focus:border-primary"
            disabled={isLoading}
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-foreground/60">Try:</span>
            {examplePrompts.map((example, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleExampleClick(example)}
                className="text-xs px-2 py-1 bg-secondary/50 hover:bg-secondary rounded-md text-foreground/80 transition-colors"
              >
                {example.length > 30 ? example.substring(0, 30) + '...' : example}
              </button>
            ))}
          </div>
          
          <Button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="px-6 sm:w-auto w-full transition-all"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin mr-2" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <span>Generate Component</span>
                <ArrowRight size={18} className="ml-2" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PromptInput;
