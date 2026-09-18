import { streamText, type UIMessage } from "ai";
import { chatConfig, systemPrompt } from "@/lib/chat/config";
import { chatModel } from "@/lib/chat/providers/openai";
import { prepareChatMessages } from "@/lib/chat/messages";

export const maxDuration = 30;

export async function POST(request: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return Response.json(
      { error: "OPENAI_API_KEY is not configured on the server." },
      { status: 500 },
    );
  }

  try {
    const body = (await request.json()) as { messages?: UIMessage[] };
    if (!Array.isArray(body.messages)) {
      return Response.json({ error: "messages must be an array." }, { status: 400 });
    }

    const messages = await prepareChatMessages(body.messages);
    const result = streamText({
      model: chatModel,
      system: systemPrompt,
      messages,
      maxOutputTokens: chatConfig.maxOutputTokens,
      temperature: 0.2,
    });

    return result.toUIMessageStreamResponse();
  } catch {
    return Response.json(
      { error: "The assistant could not process this request." },
      { status: 400 },
    );
  }
}
