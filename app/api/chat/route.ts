import { NextRequest, NextResponse } from "next/server";
import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export const runtime = "edge";
export const maxDuration = 60;

export const POST = async (req: NextRequest) => {
  const { messages } = await req.json();
  const response = await streamText({
    model: google("gemini-2.0-flash-001"),
    messages,
  });
  return response.toDataStreamResponse();
};
