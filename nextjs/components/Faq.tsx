import CallLink from "./CallLink";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { FAQ } from "@/lib/content";
import { PHONE } from "@/lib/site";

/**
 * §2.8 / §10 — the final content section before the footer.
 *
 * Built on native `details`/`summary`, which is keyboard operable, screen-reader
 * announced, and searchable in-page by the browser without a line of JS.
 */
export default function Faq() {
  return (
    <section id={FAQ.id} aria-labelledby="faq-title" className="section-v bg-white">
      <div className="container-v">
        <SectionHeading eyebrow={FAQ.eyebrow} title={FAQ.title} titleId="faq-title" />

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.55fr_1fr] lg:gap-14">
          <div className="divide-y divide-neutral-200 border-y border-neutral-200">
            {FAQ.items.map((item, i) => (
              <Reveal key={item.id} delay={i * 40}>
                <details className="group" id={`faq-${item.id}`}>
                  <summary className="flex w-full list-none items-start justify-between gap-6 py-5 text-left text-[0.975rem] font-bold text-verizon-black marker:content-none [&::-webkit-details-marker]:hidden">
                    <span>{item.q}</span>
                    <span
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-verizon-red transition-transform duration-200 group-open:rotate-45"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 5v14M5 12h14"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </summary>
                  <p className="max-w-3xl pb-6 text-[0.875rem] leading-7 text-neutral-600">
                    {item.a}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>

          <Reveal delay={80}>
            <aside className="rounded-2xl border border-neutral-200 bg-verizon-mist p-6 lg:sticky lg:top-32">
              <h3 className="text-[1.05rem] font-bold">Still deciding?</h3>
              <p className="mt-2 text-[0.875rem] leading-6 text-neutral-600">
                Trained sales agents on the order line will confirm availability for your exact
                address and quote the promotions Verizon is running right now.
              </p>
              <CallLink placement="faq-aside" className="mt-5 w-full" />
              <p className="mt-3 text-[0.78rem] font-semibold text-verizon-slate">{PHONE.hours}</p>
              <p className="mt-2 text-[0.75rem] leading-5 text-verizon-slate">
                New orders only — for customer billing or outage support, contact Verizon directly.
              </p>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
