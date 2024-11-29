import ProductGrid from '@/components/product-grid'
import VirtualTryOn from '@/components/virtual-try-on'

const adaptiveProducts = [
  { id: 'a1', name: "Adaptive Button-Free Shirt", price: 39.99, image: '/placeholder.svg?height=400&width=400' },
  { id: 'a2', name: "Seated Fit Pants", price: 54.99, image: '/placeholder.svg?height=400&width=400' },
  { id: 'a3', name: "Easy-On Shoes", price: 69.99, image: '/placeholder.svg?height=400&width=400' },
  { id: 'a4', name: "Magnetic Closure Jacket", price: 79.99, image: '/placeholder.svg?height=400&width=400' },
  { id: 'a5', name: "Sensory-Friendly Dress", price: 49.99, image: '/placeholder.svg?height=400&width=400' },
  { id: 'a6', name: "Adaptive Swimwear", price: 44.99, image: '/placeholder.svg?height=400&width=400' },
]

export default function AdaptiveFashion() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Adaptive Fashion</h1>
      <ProductGrid products={adaptiveProducts} />
      <VirtualTryOn />
    </div>
  )
}

