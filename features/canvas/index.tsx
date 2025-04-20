"use client";
import { Separator } from "@/components/ui/separator";
import { Canvas, type CanvasRef } from "./components";
import { Chatbot } from "./components/Chatbot";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

export const CanvasAI = () => {
  const canvasRef = useRef<CanvasRef>(null);

  const handleClearCanvas = () => {
    canvasRef.current?.clear();
  };

  return (
    <div className="w-full h-full bg-white/50 rounded-lg p-4 border backdrop-blur-lg shadow-2xl flex gap-4 overflow-hidden">
      <div className="w-1/2 h-full p-4 flex flex-col gap-4">
        <div className="flex justify-between items-center flex-shrink-0">
          <h1 className="text-xl font-semibold">Canvas</h1>
          <Button variant="outline" size="sm" onClick={handleClearCanvas}>
            Clear Canvas
          </Button>
        </div>
        <div className="flex-grow relative border rounded-lg overflow-hidden bg-white">
          <Canvas
            ref={canvasRef}
            strokeColor="black"
            className="absolute top-0 left-0 w-full h-full"
            width={1000}
            height={800}
          />
        </div>
      </div>
      <Separator orientation="vertical" />
      <div className="w-1/2 h-full">
        <Chatbot />
      </div>
    </div>
  );
};
