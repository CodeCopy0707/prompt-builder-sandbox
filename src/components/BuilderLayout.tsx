
import { useState } from "react";
import PromptInput from "./PromptInput";
import Preview from "./Preview";
import CodePreview from "./CodePreview";
import { ComponentData } from "@/types";
import { generateComponent } from "@/utils/gemini";
import { toast } from "sonner";
import { SparklesIcon, Wand2, LightbulbIcon, BookOpenIcon, LayoutPanelTop, Code } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";

const BuilderLayout = () => {
  const [componentData, setComponentData] = useState<ComponentData | null>(null);
  const [explanation, setExplanation] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("preview");
  const [history, setHistory] = useState<{prompt: string, data: ComponentData}[]>([]);
  const [showTips, setShowTips] = useState(true);

  const handlePromptSubmit = async (prompt: string) => {
    setIsLoading(true);
    
    try {
      const response = await generateComponent(prompt);
      
      if (!response.html && !response.css && !response.javascript) {
        toast.error("Failed to generate component. Please try a different prompt.");
        return;
      }
      
      // Store in history
      setHistory(prev => [
        {prompt, data: {
          html: response.html,
          css: response.css,
          javascript: response.javascript
        }},
        ...prev.slice(0, 9) // Keep last 10 entries
      ]);
      
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

  const loadFromHistory = (index: number) => {
    const item = history[index];
    setComponentData(item.data);
    toast.success("Loaded previous component");
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-16">
      <div className="mb-8 md:mb-12 text-center">
        <div className="inline-flex items-center px-3 py-1.5 mb-4 rounded-full bg-primary/10 text-primary text-sm font-medium">
          <SparklesIcon size={16} className="mr-2" />
          <span>AI Component Builder</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">
          Create Any Component with AI
        </h2>
        <p className="text-foreground/70 max-w-2xl mx-auto">
          Describe the component you want to create, and our AI will generate it instantly.
          Preview the result and get the code to use in your project.
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-8">
        <div className="bg-card border border-border p-6 rounded-xl shadow-sm">
          {showTips && (
            <div className="mb-4">
              <Alert className="bg-primary/5 border-primary/20 animate-fade-in">
                <LightbulbIcon className="h-4 w-4 text-primary" />
                <AlertDescription className="text-xs">
                  <span className="font-medium">Pro Tip:</span> Be specific about colors, layouts, and functionality in your prompts for better results.
                  <Button variant="link" size="sm" className="p-0 h-auto text-xs" onClick={() => setShowTips(false)}>
                    Dismiss
                  </Button>
                </AlertDescription>
              </Alert>
            </div>
          )}
          <PromptInput onSubmit={handlePromptSubmit} isLoading={isLoading} />
        </div>
        
        {componentData && (
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="px-6 pt-6 flex items-center justify-between">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="preview" className="flex items-center gap-2">
                    <Wand2 size={16} />
                    Live Preview
                  </TabsTrigger>
                  <TabsTrigger value="code" className="flex items-center gap-2">
                    <Code size={16} />
                    Code & Explanation
                  </TabsTrigger>
                </TabsList>
                
                {history.length > 0 && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="ml-4 hidden md:flex items-center gap-1.5">
                        <BookOpenIcon size={14} />
                        <span>History</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Generation History</DialogTitle>
                      </DialogHeader>
                      <div className="max-h-96 overflow-y-auto">
                        {history.map((item, i) => (
                          <div key={i} className="border-b py-3 last:border-0">
                            <p className="text-sm font-medium truncate">{item.prompt}</p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-muted-foreground">
                                {new Date().toLocaleDateString()}
                              </span>
                              <Button size="sm" variant="ghost" onClick={() => loadFromHistory(i)}>
                                <LayoutPanelTop size={14} className="mr-1" />
                                Load
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </div>
              
              <TabsContent value="preview" className="p-6 pt-2">
                <Preview componentData={componentData} />
              </TabsContent>
              
              <TabsContent value="code" className="p-6 pt-2">
                <CodePreview componentData={componentData} explanation={explanation} />
              </TabsContent>
            </Tabs>
          </div>
        )}
        
        {!componentData && !isLoading && (
          <div className="bg-card border border-border rounded-xl shadow-sm p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="bg-primary/10 p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Wand2 size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Your Components Will Appear Here</h3>
              <p className="text-foreground/70">
                Enter a prompt above to generate your first component. Be as specific as possible for best results.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuilderLayout;
