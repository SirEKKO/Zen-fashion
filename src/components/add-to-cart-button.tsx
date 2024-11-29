'use client'

import { useCart } from '@/contexts/cart-context'
import { Product } from '@/app/api/products/route'

type AddToCartButtonProps = {
  product: Product
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart()

  return (
    <button
      onClick={() => addToCart(product)}
      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
    >
      Add to Cart
    </button>
  )
}

