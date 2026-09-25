import type { Metadata } from 'next'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import MiniPlayer from '@/components/MiniPlayer'
import PlayerProvider from '@/components/PlayerProvider'
import { media, site } from '@/content/site'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    url: site.url,
    siteName: site.name,
    images: [{ url: media.ogPreview, width: 1200, height: 630, alt: site.name }],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans antialiased">
        <PlayerProvider>
          <Nav />
          {children}
          <Footer />
          <MiniPlayer />
        </PlayerProvider>
      </body>
    </html>
  )
}
