import Link from 'next/link'

export default function ThankYouPage() {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
      <p className="mb-8">Your order has been received and is being processed.</p>
      <Link
        href="/"
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Continue Shopping
      </Link>
    </div>
  )
}

