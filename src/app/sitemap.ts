import type { MetadataRoute } from "next";

import { practicalGuides } from "@/data/content";
import { getAllPackages } from "@/data/packages";

const BASE_URL = "https://cchinaroute.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/packages`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/book`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/practical-info`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/forum`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/tools`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const packagePages: MetadataRoute.Sitemap = getAllPackages().map((pkg) => ({
    url: `${BASE_URL}/packages/${pkg.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const practicalPages: MetadataRoute.Sitemap = practicalGuides.map((guide) => ({
    url: `${BASE_URL}/practical-info/${guide.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...packagePages, ...practicalPages];
}
