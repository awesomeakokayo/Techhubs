import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/login',
          '/account',
          '/account/',
          '/dashboard/',
          '/certificate/',
          '/purchase/',
          '/guided-path/',
          '/upgrade',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
      },
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL.replace('https://', ''),
  }
}