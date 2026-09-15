import ClientShell from "./components/client-shell";

export default function Home() {
  return (
    <main className="flex h-dvh min-h-[600px] w-full flex-col overflow-hidden bg-black text-[#ceccff]">
      <header className="flex shrink-0 items-center gap-3 border-b border-[#252333] px-5 py-4 lg:px-8 lg:py-6">
        <div className="flex h-6 items-end gap-[3px]" aria-hidden="true"><span className="h-3 w-[5px] rounded-sm bg-[#7d83ff]/50" /><span className="h-5 w-[5px] rounded-sm bg-[#7d83ff]" /><span className="h-4 w-[5px] rounded-sm bg-[#7d83ff]/75" /></div>
        <div><p className="m-0 font-mono text-[10px] font-bold tracking-[.14em] text-[#7d83ff]">STREAM / 01</p><h1 className="m-0 text-base font-medium">Open channel</h1></div>
        <span className="ml-auto font-mono text-[10px] uppercase tracking-[.14em] text-[#77758e]">Live interface</span>
      </header>
      <ClientShell />
    </main>
  );
}
