"use client";

import { AnimatePresence, motion } from "framer-motion";

import {
  BUBBLE_SPRING,
  TEXT_SWAP_SPRING,
} from "../lib/catPetConfig";

const instrumentSans =
  "font-[family-name:var(--font-instrument-sans),sans-serif]";

const bubbleShellClass =
  `relative rounded-2xl border border-white/20 bg-white/10 px-3.5 py-2.5 shadow-[0_4px_24px_rgba(0,0,0,0.18)] backdrop-blur-md sm:px-4 sm:py-3 ${instrumentSans}`;

const textClass =
  `${instrumentSans} text-left text-[14px] font-normal leading-snug text-neutral-100 sm:text-[15px] sm:leading-relaxed`;

type CatPetBubbleProps = {
  phase: "typing" | "waiting";
  message: string | null;
  /** Incrementing pet count — first pet triggers full bubble pop; later pets swap text with a tighter spring. */
  petGeneration: number;
};

/** Single speech bubble: brief "…" typing, then (after pets) one glass bubble whose text cycles. */
export default function CatPetBubble({
  phase,
  message,
  petGeneration,
}: CatPetBubbleProps) {
  /** Message wins over typing so a single control is visible at a time. */
  const showBubble = message !== null && message.length > 0;
  const showTyping = phase === "typing" && !showBubble;

  return (
    <div className="relative flex max-w-[min(100%,18rem)] flex-col items-end sm:max-w-[20rem]">
      <AnimatePresence mode="wait">
        {showTyping ? (
          <motion.div
            key="typing"
            role="status"
            aria-label="Typing"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.22 }}
            className={`${bubbleShellClass} mb-1`}
          >
            <span
              className={`${instrumentSans} block text-[15px] font-normal tracking-[0.2em] text-neutral-200`}
              aria-hidden
            >
              …
            </span>
            <Tail />
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {showBubble ? (
          <motion.div
            key="bubble-shell"
            role="status"
            aria-live="polite"
            initial={
              petGeneration === 1
                ? { scale: 0, opacity: 0 }
                : { scale: 1, opacity: 1 }
            }
            animate={{ scale: 1, opacity: 1 }}
            transition={
              petGeneration === 1 ? BUBBLE_SPRING : { duration: 0 }
            }
            className={bubbleShellClass}
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={message}
                initial={
                  petGeneration <= 1
                    ? false
                    : { opacity: 0, scale: 0.96, y: 4 }
                }
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: -2 }}
                transition={
                  petGeneration <= 1
                    ? { duration: 0 }
                    : TEXT_SWAP_SPRING
                }
                className={textClass}
              >
                {message}
              </motion.p>
            </AnimatePresence>
            <Tail />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function Tail() {
  return (
    <div
      className="absolute -right-1 bottom-[22%] z-0 h-2.5 w-2.5 translate-x-1/2 rotate-45 border-r border-t border-white/20 bg-white/10 shadow-none backdrop-blur-md"
      aria-hidden
    />
  );
}
