import { NextResponse } from 'next/server'

export type Review = {
  id: string
  productId: string
  userId: string
  rating: number
  comment: string
  createdAt: string
}

let reviews: Review[] = [
  {
    id: 'r1',
    productId: 'm1',
    userId: 'u1',
    rating: 5,
    comment: "Great t-shirt, very comfortable!",
    createdAt: new Date().toISOString()
  },
  // Add more reviews...
]

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const productId = searchParams.get('productId')
  
  if (productId) {
    const productReviews = reviews.filter(review => review.productId === productId)
    return NextResponse.json(productReviews)
  }
  
  return NextResponse.json(reviews)
}

export async function POST(request: Request) {
  const newReview: Review = await request.json()
  newReview.id = `r${reviews.length + 1}`
  newReview.createdAt = new Date().toISOString()
  reviews.push(newReview)
  return NextResponse.json(newReview)
}

