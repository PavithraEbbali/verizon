/**
 * Operator constants — the single source of truth for everything about the
 * business running this site.
 *
 * ⚠️ LAUNCH BLOCKERS — replace every value in `OPERATOR` and `PHONE` with the
 * real registered entity details before this site takes live traffic. Nothing
 * else in the codebase hardcodes these values, so this file is the only edit.
 */

export interface OperatorInfo {
  /** Trading name shown in the header wordmark and body copy. */
  name: string;
  /** Registered legal entity, used in the footer and legal pages. */
  legalName: string;
  /** Registered business address (mailing address of the entity — not a retail store). */
  address: {
    street: string;
    locality: string;
    region: string;
    postalCode: string;
    country: string;
  };
  /** General business email. */
  email: string;
  /** Privacy / data-rights inbox. */
  privacyEmail: string;
  /** Opt-out inbox for TCPA and marketing requests. */
  optOutEmail: string;
  /** Legal / trademark inbox. */
  legalEmail: string;
  /** Canonical production origin, no trailing slash. */
  siteUrl: string;
  /** Copyright year printed in the footer. */
  copyrightYear: number;
}

export const OPERATOR: OperatorInfo = {
  name: "Signal Wireless",
  legalName: "Signal Wireless LLC",
  address: {
    street: "1200 Commerce Avenue, Suite 5",
    locality: "Austin",
    region: "TX",
    postalCode: "78701",
    country: "US",
  },
  email: "hello@signalwireless-example.com",
  privacyEmail: "privacy@signalwireless-example.com",
  optOutEmail: "optout@signalwireless-example.com",
  legalEmail: "legal@signalwireless-example.com",
  siteUrl: "https://www.signalwireless-example.com",
  copyrightYear: 2026,
};

export interface PhoneInfo {
  /** Display form used in every visible label. */
  display: string;
  /** E.164 form used in `href="tel:…"`. */
  href: string;
  /** Staffed hours for the order line. */
  hours: string;
  /** Short hours label for tight layouts. */
  hoursShort: string;
}

/**
 * How the site brands itself, carried over from the existing production site:
 * the Verizon wordmark with its check, always locked to an "Authorized Retailer"
 * line. It is never the Verizon logo standing alone, which is what the retailer
 * brand-usage rules and §2.1 of the spec both require.
 *
 * This is display branding only. The operating entity is `OPERATOR.legalName`
 * and that is what appears in the disclosures, the footer legal block and the
 * legal pages — those must name the actual company, not the brand it retails.
 */
export const BRAND = {
  wordmark: "verizon",
  tag: "Authorized Retailer",
} as const;

/** The order line. One number, one place. */
export const PHONE: PhoneInfo = {
  display: "(833) 490-1105",
  href: "+18334901105",
  hours: "Agents available Mon–Sun 8am–10pm ET",
  hoursShort: "Mon–Sun 8am–10pm ET",
};

/**
 * The attribute every tap-to-call element must carry so call tracking can bind
 * to it. Applied automatically by `<CallLink>`; never hand-write a `tel:` link.
 */
export const CALL_CTA_ATTR = { "data-call-cta": "" } as const;

/** Required disclosure — this operator is not Verizon. */
export const DISCLOSURE = {
  short: "Independent Authorized Retailer of Verizon® services.",
  bar: "Independent Authorized Retailer of Verizon® — Not Verizon.",
  trademark:
    "Verizon, Fios, 5G Ultra Wideband, and related marks are trademarks of Verizon Trademark Services LLC.",
  reseller: `${OPERATOR.legalName} is an independent authorized retailer of Verizon® services. We are not Verizon Communications Inc. and are not affiliated with, endorsed by, or acting as an agent of Verizon beyond our retailer authorization. Pricing, availability, promotional terms, and service commitments are set by Verizon and confirmed at the time of order.`,
} as const;

export const formattedAddress = [
  OPERATOR.address.street,
  `${OPERATOR.address.locality}, ${OPERATOR.address.region} ${OPERATOR.address.postalCode}`,
].join(", ");

/**
 * Tokens available to legal page copy. Legal documents are written once with
 * `{{token}}` placeholders and rendered through `renderTokens`, so a change to
 * `OPERATOR` or `PHONE` propagates to all nine policy pages.
 */
export const LEGAL_TOKENS: Record<string, string> = {
  entity: OPERATOR.legalName,
  brand: `${BRAND.wordmark} ${BRAND.tag}`,
  address: formattedAddress,
  email: OPERATOR.email,
  privacyEmail: OPERATOR.privacyEmail,
  optOutEmail: OPERATOR.optOutEmail,
  legalEmail: OPERATOR.legalEmail,
  phone: PHONE.display,
  phoneHref: PHONE.href,
  hours: PHONE.hours,
  site: OPERATOR.siteUrl,
  year: String(OPERATOR.copyrightYear),
  trademark: DISCLOSURE.trademark,
};

/** Replaces every `{{token}}` in `input` with its value from `LEGAL_TOKENS`. */
export function renderTokens(input: string): string {
  return input.replace(/\{\{(\w+)\}\}/g, (match, key: string) =>
    key in LEGAL_TOKENS ? LEGAL_TOKENS[key] : match
  );
}
