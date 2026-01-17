"use client"

import Link from "next/link"
import { useSelector, useDispatch } from "react-redux"
import type { RootState, AppDispatch } from "@/lib/store"
import { logout } from "@/lib/slices/authSlice"
import { Button } from "@/components/ui/button"
import { ShoppingCart, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export function Navbar() {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth)
  const cartItemsCount = useSelector((state: RootState) => state.cart.items.length)

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" })
    dispatch(logout())
    router.push("/auth/signin")
  }

  return (
    <nav className="bg-primary text-primary-foreground shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          ShopHub
        </Link>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <span className="text-sm">Welcome, {user?.email || user?.username}</span>
              <Link href="/checkout">
                <Button variant="secondary" size="sm" className="relative">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Cart
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {cartItemsCount}
                    </span>
                  )}
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-primary-foreground hover:text-primary-foreground/80"
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth/signin">
                <Button variant="secondary" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button variant="default" size="sm">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
