'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Product } from '@/app/api/products/route'

type WishlistContextType = {
  items: Product[]
  addToWishlist: (product: Product) => void
  removeFromWishlist: (productId: string) => void
  isInWishlist: (productId: string) => boolean
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>([])

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist')
    if (savedWishlist) {
      setItems(JSON.parse(savedWishlist))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(items))
  }, [items])

  const addToWishlist = (product: Product) => {
    setItems(prevItems => {
      if (!prevItems.some(item => item.id === product.id)) {
        return [...prevItems, product]
      }
      return prevItems
    })
  }

  const removeFromWishlist = (productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productId))
  }

  const isInWishlist = (productId: string) => {
    return items.some(item => item.id === productId)
  }

  return (
    <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}

