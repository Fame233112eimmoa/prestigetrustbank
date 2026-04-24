import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://prestigetrustapp.com',
      lastModified: new Date(),
    },
  ]
}
