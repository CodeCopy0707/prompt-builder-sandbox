
import { 
  Code, 
  Cpu, 
  Eye, 
  LayoutTemplate, 
  Smartphone, 
  Sparkles, 
  Zap
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Sparkles className="h-8 w-8 text-primary" />,
      title: "AI-Powered Generation",
      description: "Describe your component in plain language and watch as our AI builds it instantly."
    },
    {
      icon: <Eye className="h-8 w-8 text-primary" />,
      title: "Live Preview",
      description: "See your components come to life in real-time with our interactive preview."
    },
    {
      icon: <Code className="h-8 w-8 text-primary" />,
      title: "Ready-to-Use Code",
      description: "Get production-ready HTML, CSS, and JavaScript code that you can copy and paste."
    },
    {
      icon: <LayoutTemplate className="h-8 w-8 text-primary" />,
      title: "Customizable Components",
      description: "Fine-tune your components with additional prompts until they're perfect."
    },
    {
      icon: <Smartphone className="h-8 w-8 text-primary" />,
      title: "Responsive by Default",
      description: "All generated components are mobile-friendly and work on all screen sizes."
    },
    {
      icon: <Cpu className="h-8 w-8 text-primary" />,
      title: "Powered by Gemini 2.0",
      description: "Leveraging Google's advanced AI model for intelligent component generation."
    }
  ];

  return (
    <div className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1.5 mb-6 rounded-full bg-secondary text-foreground/80 text-sm font-medium">
            <Zap size={16} className="mr-2" />
            Powerful Features
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Build Faster</h2>
          <p className="max-w-2xl mx-auto text-lg text-foreground/70">
            Our AI-powered platform provides all the tools you need to create beautiful UI components without writing code.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-6 bg-card border border-border rounded-xl transition-all duration-300 hover:shadow-md hover:border-primary/20 hover:translate-y-[-4px] initially-hidden opacity-0"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col space-y-4">
                <div className="p-2 rounded-lg bg-primary/10 w-fit">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-foreground/70">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
