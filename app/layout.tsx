import type { Metadata } from 'next'
import { siteConfig } from '@/data/site'
import SiteShell from '@/components/layout/site-shell'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

import 'simple-line-icons/css/simple-line-icons.css'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://avivas.dev'),
  title: {
    default: siteConfig.title,
    template: '%s | Alejandro Vivas - Frontend Developer',
  },
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    url: 'https://avivas.dev',
    siteName: 'Alejandro Vivas - Frontend Developer',
    title: siteConfig.title,
    description: siteConfig.description,
    images: ['/img/bg-hero2.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: ['/img/bg-hero2.jpg'],
  },
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Alejandro Vivas',
  jobTitle: 'Frontend Developer',
  url: 'https://avivas.dev',
  sameAs: [siteConfig.twitter, siteConfig.linkedin, siteConfig.github],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <SiteShell>
          <Header />
          <main>{children}</main>
          <Footer />
        </SiteShell>
      </body>
    </html>
  )
}
