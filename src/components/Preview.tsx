
import { useEffect, useRef, useState } from "react";
import { ComponentData } from "@/types";
import { Loader2, RefreshCw, AlertCircle, Code, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PreviewProps {
  componentData: ComponentData | null;
}

const Preview = ({ componentData }: PreviewProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setLoading(true);
    setError(null);
    setRefreshKey(prev => prev + 1);
  };

  useEffect(() => {
    if (!componentData || !iframeRef.current) return;
    
    setLoading(true);
    setError(null);
    
    // Create a blob URL from the HTML content with enhanced sandbox protections
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Component Preview</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          body {
            margin: 0;
            padding: 1rem;
            font-family: Inter, system-ui, sans-serif;
            background-color: transparent;
            transition: background-color 0.3s ease;
          }
          .preview-container {
            width: 100%;
            max-width: 100%;
            margin: 0 auto;
            overflow: auto;
          }
          /* Add responsive utilities */
          @media (max-width: 640px) {
            body {
              padding: 0.5rem;
            }
          }
          /* Custom Utilities */
          .animate-fade {
            animation: fadeIn 0.5s ease-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          ${componentData.css}
        </style>
      </head>
      <body>
        <div class="preview-container animate-fade">
          <div id="preview-root">${componentData.html}</div>
        </div>
        <script>
          // Communication channel with parent
          window.addEventListener('message', function(event) {
            if (event.data === 'refresh') {
              document.querySelector('.preview-container').classList.remove('animate-fade');
              void document.querySelector('.preview-container').offsetWidth;
              document.querySelector('.preview-container').classList.add('animate-fade');
            }
          });
          
          // Setup error boundary
          window.onerror = function(message, source, lineno, colno, error) {
            window.parent.postMessage({ type: 'error', message: message }, '*');
            console.error('Preview error:', message);
            return true; // Prevents the default browser error handling
          };
          
          // Wrap user code in IIFE with error handling
          try {
            (function() {
              ${componentData.javascript}
            })();
            window.parent.postMessage({ type: 'success' }, '*');
          } catch (error) {
            window.parent.postMessage({ type: 'error', message: error.message }, '*');
            console.error('Preview execution error:', error);
          }
        </script>
      </body>
      </html>
    `;
    
    // Create a blob and URL for the HTML content
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const blobURL = URL.createObjectURL(blob);
    
    // Set up message event listener for communication with iframe
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'error') {
        setError(event.data.message);
      } else if (event.data && event.data.type === 'success') {
        setError(null);
      }
    };
    
    window.addEventListener('message', handleMessage);
    
    // Set the iframe src to the blob URL
    if (iframeRef.current) {
      iframeRef.current.src = blobURL;
      
      // Handle iframe load event
      iframeRef.current.onload = () => {
        setLoading(false);
        
        // Notify iframe that load is complete
        if (iframeRef.current && iframeRef.current.contentWindow) {
          iframeRef.current.contentWindow.postMessage('refresh', '*');
        }
      };
    }
    
    // Fallback for loading state in case onload doesn't fire
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => {
      if (blobURL) URL.revokeObjectURL(blobURL);
      clearTimeout(timeout);
      window.removeEventListener('message', handleMessage);
    };
  }, [componentData, refreshKey]);

  return (
    <div className="w-full h-[600px] bg-background rounded-lg shadow-sm border border-border overflow-hidden flex flex-col">
      <div className="bg-muted px-4 py-2 border-b border-border flex items-center justify-between">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-destructive/70"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500/70"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
        </div>
        <div className="flex-1 text-center">
          <span className="text-xs font-medium text-foreground/60">Live Preview</span>
        </div>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={handleRefresh}
                  disabled={loading}
                >
                  <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
                  <span className="sr-only">Refresh preview</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Refresh preview</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <Code size={14} />
                <span className="sr-only">View sandbox info</span>
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex justify-between space-x-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">Sandbox Environment</h4>
                  <p className="text-sm text-muted-foreground">
                    This preview runs in an isolated sandbox with Tailwind CSS. JavaScript execution is
                    contained within the preview.
                  </p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
      
      <div className="flex-1 relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10">
            <div className="flex flex-col items-center">
              <Loader2 size={30} className="text-primary animate-spin mb-2" />
              <p className="text-sm text-foreground/60">Loading preview...</p>
            </div>
          </div>
        )}
        
        {error && !loading && (
          <div className="absolute top-2 right-2 left-2 z-10">
            <Alert variant="destructive" className="animate-fade-in">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="flex items-center gap-2">
                <span className="text-xs">{error}</span>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-5 w-5 ml-auto" 
                  onClick={() => setError(null)}
                >
                  <CheckCircle2 size={12} />
                </Button>
              </AlertDescription>
            </Alert>
          </div>
        )}
        
        {!componentData && !loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-muted-foreground text-center px-4">
              Your component preview will appear here
            </p>
          </div>
        )}
        
        <iframe 
          ref={iframeRef}
          title="Component Preview"
          className="w-full h-full border-0 transition-opacity duration-200"
          sandbox="allow-scripts allow-same-origin"
          style={{ opacity: loading ? 0.5 : 1 }}
        />
      </div>
    </div>
  );
};

export default Preview;
