import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Tech Skills Learning Hub — Free Roadmaps & Resources for Tech Careers',
  description:
    'Free learning paths, roadmaps, and curated resources for Frontend, Backend, UI/UX, Data, Mobile, Cybersecurity, and more. Built for African students.',
  keywords:
    'tech learning, programming roadmap, frontend development, Nigeria tech, African students, free coding resources, career in tech',
  openGraph: {
    title: 'Tech Skills Learning Hub',
    description: 'Your complete guide into tech — 17 tracks, 300+ resources, 100% free.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tech Skills Learning Hub',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-deep antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
