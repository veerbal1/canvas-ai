'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';

interface CanvasProps {
  width?: number;
  height?: number;
  className?: string;
  lineWidth?: number;
  strokeColor?: string;
}

export const Canvas: React.FC<CanvasProps> = ({
  width = 800,
  height = 600,
  className = '',
  lineWidth = 2,
  strokeColor = 'black',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeColor;
        setContext(ctx);
      }
    }
  }, [lineWidth, strokeColor]); // Re-run if props change

  const getCoordinates = useCallback((event: React.MouseEvent<HTMLCanvasElement>): { x: number; y: number } => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;    // Relationship bitmap vs. element for X
    const scaleY = canvas.height / rect.height;  // Relationship bitmap vs. element for Y

    return {
      x: (event.clientX - rect.left) * scaleX,   // Scale mouse coordinates after they have
      y: (event.clientY - rect.top) * scaleY     // been adjusted to be relative to element
    };
  }, []);

  const startDrawing = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!context) return;
    const { x, y } = getCoordinates(event);
    context.beginPath();
    context.moveTo(x, y);
    setIsDrawing(true);
  }, [context, getCoordinates]);

  const draw = useCallback((event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !context) return;
    const { x, y } = getCoordinates(event);
    context.lineTo(x, y);
    context.stroke();
  }, [isDrawing, context, getCoordinates]);

  const endDrawing = useCallback(() => {
    if (!context) return;
    context.closePath();
    setIsDrawing(false);
  }, [context]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={endDrawing}
      onMouseLeave={endDrawing} // End drawing if mouse leaves canvas
      className={`border border-gray-300 bg-white ${className}`}
    />
  );
}; 