"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"

export default function OrderConfirmation() {
  const router = useRouter()

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardContent className="pt-12 pb-8 text-center">
          <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-3">Order Placed Successfully!</h1>
          <p className="text-muted-foreground mb-6 text-lg">
            Thank you for your purchase. Your order has been confirmed and will be shipped shortly.
          </p>
          <div className="bg-muted p-6 rounded-lg mb-8 text-left">
            <p className="text-sm font-medium mb-2">Order Confirmation Details:</p>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>Order confirmation email will be sent to your email address</li>
              <li>You can track your order status on your account dashboard</li>
              <li>Estimated delivery: 5-7 business days</li>
            </ul>
          </div>
          <div className="space-y-3">
            <Button className="w-full" size="lg" onClick={() => router.push("/")}>
              Continue Shopping
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
