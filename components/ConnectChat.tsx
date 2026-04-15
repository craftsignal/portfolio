"use client";

import { motion, useAnimate } from "framer-motion";
import { flushSync } from "react-dom";
import { useCallback, useEffect, useRef, useState } from "react";

import CatPetBubble from "./CatPetBubble";
import {
  catAssets,
  botReplies,
  CROSSFADE_TRANSITION,
  INITIAL_TYPING_MS,
  SQUISH_TRANSITION,
} from "../lib/catPetConfig";

const instrumentSans =
  "font-[family-name:var(--font-instrument-sans),sans-serif]";

type ConnectChatProps = {
  email: string;
  linkedinUrl: string;
};

function stopLinkBubble(e: React.MouseEvent) {
  e.stopPropagation();
}

export default function ConnectChat({ email, linkedinUrl }: ConnectChatProps) {
  const [phase, setPhase] = useState<"typing" | "waiting">("typing");
  const [currentCatIndex, setCurrentCatIndex] = useState(0);
  const [bubbleMessage, setBubbleMessage] = useState<string | null>(null);
  const [petGeneration, setPetGeneration] = useState(0);

  const replyIndexRef = useRef(0);
  const petBusyRef = useRef(false);

  const [squishScope, squishAnimate] = useAnimate();
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setPhase("waiting"), INITIAL_TYPING_MS);
    return () => clearTimeout(t);
  }, []);

  const runPetSequence = useCallback(async () => {
    if (petBusyRef.current) return;
    const scope = squishScope.current;
    if (!scope) return;

    petBusyRef.current = true;
    setPhase("waiting");

    await squishAnimate(
      scope,
      { scale: [1, 1.15, 1], y: [0, 5, 0] },
      SQUISH_TRANSITION,
    );

    flushSync(() => {
      setCurrentCatIndex((i) => (i + 1) % catAssets.length);
    });

    const img = imgRef.current;
    if (img) {
      await squishAnimate(img, { opacity: [0.5, 1] }, CROSSFADE_TRANSITION);
    }

    const poolIdx = replyIndexRef.current % botReplies.length;
    replyIndexRef.current = poolIdx + 1;
    setBubbleMessage(botReplies[poolIdx]);
    setPetGeneration((g) => g + 1);

    petBusyRef.current = false;
  }, [squishAnimate, squishScope]);

  const triggerPet = useCallback(() => {
    void runPetSequence();
  }, [runPetSequence]);

  return (
    <div className={`mt-12 w-full max-w-[min(100%,800px)] min-w-0 px-0 sm:px-1 ${instrumentSans}`}>
      <div
        className="relative cursor-pointer overflow-hidden rounded-3xl border border-zinc-700/80 bg-neutral-950/55 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] backdrop-blur-md"
        onClick={triggerPet}
      >
        <div className="px-5 pt-5 pb-3 sm:px-6 sm:pt-6">
          <h3 className="text-center text-sm font-normal tracking-[0.12em] text-neutral-400 sm:text-[0.8125rem]">
            <span className={`${instrumentSans} uppercase`}>Talk</span>
            <span className={`mx-1.5 ${instrumentSans} text-base font-medium not-italic tracking-normal text-neutral-300 sm:text-lg`}>
              2
            </span>
            <span className={`${instrumentSans} uppercase`}>Me</span>
          </h3>
        </div>

        <div className="relative flex min-h-[min(14rem,52vw)] items-end justify-end px-4 pb-6 pt-2 sm:min-h-[15rem] sm:px-5 sm:pb-7">
          <div className="pointer-events-none relative flex w-full max-w-full items-end justify-end gap-2 sm:gap-3">
            <div className="relative z-[2] flex min-w-0 max-w-[min(100%,14.5rem)] flex-1 flex-col items-end justify-end pb-[min(22%,3.5rem)] sm:max-w-[16.5rem] sm:pb-[min(24%,4rem)]">
              <CatPetBubble
                phase={phase}
                message={bubbleMessage}
                petGeneration={petGeneration}
              />
            </div>

            <div
              className="relative z-[1] flex h-[min(200px,38vw)] w-[min(42vw,9.75rem)] shrink-0 items-end justify-end sm:h-[min(220px,34vw)] sm:w-[10.5rem] md:w-[11.5rem]"
              aria-hidden
            >
              <motion.div
                ref={squishScope}
                className="flex h-full w-full items-end justify-end"
                initial={false}
              >
                <motion.img
                  ref={imgRef}
                  src={catAssets[currentCatIndex]}
                  alt=""
                  className="h-full w-auto max-w-full select-none object-contain object-bottom invert"
                  draggable={false}
                  initial={{ opacity: 1 }}
                />
              </motion.div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.06] px-4 py-4 sm:px-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex shrink-0 items-center gap-2">
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-600 bg-neutral-900 text-neutral-300 transition-colors hover:border-neutral-500 hover:bg-neutral-800 hover:text-white"
                aria-label="LinkedIn profile"
                onClick={stopLinkBubble}
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href={`mailto:${email}`}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-600 bg-neutral-900 text-neutral-300 transition-colors hover:border-neutral-500 hover:bg-neutral-800 hover:text-white"
                aria-label={`Email ${email}`}
                onClick={stopLinkBubble}
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>
            </div>

            <button
              type="button"
              className={`min-h-11 w-full flex-1 rounded-full border border-neutral-700/90 bg-zinc-800/75 px-5 py-3 text-left text-[15px] font-normal text-neutral-400 transition-[border-color,background-color,transform] hover:bg-zinc-800 hover:text-neutral-300 active:scale-[0.99] ${instrumentSans}`}
              aria-label="Pet the cat"
              onClick={(e) => {
                e.stopPropagation();
                triggerPet();
              }}
            >
              Pet the cat!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
