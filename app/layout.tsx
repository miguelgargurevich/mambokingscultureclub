import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { AuthProvider } from '@/components/providers/auth-provider'
import { ToastProvider, Toaster } from '@/components/ui/toaster'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Mambo King Culture Club',
  description: 'El club cultural donde el humo, el pixel y el groove se encuentran. Un refugio para mentes creativas que celebran lo retro, lo alternativo y lo auténticamente chill.',
  keywords: ['culture club', 'retro', '90s', 'gaming', 'music', 'community'],
  authors: [{ name: 'Mambo King Culture Club' }],
  openGraph: {
    title: 'Mambo King Culture Club',
    description: 'El club cultural donde el humo, el pixel y el groove se encuentran.',
    url: 'https://mambokingcultureclub.com',
    siteName: 'Mambo King Culture Club',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Mambo King Culture Club',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mambo King Culture Club',
    description: 'El club cultural donde el humo, el pixel y el groove se encuentran.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <ThemeProvider>
          <AuthProvider>
            <ToastProvider>
              {children}
              <Toaster />
            </ToastProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
