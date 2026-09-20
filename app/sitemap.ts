import type { MetadataRoute } from "next";

const siteUrl = "https://prestigetrustapp.com";

const routes: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/personal-banking", changeFrequency: "monthly", priority: 0.8 },
  { path: "/business", changeFrequency: "monthly", priority: 0.8 },
  { path: "/digital-banking", changeFrequency: "monthly", priority: 0.7 },
  { path: "/cards", changeFrequency: "monthly", priority: 0.7 },
  { path: "/loans", changeFrequency: "monthly", priority: 0.7 },
  { path: "/about", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.6 },
  { path: "/open-account", changeFrequency: "monthly", priority: 0.9 },
  { path: "/login", changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
