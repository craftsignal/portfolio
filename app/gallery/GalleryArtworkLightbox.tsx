"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

function isVideoSrc(src: string) {
  return /\.(mp4|webm|ogg)$/i.test(src);
}

const instrumentSerif =
  "font-[family-name:var(--font-instrument-serif),ui-serif,Georgia,serif]";
const instrumentSans =
  "font-[family-name:var(--font-instrument-sans),sans-serif]";

export type GalleryLightboxPayload = {
  id: string;
  title: string;
  src: string;
};

type GalleryArtworkLightboxProps = {
  open: boolean;
  artwork: GalleryLightboxPayload | null;
  onClose: () => void;
  theme: "light" | "dark";
};

const panelVariants = {
  hidden: { opacity: 0, scale: 0.94, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 320,
      damping: 28,
      mass: 0.9,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: 8,
    transition: { duration: 0.22, ease: [0.4, 0, 0.2, 1] as const },
  },
};

export default function GalleryArtworkLightbox({
  open,
  artwork,
  onClose,
  theme,
}: GalleryArtworkLightboxProps) {
  const isLight = theme === "light";
  const isVideo = artwork ? isVideoSrc(artwork.src) : false;

  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Reset mute state each time a new artwork opens
  useEffect(() => {
    if (open) setIsMuted(true);
  }, [open, artwork?.id]);

  // Sync muted property directly on the element so the change is immediate
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = isMuted;
  }, [isMuted]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const backdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose],
  );

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const iconBtnClass = `pointer-events-auto shrink-0 flex items-center justify-center rounded-full p-2 transition-colors ${
    isLight
      ? "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-800"
      : "text-white/50 hover:bg-white/10 hover:text-white"
  }`;

  return (
    <AnimatePresence>
      {open && artwork ? (
        <motion.div
          role="dialog"
          aria-modal
          aria-label={artwork.title}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.26 }}
          onClick={backdropClick}
        >
          <div
            className={`pointer-events-none absolute inset-0 ${
              isLight ? "bg-black/45" : "bg-black/78"
            }`}
            aria-hidden
          />

          <motion.div
            className={`relative z-[1] flex max-h-[min(92dvh,900px)] w-full max-w-4xl flex-col overflow-hidden rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.45)] ${
              isLight
                ? "border border-neutral-200/80 bg-white"
                : "border border-white/10 bg-neutral-950"
            }`}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Header ─────────────────────────────────────────────── */}
            <div
              className={`flex items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-4 ${
                isLight ? "border-b border-neutral-200/80" : "border-b border-white/[0.08]"
              }`}
            >
              <h2
                className={`min-w-0 flex-1 text-left text-lg font-normal tracking-tight sm:text-xl ${instrumentSerif} ${
                  isLight ? "text-neutral-900" : "text-white"
                }`}
              >
                {artwork.title}
              </h2>

              {/* Sound toggle — only visible for video content */}
              {isVideo && (
                <button
                  type="button"
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute" : "Mute"}
                  className={iconBtnClass}
                >
                  {isMuted ? (
                    <VolumeX size={18} strokeWidth={1.5} />
                  ) : (
                    <Volume2 size={18} strokeWidth={1.5} />
                  )}
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className={`${instrumentSans} pointer-events-auto shrink-0 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  isLight
                    ? "bg-neutral-100 text-neutral-800 hover:bg-neutral-200"
                    : "bg-white/10 text-white hover:bg-white/15"
                }`}
              >
                Close
              </button>
            </div>

            {/* ── Content ────────────────────────────────────────────── */}
            <div
              className={`relative min-h-0 flex-1 overflow-y-auto ${
                isLight ? "bg-neutral-100" : "bg-black"
              }`}
            >
              <div className="relative mx-auto flex w-full justify-center p-4 sm:p-8">
                <div className="relative h-[min(75dvh,820px)] w-full max-w-3xl">
                  {isVideo ? (
                    <video
                      ref={videoRef}
                      src={artwork.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="h-full w-full object-contain drop-shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
                    />
                  ) : (
                    <Image
                      src={artwork.src}
                      alt=""
                      fill
                      className="object-contain object-center drop-shadow-[0_8px_32px_rgba(0,0,0,0.25)]"
                      sizes="(max-width: 896px) 100vw, 896px"
                      priority
                      unoptimized={
                        artwork.src.endsWith(".svg") ||
                        artwork.src.endsWith(".gif")
                      }
                    />
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
