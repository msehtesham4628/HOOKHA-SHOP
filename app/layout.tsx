import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'HOOKHA SHOP - Premium Hookah & Tobacco',
  description: 'Buy premium hookahs, shisha tobacco, bowls, coal, and accessories. International shipping available.',
  keywords: 'hookah, shisha, tobacco, bowls, coal, accessories, premium',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hookha-shop.com',
    title: 'HOOKHA SHOP - Premium Hookah & Tobacco',
    description: 'Buy premium hookahs, shisha tobacco, bowls, coal, and accessories.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HOOKHA SHOP - Premium Hookah & Tobacco',
    description: 'Buy premium hookahs, shisha tobacco, bowls, coal, and accessories.',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-midnight text-white`}>
        {children}
      </body>
    </html>
  )
}
