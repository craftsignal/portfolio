import Link from "next/link";
import { GALLERY_WORLD_HREF } from "@/lib/gallery-links";
import SkillsPhysicsCloud from "./SkillsPhysicsCloud";
import VibeCodingGrid from "./VibeCodingGrid";

const instrumentSans =
  "font-[family-name:var(--font-instrument-sans),sans-serif]";

type SelfintroProps = {
  /** Hide TS / menu chrome when embedded on the home page */
  showNav?: boolean;
};

export default function Selfintro({ showNav = true }: SelfintroProps) {
  return (
    <section className="relative z-10 overflow-hidden">
      {showNav ? (
        <header className="flex items-center justify-between px-6 pt-8 pb-4 sm:px-10">
          <Link
            href="/"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-sm font-serif italic text-neutral-900 transition-opacity hover:opacity-90"
            aria-label="Home"
          >
            TS
          </Link>
          <button
            type="button"
            className="flex h-12 w-12 shrink-0 flex-col items-center justify-center gap-1.5 rounded-full bg-white text-neutral-900 transition-opacity hover:opacity-90"
            aria-label="Open menu"
          >
            <span className="block h-0.5 w-5 rounded-full bg-neutral-900" />
            <span className="block h-0.5 w-5 rounded-full bg-neutral-900" />
          </button>
        </header>
      ) : null}

      <div
        className={`relative mx-auto flex max-w-3xl flex-col items-center space-y-24 px-6 sm:px-10 md:py-24 ${showNav ? "py-16" : "py-20"}`}
      >
        <div className="w-full space-y-10 text-center">
          <p
            className={`${instrumentSans} text-base font-normal leading-[1.65] text-neutral-100 sm:text-lg md:text-xl md:leading-relaxed`}
          >
            I am a Senior Product Designer specializing in AI-Native ecosystems. From
            my time at Arlo, where I led the vision for contextual AI notifications,
            to my current Vibe Coding experiments, I bridge the gap between complex
            LLM capabilities and intuitive human experiences. I don&apos;t just
            design interfaces; I design the logic, the feedback loops, and the trust
            required to make AI a seamless partner in daily life.
          </p>

          <div className="mx-auto max-w-2xl space-y-5 text-left sm:text-center">
            <p className="font-serif text-2xl font-normal italic leading-snug text-neutral-100 sm:text-[1.65rem] md:text-3xl md:leading-snug">
              When I&apos;m not architecting AI systems, I&apos;m an apprentice to a
              5-year-old artist.
            </p>
            <div className={`${instrumentSans} space-y-4 text-base font-normal leading-[1.65] text-neutral-300 sm:text-lg`}>
              <p>
                I built my son&apos;s digital gallery to archive his raw
                creativity—a constant reminder that while AI can generate, only
                humans can truly &apos;feel&apos; an image.
              </p>
              <div className="flex justify-start sm:justify-center">
                <Link
                  href={GALLERY_WORLD_HREF}
                  className="inline-flex w-auto max-w-full items-center gap-1.5 rounded-full border border-black bg-black px-4 py-2 text-sm font-medium text-white shadow-[0_2px_8px_rgba(0,0,0,0.35)] transition-[opacity,transform] duration-200 hover:opacity-95 active:scale-[0.98]"
                >
                  View his work ↗
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full space-y-6">
          <h3 className="text-center font-serif text-xl font-normal italic tracking-tight text-neutral-300 sm:text-2xl">
            Skills &amp; Tech
          </h3>
          <div className="flex justify-center">
            <SkillsPhysicsCloud />
          </div>
        </div>

        <VibeCodingGrid />
      </div>
    </section>
  );
}
