import ProductGrid from '@/components/product-grid'
import VirtualTryOn from '@/components/virtual-try-on'

const womensProducts = [
  { id: 'w1', name: "Women's Floral Dress", price: 69.99, image: '/placeholder.svg?height=400&width=400' },
  { id: 'w2', name: "Women's Skinny Jeans", price: 54.99, image: '/placeholder.svg?height=400&width=400' },
  { id: 'w3', name: "Women's Blouse", price: 39.99, image: '/placeholder.svg?height=400&width=400' },
  { id: 'w4', name: "Women's Cardigan", price: 49.99, image: '/placeholder.svg?height=400&width=400' },
  { id: 'w5', name: "Women's Ankle Boots", price: 89.99, image: '/placeholder.svg?height=400&width=400' },
  { id: 'w6', name: "Women's Handbag", price: 129.99, image: '/placeholder.svg?height=400&width=400' },
]

export default function WomensFashion() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Women's Fashion</h1>
      <ProductGrid products={womensProducts} />
      <VirtualTryOn />
    </div>
  )
}

