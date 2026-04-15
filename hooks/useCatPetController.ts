"use client";

import { useAnimate } from "framer-motion";
import { flushSync } from "react-dom";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  catAssets,
  botReplies,
  CROSSFADE_TRANSITION,
  INITIAL_TYPING_MS,
  SQUISH_TRANSITION,
} from "../lib/catPetConfig";

export function useCatPetController() {
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

  return {
    phase,
    bubbleMessage,
    petGeneration,
    squishScope,
    imgRef,
    currentCatIndex,
    triggerPet,
  };
}
