
import { useState } from "react";
import { ComponentData } from "@/types";
import { Copy, Check, Code, Coffee, Terminal, FileCode, Braces, Download, Share2 } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface CodePreviewProps {
  componentData: ComponentData | null;
  explanation: string;
}

const CodePreview = ({ componentData, explanation }: CodePreviewProps) => {
  const [activeLang, setActiveLang] = useState<"html" | "css" | "js">("html");
  const [copied, setCopied] = useState(false);

  if (!componentData) {
    return (
      <div className="w-full h-96 bg-background rounded-lg shadow-sm border border-border flex items-center justify-center">
        <div className="text-center p-6 animate-fade-in">
          <Code size={36} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground">No Code Yet</h3>
          <p className="text-sm text-muted-foreground mt-2 max-w-sm">
            Generate a component to see the code here
          </p>
        </div>
      </div>
    );
  }

  const getActiveCode = () => {
    switch (activeLang) {
      case "html":
        return componentData.html;
      case "css":
        return componentData.css;
      case "js":
        return componentData.javascript;
      default:
        return "";
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(getActiveCode());
    setCopied(true);
    toast.success("Code copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCode = () => {
    const fileName = `component-${activeLang}.${activeLang === "js" ? "js" : activeLang}`;
    const blob = new Blob([getActiveCode()], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`Downloaded ${fileName}`);
  };

  const downloadBundle = () => {
    // Create a zip-like bundle as text for now
    const bundleContent = `
/* HTML */
${componentData.html}

/* CSS */
${componentData.css}

/* JavaScript */
${componentData.javascript}
    `;
    
    const blob = new Blob([bundleContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "component-bundle.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Downloaded component bundle");
  };

  const codeIcons = {
    html: <FileCode size={16} className="text-orange-500" />,
    css: <Braces size={16} className="text-blue-500" />,
    js: <Terminal size={16} className="text-yellow-500" />
  };

  return (
    <div className="w-full bg-background rounded-lg shadow-sm border border-border overflow-hidden flex flex-col animate-fade-in">
      <Tabs defaultValue="html" value={activeLang} onValueChange={(value) => setActiveLang(value as "html" | "css" | "js")}>
        <div className="bg-muted px-4 py-2 border-b border-border flex items-center justify-between">
          <TabsList className="bg-transparent border-0 p-0">
            <TabsTrigger 
              value="html" 
              className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary px-3 py-1 text-xs flex items-center gap-1.5"
            >
              {codeIcons.html}
              HTML
            </TabsTrigger>
            <TabsTrigger 
              value="css" 
              className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary px-3 py-1 text-xs flex items-center gap-1.5"
            >
              {codeIcons.css}
              CSS
            </TabsTrigger>
            <TabsTrigger 
              value="js" 
              className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary px-3 py-1 text-xs flex items-center gap-1.5"
            >
              {codeIcons.js}
              JavaScript
            </TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 text-xs flex items-center gap-1 text-foreground/70 hover:text-foreground"
              onClick={downloadCode}
            >
              <Download size={14} />
              <span className="hidden sm:inline">Download</span>
            </Button>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs flex items-center gap-1 text-foreground/70 hover:text-foreground"
                >
                  <Share2 size={14} />
                  <span className="hidden sm:inline">Export</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Export Options</DialogTitle>
                  <DialogDescription>
                    Choose how you want to export your component code
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Button onClick={downloadBundle} className="w-full" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download Bundle
                  </Button>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="integration">
                      <AccordionTrigger>Integration Guide</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 text-sm">
                          <p>To integrate this component into a React project:</p>
                          <ol className="list-decimal pl-5 space-y-1">
                            <li>Create a new component file</li>
                            <li>Add the HTML to your JSX</li>
                            <li>Add the CSS to your stylesheet</li>
                            <li>Add the JavaScript functionality</li>
                          </ol>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </DialogContent>
            </Dialog>
            
            <Button
              onClick={copyCode}
              variant="ghost"
              size="sm"
              className="h-7 text-xs flex items-center gap-1 text-foreground/70 hover:text-foreground transition-colors"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-green-500" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy</span>
                </>
              )}
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col h-96">
          <TabsContent value="html" className="flex-1 overflow-auto bg-secondary/30 p-4 m-0 data-[state=active]:border-0">
            <pre className="text-sm font-mono whitespace-pre-wrap">
              <code>{componentData.html}</code>
            </pre>
          </TabsContent>
          
          <TabsContent value="css" className="flex-1 overflow-auto bg-secondary/30 p-4 m-0 data-[state=active]:border-0">
            <pre className="text-sm font-mono whitespace-pre-wrap">
              <code>{componentData.css}</code>
            </pre>
          </TabsContent>
          
          <TabsContent value="js" className="flex-1 overflow-auto bg-secondary/30 p-4 m-0 data-[state=active]:border-0">
            <pre className="text-sm font-mono whitespace-pre-wrap">
              <code>{componentData.javascript}</code>
            </pre>
          </TabsContent>
          
          {explanation && (
            <div className="p-4 border-t border-border bg-white">
              <HoverCard>
                <HoverCardTrigger asChild>
                  <div className="flex items-center gap-2 mb-2 cursor-pointer">
                    <Coffee size={16} className="text-primary" />
                    <h3 className="text-sm font-medium">Code Explanation</h3>
                    <span className="text-xs text-muted-foreground">(hover for more)</span>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <h4 className="text-sm font-semibold mb-2">Understanding the Code</h4>
                  <p className="text-xs text-muted-foreground">
                    This explanation helps you understand how the component works and how to use it in your projects.
                  </p>
                </HoverCardContent>
              </HoverCard>
              <p className="text-xs text-foreground/80">{explanation}</p>
            </div>
          )}
        </div>
      </Tabs>
    </div>
  );
};

export default CodePreview;
