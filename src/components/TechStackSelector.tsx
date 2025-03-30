
import React from "react";
import { Badge } from "@/components/ui/badge";
import { 
  Code, 
  Database, 
  Layout, 
  ArrowRight, 
  Box, 
  Cpu, 
  ServerCog, 
  BarChart3 
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface TechStackSelectorProps {
  selectedTech: string[];
  onChange: (selected: string[]) => void;
}

interface TechOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  category: "frontend" | "backend" | "database" | "visualization";
}

const techOptions: TechOption[] = [
  { id: "react", name: "React", icon: <Code size={14} />, category: "frontend" },
  { id: "tailwind", name: "Tailwind", icon: <Layout size={14} />, category: "frontend" },
  { id: "nextjs", name: "Next.js", icon: <Box size={14} />, category: "frontend" },
  { id: "nodejs", name: "Node.js", icon: <ServerCog size={14} />, category: "backend" },
  { id: "express", name: "Express", icon: <ArrowRight size={14} />, category: "backend" },
  { id: "mongodb", name: "MongoDB", icon: <Database size={14} />, category: "database" },
  { id: "d3", name: "D3.js", icon: <BarChart3 size={14} />, category: "visualization" },
  { id: "threejs", name: "Three.js", icon: <Cpu size={14} />, category: "visualization" },
];

const TechStackSelector: React.FC<TechStackSelectorProps> = ({ selectedTech, onChange }) => {
  const toggleTech = (techId: string) => {
    if (selectedTech.includes(techId)) {
      onChange(selectedTech.filter(id => id !== techId));
    } else {
      onChange([...selectedTech, techId]);
    }
  };

  const categories = [
    { id: "frontend", name: "Frontend" },
    { id: "backend", name: "Backend" },
    { id: "database", name: "Database" },
    { id: "visualization", name: "Visualization" }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Tech Stack</h3>
      
      {categories.map(category => (
        <div key={category.id} className="space-y-2">
          <h4 className="text-xs text-muted-foreground">{category.name}</h4>
          <div className="flex flex-wrap gap-2">
            {techOptions
              .filter(tech => tech.category === category.id)
              .map(tech => (
                <Tooltip key={tech.id}>
                  <TooltipTrigger>
                    <Badge
                      variant={selectedTech.includes(tech.id) ? "default" : "outline"}
                      className={`cursor-pointer ${
                        selectedTech.includes(tech.id) 
                          ? "bg-primary hover:bg-primary/90" 
                          : "hover:bg-secondary"
                      }`}
                      onClick={() => toggleTech(tech.id)}
                    >
                      {tech.icon}
                      <span className="ml-1">{tech.name}</span>
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Toggle {tech.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TechStackSelector;
