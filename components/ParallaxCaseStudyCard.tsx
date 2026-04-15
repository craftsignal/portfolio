"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import SpotlightCard from "./SpotlightCard";

const instrumentSans =
  "font-[family-name:var(--font-instrument-sans),sans-serif]";

const springConfig = { stiffness: 100, damping: 20 };

type ParallaxCaseStudyItem = {
  title: string;
  tags: string[];
  img: string;
  launched?: boolean;
  href?: string;
  coverTitle?: string;
  coverDescription?: string;
};

type ParallaxCaseStudyCardProps = {
  item: ParallaxCaseStudyItem;
  priority?: boolean;
};

export default function ParallaxCaseStudyCard({
  item,
  priority,
}: ParallaxCaseStudyCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const yRaw = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const y = useSpring(yRaw, springConfig);

  const href = item.href ?? "#";

  return (
    <div ref={containerRef} className="w-full">
      <Link href={href} className="group block cursor-pointer">
        <article>
          <SpotlightCard className="relative mb-5 h-[420px] overflow-hidden rounded-[32px] bg-[#F2F2F2] shadow-none transition-shadow duration-500 ease-out group-hover:shadow-2xl sm:mb-6 sm:h-[460px] md:h-[480px]">
            {item.launched ? (
              <span className="absolute left-4 top-4 z-20 rounded-full bg-white p-[12px] text-[14px] font-bold text-black">
                Launched
              </span>
            ) : null}

            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute left-1/2 top-1/2 h-[118%] w-[120%] max-w-none -translate-x-1/2 -translate-y-1/2 will-change-transform"
                style={{ y }}
              >
                <div className="relative h-full w-full origin-center transition-transform duration-[280ms] ease-out group-hover:scale-105">
                  <Image
                    src={item.img}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 120vw, 896px"
                    className="object-cover object-top"
                    priority={priority}
                  />
                </div>
              </motion.div>
            </div>
          </SpotlightCard>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-8 md:gap-10">
            <div className={`min-w-0 flex-1 ${instrumentSans}`}>
              <h2 className="text-xl font-semibold leading-snug tracking-tight text-black md:text-2xl">
                {item.coverTitle ?? item.title}
              </h2>
              {item.coverDescription ? (
                <p className="mt-2 max-w-2xl text-base font-normal leading-[1.6] text-neutral-700 md:text-[17px]">
                  {item.coverDescription}
                </p>
              ) : null}
            </div>
            <div className="flex shrink-0 flex-nowrap items-center gap-2 sm:justify-end">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="whitespace-nowrap rounded-md bg-[rgba(0,0,0,0.06)] px-2.5 py-1 text-[12px] font-normal leading-none text-neutral-600 transition-opacity duration-200 ease-out group-hover:opacity-[0.82]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
}
