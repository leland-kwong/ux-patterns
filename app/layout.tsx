import type { Metadata } from 'next'
import { Inter, Fira_Code } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { APP_CONFIG } from './config'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code'
})

export const metadata: Metadata = {
  title: APP_CONFIG.title,
  description: APP_CONFIG.description
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${firaCode.variable} font-sans antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
