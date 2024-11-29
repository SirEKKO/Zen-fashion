import ProductGrid from '@/components/product-grid'
import VirtualTryOn from '@/components/virtual-try-on'

const mensProducts = [
  { id: 'm1', name: "Men's Classic T-Shirt", price: 29.99, image: '/placeholder.svg?height=400&width=400' },
  { id: 'm2', name: "Men's Slim Fit Jeans", price: 59.99, image: '/placeholder.svg?height=400&width=400' },
  { id: 'm3', name: "Men's Oxford Shirt", price: 49.99, image: '/placeholder.svg?height=400&width=400' },
  { id: 'm4', name: "Men's Leather Jacket", price: 199.99, image: '/placeholder.svg?height=400&width=400' },
  { id: 'm5', name: "Men's Sneakers", price: 79.99, image: '/placeholder.svg?height=400&width=400' },
  { id: 'm6', name: "Men's Suit", price: 299.99, image: '/placeholder.svg?height=400&width=400' },
]

export default function MensFashion() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Men's Fashion</h1>
      <ProductGrid products={mensProducts} />
      <VirtualTryOn />
    </div>
  )
}

