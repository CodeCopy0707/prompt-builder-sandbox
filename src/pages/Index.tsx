
import { useEffect } from "react";
import BuilderLayout from "@/components/BuilderLayout";
import Header from "@/components/Header";
import LandingHero from "@/components/LandingHero";
import Features from "@/components/Features";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const Index = () => {
  const scrollToBuilder = () => {
    const builderSection = document.getElementById("builder-section");
    if (builderSection) {
      builderSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Add scroll animation class when elements come into view
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
          entry.target.classList.remove("opacity-0");
        }
      });
    }, { threshold: 0.1 });

    const hiddenElements = document.querySelectorAll(".initially-hidden");
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Landing Hero Section */}
      <LandingHero />
      
      {/* Features Section */}
      <Features />
      
      {/* Call to Action */}
      <div className="w-full py-16 bg-gradient-to-b from-background to-secondary/20 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Ready to Build Your Components?</h2>
          <p className="text-lg mb-8 text-foreground/80">
            Jump into our builder and create stunning UI components in seconds with the power of AI.
          </p>
          <Button size="lg" onClick={scrollToBuilder} className="group">
            Try Builder Now
            <ArrowDown className="ml-2 group-hover:animate-bounce" />
          </Button>
        </div>
      </div>
      
      {/* Builder Section */}
      <div id="builder-section">
        <BuilderLayout />
      </div>
    </div>
  );
};

export default Index;
