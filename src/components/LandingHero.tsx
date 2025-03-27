
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Zap, Sparkles } from "lucide-react";

const LandingHero = () => {
  const scrollToBuilder = () => {
    const builderSection = document.getElementById("builder-section");
    if (builderSection) {
      builderSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative overflow-hidden pt-28 pb-24 bg-gradient-to-b from-background to-primary/5">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-700/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <div className="inline-flex items-center px-3 py-1.5 mb-8 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Sparkles size={16} className="mr-2 animate-pulse" />
            Powered by Google Gemini 2.0 Flash
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-700">
              Build React Components with AI
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl text-foreground/70 mb-10">
            Describe what you want, and watch AI generate beautiful React components with Tailwind CSS in seconds.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" onClick={scrollToBuilder} className="px-6 group">
              Start Building 
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="px-6" onClick={() => window.location.href = "/about"}>
              Learn More <Code className="ml-2" />
            </Button>
          </div>
          
          {/* Preview screenshot */}
          <div className="mt-16 max-w-5xl mx-auto initially-hidden opacity-0">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-blue-700 rounded-lg blur opacity-30"></div>
              <div className="relative bg-background border border-border rounded-lg shadow-lg overflow-hidden">
                <div className="bg-muted px-4 py-2 border-b border-border flex items-center">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-destructive/70"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500/70"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-xs font-medium text-foreground/60">Component Builder</span>
                  </div>
                </div>
                <div className="p-4 aspect-video bg-card flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <Zap size={48} className="text-primary mx-auto" />
                    <p className="text-foreground/70">Your AI-generated components will appear here</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingHero;
