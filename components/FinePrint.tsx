import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { FINE_PRINT } from "@/lib/content";

const HEADERS = [
  "Tier",
  "Typical speeds",
  "Promo price",
  "Standard price",
  "Equipment fee",
  "Setup fee",
  "Data cap",
];

/**
 * §2.5 — FCC Broadband Facts-style disclosure.
 *
 * Renders as a real table on wide screens and as stacked labelled rows on
 * narrow ones, so the header/value pairing survives without forcing a phone
 * user to scroll a seven-column grid sideways.
 */
export default function FinePrint() {
  return (
    <section id={FINE_PRINT.id} aria-labelledby="fine-print-title" className="section-v bg-white">
      <div className="container-v">
        <SectionHeading
          eyebrow={FINE_PRINT.eyebrow}
          title={FINE_PRINT.title}
          intro={FINE_PRINT.intro}
          titleId="fine-print-title"
        />

        <Reveal className="mt-10">
          {/* Wide viewports: a real table. */}
          <div className="hidden overflow-x-auto rounded-2xl border border-neutral-200 shadow-card lg:block">
            <table className="w-full border-collapse text-left text-[0.8125rem]">
              <caption className="sr-only">
                Broadband facts by tier: typical speeds, promotional and standard pricing, equipment
                and setup fees, and data caps.
              </caption>
              <thead>
                <tr className="bg-verizon-black text-white">
                  {HEADERS.map((h) => (
                    <th key={h} scope="col" className="px-4 py-3 font-bold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FINE_PRINT.rows.map((row, i) => (
                  <tr key={row.tier} className={i % 2 ? "bg-verizon-mist/60" : "bg-white"}>
                    <th scope="row" className="px-4 py-3 font-bold text-verizon-black">
                      {row.tier}
                    </th>
                    <td className="px-4 py-3 text-neutral-700">{row.speeds}</td>
                    <td className="px-4 py-3 font-semibold text-verizon-black">{row.promoPrice}</td>
                    <td className="px-4 py-3 text-neutral-700">{row.standardPrice}</td>
                    <td className="px-4 py-3 text-neutral-700">{row.equipment}</td>
                    <td className="px-4 py-3 text-neutral-700">{row.setup}</td>
                    <td className="px-4 py-3 text-neutral-700">{row.dataCap}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Narrow viewports: stacked label/value pairs. */}
          <div className="space-y-4 lg:hidden">
            {FINE_PRINT.rows.map((row) => (
              <div key={row.tier} className="rounded-2xl border border-neutral-200 shadow-card">
                <p className="rounded-t-2xl bg-verizon-black px-4 py-3 text-[0.9rem] font-bold text-white">
                  {row.tier}
                </p>
                <dl className="divide-y divide-neutral-200 text-[0.8125rem]">
                  {[
                    ["Typical speeds", row.speeds],
                    ["Promo price", row.promoPrice],
                    ["Standard price", row.standardPrice],
                    ["Equipment fee", row.equipment],
                    ["Setup fee", row.setup],
                    ["Data cap", row.dataCap],
                  ].map(([label, value]) => (
                    <div key={label} className="flex gap-4 px-4 py-2.5">
                      <dt className="w-[38%] shrink-0 font-semibold text-verizon-slate">{label}</dt>
                      <dd className="text-neutral-700">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <ul className="mt-8 max-w-4xl space-y-2 text-[0.75rem] leading-6 text-verizon-slate">
            {FINE_PRINT.footnotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
