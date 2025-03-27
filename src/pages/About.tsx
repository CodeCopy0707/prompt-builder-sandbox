
import Header from "@/components/Header";
import { Code2, Cpu, Zap, Code, RefreshCw } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 pt-24 pb-16">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About Component Builder</h1>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            A powerful platform that leverages Google's Gemini AI to transform your ideas into beautiful, functional components.
          </p>
        </div>
        
        <div className="space-y-12 animate-slide-up">
          <section>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <span className="bg-primary/10 p-2 rounded-md text-primary">
                <Zap size={20} />
              </span>
              How It Works
            </h2>
            <div className="bg-white rounded-lg shadow-sm border border-border p-6">
              <ol className="space-y-6">
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                    1
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Describe Your Component</h3>
                    <p className="text-sm text-foreground/70">
                      Enter a detailed description of the component you want to build. Be specific about functionality, style, and behavior.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                    2
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">AI Generation</h3>
                    <p className="text-sm text-foreground/70">
                      Our AI processes your request and generates HTML, CSS, and JavaScript code for your component using Google's Gemini model.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                    3
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Preview & Get Code</h3>
                    <p className="text-sm text-foreground/70">
                      Instantly preview your component in the sandbox environment and access the code to use in your projects.
                    </p>
                  </div>
                </li>
              </ol>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <span className="bg-primary/10 p-2 rounded-md text-primary">
                <Cpu size={20} />
              </span>
              Technology
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-primary">
                    <Code2 size={24} />
                  </span>
                  <h3 className="font-medium">Google Gemini</h3>
                </div>
                <p className="text-sm text-foreground/70">
                  Powered by Google's state-of-the-art Gemini 2.0 Flash model, delivering high-quality code generation with exceptional understanding of web development concepts.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm border border-border p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-primary">
                    <Code size={24} />
                  </span>
                  <h3 className="font-medium">Sandbox Environment</h3>
                </div>
                <p className="text-sm text-foreground/70">
                  Our secure sandbox allows you to preview components in real-time with isolated execution for JavaScript, providing a safe testing environment.
                </p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <span className="bg-primary/10 p-2 rounded-md text-primary">
                <RefreshCw size={20} />
              </span>
              Tips for Best Results
            </h2>
            <div className="bg-white rounded-lg shadow-sm border border-border p-6">
              <ul className="space-y-4 text-sm text-foreground/70">
                <li className="flex items-start gap-2">
                  <span className="text-primary text-lg">•</span>
                  <p>Be specific about visual aspects like colors, layout, and responsive behavior.</p>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary text-lg">•</span>
                  <p>Mention any interactions or animations you want included.</p>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary text-lg">•</span>
                  <p>Specify if you need the component to handle any user input or have specific functionality.</p>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary text-lg">•</span>
                  <p>Reference design patterns or components that inspire you for more accurate results.</p>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
