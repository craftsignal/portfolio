export default function VibeCodingGrid() {
  const placeholders = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div className="w-full max-w-5xl">
      <h2 className="text-center font-serif text-2xl font-normal italic text-neutral-200 sm:text-3xl md:text-[2rem]">
        Current Vibe Coding Experiments
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {placeholders.map((i) => (
          <div
            key={i}
            className="relative flex aspect-[4/3] min-h-[160px] items-center justify-center rounded-2xl border border-dashed border-white/20 bg-white/[0.05] shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset]"
          >
            <span
              className="pointer-events-none rounded-full border border-indigo-400/25 bg-neutral-900/80 px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-indigo-200/90 sm:text-xs"
              style={{
                animation: "soft-pulse 2.4s ease-in-out infinite",
              }}
            >
              Coming Soon
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
