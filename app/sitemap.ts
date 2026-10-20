import type { MetadataRoute } from "next";
import { getPublicPortfolioProjects } from "@/lib/public-portfolio";
import { siteUrl } from "@/lib/site-url";

export const revalidate = 0;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getPublicPortfolioProjects();
  return [
    {
      url: new URL("/", siteUrl).toString(),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: new URL("/about", siteUrl).toString(),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: new URL("/work", siteUrl).toString(),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...projects.map((project) => ({
      url: new URL(`/work/${project.slug}`, siteUrl).toString(),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: new URL("/contact", siteUrl).toString(),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: new URL("/privacy", siteUrl).toString(),
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
