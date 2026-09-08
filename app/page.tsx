import Bundles from "@/components/Bundles";
import Faq from "@/components/Faq";
import FinePrint from "@/components/FinePrint";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import MobileSection from "@/components/MobileSection";
import PhoneSection from "@/components/PhoneSection";
import ServiceSection from "@/components/ServiceSection";
import TvSection from "@/components/TvSection";
import ValueAdded from "@/components/ValueAdded";
import WhyUs from "@/components/WhyUs";
import { FAQ, FIBER, HOME_INTERNET } from "@/lib/content";
import { BRAND, DISCLOSURE, OPERATOR, PHONE, formattedAddress } from "@/lib/site";

const SITE = OPERATOR.siteUrl;

const businessLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE}/#organization`,
  name: OPERATOR.legalName,
  alternateName: `${BRAND.wordmark} ${BRAND.tag}`,
  description: DISCLOSURE.reseller,
  url: `${SITE}/`,
  telephone: `+${PHONE.href.replace(/\D/g, "")}`,
  email: OPERATOR.email,
  logo: `${SITE}/favicon.svg`,
  image: `${SITE}/og-cover.svg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: OPERATOR.address.street,
    addressLocality: OPERATOR.address.locality,
    addressRegion: OPERATOR.address.region,
    postalCode: OPERATOR.address.postalCode,
    addressCountry: OPERATOR.address.country,
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: `+${PHONE.href.replace(/\D/g, "")}`,
      contactType: "sales",
      areaServed: "US",
      availableLanguage: "English",
      description: DISCLOSURE.newOrdersOnly,
    },
  ],
  disambiguatingDescription: `${OPERATOR.legalName} is an independent authorized retailer of Verizon services and is not Verizon Communications Inc.`,
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `Verizon Fios, 5G Home Internet & Mobile — ${BRAND.tag}`,
  url: `${SITE}/`,
  inLanguage: "en-US",
  publisher: { "@id": `${SITE}/#organization` },
};

/** Built from the same FAQ array the page renders, so the two cannot drift. */
const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <main id="main">
        <Hero />

        {/* Service lines, in the mandated order. */}
        <ServiceSection section={FIBER} tone="white" columns={4} />
        <ServiceSection section={HOME_INTERNET} tone="mist" columns={2} />
        <Bundles />
        <TvSection />
        <MobileSection />
        <PhoneSection />

        {/* Compliance and closing. */}
        <ValueAdded />
        <FinePrint />
        <WhyUs />
        <HowItWorks />

        {/* FAQ is always the final content section before the footer. */}
        <Faq />

        <p className="sr-only">
          {DISCLOSURE.reseller} {DISCLOSURE.trademark} {OPERATOR.legalName}, {formattedAddress}.
        </p>
      </main>
    </>
  );
}
