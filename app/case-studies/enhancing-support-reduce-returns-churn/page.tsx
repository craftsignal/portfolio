import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import CaseStudyJumpToFinalButton from "@/components/CaseStudyJumpToFinalButton";
import CaseStudyReadNextConnect from "@/components/CaseStudyReadNextConnect";

export const metadata: Metadata = {
  title: "Enhancing Support to Reduce Returns and Churn",
  description:
    "Redesigning in-app support after a major app migration—entry point audit, phone flow, and measurable reductions in tickets and churn.",
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

const resultsListClass = `${instrumentSans} mt-6 list-outside list-disc space-y-4 pl-5 text-[18px] font-normal leading-[1.65] text-black md:text-[20px]`;

const HERO_IMG =
  "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=2000&q=85";

const ENTRY_AUDIT_PLACEHOLDER =
  "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1800&q=80";

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

function ChatBubbleHero({
  className = "h-14 w-14",
  iconClassName = "h-7 w-7",
}: {
  className?: string;
  iconClassName?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-full bg-sky-100 ${className}`}
      aria-hidden
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className={`text-sky-700 ${iconClassName}`}
      >
        <path
          d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8L3 20l1.2-3.6A8.97 8.97 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function PhoneFrame({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center">
      <span
        className={`${instrumentSans} mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500`}
      >
        {label}
      </span>
      <div className="relative w-full max-w-[220px] overflow-hidden rounded-[2rem] border border-neutral-200 bg-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.18)] ring-1 ring-black/[0.04]">
        <div className="flex h-7 items-center justify-center gap-1.5 border-b border-neutral-100 bg-neutral-50 pt-1">
          <span className="h-1 w-8 rounded-full bg-neutral-200" />
        </div>
        <div className="max-h-[min(420px,58vh)] overflow-y-auto px-3.5 pb-5 pt-3 text-left sm:max-h-[440px]">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function EnhancingSupportCaseStudyPage() {
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
          className="relative flex min-h-[min(88vh,920px)] flex-col justify-end px-6 pb-16 pt-32 sm:px-10 sm:pb-20 sm:pt-36 md:justify-center md:px-[48px] md:pb-24 md:pt-40"
          aria-label="Case study introduction"
        >
          <div className="pointer-events-none absolute inset-0 md:block">
            <div className="absolute inset-y-0 right-0 hidden w-[min(52%,640px)] lg:block">
              <div className="relative h-full min-h-[420px] w-full opacity-[0.2] mix-blend-multiply grayscale sm:min-h-[480px] md:opacity-[0.26]">
                <Image
                  src={HERO_IMG}
                  alt=""
                  fill
                  className="object-cover object-[center_30%]"
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
            <h1
              className={`${instrument} text-left text-[clamp(2rem,6vw,4.25rem)] font-normal leading-[1.06] tracking-[-0.025em] text-neutral-950`}
            >
              Enhancing Support to Reduce Returns and Churn
            </h1>

            <div className="mt-8 flex flex-wrap gap-2 sm:mt-10">
              <span className="rounded-md border border-neutral-200/90 bg-white/95 px-2.5 py-1 font-sans text-[11px] font-medium uppercase tracking-wide text-neutral-800 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                Mobile
              </span>
              <span className="rounded-md border border-neutral-200/90 bg-white/95 px-2.5 py-1 font-sans text-[11px] font-medium uppercase tracking-wide text-neutral-800 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                Design System
              </span>
            </div>

            <div className="mt-10 max-w-2xl sm:mt-12">
              <p
                className={`${instrumentSans} text-left text-[17px] font-normal leading-[1.65] text-neutral-700 sm:text-[18px] md:text-[20px]`}
              >
                With a 30% return rate and user feedback highlighting major support
                issues, our project aimed to overhaul the customer support experience.
                By redesigning support, we sought to reduce returns and rebuild customer
                confidence. How can we transform support from a deal-breaker into a
                competitive advantage?
              </p>
            </div>

            <div className="mt-12 flex w-full max-w-xl flex-col gap-3 sm:mt-14 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-stretch sm:gap-4">
              <CaseStudyJumpToFinalButton targetId="final-design" />
              <a
                href="mailto:tianshendesign@gmail.com"
                className="inline-flex w-full min-w-0 items-center justify-center rounded-full border border-[#999999] bg-transparent px-7 py-3.5 font-sans text-sm font-medium text-neutral-950 transition-colors duration-200 ease-out hover:bg-black/[0.04] active:scale-[0.98] sm:w-auto md:text-[0.9375rem]"
              >
                Contact me
              </a>
            </div>
          </div>
        </section>

        {/* Hero exhibit: Support Center direction */}
        <div className="px-6 pb-4 sm:px-10 md:px-[48px]">
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-neutral-900 shadow-[0_24px_64px_-18px_rgba(0,0,0,0.22)] ring-1 ring-black/5">
            <span className="absolute left-4 top-4 z-10 rounded-full bg-white px-3 py-1 text-xs font-medium text-neutral-800 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
              Launched
            </span>
            <div className="relative aspect-[16/11] w-full md:aspect-[2/1]">
              <Image
                src={HERO_IMG}
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
                Support Center — unified search, issue tags, and clearer paths from
                product surfaces into help.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-6 pb-20 pt-16 sm:px-10 md:px-[48px] md:pb-24 md:pt-20">
          <section
            className="border-t border-neutral-200/90 pt-14 md:pt-16"
            aria-labelledby="overview-heading"
          >
            <h2 id="overview-heading" className="sr-only">
              Project overview
            </h2>
            <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8 xl:gap-x-10">
              <div>
                <h3 className={overviewHeadingClass}>My Team</h3>
                <p className={`${instrumentSans} mt-4 text-[17px] font-normal leading-[1.6] text-black md:text-[18px]`}>
                  3 Product Designers, Product Manager, iOS Developer, Android
                  Developer, Web Developer.
                </p>
              </div>
              <div>
                <h3 className={overviewHeadingClass}>My Role</h3>
                <p className={`${instrumentSans} mt-4 text-[17px] font-normal leading-[1.6] text-black md:text-[18px]`}>
                  Lead Product Designer.
                </p>
              </div>
              <div>
                <h3 className={overviewHeadingClass}>Responsibilities</h3>
                <p className={`${instrumentSans} mt-4 text-[17px] font-normal leading-[1.6] text-black md:text-[18px]`}>
                  Product Strategy, Stakeholder Presentations, Project Planning, UX
                  Research.
                </p>
              </div>
              <div>
                <h3 className={overviewHeadingClass}>Timeline</h3>
                <p className={`${instrumentSans} mt-4 text-[17px] font-normal leading-[1.6] text-black md:text-[18px]`}>
                  Nov – Feb 2025.
                </p>
              </div>
            </div>
          </section>

          <div className="mt-20 grid grid-cols-1 gap-y-14 lg:mt-24 lg:grid-cols-2 lg:items-start lg:gap-x-10 xl:gap-x-16">
            <section id="the-problem" className="min-w-0 scroll-mt-28">
              <h2 className={sectionHeadingLargeClass}>The Problem</h2>
              <p className={`${narrativeBodyClass} mt-6 lg:mt-8`}>
                After users migrated to the new app, we received numerous negative
                feedback regarding the support experience. The transition created
                significant challenges in locating customer service help, leading to
                frustration. Additionally, the product return rate is alarmingly high,
                with nearly 3 out of 10 users choosing to return their products after
                purchase, indicating a clear need for improvement in both the support
                experience and overall user satisfaction.
              </p>
            </section>

            <section id="what-i-accomplished" className="min-w-0 scroll-mt-28">
              <h2 className={sectionHeadingLargeClass}>What I Accomplished</h2>
              <ul className={accomplishmentListClass}>
                <li>
                  Led the redesign of the support experience, collaborating with
                  customer service, engineering, and product teams to align on a unified
                  vision.
                </li>
                <li>
                  Analyzed user feedback and return rates, presenting findings to
                  leadership to gain buy-in for key improvements.
                </li>
                <li>
                  Built team consensus by sharing user research and facilitating
                  workshops to prioritize support enhancements.
                </li>
                <li>
                  Mentored junior designers and writers to create user-friendly support
                  materials while ensuring design consistency.
                </li>
              </ul>
            </section>
          </div>

          {/* Understand */}
          <section
            id="understand"
            className="mt-20 scroll-mt-28 border-t border-neutral-200/90 pt-16 md:mt-24 md:pt-20"
            aria-labelledby="understand-heading"
          >
            <div className="flex flex-wrap items-baseline gap-3 md:gap-4">
              <DiamondStepMarker step="01" className="translate-y-0.5" />
              <h2 id="understand-heading" className={sectionHeadingLargeClass}>
                Understand
              </h2>
            </div>
            <p className={`${subtitleClass} mt-8 max-w-[800px]`}>
              What are we hearing?
            </p>
            <p className={`${narrativeBodyClass} mt-6 max-w-[800px]`}>
              To give you some context, we received numerous negative feedbacks about our
              support experience, particularly after users migrated to the new app. This
              transition made it very difficult for users to find customer service help.
              The product return rate is concerning—nearly three out of ten users chose to
              return their products after purchase.
            </p>

            <div className="mt-14 rounded-[24px] border border-black/[0.06] bg-white p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)] sm:p-8 md:mt-16">
              <h3
                className={`${instrument} text-[clamp(1.5rem,3vw,1.875rem)] font-normal leading-tight text-neutral-950`}
              >
                Bring a Smile to Our Users
              </h3>
              <p className={`${narrativeBodyClass} mt-5 max-w-[800px]`}>
                Our goal is to enhance our users&apos; experience and make users happy by
                providing more effective and user-friendly support solutions, ultimately
                aiming to reduce product returns and decrease customer churn.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <figure className="rounded-xl border border-neutral-100 bg-[#FAFAFA] p-4">
                  <p className="text-amber-500" aria-hidden>
                    ★☆☆☆☆
                  </p>
                  <p className={`${instrumentSans} mt-2 text-[14px] font-normal leading-relaxed text-neutral-800`}>
                    <span className="font-semibold text-neutral-900">Aashish B.</span>{" "}
                    (1 star): &ldquo;Support has been completely useless and technically
                    clueless every single time. This has been{" "}
                    <span className="font-medium text-rose-700/90">
                      one of the worst support experiences
                    </span>{" "}
                    I&apos;ve ever had.&rdquo;
                  </p>
                </figure>
                <figure className="rounded-xl border border-neutral-100 bg-[#FAFAFA] p-4">
                  <p className="text-amber-500" aria-hidden>
                    ★☆☆☆☆
                  </p>
                  <p className={`${instrumentSans} mt-2 text-[14px] font-normal leading-relaxed text-neutral-800`}>
                    <span className="font-semibold text-neutral-900">Kathleen R.</span>{" "}
                    (1 star): &ldquo;Do not invest in Arlo security cameras. You will{" "}
                    <span className="font-medium text-rose-700/90">
                      NEVER be able to contact a live person
                    </span>{" "}
                    in customer service.&rdquo;
                  </p>
                </figure>
                <figure className="rounded-xl border border-neutral-100 bg-[#FAFAFA] p-4 sm:col-span-2 lg:col-span-1">
                  <p className="text-amber-500" aria-hidden>
                    ★☆☆☆☆
                  </p>
                  <p className={`${instrumentSans} mt-2 text-[14px] font-normal leading-relaxed text-neutral-800`}>
                    <span className="font-semibold text-neutral-900">Alex M.</span>{" "}
                    (1 star): &ldquo;It&apos;s{" "}
                    <span className="font-medium text-rose-700/90">
                      impossible to reach anyone from customer service.
                    </span>{" "}
                    This is the worst company I have ever dealt with.&rdquo;
                  </p>
                </figure>
              </div>
            </div>

            <div className="mt-16 md:mt-20">
              <h3
                className={`${instrumentSans} text-[clamp(1.25rem,2.5vw,1.5rem)] font-bold leading-snug tracking-tight text-neutral-950`}
              >
                Entry Point Audit
              </h3>
              <p className={`${instrumentSans} mt-3 max-w-[800px] text-[17px] font-normal leading-[1.65] text-neutral-800 md:text-[18px]`}>
                Defined onboarding entry points for the Support Center across 30+ areas
                in the app.
              </p>
              <figure className="mt-8 overflow-hidden rounded-[24px] border border-black/[0.06] bg-white p-4 shadow-[0_12px_40px_-24px_rgba(0,0,0,0.15)] sm:p-6">
                <figcaption
                  className={`${instrument} mb-4 text-center text-lg font-normal text-neutral-900 sm:text-xl`}
                >
                  Entry Point Audit
                </figcaption>
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-neutral-100">
                  <Image
                    src={ENTRY_AUDIT_PLACEHOLDER}
                    alt="Spreadsheet matrix of onboarding entry points by product and issue, with MOT and RouteThis entry points"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width:1024px) 100vw, 1024px"
                  />
                </div>
                <p className={`${instrumentSans} mt-4 text-center text-[13px] text-neutral-500`}>
                  Onboarding entry points across hardware SKUs and flows (MOT vs.
                  RouteThis).
                </p>
              </figure>
            </div>

            <div className="mt-14 md:mt-16">
              <h3
                className={`${instrument} text-[clamp(1.35rem,2.8vw,1.75rem)] font-normal italic text-neutral-900`}
              >
                Three support pillars
              </h3>
              <p className={`${narrativeBodyClass} mt-5 max-w-[800px]`}>
                Research showed users needed clear paths—not a single catch-all screen.
                We organized the experience around{" "}
                <strong className="font-semibold">live agent chat</strong>,{" "}
                <strong className="font-semibold">phone support</strong>, and{" "}
                <strong className="font-semibold">
                  knowledge base (KB) articles
                </strong>
                , so people could choose the channel that matched urgency and comfort.
              </p>
              <ul className="mt-8 grid gap-4 sm:grid-cols-3">
                <li className="rounded-2xl border border-neutral-200/90 bg-white/90 p-5 shadow-sm">
                  <p className={`${instrumentSans} text-[15px] font-bold text-neutral-950`}>
                    Live agent chat
                  </p>
                  <p className={`${instrumentSans} mt-2 text-[15px] leading-relaxed text-neutral-700`}>
                    Fast, asynchronous help when typing is easier than calling.
                  </p>
                </li>
                <li className="rounded-2xl border border-neutral-200/90 bg-white/90 p-5 shadow-sm">
                  <p className={`${instrumentSans} text-[15px] font-bold text-neutral-950`}>
                    Phone support
                  </p>
                  <p className={`${instrumentSans} mt-2 text-[15px] leading-relaxed text-neutral-700`}>
                    Human reassurance for complex setup, returns, and account issues.
                  </p>
                </li>
                <li className="rounded-2xl border border-neutral-200/90 bg-white/90 p-5 shadow-sm">
                  <p className={`${instrumentSans} text-[15px] font-bold text-neutral-950`}>
                    KB articles
                  </p>
                  <p className={`${instrumentSans} mt-2 text-[15px] leading-relaxed text-neutral-700`}>
                    Self-serve answers tied to the exact error or device they hit in flow.
                  </p>
                </li>
              </ul>
            </div>
          </section>

          {/* Final Outcomes */}
          <section
            id="final-design"
            className="mt-20 scroll-mt-28 border-t border-neutral-200/90 pt-16 md:mt-24 md:pt-20"
            aria-labelledby="final-outcomes-heading"
          >
            <div className="flex flex-wrap items-baseline gap-3 md:gap-4">
              <DiamondStepMarker step="03" className="translate-y-0.5" />
              <h2 id="final-outcomes-heading" className={sectionHeadingLargeClass}>
                Final Outcomes
              </h2>
            </div>
            <p className={`${subtitleClass} mt-8 max-w-[800px]`}>
              Designs &amp; Prototypes
            </p>

            <h3
              className={`${instrument} mt-14 text-[clamp(1.75rem,4vw,2.5rem)] font-normal leading-tight tracking-[-0.02em] text-neutral-950 md:mt-16`}
            >
              Research &amp; Findings
            </h3>
            <p className={`${narrativeBodyClass} mt-5 max-w-[800px]`}>
              The first part of our research focused on onboarding and user feedback
              about available support options. Previously, there were no support options,
              but we explored alternatives, identifying 3 main categories:{" "}
              <strong className="font-semibold">live agent chat</strong>,{" "}
              <strong className="font-semibold">support</strong>, and{" "}
              <strong className="font-semibold">
                knowledge base (KB) articles
              </strong>
              .
            </p>

            <div className="mt-10 rounded-[24px] border border-black/[0.06] bg-white p-6 shadow-sm sm:p-8 md:mt-12">
              <h4
                className={`${instrument} text-xl font-normal text-neutral-950 md:text-2xl`}
              >
                Research Finding Part 1
              </h4>
              <p className={`${instrumentSans} mt-3 text-[17px] text-neutral-700 md:text-[18px]`}>
                We learned that the support options we provided are effective!
              </p>
              <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-10">
                <PhoneFrame label="Before">
                  <p className={`${instrumentSans} text-center text-[11px] font-semibold uppercase tracking-wide text-neutral-500`}>
                    Support Center
                  </p>
                  <div className="mt-3 space-y-2 text-[12px] text-neutral-700">
                    <p className="rounded-lg bg-neutral-100 px-2 py-1.5 font-medium text-neutral-900">
                      Support Requests
                    </p>
                    <p className="rounded-lg border border-neutral-200 px-2 py-2 leading-snug">
                      Front Door Ultra — Internet connection
                    </p>
                    <p className="mt-3 rounded-lg bg-neutral-100 px-2 py-1.5 font-medium text-neutral-900">
                      Support for Your Products
                    </p>
                    <ul className="space-y-1 pl-1 text-[11px] leading-snug">
                      <li>Front Door Ultra</li>
                      <li>Home SmartHub</li>
                      <li>Subscription</li>
                    </ul>
                  </div>
                </PhoneFrame>
                <PhoneFrame label="After">
                  <p className={`${instrumentSans} text-center text-[11px] font-semibold uppercase tracking-wide text-neutral-500`}>
                    Support
                  </p>
                  <div className="mx-auto mt-4 flex justify-center">
                    <ChatBubbleHero />
                  </div>
                  <p
                    className={`${instrument} mt-3 text-center text-[15px] font-normal text-neutral-950`}
                  >
                    We are here to help.
                  </p>
                  <div className="mt-4 space-y-3 border-t border-neutral-100 pt-3 text-[11px] leading-snug text-neutral-700">
                    <div>
                      <p className="font-semibold text-neutral-900">
                        Support by Phone
                      </p>
                      <p className="mt-1">
                        Talk to an Arlo Expert. We&apos;ll give you a call to help sort
                        everything out.
                      </p>
                      <p className="mt-1.5 font-medium text-sky-700">
                        Call a Live Agent →
                      </p>
                    </div>
                    <div className="border-t border-neutral-100 pt-3">
                      <p className="font-semibold text-neutral-900">
                        Support by Chat
                      </p>
                      <p className="mt-1 font-medium text-sky-700">Start a Chat →</p>
                    </div>
                    <div className="border-t border-neutral-100 pt-3">
                      <p className="font-semibold text-neutral-900">
                        Self-Help Made Simple
                      </p>
                      <p className="mt-1 font-medium text-sky-700">
                        Visit the Support Article →
                      </p>
                    </div>
                  </div>
                </PhoneFrame>
              </div>
            </div>

            <h3
              className={`${instrumentSans} mt-16 text-[20px] font-bold italic text-black md:mt-20 md:text-[22px]`}
            >
              Support by Phone flow
            </h3>
            <p className={`${narrativeBodyClass} mt-4 max-w-[800px]`}>
              End-to-end screens for requesting a call, confirming the request, and
              surfacing helpful articles while users wait.
            </p>
            <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-6">
              <PhoneFrame label="1 · Support overview">
                <p className={`${instrumentSans} text-center text-[12px] font-semibold`}>
                  Support
                </p>
                <div className="mx-auto mt-3 flex justify-center">
                  <ChatBubbleHero
                    className="h-12 w-12"
                    iconClassName="h-6 w-6"
                  />
                </div>
                <p
                  className={`${instrument} mt-3 text-center text-[14px] text-neutral-950`}
                >
                  We are here to help.
                </p>
                <div className="mt-4 space-y-2.5 text-[10px] leading-snug">
                  <div className="rounded-lg border border-neutral-100 bg-neutral-50/80 p-2">
                    <p className="font-semibold text-neutral-900">Support by Phone</p>
                    <p className="mt-0.5 text-neutral-600">
                      Talk to an Arlo Expert. We&apos;ll give you a call…
                    </p>
                    <p className="mt-1 text-sky-700">Call a Live Agent</p>
                  </div>
                  <div className="rounded-lg border border-neutral-100 p-2">
                    <p className="font-semibold">Support by Chat</p>
                    <p className="mt-1 text-sky-700">Start a Chat</p>
                  </div>
                  <div className="rounded-lg border border-neutral-100 p-2">
                    <p className="font-semibold">Self-Help Made Simple</p>
                    <p className="mt-1 text-sky-700">Visit the Support Article</p>
                  </div>
                </div>
              </PhoneFrame>
              <PhoneFrame label="2 · Request call">
                <p className={`${instrumentSans} text-center text-[12px] font-semibold`}>
                  Support by Phone
                </p>
                <p
                  className={`${instrument} mt-4 text-[14px] leading-snug text-neutral-950`}
                >
                  Talk with our next available agent.
                </p>
                <p className={`${instrumentSans} mt-2 text-[10px] text-neutral-600`}>
                  Enter your phone number, and our support agent will be with you
                  shortly.
                </p>
                <div className="mt-3 space-y-2 rounded-lg border border-neutral-200 p-2 text-[10px]">
                  <p className="text-neutral-500">Country</p>
                  <p className="font-medium">🇺🇸 +1</p>
                  <p className="text-neutral-500">Phone Number</p>
                  <p className="font-mono text-xs">612-555-1234</p>
                  <label className="flex items-start gap-2 pt-1">
                    <span className="mt-0.5 inline-flex h-3 w-3 shrink-0 rounded border border-sky-600 bg-sky-600" />
                    <span>
                      Save this phone number to your account information.
                    </span>
                  </label>
                  <p className="pt-1 text-[9px] text-neutral-500">
                    Estimated Wait Time: 2 Minutes
                  </p>
                </div>
                <p className="mt-3 rounded-full bg-sky-900 py-2 text-center text-[10px] font-semibold text-white">
                  Request Call
                </p>
              </PhoneFrame>
              <PhoneFrame label="3 · Confirmation">
                <p className={`${instrumentSans} text-center text-[12px] font-semibold`}>
                  Support by Phone
                </p>
                <div className="mx-auto mt-4 flex h-11 w-11 items-center justify-center rounded-full bg-sky-600 text-white" aria-hidden>
                  ✓
                </div>
                <p
                  className={`${instrument} mt-3 text-center text-[13px] leading-snug text-neutral-950`}
                >
                  Your phone call request has been received.
                </p>
                <p className={`${instrumentSans} mt-2 text-center text-[10px] text-neutral-600`}>
                  Our support agent will be with you shortly.
                </p>
                <p className={`${instrumentSans} mt-3 text-[9px] text-neutral-500`}>
                  Estimated Wait Time: 2 Minutes
                </p>
                <div className="mt-4 rounded-lg border border-neutral-100 bg-neutral-50 p-2 text-[9px]">
                  <p className="font-semibold text-neutral-900">While You Wait</p>
                  <ul className="mt-2 space-y-1.5 text-neutral-700">
                    <li>The Camera failed to connect error appears… ↗</li>
                    <li>How do I mount my Arlo Essential Outdoor Camera… ↗</li>
                  </ul>
                  <p className="mt-2 text-sky-700">Browse Support Articles</p>
                </div>
                <p className="mt-3 rounded-full bg-sky-900 py-2 text-center text-[10px] font-semibold text-white">
                  Continue While Waiting
                </p>
                <p className="mt-2 text-center text-[10px] font-medium text-rose-600">
                  Cancel Request
                </p>
              </PhoneFrame>
            </div>
          </section>

          {/* Results */}
          <section
            id="results"
            className="mt-20 scroll-mt-28 border-t border-neutral-200/90 pt-16 md:mt-24 md:pt-20"
            aria-labelledby="results-heading"
          >
            <div className="flex flex-wrap items-baseline gap-3 md:gap-4">
              <DiamondStepMarker step="04" className="translate-y-0.5" />
              <h2 id="results-heading" className={sectionHeadingLargeClass}>
                Results
              </h2>
            </div>
            <p className={`${subtitleClass} mt-8 max-w-[800px]`}>
              We knocked it out of the park on all levels!
            </p>
            <ul className={resultsListClass}>
              <li>
                <strong className="font-semibold">Successful redesign</strong> – Improved
                app layout and user flow, enhancing usability for both iOS and Android
                users.
              </li>
              <li>
                <strong className="font-semibold">Improved usability</strong> –
                Streamlined key user paths, reducing friction and making the app more
                intuitive, which led to a{" "}
                <strong className="font-semibold">
                  25% decrease in customer support ticket volume
                </strong>
                .
              </li>
              <li>
                <strong className="font-semibold">Addressed user needs</strong> –
                Delivered top-requested features based on user feedback, directly
                addressing pain points and{" "}
                <strong className="font-semibold">
                  increasing user interaction with key app features by 40%
                </strong>
                .
              </li>
              <li>
                <strong className="font-semibold">Cross-platform consistency</strong> –
                Ensured a consistent user experience across iOS and Android with
                validated UX across both platforms.
              </li>
              <li>
                <strong className="font-semibold">Design system created</strong> –
                Developed a robust design system, streamlining future updates and
                ensuring design consistency.
              </li>
            </ul>
          </section>
        </div>

        <CaseStudyReadNextConnect />
      </main>
    </div>
  );
}
