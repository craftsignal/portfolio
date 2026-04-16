"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import GalleryArtworkLightbox, {
  type GalleryLightboxPayload,
} from "./GalleryArtworkLightbox";
import type { GalleryArtworkMeta } from "./artworkData";
import GalleryGridView from "./GalleryGridView";
import GalleryThemeToggle from "./GalleryThemeToggle";

const instrumentSans =
  "font-[family-name:var(--font-instrument-sans),sans-serif]";
const instrumentSerif =
  "font-[family-name:var(--font-instrument-serif),ui-serif,Georgia,serif]";

const SUBTEXT_MUTED = "#A1A1A1";

const WORLD_GALLERY_BIO =
  "Step into the playful world of my five-year-old son, who loves drawing, gets especially excited about anything related to airplanes, and starts every morning by making sure he sees his little sister before she heads to daycare.";

const LIGHT_PAGE = "#eaeaea";

const GalleryCanvas = dynamic(() => import("./GalleryCanvas"), {
  ssr: false,
  loading: () => (
    <div
      className="fixed inset-0 z-[1] flex items-center justify-center bg-[#000000] font-[family-name:var(--font-instrument-sans),sans-serif] text-sm text-neutral-500"
      aria-busy
      aria-live="polite"
    >
      Loading scene…
    </div>
  ),
});

function toLightboxPayload(art: GalleryArtworkMeta): GalleryLightboxPayload {
  return { id: art.id, title: art.title, src: art.src };
}

export default function GalleryPage() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [viewMode, setViewMode] = useState<"grid" | "world">("grid");
  const [lightbox, setLightbox] = useState<GalleryLightboxPayload | null>(
    null,
  );

  const isLight = theme === "light";
  const pageBg = isLight ? LIGHT_PAGE : "#000000";

  const chromeLightOnDark = !isLight;
  const chromeMuted = isLight ? "#5c5c5c" : SUBTEXT_MUTED;

  const handleArtworkOpen = useCallback((art: GalleryArtworkMeta) => {
    setLightbox(toLightboxPayload(art));
  }, []);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    if (q.get("view") === "world" || q.get("mode") === "world") {
      setViewMode("world");
    }
  }, []);

  return (
    <motion.div
      className={`gallery-route relative flex min-h-dvh w-full flex-col overflow-hidden ${viewMode === "grid" ? "lg:overflow-hidden" : ""}`}
      initial={{ backgroundColor: pageBg }}
      animate={{ backgroundColor: pageBg }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <AnimatePresence mode="sync">
        {viewMode === "world" ? (
          <motion.div
            key="world-canvas"
            className="fixed inset-0 z-[1]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <GalleryCanvas theme={theme} onArtworkOpen={handleArtworkOpen} />
          </motion.div>
        ) : null}
      </AnimatePresence>

      {viewMode === "world" ? (
        <p
          className={`pointer-events-none fixed bottom-8 right-6 z-[25] max-w-[14rem] text-right text-[10px] font-medium uppercase leading-snug tracking-[0.22em] text-neutral-500 sm:bottom-10 sm:right-8 ${instrumentSans}`}
          aria-hidden
        >
          DRAG TO ROTATE · SCROLL TO ZOOM
        </p>
      ) : null}

      <div className="pointer-events-none fixed inset-0 z-[30] flex min-h-dvh flex-col">
        <header className="pointer-events-auto shrink-0 px-5 pt-6 sm:px-8 sm:pt-8">
          <div className="grid w-full grid-cols-1 gap-y-5 gap-x-6 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-y-0">
            <p
              className={`order-2 max-w-xl text-pretty text-sm font-normal leading-relaxed sm:order-1 sm:self-center sm:text-[0.9375rem] sm:leading-[1.55] ${instrumentSerif}`}
              style={{ color: chromeMuted }}
            >
              {WORLD_GALLERY_BIO}
            </p>

            <nav
              className={`order-1 flex h-11 min-h-[2.75rem] shrink-0 items-center justify-center gap-3 self-center text-sm font-medium tracking-wide sm:order-2 ${instrumentSans} ${
                chromeLightOnDark ? "text-white" : "text-neutral-900"
              }`}
              aria-label="Gallery view mode"
            >
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`rounded-sm transition-opacity hover:opacity-90 ${
                  viewMode === "grid"
                    ? `font-semibold ${
                        chromeLightOnDark ? "text-white" : "text-neutral-900"
                      }`
                    : ""
                }`}
                style={
                  viewMode === "grid" ? undefined : { color: chromeMuted }
                }
              >
                Grid
              </button>
              <span
                className={`select-none opacity-40 ${
                  chromeLightOnDark ? "text-neutral-400" : "text-neutral-800"
                }`}
                aria-hidden
              >
                |
              </span>
              <button
                type="button"
                onClick={() => setViewMode("world")}
                className={`rounded-sm transition-opacity hover:opacity-90 ${
                  viewMode === "world"
                    ? `font-semibold ${
                        chromeLightOnDark ? "text-white" : "text-neutral-900"
                      }`
                    : ""
                }`}
                style={
                  viewMode === "world" ? undefined : { color: chromeMuted }
                }
              >
                World
              </button>
            </nav>

            <div className="order-3 flex h-11 min-h-[2.75rem] items-center justify-center sm:justify-end">
              <GalleryThemeToggle
                theme={theme}
                isLight={isLight}
                onToggle={() =>
                  setTheme((t) => (t === "light" ? "dark" : "light"))
                }
              />
            </div>
          </div>
        </header>

        <div
          className={`relative z-0 flex min-h-0 min-w-0 flex-1 flex-col ${
            viewMode === "grid" ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          <AnimatePresence mode="wait">
            {viewMode === "grid" ? (
              <motion.div
                key="grid-view"
                className="min-h-0 flex-1"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              >
                <GalleryGridView isLight={isLight} />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        <div className="pointer-events-auto mt-auto shrink-0 px-5 pb-8 sm:px-8">
          <Link
            href="/"
            className={`inline-flex text-sm font-medium underline-offset-4 transition-opacity hover:opacity-80 ${instrumentSans} ${
              chromeLightOnDark
                ? "text-white underline decoration-white/35"
                : "text-neutral-900 underline decoration-neutral-900/35"
            }`}
          >
            ← Back home
          </Link>
        </div>
      </div>

      <GalleryArtworkLightbox
        open={lightbox !== null}
        artwork={lightbox}
        onClose={() => setLightbox(null)}
        theme={theme}
      />
    </motion.div>
  );
}
