import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import CaseStudyJumpToFinalButton from "@/components/CaseStudyJumpToFinalButton";

export const metadata: Metadata = {
  title:
    "Beyond Generic Alerts: Boosting Tenant Subscriptions in Offline Communities",
  description:
    "Case study on AI-powered event captions for Arlo security — design strategy, UX, and Premium growth.",
};

const instrument =
  "font-[family-name:var(--font-instrument-serif),ui-serif,Georgia,serif]";
const instrumentSans =
  "font-[family-name:var(--font-instrument-sans),sans-serif]";

const overviewHeadingClass = `${instrument} text-[24px] font-normal italic text-[#757575]`;

const sectionHeadingLargeClass = `${instrument} text-[48px] font-normal italic leading-[1.1] text-[#757575]`;

const narrativeBodyClass = `${instrumentSans} text-[20px] font-normal leading-[1.6] text-black`;

const impactStatClass = `${instrument} text-[clamp(2.25rem,5vw,3rem)] font-normal not-italic leading-[1.05] tracking-[-0.02em] text-neutral-950`;

/** Level 2 — Instrument Sans Bold Italic 24px */
const subtitleClass = `${instrumentSans} text-[24px] font-bold italic leading-[1.3] text-black`;

const definitionListClass = `${instrumentSans} max-w-[800px] list-[square] space-y-4 pl-6 text-[20px] font-normal leading-[1.65] text-black marker:text-black md:text-[21px]`;

const HERO_MOCKUPS_IMG =
  "https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=2000&q=85";
const PERSONA_SARAH_IMG = "/hero-portrait.png";
const PERSONA_MARK_IMG =
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80";

function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1] opacity-[0.16] mix-blend-multiply"
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

export default function BeyondGenericAlertsCaseStudy() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#F2F2F2]">
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom_right,rgba(255,255,255,0.72)_0%,rgba(255,255,255,0.28)_32%,rgba(255,255,255,0.06)_52%,transparent_72%)]"
        aria-hidden
      />
      <GrainOverlay />

      <header className="fixed left-0 right-0 top-0 z-30 flex items-center justify-between px-[48px] pb-4 pt-[48px]">
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
        <div className="px-6 pb-16 pt-32 sm:px-8 md:pt-36 lg:ml-[12%] lg:pr-[8%] xl:pr-[12%]">
          <div className="max-w-none text-left">
            <h1
              className={`${instrument} max-w-[56rem] text-[clamp(2rem,6vw,4.5rem)] font-normal leading-[1.1] tracking-[-0.02em] text-neutral-950`}
            >
              Beyond Generic Alerts: Boosting Tenant Subscriptions in Offline
              Communities
            </h1>

            <div className="mt-10 flex flex-wrap gap-2 lg:mt-12">
              <span className="rounded-md border border-neutral-200/90 bg-white/95 px-2.5 py-1 font-sans text-[11px] font-medium uppercase tracking-wide text-neutral-800 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                AI
              </span>
              <span className="rounded-md border border-neutral-200/90 bg-white/95 px-2.5 py-1 font-sans text-[11px] font-medium uppercase tracking-wide text-neutral-800 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                Growth &amp; Retention
              </span>
            </div>

            <div className="mt-10 lg:mt-14">
              <p
                className={`${instrumentSans} max-w-[800px] text-left text-[18px] font-normal leading-[1.6] text-black md:text-[20px]`}
              >
                At Arlo, we noticed users were drowning in generic alerts from their
                security cameras. Our hypothesis? Context is king. By adding
                AI-powered captions (e.g., &ldquo;Package delivered&rdquo; or
                &ldquo;Person at front door&rdquo;), we aimed to make security feeds
                smarter, faster, and more valuable while driving Premium subscription
                growth. This case study outlines how we applied design strategy, UX
                thinking, and AI technology together to deliver smarter, more
                contextual alerts that drive engagement - without adding noise.
              </p>
              <p
                className={`${instrumentSans} mt-6 max-w-[800px] text-left text-[18px] font-normal leading-[1.6] text-black md:text-[20px]`}
              >
                As the lead UX designer on Arlo&rsquo;s AI Event Caption project, I
                worked remotely with a stellar cross-functional team to turn generic
                security alerts into clear, contextual insights. Partnering with Product
                Managers and User Researchers, we aligned business goals with user
                needs and validated our hypothesis through diary studies. AI/ML and
                Backend Engineers built the real-time captioning system, while QA
                ensured accuracy and reliability. Through weekly syncs and Figma
                collaboration, we launched smart alerts like &ldquo;Package
                delivered&rdquo; that boosted engagement and supported Premium growth,
                all with a simple, human-centered experience.
              </p>
            </div>

            <div className="mt-12 flex w-full max-w-xl flex-col gap-3 sm:mt-14 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-stretch sm:gap-4 lg:mt-16">
              <CaseStudyJumpToFinalButton />
              <a
                href="mailto:tianshendesign@gmail.com"
                className="inline-flex w-full min-w-0 items-center justify-center rounded-full border-[1px] border-solid border-[#999999] bg-transparent px-7 py-3.5 font-sans text-sm font-medium text-black transition-colors duration-200 ease-out hover:bg-black/[0.03] active:scale-[0.98] sm:w-auto md:text-[0.9375rem]"
              >
                Contact me
              </a>
            </div>
          </div>

          <section
            aria-labelledby="project-overview-heading"
            className="mt-[80px] w-full max-w-none text-left"
          >
            <h2 id="project-overview-heading" className="sr-only">
              Project Overview
            </h2>
            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8 xl:gap-x-10">
              <div>
                <h3 className={overviewHeadingClass}>My Team</h3>
                <p
                  className={`${instrumentSans} mt-4 text-[18px] font-normal leading-[1.6] text-black`}
                >
                  2 Mid-Level Designers, 2 Product Managers, 2 User Researchers, 2
                  AI/ML Engineers, 3 Backend Engineers, 1 QA Engineer.
                </p>
              </div>
              <div>
                <h3 className={overviewHeadingClass}>My Role</h3>
                <p
                  className={`${instrumentSans} mt-4 text-[18px] font-normal leading-[1.6] text-black`}
                >
                  Lead Product Designer (end-to-end ownership).
                </p>
              </div>
              <div>
                <h3 className={overviewHeadingClass}>Responsibilities</h3>
                <ul
                  className={`${instrumentSans} mt-4 list-disc space-y-2 pl-5 text-[18px] font-normal leading-[1.6] text-black`}
                >
                  <li>
                    UX strategy and design execution (discovery → final handoff)
                  </li>
                  <li>Prototyping, usability testing, and design iteration</li>
                  <li>Aligning features with user needs and business goals</li>
                  <li>Optimizing for a frictionless in-app experience</li>
                </ul>
              </div>
              <div>
                <h3 className={overviewHeadingClass}>Timeline</h3>
                <p
                  className={`${instrumentSans} mt-4 text-[18px] font-normal leading-[1.6] text-black`}
                >
                  Feb - Jun 2025.
                </p>
              </div>
            </div>
          </section>

          <section
            id="the-problem"
            className="mt-[80px] w-full max-w-none scroll-mt-24 text-left"
          >
            <h2 className={sectionHeadingLargeClass}>The Problem</h2>
            <p className={`${narrativeBodyClass} mt-8 max-w-[800px]`}>
              Arlo users receive dozens of camera notifications per day&mdash;70% of
              these alerts lack context, leaving users confused about whether they
              require immediate attention. As device adoption grows and expectations
              for smart home security rise, users increasingly struggle to quickly
              assess what&rsquo;s happening in their environment. This leads to
              fatigue, slower response times, and underutilization of subscription
              features.
            </p>
          </section>

          <section
            id="what-i-accomplished"
            className="mt-[80px] w-full max-w-none scroll-mt-24 text-left"
          >
            <h2 className={sectionHeadingLargeClass}>What I Accomplished</h2>
            <ul
              className={`${instrumentSans} mt-8 max-w-[800px] list-disc space-y-4 pl-6 text-[20px] font-normal leading-[1.6] text-black`}
            >
              <li>
                Designed an AI-powered video captioning system integrated into the
                Arlo app, summarizing key events captured by video-enabled devices.
              </li>
              <li>
                Integrates with notifications, feeds, and search (without exposing
                sensitive data).
              </li>
              <li>
                Led usability testing and iterated based on real user feedback to
                optimize discoverability, comprehension, and trust in the captions.
              </li>
              <li>
                Collaborated with AI/ML Engineers to ensure the captions were clear,
                relevant, and action-oriented.
              </li>
            </ul>
          </section>

          <section
            id="hero-mockups"
            className="mx-auto mt-[80px] max-w-5xl"
            aria-label="Hero device mockups"
          >
            <div className="relative overflow-hidden rounded-3xl bg-neutral-900 shadow-[0_24px_64px_-18px_rgba(0,0,0,0.22)] ring-1 ring-black/5">
              <div className="relative aspect-[16/10] w-full md:aspect-[2/1]">
                <Image
                  src={HERO_MOCKUPS_IMG}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 1152px"
                  priority
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.35)_0%,transparent_50%)]"
                  aria-hidden
                />
              </div>
            </div>
          </section>

          <section
            id="impact"
            className="mt-[80px] w-full max-w-none scroll-mt-24 text-left"
          >
            <h2 className={sectionHeadingLargeClass}>Impact</h2>
            <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8 xl:gap-10">
              <div>
                <p className={impactStatClass}>22%</p>
                <p className={`${narrativeBodyClass} mt-4`}>
                  +22% Premium subscriptions in Q3 - beating our goal by 7%.
                </p>
              </div>
              <div>
                <p className={impactStatClass}>35%</p>
                <p className={`${narrativeBodyClass} mt-4`}>
                  35% more engagement with captioned alerts vs. standard motion
                  alerts.
                </p>
              </div>
              <div>
                <p className={impactStatClass}>35%</p>
                <p className={`${narrativeBodyClass} mt-4`}>
                  NPS increased by 35% - users loved the clarity.
                </p>
              </div>
            </div>
          </section>

          <section
            id="discovery"
            className="mt-[80px] w-full max-w-none scroll-mt-24 text-left"
          >
            <div className="flex flex-wrap items-baseline gap-3 md:gap-4">
              <DiamondStepMarker step="01" className="translate-y-0.5" />
              <h2 className={sectionHeadingLargeClass}>Discovery</h2>
            </div>
            <p className={`${subtitleClass} mt-8 max-w-[800px]`}>
              It&rsquo;s been a while...
            </p>
            <p className={`${narrativeBodyClass} mt-6 max-w-[800px]`}>
              We began with internal hypothesis framing and user research. Feedback
              from Premium subscribers showed that users often ignored event thumbnails
              because they &ldquo;all looked the same.&rdquo; They wanted faster ways
              to know what triggered an alert&mdash;whether it was a person, vehicle,
              or just a tree branch. We also analyzed customer support tickets and app
              analytics, which revealed: High churn among users who felt overwhelmed by
              too many irrelevant alerts.
            </p>
          </section>

          <section
            id="definition"
            className="mt-[80px] w-full max-w-none scroll-mt-24 text-left"
          >
            <div className="flex flex-wrap items-baseline gap-3 md:gap-4">
              <DiamondStepMarker step="02" className="translate-y-0.5" />
              <h2 className={sectionHeadingLargeClass}>Definition</h2>
            </div>
            <p className={`${subtitleClass} mt-8 max-w-[800px]`}>
              Defining the North Star
            </p>
            <p className={`${narrativeBodyClass} mt-6 max-w-[800px]`}>
              Based on our findings, we defined a clear objective: Transform standard
              camera alerts into high-value, actionable intelligence that justifies a
              Premium subscription. We identified three primary goals to guide our
              design iterations:
            </p>
            <ul className={`${definitionListClass} mt-6`}>
              <li>
                <span className="font-semibold">Context First:</span> Ensure the most
                important information (Who/What/Where) is visible at a glance without
                opening the app.
              </li>
              <li>
                <span className="font-semibold">Build Trust:</span> Design for AI
                accuracy by using clear, non-robotic language and providing easy ways
                for users to give feedback if a caption is wrong.
              </li>
              <li>
                <span className="font-semibold">Frictionless Upsell:</span> Naturally
                demonstrate the value of captions to non-premium users within the
                existing notification flow to drive conversion.
              </li>
            </ul>
          </section>

          <section
            id="user-research"
            className="mt-[80px] w-full max-w-none scroll-mt-24 text-left"
          >
            <div className="flex flex-wrap items-baseline gap-3 md:gap-4">
              <DiamondStepMarker step="03" className="translate-y-0.5" />
              <h2 className={sectionHeadingLargeClass}>User Research</h2>
            </div>
            <p className={`${subtitleClass} mt-8 max-w-[800px]`}>
              Understanding the &ldquo;Why&rdquo;
            </p>
            <p className={`${narrativeBodyClass} mt-6 max-w-[800px]`}>
              We conducted 1:1 interviews with 15 Arlo users&mdash;ranging from
              tech-savvy early adopters to busy parents&mdash;to identify the biggest
              pain points in their daily security monitoring.
            </p>

            <div
              id="target-audience"
              className="mt-10 grid max-w-5xl grid-cols-1 gap-6 text-left md:mt-12 md:grid-cols-2 md:gap-8"
            >
              <article className="rounded-[24px] bg-[#FFFFFF] p-6 shadow-sm sm:p-7">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                  <div className="relative mx-auto h-20 w-20 shrink-0 overflow-hidden rounded-full ring-1 ring-black/[0.08] sm:mx-0">
                    <Image
                      src={PERSONA_SARAH_IMG}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <p
                      className={`${instrument} text-xl font-bold leading-snug text-black md:text-[1.375rem]`}
                    >
                      Sarah, 34
                    </p>
                    <p className={`${instrumentSans} mt-4 text-[20px] font-normal leading-[1.6] text-black`}>
                      Juggling work and childcare, Sarah needs to know instantly if a
                      package arrived or if her toddler is near the pool.
                    </p>
                    <p className={`${instrumentSans} mt-4 text-[20px] font-normal leading-[1.6] text-black`}>
                      <span className="font-semibold">Pain Point:</span> Overwhelmed by
                      generic alerts; misses important events.
                    </p>
                  </div>
                </div>
              </article>
              <article className="rounded-[24px] bg-[#FFFFFF] p-6 shadow-sm sm:p-7">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                  <div className="relative mx-auto h-20 w-20 shrink-0 overflow-hidden rounded-full ring-1 ring-black/[0.08] sm:mx-0">
                    <Image
                      src={PERSONA_MARK_IMG}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <p
                      className={`${instrument} text-xl font-bold leading-snug text-black md:text-[1.375rem]`}
                    >
                      Mark, 45
                    </p>
                    <p className={`${instrumentSans} mt-4 text-[20px] font-normal leading-[1.6] text-black`}>
                      A tech-forward homeowner who monitors multiple properties and
                      expects precise data.
                    </p>
                    <p className={`${instrumentSans} mt-4 text-[20px] font-normal leading-[1.6] text-black`}>
                      <span className="font-semibold">Pain Point:</span> Wants detailed
                      logs and quick searchability for specific types of motion.
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </section>

          <section
            id="user-pain-points"
            className="mt-[80px] w-full max-w-none scroll-mt-24 text-left"
          >
            <div className="flex flex-wrap items-baseline gap-3 md:gap-4">
              <DiamondStepMarker step="04" className="translate-y-0.5" />
              <h2 className={sectionHeadingLargeClass}>User Pain Points</h2>
            </div>

            <div className="mt-8 grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-12 md:gap-y-6">
              <div className="md:max-w-[20rem]">
                <p className={subtitleClass}>What we heard</p>
              </div>
              <div
                className={`${instrumentSans} text-[20px] font-normal leading-[1.6] text-[#000000]`}
              >
                <p>
                  Common themes emerged around the high cognitive load of managing
                  home security. Users expressed that while they felt safer with
                  cameras, the sheer volume of data was becoming unmanageable.
                </p>
              </div>
            </div>

            <blockquote
              className={`${instrument} mt-10 max-w-4xl text-4xl font-normal italic leading-[1.35] text-[#000000] md:mt-12 md:leading-[1.4]`}
            >
              &ldquo;I want to know it&rsquo;s important before I even pick up my
              phone. Right now, every alert feels like a &lsquo;cry wolf&rsquo;
              situation.&rdquo;
            </blockquote>

            <div className="mt-[64px] grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
              <article className="rounded-[24px] border border-black/[0.06] bg-[#FFFFFF] p-8 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                <p
                  className={`${instrumentSans} text-[18px] font-normal leading-[1.6] text-[#000000]`}
                >
                  &ldquo;I get so many notifications that I&rsquo;ve stopped checking
                  them altogether.&rdquo;
                </p>
              </article>
              <article className="rounded-[24px] border border-black/[0.06] bg-[#FFFFFF] p-8 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                <p
                  className={`${instrumentSans} text-[18px] font-normal leading-[1.6] text-[#000000]`}
                >
                  &ldquo;I wish I could just see a summary of what happened instead of
                  watching every clip.&rdquo;
                </p>
              </article>
              <article className="rounded-[24px] border border-black/[0.06] bg-[#FFFFFF] p-8 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                <p
                  className={`${instrumentSans} text-[18px] font-normal leading-[1.6] text-[#000000]`}
                >
                  &ldquo;It&rsquo;s hard to tell which alerts are important and which
                  ones are just the wind.&rdquo;
                </p>
              </article>
            </div>
          </section>

          <section
            id="gain-confidence"
            className="mt-[80px] w-full max-w-none scroll-mt-24 text-left"
          >
            <div className="flex flex-wrap items-baseline gap-3 md:gap-4">
              <DiamondStepMarker step="05" className="translate-y-0.5" />
              <h2 className={sectionHeadingLargeClass}>Gain Confidence</h2>
            </div>
            <p className={`${subtitleClass} mt-8 max-w-[800px]`}>
              Feature Prioritization
            </p>
            <p className={`${narrativeBodyClass} mt-6 max-w-[800px]`}>
              To gain alignment with stakeholders, I facilitated a design sprint with
              Product and Engineering. We mapped out possible AI use cases and ranked
              them by:
            </p>
            <ul className={`${definitionListClass} mt-6`}>
              <li>Feasibility (ML readiness)</li>
              <li>User value (based on surveys and interviews)</li>
              <li>Business impact (subscription growth and retention)</li>
            </ul>
            <p className={`${narrativeBodyClass} mt-6 max-w-[800px]`}>
              Captions emerged as a clear foundational feature&mdash;enabling smarter
              notifications, video search, and future threat detection capabilities.
              We aligned on launching captions for Premium plan users first to drive
              growth and validate user appetite. We focused on:
            </p>
            <ul className={`${definitionListClass} mt-6`}>
              <li>Short captions (under 5 words) for quick scanning.</li>
              <li>Medium captions (1&ndash;2 sentences) for more detail.</li>
              <li>Long captions (hidden) for future searchability.</li>
              <li>User consent &amp; control (opt-in per camera).</li>
            </ul>

            <div className="mt-10 grid max-w-5xl grid-cols-1 gap-8 md:mt-12 md:grid-cols-2 md:gap-x-12 md:gap-y-6">
              <div className="md:max-w-[20rem]">
                <p className={subtitleClass}>Building Trust</p>
              </div>
              <div
                className={`${instrumentSans} text-[20px] font-normal leading-[1.6] text-[#000000]`}
              >
                <p>
                  We recognized that for AI-powered captions to be effective, users
                  needed to trust the information provided. We focused on three key
                  areas to ensure the system felt reliable and transparent:
                </p>
              </div>
            </div>

            <div className="mt-10 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 md:mt-12">
              <article className="rounded-[24px] border border-black/[0.06] bg-[#FFFFFF] p-8 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                <p
                  className={`${instrumentSans} text-[18px] font-normal leading-[1.65] text-[#000000]`}
                >
                  <span className="font-semibold">Contextual Clarity:</span> Provide
                  clear, human-readable summaries that answer the &lsquo;Who, What,
                  Where&rsquo; immediately.
                </p>
              </article>
              <article className="rounded-[24px] border border-black/[0.06] bg-[#FFFFFF] p-8 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                <p
                  className={`${instrumentSans} text-[18px] font-normal leading-[1.65] text-[#000000]`}
                >
                  <span className="font-semibold">Feedback Loop:</span> Design
                  easy-to-use &lsquo;Is this correct?&rsquo; prompts to allow users to
                  refine the AI, giving them a sense of control.
                </p>
              </article>
              <article className="rounded-[24px] border border-black/[0.06] bg-[#FFFFFF] p-8 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                <p
                  className={`${instrumentSans} text-[18px] font-normal leading-[1.65] text-[#000000]`}
                >
                  <span className="font-semibold">Accuracy Indicators:</span> Use
                  subtle visual cues to indicate the AI&rsquo;s confidence level,
                  preventing &lsquo;false alarm&rsquo; fatigue.
                </p>
              </article>
            </div>
          </section>

          <section
            id="explorations"
            className="mt-[80px] w-full max-w-none scroll-mt-24 text-left"
          >
            <h2 className={sectionHeadingLargeClass}>Explorations</h2>

            <div className="mt-8 max-w-[800px]">
              <p className={narrativeBodyClass}>I explored multiple UX directions:</p>
              <ul className={`${definitionListClass} mt-6`}>
                <li>
                  Minimalist caption overlays on thumbnails vs. text blocks beneath
                </li>
                <li>Device-level vs. location-level feed integration</li>
                <li>Iconography and visual cues to indicate AI confidence</li>
                <li>
                  Accessibility-focused designs (e.g., screen reader compatibility
                  and font contrast)
                </li>
              </ul>
            </div>

            <div className="mt-10 max-w-[800px] md:mt-12">
              <p className={narrativeBodyClass}>
                Through multiple design reviews and iterative testing, we converged on
                a solution that was:
              </p>
              <ul className={`${definitionListClass} mt-6`}>
                <li>Non-intrusive, yet visible enough to catch attention</li>
                <li>Scalable to multi-device scenarios</li>
                <li>
                  Compatible with Arlo&rsquo;s latest app visual language and
                  components
                </li>
              </ul>
            </div>
          </section>

          <section
            id="ideation-alpha-testing"
            className="mt-[80px] w-full max-w-none scroll-mt-24 text-left"
          >
            <h2 className={sectionHeadingLargeClass}>
              Ideation &amp; Alpha Testing
            </h2>
            <p className={`${narrativeBodyClass} mt-8 max-w-[800px]`}>
              We conducted alpha testing with Arlo employees and a small cohort of
              existing users. Every time new features were designed and implemented, we
              announced updates in the Slack channel to keep participants informed.
              After each round of feature testing, we distributed surveys to gather
              immediate feedback for future improvements.
            </p>
          </section>

          <section
            id="final-outcomes"
            className="mt-[80px] w-full max-w-none scroll-mt-24 text-left"
          >
            <div className="flex flex-wrap items-baseline gap-3 md:gap-4">
              <DiamondStepMarker step="06" className="translate-y-0.5" />
              <h2 className={sectionHeadingLargeClass}>Final Outcomes</h2>
            </div>

            <div className="mt-8 max-w-[800px]">
              <p className={subtitleClass}>Designs &amp; Prototypes</p>
              <p className={`${narrativeBodyClass} mt-6`}>
                In addition to delivering the final visual design, I created
                interactive prototypes for both iOS and tablet screens. These
                prototypes demonstrated how the interactions would look and feel,
                serving as a key reference for engineers to ensure accurate
                implementation of the design and motion details.
              </p>
            </div>

            <div className="mt-8 max-w-[800px]">
              <p className={subtitleClass}>Education for First Time User</p>
              <p className={`${narrativeBodyClass} mt-6`}>
                The final product brought together several important elements,
                including a guided experience for first-time users. This onboarding
                flow introduced the new AI event captions feature in a clear and
                approachable way, helping users quickly understand how it works while
                reducing confusion and improving the overall experience.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
