import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/login", "/account", "/admin", "/api/"],
      },
    ],
    sitemap: "https://cchinaroute.com/sitemap.xml",
    host: "https://cchinaroute.com",
  };
}
