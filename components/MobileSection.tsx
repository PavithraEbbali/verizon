import PlanCardView from "./PlanCardView";
import Reveal from "./Reveal";
import SectionMedia from "./SectionMedia";
import SectionHeading from "./SectionHeading";
import { MEDIA, MOBILE } from "@/lib/content";

/** §8 — Verizon Wireless 5G unlimited plans and myPlan perks. */
export default function MobileSection() {
  return (
    <section id={MOBILE.id} aria-labelledby="mobile-title" className="section-v bg-verizon-mist">
      <div className="container-v">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <SectionHeading
            eyebrow={MOBILE.eyebrow}
            title={MOBILE.title}
            intro={MOBILE.intro}
            titleId="mobile-title"
          />
          <Reveal delay={60}>
            <SectionMedia media={MEDIA.mobile} sizes="(min-width: 1024px) 45vw, 100vw" />
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MOBILE.plans.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 60} className="flex">
              <PlanCardView plan={plan} placement="mobile" />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-card sm:p-8">
            <h3 className="text-[1.15rem] font-bold">{MOBILE.perks.title}</h3>
            <p className="mt-2 max-w-3xl text-[0.875rem] leading-6 text-neutral-600">
              {MOBILE.perks.intro}
            </p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {MOBILE.perks.items.map((perk) => (
                <li key={perk.name} className="rounded-xl border border-neutral-200 bg-verizon-mist p-4">
                  <p className="text-[0.9rem] font-bold">{perk.name}</p>
                  <p className="mt-1 text-[0.8rem] leading-5 text-neutral-600">{perk.detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal>
          <p className="mt-6 max-w-4xl text-[0.75rem] leading-6 text-verizon-slate">{MOBILE.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
