import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'IEEE COMPUTER SOCIETY KITS - Empowering the People Who Drive Technology',
  description: 'Join over 375,000 computing professionals worldwide in advancing technology for the benefit of humanity',
  icons: {
    icon: '/IEEE LOGO.png',
    shortcut: '/IEEE LOGO.png',
    apple: '/IEEE LOGO.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}