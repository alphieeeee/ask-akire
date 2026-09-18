import { convertToModelMessages, type UIMessage } from "ai";

export async function prepareChatMessages(messages: UIMessage[]) {
  const recentMessages = messages.slice(-12).map((message) => ({
    ...message,
    parts: message.parts.map((part) =>
      part.type === "text"
        ? { ...part, text: part.text.slice(0, 2_000) }
        : part,
    ),
  }));

  return convertToModelMessages(recentMessages);
}
