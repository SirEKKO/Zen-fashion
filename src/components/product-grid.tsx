'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/app/api/products/route'

type ProductGridProps = {
  category?: string
}

export default function ProductGrid({ category }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [sort, setSort] = useState<string>('')

  useEffect(() => {
    const fetchProducts = async () => {
      const params = new URLSearchParams()
      if (category) params.append('category', category)
      if (sort) params.append('sort', sort)
      const res = await fetch(`/api/products?${params.toString()}`)
      const data = await res.json()
      setProducts(data)
    }
    fetchProducts()
  }, [category, sort])

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="sort" className="mr-2">Sort by:</label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="p-2 border rounded dark:bg-gray-800"
        >
          <option value="">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`} className="group">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:scale-105">
              <Image
                src={product.image}
                alt={product.name}
                width={400}
                height={400}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">${product.price.toFixed(2)}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

