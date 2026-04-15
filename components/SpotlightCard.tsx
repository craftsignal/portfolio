"use client";

import { useCallback, useRef } from "react";

type SpotlightCardProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Radial spotlight follows the cursor (--spotlight-x / --spotlight-y as %).
 * Renders an overlay above children; raise badges with z-10+.
 */
export default function SpotlightCard({
  children,
  className = "",
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * 100;
    const py = ((e.clientY - r.top) / r.height) * 100;
    el.style.setProperty("--spotlight-x", `${px}%`);
    el.style.setProperty("--spotlight-y", `${py}%`);
  }, []);

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--spotlight-x", "50%");
    el.style.setProperty("--spotlight-y", "50%");
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`group/spotlight relative ${className}`}
      style={
        {
          ["--spotlight-x" as string]: "50%",
          ["--spotlight-y" as string]: "50%",
        } as React.CSSProperties
      }
    >
      {children}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[5] rounded-[inherit] opacity-0 transition-opacity duration-200 ease-out group-hover/spotlight:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse 85% 65% at var(--spotlight-x) var(--spotlight-y), rgba(255,255,255,0.55) 0%, rgba(250,250,250,0.2) 40%, transparent 62%)",
          mixBlendMode: "soft-light",
        }}
      />
    </div>
  );
}
