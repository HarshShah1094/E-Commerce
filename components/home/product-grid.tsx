"use client"

import { useDispatch } from "react-redux"
import type { AppDispatch } from "@/lib/store"
import { addToCart } from "@/lib/slices/cartSlice"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import Image from "next/image"

interface Product {
  id: number
  title: string
  description: string
  price: number
  image: string
  category: string
  rating: number
  stock: number
}

export default function ProductGrid({ products }: { products: Product[] }) {
  const dispatch = useDispatch<AppDispatch>()

  const handleAddToCart = (product: Product) => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      }),
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <div className="relative w-full h-48 bg-muted overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              fill
              className="object-cover"
              onError={(e) => {
                e.currentTarget.src = "/diverse-products-still-life.png"
              }}
            />
          </div>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-lg line-clamp-2">{product.title}</CardTitle>
                <CardDescription className="line-clamp-1">{product.category}</CardDescription>
              </div>
              <span className="text-sm bg-accent text-accent-foreground px-2 py-1 rounded">★ {product.rating}</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
              <span className="text-sm text-muted-foreground">{product.stock} in stock</span>
            </div>
            <Button className="w-full" onClick={() => handleAddToCart(product)} disabled={product.stock === 0}>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
