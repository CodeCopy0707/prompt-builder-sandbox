
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BrainCircuit } from "lucide-react";

interface ModelSelectorProps {
  selectedModel: string;
  onChange: (model: string) => void;
}

const models = [
  { id: "gemini-1.5-flash", name: "Gemini 1.5 Flash", description: "Fast responses, good for most tasks" },
  { id: "gemini-1.5-pro", name: "Gemini 1.5 Pro", description: "High quality, better for complex tasks" },
  { id: "gpt-4o", name: "GPT-4o", description: "Advanced logic and reasoning" },
  { id: "claude-3", name: "Claude 3", description: "Excellent for detailed explanations" },
];

const ModelSelector: React.FC<ModelSelectorProps> = ({ selectedModel, onChange }) => {
  const selectedModelData = models.find(model => model.id === selectedModel) || models[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <BrainCircuit size={16} />
          {selectedModelData.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[240px]">
        {models.map((model) => (
          <DropdownMenuItem 
            key={model.id} 
            onClick={() => onChange(model.id)}
            className="flex flex-col items-start py-2"
          >
            <span className="font-medium">{model.name}</span>
            <span className="text-xs text-muted-foreground">{model.description}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ModelSelector;
