import type { Metadata } from 'next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { SessionProvider } from '@/components/providers/SessionProvider'
import { ToastProvider } from '@/components/ui/toast'
import { StructuredData } from '@/components/seo/StructuredData'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { getSiteMetadata, organizationJsonLd, websiteJsonLd } from '@/lib/seo/utils'
import '@/styles/globals.css'

export const metadata: Metadata = getSiteMetadata()

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-deep antialiased">
        <StructuredData blocks={[organizationJsonLd(), websiteJsonLd()]} />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <SessionProvider>
          <ToastProvider>
            <Navbar />
            <main id="main-content">{children}</main>
            <Footer />
          </ToastProvider>
        </SessionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}