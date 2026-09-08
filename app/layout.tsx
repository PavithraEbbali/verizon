import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MobileCallBar from "@/components/MobileCallBar";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import TopDisclosureBar from "@/components/TopDisclosureBar";
import { BRAND, DISCLOSURE, OPERATOR } from "@/lib/site";

/** Site name used across metadata — leads with the products, not the operator. */
const SITE_NAME = "Verizon Fios, 5G Home Internet & Mobile";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(OPERATOR.siteUrl),
  title: {
    default: `${SITE_NAME} | Authorized Retailer`,
    template: `%s | ${BRAND.tag}`,
  },
  description:
    "Order Verizon Fios fiber internet, 5G Home Internet, Fios TV, mobile, and home phone through an independent authorized retailer. Availability confirmed for your exact address on the call.",
  applicationName: SITE_NAME,
  authors: [{ name: OPERATOR.legalName }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: `${SITE_NAME} — ${BRAND.tag}`,
    title: `${SITE_NAME} | Authorized Retailer`,
    description:
      "Verizon Fios fiber, 5G Home Internet, Fios TV, mobile and home phone — ordered in one call.",
    url: "/",
    images: ["/og-cover.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Authorized Retailer`,
    description: "Verizon Fios, 5G Home Internet, TV, mobile and home phone — ordered in one call.",
    images: ["/og-cover.svg"],
  },
  icons: { icon: "/favicon.svg", apple: "/favicon.svg" },
  robots: { index: true, follow: true, "max-image-preview": "large" },
  other: { "disclosure:independence": DISCLOSURE.short },
};

export const viewport: Viewport = {
  themeColor: "#ee0000",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The inline script below strips `no-js` before hydration, so React is told
    // not to flag the class it finds as a server/client mismatch.
    <html lang="en" className={`${inter.variable} no-js`} suppressHydrationWarning>
      <body>
        {/* Entrance transitions must never be the reason content stays hidden. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.remove('no-js')`,
          }}
        />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-verizon-black focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-white"
        >
          Skip to content
        </a>

        <span id="top" />
        <TopDisclosureBar />
        <SiteHeader />

        {/* pb-20 clears the fixed mobile call bar so no footer copy hides behind it. */}
        <div className="pb-20 md:pb-0">
          {children}
          <SiteFooter />
        </div>

        <MobileCallBar />
      </body>
    </html>
  );
}
