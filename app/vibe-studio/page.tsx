import type { Metadata } from "next";
import Link from "next/link";
import VibeStudio from "@/components/VibeStudio";

const instrumentSans =
  "font-[family-name:var(--font-instrument-sans),sans-serif]";

export const metadata: Metadata = {
  title: "3D Text Studio — Tian",
  description:
    "Balloon-letter sprite preview and PNG export — a small vibe coding experiment.",
};

export default function VibeStudioPage() {
  return (
    <main className="min-h-full bg-neutral-950 text-neutral-100">
      <header className="border-b border-white/[0.06] px-6 py-5 sm:px-10">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <Link
            href="/"
            className={`${instrumentSans} text-sm font-medium text-neutral-400 transition hover:text-neutral-100`}
          >
            ← Home
          </Link>
          <span
            className={`${instrumentSans} text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-600`}
          >
            Experiments
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-3xl space-y-6 px-6 py-10 sm:px-10 sm:py-14">
        <div className="space-y-2">
          <h1 className="font-serif text-2xl font-normal italic text-neutral-100 sm:text-3xl">
            3D Text Studio
          </h1>
          <p className={`${instrumentSans} max-w-xl text-sm leading-relaxed text-neutral-400 sm:text-base`}>
            Type up to twelve characters; A, F, C, and E map to the balloon sprite
            sheet. Save a PNG when you like the composition.
          </p>
        </div>

        <VibeStudio variant="page" />
      </div>
    </main>
  );
}
