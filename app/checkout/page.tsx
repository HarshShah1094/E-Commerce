"use client"

import { useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Navbar } from "@/components/navbar"
import CheckoutPage from "@/components/checkout/checkout-page"

export default function Page() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div>
      <Navbar />
      <CheckoutPage />
    </div>
  )
}
