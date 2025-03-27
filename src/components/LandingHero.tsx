
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Zap } from "lucide-react";

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
            <Zap size={16} className="mr-2" />
            Powered by Google Gemini 2.0 Flash
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-700">
              Transform Ideas into Components
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl text-foreground/70 mb-10">
            Describe what you want, and watch as AI generates beautiful, responsive React components in seconds.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" onClick={scrollToBuilder} className="px-6">
              Start Building <ArrowRight className="ml-2" />
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
                <img 
                  src="https://placehold.co/1200x700/f5f5f5/333?text=Component+Builder+Preview" 
                  alt="Component Builder Interface Preview" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingHero;
