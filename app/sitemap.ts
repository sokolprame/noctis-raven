import type { MetadataRoute } from "next";
import { portfolioProjects } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://noctis-raven.studio",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://noctis-raven.studio/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://noctis-raven.studio/work",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...portfolioProjects.map((project) => ({
      url: `https://noctis-raven.studio/work/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: "https://noctis-raven.studio/contact",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
