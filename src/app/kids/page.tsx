import ProductGrid from '@/components/product-grid'
import VirtualTryOn from '@/components/virtual-try-on'

const kidsProducts = [
  { id: 'k1', name: "Kids' Dinosaur T-Shirt", price: 19.99, image: '/placeholder.svg?height=400&width=400' },
  { id: 'k2', name: "Kids' Denim Overalls", price: 34.99, image: '/placeholder.svg?height=400&width=400' },
  { id: 'k3', name: "Kids' Sneakers", price: 39.99, image: '/placeholder.svg?height=400&width=400' },
  { id: 'k4', name: "Kids' Hoodie", price: 29.99, image: '/placeholder.svg?height=400&width=400' },
  { id: 'k5', name: "Kids' Pajama Set", price: 24.99, image: '/placeholder.svg?height=400&width=400' },
  { id: 'k6', name: "Kids' Backpack", price: 27.99, image: '/placeholder.svg?height=400&width=400' },
]

export default function KidsFashion() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Kids' Fashion</h1>
      <ProductGrid products={kidsProducts} />
      <VirtualTryOn />
    </div>
  )
}

