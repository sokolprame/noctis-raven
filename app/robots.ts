import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://noctis-raven.studio/sitemap.xml",
    host: "https://noctis-raven.studio",
  };
}
