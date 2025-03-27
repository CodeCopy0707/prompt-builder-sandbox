
import { useEffect, useRef, useState } from "react";
import { ComponentData } from "@/types";
import { Loader2 } from "lucide-react";

interface PreviewProps {
  componentData: ComponentData | null;
}

const Preview = ({ componentData }: PreviewProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!componentData || !iframeRef.current) return;
    
    setLoading(true);
    
    // Create a blob URL from the HTML content
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
          }
          ${componentData.css}
        </style>
      </head>
      <body>
        <div id="root">${componentData.html}</div>
        <script>
          ${componentData.javascript}
        </script>
      </body>
      </html>
    `;
    
    // Create a blob and URL for the HTML content
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const blobURL = URL.createObjectURL(blob);
    
    // Set the iframe src to the blob URL
    if (iframeRef.current) {
      iframeRef.current.src = blobURL;
      
      // Handle iframe load event
      iframeRef.current.onload = () => {
        setLoading(false);
        // Clean up the blob URL when the iframe has loaded
        URL.revokeObjectURL(blobURL);
      };
    }
    
    // Fallback for loading state in case onload doesn't fire
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => {
      // Clean up on unmount or when component data changes
      if (blobURL) URL.revokeObjectURL(blobURL);
      clearTimeout(timeout);
    };
  }, [componentData]);

  return (
    <div className="w-full h-96 bg-background rounded-lg shadow-sm border border-border overflow-hidden flex flex-col">
      <div className="bg-muted px-4 py-2 border-b border-border flex items-center">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-destructive/70"></div>
          <div className="w-3 h-3 rounded-full bg-amber-500/70"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
        </div>
        <div className="flex-1 text-center">
          <span className="text-xs font-medium text-foreground/60">Live Preview</span>
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
        
        {!componentData && !loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-muted-foreground text-center px-4">
              Your component preview will appear here after generation
            </p>
          </div>
        )}
        
        <iframe 
          ref={iframeRef}
          title="Component Preview"
          className="w-full h-full border-0"
          sandbox="allow-scripts"
        />
      </div>
    </div>
  );
};

export default Preview;
