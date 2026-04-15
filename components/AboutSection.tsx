const TAGS = [
  "Product Design",
  "UI/UX",
  "System",
  "Strategy",
  "Prototyping",
  "Research",
] as const;

export default function AboutSection() {
  return (
    <section
      className="relative border-t border-black/[0.06] bg-[#f2f2f2] px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-28"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p
          id="about-heading"
          className="font-[family-name:var(--font-instrument-sans),sans-serif] text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500"
        >
          About
        </p>
        <p className="mt-8 font-[family-name:var(--font-instrument-serif),ui-serif,Georgia,serif] text-xl font-normal leading-relaxed text-neutral-800 sm:text-2xl md:text-[1.65rem] md:leading-relaxed">
          I believe in systemic design thinking—connecting research, systems, and
          craft so digital products stay coherent as they scale. My work sits at
          the intersection of product strategy and hands-on execution.
        </p>
        <ul className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:mt-12 sm:gap-2.5">
          {TAGS.map((tag) => (
            <li key={tag}>
              <span className="inline-flex rounded-full border border-black/[0.08] bg-white px-4 py-2 font-[family-name:var(--font-instrument-sans),sans-serif] text-sm font-medium text-neutral-800 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                {tag}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
