"use client";

import type { FormEvent, ReactNode } from "react";
import { useEffect, useState } from "react";
import type { UIMessage } from "ai";
import { useChat } from "@ai-sdk/react";

const urlPattern = /(https?:\/\/[^\s]+)/g;

function renderTextWithLinks(text: string): ReactNode[] {
  return text.split(urlPattern).map((part, index) => {
    if (!part.match(/^https?:\/\//)) {
      return <span key={`${part}-${index}`}>{part}</span>;
    }

    const cleanUrl = part.replace(/[),.!?]+$/, "");
    const trailingText = part.slice(cleanUrl.length);

    return (
      <span key={`${part}-${index}`}>
        <a
          href={cleanUrl}
          target="_blank"
          rel="noreferrer"
          className="text-[#7d83ff] underline underline-offset-4 hover:text-[#ceccff]"
        >
          {cleanUrl}
        </a>
        {trailingText}
      </span>
    );
  });
}

export default function ChatPanel({
  onStreamingChange,
  suggestion,
  onSuggestionSent,
}: {
  onStreamingChange: (isStreaming: boolean) => void;
  suggestion: string;
  onSuggestionSent: () => void;
}) {
  const [input, setInput] = useState("");

  const { messages, sendMessage, status, stop, error } = useChat<UIMessage>({
    messages: [
      {
        id: "welcome",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "Welcome. Ask me about Alpeville's experience, skills, or projects.",
          },
        ],
      },
    ],
  });

  const isBusy = status === "submitted" || status === "streaming";

  useEffect(() => {
    onStreamingChange(status === "streaming");
  }, [onStreamingChange, status]);

  useEffect(() => {
    if (!suggestion || isBusy) return;

    void sendMessage({ text: suggestion });
    onSuggestionSent();
  }, [isBusy, onSuggestionSent, sendMessage, suggestion]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const content = input.trim();

    if (!content || isBusy) {
      return;
    }

    void sendMessage({ text: content });
    setInput("");
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  }

  return (
    <section
      className="flex min-h-0 min-w-0 flex-1 flex-col"
      aria-label="Conversation"
    >
      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-5 py-8 sm:px-10 sm:py-12">
          {messages.map((message) => {
            const text = message.parts
              .filter((part) => part.type === "text")
              .map((part) => part.text)
              .join("");

            const isUser = message.role === "user";

            return (
              <article
                className={`mb-9 max-w-2xl last:mb-0 ${
                  isUser ? "ml-auto" : ""
                }`}
                key={message.id}
              >
                <div
                  className={`mb-3 flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[.12em] ${
                    isUser
                      ? "justify-end text-[#77758e]"
                      : "text-[#7d83ff]"
                  }`}
                >
                  <span
                    className={`h-[5px] w-[5px] rounded-full ${
                      isUser ? "bg-[#77758e]" : "bg-[#7d83ff]"
                    }`}
                  />
                  {isUser ? "You" : "Assistant"}
                </div>

                <p
                  className={`m-0 whitespace-pre-wrap ${
                    isUser
                      ? "rounded border border-[#252333] bg-[#08080d] px-4 py-3.5 text-sm leading-6 text-[#aaa8c7]"
                      : "text-[clamp(17px,2vw,21px)] leading-[1.55] tracking-[-.02em] text-[#ceccff]"
                  }`}
                >
                  {renderTextWithLinks(text)}
                </p>
              </article>
            );
          })}

          {status === "submitted" && (
            <p className="font-mono text-xs text-[#77758e]">
              Reviewing profile…
            </p>
          )}

          {error && (
            <p className="mt-4 text-sm text-red-300">
              Something went wrong. Check your API key and try again.
            </p>
          )}
        </div>
      </div>

      <div className="mx-auto w-full max-w-3xl px-5 pb-5 sm:px-10 sm:pb-7">
        <form
          className="flex items-end gap-3 rounded border border-[#39365a] bg-[#07070b] p-3.5 pl-[18px] focus-within:border-[#7d83ff]"
          onSubmit={handleSubmit}
        >
          <textarea
            aria-label="Message"
            value={input}
            disabled={isBusy}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about Alpeville..."
            rows={1}
            className="max-h-[120px] min-h-6 flex-1 resize-none border-0 bg-transparent text-[15px] leading-6 text-[#ceccff] outline-none placeholder:text-[#77758e]"
          />

          {isBusy ? (
            <button
              type="button"
              onClick={() => void stop()}
              className="h-[34px] rounded border border-[#7d83ff] px-3 font-mono text-xs text-[#ceccff]"
            >
              Stop
            </button>
          ) : (
            <button
              className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded border-0 bg-[#7d83ff] text-[21px] text-[#07070b]"
              aria-label="Send message"
              type="submit"
            >
              ↗
            </button>
          )}
        </form>

        <p className="m-0 mt-2 font-mono text-[10px] tracking-[.04em] text-[#77758e]">
          Enter to send
          <span className="px-1.5 text-[#7d83ff]">·</span>
          Shift + Enter for a new line
        </p>
      </div>
    </section>
  );
}
