"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCallback, useRef } from "react";

const spring = { stiffness: 100, damping: 20 };

const DEFAULT_FINAL_SECTION_ID = "final-outcomes";

/** Mirrors homepage MagneticResumeButton hover: shadow lift + brightness. */
const jumpButtonClassName =
  "inline-flex w-full min-w-0 items-center justify-center gap-2 rounded-full bg-black px-7 py-3.5 font-sans text-sm font-medium text-white shadow-[0_12px_24px_rgba(0,0,0,0.3)] transition-[box-shadow,filter] duration-[250ms] ease-out hover:shadow-[0_16px_32px_rgba(0,0,0,0.36)] hover:brightness-110 sm:w-auto md:text-[0.9375rem]";

function LinkIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

type CaseStudyJumpToFinalButtonProps = {
  /** Element `id` to scroll to (default: final-outcomes on the Arlo case study). */
  targetId?: string;
};

export default function CaseStudyJumpToFinalButton({
  targetId = DEFAULT_FINAL_SECTION_ID,
}: CaseStudyJumpToFinalButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, spring);
  const springY = useSpring(y, spring);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = buttonRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const half = Math.hypot(r.width / 2, r.height / 2);
      const magnetRadius = half + 50;

      if (dist <= magnetRadius && dist > 0.5) {
        const influence = 1 - dist / magnetRadius;
        const maxShift = 14;
        x.set((dx / dist) * maxShift * influence);
        y.set((dy / dist) * maxShift * influence);
      } else if (dist <= 0.5) {
        x.set(0);
        y.set(0);
      } else {
        x.set(0);
        y.set(0);
      }
    },
    [x, y],
  );

  const onMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const scrollToFinal = useCallback(() => {
    document
      .getElementById(targetId)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [targetId]);

  return (
    <div
      className="-m-[50px] inline-block p-[50px]"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <motion.button
        ref={buttonRef}
        type="button"
        className={jumpButtonClassName}
        style={{ x: springX, y: springY }}
        onClick={scrollToFinal}
      >
        Jump to the final design
        <LinkIcon className="shrink-0 opacity-95" />
      </motion.button>
    </div>
  );
}
