import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/nieuw", "/dashboard/bewerken"],
    },
    sitemap: "https://www.caronix.nl/sitemap.xml",
  };
}
