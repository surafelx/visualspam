import type { Metadata } from 'next'
import Header from './Header'
import './globals.css'

export const metadata: Metadata = {
  title: 'VisualSpam',
  description: 'Personal visual portfolio for experimental audiovisual work',
  icons: {
    icon: '/public/favicon.ico',
  },
  openGraph: {
    title: 'VisualSpam',
    description: 'Personal visual portfolio for experimental audiovisual work',
    url: 'https://visualspam.com',
    siteName: 'VisualSpam',
    images: [
      {
        url: 'https://res.cloudinary.com/dnr6jc1yr/image/upload/v1765879366/preview.jpg',
        width: 1200,
        height: 630,
        alt: 'VisualSpam Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="text-white min-h-screen font-barriecito overflow-hidden">
        {/* Video Background */}
        <video
          className="fixed top-0 left-0 w-full h-full object-cover z-0"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="https://res.cloudinary.com/dnr6jc1yr/video/upload/v1765879366/Untitled_design_q3wmpk.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <Header />

        {/* Main content with top padding for header */}
        <div className="pt-20">
          {children}
        </div>
      </body>
    </html>
  )
}