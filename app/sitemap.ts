import type { MetadataRoute } from "next";
import { legalSlugs } from "@/content/legal";
import { OPERATOR } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${OPERATOR.siteUrl}/`, changeFrequency: "weekly", priority: 1 },
    ...legalSlugs.map((slug) => ({
      url: `${OPERATOR.siteUrl}/legal/${slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
