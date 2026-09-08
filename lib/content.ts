/**
 * Every plan name, rate, speed, qualifier, disclaimer and FAQ answer lives here
 * as typed data. No component may hardcode a price or a legal sentence.
 *
 * ⚠️ Verizon sets all pricing and terms. Re-verify these figures against the
 * current official Verizon rate card before publishing, and re-verify whenever
 * Verizon changes a promotion.
 */

import { DISCLOSURE, OPERATOR, PHONE } from "./site";

/* ────────────────────────────── shared types ───────────────────────────── */

/** A single rendered image. Dimensions are the real file dimensions, so every
 *  `<img>` can carry explicit width/height and reserve its space before load. */
export interface Media {
  src: string;
  alt: string;
  width: number;
  height: number;
}

const img = (name: string, width: number, height: number, alt = ""): Media => ({
  src: `/img/${name}.webp`,
  alt,
  width,
  height,
});

/**
 * Section and product art. Sizes match `image-manifest.json`, written by
 * `convert-images.js` when the source PNGs were processed.
 *
 * Section imagery is decorative — it repeats what the adjacent heading already
 * says — so it carries an empty alt and is skipped by screen readers. The four
 * equipment shots illustrate a specific product and are described.
 */
export const MEDIA = {
  hero: img("hero", 2560, 1429),
  fiber: img("fiber", 1400, 873),
  homeInternet: img("5g-home", 1400, 873),
  bundles: img("bundles", 2000, 1247),
  tv: img("tv", 1400, 873),
  mobile: img("mobile", 1400, 873),
  phone: img("phone", 1400, 873),
  howItWorks: img("how-it-works", 1400, 873),
  whyUs: img("why-us", 2000, 1247),
} as const;


/** The canonical §3 price lockup payload. */
export interface PriceLockup {
  /** Whole-dollar portion, visually dominant. */
  integer: string;
  /** Cents including the separator, e.g. ".99". Omit for round dollars. */
  cents?: string;
  /** Billing period suffix. */
  per: string;
  /** Condition attached to the headline rate. */
  qualifier: string;
  /** What happens after the promo / what is not included. */
  step: string;
}

export interface PlanCard {
  id: string;
  name: string;
  /** One-line positioning statement. */
  summary: string;
  price: PriceLockup;
  /** Optional secondary rate, e.g. the mobile-bundle price. */
  altPrice?: string;
  speeds?: string;
  features: string[];
  featured?: boolean;
  /** Ribbon text for the featured card. */
  badge?: string;
}

export interface Section {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  /** Illustrative image shown beside the section heading. */
  media?: Media;
  plans: PlanCard[];
  /** Bullet highlights shown under the grid. */
  highlights?: string[];
  /** Section-level legal note. */
  note?: string;
}

/* ─────────────────────────────── navigation ────────────────────────────── */

export const NAV_LINKS = [
  { href: "#fiber", label: "Fiber" },
  { href: "#home-internet", label: "Home Internet" },
  { href: "#bundles", label: "Bundles" },
  { href: "#tv", label: "TV" },
  { href: "#mobile", label: "Mobile" },
  { href: "#phone", label: "Phone" },
  { href: "#faq", label: "FAQ" },
] as const;

/* ───────────────────────────────── hero ────────────────────────────────── */

export const HERO = {
  eyebrow: "Independent Authorized Retailer",
  /**
   * Split into words so JSX can guarantee whitespace between them.
   *
   * Leads with the product rather than the sales mechanic, and deliberately
   * makes no availability claim — the hero's only action is the ZIP check, and
   * Fios eligibility is confirmed by address on the call.
   */
  headline: ["Verizon", "Fios", "fiber", "internet", "for", "your", "home."],
  headlineAccent: "Fios",
  subline:
    "Verizon Fios runs on a 100% fiber-optic network with symmetrical upload and download speeds. Where Fios has not been built out, Verizon 5G Home Internet delivers fixed wireless service over 5G Ultra Wideband.",
  leadOffer: {
    label: "Fios 300 Mbps",
    price: {
      integer: "49",
      cents: ".99",
      per: "/mo",
      qualifier: "with Auto Pay & Paperless Billing",
      step: "plus taxes, fees & equipment terms · no annual contract",
    } as PriceLockup,
    altPrice: "or $24.99/mo with select Verizon mobile plans",
  },
  microcopy: {
    hours: PHONE.hours,
  },
  /** Up to four verifiable trust chips. Each asterisk resolves in the fine print. */
  trustChips: [
    "No Annual Contract*",
    "Unlimited Data*",
    "Router Included with select plans*",
    "Price Guarantee*",
  ],
  zip: {
    label: "Check availability at your address",
    help: "Enter your ZIP code and we will route you to an agent who can confirm Fios or 5G Home eligibility for your exact address while you are on the line.",
    invalid: "Enter a valid 5-digit ZIP code.",
    resultTitle: "Availability is confirmed by address, not ZIP",
    resultBody:
      "Fios and 5G Home eligibility varies street by street inside every ZIP code. Call the order line and an agent will check your exact address on the line.",
  },
} as const;

/* ───────────────────────────── 4. fiber (Fios) ─────────────────────────── */

export const FIBER: Section = {
  id: "fiber",
  eyebrow: "Verizon Fios® Home Internet",
  title: "100% fiber-optic internet with symmetrical speeds",
  intro:
    "Fios runs end-to-end over fiber, so upload speed matches download speed on every tier. That is what keeps video calls, cloud backups, and large file uploads from stalling when the household is busy.",
  media: MEDIA.fiber,
  plans: [
    {
      id: "fios-300",
      name: "Fios 300 Mbps",
      summary: "Right-sized for streaming, remote work, and a few connected devices.",
      speeds: "300 Mbps download / 300 Mbps upload",
      price: {
        integer: "49",
        cents: ".99",
        per: "/mo",
        qualifier: "with Auto Pay & Paperless Billing",
        step: "plus taxes, fees & equipment terms · no annual contract",
      },
      altPrice: "or $24.99/mo with select Verizon mobile plans",
      features: [
        "Symmetrical 300 Mbps upload and download",
        "No data caps and no overage charges",
        "No annual contract",
        "Self-setup kit available at no charge",
      ],
    },
    {
      id: "fios-500",
      name: "Fios 500 Mbps",
      summary: "Headroom for a full household streaming, gaming, and working at once.",
      speeds: "500 Mbps download / 500 Mbps upload",
      price: {
        integer: "69",
        cents: ".99",
        per: "/mo",
        qualifier: "with Auto Pay & Paperless Billing",
        step: "plus taxes, fees & equipment terms · no annual contract",
      },
      altPrice: "or $44.99/mo with select Verizon mobile plans",
      features: [
        "Symmetrical 500 Mbps upload and download",
        "No data caps and no overage charges",
        "No annual contract",
        "Whole-home Wi-Fi extender available",
      ],
    },
    {
      id: "fios-1gig",
      name: "Fios 1 Gig",
      summary: "Our most requested tier — gigabit fiber with the router included.",
      speeds: "Up to 940 Mbps download / up to 880 Mbps upload",
      price: {
        integer: "89",
        cents: ".99",
        per: "/mo",
        qualifier: "with Auto Pay & Paperless Billing",
        step: "plus taxes, fees & equipment terms · no annual contract",
      },
      altPrice: "or $64.99/mo with select Verizon mobile plans",
      featured: true,
      badge: "Most requested",
      features: [
        "Near-symmetrical gigabit speeds",
        "Fios Router included at no extra monthly charge",
        "Whole-home Wi-Fi extender rental included",
        "No data caps and no annual contract",
      ],
    },
    {
      id: "fios-2gig",
      name: "Fios 2 Gig",
      summary: "Premium symmetrical multi-gig tier, offered where the build supports it.",
      speeds: "Up to 2 Gbps symmetrical, where available",
      price: {
        integer: "109",
        cents: ".99",
        per: "/mo",
        qualifier: "with Auto Pay & Paperless Billing",
        step: "plus taxes, fees & equipment terms · availability varies by address",
      },
      features: [
        "Premium symmetrical multi-gig service",
        "Wi-Fi 6E router included",
        "Whole-home Wi-Fi extender included",
        "Availability confirmed by address on the order line",
      ],
    },
  ],
  highlights: [
    "Symmetrical upload and download on every Fios tier",
    "No data caps and no overage billing",
    "Month-to-month — no annual contract required",
  ],
  note: "Fios availability is determined by Verizon and varies by address. Speeds shown are the tier maximums published by Verizon; actual throughput depends on your equipment, wiring, and in-home network.",
};

/* ─────────── 5. cable / alternative broadband (5G Home & LTE Home) ─────── */

export const HOME_INTERNET: Section = {
  id: "home-internet",
  eyebrow: "Verizon 5G Home Internet® & LTE Home",
  title: "Fixed wireless home internet over 5G Ultra Wideband",
  intro:
    "Verizon 5G Home Internet provides broadband service over the 5G Ultra Wideband network, without the coaxial or copper line that cable and DSL require. At addresses where 5G Ultra Wideband coverage is not yet available, Verizon LTE Home provides equivalent fixed wireless service over the LTE network.",
  media: MEDIA.homeInternet,
  plans: [
    {
      id: "5g-home",
      name: "5G Home",
      summary: "Straightforward fixed wireless service on 5G Ultra Wideband.",
      speeds: "Typical 85–300 Mbps download, varies by address",
      price: {
        integer: "50",
        per: "/mo",
        qualifier: "with Auto Pay & Paperless Billing",
        step: "plus taxes & fees · from $35/mo with select Verizon mobile plans",
      },
      altPrice: "Starting at $35.00/mo with an eligible Verizon mobile plan",
      features: [
        "Plug-and-play self-setup — no technician visit required",
        "Verizon Internet Gateway included",
        "No data overages and no annual contract",
        "Cancel any time with no early termination fee",
      ],
    },
    {
      id: "5g-home-plus",
      name: "5G Home Plus",
      summary: "The enhanced tier — faster typical speeds and the price guarantee.",
      speeds: "Typical 300–1000 Mbps download, varies by address",
      price: {
        integer: "70",
        per: "/mo",
        qualifier: "with Auto Pay & Paperless Billing",
        step: "plus taxes & fees · from $45/mo with select Verizon mobile plans",
      },
      altPrice: "Starting at $45.00/mo with an eligible Verizon mobile plan",
      featured: true,
      badge: "Best value",
      features: [
        "Enhanced speeds on 5G Ultra Wideband",
        "Wi-Fi 6 router included",
        "Price guarantee for the published term",
        "Verizon Cloud Unlimited included",
      ],
    },
  ],
  highlights: [
    "Plug-and-play self-setup kit ships to your address",
    "No data overages",
    "No annual contract",
  ],
  note: "5G Home requires 5G Ultra Wideband coverage at your address; LTE Home is offered in select areas without it. Typical speed ranges are published by Verizon and vary with signal conditions, gateway placement, and network load.",
};

/* ─────────────────────────────── 6. bundles ────────────────────────────── */

export interface BundleCard {
  id: string;
  name: string;
  pairing: string;
  summary: string;
  saving: string;
  includes: string[];
}

export const BUNDLES = {
  id: "bundles",
  eyebrow: "Verizon Mobile + Home Savings",
  title: "Combine Verizon mobile and home internet for monthly savings",
  intro:
    "Verizon applies a monthly discount to home internet when it is held on an account with an eligible 5G Unlimited mobile plan. Savings of up to $25 per month are available on Fios and 5G Home. The discount is applied by Verizon and confirmed at the time of order.",
  cards: [
    {
      id: "gig-plus",
      name: "Fios Gigabit + Unlimited Plus",
      pairing: "Fios 1 Gig · Unlimited Plus",
      summary:
        "Symmetrical gigabit fiber at home paired with 5G Ultra Wideband and 30 GB of premium hotspot on mobile.",
      saving: "Up to $25/mo off Fios 1 Gig",
      includes: [
        "Fios Router and Wi-Fi extender rental included",
        "5G Ultra Wideband on every mobile line",
        "30 GB premium mobile hotspot per line",
        "No annual contract on either service",
      ],
    },
    {
      id: "5g-welcome",
      name: "5G Home + Unlimited Welcome",
      pairing: "5G Home · Unlimited Welcome",
      summary:
        "The lowest-friction pairing — fixed wireless internet you install yourself alongside nationwide 5G on mobile.",
      saving: "5G Home from $35/mo",
      includes: [
        "Verizon Internet Gateway included",
        "Self-setup, no technician appointment",
        "Nationwide 5G on every mobile line",
        "No annual contract on either service",
      ],
    },
  ] as BundleCard[],
  note: "Bundle savings require an eligible Verizon 5G Unlimited mobile plan on the same account. Discount amounts are set by Verizon, vary by plan and line count, and are confirmed at the time of order.",
} as const;

/* ────────────────────────────── 7. tv (Fios TV) ────────────────────────── */

export interface TvPackage {
  id: string;
  name: string;
  channels: string;
  summary: string;
  price: PriceLockup;
  features: string[];
  featured?: boolean;
  badge?: string;
}

export const TV = {
  id: "tv",
  eyebrow: "Verizon Fios TV®",
  title: "Fios TV packages across three channel tiers",
  intro:
    "Fios TV is delivered over the same fiber connection as Fios Internet. Three packages are available, differing in channel count and the inclusion of regional sports and movie networks, so the lineup can be matched to your household's viewing.",
  packages: [
    {
      id: "your-tv",
      name: "Your TV",
      channels: "125+ channels",
      summary: "A compact lineup you shape around your own favorite channels.",
      price: {
        integer: "70",
        per: "/mo",
        qualifier: "with Auto Pay & Paperless Billing",
        step: "plus taxes, fees, and Regional Sports & Broadcast surcharges",
      },
      features: [
        "125+ channels, customized to your picks",
        "Requires a Fios Internet connection",
        "Set-top box rental billed separately",
        "On-demand library included",
      ],
    },
    {
      id: "more-tv",
      name: "More TV",
      channels: "300+ channels",
      summary: "The popular networks plus regional sports coverage.",
      price: {
        integer: "90",
        per: "/mo",
        qualifier: "with Auto Pay & Paperless Billing",
        step: "plus taxes, fees, and Regional Sports & Broadcast surcharges",
      },
      featured: true,
      badge: "Most popular",
      features: [
        "300+ channels including regional sports",
        "Requires a Fios Internet connection",
        "Set-top box rental billed separately",
        "Multi-room DVR available",
      ],
    },
    {
      id: "most-tv",
      name: "Most TV",
      channels: "425+ channels",
      summary: "The full lineup — sports, movie packages, and entertainment tiers.",
      price: {
        integer: "115",
        per: "/mo",
        qualifier: "with Auto Pay & Paperless Billing",
        step: "plus taxes, fees, and Regional Sports & Broadcast surcharges",
      },
      features: [
        "425+ channels across sports and entertainment",
        "Movie packages included",
        "Requires a Fios Internet connection",
        "Set-top box rental billed separately",
      ],
    },
  ] as TvPackage[],
  note: "Fios TV requires an active Fios Internet connection at the same address. Set-top box rental, Regional Sports Network fees, and Broadcast fees are billed by Verizon in addition to the package rate and are disclosed on the order line before you commit.",
} as const;

/* ──────────────────────── 8. mobile (Verizon Wireless) ─────────────────── */

export interface MobilePlan extends PlanCard {
  hotspot: string;
}

export const MOBILE = {
  id: "mobile",
  eyebrow: "Verizon Wireless® 5G Unlimited",
  title: "Three 5G unlimited plans, priced per line",
  intro:
    "The rates shown reflect Verizon's four-line Auto Pay pricing structure. Per-line pricing increases as the number of lines decreases. An agent will confirm the exact per-line rate for your line count during the call.",
  plans: [
    {
      id: "unlimited-welcome",
      name: "Unlimited Welcome",
      summary: "Nationwide 5G with unlimited talk, text, and data at the entry rate.",
      hotspot: "Mobile hotspot not included",
      price: {
        integer: "25",
        per: "/line/mo",
        qualifier: "4 lines with Auto Pay & Paperless Billing",
        step: "plus taxes & fees · per-line rate varies by line count",
      },
      features: [
        "Unlimited talk, text, and 5G nationwide data",
        "No annual contract",
        "myPlan perks available at $10/mo each",
        "Keep your existing number",
      ],
    },
    {
      id: "unlimited-plus",
      name: "Unlimited Plus",
      summary: "5G Ultra Wideband plus a substantial premium hotspot allowance.",
      hotspot: "30 GB premium mobile hotspot per line",
      price: {
        integer: "45",
        per: "/line/mo",
        qualifier: "4 lines with Auto Pay & Paperless Billing",
        step: "plus taxes & fees · per-line rate varies by line count",
      },
      featured: true,
      badge: "Most requested",
      features: [
        "5G Ultra Wideband access",
        "30 GB premium mobile hotspot per line",
        "Price guarantee for the published term",
        "myPlan perks available at $10/mo each",
      ],
    },
    {
      id: "unlimited-ultimate",
      name: "Unlimited Ultimate",
      summary: "Unthrottled premium data with international roaming included.",
      hotspot: "60 GB premium mobile hotspot per line",
      price: {
        integer: "55",
        per: "/line/mo",
        qualifier: "4 lines with Auto Pay & Paperless Billing",
        step: "plus taxes & fees · per-line rate varies by line count",
      },
      features: [
        "Full-speed 5G Ultra Wideband with no data throttling",
        "60 GB premium mobile hotspot per line",
        "International roaming included",
        "myPlan perks available at $10/mo each",
      ],
    },
  ] as MobilePlan[],
  perks: {
    title: "myPlan perks — $10/mo each",
    intro:
      "Add only the perks you want to any myPlan line. Each is $10/mo and can be dropped at any time.",
    items: [
      { name: "Disney Bundle", detail: "Disney+, Hulu, and ESPN+ on one perk" },
      { name: "Netflix & Max", detail: "Both streaming services bundled into a single perk" },
      { name: "100 GB Mobile Hotspot", detail: "Additional hotspot data on top of the plan allowance" },
      { name: "Apple One", detail: "Apple Music, TV+, Arcade, and iCloud+ storage" },
    ],
  },
  note: "Per-line pricing shown assumes four lines on Auto Pay with paperless billing. Verizon sets all mobile pricing, perk availability, and promotional terms.",
} as const;

/* ─────────────────── 9. phone (Fios Digital Voice) ─────────────────────── */

export const HOME_PHONE = {
  id: "phone",
  eyebrow: "Fios Digital Voice®",
  title: "Fios Digital Voice home phone service",
  intro:
    "Fios Digital Voice is Verizon's digital voice service, delivered over your Fios Internet connection. It maintains a fixed telephone number at the service address, supporting households and small offices that require a line independent of mobile network coverage.",
  card: {
    id: "digital-voice",
    name: "Fios Digital Voice",
    summary: "Unlimited calling with the standard call-management feature set.",
    price: {
      integer: "20",
      per: "/mo",
      qualifier: "as an add-on to Fios Internet",
      step: "plus taxes, fees & regulatory surcharges · no annual contract",
    } as PriceLockup,
    features: [
      "Unlimited local, regional, and nationwide calling",
      "Caller ID, call waiting, and call forwarding",
      "Spam and robocall screening",
      "Voicemail with email delivery",
      "Keep your existing home number",
    ],
  },
  note: "Fios Digital Voice requires an active Fios Internet connection. Service depends on power and broadband at the premises; confirm E911 behavior with the agent before you order.",
} as const;

/* ──────────────────── 10. value-added services (§2.4) ──────────────────── */

export interface VasItem {
  id: string;
  name: string;
  category: string;
  summary: string;
  detail: string;
  image: Media;
}

export const VAS = {
  id: "equipment",
  eyebrow: "Equipment & protection",
  title: "Genuine Verizon equipment and protection add-ons",
  intro:
    "Everything below is Verizon-supplied hardware or a Verizon-branded protection product. Ask the agent which items are included with your tier and which are billed separately.",
  items: [
    {
      id: "router",
      image: img("eq-router", 900, 561, "A plain white cylindrical Wi-Fi router"),
      name: "Fios Router / Verizon Internet Gateway",
      category: "Hardware",
      summary: "Wi-Fi 6 and Wi-Fi 6E hardware supplied by Verizon.",
      detail:
        "The Fios Router serves fiber tiers; the Verizon Internet Gateway serves 5G Home. Included at no extra monthly charge on select tiers, rented on others — the agent confirms which applies to your plan.",
    },
    {
      id: "extender",
      image: img("eq-extender", 900, 561, "Two small white mesh Wi-Fi extender nodes"),
      name: "Whole-Home Wi-Fi Extender",
      category: "Hardware",
      summary: "Mesh extension nodes for larger or multi-floor homes.",
      detail:
        "Adds mesh nodes that extend coverage past the router's range. Rental is included on Fios 1 Gig and Fios 2 Gig, and available as a monthly add-on on other tiers.",
    },
    {
      id: "home-device-protect",
      image: img("eq-protect", 900, 561, "A tablet, smart speaker, earbuds case and thermostat dial"),
      name: "Verizon Home Device Protect",
      category: "Protection",
      summary: "Comprehensive protection for eligible home tech.",
      detail:
        "Covers eligible home technology on the account against breakdown, with tech support included. Coverage terms, claim limits, and deductibles are set by Verizon and its underwriter.",
    },
    {
      id: "verizon-cloud",
      image: img("eq-cloud", 900, 561, "Glowing translucent blocks stacked in layers"),
      name: "Verizon Cloud",
      category: "Backup",
      summary: "Secure cloud backup for photos, contacts, and files.",
      detail:
        "Available in tiered storage amounts, with Verizon Cloud Unlimited included on 5G Home Plus. Backs up mobile and desktop content to Verizon's storage.",
    },
  ] as VasItem[],
} as const;

/* ───────────────────── 11. honest fine-print grid (§2.5) ───────────────── */

export interface FinePrintRow {
  tier: string;
  speeds: string;
  promoPrice: string;
  standardPrice: string;
  equipment: string;
  setup: string;
  dataCap: string;
}

export const FINE_PRINT = {
  id: "fine-print",
  eyebrow: "Broadband facts",
  title: "Rates, fees, and terms for every tier",
  intro:
    "This table supports the asterisked claims made throughout this page. Promotional rates require Auto Pay with paperless billing. Taxes, government fees, and regulatory surcharges are additional and are billed by Verizon.",
  rows: [
    {
      tier: "Fios 300 Mbps",
      speeds: "300 Mbps down / 300 Mbps up",
      promoPrice: "$49.99/mo",
      standardPrice: "$74.99/mo after promotional term",
      equipment: "Router rental add-on",
      setup: "$0 self-install · pro-tech setup fee if requested",
      dataCap: "None",
    },
    {
      tier: "Fios 500 Mbps",
      speeds: "500 Mbps down / 500 Mbps up",
      promoPrice: "$69.99/mo",
      standardPrice: "$94.99/mo after promotional term",
      equipment: "Router rental add-on",
      setup: "$0 self-install · pro-tech setup fee if requested",
      dataCap: "None",
    },
    {
      tier: "Fios 1 Gig",
      speeds: "Up to 940 Mbps down / up to 880 Mbps up",
      promoPrice: "$89.99/mo",
      standardPrice: "$114.99/mo after promotional term",
      equipment: "Router + Wi-Fi extender included",
      setup: "$0 self-install · pro-tech setup fee if requested",
      dataCap: "None",
    },
    {
      tier: "Fios 2 Gig",
      speeds: "Up to 2 Gbps symmetrical, where available",
      promoPrice: "$109.99/mo",
      standardPrice: "$134.99/mo after promotional term",
      equipment: "Wi-Fi 6E router + extender included",
      setup: "$0 self-install · pro-tech setup fee if requested",
      dataCap: "None",
    },
    {
      tier: "5G Home",
      speeds: "Typical 85–300 Mbps down",
      promoPrice: "$35.00/mo with eligible mobile plan",
      standardPrice: "$50.00/mo standalone",
      equipment: "Verizon Internet Gateway included",
      setup: "$0 self-setup kit",
      dataCap: "None",
    },
    {
      tier: "5G Home Plus",
      speeds: "Typical 300–1000 Mbps down",
      promoPrice: "$45.00/mo with eligible mobile plan",
      standardPrice: "$70.00/mo standalone",
      equipment: "Wi-Fi 6 router included",
      setup: "$0 self-setup kit",
      dataCap: "None",
    },
  ] as FinePrintRow[],
  footnotes: [
    "*No Annual Contract — all internet tiers listed are month-to-month. Cancelling does not trigger an early termination fee.",
    "*Unlimited Data — no data caps and no overage charges on the internet tiers listed above.",
    "*Router Included with select plans — included on Fios 1 Gig, Fios 2 Gig, 5G Home, and 5G Home Plus. Rented separately on Fios 300 and Fios 500.",
    "*Price Guarantee — offered by Verizon on select plans for the published term. The agent confirms whether your plan carries one before you order.",
    "Promotional pricing requires Auto Pay with paperless billing, which carries a $10/mo discount. Losing Auto Pay removes the discount.",
    "Standard rates shown are the published post-promotional rates. Verizon may change rates and promotions at any time.",
  ],
} as const;

/* ─────────────────── 12. why order through us (§2.6) ───────────────────── */

export const WHY_US = {
  id: "why-us",
  eyebrow: "Why order through us",
  title: "One order line for the whole Verizon lineup",
  intro: `As an ${DISCLOSURE.short} we place new Verizon orders across internet, TV, mobile and home phone. The order line exists to get those details right the first time.`,
  cards: [
    {
      id: "one-call",
      title: "One call coordinates Internet, TV, Mobile, and Home Phone",
      body: "Rather than four separate orders, a single agent assembles the whole account and sequences the installs so nothing lands out of order.",
    },
    {
      id: "live-promos",
      title: "Current official Verizon promotions quoted live on every call",
      body: "Promotions change often. The agent quotes what Verizon is actually running at the moment you call, not a rate cached on a web page.",
    },
    {
      id: "address-check",
      title: "Exact address availability and speed tiers verified on the line",
      body: "Fios and 5G Home eligibility varies street by street. Availability is confirmed for your exact address while you are on the line, before you commit to anything.",
    },
    {
      id: "trained-agents",
      title: "Trained sales agents dedicated to new orders",
      body: "The order line is staffed by trained sales agents who place new Verizon orders all day. Existing-customer billing and outage matters go directly to Verizon.",
    },
  ],
} as const;

/* ───────────────────────── 13. how it works (§2.7) ─────────────────────── */

export const HOW_IT_WORKS = {
  id: "how-it-works",
  eyebrow: "How it works",
  title: "Three steps from call to connection",
  steps: [
    {
      n: "1",
      title: "Call the order line",
      body: `Dial ${PHONE.display}. ${PHONE.hours}. Trained sales agents on the order line take it from there.`,
    },
    {
      n: "2",
      title: "The agent checks your exact address",
      body: "Availability is confirmed for your exact address while on the line — Fios fiber, 5G Home fixed wireless, or LTE Home — along with the speed tiers actually offered there.",
    },
    {
      n: "3",
      title: "Service connection is scheduled",
      body: "Installation is scheduled directly with Verizon: a professional technician for Fios, or a plug-and-play self-setup kit shipped to you for 5G Home.",
    },
  ],
} as const;

/* ──────────────────────────── 14. FAQ (§2.8) ───────────────────────────── */

export interface FaqItem {
  id: string;
  q: string;
  /** First sentence must answer the question directly. */
  a: string;
}

export const FAQ: { id: string; eyebrow: string; title: string; items: FaqItem[] } = {
  id: "faq",
  eyebrow: "Questions",
  title: "Answers before you call",
  items: [
    {
      id: "availability",
      q: "Is Verizon Fios or 5G Home available at my address?",
      a: `Availability is confirmed for your exact address while on the line — a ZIP code is not precise enough to answer it. Fios is built out street by street, and 5G Home depends on 5G Ultra Wideband signal at the specific premises. Call ${PHONE.display} and an agent will check your address against Verizon's serviceability system during the call, then tell you which tiers are actually offered there.`,
    },
    {
      id: "identity",
      q: "Is this the official Verizon website?",
      a: `No. ${OPERATOR.legalName} is an independent authorized retailer of Verizon® services and is not Verizon Communications Inc. We place new Verizon orders on your behalf. Verizon sets all pricing, terms, and service commitments, and your account and billing relationship is with Verizon. ${DISCLOSURE.trademark}`,
    },
    {
      id: "autopay",
      q: "How does the $10/mo Auto Pay discount work?",
      a: "The advertised rates require both Auto Pay and paperless billing, which together carry a $10/mo discount applied by Verizon. You enroll a bank account or eligible card and switch billing to email. If Auto Pay is later removed or a payment method fails, the discount comes off and the rate returns to the standard price shown in the fine-print table above.",
    },
    {
      id: "installation",
      q: "Will a technician come out, or do I install it myself?",
      a: "It depends on the service. Fios normally involves a professional technician appointment scheduled directly with Verizon, because fiber has to be terminated at the premises. 5G Home ships as a plug-and-play self-setup kit — you position the gateway, power it on, and follow the app. Fios self-install is offered at some addresses where the wiring already exists; the agent will tell you which applies to yours.",
    },
    {
      id: "contracts",
      q: "Is there an annual contract or an early termination fee?",
      a: "No — the internet tiers listed on this page are month-to-month with no annual contract and no early termination fee. Some plans carry a Verizon price guarantee that holds your rate for a published term; that is a guarantee in your favor, not a commitment that locks you in. Device payment agreements on mobile lines are separate and do carry their own terms, which the agent will explain before you order.",
    },
  ],
};

/* ─────────────────────────── 15. footer (§2.9) ─────────────────────────── */

export const FOOTER_LEGAL_LINKS = [
  { href: "/legal/privacy", label: "Privacy Policy" },
  { href: "/legal/terms", label: "Terms of Use" },
  { href: "/legal/do-not-sell", label: "Do Not Sell or Share My Personal Information" },
  { href: "/legal/tcpa", label: "TCPA" },
  { href: "/legal/trademarks", label: "Trademarks" },
  { href: "/legal/accessibility", label: "Accessibility" },
  { href: "/legal/cookies", label: "Cookies" },
  { href: "/legal/disclaimer", label: "Disclaimer" },
  { href: "/legal/contact", label: "Contact" },
] as const;
