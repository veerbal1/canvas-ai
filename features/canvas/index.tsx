import { Separator } from "@/components/ui/separator"

export const CanvasAI = () => {
  return (
    <div className="w-full h-full bg-white/50 rounded-lg p-4 border backdrop-blur-lg shadow-2xl flex gap-4">
      <div className="w-1/2 h-full rounded-lg p-4">
        <h1>Canvas AI</h1>
      </div>
      <Separator orientation="vertical" />
      <div className="w-1/2 h-full rounded-lg p-4">
        <h1>Chatbot</h1>
      </div>
    </div>
  );
};
