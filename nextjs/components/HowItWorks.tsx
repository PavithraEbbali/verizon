import CallLink from "./CallLink";
import Reveal from "./Reveal";
import SectionMedia from "./SectionMedia";
import SectionHeading from "./SectionHeading";
import { HOW_IT_WORKS, MEDIA } from "@/lib/content";
import { PHONE } from "@/lib/site";

/** §2.7 — exactly three steps. */
export default function HowItWorks() {
  return (
    <section id={HOW_IT_WORKS.id} aria-labelledby="how-title" className="section-v bg-white">
      <div className="container-v">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <SectionHeading
            eyebrow={HOW_IT_WORKS.eyebrow}
            title={HOW_IT_WORKS.title}
            titleId="how-title"
          />
          <Reveal delay={60}>
            <SectionMedia media={MEDIA.howItWorks} sizes="(min-width: 1024px) 45vw, 100vw" />
          </Reveal>
        </div>

        <ol className="mt-10 grid gap-5 lg:grid-cols-3">
          {HOW_IT_WORKS.steps.map((step, i) => (
            <Reveal key={step.n} delay={i * 60} as="li" className="flex">
              <div className="card-v">
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-verizon-red text-[1.05rem] font-extrabold text-white"
                >
                  {step.n}
                </span>
                <h3 className="mt-4 text-[1.05rem] font-bold">{step.title}</h3>
                <p className="mt-2 text-[0.875rem] leading-6 text-neutral-600">{step.body}</p>
                {i === 0 && (
                  <CallLink
                    variant="outline"
                    placement="how-it-works-step-1"
                    className="mt-5 w-full"
                  >
                    Call to order
                  </CallLink>
                )}
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal>
          <p className="mt-6 text-[0.8125rem] font-semibold text-verizon-slate">{PHONE.hours}</p>
        </Reveal>
      </div>
    </section>
  );
}
