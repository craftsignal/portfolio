"use client";

import { motion } from "framer-motion";

type GalleryThemeMode = "light" | "dark";

type GalleryThemeToggleProps = {
  theme: GalleryThemeMode;
  onToggle: () => void;
  isLight: boolean;
};

/** Pill toggle: light = sun emphasis left, dark = moon emphasis right (reference-style). */
export default function GalleryThemeToggle({
  theme,
  onToggle,
  isLight,
}: GalleryThemeToggleProps) {
  const track =
    "relative flex h-11 w-[4.75rem] shrink-0 cursor-pointer items-center rounded-full border p-1 shadow-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
  const trackLight =
    "border-neutral-900/15 bg-white/90 focus-visible:ring-neutral-900/40";
  const trackDark =
    "border-white/20 bg-white/10 focus-visible:ring-white/50";

  const iconLight = isLight ? "text-neutral-900" : "text-neutral-400";
  const iconDark = !isLight ? "text-white" : "text-neutral-500";

  return (
    <motion.button
      type="button"
      onClick={onToggle}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      className={`${track} ${isLight ? trackLight : trackDark}`}
      whileTap={{ scale: 0.97 }}
    >
      <motion.span
        className={`pointer-events-none absolute top-1 h-9 w-9 rounded-full ${
          isLight ? "bg-neutral-900/10" : "bg-white/20"
        }`}
        initial={false}
        animate={{
          left: theme === "light" ? 4 : "calc(100% - 2.25rem - 4px)",
        }}
        transition={{
          type: "spring",
          stiffness: 420,
          damping: 30,
        }}
      />
      <span className="relative z-[1] flex w-full items-center justify-between px-[3px]">
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center ${iconLight}`}
          aria-hidden
        >
          <SunGlyph />
        </span>
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center ${iconDark}`}
          aria-hidden
        >
          <MoonGlyph />
        </span>
      </span>
    </motion.button>
  );
}

function SunGlyph() {
  return (
    <svg
      className="block h-[1.125rem] w-[1.125rem] shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonGlyph() {
  return (
    <svg
      className="block h-[1.125rem] w-[1.125rem] shrink-0"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M21 14.5A7.5 7.5 0 019.5 4.05 6 6 0 1021 14.5z" />
    </svg>
  );
}
