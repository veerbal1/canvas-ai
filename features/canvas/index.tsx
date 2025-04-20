"use client";
import { Separator } from "@/components/ui/separator";
import { Canvas, type CanvasRef } from "./components";
import { Chatbot } from "./components/Chatbot";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Define available colors
const availableColors = [
  "#ffbe0b", "#fb5607", "#ff006e", "#8338ec", "#3a86ff" // White acts as an eraser
];

export const CanvasAI = () => {
  const canvasRef = useRef<CanvasRef>(null);
  // State for the selected drawing color
  const [selectedColor, setSelectedColor] = useState<string>(availableColors[0]);

  const handleClearCanvas = () => {
    canvasRef.current?.clear();
  };

  // Function to get the current canvas image data URL
  const getCanvasDataUrl = (): string | null => {
    return canvasRef.current?.getImageDataUrl() ?? null;
  };

  return (
    <div className="w-full h-full bg-white/50 rounded-lg p-4 border backdrop-blur-lg shadow-2xl flex gap-4 overflow-hidden">
      <div className="w-1/2 h-full p-4 flex flex-col gap-4 relative">
        <div className="flex justify-between items-center flex-shrink-0">
          <h1 className="text-xl font-semibold">Canvas</h1>
          <Button variant="outline" size="sm" onClick={handleClearCanvas}>
            Clear Canvas
          </Button>
        </div>
        <div className="flex-grow relative border rounded-lg overflow-hidden bg-white">
          <Canvas
            ref={canvasRef}
            strokeColor={selectedColor}
            className="absolute top-0 left-0 w-full h-full"
            width={1000}
            height={800}
          />
        </div>
        <div className="absolute bottom-0 w-full h-48">
          <div className="absolute bottom-0 w-full h-1/2 bg-white z-10"></div>
          <div className="flex flex-wrap px-28 justify-center gap-2 pt-2 flex-shrink-0 absolute bottom-0 left-0 items-center w-full z-0">
            {
              availableColors.map((color) => (
                <Pencil key={color} color={color} selected={selectedColor === color} onClick={() => setSelectedColor(color)} />
              ))
            }
          </div>
        </div>

      </div>
      <Separator orientation="vertical" />
      <div className="w-1/2 h-full">
        <Chatbot onGetCanvasData={getCanvasDataUrl} />
      </div>
    </div>
  );
};

const Pencil = ({ color = "black", onClick, selected }: { color: string, onClick: () => void, selected: boolean }) => {
  return <div role="button" className={cn("flex flex-col items-center justify-center mx-auto cursor-pointer transition-transform hover:-translate-y-2", selected ? "-translate-y-4 hover:-translate-y-4" : "")} onClick={onClick}>
    <div className="w-0 h-0 border-b-black border-[20px] border-t-transparent border-r-transparent border-l-transparent"
      style={{ borderBottomColor: color }}
    ></div>
    <div className={cn("w-10 h-28")} style={{ backgroundColor: color }}></div>
  </div>
}