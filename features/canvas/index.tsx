import { Separator } from "@/components/ui/separator"
import { Canvas } from "./components";
import { Chatbot } from "./components/Chatbot";

export const CanvasAI = () => {
  return (
    <div className="w-full h-full bg-white/50 rounded-lg p-4 border backdrop-blur-lg shadow-2xl flex gap-4">
      <div className="w-1/2 h-full rounded-lg p-4 flex flex-col">
        <h1 className="text-2xl font-bold">Canvas - Draw your questions</h1>
        <Canvas strokeColor="black" className="rounded-lg"/>
      </div>
      <Separator orientation="vertical" />
      <div className="w-1/2 h-full rounded-lg p-4"><Chatbot />
      </div>
    </div>
  );
};
