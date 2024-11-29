'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { Product, ProductVariation } from '@/app/api/products/route'
import { Review } from '@/app/api/reviews/route'
import { useCart } from '@/contexts/cart-context'
import { useWishlist } from '@/contexts/wishlist-context'
import { useSession } from 'next-auth/react'
import VirtualTryOn from '@/components/virtual-try-on'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ProductPage() {
  const { id } = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedVariation, setSelectedVariation] = useState<ProductVariation | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' })
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { data: session } = useSession()

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/products?id=${id}`)
      const products: Product[] = await res.json()
      setProduct(products[0] || null)
      if (products[0] && products[0].variations.length > 0) {
        setSelectedVariation(products[0].variations[0])
      }
    }
    fetchProduct()
  }, [id])

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await fetch(`/api/reviews?productId=${id}`)
      const reviewsData: Review[] = await res.json()
      setReviews(reviewsData)
    }
    fetchReviews()
  }, [id])

  const handleAddToCart = () => {
    if (product && selectedVariation) {
      addToCart({ ...product, variation: selectedVariation })
    }
  }

  const handleToggleWishlist = () => {
    if (product) {
      if (isInWishlist(product.id)) {
        removeFromWishlist(product.id)
      } else {
        addToWishlist(product)
      }
    }
  }

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    if (session && product) {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          userId: session.user.id,
          rating: newReview.rating,
          comment: newReview.comment,
        }),
      })
      const newReviewData: Review = await res.json()
      setReviews([...reviews, newReviewData])
      setNewReview({ rating: 5, comment: '' })
    }
  }

  if (!product) return <div>Loading...</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={600}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl mb-4">${product.price.toFixed(2)}</p>
          <p className="mb-6">{product.description}</p>
          <div className="mb-4">
            <Label htmlFor="size">Size</Label>
            <Select
              onValueChange={(value) => setSelectedVariation(product.variations.find(v => v.id === value) || null)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                {product.variations.map((variation) => (
                  <SelectItem key={variation.id} value={variation.id}>
                    {variation.size} - {variation.color} ({variation.stock} in stock)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex space-x-4">
            <Button onClick={handleAddToCart} disabled={!selectedVariation}>
              Add to Cart
            </Button>
            <Button onClick={handleToggleWishlist} variant="outline">
              {isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Virtual Try-On</h2>
        <VirtualTryOn productImage={product.image} />
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        {reviews.map((review) => (
          <div key={review.id} className="mb-4 p-4 border rounded">
            <p className="font-bold">Rating: {review.rating}/5</p>
            <p>{review.comment}</p>
          </div>
        ))}
        {session && (
          <form onSubmit={handleSubmitReview} className="mt-8">
            <h3 className="text-xl font-bold mb-4">Add a Review</h3>
            <div className="mb-4">
              <Label htmlFor="rating">Rating</Label>
              <Select
                onValueChange={(value) => setNewReview({ ...newReview, rating: parseInt(value) })}
                value={newReview.rating.toString()}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select rating" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <SelectItem key={rating} value={rating.toString()}>
                      {rating}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Label htmlFor="comment">Comment</Label>
              <Textarea
                id="comment"
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                required
              />
            </div>
            <Button type="submit">Submit Review</Button>
          </form>
        )}
      </div>
    </div>
  )
}

