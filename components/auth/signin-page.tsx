"use client"

import type React from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import Link from "next/link"
import type { AppDispatch } from "@/lib/store"
import { loginSuccess, loginFailure, setLoading } from "@/lib/slices/authSlice"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function SigninPage() {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoadingLocal] = useState(false)

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoadingLocal(true)
    dispatch(setLoading(true))

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Signin failed")
      }

      dispatch(loginSuccess({ user: data.user, token: data.session.access_token }))
      router.push("/")
    } catch (err: any) {
      const errorMsg = err.message || "An error occurred during signin"
      setError(errorMsg)
      dispatch(loginFailure(errorMsg))
    } finally {
      setLoadingLocal(false)
      dispatch(setLoading(false))
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl">Welcome to ShopHub</CardTitle>
          <CardDescription>Sign in to your account to continue shopping</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignin} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-2">
                    <div>{error}</div>
                    {error.includes("Invalid login credentials") && (
                      <div className="text-xs mt-2">
                        <p>• Make sure you've created an account via Sign Up</p>
                        <p>• Check that email confirmation is disabled in Supabase settings</p>
                      </div>
                    )}
                  </div>
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link href="/auth/signup" className="text-primary hover:underline font-medium">
                Sign Up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
