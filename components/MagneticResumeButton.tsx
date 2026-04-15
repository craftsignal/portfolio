"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCallback, useRef } from "react";

const spring = { stiffness: 100, damping: 20 };

type MagneticResumeButtonProps = {
  href: string;
  download?: boolean;
  className: string;
  children: React.ReactNode;
};

export default function MagneticResumeButton({
  href,
  download,
  className,
  children,
}: MagneticResumeButtonProps) {
  const anchorRef = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, spring);
  const springY = useSpring(y, spring);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = anchorRef.current;
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

  return (
    <div
      className="inline-block p-[50px] -m-[50px]"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <motion.a
        ref={anchorRef}
        href={href}
        download={download}
        className={className}
        style={{ x: springX, y: springY }}
      >
        {children}
      </motion.a>
    </div>
  );
}
