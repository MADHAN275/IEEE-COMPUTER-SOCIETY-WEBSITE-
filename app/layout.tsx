import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'IEEE Computer Society KITS - Empowering the People Who Drive Technology',
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
        <div id="custom-cursor" className="custom-cursor"></div>
        {children}
      </body>
    </html>
  )
}