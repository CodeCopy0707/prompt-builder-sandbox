
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Info, ChevronRight, Star, Zap, Cpu, Database, BarChart3, FileCode, Boxes, Globe } from "lucide-react";

const FeatureList = () => {
  const features = [
    {
      title: "AI Code Generation",
      description: "Create components, pages, and APIs with natural language prompts",
      icon: <FileCode className="h-5 w-5" />,
      available: true,
    },
    {
      title: "Full-Stack Support",
      description: "Generate both frontend and backend code with database integration",
      icon: <Database className="h-5 w-5" />,
      available: true,
    },
    {
      title: "Data Visualization",
      description: "Create interactive charts, graphs, and dashboards with D3.js",
      icon: <BarChart3 className="h-5 w-5" />,
      available: true,
    },
    {
      title: "3D Graphics",
      description: "Build immersive 3D experiences with Three.js integration",
      icon: <Boxes className="h-5 w-5" />,
      available: true,
    },
    {
      title: "One-Click Deployment",
      description: "Deploy your application to Vercel, Netlify, or Firebase",
      icon: <Globe className="h-5 w-5" />,
      coming: true,
    },
    {
      title: "Multi-User Collaboration",
      description: "Code together in real-time with Google Docs-style collaboration",
      icon: <Cpu className="h-5 w-5" />,
      coming: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Platform Features</h2>
        <Button variant="outline" className="gap-1">
          <Info size={16} />
          <span>Learn more</span>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center text-primary">
                  {feature.icon}
                </div>
                {feature.available && (
                  <Badge variant="default" className="bg-green-500">Available</Badge>
                )}
                {feature.coming && (
                  <Badge variant="outline">Coming Soon</Badge>
                )}
              </div>
              <CardTitle className="text-lg mt-2">{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardFooter className="pt-2 pb-4">
              <Button variant="ghost" size="sm" className="gap-1 text-xs">
                <span>Learn more</span>
                <ChevronRight size={14} />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeatureList;
