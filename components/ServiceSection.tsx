import Check from "./Check";
import PlanCardView from "./PlanCardView";
import SectionMedia from "./SectionMedia";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import type { Section } from "@/lib/content";

interface Props {
  section: Section;
  /** Alternating background keeps adjacent sections distinguishable. */
  tone?: "white" | "mist";
  /** Grid columns at the large breakpoint. */
  columns?: 2 | 3 | 4;
}

const COLS: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 xl:grid-cols-4",
};

export default function ServiceSection({ section, tone = "white", columns = 3 }: Props) {
  const titleId = `${section.id}-title`;

  return (
    <section
      id={section.id}
      aria-labelledby={titleId}
      className={`section-v ${tone === "mist" ? "bg-verizon-mist" : "bg-white"}`}
    >
      <div className="container-v">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <SectionHeading
            eyebrow={section.eyebrow}
            title={section.title}
            intro={section.intro}
            titleId={titleId}
          />
          {section.media && (
            <Reveal delay={60}>
              <SectionMedia
                media={section.media}
                sizes="(min-width: 1024px) 45vw, 100vw"
              />
            </Reveal>
          )}
        </div>

        <div className={`mt-10 grid gap-5 ${COLS[columns]}`}>
          {section.plans.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 60} className="flex">
              <PlanCardView plan={plan} placement={section.id} />
            </Reveal>
          ))}
        </div>

        {section.highlights && (
          <Reveal className="mt-8">
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {section.highlights.map((h) => (
                <li key={h} className="flex gap-2 text-[0.85rem] font-semibold text-neutral-700">
                  <Check />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        )}

        {section.note && (
          <Reveal>
            <p className="mt-6 max-w-4xl text-[0.75rem] leading-6 text-verizon-slate">
              {section.note}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
