"use client"

import type React from "react"

import { useState } from "react"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "@/lib/store"
import { setLoading, loginSuccess, loginFailure } from "@/lib/slices/authSlice"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setErrorLocal] = useState("")
  const [loading, setLoadingLocal] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorLocal("")
    setLoadingLocal(true)
    dispatch(setLoading(true))

    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Login failed")
      }

      const data = await response.json()
      dispatch(loginSuccess({ user: data, token: data.token }))
    } catch (err: any) {
      const errorMsg = err.message || "An error occurred during login"
      setErrorLocal(errorMsg)
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
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                Username
              </label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">Try: emilys, michaelw, sophiab</p>
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
              <p className="text-xs text-muted-foreground">Try: emilyspass, michaelwpass, sophiabpass</p>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
