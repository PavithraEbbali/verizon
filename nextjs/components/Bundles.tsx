import CallLink from "./CallLink";
import Check from "./Check";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { BUNDLES, MEDIA } from "@/lib/content";

/**
 * §6 — mobile + home savings.
 *
 * The art fills the whole section rather than sitting in a band, so the type is
 * inverted and the cards carry their own dark translucent backing. The overlay
 * is anchored left on wide screens (where the copy column sits) and evened out
 * below `lg`, where the copy runs full width.
 */
export default function Bundles() {
  return (
    <section
      id={BUNDLES.id}
      aria-labelledby="bundles-title"
      className="section-v relative isolate overflow-hidden bg-verizon-black"
    >
      <div className="absolute inset-0" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={MEDIA.bundles.src}
          alt=""
          width={MEDIA.bundles.width}
          height={MEDIA.bundles.height}
          loading="lazy"
          decoding="async"
          sizes="100vw"
          className="h-full w-full object-cover object-[68%_50%] opacity-90 lg:object-center"
        />
        <span className="absolute inset-0 bg-black/78 lg:hidden" />
        <span className="absolute inset-0 hidden bg-gradient-to-r from-black/95 via-black/82 to-black/45 lg:block" />
      </div>

      <div className="container-v relative">
        <SectionHeading
          eyebrow={BUNDLES.eyebrow}
          title={BUNDLES.title}
          intro={BUNDLES.intro}
          titleId="bundles-title"
          tone="dark"
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {BUNDLES.cards.map((bundle, i) => (
            <Reveal key={bundle.id} delay={i * 60} className="flex">
              <article className="card-v border-white/15 bg-black/55 shadow-none backdrop-blur-md hover:border-white/30 hover:bg-black/65">
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-verizon-red">
                  {bundle.pairing}
                </p>
                <h3 className="mt-2 text-[1.15rem] font-bold text-white">{bundle.name}</h3>
                <p className="mt-3 text-[0.875rem] leading-6 text-neutral-300">{bundle.summary}</p>

                <p className="mt-5 inline-flex self-start rounded-full bg-verizon-red px-4 py-2 text-[0.8125rem] font-bold text-white">
                  {bundle.saving}
                </p>

                <ul className="mt-5 flex-1 space-y-2.5">
                  {bundle.includes.map((item) => (
                    <li key={item} className="flex gap-2.5 text-[0.85rem] leading-6 text-neutral-200">
                      <Check />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <CallLink placement={`bundle-${bundle.id}`} className="w-full">
                    Call to order
                  </CallLink>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-6 max-w-4xl text-[0.75rem] leading-6 text-neutral-300">{BUNDLES.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
