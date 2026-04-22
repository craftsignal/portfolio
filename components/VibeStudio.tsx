"use client";

import html2canvas from "html2canvas";
import { useCallback, useEffect, useId, useRef, useState } from "react";

const instrumentSans =
  "font-[family-name:var(--font-instrument-sans),sans-serif]";

/** Order of letters in `combined_letters.jpg` (left → right, 4-in-1 strip). */
const BALLOON_SPRITE_CHARS = ["A", "F", "C", "E"] as const;

const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/$/, "") ?? "";
const SPRITE_URL = `${basePath}/assets/3d-letters/balloon/combined_letters.jpg`;

function spriteBackgroundPosition(index: number): string {
  const n = BALLOON_SPRITE_CHARS.length;
  if (n <= 1) return "0% 0%";
  const x = (index / (n - 1)) * 100;
  return `${x}% 0%`;
}

function mapInputToDisplayChars(raw: string): string[] {
  const trimmed = raw.trim().toUpperCase().slice(0, 12);
  if (!trimmed.length) return ["A", "F", "C", "E"];
  return trimmed.split("");
}

export type VibeStudioVariant = "card" | "page";

type VibeStudioProps = {
  /** `card` = home grid tile; `page` = dedicated route with more room */
  variant?: VibeStudioVariant;
};

export default function VibeStudio({ variant = "card" }: VibeStudioProps) {
  const [inputValue, setInputValue] = useState("AFCE");
  const exportRef = useRef<HTMLDivElement | null>(null);
  /** `loading` until we probe the sprite URL (avoids flash + wrong blend). */
  const [assetStatus, setAssetStatus] = useState<"loading" | "ok" | "missing">("loading");
  const labelId = useId();

  useEffect(() => {
    setAssetStatus("loading");
    const img = new Image();
    img.onload = () => setAssetStatus("ok");
    img.onerror = () => setAssetStatus("missing");
    img.src = SPRITE_URL;
  }, []);

  const isPage = variant === "page";
  const chars = mapInputToDisplayChars(inputValue);

  const handleSave = useCallback(async () => {
    const node = exportRef.current;
    if (!node) return;
    try {
      const canvas = await html2canvas(node, {
        backgroundColor: "#0a0a0a",
        scale: 2,
        useCORS: true,
        logging: false,
      });
      const url = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = url;
      a.download = `vibe-studio-${Date.now()}.png`;
      a.click();
    } catch (e) {
      console.warn("[VibeStudio] Save PNG failed", e);
    }
  }, []);

  const rootClass = isPage
    ? "relative z-[1] isolate flex min-h-[min(72vh,560px)] flex-col overflow-hidden rounded-2xl border border-dashed border-white/20 bg-white/[0.05] p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] sm:p-6"
    : "relative z-[1] isolate flex aspect-[4/3] min-h-[200px] flex-col overflow-hidden rounded-2xl border border-dashed border-white/20 bg-white/[0.05] p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] sm:min-h-[220px] sm:p-4";

  return (
    <div className={`${rootClass} ${instrumentSans}`}>
      <div ref={exportRef} className="flex min-h-0 flex-1 flex-col gap-3">
        <p
          className={`font-medium uppercase tracking-[0.2em] text-neutral-500 ${isPage ? "text-xs" : "text-[10px]"}`}
        >
          3D Text Studio
        </p>

        <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-2">
          {/* Isolate blend so it does not composite with sibling grid cards */}
          <div
            className="max-w-full rounded-xl bg-black px-3 py-3"
            style={{ isolation: "isolate" }}
          >
            <div
              className="flex flex-wrap items-end justify-center gap-1.5 sm:gap-2"
              style={{ mixBlendMode: "multiply" }}
              aria-label="Balloon letter preview"
            >
              {assetStatus === "ok"
                ? chars.map((ch, i) => {
                    const idx = BALLOON_SPRITE_CHARS.indexOf(
                      ch as (typeof BALLOON_SPRITE_CHARS)[number],
                    );
                    if (idx < 0) {
                      return (
                        <span
                          key={`${i}-${ch}`}
                          className={`flex items-center justify-center rounded border border-dashed border-white/15 text-neutral-500 ${isPage ? "h-16 w-10 text-sm sm:h-[4.5rem] sm:w-12" : "h-12 w-8 text-xs sm:h-14 sm:w-9"}`}
                          title="Only A, F, C, E are in the sprite sheet"
                        >
                          {ch}
                        </span>
                      );
                    }
                    return (
                      <div
                        key={`${i}-${ch}-${idx}`}
                        className={
                          isPage
                            ? "h-16 w-[3.25rem] shrink-0 sm:h-[4.5rem] sm:w-14"
                            : "h-12 w-10 shrink-0 sm:h-14 sm:w-11"
                        }
                        style={{
                          backgroundImage: `url(${SPRITE_URL})`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: `${BALLOON_SPRITE_CHARS.length * 100}% 100%`,
                          backgroundPosition: spriteBackgroundPosition(idx),
                        }}
                        role="img"
                        aria-label={`Balloon letter ${ch}`}
                      />
                    );
                  })
                : null}
              {assetStatus === "loading" ? (
                <div
                  className={`flex items-center gap-1.5 text-neutral-500 ${isPage ? "h-20 text-sm" : "h-14 text-[11px]"}`}
                >
                  <span className="inline-block size-2 animate-pulse rounded-full bg-neutral-500" />
                  Loading sprite…
                </div>
              ) : null}
            </div>
          </div>
          {assetStatus === "missing" ? (
            <p className="max-w-[16rem] text-center text-[11px] leading-relaxed text-neutral-500">
              Add{" "}
              <code className="rounded bg-white/10 px-1 py-0.5 text-neutral-300">
                combined_letters.jpg
              </code>{" "}
              to{" "}
              <code className="rounded bg-white/10 px-1 py-0.5 text-neutral-300">
                public/assets/3d-letters/balloon/
              </code>{" "}
              in your repo, then{" "}
              <code className="whitespace-nowrap rounded bg-white/10 px-1 py-0.5 text-neutral-300">
                git add → commit → push main
              </code>{" "}
              so GitHub Pages can serve it (local-only files never reach tians.space).
            </p>
          ) : null}
        </div>

        <div className="mt-auto flex flex-col gap-2 border-t border-white/10 pt-3 sm:flex-row sm:items-center">
          <label htmlFor={labelId} className="sr-only">
            Balloon text (A, F, C, E)
          </label>
          <input
            id={labelId}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="AFCE…"
            maxLength={16}
            className="min-w-0 flex-1 rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm text-neutral-100 placeholder:text-neutral-600 outline-none ring-0 transition focus:border-white/30 focus:bg-black/55"
            spellCheck={false}
          />
          <button
            type="button"
            onClick={handleSave}
            className="shrink-0 rounded-xl border border-white/15 bg-neutral-100 px-3 py-2 text-xs font-medium uppercase tracking-wider text-neutral-900 transition hover:bg-white active:scale-[0.98] sm:text-[11px]"
          >
            Save PNG
          </button>
        </div>
      </div>

    </div>
  );
}
