"use client";

import { FormEvent, useState } from "react";

type Message = { role: "user" | "assistant"; content: string };
const initialMessages: Message[] = [{ role: "assistant", content: "Welcome back. I’m ready to help you think through an idea, answer a question, or turn a rough thought into something useful." }];

export default function ChatPanel() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  function sendMessage(value: string) {
    const content = value.trim();
    if (!content) return;
    setMessages((current) => [...current, { role: "user", content }, { role: "assistant", content: "I’ve got it. This is a placeholder response for the streaming interface—connect your model endpoint here to continue the conversation." }]);
    setInput("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); sendMessage(input); }

  return (
    <section className="flex min-h-0 min-w-0 flex-1 flex-col" aria-label="Conversation">
      <div className="min-h-0 flex-1 overflow-y-auto"><div className="mx-auto max-w-3xl px-5 py-8 sm:px-10 sm:py-12">{messages.map((message, index) => <article className={`mb-9 max-w-2xl last:mb-0 ${message.role === "user" ? "ml-auto" : ""}`} key={`${message.role}-${index}`}><div className={`mb-3 flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[.12em] ${message.role === "user" ? "justify-end text-[#77758e]" : "text-[#7d83ff]"}`}><span className={`h-[5px] w-[5px] rounded-full ${message.role === "user" ? "bg-[#77758e]" : "bg-[#7d83ff]"}`} />{message.role === "assistant" ? "Assistant" : "You"}</div><p className={`m-0 ${message.role === "user" ? "rounded border border-[#252333] bg-[#08080d] px-4 py-3.5 text-sm leading-6 text-[#aaa8c7]" : "text-[clamp(17px,2vw,21px)] leading-[1.55] tracking-[-.02em] text-[#ceccff]"}`}>{message.content}</p></article>)}</div></div>
      <div className="mx-auto w-full max-w-3xl px-5 pb-5 sm:px-10 sm:pb-7"><form className="flex items-end gap-3 rounded border border-[#39365a] bg-[#07070b] p-3.5 pl-[18px] transition-colors focus-within:border-[#7d83ff]" onSubmit={handleSubmit}><textarea aria-label="Message" value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); event.currentTarget.form?.requestSubmit(); } }} placeholder="Ask anything..." rows={1} className="max-h-[120px] min-h-6 flex-1 resize-none border-0 bg-transparent text-[15px] leading-6 text-[#ceccff] outline-none placeholder:text-[#77758e]" /><button className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded border-0 bg-[#7d83ff] text-[21px] leading-none text-[#07070b] transition-colors hover:bg-[#ceccff]" aria-label="Send message" type="submit">↗</button></form><p className="m-0 mt-2 font-mono text-[10px] tracking-[.04em] text-[#77758e]">Enter to send <span className="px-1.5 text-[#7d83ff]">·</span> Shift + Enter for a new line</p></div>
    </section>
  );
}

