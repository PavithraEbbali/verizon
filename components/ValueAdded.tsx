import Reveal from "./Reveal";
import SectionMedia from "./SectionMedia";
import SectionHeading from "./SectionHeading";
import { VAS } from "@/lib/content";

/** §2.4 — genuine Verizon equipment and protection SKUs. */
export default function ValueAdded() {
  return (
    <section id={VAS.id} aria-labelledby="vas-title" className="section-v bg-verizon-mist">
      <div className="container-v">
        <SectionHeading
          eyebrow={VAS.eyebrow}
          title={VAS.title}
          intro={VAS.intro}
          titleId="vas-title"
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {VAS.items.map((item, i) => (
            <Reveal key={item.id} delay={i * 60} className="flex">
              <article className="card-v">
                <SectionMedia
                  media={item.image}
                  ratio="4/3"
                  sizes="(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 100vw"
                  className="mb-5"
                />
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-verizon-slate">
                  {item.category}
                </p>
                <h3 className="mt-2 text-[1rem] font-bold leading-snug">{item.name}</h3>
                <p className="mt-2 text-[0.85rem] font-semibold leading-6 text-verizon-black">
                  {item.summary}
                </p>
                <p className="mt-2 text-[0.8125rem] leading-6 text-neutral-600">{item.detail}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
