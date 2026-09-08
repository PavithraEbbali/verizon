import type { MetadataRoute } from "next";
import { OPERATOR } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${OPERATOR.siteUrl}/sitemap.xml`,
  };
}
