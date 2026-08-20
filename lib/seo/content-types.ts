export type ContentBlock =
  | { kind: 'paragraph'; text: string }
  | { kind: 'heading'; text: string }
  | { kind: 'list'; items: string[] }
  | { kind: 'numbered'; items: string[] }
  | { kind: 'steps'; items: { title: string; text: string }[] }
  | { kind: 'callout'; text: string }

export interface ContentSection {
  heading: string
  blocks: ContentBlock[]
}

export interface ContentFaq {
  question: string
  answer: string
}

export interface RelatedLink {
  title: string
  href: string
  description: string
}

export interface Cta {
  label: string
  href: string
}

export interface SeoPage {
  slug: string
  title: string
  seoTitle: string
  description: string
  openingAnswer: string
  intro: string
  audiences: string[]
  sections: ContentSection[]
  faqs: ContentFaq[]
  cta?: Cta
  related: RelatedLink[]
  publishedTime: string
  modifiedTime: string
}