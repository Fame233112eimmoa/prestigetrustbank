import type { MetadataRoute } from "next";

const siteUrl = "https://prestigetrustapp.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/api/", "/otp"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
