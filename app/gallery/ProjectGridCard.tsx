"use client";

import Link from "next/link";
import type { WorkGridProject } from "./workGridData";

const instrumentSerif =
  "font-[family-name:var(--font-instrument-serif),ui-serif,Georgia,serif]";
const instrumentSans =
  "font-[family-name:var(--font-instrument-sans),ui-sans-serif,system-ui,sans-serif]";

const MUTED = "#A1A1A1";

type ProjectGridCardProps = {
  project: WorkGridProject;
  isLight: boolean;
};

function MediaPlaceholder({
  variant,
  isLight,
}: {
  variant: WorkGridProject["variant"];
  isLight: boolean;
}) {
  const thumbBg = isLight ? "bg-[#F4F4F5]" : "bg-[#27272A]";
  const base = `relative aspect-square w-full overflow-hidden rounded-2xl border shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-transform duration-300 group-hover:scale-[1.01] ${isLight ? "border-black/[0.06]" : "border-white/[0.08]"}`;

  switch (variant) {
    case "aurora":
      return (
        <div
          className={`${base} border-[#0f2e1f]/40`}
          style={{ backgroundColor: "#134e2a" }}
        >
          <div className="flex h-full w-full flex-col items-center justify-center p-6">
            <span
              className={`${instrumentSerif} text-4xl font-normal tracking-tight sm:text-5xl`}
              style={{ color: "#6ee7b7" }}
              aria-hidden
            >
              AMS
            </span>
            <span
              className={`mt-3 text-center text-[11px] uppercase tracking-[0.2em] ${instrumentSans}`}
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Placeholder — Montessori green
            </span>
          </div>
        </div>
      );
    case "cbc":
      return (
        <div
          className={`${base} ${thumbBg}`}
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(120,150,180,0.35) 0%, rgba(60,50,45,0.65) 100%), linear-gradient(to bottom, #e8e4dc 0%, #9c8b7a 100%)",
          }}
        >
          <div className="absolute inset-0 bg-black/25" aria-hidden />
          <p
            className={`absolute inset-0 flex items-center justify-center px-4 text-center ${instrumentSerif} text-2xl font-normal tracking-[0.02em] text-white sm:text-3xl md:text-4xl`}
          >
            ON THE INSIDE
          </p>
        </div>
      );
    case "asp":
      return (
        <div
          className={`${base} ${thumbBg} flex items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-950`}
        >
          <span
            className={`${instrumentSerif} text-5xl font-normal tracking-tighter text-white sm:text-6xl md:text-7xl`}
            aria-hidden
          >
            ALP
          </span>
        </div>
      );
    case "heritage":
      return (
        <div
          className={`${base}`}
          style={{ backgroundColor: "#15803d" }}
        >
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-6">
            <svg
              width="88"
              height="72"
              viewBox="0 0 88 72"
              className="text-white/95"
              fill="none"
              aria-hidden
            >
              <path
                d="M44 4L8 30v38h16V48h40v20h16V30L44 4z"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
              <path
                d="M28 48h32"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span
              className={`text-center text-[10px] uppercase tracking-[0.18em] ${instrumentSans}`}
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              Placeholder mark
            </span>
          </div>
        </div>
      );
    default:
      return (
        <div className={`${base} ${thumbBg}`} aria-hidden />
      );
  }
}

export default function ProjectGridCard({ project, isLight }: ProjectGridCardProps) {
  const titleColor = isLight ? "text-neutral-900" : "text-white";

  return (
    <Link
      href={`/gallery/${project.id}`}
      className={`group block min-w-0 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
        isLight
          ? "focus-visible:ring-black/25"
          : "focus-visible:ring-white/40"
      }`}
    >
      <article>
        <MediaPlaceholder variant={project.variant} isLight={isLight} />
        <h2
          className={`${instrumentSerif} mt-5 text-left text-2xl font-normal leading-snug tracking-tight ${titleColor}`}
        >
          {project.title}
        </h2>
        <p
          className={`${instrumentSans} mt-2 max-w-prose text-left text-base font-normal leading-relaxed`}
          style={{ color: MUTED }}
        >
          {project.description}
        </p>
      </article>
    </Link>
  );
}
