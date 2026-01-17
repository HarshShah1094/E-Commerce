"use client"

import { useSelector } from "react-redux"
import type { RootState } from "@/lib/store"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import HomePage from "@/components/home/home-page"
import LoginPage from "@/components/auth/login-page"

export default function Page() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  const router = useRouter()

  return (
    <div>
      <Navbar />
      {isAuthenticated ? <HomePage /> : <LoginPage />}
    </div>
  )
}
