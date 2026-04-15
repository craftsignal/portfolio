import Image from "next/image";

import MagneticResumeButton from "./MagneticResumeButton";

/** Set `NEXT_PUBLIC_RESUME_URL` or add `public/resume.pdf` and point this to `/resume.pdf`. */
const RESUME_HREF =
  process.env.NEXT_PUBLIC_RESUME_URL ??
  "https://www.linkedin.com/in/tianshendesign";
const RESUME_EXTERNAL = RESUME_HREF.startsWith("http");

const WORKSPACE_IMG =
  "https://images.unsplash.com/photo-1497215842964-222b770da94b?auto=format&fit=crop&w=128&q=80";
const BRIDGE_IMG =
  "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=128&q=80";

function InlineCircle({
  src,
  alt,
  local,
}: {
  src: string;
  alt: string;
  local?: boolean;
}) {
  return (
    <span className="relative mx-1 inline-block h-9 w-9 shrink-0 align-middle sm:mx-1.5 sm:h-10 sm:w-10 md:h-11 md:w-11">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="44px"
        className="rounded-full object-cover ring-2 ring-black/5"
        unoptimized={!local}
      />
    </span>
  );
}

export default function Hero() {
  return (
    <section
      className="hero-grain relative flex min-h-[min(100vh,920px)] flex-col justify-center px-5 pb-16 pt-24 sm:px-8 sm:pb-20 sm:pt-28 md:px-10 md:pb-24 md:pt-32"
      aria-label="Introduction"
    >
      <div className="relative z-[1] mx-auto w-full max-w-4xl text-center">
        <h1 className="font-[family-name:var(--font-instrument-serif),ui-serif,Georgia,serif] text-[1.65rem] font-normal leading-[1.35] tracking-tight text-neutral-900 sm:text-3xl md:text-[2.15rem] md:leading-[1.3] lg:text-[2.35rem]">
          <span className="inline sm:inline-block">I&apos;m Tian</span>
          <InlineCircle src="/hero-portrait.png" alt="" local />
          <span className="inline sm:inline">, a Senior AI Product</span>
          <InlineCircle src={WORKSPACE_IMG} alt="" />
          <span className="inline sm:inline">
            {" "}
            Designer based in the SF Bay Area
          </span>
          <InlineCircle src={BRIDGE_IMG} alt="" />
          <span className="inline">.</span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl font-[family-name:var(--font-instrument-sans),sans-serif] text-base font-normal leading-relaxed text-neutral-600 sm:text-lg md:mt-10 md:text-xl md:leading-relaxed">
          With 8+ years of experience, I focus on AI and product design—turning
          complex technology into clear, human experiences.
        </p>

        <div className="mt-10 flex justify-center md:mt-12">
          <MagneticResumeButton
            href={RESUME_HREF}
            target={RESUME_EXTERNAL ? "_blank" : undefined}
            rel={RESUME_EXTERNAL ? "noopener noreferrer" : undefined}
            className="inline-flex items-center gap-2 rounded-full bg-black px-7 py-3.5 font-[family-name:var(--font-instrument-sans),sans-serif] text-sm font-medium text-white shadow-[0_2px_12px_rgba(0,0,0,0.12)] transition-[box-shadow,opacity] hover:opacity-95 sm:px-8 sm:py-4 sm:text-base"
          >
            My Resume
            <span aria-hidden className="text-base leading-none">
              ↗
            </span>
          </MagneticResumeButton>
        </div>
      </div>
    </section>
  );
}
