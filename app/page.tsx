import { CanvasAI } from "@/features/canvas";

// Helper function to generate random number within a range
const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;

export default function Home() {
  // Generate properties for multiple balls
  const balls = Array.from({ length: 10 }).map((_, i) => ({
    id: i,
    top: `${getRandom(10, 90)}%`,
    left: `${getRandom(10, 90)}%`,
    width: `${getRandom(50, 150)}px`,
    height: `${getRandom(50, 150)}px`,
    borderRadius: '9999px', // Use large value for oval/circle
    // Add random animation duration and delay
    animationDuration: `${getRandom(4, 10)}s`, // Duration between 4s and 10s
    animationDelay: `${getRandom(0, 5)}s`,    // Delay between 0s and 5s
  }));

  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Map over the balls array to render each ball */}
      {balls.map(ball => (
        <div
          key={ball.id}
          className="absolute bg-gradient-to-br from-red-500 via-purple-500 to-blue-500 animate-float-custom z-0"
          style={{
            top: ball.top,
            left: ball.left,
            width: ball.width,
            height: ball.height,
            borderRadius: ball.borderRadius,
            // Apply random duration and delay
            animationDuration: ball.animationDuration,
            animationDelay: ball.animationDelay,
          }}
        ></div>
      ))}
      <div className="p-10 z-10 h-full w-full bg-transparent border relative">
        <CanvasAI />
      </div>
    </div>
  );
}
