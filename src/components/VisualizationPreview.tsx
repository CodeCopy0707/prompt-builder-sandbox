
import { useState } from "react";
import { ComponentData } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code2, BarChart, Boxes, FileCode, RefreshCw, Palette } from "lucide-react";

interface VisualizationPreviewProps {
  componentData: ComponentData | null;
}

// Mock data for chart visualization
const chartData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 780 },
  { name: "May", value: 500 },
  { name: "Jun", value: 620 },
  { name: "Jul", value: 750 }
];

const VisualizationPreview = ({ componentData }: VisualizationPreviewProps) => {
  const [activeViz, setActiveViz] = useState<"d3" | "threejs" | "p5js">("d3");

  if (!componentData) {
    return null;
  }

  // This would be expanded to actually analyze component code and generate visualizations
  const generateD3Visualization = () => {
    return `
      // D3.js visualization generated from your component
      const svg = d3.select("#viz-container")
        .append("svg")
        .attr("width", 600)
        .attr("height", 400);
      
      const margin = {top: 20, right: 30, bottom: 40, left: 40};
      const width = +svg.attr("width") - margin.left - margin.right;
      const height = +svg.attr("height") - margin.top - margin.bottom;
      
      const x = d3.scaleBand()
        .domain(data.map(d => d.name))
        .range([0, width])
        .padding(0.1);
      
      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .nice()
        .range([height, 0]);
      
      const g = svg.append("g")
        .attr("transform", \`translate(\${margin.left},\${margin.top})\`);
      
      g.append("g")
        .attr("transform", \`translate(0,\${height})\`)
        .call(d3.axisBottom(x));
      
      g.append("g")
        .call(d3.axisLeft(y));
      
      g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.name))
        .attr("y", d => y(d.value))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.value))
        .attr("fill", "steelblue");
    `;
  };

  const generateThreeJsVisualization = () => {
    return `
      // Three.js visualization generated from your component
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(600, 400);
      document.getElementById('threejs-container').appendChild(renderer.domElement);
      
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);
      
      camera.position.z = 5;
      
      function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
      }
      
      animate();
    `;
  };

  const generateP5Visualization = () => {
    return `
      // p5.js creative coding visualization
      function setup() {
        const canvas = createCanvas(600, 400);
        canvas.parent('p5-container');
      }
      
      function draw() {
        background(220);
        for (let i = 0; i < 100; i++) {
          fill(random(255), random(255), random(255), 150);
          noStroke();
          ellipse(random(width), random(height), 20, 20);
        }
        noLoop();
      }
    `;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <FileCode size={20} className="text-primary" />
          Visualization Options
        </h3>
        <Button variant="outline" size="sm" className="gap-1.5">
          <RefreshCw size={14} />
          Regenerate
        </Button>
      </div>
      
      <Tabs defaultValue="d3" value={activeViz} onValueChange={(value) => setActiveViz(value as any)}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="d3" className="flex items-center gap-1.5">
            <BarChart size={16} />
            D3.js Charts
          </TabsTrigger>
          <TabsTrigger value="threejs" className="flex items-center gap-1.5">
            <Boxes size={16} />
            Three.js 3D
          </TabsTrigger>
          <TabsTrigger value="p5js" className="flex items-center gap-1.5">
            <Palette size={16} />
            Creative Coding
          </TabsTrigger>
        </TabsList>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Code2 size={16} />
                Generated Visualization Code
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-xs bg-secondary/30 p-4 rounded-md overflow-auto max-h-[300px]">
                <code>
                  {activeViz === "d3" && generateD3Visualization()}
                  {activeViz === "threejs" && generateThreeJsVisualization()}
                  {activeViz === "p5js" && generateP5Visualization()}
                </code>
              </pre>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Visualization Preview</CardTitle>
            </CardHeader>
            <CardContent className="min-h-[300px] flex items-center justify-center bg-secondary/20 rounded">
              {activeViz === "d3" && (
                <div className="text-center">
                  <BarChart size={64} className="mx-auto mb-4 text-primary/40" />
                  <p className="text-sm text-muted-foreground">D3.js visualization would render here</p>
                  <Button size="sm" variant="outline" className="mt-4">
                    Generate Live Chart
                  </Button>
                </div>
              )}
              
              {activeViz === "threejs" && (
                <div className="text-center">
                  <Boxes size={64} className="mx-auto mb-4 text-primary/40" />
                  <p className="text-sm text-muted-foreground">Three.js 3D visualization would render here</p>
                  <Button size="sm" variant="outline" className="mt-4">
                    Generate 3D Model
                  </Button>
                </div>
              )}
              
              {activeViz === "p5js" && (
                <div className="text-center">
                  <Palette size={64} className="mx-auto mb-4 text-primary/40" />
                  <p className="text-sm text-muted-foreground">p5.js creative coding would render here</p>
                  <Button size="sm" variant="outline" className="mt-4">
                    Generate Creative Art
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </Tabs>
    </div>
  );
};

export default VisualizationPreview;
