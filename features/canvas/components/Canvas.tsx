'use client';

import React, { useRef, useState, useEffect, useCallback, useImperativeHandle, forwardRef } from 'react';

interface CanvasProps {
  width?: number;
  height?: number;
  className?: string;
  lineWidth?: number;
  strokeColor?: string;
}

// Define the type for the imperative methods we want to expose
export interface CanvasRef {
  clear: () => void;
  getImageDataUrl: () => string | null;
}

// Wrap component definition with forwardRef
export const Canvas = forwardRef<CanvasRef, CanvasProps>((
  {
    width = 800,
    height = 600,
    className = '',
    lineWidth = 2,
    strokeColor = 'black',
  },
  ref
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  // Expose the clear method using useImperativeHandle
  useImperativeHandle(ref, () => ({
    clear: () => {
      if (context && canvasRef.current) {
        // Clear the canvas (makes it transparent)
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        
        // Fill the canvas with white
        context.fillStyle = 'white'; // Set fill color to white
        context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height); // Fill the entire canvas
      }
    },
    getImageDataUrl: (): string | null => {
      if (canvasRef.current) {
        try {
          return canvasRef.current.toDataURL();
        } catch (error) {
          console.error("Error getting canvas data URL:", error);
          return null;
        }
      }
      return null;
    }
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Initial white background fill
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Set drawing properties
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeColor;
        
        setContext(ctx);
      }
    }
    // Only depend on dimensions and lineWidth for initial setup/refill
  }, [width, height, lineWidth]);

  // Update context properties if props change AFTER initial setup
  useEffect(() => {
    if (context) {
      context.lineWidth = lineWidth;
      context.strokeStyle = strokeColor;
    }
  }, [lineWidth, strokeColor, context]);

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
      className={`bg-white ${className} cursor-crosshair`}
    />
  );
});

Canvas.displayName = 'Canvas'; // Add display name for DevTools 