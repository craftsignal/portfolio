const ROWS = [
  { role: "Senior Product Designer", company: "Any Technology", period: "2021 – Present" },
  { role: "Product Designer", company: "Figma", period: "2019 – 2021" },
  { role: "Product Designer", company: "Morgan Stanley", period: "2017 – 2019" },
  { role: "UX Designer", company: "Alipay", period: "2015 – 2017" },
] as const;

export default function ExperienceSection() {
  return (
    <section
      className="relative border-t border-black/[0.06] bg-[#f2f2f2] px-5 py-20 sm:px-8 sm:py-24 md:px-10 md:py-28"
      aria-labelledby="experience-heading"
    >
      <div className="mx-auto max-w-4xl">
        <p
          id="experience-heading"
          className="text-center font-[family-name:var(--font-instrument-sans),sans-serif] text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500"
        >
          Experience
        </p>
        <div className="mt-12 divide-y divide-black/[0.08] border-y border-black/[0.08]">
          {ROWS.map((row) => (
            <div
              key={`${row.company}-${row.period}`}
              className="grid grid-cols-1 gap-3 py-5 font-[family-name:var(--font-instrument-sans),sans-serif] text-sm text-neutral-800 sm:grid-cols-[1fr_1fr_auto] sm:items-center sm:gap-6 sm:py-6 md:text-base"
            >
              <span className="font-medium">{row.role}</span>
              <span className="text-neutral-600 sm:text-neutral-800">{row.company}</span>
              <span className="text-neutral-500 tabular-nums sm:text-right">{row.period}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
