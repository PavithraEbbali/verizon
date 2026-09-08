import CallLink from "./CallLink";
import Check from "./Check";
import PriceLockup from "./PriceLockup";
import Reveal from "./Reveal";
import SectionMedia from "./SectionMedia";
import SectionHeading from "./SectionHeading";
import { HOME_PHONE, MEDIA } from "@/lib/content";

/** §9 — Fios Digital Voice. */
export default function PhoneSection() {
  const { card } = HOME_PHONE;

  return (
    <section id={HOME_PHONE.id} aria-labelledby="phone-title" className="section-v bg-white">
      <div className="container-v">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <SectionHeading
            eyebrow={HOME_PHONE.eyebrow}
            title={HOME_PHONE.title}
            intro={HOME_PHONE.intro}
            titleId="phone-title"
          />
          <Reveal delay={60}>
            <SectionMedia media={MEDIA.phone} sizes="(min-width: 1024px) 45vw, 100vw" />
          </Reveal>
        </div>

        <Reveal className="mt-10">
          <article className="card-v mx-auto max-w-3xl sm:flex-row sm:gap-10 sm:p-8">
            <div className="sm:w-2/5">
              <h3 className="text-[1.15rem] font-bold">{card.name}</h3>
              <p className="mt-3 text-[0.875rem] leading-6 text-neutral-600">{card.summary}</p>
              <div className="mt-5 border-t border-neutral-200 pt-5">
                <PriceLockup price={card.price} />
              </div>
              <CallLink variant="primary" placement="phone-digital-voice" className="mt-6 w-full">
                Call to order
              </CallLink>
            </div>

            <ul className="mt-8 space-y-2.5 border-t border-neutral-200 pt-6 sm:mt-0 sm:w-3/5 sm:border-l sm:border-t-0 sm:pl-10 sm:pt-0">
              {card.features.map((feature) => (
                <li key={feature} className="flex gap-2.5 text-[0.85rem] leading-6 text-neutral-700">
                  <Check />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </article>
        </Reveal>

        <Reveal>
          <p className="mx-auto mt-6 max-w-3xl text-[0.75rem] leading-6 text-verizon-slate">
            {HOME_PHONE.note}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
