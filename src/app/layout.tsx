import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Delified - Empowering Future Leaders',
  description: 'Delified is a platform for Model United Nations conferences, resources, and community.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <SiteHeader />
        <main className="flex-grow bg-gradient-custom">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  )
}

