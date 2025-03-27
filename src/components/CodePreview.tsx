
import { useState } from "react";
import { ComponentData } from "@/types";
import { Copy, Check, Code, FileType, Coffee } from "lucide-react";
import { toast } from "sonner";

interface CodePreviewProps {
  componentData: ComponentData | null;
  explanation: string;
}

const CodePreview = ({ componentData, explanation }: CodePreviewProps) => {
  const [activeTab, setActiveTab] = useState<"html" | "css" | "js">("html");
  const [copied, setCopied] = useState(false);

  if (!componentData) {
    return (
      <div className="w-full h-96 bg-background rounded-lg shadow-sm border border-border flex items-center justify-center">
        <div className="text-center p-6">
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
    switch (activeTab) {
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

  return (
    <div className="w-full bg-background rounded-lg shadow-sm border border-border overflow-hidden flex flex-col animate-fade-in">
      <div className="bg-muted px-4 py-2 border-b border-border flex items-center justify-between">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab("html")}
            className={`text-xs font-medium px-2 py-1 rounded transition-colors ${
              activeTab === "html"
                ? "bg-primary/10 text-primary"
                : "text-foreground/70 hover:text-foreground"
            }`}
          >
            HTML
          </button>
          <button
            onClick={() => setActiveTab("css")}
            className={`text-xs font-medium px-2 py-1 rounded transition-colors ${
              activeTab === "css"
                ? "bg-primary/10 text-primary"
                : "text-foreground/70 hover:text-foreground"
            }`}
          >
            CSS
          </button>
          <button
            onClick={() => setActiveTab("js")}
            className={`text-xs font-medium px-2 py-1 rounded transition-colors ${
              activeTab === "js"
                ? "bg-primary/10 text-primary"
                : "text-foreground/70 hover:text-foreground"
            }`}
          >
            JavaScript
          </button>
        </div>
        <button
          onClick={copyCode}
          className="text-xs flex items-center gap-1 text-foreground/70 hover:text-foreground transition-colors"
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
        </button>
      </div>
      
      <div className="flex flex-col h-96">
        <div className="flex-1 overflow-auto bg-secondary/30 p-4">
          <pre className="text-sm font-mono whitespace-pre-wrap">
            <code>{getActiveCode()}</code>
          </pre>
        </div>
        
        {explanation && (
          <div className="p-4 border-t border-border bg-white">
            <div className="flex items-center gap-2 mb-2">
              <Coffee size={16} className="text-primary" />
              <h3 className="text-sm font-medium">Explanation</h3>
            </div>
            <p className="text-xs text-foreground/80">{explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodePreview;
