import Link from "next/link";

const instrumentSans =
  "font-[family-name:var(--font-instrument-sans),sans-serif]";

export default function VibeCodingGrid() {
  const placeholders = Array.from({ length: 6 }, (_, i) => i);

  const tileShell =
    "relative flex aspect-[4/3] min-h-[160px] flex-col overflow-hidden rounded-2xl border border-dashed border-white/20 bg-white/[0.05] shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset]";

  return (
    <div className="relative z-10 w-full max-w-5xl">
      <h2 className="text-center font-serif text-2xl font-normal italic text-neutral-200 sm:text-3xl md:text-[2rem]">
        Current Vibe Coding Experiments
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {placeholders.map((i) =>
          i === 0 ? (
            <Link
              key="vibe-studio"
              href="/vibe-studio/"
              className={`group ${tileShell} p-3 transition-[border-color,background-color,transform] duration-200 hover:border-white/30 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 active:scale-[0.99] sm:p-4 ${instrumentSans}`}
            >
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-500">
                3D Text Studio
              </p>
              <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3 px-2 text-center">
                <p className="text-xs leading-snug text-neutral-400 sm:text-sm">
                  Balloon sprite collage and PNG export — opens full layout.
                </p>
                <span className="rounded-full border border-white/20 bg-white/[0.08] px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider text-neutral-200 transition group-hover:border-white/35 group-hover:bg-white/[0.12] group-hover:text-white">
                  Open experiment →
                </span>
              </div>
            </Link>
          ) : (
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
          ),
        )}
      </div>
    </div>
  );
}
