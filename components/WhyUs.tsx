import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { MEDIA, WHY_US } from "@/lib/content";

/** §2.6 — approved aggregation claims only. */
export default function WhyUs() {
  return (
    <section
      id={WHY_US.id}
      aria-labelledby="why-us-title"
      className="section-v relative isolate overflow-hidden bg-verizon-black"
    >
      {/* Near-monochrome band art, held well back so white text stays readable. */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={MEDIA.whyUs.src}
          alt=""
          width={MEDIA.whyUs.width}
          height={MEDIA.whyUs.height}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover opacity-80"
        />
        <span className="absolute inset-0 bg-gradient-to-r from-black/88 via-black/55 to-black/25" />
      </div>

      <div className="container-v relative">
        <SectionHeading
          eyebrow={WHY_US.eyebrow}
          title={WHY_US.title}
          intro={WHY_US.intro}
          titleId="why-us-title"
          tone="dark"
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {WHY_US.cards.map((card, i) => (
            <Reveal key={card.id} delay={i * 60} className="flex">
              <article className="card-v border-white/15 bg-black/55 shadow-none backdrop-blur-md hover:border-white/30 hover:bg-black/65">
                <h3 className="text-[1rem] font-bold leading-snug text-white">{card.title}</h3>
                <p className="mt-3 text-[0.875rem] leading-6 text-neutral-300">{card.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
