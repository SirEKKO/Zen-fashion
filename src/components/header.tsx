'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { Sun, Moon, Search, ShoppingCart } from 'lucide-react'
import { useCart } from '@/contexts/cart-context'

export default function Header() {
  const { theme, setTheme } = useTheme()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { items } = useCart()

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-semibold">
          Zen Fashion
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Link href="/mens" className="hover:text-gray-600 dark:hover:text-gray-300">Men</Link>
          <Link href="/womens" className="hover:text-gray-600 dark:hover:text-gray-300">Women</Link>
          <Link href="/kids" className="hover:text-gray-600 dark:hover:text-gray-300">Kids</Link>
          <Link href="/adaptive" className="hover:text-gray-600 dark:hover:text-gray-300">Adaptive</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Toggle search"
          >
            <Search size={20} />
          </button>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link href="/cart" className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <ShoppingCart size={20} />
            {cartItemsCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {cartItemsCount}
              </span>
            )}
          </Link>
        </div>
      </div>
      {isSearchOpen && (
        <div className="container mx-auto px-4 py-2">
          <input
            type="search"
            placeholder="Search for products..."
            className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
          />
        </div>
      )}
    </header>
  )
}

