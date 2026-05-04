"use client";

import Link from "next/link";

import SpotlightCard from "./SpotlightCard";
import type { CaseStudy } from "./CaseStudies";

type HtmlCoverCaseStudyCardProps = {
  item: CaseStudy;
  priority?: boolean;
};

export default function HtmlCoverCaseStudyCard({
  item,
  priority,
}: HtmlCoverCaseStudyCardProps) {
  const darkSrc = item.htmlCoverDark!;
  const lightSrc = item.htmlCoverLight!;

  const inner = (
    <>
      <SpotlightCard className="relative mb-5 h-[420px] overflow-hidden rounded-[32px] bg-neutral-200/80 sm:mb-6 sm:h-[460px] md:h-[480px]">
        {item.launched ? (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-white px-3 py-1 text-xs font-medium text-neutral-800 shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
            Launched
          </span>
        ) : null}
        <div className="absolute inset-0">
          <iframe
            title=""
            src={lightSrc}
            scrolling="no"
            loading={priority ? "eager" : "lazy"}
            className="pointer-events-none absolute inset-0 z-[1] h-full w-full border-0 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
          />
          <iframe
            title=""
            src={darkSrc}
            scrolling="no"
            loading={priority ? "eager" : "lazy"}
            className="pointer-events-none absolute inset-0 z-[2] h-full w-full border-0 opacity-100 transition-opacity duration-500 ease-in-out group-hover:opacity-0"
          />
        </div>
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
