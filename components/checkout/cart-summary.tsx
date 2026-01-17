"use client"

import { useDispatch } from "react-redux"
import type { AppDispatch } from "@/lib/store"
import { removeFromCart, updateQuantity } from "@/lib/slices/cartSlice"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash2 } from "lucide-react"
import Image from "next/image"

interface CartItem {
  id: number
  title: string
  price: number
  quantity: number
  image: string
}

interface CartSummaryProps {
  items: CartItem[]
  total: number
}

export default function CartSummary({ items, total }: CartSummaryProps) {
  const dispatch = useDispatch<AppDispatch>()

  const handleQuantityChange = (id: number, quantity: string) => {
    const qty = Number.parseInt(quantity) || 0
    dispatch(updateQuantity({ id, quantity: qty }))
  }

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id))
  }

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
        <CardDescription>{items.length} items in cart</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="max-h-96 overflow-y-auto space-y-4">
          {items.map((item) => (
            <div key={item.id} className="border-b pb-4 last:border-b-0">
              <div className="flex gap-3 mb-3">
                <div className="relative w-16 h-16 bg-muted rounded overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/diverse-products-still-life.png"
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm line-clamp-2">{item.title}</p>
                  <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <Input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  className="w-20 h-8"
                />
                <span className="text-sm text-muted-foreground">${(item.price * item.quantity).toFixed(2)}</span>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveItem(item.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Remove
              </Button>
            </div>
          ))}
        </div>

        <div className="border-t space-y-2 pt-4">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>${(total * 0.1).toFixed(2)}</span>
          </div>
          <div className="border-t pt-2 flex justify-between font-bold">
            <span>Total</span>
            <span>${(total * 1.1).toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
