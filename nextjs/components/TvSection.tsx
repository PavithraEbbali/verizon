import PlanCardView from "./PlanCardView";
import Reveal from "./Reveal";
import SectionMedia from "./SectionMedia";
import SectionHeading from "./SectionHeading";
import { MEDIA, TV } from "@/lib/content";

/** §7 — Fios TV packages. */
export default function TvSection() {
  return (
    <section id={TV.id} aria-labelledby="tv-title" className="section-v bg-white">
      <div className="container-v">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <SectionHeading eyebrow={TV.eyebrow} title={TV.title} intro={TV.intro} titleId="tv-title" />
          <Reveal delay={60}>
            <SectionMedia media={MEDIA.tv} sizes="(min-width: 1024px) 45vw, 100vw" />
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TV.packages.map((pkg, i) => (
            <Reveal key={pkg.id} delay={i * 60} className="flex">
              <PlanCardView
                plan={{
                  id: pkg.id,
                  name: pkg.name,
                  summary: pkg.summary,
                  price: pkg.price,
                  speeds: pkg.channels,
                  features: pkg.features,
                  featured: pkg.featured,
                  badge: pkg.badge,
                }}
                placement="tv"
              />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-6 max-w-4xl text-[0.75rem] leading-6 text-verizon-slate">{TV.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
