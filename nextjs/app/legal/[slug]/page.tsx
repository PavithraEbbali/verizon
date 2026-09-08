import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CallLink from "@/components/CallLink";
import { legal, legalSlugs } from "@/content/legal";
import { OPERATOR, PHONE, renderTokens } from "@/lib/site";

export function generateStaticParams() {
  return legalSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const doc = legal[params.slug];
  if (!doc) return {};
  return {
    title: doc.title,
    description: renderTokens(doc.description),
    alternates: { canonical: `/legal/${params.slug}` },
  };
}

export default function LegalPage({ params }: { params: { slug: string } }) {
  const doc = legal[params.slug];
  if (!doc) notFound();

  return (
    <main id="main">
      <section className="border-b border-neutral-200 bg-verizon-mist">
        <div className="container-v py-14 sm:py-16">
          <p className="eyebrow">{OPERATOR.legalName}</p>
          <h1 className="text-[1.9rem] font-extrabold leading-tight sm:text-[2.35rem]">
            {doc.title}
          </h1>
          <p className="mt-3 text-[0.8125rem] text-verizon-slate">Last updated: {doc.updated}</p>
        </div>
      </section>

      <div className="container-v grid gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_300px] lg:py-16">
        <article
          className="prose-v max-w-3xl"
          /* Tokens are substituted here so entity, address, phone and email
             come from lib/site.ts rather than being written into the copy. */
          dangerouslySetInnerHTML={{ __html: renderTokens(doc.body) }}
        />

        <aside className="lg:sticky lg:top-32 lg:self-start">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-card">
            <h2 className="text-[1rem] font-bold">Questions about this policy?</h2>
            <p className="mt-2 text-[0.8125rem] leading-6 text-neutral-600">
              Call the order line, or email{" "}
              <a
                href={`mailto:${OPERATOR.legalEmail}`}
                className="font-semibold text-verizon-red underline underline-offset-2"
              >
                {OPERATOR.legalEmail}
              </a>
              .
            </p>
            <CallLink placement={`legal-${params.slug}`} className="mt-4 w-full">
              Call to order
            </CallLink>
            <p className="mt-3 text-[0.75rem] text-verizon-slate">{PHONE.hours}</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
