import type { Metadata } from 'next'
import {
  SITE_NAME,
  SITE_URL,
  SITE_TAGLINE,
  SITE_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  ORGANIZATION,
} from './site'

export interface PageSeoInput {
  title: string
  description: string
  path: string
  keywords?: string[]
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  ogImage?: string
  noindex?: boolean
}

function absoluteUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${SITE_URL}${normalized}`
}

/**
 * Build a complete Metadata object for a public indexable page:
 * unique title, unique description, canonical URL, Open Graph, Twitter and robots.
 */
export function getPageMetadata({
  title,
  description,
  path,
  keywords = [],
  type = 'website',
  authors = [],
  publishedTime,
  modifiedTime,
  ogImage = DEFAULT_OG_IMAGE,
  noindex = false,
}: PageSeoInput): Metadata {
  const url = absoluteUrl(path)

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: true, nocache: true }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type,
      locale: 'en_US',
      images: [{ url: absoluteUrl(ogImage), width: 1200, height: 630, alt: title }],
      ...(type === 'article'
        ? {
            article: {
              publishedTime,
              modifiedTime,
              authors: authors ?? [SITE_NAME],
            },
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteUrl(ogImage)],
    },
  }
}

export function getSiteMetadata(): Metadata {
  return {
    title: {
      default: `${SITE_NAME} — ${SITE_TAGLINE}`,
      template: `%s | ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: SITE_URL },
    robots: { index: true, follow: true },
    openGraph: {
      title: `${SITE_NAME} — ${SITE_TAGLINE}`,
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'en_US',
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${SITE_NAME} — ${SITE_TAGLINE}`,
      description: SITE_DESCRIPTION,
      images: [DEFAULT_OG_IMAGE],
    },
  }
}

/* ============================================================
   JSON-LD builders — accurate, visible-on-page structured data
   ============================================================ */

function ldJson(data: unknown): string {
  return JSON.stringify(data)
}

export function organizationJsonLd(): string {
  return ldJson(ORGANIZATION)
}

export function websiteJsonLd(): string {
  return ldJson({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: ORGANIZATION,
  })
}

export interface BreadcrumbItem {
  label: string
  path?: string
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]): string | null {
  if (items.length < 2) return null
  const crumbs = items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.label,
    ...(item.path ? { item: absoluteUrl(item.path) } : {}),
  }))
  return ldJson({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs,
  })
}

export function faqJsonLd(faqs: { question: string; answer: string }[]): string | null {
  if (!faqs.length) return null
  return ldJson({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  })
}

export function articleJsonLd(data: {
  title: string
  description: string
  path: string
  publishedTime?: string
  modifiedTime?: string
}): string {
  return ldJson({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.title,
    description: data.description,
    url: absoluteUrl(data.path),
    mainEntityOfPage: absoluteUrl(data.path),
    author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    publisher: ORGANIZATION,
    datePublished: data.publishedTime,
    dateModified: data.modifiedTime,
  })
}

export function courseJsonLd(data: {
  name: string
  description: string
  path: string
  providerName?: string
}): string {
  return ldJson({
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: data.name,
    description: data.description,
    url: absoluteUrl(data.path),
    provider: {
      '@type': 'Organization',
      name: data.providerName ?? SITE_NAME,
      url: SITE_URL,
    },
  })
}

export function itemListJsonLd(items: { name: string; path: string }[]): string {
  return ldJson({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  })
}