import dynamic from "next/dynamic";

const AvatarCanvas = dynamic(() => import("./avatar-canvas"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-[#7d83ff]/5" aria-label="Loading avatar" />,
});

const suggestions = ["Help me shape an idea", "Summarize this for me", "What should I do next?"];

export default function AvatarPanel({ onSuggestion }: { onSuggestion?: (suggestion: string) => void }) {
  return (
    <div className="flex min-h-0 flex-col items-center gap-5 px-5 py-7 lg:justify-center lg:px-8 lg:py-10">
      <div className="avatar-container relative aspect-square overflow-hidden rounded-full border border-[#7d83ff]/40 bg-[radial-gradient(circle_at_50%_35%,#292a5b_0%,#0b0b16_55%,#030305_100%)] shadow-[0_0_70px_rgba(125,131,255,.16)]">
        <AvatarCanvas />
        <div className="pointer-events-none absolute inset-3 rounded-full border border-[#ceccff]/10" />
      </div>
      <div className="w-full max-w-[300px]">
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[.14em] text-[#77758e]">Try a direction</p>
        <div className="flex flex-col gap-2">
          {suggestions.map((suggestion) => (
            <button key={suggestion} type="button" onClick={() => onSuggestion?.(suggestion)} className="group flex items-center justify-between rounded border border-[#252333] bg-[#07070b] px-3 py-2.5 text-left text-xs text-[#aaa8c7] transition-colors hover:border-[#7d83ff] hover:text-[#ceccff]">
              <span>{suggestion}</span><span className="text-[#7d83ff] opacity-0 transition-opacity group-hover:opacity-100">↗</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

