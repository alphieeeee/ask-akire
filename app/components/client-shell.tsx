"use client";

import dynamic from "next/dynamic";

const AvatarPanel = dynamic(() => import("./avatar-panel"), { ssr: false });
const ChatPanel = dynamic(() => import("./chat-panel"), { ssr: false });

export default function ClientShell() {
  return <div className="grid min-h-0 flex-1 grid-rows-[minmax(300px,42%)_1fr] lg:grid-cols-[minmax(240px,28%)_1fr] lg:grid-rows-1"><aside className="min-h-0 border-b border-[#252333] lg:border-b-0 lg:border-r"><AvatarPanel /></aside><ChatPanel /></div>;
}
