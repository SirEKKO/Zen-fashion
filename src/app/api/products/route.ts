import { NextResponse } from 'next/server'

export type ProductVariation = {
  id: string
  size: string
  color: string
  stock: number
}

export type Product = {
  id: string
  name: string
  category: 'mens' | 'womens' | 'kids' | 'adaptive'
  price: number
  image: string
  description: string
  variations: ProductVariation[]
}

const products: Product[] = [
  {
    id: 'm1',
    name: "Men's Classic T-Shirt",
    category: 'mens',
    price: 29.99,
    image: '/placeholder.svg?height=400&width=400',
    description: "A comfortable and versatile t-shirt for everyday wear.",
    variations: [
      { id: 'm1-s-white', size: 'S', color: 'White', stock: 10 },
      { id: 'm1-m-white', size: 'M', color: 'White', stock: 15 },
      { id: 'm1-l-white', size: 'L', color: 'White', stock: 20 },
      { id: 'm1-s-black', size: 'S', color: 'Black', stock: 10 },
      { id: 'm1-m-black', size: 'M', color: 'Black', stock: 15 },
      { id: 'm1-l-black', size: 'L', color: 'Black', stock: 20 },
    ]
  },
  // Add more products with variations...
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')
  const sort = searchParams.get('sort')
  const id = searchParams.get('id')
  
  let filteredProducts = products

  if (id) {
    filteredProducts = filteredProducts.filter(p => p.id === id)
  } else if (category) {
    filteredProducts = filteredProducts.filter(p => p.category === category)
  }

  if (sort === 'price-asc') {
    filteredProducts.sort((a, b) => a.price - b.price)
  } else if (sort === 'price-desc') {
    filteredProducts.sort((a, b) => b.price - a.price)
  }

  return NextResponse.json(filteredProducts)
}

