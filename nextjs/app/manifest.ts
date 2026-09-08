import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${BRAND.wordmark} ${BRAND.tag} — Fios, 5G Home Internet & Mobile`,
    short_name: `${BRAND.wordmark} ${BRAND.tag}`,
    description:
      "Order Verizon Fios fiber, 5G Home Internet, Fios TV, mobile and home phone through an independent authorized retailer.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ee0000",
    icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }],
  };
}
