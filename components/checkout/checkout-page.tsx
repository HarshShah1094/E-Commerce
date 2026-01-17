"use client"

import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "@/lib/store"
import { clearCart } from "@/lib/slices/cartSlice"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import CartSummary from "./cart-summary"
import OrderForm from "./order-form"
import OrderConfirmation from "./order-confirmation"

export default function CheckoutPage() {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const { items, total } = useSelector((state: RootState) => state.cart)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const handlePlaceOrder = (formData: any) => {
    setOrderPlaced(true)
    dispatch(clearCart())
  }

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h1 className="text-4xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">Add some products to get started!</p>
            <Button onClick={() => router.push("/")}>Continue Shopping</Button>
          </div>
        </div>
      </div>
    )
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <OrderConfirmation />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <OrderForm onSubmit={handlePlaceOrder} />
          </div>

          <div className="lg:col-span-1">
            <CartSummary items={items} total={total} />
          </div>
        </div>
      </div>
    </div>
  )
}
