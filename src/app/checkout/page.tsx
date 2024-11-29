'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/contexts/cart-context'
import { useRouter } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)
  const { clearCart } = useCart()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setProcessing(true)

    const { error: submitError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order-confirmation`,
      },
    })

    if (submitError) {
      setError(submitError.message || 'An unexpected error occurred.')
      setProcessing(false)
    } else {
      clearCart()
      router.push('/order-confirmation')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {error && <div className="text-red-500 mt-2">{error}</div>}
      <Button type="submit" disabled={!stripe || processing} className="mt-4">
        {processing ? 'Processing...' : 'Pay Now'}
      </Button>
    </form>
  )
}

export default function CheckoutPage() {
  const { items } = useCart()
  const [clientSecret, setClientSecret] = useState('')

  useEffect(() => {
    const createPaymentIntent = async () => {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: items.reduce((sum, item) => sum + item.product.price * item.quantity, 0) * 100,
        }),
      })
      const data = await response.json()
      setClientSecret(data.clientSecret)
    }

    createPaymentIntent()
  }, [items])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  )
}

