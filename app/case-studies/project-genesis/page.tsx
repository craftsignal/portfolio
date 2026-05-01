import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import CaseStudyJumpToFinalButton from "@/components/CaseStudyJumpToFinalButton";
import CaseStudyReadNextConnect from "@/components/CaseStudyReadNextConnect";

export const metadata: Metadata = {
  title: "Project Genesis: Teaching Arlo's First AI to Actually Listen",
  description:
    "Case study: Nexus — Arlo's AI-native customer care platform; Alpha testing, evaluation rubric, and rollout.",
};

const instrument =
  "font-[family-name:var(--font-instrument-serif),ui-serif,Georgia,serif]";
const instrumentSans =
  "font-[family-name:var(--font-instrument-sans),sans-serif]";

const overviewHeadingClass = `${instrument} text-[22px] font-normal italic text-[#757575] sm:text-[24px]`;
const sectionHeadingLargeClass = `${instrument} text-[clamp(2.25rem,5vw,3rem)] font-normal italic leading-[1.1] text-[#757575] md:text-[48px]`;
const narrativeBodyClass = `${instrumentSans} text-[18px] font-normal leading-[1.65] text-black md:text-[20px]`;
const subtitleClass = `${instrumentSans} text-[20px] font-bold italic leading-[1.35] text-black md:text-[24px]`;
const accomplishmentListClass = `${instrumentSans} mt-6 list-outside list-[square] space-y-4 pl-6 text-[18px] font-normal leading-[1.6] text-black marker:text-black md:text-[20px] lg:mt-8`;
/** Impact row: explicit stacks (layout already loads Instrument * via root + Google Fonts). */
const impactStatNumberClass =
  "text-[clamp(2.25rem,5.5vw,3.25rem)] font-normal not-italic leading-[1.05] tracking-[-0.02em] text-neutral-950 [font-family:'Instrument Serif',serif] [font-weight:400]";
const impactStatDescriptorClass =
  "mt-4 text-[18px] font-normal leading-[1.65] text-black md:text-[20px] [font-family:'Instrument Sans',sans-serif] [font-weight:400]";

const HERO_IMG =
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=2000&q=85";
const SECONDARY_IMG =
  "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=2000&q=85";

const READ_NEXT_BEYOND_IMG = "/case-studies-ai-event-captions.png";
const READ_NEXT_ENHANCING_IMG =
  "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80";

function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1] opacity-[0.14] mix-blend-multiply"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
      }}
    />
  );
}

function DiamondStepMarker({
  step,
  className,
}: {
  step: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-[#757575] ${className ?? ""}`}
      aria-hidden
    >
      <svg width="11" height="11" viewBox="0 0 11 11" className="shrink-0">
        <path
          d="M5.5 0.75 L10.25 5.5 5.5 10.25 0.75 5.5z"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.9"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span
        className={`${instrumentSans} text-[14px] font-normal not-italic tracking-[0.02em]`}
      >
        {step}
      </span>
    </span>
  );
}

const tableShell =
  "w-full min-w-[640px] border-collapse text-left text-[14px] md:text-[15px]";
const th =
  `${instrumentSans} border border-neutral-200 bg-neutral-50 px-3 py-2.5 font-semibold text-neutral-900`;
const td = `${instrumentSans} border border-neutral-200 px-3 py-2.5 text-neutral-800`;

function ScoreBar({
  label,
  value,
  widthPct,
}: {
  label: string;
  value: string;
  widthPct: string;
}) {
  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <span
        className={`${instrumentSans} w-[min(11rem,42%)] shrink-0 text-[14px] text-neutral-800 sm:text-[15px]`}
      >
        {label}
      </span>
      <div className="h-1.5 min-w-0 flex-1 rounded-full bg-neutral-200">
        <div
          className="h-full rounded-full bg-neutral-900"
          style={{ width: widthPct }}
        />
      </div>
      <span
        className={`${instrumentSans} w-9 shrink-0 text-right text-[13px] font-semibold text-neutral-900 sm:text-[14px]`}
      >
        {value}
      </span>
    </div>
  );
}

function RoadmapPriority({ level }: { level: "p0" | "p1" | "p2" }) {
  const label = level === "p0" ? "P0" : level === "p1" ? "P1" : "P2";
  const cls =
    level === "p0"
      ? "bg-red-100 text-red-950"
      : level === "p1"
        ? "bg-amber-100 text-amber-950"
        : "bg-sky-100 text-sky-950";
  return (
    <span
      className={`${instrumentSans} inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.06em] ${cls}`}
    >
      {label}
    </span>
  );
}

export default function ProjectGenesisCaseStudyPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#F2F2F2]">
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom_right,rgba(255,255,255,0.72)_0%,rgba(255,255,255,0.28)_32%,rgba(255,255,255,0.06)_52%,transparent_72%)]"
        aria-hidden
      />
      <GrainOverlay />

      <header className="fixed left-0 right-0 top-0 z-30 flex items-center justify-between px-6 pb-4 pt-8 sm:px-10 sm:pt-10 md:px-[48px] md:pt-[48px]">
        <Link
          href="/"
          className="rounded-full border border-neutral-300/55 bg-white/80 px-4 py-2.5 text-sm font-normal text-neutral-900 shadow-[0_1px_4px_rgba(0,0,0,0.05)] backdrop-blur-md transition-[background-color,box-shadow] hover:bg-white hover:shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
        >
          <span className={`${instrument} text-[0.9375rem] not-italic`}>←</span>{" "}
          <span className={`${instrument} text-[0.9375rem] italic`}>Back</span>
        </Link>
        <button
          type="button"
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-neutral-300/55 bg-white/80 shadow-[0_1px_4px_rgba(0,0,0,0.05)] backdrop-blur-md transition-colors hover:bg-white"
          aria-label="Menu"
        >
          <span className="h-[1.5px] w-[19px] rounded-full bg-neutral-900" />
          <span className="h-[1.5px] w-[19px] rounded-full bg-neutral-900" />
        </button>
      </header>

      <main className="relative z-10">
        <section
          className="relative flex min-h-[min(88vh,920px)] flex-col justify-end px-6 pb-14 pt-32 sm:px-10 sm:pb-20 sm:pt-36 md:justify-center md:px-[48px] md:pb-24 md:pt-40"
          aria-label="Case study introduction"
        >
          <div className="pointer-events-none absolute inset-0 md:block">
            <div className="absolute inset-y-0 right-0 hidden w-[min(52%,640px)] lg:block">
              <div className="relative h-full min-h-[420px] w-full opacity-[0.2] mix-blend-multiply grayscale sm:min-h-[480px] md:opacity-[0.26]">
                <Image
                  src={HERO_IMG}
                  alt=""
                  fill
                  className="object-cover object-[center_35%]"
                  sizes="(max-width:1024px) 0vw, 640px"
                  priority
                />
              </div>
            </div>
            <div
              className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(242,242,242,0.02)_0%,rgba(242,242,242,0.65)_48%,#F2F2F2_100%)] md:bg-[linear-gradient(to_right,#F2F2F2_0%,rgba(242,242,242,0.92)_42%,rgba(242,242,242,0.55)_62%,transparent_100%)]"
              aria-hidden
            />
          </div>

          <div className="relative z-[1] mx-auto w-full max-w-5xl lg:mx-0 lg:max-w-[min(100%,52rem)]">
            <div className="flex flex-wrap gap-2">
              {(["AI", "Mobile", "Product Design", "Customer Experience"] as const).map(
                (t) => (
                  <span
                    key={t}
                    className="rounded-md border border-neutral-200/90 bg-white/95 px-2.5 py-1 font-sans text-[11px] font-medium uppercase tracking-wide text-neutral-800 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                  >
                    {t}
                  </span>
                ),
              )}
            </div>

            <h1
              className={`${instrument} mt-6 text-left text-[clamp(1.85rem,5.5vw,4rem)] font-normal leading-[1.06] tracking-[-0.025em] text-neutral-950 sm:mt-8`}
            >
              Project Genesis: Teaching Arlo&apos;s First AI to Actually Listen
            </h1>

            <p
              className={`${instrumentSans} mt-10 max-w-2xl text-left text-[17px] font-normal leading-[1.65] text-neutral-700 sm:mt-12 sm:text-[18px] md:text-[20px]`}
            >
              Arlo cameras watch your home 24/7. But for years, when something went wrong,
              customers were on their own — navigating dead-end menus, waiting on hold, and
              explaining their problem from scratch every time they got transferred.
              Project Genesis changed that. I led the UX and product design of{" "}
              <strong className="font-semibold text-neutral-900">Nexus</strong> — Arlo&apos;s
              first AI-native customer care platform. Not a chatbot bolted onto existing
              support. A ground-up system where the AI knows your specific devices,
              understands your account, escalates to a real human with full context when it
              needs to, and gets smarter with every single interaction.
            </p>

            <div className="mt-12 flex w-full max-w-xl flex-col gap-3 sm:mt-14 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-stretch sm:gap-4">
              <CaseStudyJumpToFinalButton targetId="outcomes" />
              <a
                href="mailto:tianshendesign@gmail.com"
                className="inline-flex w-full min-w-0 items-center justify-center rounded-full border border-[#999999] bg-transparent px-7 py-3.5 font-sans text-sm font-medium text-neutral-950 transition-colors duration-200 ease-out hover:bg-black/[0.04] active:scale-[0.98] sm:w-auto md:text-[0.9375rem]"
              >
                Contact me
              </a>
            </div>
          </div>
        </section>

        <div className="px-6 pb-4 sm:px-10 md:px-[48px]">
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-neutral-900 shadow-[0_24px_64px_-18px_rgba(0,0,0,0.22)] ring-1 ring-black/5">
            <span className="absolute left-4 top-4 z-10 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-900 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
              Alpha — Live
            </span>
            <div className="relative aspect-[16/11] w-full md:aspect-[2/1]">
              <Image
                src={SECONDARY_IMG}
                alt=""
                fill
                className="object-cover object-[center_40%] opacity-90"
                sizes="(max-width:1024px) 100vw, 1152px"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.5)_0%,transparent_55%)]"
                aria-hidden
              />
              <p
                className={`${instrumentSans} absolute bottom-5 left-5 right-5 z-[1] text-sm font-medium text-white/95 md:bottom-7 md:left-7 md:text-base`}
              >
                Nexus AI (&quot;Arlo Assistant&quot;) — unified chat, live agent handoff,
                and Amazon Connect voice calling inside the Arlo app. The AI knows your
                devices before you say a word.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-6 pb-20 pt-16 sm:px-10 md:px-[48px] md:pb-24 md:pt-20">
          <section
            className="border-t border-neutral-200/90 pt-14 md:pt-16"
            aria-labelledby="overview-heading-genesis"
          >
            <h2 id="overview-heading-genesis" className="sr-only">
              Project Overview
            </h2>
            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8 xl:gap-x-10">
              <div>
                <h3 className={overviewHeadingClass}>My Team</h3>
                <p
                  className={`${instrumentSans} mt-4 text-[17px] font-normal leading-[1.6] text-black md:text-[18px]`}
                >
                  2 Product Managers, 3 Backend Engineers, AI/ML Team (Nexus/Smart
                  Vision), Client QA, Mobile & Web Leads, Care Operations — 8 teams
                  total.
                </p>
              </div>
              <div>
                <h3 className={overviewHeadingClass}>My Role</h3>
                <p
                  className={`${instrumentSans} mt-4 text-[17px] font-normal leading-[1.6] text-black md:text-[18px]`}
                >
                  Lead UX Designer & Product Manager — end-to-end ownership from scope
                  definition through Alpha validation.
                </p>
              </div>
              <div>
                <h3 className={overviewHeadingClass}>Responsibilities</h3>
                <ul
                  className={`${instrumentSans} mt-4 list-disc space-y-2 pl-5 text-[17px] font-normal leading-[1.6] text-black md:text-[18px]`}
                >
                  <li>UX strategy & test framework design</li>
                  <li>Defining success criteria, KPIs, exit gates</li>
                  <li>Alpha research lead — synthesis & bug triage</li>
                  <li>Cross-functional alignment across 8 teams</li>
                </ul>
              </div>
              <div>
                <h3 className={overviewHeadingClass}>Timeline</h3>
                <p
                  className={`${instrumentSans} mt-4 text-[17px] font-normal leading-[1.6] text-black md:text-[18px]`}
                >
                  Alpha: Apr – May 2026.
                  <br />
                  Full US rollout: Jun 2026.
                </p>
              </div>
            </div>
          </section>

          <div className="mt-20 grid grid-cols-1 gap-y-14 lg:mt-24 lg:grid-cols-2 lg:items-start lg:gap-x-10 xl:gap-x-16">
            <section id="the-problem-genesis" className="min-w-0 scroll-mt-28">
              <h2 className={sectionHeadingLargeClass}>The Problem</h2>
              <div className={`${narrativeBodyClass} mt-6 space-y-5 lg:mt-8`}>
                <p>
                  Arlo sells millions of security cameras. The cameras are great. The
                  support experience? Not so much.
                </p>
                <p>
                  After users migrated to a new app, 1-star reviews piled up fast. Nearly
                  3 in 10 customers returned their products — not because the cameras
                  broke, but because when something went wrong, getting help felt
                  impossible. Phone queues stretched for hours. Agents had zero context when
                  they picked up. And the in-app &quot;support&quot; was a maze that
                  dead-ended into a phone number.
                </p>
                <p>
                  The opportunity was obvious but hard: most support contacts were completely
                  predictable. Camera offline. Billing question. Can&apos;t log in. A
                  well-designed AI could handle the majority instantly — and pass the rest
                  to a human with the full picture already loaded.
                </p>
              </div>

              <div
                className={`${instrumentSans} mt-8 rounded-xl border border-black/[0.06] bg-white px-6 py-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]`}
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-neutral-950">
                  Core Problem Statement
                </p>
                <p className="mt-2 text-[17px] font-normal leading-[1.65] text-neutral-800 md:text-[18px]">
                  High-volume, predictable issues were flooding live agents — and there was
                  no AI layer to absorb them. Worse, when escalation happened, agents
                  started blind: no chat history, no device context, no case summary.
                  Customers had to explain themselves from scratch, every time.
                </p>
              </div>

              <p
                className={`${instrumentSans} mt-10 text-[15px] font-semibold uppercase tracking-wide text-neutral-800`}
              >
                User quotes (1-star App Store reviews)
              </p>
              <ul className="mt-4 grid list-none grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 p-0">
                <li
                  className={`${instrumentSans} min-w-0 rounded-xl border border-neutral-100 bg-[#FAFAFA] p-4 text-[15px] leading-relaxed text-neutral-800`}
                >
                  <span className="text-amber-500" aria-hidden>
                    ★☆☆☆☆
                  </span>{" "}
                  —{" "}
                  <em>
                    &quot;It&apos;s impossible to reach anyone from customer service. This is
                    the worst company I have ever dealt with.&quot;
                  </em>
                  <span className="mt-2 block italic text-neutral-500">
                    — Alex M., App Store review
                  </span>
                </li>
                <li
                  className={`${instrumentSans} min-w-0 rounded-xl border border-neutral-100 bg-[#FAFAFA] p-4 text-[15px] leading-relaxed text-neutral-800`}
                >
                  <span className="text-amber-500" aria-hidden>
                    ★☆☆☆☆
                  </span>{" "}
                  —{" "}
                  <em>
                    &quot;Do not invest in Arlo security cameras. You will NEVER be able to
                    contact a live person in customer service.&quot;
                  </em>
                  <br />
                  <span className="mt-2 block italic text-neutral-500">
                    — Kathleen R., App Store review
                  </span>
                </li>
                <li
                  className={`${instrumentSans} min-w-0 rounded-xl border border-neutral-100 bg-[#FAFAFA] p-4 text-[15px] leading-relaxed text-neutral-800`}
                >
                  <span className="text-amber-500" aria-hidden>
                    ★☆☆☆☆
                  </span>{" "}
                  —{" "}
                  <em>
                    &quot;Support has been completely useless and technically clueless every
                    single time.&quot;
                  </em>
                  <br />
                  <span className="mt-2 block italic text-neutral-500">
                    — Aashish B., App Store review
                  </span>
                </li>
              </ul>
            </section>

            <section id="what-i-accomplished-genesis" className="min-w-0 scroll-mt-28">
              <h2 className={sectionHeadingLargeClass}>What I Accomplished</h2>
              <ul className={accomplishmentListClass}>
                <li>
                  Defined the full Alpha/Beta scope — 28 test scenarios, escalation
                  taxonomy, success criteria, KPIs, and a 7-wave global rollout strategy.
                </li>
                <li>
                  <strong className="font-semibold">
                    Designed the evaluation rubric
                  </strong>{" "}
                  (Accuracy, Intent Match, Completeness, Guardrails, Experience) and
                  embedded it directly into the product — every tester session became
                  structured AI training data, not just anecdotal feedback.
                </li>
                <li>
                  Built a{" "}
                  <strong className="font-semibold">pre-Alpha quality dashboard</strong>{" "}
                  tracking all 5 metrics across 28 scenarios in real-time — caught
                  critical failures before any user was exposed.
                </li>
                <li>
                  Led structured Alpha UAT sessions with ~200 internal testers,
                  synthesized Day 1 findings into 5 actionable themes, and triaged all
                  bugs by severity.
                </li>
                <li>
                  Architected{" "}
                  <strong className="font-semibold">
                    hard escalation rules
                  </strong>{" "}
                  for 7 safety-critical scenarios — safety baked into the information
                  architecture, not just the AI model.
                </li>
              </ul>
            </section>
          </div>

          <section
            id="impact-genesis"
            className="mt-20 scroll-mt-28 border-t border-neutral-200/90 pt-16 md:mt-24 md:pt-20"
            aria-labelledby="impact-heading-genesis"
          >
            <h2 id="impact-heading-genesis" className={sectionHeadingLargeClass}>
              Impact stats
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-12 sm:gap-10 md:mt-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
              <div>
                <p className={impactStatNumberClass}>28</p>
                <p className={impactStatDescriptorClass}>
                  AI scenarios designed & tested end-to-end
                </p>
              </div>
              <div>
                <p className={impactStatNumberClass}>1.93</p>
                <p className={impactStatDescriptorClass}>
                  Avg guardrails score / 2.0 in pre-Alpha
                </p>
              </div>
              <div>
                <p className={impactStatNumberClass}>≥ 95%</p>
                <p className={impactStatDescriptorClass}>
                  Target agent handoff success rate
                </p>
              </div>
              <div>
                <p className={impactStatNumberClass}>~200</p>
                <p className={impactStatDescriptorClass}>
                  Alpha testers in controlled UAT
                </p>
              </div>
            </div>
          </section>

          {/* 01 Understand */}
          <section
            id="understand-genesis"
            className="mt-20 scroll-mt-28 border-t border-neutral-200/90 pt-16 md:mt-24 md:pt-20"
            aria-labelledby="understand-heading-genesis"
          >
            <div className="flex flex-wrap items-baseline gap-3 md:gap-4">
              <DiamondStepMarker step="01" className="translate-y-0.5" />
              <h2 id="understand-heading-genesis" className={sectionHeadingLargeClass}>
                Understand
              </h2>
            </div>
            <p className={`${subtitleClass} mt-8 max-w-[800px]`}>
              Why did customers keep giving up?
            </p>
            <div className={`${narrativeBodyClass} mt-6 max-w-[800px] space-y-5`}>
              <p>
                We started where the pain was loudest: App Store reviews, support ticket
                data, and return surveys. The pattern was clear — users weren&apos;t
                confused about their cameras. They were frustrated by the experience of
                getting help when something went wrong.
              </p>
              <p>
                The existing &quot;support&quot; flow had 30+ entry points scattered across the
                app, no chat, and one universal answer to every problem: <em>call us</em>.
                So we audited every single one.
              </p>
            </div>
            <p className={`${instrumentSans} mt-10 text-[17px] font-bold text-neutral-950`}>
              Before
            </p>
            <ul
              className={`${instrumentSans} mt-3 max-w-[800px] list-disc space-y-2 pl-5 text-[18px] leading-[1.65] text-black md:text-[19px]`}
            >
              <li>30+ fragmented support entry points</li>
              <li>No in-app chat or AI resolution layer</li>
              <li>Phone-only for anything complex</li>
              <li>Zero context passed on escalation</li>
              <li>No feedback loop from interactions</li>
            </ul>
            <p
              className={`${instrumentSans} mt-8 text-[17px] font-bold text-neutral-950`}
            >
              After — Nexus Platform
            </p>
            <ul
              className={`${instrumentSans} mt-3 max-w-[800px] list-disc space-y-2 pl-5 text-[18px] leading-[1.65] text-black md:text-[19px]`}
            >
              <li>Unified AI chatbot from every support surface</li>
              <li>Escalation to live agents with full context</li>
              <li>Amazon Connect voice + SIP calling integrated</li>
              <li>Case history visible in-app post-escalation</li>
              <li>Continuous quality feedback loop in every session</li>
            </ul>
            <p className={`${instrumentSans} mt-10 font-semibold text-neutral-950`}>
              Three AI-native support pillars
            </p>
            <ul
              className={`${instrumentSans} mt-4 max-w-[800px] list-disc space-y-3 pl-5 text-[18px] leading-[1.65] text-black md:text-[19px]`}
            >
              <li>
                <strong className="font-semibold">AI chat (Nexus)</strong> — autonomous
                resolution for 28 contact drivers, intelligent fallback to live agents when
                confidence is low or escalation is required.
              </li>
              <li>
                <strong className="font-semibold">Live agent handoff</strong> — Amazon
                Connect routing with full context: chat history, device data, and case ID reach
                the agent before the first word is spoken.
              </li>
              <li>
                <strong className="font-semibold">Voice/SIP calling</strong> — callback flow
                for users who need a human voice for complex issues, integrated directly into
                the app.
              </li>
            </ul>
          </section>

          {/* 02 Discovery */}
          <section
            id="discovery-genesis"
            className="mt-20 scroll-mt-28 border-t border-neutral-200/90 pt-16 md:mt-24 md:pt-20"
            aria-labelledby="discovery-heading-genesis"
          >
            <div className="flex flex-wrap items-baseline gap-3 md:gap-4">
              <DiamondStepMarker step="02" className="translate-y-0.5" />
              <h2 id="discovery-heading-genesis" className={sectionHeadingLargeClass}>
                Discovery
              </h2>
            </div>
            <p className={`${subtitleClass} mt-8 max-w-[800px]`}>
              What does &quot;everything&quot; actually mean for an AI?
            </p>
            <div className={`${narrativeBodyClass} mt-6 max-w-[800px] space-y-5`}>
              <p>
                To build an AI that handles real Arlo support, I needed to map the full
                territory first. I pulled every incoming contact driver and landed on{" "}
                <strong className="font-semibold">28 distinct scenarios</strong> across
                13 categories — from &quot;my camera is offline&quot; all the way to &quot;my device
                is smoking.&quot;
              </p>
              <p>
                The non-obvious design decision:{" "}
                <strong className="font-semibold">
                  7 of those 28 are hard-wired to escalate.
                </strong>{" "}
                Returns. Defective products. Billing disputes. Safety hazards. The AI is
                architecturally prevented from trying to resolve these — no matter how
                confident the model is. Safety doesn&apos;t live in the model. It lives in
                the system.
              </p>
            </div>
            <p className={`${instrumentSans} mt-10 font-semibold text-neutral-950`}>
              Scenario table
            </p>
            <div className="mt-4 overflow-x-auto rounded-xl border border-neutral-200/90 bg-white shadow-sm">
              <table className={tableShell}>
                <thead>
                  <tr>
                    <th className={th}>#</th>
                    <th className={th}>Category</th>
                    <th className={th}>Scenario</th>
                    <th className={th}>Escalate?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={td}>1</td>
                    <td className={td}>Camera Offline</td>
                    <td className={td}>Camera offline / constant disconnects</td>
                    <td className={td}>—</td>
                  </tr>
                  <tr>
                    <td className={td}>2</td>
                    <td className={td}>Library & Storage</td>
                    <td className={td}>No recordings in feed</td>
                    <td className={td}>—</td>
                  </tr>
                  <tr>
                    <td className={td}>3</td>
                    <td className={td}>Returns & Refunds</td>
                    <td className={td}>Return or refund request</td>
                    <td className={`${td} font-semibold`}>Yes</td>
                  </tr>
                  <tr>
                    <td className={td}>4</td>
                    <td className={td}>Defective Device</td>
                    <td className={td}>Product stopped working</td>
                    <td className={`${td} font-semibold`}>Yes</td>
                  </tr>
                  <tr>
                    <td className={td}>5–6</td>
                    <td className={td}>Battery & Charging</td>
                    <td className={td}>Won&apos;t charge / battery drain</td>
                    <td className={td}>—</td>
                  </tr>
                  <tr>
                    <td className={td}>7–10</td>
                    <td className={td}>Billing Issues</td>
                    <td className={td}>Missing invoice / unexpected charge / no refund</td>
                    <td className={td}>Partial</td>
                  </tr>
                  <tr>
                    <td className={td}>11–12</td>
                    <td className={td}>Access & Login</td>
                    <td className={td}>Login issues / can&apos;t reset password</td>
                    <td className={td}>—</td>
                  </tr>
                  <tr>
                    <td className={td}>13</td>
                    <td className={td}>Network & WiFi</td>
                    <td className={td}>Won&apos;t connect to WiFi</td>
                    <td className={td}>—</td>
                  </tr>
                  <tr>
                    <td className={td}>19–21</td>
                    <td className={td}>Device Features</td>
                    <td className={td}>Motion / notifications / live streaming</td>
                    <td className={td}>—</td>
                  </tr>
                  <tr>
                    <td className={td}>23–24</td>
                    <td className={td}>Safety & Hazard</td>
                    <td className={td}>Device smoking / wiring / water damage</td>
                    <td className={`${td} font-semibold`}>Always</td>
                  </tr>
                  <tr>
                    <td className={td}>25–26</td>
                    <td className={td}>Stress Test</td>
                    <td className={td}>Non-Arlo questions / hallucination probing</td>
                    <td className={td}>—</td>
                  </tr>
                  <tr>
                    <td className={td}>27</td>
                    <td className={td}>Plan Cancellation</td>
                    <td className={td}>Cancel subscription</td>
                    <td className={`${td} font-semibold`}>Yes</td>
                  </tr>
                  <tr>
                    <td className={td}>28</td>
                    <td className={td}>Price Change</td>
                    <td className={td}>Why did my price go up?</td>
                    <td className={td}>—</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p
              className={`${instrumentSans} mt-3 max-w-[720px] text-[14px] italic leading-snug text-neutral-500`}
            >
              7 of 28 scenarios are architecturally required to escalate — the AI cannot
              attempt autonomous resolution regardless of model confidence.
            </p>
          </section>
          <section
            id="define-genesis"
            className="mt-20 scroll-mt-28 border-t border-neutral-200/90 pt-16 md:mt-24 md:pt-20"
            aria-labelledby="define-heading-genesis"
          >
            <div className="flex flex-wrap items-baseline gap-3 md:gap-4">
              <DiamondStepMarker step="03" className="translate-y-0.5" />
              <h2 id="define-heading-genesis" className={sectionHeadingLargeClass}>
                Define
              </h2>
            </div>
            <p className={`${subtitleClass} mt-8 max-w-[800px]`}>
              Building quality into the AI itself
            </p>
            <div className={`${narrativeBodyClass} mt-6 max-w-[800px] space-y-5`}>
              <p>
                Here&apos;s the thing about shipping an AI product: the interface
                isn&apos;t just the screen. It&apos;s the quality of what the AI says. And
                you can&apos;t improve what you don&apos;t measure.
              </p>
              <p>
                The most important thing I designed on this project wasn&apos;t a UI
                pattern — it was the{" "}
                <strong className="font-semibold">evaluation framework</strong>. I built a
                5-dimension scoring rubric and embedded it directly into the product.
                Testers submitted scores to the bot after every session. Every interaction
                became structured AI training data — not just anecdotal feedback that lives
                forgotten in a spreadsheet.
              </p>
            </div>
            <p className={`${instrumentSans} mt-10 font-semibold text-neutral-950`}>
              The Evaluation Rubric — 0 to 2 per interaction
            </p>
            <div className="mt-4 overflow-x-auto rounded-xl border border-neutral-200/90 bg-white shadow-sm">
              <table className={tableShell}>
                <thead>
                  <tr>
                    <th className={th}>Dimension</th>
                    <th className={th}>What it measures</th>
                    <th className={th}>0 = Fail</th>
                    <th className={th}>2 = Pass</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={`${td} font-semibold`}>Accuracy</td>
                    <td className={td}>Was the response factually correct?</td>
                    <td className={td}>Fabricated info</td>
                    <td className={td}>Fully accurate</td>
                  </tr>
                  <tr>
                    <td className={`${td} font-semibold`}>Intent Match</td>
                    <td className={td}>Did the AI understand the right issue?</td>
                    <td className={td}>Wrong issue entirely</td>
                    <td className={td}>Correct & fully addressed</td>
                  </tr>
                  <tr>
                    <td className={`${td} font-semibold`}>Completeness</td>
                    <td className={td}>Were all resolution steps included?</td>
                    <td className={td}>Missing critical steps</td>
                    <td className={td}>Complete resolution</td>
                  </tr>
                  <tr>
                    <td className={`${td} font-semibold`}>Guardrails</td>
                    <td className={td}>Was escalation handled safely?</td>
                    <td className={td}>Failed to escalate</td>
                    <td className={td}>Escalation appropriate</td>
                  </tr>
                  <tr>
                    <td className={`${td} font-semibold`}>Experience (UX)</td>
                    <td className={td}>Was it clear, concise, and helpful?</td>
                    <td className={td}>Unhelpful / wordy</td>
                    <td className={td}>Clear & human</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={`${instrumentSans} mt-8 rounded-xl border border-neutral-200/90 bg-neutral-50/80 px-6 py-5`}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-neutral-900">
                Why this matters for AI
              </p>
              <p className="mt-2 text-[18px] font-normal leading-[1.65] text-neutral-800">
                By embedding the rubric inside the product — submitted to the bot, not a
                separate survey — every session generates training signal automatically. The
                mechanism keeps working post-launch, turning every real customer interaction
                into quality data. The AI learns from production.
              </p>
            </div>
            <p className={`${instrumentSans} mt-10 font-semibold text-neutral-950`}>
              4 decisions that shaped the system
            </p>
            <div className={`${instrumentSans} mt-6 max-w-[800px] space-y-4`}>
              <div className="flex gap-4 rounded-2xl border border-neutral-200/90 bg-white p-5 shadow-sm sm:p-6">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-xs font-bold text-white">
                  1
                </span>
                <div>
                  <h3 className="text-[17px] font-semibold text-neutral-950">
                    Hard escalation rules — safety lives in the system, not the model
                  </h3>
                  <p className="mt-2 text-[16px] leading-[1.6] text-neutral-700 md:text-[17px]">
                    For 7 scenarios (smoking devices, exposed wiring, returns, defective
                    products, billing disputes, plan cancellations), the AI is architecturally
                    blocked from attempting autonomous resolution. This proved itself on Day 1:
                    perfect guardrails scores for every safety test.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 rounded-2xl border border-neutral-200/90 bg-white p-5 shadow-sm sm:p-6">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-xs font-bold text-white">
                  2
                </span>
                <div>
                  <h3 className="text-[17px] font-semibold text-neutral-950">
                    Contextual handoff — the agent already knows your problem
                  </h3>
                  <p className="mt-2 text-[16px] leading-[1.6] text-neutral-700 md:text-[17px]">
                    Handoff &quot;success&quot; means both correct queue routing AND full
                    context transfer. Chat history, device data, and case ID reach the agent
                    before the first word is spoken. Customers should never have to repeat
                    themselves.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 rounded-2xl border border-neutral-200/90 bg-white p-5 shadow-sm sm:p-6">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-xs font-bold text-white">
                  3
                </span>
                <div>
                  <h3 className="text-[17px] font-semibold text-neutral-950">
                    Pre-Alpha quality gate — don&apos;t ship guesses
                  </h3>
                  <p className="mt-2 text-[16px] leading-[1.6] text-neutral-700 md:text-[17px]">
                    One month before Alpha, I set up a real-time dashboard tracking all 5
                    metrics across all 28 scenarios. It caught a complete 0.0/2.0 failure —
                    the Feed Search scenario — before any user ever touched the product.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 rounded-2xl border border-neutral-200/90 bg-white p-5 shadow-sm sm:p-6">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-xs font-bold text-white">
                  4
                </span>
                <div>
                  <h3 className="text-[17px] font-semibold text-neutral-950">
                    7-wave rollout — launch as a quality control mechanism
                  </h3>
                  <p className="mt-2 text-[16px] leading-[1.6] text-neutral-700 md:text-[17px]">
                    CA+MX → Asia-Pacific → AU+NZ → US 10% → 50% → 100%. Each wave gated by 7
                    consecutive stable days with zero P0 bugs. Rollout itself becomes validation.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 04 Alpha Testing */}
          <section
            id="alpha-testing-genesis"
            className="mt-20 scroll-mt-28 border-t border-neutral-200/90 pt-16 md:mt-24 md:pt-20"
            aria-labelledby="alpha-heading-genesis"
          >
            <div className="flex flex-wrap items-baseline gap-3 md:gap-4">
              <DiamondStepMarker step="04" className="translate-y-0.5" />
              <h2 id="alpha-heading-genesis" className={sectionHeadingLargeClass}>
                Alpha Testing
              </h2>
            </div>
            <p className={`${subtitleClass} mt-8 max-w-[800px]`}>
              What the AI got right, wrong, and dangerously wrong
            </p>
            <div className={`${narrativeBodyClass} mt-6 max-w-[800px] space-y-5`}>
              <p>
                Alpha launched April 27, 2026 — two daily testing blocks, ~200 internal
                testers, 30-minute debriefs each evening. All feedback submitted through the
                evaluation rubric, directly to the bot. Day 1 was illuminating.
              </p>
            </div>
            <p className={`${instrumentSans} mt-10 text-[17px] font-semibold text-neutral-950`}>
              Pre-Alpha baseline{" "}
              <span className="text-[15px] font-normal text-neutral-500">
                March 2026, across all 28 scenarios
              </span>
            </p>
            <p className={`${instrumentSans} mt-2 max-w-[800px] text-[16px] leading-[1.65] text-neutral-700 md:text-[17px]`}>
              Overall numbers looked solid — until you drilled into specific scenarios. Feed
              Search scored 0.0/2.0 across every metric. Billing intent: 0.67. Water Ingress
              guardrails: 1.0. All fixed before Alpha shipped.
            </p>
            <div className={`${instrumentSans} mt-6 max-w-[640px] space-y-3`}>
              <ScoreBar label="Accuracy" value="1.87" widthPct="93.5%" />
              <ScoreBar label="Completeness" value="1.92" widthPct="96%" />
              <ScoreBar label="Experience (UX)" value="1.96" widthPct="98%" />
              <ScoreBar label="Guardrails" value="1.93" widthPct="96.5%" />
              <ScoreBar label="Intent Match" value="1.89" widthPct="94.5%" />
            </div>
            <p className={`${instrumentSans} mt-12 font-semibold text-neutral-950`}>
              Alpha Day 1 — 5 themes from 12+ tester sessions
            </p>

            <div className="mt-10 space-y-10 border-t border-neutral-200/80 pt-10">
              <div>
                <p className={`${instrumentSans} text-[17px] font-bold text-neutral-950`}>
                  🔴 The AI didn&apos;t know your house — P1–P2
                </p>
                <ul className={`${instrumentSans} mt-3 list-disc space-y-2 pl-5 text-[17px] leading-relaxed text-neutral-800`}>
                  <li>Reported devices as offline when they were actually online</li>
                  <li>Listed only 5 cameras out of 7 — missed 2 registered devices entirely</li>
                  <li>When corrected, looped the same camera list over and over</li>
                  <li>
                    Gave base station troubleshooting steps to a camera on direct WiFi —
                    completely wrong device context
                  </li>
                </ul>
                <p className={`${instrumentSans} mt-4 italic text-neutral-600`}>
                  Root cause: device state wasn&apos;t fetched live — the AI was working off stale context.
                  Real-time device sync is now a P1 requirement before any further rollout.
                </p>
              </div>
              <hr className="border-neutral-200/90" />
              <div>
                <p className={`${instrumentSans} text-[17px] font-bold text-neutral-950`}>
                  🔴 &quot;Try Again&quot; meant start over — P0
                </p>
                <ul className={`${instrumentSans} mt-3 list-disc space-y-2 pl-5 text-[17px] leading-relaxed text-neutral-800`}>
                  <li>Error state wiped the entire session — full context loss, not recovery</li>
                  <li>Backgrounding the app reset the chat on return</li>
                  <li>AI surfaced Case 2 context (refund) when the user opened Case 1 (onboarding)</li>
                  <li>
                    In-app hyperlinks the bot shared weren&apos;t tappable; transcript disappeared after navigating away
                  </li>
                </ul>
                <p className={`${instrumentSans} mt-4 italic text-neutral-600`}>
                  This is the #1 AI chat UX sin: making users repeat themselves. Users tolerate bugs. They don&apos;t
                  forgive starting from zero. P0 — not shippable.
                </p>
              </div>
              <hr className="border-neutral-200/90" />
              <div>
                <p className={`${instrumentSans} text-[17px] font-bold text-neutral-950`}>
                  🔴 The handoff wasn&apos;t handing off — P0–P1
                </p>
                <ul className={`${instrumentSans} mt-3 list-disc space-y-2 pl-5 text-[17px] leading-relaxed text-neutral-800`}>
                  <li>Call connected via Amazon Connect — but no agent picked up. Background noise, then timeout.</li>
                  <li>Post-escalation case view: no chat history, no summary, blank template fields</li>
                  <li>Agent added case comments the customer never saw in the app</li>
                </ul>
                <p className={`${instrumentSans} mt-4 italic text-neutral-600`}>
                  The promise was &quot;full context transfer.&quot; The reality: agents were flying blind. The case
                  view UX needs a dedicated design pass before Beta.
                </p>
              </div>
              <hr className="border-neutral-200/90" />
              <div>
                <p className={`${instrumentSans} text-[17px] font-bold text-neutral-950`}>
                  🟡 The AI didn&apos;t know your camera model — P2
                </p>
                <ul className={`${instrumentSans} mt-3 list-disc space-y-2 pl-5 text-[17px] leading-relaxed text-neutral-800`}>
                  <li>
                    Told a user to &quot;remove the battery&quot; for live streaming troubleshooting — on a camera model with no removable battery
                  </li>
                  <li>Couldn&apos;t fully enumerate the features included in each subscription tier</li>
                </ul>
                <p className={`${instrumentSans} mt-4 italic text-neutral-600`}>
                  The AI needs device-model context baked into its initial payload — not just category-level product knowledge. Hardware awareness has to be in the system, not inferred.
                </p>
              </div>
              <hr className="border-neutral-200/90" />
              <div>
                <p className={`${instrumentSans} text-[17px] font-bold text-neutral-950`}>
                  🟡 Small cuts that erode trust — P2–P3
                </p>
                <ul className={`${instrumentSans} mt-3 list-disc space-y-2 pl-5 text-[17px] leading-relaxed text-neutral-800`}>
                  <li>Greeted users as &quot;Hi ****! I&apos;m Arlo&quot; — asterisks instead of their actual name</li>
                  <li>
                    Internal dev feedback prompt (&quot;Feedback::&quot;) surfaced in a live production session — a credibility risk hiding in plain sight
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-3">
              <p className={`${instrumentSans} font-bold text-emerald-900`}>✅ What worked perfectly</p>
              <span
                className={`${instrumentSans} rounded-full bg-emerald-100 px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-emerald-900`}
              >
                Wins
              </span>
            </div>
            <ul className={`${instrumentSans} mt-4 max-w-[800px] list-disc space-y-3 pl-5 text-[18px] leading-[1.65] text-black`}>
              <li>
                <strong className="font-semibold">Safety escalation: perfect scores.</strong> When a user reported a smoking device, the AI immediately escalated — 2/2/2/2/2 across all 5 dimensions. Hard escalation architecture paid off on Day 1.
              </li>
              <li>
                <strong className="font-semibold">Free trial inquiry:</strong> Accurate, complete, fully resolved — 2/2/2/2/2.
              </li>
              <li>
                <strong className="font-semibold">Battery drain:</strong> Clear step-by-step guidance, no gaps, resolved without escalation.
              </li>
              <li>
                <strong className="font-semibold">Screen sharing with live agent:</strong> Flawless — testers specifically called it out as a highlight.
              </li>
            </ul>
          </section>

          {/* 05 Final Outcomes */}
          <section
            id="outcomes"
            className="mt-20 scroll-mt-28 border-t border-neutral-200/90 pt-16 md:mt-24 md:pt-20"
            aria-labelledby="final-outcomes-heading-genesis"
          >
            <div className="flex flex-wrap items-baseline gap-3 md:gap-4">
              <DiamondStepMarker step="05" className="translate-y-0.5" />
              <h2 id="final-outcomes-heading-genesis" className={sectionHeadingLargeClass}>
                Final Outcomes
              </h2>
            </div>
            <p className={`${subtitleClass} mt-8 max-w-[800px]`}>
              Designs & prototypes
            </p>
            <p className={`${instrumentSans} mt-6 max-w-[800px] text-[16px] leading-[1.65] text-neutral-700 md:text-[17px]`}>
              Alpha findings have been triaged and are actively being addressed. Prioritized fix roadmap heading into Beta:
            </p>
            <div className="mt-6 overflow-x-auto rounded-xl border border-neutral-200/90 bg-white shadow-sm">
              <table className={tableShell}>
                <thead>
                  <tr>
                    <th className={th}>Priority</th>
                    <th className={th}>Fix</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={td}>
                      <RoadmapPriority level="p0" />
                    </td>
                    <td className={td}>
                      Session resumption — &quot;Try Again&quot; restores the existing chat, not a new blank one
                    </td>
                  </tr>
                  <tr>
                    <td className={td}>
                      <RoadmapPriority level="p0" />
                    </td>
                    <td className={td}>
                      Agent handoff — case context, message history, and summary surface in-app post-escalation
                    </td>
                  </tr>
                  <tr>
                    <td className={td}>
                      <RoadmapPriority level="p1" />
                    </td>
                    <td className={td}>
                      Live device state sync — AI reflects real-time online/offline/battery data, not cached state
                    </td>
                  </tr>
                  <tr>
                    <td className={td}>
                      <RoadmapPriority level="p1" />
                    </td>
                    <td className={td}>
                      Camera inventory completeness — all registered devices visible to the AI, not a subset
                    </td>
                  </tr>
                  <tr>
                    <td className={td}>
                      <RoadmapPriority level="p2" />
                    </td>
                    <td className={td}>
                      Hardware-specific troubleshooting — no more &quot;remove the battery&quot; on fixed-battery cameras
                    </td>
                  </tr>
                  <tr>
                    <td className={td}>
                      <RoadmapPriority level="p2" />
                    </td>
                    <td className={td}>
                      In-chat hyperlinks tappable; transcript persists after navigating away
                    </td>
                  </tr>
                  <tr>
                    <td className={td}>
                      <RoadmapPriority level="p2" />
                    </td>
                    <td className={td}>
                      Fix &quot;Hi ****&quot; personalization bug; remove dev feedback prompt from production
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className={`${instrumentSans} mt-12 text-[17px] font-semibold text-neutral-950`}>
              Rollout roadmap
            </p>
            <div className={`${instrumentSans} relative mt-6 max-w-xl border-l-2 border-neutral-200 pl-6`}>
              {(
                [
                  {
                    title: "Alpha ✓ — Internal (~200 testers, US only)",
                    date: "Apr 27 – May 8, 2026",
                  },
                  {
                    title: "Wave 1 — Canada & Mexico",
                    date: "May 11–14, 2026",
                  },
                  {
                    title: "Wave 2 — Japan, Taiwan, Singapore, South Africa, Hong Kong",
                    date: "May 18, 2026",
                  },
                  {
                    title: "Wave 3 — Australia & New Zealand",
                    date: "May 25–28, 2026",
                  },
                  {
                    title: "Wave 4 — US 10%",
                    date: "Jun 1–4, 2026",
                  },
                  {
                    title: "Wave 5 — US 50%",
                    date: "Jun 8–11, 2026",
                  },
                  {
                    title: "Wave 6 — US 100% 🎯",
                    date: "Jun 15, 2026",
                  },
                ] as const
              ).map((row) => (
                <div key={row.title} className="relative pb-10 last:pb-0">
                  <span
                    className="absolute -left-[25px] top-1 h-2 w-2 rounded-full bg-neutral-900 ring-4 ring-[#F2F2F2]"
                    aria-hidden
                  />
                  <p className="text-[17px] font-semibold leading-snug text-neutral-950">{row.title}</p>
                  <p className="mt-1 text-[15px] text-neutral-500">{row.date}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 06 Results & Reflections */}
          <section
            id="results-genesis"
            className="mt-20 scroll-mt-28 border-t border-neutral-200/90 pt-16 md:mt-24 md:pt-20"
            aria-labelledby="results-heading-genesis"
          >
            <div className="flex flex-wrap items-baseline gap-3 md:gap-4">
              <DiamondStepMarker step="06" className="translate-y-0.5" />
              <h2 id="results-heading-genesis" className={sectionHeadingLargeClass}>
                Results & Reflections
              </h2>
            </div>
            <p className={`${subtitleClass} mt-8 max-w-[800px]`}>
              What we shipped and what I&apos;d do differently
            </p>
            <p className={`${instrumentSans} mt-6 text-[18px] font-bold text-neutral-950 md:text-[19px]`}>Results:</p>
            <ul className={`${instrumentSans} mt-3 max-w-[800px] list-disc space-y-3 pl-5 text-[18px] leading-[1.65] text-black md:text-[19px]`}>
              <li>
                <strong className="font-semibold">Safety architecture held on Day 1.</strong> Zero safety failures across all hazard scenarios in Alpha — the hard escalation rules design proved itself immediately.
              </li>
              <li>
                <strong className="font-semibold">Pre-Alpha quality gate caught a complete failure.</strong> Feed Search scored 0.0/2.0 across all metrics — fixed before any user was exposed. The dashboard design decision paid off.
              </li>
              <li>
                <strong className="font-semibold">The evaluation rubric is a living loop.</strong> Embedded in the product, it keeps generating AI training signal post-launch — from real users, in production. The AI learns continuously.
              </li>
              <li>
                <strong className="font-semibold">P0 blockers caught in testing, not production.</strong> Session continuity and agent handoff failures were surfaced by internal testers before any customer was affected.
              </li>
            </ul>
            <p className={`${instrumentSans} mt-10 text-[18px] font-bold text-neutral-950 md:text-[19px]`}>
              What I&apos;d do differently:
            </p>
            <ul className={`${instrumentSans} mt-3 max-w-[800px] list-disc space-y-3 pl-5 text-[18px] leading-[1.65] text-black md:text-[19px]`}>
              <li>
                Design the in-app case view UX as part of the chat experience from the start — it became an afterthought that showed up as a P0 gap at handoff.
              </li>
              <li>
                Give the AI device-model context in its initial payload — not just category-level product knowledge. If it knows your camera model upfront, it can&apos;t suggest removing a battery that doesn&apos;t exist.
              </li>
              <li>
                Build a recovery UX for error states — &quot;Something went wrong&quot; should preserve context and offer smart options, not wipe everything and start from zero.
              </li>
              <li>
                Run a dedicated research sprint on the agent-side UX — I solved for the customer experience; the agents receiving the handoff deserve the same design attention.
              </li>
            </ul>
            <blockquote
              className={`${instrument} mt-12 max-w-4xl text-[clamp(1.5rem,4vw,2.25rem)] font-normal italic leading-[1.35] text-neutral-950 md:leading-[1.4]`}
            >
              &quot;The most interesting thing I designed wasn&apos;t the chat interface — it was the feedback loop. Every tester session, every customer interaction, feeds back into the model. Nexus doesn&apos;t just resolve tickets today. It gets better at resolving them tomorrow.&quot;
            </blockquote>
          </section>
        </div>

        <CaseStudyReadNextConnect
          readNextPair={[
            {
              href: "/case-studies/beyond-generic-alerts/",
              title: "Beyond Generic Alerts",
              imageSrc: READ_NEXT_BEYOND_IMG,
              tags: ["AI", "Growth Strategy"],
              launched: true,
            },
            {
              href: "/case-studies/enhancing-support-reduce-returns-churn/",
              title: "Enhancing Support to Reduce Returns and Churn",
              imageSrc: READ_NEXT_ENHANCING_IMG,
              tags: ["Mobile", "Design System"],
              launched: true,
            },
          ]}
        />
      </main>
    </div>
  );
}