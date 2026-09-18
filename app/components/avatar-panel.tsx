"use client";

import { Component, type ReactNode } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

const AvatarCanvas = dynamic(() => import("./avatar-canvas"), {
  ssr: false,
  loading: () => <AvatarFallback title="Preparing Akire" detail="Loading the 3D experience…" />,
});

const suggestions = [
  "About Alps",
  "What does he do?",
  "What tech stack does he use?",
];

function AvatarFallback({
  title = "Akire",
  detail = "This device cannot display the 3D avatar",
}: {
  title?: string;
  detail?: string;
}) {
  return (
    <div className="relative h-full min-h-[180px] w-full overflow-hidden text-center">
      <Image
        src="/akire-image.png"
        alt="Akire avatar"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#030305] via-transparent to-transparent" />
      <div className="absolute inset-x-4 bottom-5">
        <p className="m-0 text-sm font-medium text-[#ceccff]">{title}</p>
        <p className="m-0 mt-1 text-xs leading-5 text-[#ceccff]/70">{detail}</p>
      </div>
    </div>
  );
}

class AvatarErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <AvatarFallback />;
    }

    return this.props.children;
  }
}

export default function AvatarPanel({
  onSuggestion,
  isStreaming,
}: {
  onSuggestion?: (suggestion: string) => void;
  isStreaming: boolean;
}) {
  return (
    <div className="flex min-h-0 flex-col items-center gap-5 px-5 py-7 md:flex-row md:justify-center lg:flex-col lg:px-8 lg:py-10">
      <div className="avatar-container relative aspect-square shrink overflow-hidden rounded-full border border-[#7d83ff]/40 bg-[radial-gradient(circle_at_50%_35%,#292a5b_0%,#0b0b16_55%,#030305_100%)] shadow-[0_0_70px_rgba(125,131,255,.16)]">
        <AvatarErrorBoundary>
          <AvatarCanvas isStreaming={isStreaming} />
        </AvatarErrorBoundary>
        <div className="pointer-events-none absolute inset-3 rounded-full border border-[#ceccff]/10" />
      </div>
      <div className="hidden w-full max-w-[300px] md:block">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[.14em] text-[#77758e]">
          Ask Akire
        </p>
        <div className="flex flex-col gap-2">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => onSuggestion?.(suggestion)}
              className="group flex items-center justify-between rounded border border-[#252333] bg-[#07070b] px-3 py-2.5 text-left text-xs text-[#aaa8c7] transition-colors hover:border-[#7d83ff] hover:text-[#ceccff]"
            >
              <span>{suggestion}</span>
              <span className="text-[#7d83ff] opacity-0 transition-opacity group-hover:opacity-100">
                ↗
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
