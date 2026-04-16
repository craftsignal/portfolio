import Link from "next/link";
import { GALLERY_WORLD_HREF } from "@/lib/gallery-links";
import ConnectChat from "./ConnectChat";
import CopyEmailButton from "./CopyEmailButton";

const ACCOUNT_EMAIL = "tianshendesign@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/tianshendesign";
const CHAT_LINKEDIN_URL =
  "https://www.linkedin.com/in/tian-s-7b2229a4/";

export default function Footer() {
  return (
    <footer className="relative z-10 bg-black bg-[linear-gradient(135deg,rgba(255,255,255,0.06)_0%,transparent_45%,transparent_100%)]">
      <div className="relative mx-auto flex min-h-[55vh] max-w-3xl flex-col items-center justify-center px-6 py-16 text-center sm:min-h-[60vh] sm:py-24 md:py-28">
        <div className="mb-10 flex w-full max-w-md items-center justify-center gap-4">
          <span className="h-px max-w-24 flex-1 bg-neutral-600 sm:max-w-28" aria-hidden />
          <p className="shrink-0 font-serif text-sm italic tracking-wide text-neutral-400">
            I&apos;m available
          </p>
          <span className="h-px max-w-24 flex-1 bg-neutral-600 sm:max-w-28" aria-hidden />
        </div>

        <h2 className="font-serif text-4xl font-normal tracking-tight text-white sm:text-5xl md:text-6xl">
          Let&apos;s{" "}
          <span className="italic font-normal text-neutral-100">Connect</span>
        </h2>

        <p className="mt-8 max-w-lg font-sans text-base leading-relaxed text-neutral-400 sm:text-lg">
          Feel free to contact me if you have any questions. I&apos;m available for
          new opportunities or just to chat.
        </p>

        <div className="mt-12 flex w-full justify-center">
          <CopyEmailButton email={ACCOUNT_EMAIL} />
        </div>

        <ConnectChat
          email={ACCOUNT_EMAIL}
          linkedinUrl={CHAT_LINKEDIN_URL}
        />

        <p className="mt-10 font-sans text-sm text-neutral-500">
          <Link
            href={GALLERY_WORLD_HREF}
            className="text-neutral-400 underline decoration-neutral-600 underline-offset-4 transition-colors hover:text-neutral-200"
          >
            Son&apos;s gallery — 3D world view
          </Link>
        </p>
      </div>

      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-6 pb-10 pt-4 sm:px-10">
        <Link
          href="/"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white font-serif text-sm italic text-neutral-900 transition-opacity hover:opacity-90"
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
    </footer>
  );
}
