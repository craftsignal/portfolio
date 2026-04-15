"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      const res = await fetch("/api/site-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError("Incorrect password.");
        setPending(false);
        return;
      }
      const from = searchParams.get("from");
      const safe =
        from && from.startsWith("/") && !from.startsWith("//")
          ? from
          : "/";
      router.replace(safe);
      router.refresh();
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f2f2f2] px-6">
      <div className="w-full max-w-sm rounded-2xl border border-black/[0.08] bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
        <h1 className="text-center font-[family-name:var(--font-instrument-serif),ui-serif,Georgia,serif] text-2xl font-normal text-neutral-900">
          Enter password
        </h1>
        <p className="mt-2 text-center font-[family-name:var(--font-instrument-sans),sans-serif] text-sm text-neutral-500">
          This site is private.
        </p>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <label className="block">
            <span className="sr-only">Password</span>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 font-[family-name:var(--font-instrument-sans),sans-serif] text-neutral-900 outline-none ring-0 transition-[border-color,box-shadow] placeholder:text-neutral-400 focus:border-neutral-400 focus:shadow-[0_0_0_3px_rgba(0,0,0,0.06)]"
              placeholder="Password"
              required
            />
          </label>
          {error ? (
            <p className="text-center text-sm text-red-600" role="alert">
              {error}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-full bg-black py-3 font-[family-name:var(--font-instrument-sans),sans-serif] text-sm font-medium text-white transition-opacity hover:opacity-95 disabled:opacity-60"
          >
            {pending ? "Checking…" : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}
