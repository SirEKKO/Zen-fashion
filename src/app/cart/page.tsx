'use client'

import { useCart } from '@/contexts/cart-context'
import Image from 'next/image'
import Link from 'next/link'

export default function CartPage() {
  const { items, removeFromCart, clearCart } = useCart()

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={item.product.id} className="flex items-center space-x-4 border-b pb-4">
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  width={100}
                  height={100}
                  className="rounded-md"
                />
                <div className="flex-grow">
                  <h2 className="text-xl font-semibold">{item.product.name}</h2>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-gray-600">${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <p className="text-xl font-semibold">Total: ${total.toFixed(2)}</p>
            <div className="mt-4 space-x-4">
              <button
                onClick={clearCart}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
              >
                Clear Cart
              </button>
              <Link
                href="/checkout"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors inline-block"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

