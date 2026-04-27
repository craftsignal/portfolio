"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import CopyEmailButton from "@/components/CopyEmailButton";

const instrument =
  "font-[family-name:var(--font-instrument-serif),ui-serif,Georgia,serif]";
const instrumentSans =
  "font-[family-name:var(--font-instrument-sans),sans-serif]";

const ACCOUNT_EMAIL = "tianshendesign@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/tianshendesign";

/** Map / phones — matches “Security AI” card tone on portfolio. */
const SECURITY_AI_IMG =
  "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1600&q=85";

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className={`${instrumentSans} rounded-md bg-[rgba(0,0,0,0.06)] px-2.5 py-1 text-[12px] font-normal leading-none text-neutral-600`}
    >
      {children}
    </span>
  );
}

export default function CaseStudyReadNextConnect() {
  const reduceMotion = useReducedMotion();

  const footerMotion = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 36 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-12% 0px -8% 0px" },
        transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <>
      <section
        className="border-t border-neutral-300/80 bg-[#F2F2F2] px-5 pb-16 pt-12 sm:px-8 md:px-10 md:pb-20 md:pt-14"
        aria-labelledby="read-next-label"
      >
        <div className="mx-auto max-w-6xl">
          <div className="relative flex items-center justify-center">
            <div
              className="absolute inset-x-0 top-1/2 h-px bg-neutral-300/90"
              aria-hidden
            />
            <p
              id="read-next-label"
              className={`${instrument} relative bg-[#F2F2F2] px-4 text-center text-sm italic tracking-wide text-neutral-600`}
            >
              Read next
            </p>
          </div>

          <h2 className="mt-10 text-center text-[clamp(1.85rem,4.5vw,2.85rem)] leading-[1.15] tracking-tight">
            <span className={`${instrumentSans} font-bold text-neutral-950`}>
              More{" "}
            </span>
            <span className={`${instrument} font-normal italic text-neutral-900`}>
              Projects
            </span>
          </h2>

          <div className="mt-12 grid gap-10 sm:mt-14 md:grid-cols-2 md:gap-8 lg:gap-12">
            <Link
              href="/"
              className="group block transition-transform duration-300 ease-out hover:-translate-y-1"
            >
              <article>
                <div className="relative mb-5 aspect-[16/11] overflow-hidden rounded-3xl bg-neutral-900 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.25)] ring-1 ring-black/5 sm:mb-6">
                  <Image
                    src={SECURITY_AI_IMG}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-[280ms] ease-out group-hover:scale-[1.02]"
                    sizes="(max-width:768px) 100vw, 50vw"
                  />
                  <span
                    className={`${instrument} pointer-events-none absolute left-4 top-4 z-10 rounded-full border border-white/25 bg-white/95 px-3 py-1.5 text-[12px] font-normal not-italic text-neutral-900 shadow-sm backdrop-blur-sm`}
                    aria-hidden
                  >
                    ← Back
                  </span>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <h3
                    className={`${instrumentSans} min-w-0 flex-1 text-lg font-bold leading-snug tracking-tight text-neutral-950 md:text-xl`}
                  >
                    Security AI
                  </h3>
                  <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
                    <Tag>Mobile</Tag>
                    <Tag>Growth Strategy</Tag>
                  </div>
                </div>
              </article>
            </Link>

            <Link
              href="/case-studies/beyond-generic-alerts"
              className="group block transition-transform duration-300 ease-out hover:-translate-y-1"
            >
              <article>
                <div className="relative mb-5 aspect-[16/11] overflow-hidden rounded-3xl bg-neutral-900 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.25)] ring-1 ring-black/5 sm:mb-6">
                  <Image
                    src="/case-studies-ai-event-captions.png"
                    alt=""
                    fill
                    className="object-cover transition-transform duration-[280ms] ease-out group-hover:scale-[1.02]"
                    sizes="(max-width:768px) 100vw, 50vw"
                  />
                  <span className="absolute left-4 top-4 z-10 rounded-full bg-white px-3 py-1 text-xs font-medium text-neutral-800 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
                    Launched
                  </span>
                  <span
                    className={`${instrument} pointer-events-none absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/90 shadow-md backdrop-blur-sm`}
                    aria-hidden
                  >
                    <span className="flex flex-col gap-1">
                      <span className="h-[1.5px] w-[18px] rounded-full bg-neutral-900" />
                      <span className="h-[1.5px] w-[18px] rounded-full bg-neutral-900" />
                    </span>
                  </span>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <h3
                    className={`${instrumentSans} min-w-0 flex-1 text-lg font-bold leading-snug tracking-tight text-neutral-950 md:text-xl`}
                  >
                    Beyond Generic Alerts: Boosting Premium Subscriptions with AI
                    Event Captions
                  </h3>
                  <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
                    <Tag>AI</Tag>
                    <Tag>Growth Strategy</Tag>
                  </div>
                </div>
              </article>
            </Link>
          </div>
        </div>
      </section>

      <motion.footer
        className="relative z-10 bg-black bg-[linear-gradient(135deg,rgba(255,255,255,0.07)_0%,transparent_42%,transparent_100%)]"
        {...footerMotion}
      >
        <div className="relative mx-auto flex min-h-[52vh] max-w-3xl flex-col items-center justify-center px-6 py-16 text-center sm:min-h-[58vh] sm:py-24 md:py-28">
          <div className="mb-10 flex w-full max-w-md items-center justify-center gap-4">
            <span
              className="h-px max-w-24 flex-1 bg-neutral-600 sm:max-w-28"
              aria-hidden
            />
            <p
              className={`${instrument} shrink-0 text-sm italic tracking-wide text-neutral-400`}
            >
              I&apos;m available
            </p>
            <span
              className="h-px max-w-24 flex-1 bg-neutral-600 sm:max-w-28"
              aria-hidden
            />
          </div>

          <h2
            className={`${instrument} text-4xl font-normal tracking-tight text-white sm:text-5xl md:text-6xl`}
          >
            Let&apos;s{" "}
            <span className="font-normal italic text-neutral-100">Connect</span>
          </h2>

          <p
            className={`${instrumentSans} mt-8 max-w-lg text-base leading-relaxed text-neutral-400 sm:text-lg`}
          >
            Feel free to contact me if you have any questions. I&apos;m available for
            new opportunities or just to chat.
          </p>

          <div className="mt-12 flex w-full justify-center">
            <CopyEmailButton email={ACCOUNT_EMAIL} />
          </div>
        </div>

        <div className="relative mx-auto flex max-w-6xl items-center justify-between px-6 pb-10 pt-2 sm:px-10">
          <Link
            href="/"
            className={`${instrument} flex h-11 w-11 items-center justify-center rounded-full bg-white text-sm italic text-neutral-900 transition-opacity hover:opacity-90`}
            aria-label="Home"
          >
            TS
          </Link>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 w-11 items-center justify-center rounded-lg bg-neutral-800 text-white ring-1 ring-white/10 transition-colors hover:bg-neutral-700"
            aria-label="LinkedIn profile"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </motion.footer>
    </>
  );
}
