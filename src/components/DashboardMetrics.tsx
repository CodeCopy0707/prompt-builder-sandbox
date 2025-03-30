
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Code, Server, Gauge, Sparkles } from "lucide-react";

interface MetricsProps {
  metrics: {
    componentsGenerated: number;
    apiEndpoints: number;
    codeQualityScore: number;
    performanceScore: number;
  };
}

const DashboardMetrics = ({ metrics }: MetricsProps) => {
  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Code className="h-4 w-4 mr-2 text-primary" />
            Components
          </CardTitle>
          <CardDescription>Total generated</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.componentsGenerated}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Server className="h-4 w-4 mr-2 text-primary" />
            API Endpoints
          </CardTitle>
          <CardDescription>Active endpoints</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.apiEndpoints}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Gauge className="h-4 w-4 mr-2 text-primary" />
            Performance
          </CardTitle>
          <CardDescription>Overall score</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="text-2xl font-bold">{metrics.performanceScore}/100</div>
          <div className="w-16 h-16 relative">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                className="text-gray-200 stroke-current"
                strokeWidth="10"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
              ></circle>
              <circle
                className="text-primary stroke-current"
                strokeWidth="10"
                strokeLinecap="round"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 - (251.2 * metrics.performanceScore) / 100}
                transform="rotate(-90 50 50)"
              ></circle>
            </svg>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default DashboardMetrics;
