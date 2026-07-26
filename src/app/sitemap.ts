import type { MetadataRoute } from "next";

export const dynamic = "force-static";
import { business } from "@/data/business";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: business.canonicalUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: business.canonicalUrl + "/privacy",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: business.canonicalUrl + "/terms",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
