
import { useState, useEffect } from "react";
import { Loader2, Send, Sparkles, HelpCircle, ArrowRight, Command, Lightbulb, History, Bookmark } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PromptInputProps {
  onSubmit: (prompt: string) => Promise<void>;
  isLoading: boolean;
}

const PromptInput = ({ onSubmit, isLoading }: PromptInputProps) => {
  const [prompt, setPrompt] = useState("");
  const [savedPrompts, setSavedPrompts] = useState<string[]>([]);
  const [promptHistory, setPromptHistory] = useState<string[]>([]);

  useEffect(() => {
    // Load saved prompts from localStorage
    const savedPromptsFromStorage = localStorage.getItem("savedPrompts");
    if (savedPromptsFromStorage) {
      setSavedPrompts(JSON.parse(savedPromptsFromStorage));
    }

    // Load prompt history from localStorage
    const promptHistoryFromStorage = localStorage.getItem("promptHistory");
    if (promptHistoryFromStorage) {
      setPromptHistory(JSON.parse(promptHistoryFromStorage));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }
    
    try {
      // Save to history
      const newHistory = [prompt, ...promptHistory.slice(0, 19)]; // Keep only last 20
      setPromptHistory(newHistory);
      localStorage.setItem("promptHistory", JSON.stringify(newHistory));
      
      await onSubmit(prompt);
      // Don't clear the prompt in case user wants to modify and try again
    } catch (error) {
      console.error("Error submitting prompt:", error);
    }
  };

  const savePrompt = () => {
    if (!prompt.trim()) return;
    const newSavedPrompts = [...savedPrompts, prompt];
    setSavedPrompts(newSavedPrompts);
    localStorage.setItem("savedPrompts", JSON.stringify(newSavedPrompts));
    toast.success("Prompt saved for future use");
  };

  const examplePrompts = [
    "Create a responsive pricing card with a hover effect",
    "Build a testimonial carousel with user avatars",
    "Design a contact form with validation and error states",
    "Create a notification dropdown with unread indicators",
    "Design a dashboard card with stats and a mini chart"
  ];

  const promptTemplates = [
    {
      title: "UI Component",
      prompt: "Create a [COMPONENT_TYPE] with [COLOR_SCHEME] colors featuring [FEATURES]. Make it responsive and add hover effects."
    },
    {
      title: "Form Input",
      prompt: "Design a [INPUT_TYPE] form field with validation for [VALIDATION_RULES]. Include error states and success feedback."
    },
    {
      title: "Card Layout",
      prompt: "Create a [CARD_TYPE] card with [HEADER_CONTENT], [BODY_CONTENT], and [FOOTER_CONTENT]. Use [COLOR_SCHEME] colors."
    }
  ];

  const handleExampleClick = (example: string) => {
    setPrompt(example);
  };

  const handleTemplateClick = (template: string) => {
    setPrompt(template);
  };

  const handleHistoryClick = (historyItem: string) => {
    setPrompt(historyItem);
  };

  const handleSavedPromptClick = (savedPrompt: string) => {
    setPrompt(savedPrompt);
  };

  const removeSavedPrompt = (index: number) => {
    const newSavedPrompts = [...savedPrompts];
    newSavedPrompts.splice(index, 1);
    setSavedPrompts(newSavedPrompts);
    localStorage.setItem("savedPrompts", JSON.stringify(newSavedPrompts));
    toast.success("Prompt removed");
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
                  <TooltipContent className="max-w-xs">
                    <p className="text-sm">
                      Be specific about design, functionality, and features you want included.
                      Include color schemes, responsive behavior, and interactions.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </label>
            
            <div className="flex items-center gap-2">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline" size="sm" className="text-xs h-7 gap-1.5">
                    <Command size={14} />
                    <span className="hidden sm:inline">Prompt Library</span>
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader className="text-left">
                    <DrawerTitle>Prompt Library</DrawerTitle>
                    <DrawerDescription>
                      Use our collection of prompts to help you create components
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="px-4 pb-4">
                    <Tabs defaultValue="examples">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="examples" className="text-xs">Examples</TabsTrigger>
                        <TabsTrigger value="templates" className="text-xs">Templates</TabsTrigger>
                        <TabsTrigger value="saved" className="text-xs">Your Prompts</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="examples" className="mt-4">
                        <div className="grid gap-2">
                          {examplePrompts.map((example, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              className="justify-start h-auto py-2 px-3 text-left font-normal"
                              onClick={() => handleExampleClick(example)}
                            >
                              <Lightbulb size={14} className="mr-2 text-primary flex-shrink-0" />
                              <span className="text-xs">{example}</span>
                            </Button>
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="templates" className="mt-4">
                        <div className="grid gap-2">
                          {promptTemplates.map((template, index) => (
                            <div key={index} className="border rounded-md p-3">
                              <div className="flex justify-between items-center mb-1">
                                <h4 className="font-medium text-sm">{template.title}</h4>
                                <Button 
                                  size="sm"
                                  variant="ghost"
                                  className="h-6 w-6 p-0"
                                  onClick={() => handleTemplateClick(template.prompt)}
                                >
                                  <ArrowRight size={14} />
                                </Button>
                              </div>
                              <p className="text-xs text-muted-foreground">{template.prompt}</p>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="saved" className="mt-4">
                        {savedPrompts.length > 0 ? (
                          <div className="grid gap-2">
                            {savedPrompts.map((savedPrompt, index) => (
                              <div key={index} className="border rounded-md p-3 flex items-start justify-between">
                                <button 
                                  className="text-left text-xs mr-2"
                                  onClick={() => handleSavedPromptClick(savedPrompt)}
                                >
                                  {savedPrompt}
                                </button>
                                <Button 
                                  size="sm"
                                  variant="ghost"
                                  className="h-6 w-6 p-0 flex-shrink-0"
                                  onClick={() => removeSavedPrompt(index)}
                                >
                                  <span className="sr-only">Remove</span>
                                  ✕
                                </Button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-6">
                            <Bookmark className="h-10 w-10 text-muted-foreground/30 mx-auto mb-2" />
                            <p className="text-sm text-muted-foreground">
                              You don't have any saved prompts yet
                            </p>
                          </div>
                        )}
                      </TabsContent>
                    </Tabs>
                  </div>
                </DrawerContent>
              </Drawer>
              
              {promptHistory.length > 0 && (
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant="outline" size="sm" className="text-xs h-7 gap-1.5">
                      <History size={14} />
                      <span className="hidden sm:inline">History</span>
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader className="text-left">
                      <DrawerTitle>Prompt History</DrawerTitle>
                      <DrawerDescription>
                        Your recently used prompts
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="px-4 pb-4">
                      <div className="grid gap-2 max-h-80 overflow-y-auto">
                        {promptHistory.map((historyItem, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            className="justify-start h-auto py-2 px-3 text-left font-normal"
                            onClick={() => handleHistoryClick(historyItem)}
                          >
                            <span className="text-xs truncate">{historyItem}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </DrawerContent>
                </Drawer>
              )}
            </div>
          </div>
          
          <div className="relative">
            <Textarea
              id="prompt"
              placeholder="E.g., Create a responsive pricing card with a hover effect, featuring a title, price, list of features, and a CTA button."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full h-32 resize-none focus:ring-primary/20 focus:border-primary pr-24"
              disabled={isLoading}
            />
            {prompt && (
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="absolute right-12 top-2 h-7 text-xs"
                onClick={savePrompt}
                disabled={isLoading}
              >
                <Bookmark size={14} className="mr-1" />
                Save
              </Button>
            )}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-foreground/60">Try:</span>
            {examplePrompts.slice(0, 3).map((example, index) => (
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
