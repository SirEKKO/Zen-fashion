import './globals.css'
import { Inter } from 'next/font/google'

import { ThemeProvider } from '@/components/theme-provider'
import { CartProvider } from '@/contexts/cart-context'
import { WishlistProvider } from '@/contexts/wishlist-context'
import { SessionProvider } from "next-auth/react"
import Header from '@/components/header'
import Footer from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Zen Fashion Store',
  description: 'Fashion for everyone, in harmony with your style',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SessionProvider>
            <CartProvider>
              <WishlistProvider>
                <Header />
                <main className="min-h-screen p-4 md:p-8">{children}</main>
                <Footer />
              </WishlistProvider>
            </CartProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

