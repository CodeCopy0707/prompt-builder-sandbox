
import { useState } from "react";
import { Loader2, Send, Sparkles, HelpCircle } from "lucide-react";
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
    "Create a responsive pricing card with a hover effect, featuring a title, price, list of features, and a CTA button",
    "Design a navigation menu with dropdown submenus and mobile responsiveness",
    "Build a login form with validation and a 'forgot password' link"
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
              Describe the component you want to build
              
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
                      Be specific about design elements, functionality, and any special features you want included.
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
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-foreground/60 mt-1">Try:</span>
            {examplePrompts.map((example, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleExampleClick(example)}
                className="text-xs px-2 py-1 bg-secondary/50 hover:bg-secondary rounded-md text-foreground/80"
              >
                {example.length > 30 ? example.substring(0, 30) + '...' : example}
              </button>
            ))}
          </div>
          
          <Button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className={`px-6 sm:w-auto w-full ${
              isLoading || !prompt.trim() 
                ? "bg-muted text-muted-foreground" 
                : "bg-primary text-white hover:bg-primary/90"
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin mr-2" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Send size={18} className="mr-2" />
                <span>Generate Component</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PromptInput;
