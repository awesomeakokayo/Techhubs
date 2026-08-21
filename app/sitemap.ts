import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo/site'
import { TRACKS, CATEGORIES } from '@/lib/tracks'
import { ROADMAPS } from '@/lib/roadmaps'
import { GUIDE_CONTENT } from '@/lib/seo/guides'
import { CAREER_CONTENT } from '@/lib/seo/careers'
import { RESOURCE_PAGE_CONTENT } from '@/lib/seo/resource-pages'
import { EXTRA_ROADMAPS } from '@/lib/seo/roadmaps'
import { PROJECT_LEVELS } from '@/lib/seo/projects'

interface SitemapEntry {
  url: string
  lastModified?: string
  changeFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'always' | 'hourly' | 'never'
  priority: number
}

const STATIC: SitemapEntry[] = [
  { url: '/', changeFrequency: 'weekly', priority: 1 },
  { url: '/start', changeFrequency: 'weekly', priority: 0.9 },
  { url: '/roadmaps', changeFrequency: 'weekly', priority: 0.9 },
  { url: '/guides', changeFrequency: 'weekly', priority: 0.9 },
  { url: '/projects', changeFrequency: 'weekly', priority: 0.8 },
  { url: '/careers', changeFrequency: 'weekly', priority: 0.8 },
  { url: '/resources', changeFrequency: 'weekly', priority: 0.8 },
  { url: '/paths', changeFrequency: 'monthly', priority: 0.7 },
  { url: '/tracks', changeFrequency: 'monthly', priority: 0.7 },
  { url: '/about', changeFrequency: 'monthly', priority: 0.5 },
  { url: '/contact', changeFrequency: 'monthly', priority: 0.5 },
  { url: '/pitch-deck', changeFrequency: 'monthly', priority: 0.3 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: SitemapEntry[] = [...STATIC]

  // Track-based roadmaps under /roadmaps/[slug]
  for (const track of TRACKS) {
    entries.push({
      url: `/roadmaps/${track.slug}`,
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  }

  // Extra standalone roadmaps (JavaScript, React)
  for (const rm of Object.values(EXTRA_ROADMAPS)) {
    entries.push({
      url: `/roadmaps/${rm.slug}`,
      lastModified: rm.modifiedTime,
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  }

  // Track detail pages
  for (const track of TRACKS) {
    entries.push({ url: `/tracks/${track.slug}`, changeFrequency: 'monthly', priority: 0.7 })
  }

  // Path category pages
  for (const cat of CATEGORIES) {
    entries.push({
      url: `/paths/${cat.id}`,
      changeFrequency: 'monthly',
      priority: 0.6,
    })
  }

  // Guides
  for (const guide of Object.values(GUIDE_CONTENT)) {
    entries.push({
      url: `/guides/${guide.slug}`,
      lastModified: guide.modifiedTime,
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  }

  // Careers
  for (const career of Object.values(CAREER_CONTENT)) {
    entries.push({
      url: `/careers/${career.slug}`,
      lastModified: career.modifiedTime,
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  }

  // Resource hub pages
  for (const resource of Object.values(RESOURCE_PAGE_CONTENT)) {
    entries.push({
      url: `/resources/${resource.slug}`,
      lastModified: resource.modifiedTime,
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  }

  // Project level pages
  for (const level of PROJECT_LEVELS) {
    entries.push({ url: `/projects/${level.slug}`, changeFrequency: 'monthly', priority: 0.7 })
  }

  return entries.map((e) => ({
    url: `${SITE_URL}${e.url}`,
    lastModified: e.lastModified,
    changeFrequency: e.changeFrequency,
    priority: e.priority,
  }))
}