"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const COPIED_RESET_MS = 2000;

type CopyEmailButtonProps = {
  email: string;
  className?: string;
};

export default function CopyEmailButton({
  email,
  className = "",
}: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const copy = useCallback(async () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      timerRef.current = setTimeout(() => {
        setCopied(false);
        timerRef.current = null;
      }, COPIED_RESET_MS);
    } catch {
      setCopied(false);
    }
  }, [email]);

  return (
    <button
      type="button"
      onClick={copy}
      className={`group relative inline-flex max-w-full min-h-[3.25rem] w-auto items-center justify-center gap-2 overflow-hidden rounded-full border border-neutral-600 bg-neutral-950 px-6 py-4 font-sans text-sm font-medium text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset] transition-[border-color,background-color,box-shadow,width] duration-300 ease-out hover:border-neutral-500 hover:bg-neutral-900 sm:min-h-[3.5rem] sm:text-base ${className}`}
      aria-label={copied ? "Email copied" : `Copy ${email} to clipboard`}
    >
      <span className="relative inline-grid place-items-center">
        <span
          className={`col-start-1 row-start-1 inline-flex max-w-full items-center justify-center gap-2 whitespace-nowrap transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${
            copied
              ? "pointer-events-none translate-y-0.5 opacity-0"
              : "translate-y-0 opacity-100"
          }`}
          aria-hidden={copied}
        >
          <span>{email}</span>
          <span className="shrink-0 text-xs opacity-80">↗</span>
        </span>
        <span
          className={`col-start-1 row-start-1 whitespace-nowrap transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${
            copied
              ? "translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-0.5 opacity-0"
          }`}
          aria-live="polite"
        >
          Copied ✓
        </span>
      </span>
    </button>
  );
}
