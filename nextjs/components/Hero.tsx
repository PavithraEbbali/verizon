import HeroCanvas from "./HeroCanvas";
import PriceLockup from "./PriceLockup";
import ZipLookup from "./ZipLookup";
import { HERO, MEDIA } from "@/lib/content";

/** §2.2 — hero. */
export default function Hero() {
  return (
    <section
      className="relative isolate overflow-hidden bg-verizon-black"
      aria-labelledby="hero-title"
    >
      {/* Hero imagery plus the retained network animation.
          The gradient is anchored to the left edge and fully transparent by
          ~72%, so the skyline and light trails stay uncovered while the copy
          column keeps a readable contrast ratio. */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={MEDIA.hero.src}
          alt=""
          width={MEDIA.hero.width}
          height={MEDIA.hero.height}
          /* A narrow viewport crops this photo horizontally, so mobile is
             pulled toward the skyline rather than the empty sky. */
          className="h-full w-full object-cover object-[74%_50%] lg:object-center"
          fetchPriority="high"
          decoding="async"
        />
        <HeroCanvas />
        {/* Below lg the copy spans the full width, so a left-anchored gradient
            would leave the ends of every line uncovered — a lighter even wash
            is used there instead. */}
        <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.74)0%,rgba(0,0,0,0.66)45%,rgba(0,0,0,0.78)100%)] lg:hidden" />
        <span className="absolute inset-0 hidden bg-[linear-gradient(96deg,rgba(0,0,0,0.93)0%,rgba(0,0,0,0.86)26%,rgba(0,0,0,0.7)44%,rgba(0,0,0,0.38)58%,rgba(0,0,0,0)72%)] lg:block" />
      </div>

      {/* Tight to the header — the photo needs no empty run-up above the copy. */}
      <div className="container-v relative pb-14 pt-8 sm:pb-20 sm:pt-10 lg:pb-24 lg:pt-12">
        <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/55 px-3.5 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
              {HERO.eyebrow}
            </p>

            <h1
              id="hero-title"
              className="hero-ink mt-5 text-[2.1rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-white sm:text-[2.9rem] lg:text-[3.35rem]"
            >
              {/* Explicit {" "} between every word so no pair can ever collide. */}
              {HERO.headline.map((word, i) => (
                <span key={`${word}-${i}`}>
                  {word === HERO.headlineAccent ? (
                    <span className="text-verizon-red">{word}</span>
                  ) : (
                    word
                  )}
                  {i < HERO.headline.length - 1 ? " " : null}
                </span>
              ))}
            </h1>

            <p className="hero-ink mt-5 max-w-[34rem] text-[0.975rem] font-medium leading-7 text-white">
              {HERO.subline}
            </p>

            {/* Dominant §3 lockup for the lead offer. */}
            <div className="mt-8 inline-block rounded-2xl border border-white/15 bg-white p-5 shadow-card">
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-verizon-red">
                {HERO.leadOffer.label}
              </p>
              <PriceLockup price={HERO.leadOffer.price} altPrice={HERO.leadOffer.altPrice} />
            </div>

            {/* No call button here — the ZIP availability check is the hero's
                single action. Every other call CTA on the page remains. */}
            <div className="mt-7">
              <p className="hero-ink text-[0.8125rem] font-semibold text-white">{HERO.microcopy.hours}</p>
              <p className="hero-ink mt-1 max-w-md text-[0.78rem] font-medium leading-5 text-white">
                {HERO.microcopy.newOrders}
              </p>
            </div>

            <ul className="mt-7 flex flex-wrap gap-2" aria-label="Plan highlights">
              {HERO.trustChips.map((chip) => (
                <li key={chip}>
                  <a
                    href="#fine-print"
                    className="inline-flex min-h-[44px] items-center rounded-full border border-white/25 bg-black/55 px-4 py-2.5 text-[0.78rem] font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/45 hover:bg-black/70"
                  >
                    {chip}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:pt-4">
            <ZipLookup />
          </div>
        </div>
      </div>
    </section>
  );
}
