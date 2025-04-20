import { NextRequest, NextResponse } from "next/server";
import { openai } from "@ai-sdk/openai";
import { convertToCoreMessages, streamText, type CoreMessage, TextPart, ImagePart } from "ai";
export const maxDuration = 60;

export const POST = async (req: NextRequest) => {
  const { messages, data } = await req.json();
  const imageDataUrl = data?.imageDataUrl as string | undefined;

  const coreMessages: CoreMessage[] = convertToCoreMessages(messages);

  if (coreMessages.length > 0 && imageDataUrl) {
    const lastUserMessage = coreMessages[coreMessages.length - 1];

    if (lastUserMessage.role === 'user') {
      const currentContent = lastUserMessage.content;
      let newContent: (TextPart | ImagePart)[] = [];

      if (typeof currentContent === 'string') {
        newContent.push({ type: 'text', text: currentContent });
      } else if (Array.isArray(currentContent)) {
        newContent = currentContent.filter(
          (part): part is TextPart | ImagePart => part.type === 'text' || part.type === 'image'
        );
      }
      
      try {
        newContent.push({ type: 'image', image: imageDataUrl });
        lastUserMessage.content = newContent;
      } catch (error) {
        console.error("Error creating URL from imageDataUrl:", error);
      }
    }
  }

  console.log(coreMessages);
  const result = await streamText({
    model: openai("gpt-4o"),
    messages: coreMessages,
  });

  return result.toDataStreamResponse();
};
