"use client";

import Image from "next/image";
import Link from "next/link";

import ParallaxCaseStudyCard from "./ParallaxCaseStudyCard";
import SpotlightCard from "./SpotlightCard";

export type CaseStudy = {
  title: string;
  tags: string[];
  img: string;
  launched?: boolean;
  href?: string;
  parallaxCover?: boolean;
  coverTitle?: string;
  coverDescription?: string;
};

const CASES: CaseStudy[] = [
  {
    title:
      "Project Genesis: Teaching Arlo's First AI to Actually Listen",
    tags: ["AI", "Mobile", "Product Design", "Customer Experience"],
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80",
    launched: true,
    href: "/case-studies/project-genesis/",
  },
  {
    title:
      "Beyond Generic Alerts: Boosting Tenant Subscriptions in Offline Communities",
    tags: ["AI", "Growth Strategy"],
    img: "/case-studies-ai-event-captions.png",
    launched: true,
    href: "/case-studies/beyond-generic-alerts",
    parallaxCover: true,
    coverTitle: "AI Event Captions",
    coverDescription:
      "Education flows for first-time users—Event Captions, searchable feed, and in-app enablement—so people understand AI descriptions at a glance.",
  },
  {
    title: "Enhancing Support to Reduce Returns and Churn",
    tags: ["Mobile", "Design System"],
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1600&q=80",
    launched: true,
    href: "/case-studies/enhancing-support-reduce-returns-churn",
  },
  {
    title: "Elevating proactive safety for 5 million users",
    tags: ["Mobile", "Growth Strategy"],
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Reimagining Arlo Safe's History View Experience",
    tags: ["Web", "Design Leadership"],
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
    launched: true,
  },
];

function CaseStudyCard({ item, priority }: { item: CaseStudy; priority?: boolean }) {
  const inner = (
    <>
      <SpotlightCard className="relative mb-5 h-[420px] overflow-hidden rounded-3xl bg-neutral-200/80 sm:mb-6 sm:h-[460px] md:h-[480px]">
        {item.launched ? (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-white px-3 py-1 text-xs font-medium text-neutral-800 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
            Launched
          </span>
        ) : null}
        <Image
          src={item.img}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 896px"
          className="object-cover transition-transform duration-[280ms] ease-out group-hover:scale-105"
          priority={priority}
        />
      </SpotlightCard>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-8 md:gap-10">
        <h2 className="min-w-0 flex-1 text-lg font-medium leading-snug tracking-tight text-neutral-800 md:text-xl">
          {item.title}
        </h2>
        <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end md:flex-nowrap">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="whitespace-nowrap rounded-md bg-[rgba(0,0,0,0.06)] px-2.5 py-1 text-[12px] font-normal leading-none text-neutral-600 transition-opacity duration-200 ease-out group-hover:opacity-[0.82] hover:opacity-100"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </>
  );

  if (item.href) {
    return (
      <Link
        href={item.href}
        className="group block cursor-pointer transition-transform duration-300 ease-out hover:-translate-y-1"
      >
        <article>{inner}</article>
      </Link>
    );
  }

  return (
    <article className="group cursor-pointer transition-transform duration-300 ease-out hover:-translate-y-1">
      {inner}
    </article>
  );
}

export default function CaseStudies() {
  return (
    <section
      className="bg-[#f5f5f5] px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-28 lg:py-32"
      aria-label="Case studies"
    >
      <div className="mx-auto max-w-5xl space-y-20 md:space-y-24 lg:space-y-28">
        {CASES.map((item, index) =>
          item.parallaxCover ? (
            <ParallaxCaseStudyCard
              key={item.title}
              item={item}
              priority={index === 0}
            />
          ) : (
            <CaseStudyCard key={item.title} item={item} priority={index === 0} />
          ),
        )}
      </div>
    </section>
  );
}
