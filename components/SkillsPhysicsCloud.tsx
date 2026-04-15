"use client";

import { animate, motion, motionValue } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";

const instrumentSans =
  "font-[family-name:var(--font-instrument-sans),sans-serif]";

const TAGS = [
  "AI-Native UX",
  "LLM Strategy",
  "Vibe Coding",
  "Next.js",
  "Cursor/AI Workflows",
  "Prompt Engineering",
  "Prototyping",
  "Product Vision",
];

type Body = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function initMotions() {
  return TAGS.map(() => ({
    x: motionValue(0),
    y: motionValue(0),
  }));
}

function initBodies(): Body[] {
  return TAGS.map(() => ({
    x: 0,
    y: 0,
    vx: (Math.random() - 0.5) * 24,
    vy: (Math.random() - 0.5) * 24,
    r: 50,
  }));
}

export default function SkillsPhysicsCloud() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bodiesRef = useRef<Body[]>(initBodies());
  const motions = useMemo(() => initMotions(), []);
  const draggingRef = useRef<number | null>(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const lastPointerRef = useRef({ x: 0, y: 0, t: 0 });
  const dragMovedRef = useRef(false);
  const pointerDownRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(0);
  const initializedRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const placeRandom = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (w < 24 || h < 24) return;
      bodiesRef.current.forEach((b, i) => {
        b.x = b.r + Math.random() * Math.max(8, w - 2 * b.r);
        b.y = b.r + Math.random() * Math.max(8, h - 2 * b.r);
        motions[i].x.set(b.x);
        motions[i].y.set(b.y);
      });
    };

    if (!initializedRef.current) {
      initializedRef.current = true;
      placeRandom();
    }

    const ro = new ResizeObserver(() => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      bodiesRef.current.forEach((b) => {
        b.x = clamp(b.x, b.r, w - b.r);
        b.y = clamp(b.y, b.r, h - b.r);
      });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [motions]);

  useEffect(() => {
    let last = performance.now();
    tick(last);

    function tick(now: number) {
      const dt = Math.min((now - last) / 1000, 0.055);
      last = now;
      const el = containerRef.current;
      if (el) {
        const w = el.clientWidth;
        const h = el.clientHeight;
        const bodies = bodiesRef.current;

        for (let i = 0; i < bodies.length; i++) {
          if (draggingRef.current === i) continue;
          const b = bodies[i];
          b.vx += (Math.random() - 0.5) * 32 * dt;
          b.vy += (Math.random() - 0.5) * 32 * dt;
          b.vx *= 0.991;
          b.vy *= 0.991;
          b.x += b.vx * dt;
          b.y += b.vy * dt;

          if (b.x < b.r) {
            b.x = b.r;
            b.vx *= -0.82;
          } else if (b.x > w - b.r) {
            b.x = w - b.r;
            b.vx *= -0.82;
          }
          if (b.y < b.r) {
            b.y = b.r;
            b.vy *= -0.82;
          } else if (b.y > h - b.r) {
            b.y = h - b.r;
            b.vy *= -0.82;
          }
        }

        for (let k = 0; k < 2; k++) {
          for (let i = 0; i < bodies.length; i++) {
            for (let j = i + 1; j < bodies.length; j++) {
              if (draggingRef.current === i || draggingRef.current === j)
                continue;
              const a = bodies[i];
              const b = bodies[j];
              const dx = b.x - a.x;
              const dy = b.y - a.y;
              const dist = Math.hypot(dx, dy) || 0.001;
              const minD = a.r + b.r;
              if (dist < minD) {
                const nx = dx / dist;
                const ny = dy / dist;
                const overlap = (minD - dist) * 0.5;
                a.x -= nx * overlap;
                a.y -= ny * overlap;
                b.x += nx * overlap;
                b.y += ny * overlap;
                const rvx = b.vx - a.vx;
                const rvy = b.vy - a.vy;
                const vn = rvx * nx + rvy * ny;
                if (vn < 0) {
                  const rest = 0.72;
                  const impulse = (-(1 + rest) * vn) / 2;
                  a.vx -= impulse * nx;
                  a.vy -= impulse * ny;
                  b.vx += impulse * nx;
                  b.vy += impulse * ny;
                }
              }
            }
          }
        }

        for (let i = 0; i < bodies.length; i++) {
          motions[i].x.set(bodies[i].x);
          motions[i].y.set(bodies[i].y);
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    return () => cancelAnimationFrame(rafRef.current);
  }, [motions]);

  const triggerTapGlow = (node: HTMLElement | null) => {
    if (!node) return;
    void animate(
      node,
      {
        scale: [1, 1.2, 1],
        boxShadow: [
          "0 0 0 rgba(0,0,0,0)",
          "0 0 28px rgba(129, 140, 248, 0.55)",
          "0 0 0 rgba(0,0,0,0)",
        ],
      },
      { duration: 0.55, ease: "easeOut" },
    );
  };

  return (
    <div
      ref={containerRef}
      className={`relative h-[min(26rem,70vw)] w-full max-w-3xl touch-none overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] ${instrumentSans}`}
    >
      {TAGS.map((label, i) => (
        <motion.div
          key={label}
          className="absolute left-0 top-0 cursor-grab select-none active:cursor-grabbing"
          style={{
            x: motions[i].x,
            y: motions[i].y,
          }}
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            draggingRef.current = i;
            dragMovedRef.current = false;
            const rect = containerRef.current!.getBoundingClientRect();
            const b = bodiesRef.current[i];
            const px = e.clientX - rect.left;
            const py = e.clientY - rect.top;
            dragOffsetRef.current = { x: px - b.x, y: py - b.y };
            pointerDownRef.current = { x: px, y: py };
            b.vx = 0;
            b.vy = 0;
            lastPointerRef.current = { x: px, y: py, t: performance.now() };
          }}
          onPointerMove={(e) => {
            if (draggingRef.current !== i) return;
            const rect = containerRef.current!.getBoundingClientRect();
            const px = clamp(e.clientX - rect.left, 0, rect.width);
            const py = clamp(e.clientY - rect.top, 0, rect.height);
            if (
              Math.hypot(
                px - pointerDownRef.current.x,
                py - pointerDownRef.current.y,
              ) > 6
            ) {
              dragMovedRef.current = true;
            }
            const b = bodiesRef.current[i];
            const w = rect.width;
            const h = rect.height;
            b.x = clamp(px - dragOffsetRef.current.x, b.r, w - b.r);
            b.y = clamp(py - dragOffsetRef.current.y, b.r, h - b.r);
            const now = performance.now();
            const dt = Math.max(now - lastPointerRef.current.t, 0.001);
            b.vx = ((px - lastPointerRef.current.x) / dt) * 45;
            b.vy = ((py - lastPointerRef.current.y) / dt) * 45;
            lastPointerRef.current = { x: px, y: py, t: now };
            motions[i].x.set(b.x);
            motions[i].y.set(b.y);
          }}
          onPointerUp={(e) => {
            if (draggingRef.current === i) {
              draggingRef.current = null;
              const b = bodiesRef.current[i];
              b.vx = clamp(b.vx * 0.42, -380, 380);
              b.vy = clamp(b.vy * 0.42, -380, 380);
              if (!dragMovedRef.current) {
                triggerTapGlow(e.currentTarget);
              }
            }
            try {
              e.currentTarget.releasePointerCapture(e.pointerId);
            } catch {
              /* ignore */
            }
          }}
          onPointerCancel={(e) => {
            draggingRef.current = null;
            try {
              e.currentTarget.releasePointerCapture(e.pointerId);
            } catch {
              /* ignore */
            }
          }}
        >
          <div className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-neutral-600/90 bg-neutral-900/95 px-3.5 py-2 text-center text-xs font-medium text-neutral-100 shadow-[0_2px_12px_rgba(0,0,0,0.35)] sm:text-sm">
            {label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
