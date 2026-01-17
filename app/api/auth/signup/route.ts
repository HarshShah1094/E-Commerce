import { createServerSupabaseClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/request"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Signup API called")
    console.log("[v0] Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL ? "Set" : "Missing")
    console.log("[v0] Supabase Key:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Set" : "Missing")

    const { email, password, fullName } = await request.json()

    // Validate input
    if (!email || !password || !fullName) {
      return NextResponse.json({ error: "Email, password, and full name are required" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.json(
        {
          error:
            "Server configuration error: Missing Supabase credentials. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your environment variables.",
        },
        { status: 500 },
      )
    }

    const supabase = await createServerSupabaseClient()

    // Sign up with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (authError) {
      console.log("[v0] Auth error:", authError.message)
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }

    if (!authData.user) {
      return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
    }

    return NextResponse.json(
      {
        message: "Signup successful! Please check your email to confirm.",
        user: {
          id: authData.user.id,
          email: authData.user.email,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] Signup error:", error)
    return NextResponse.json(
      { error: `Server error: ${error instanceof Error ? error.message : "Unknown error"}` },
      { status: 500 },
    )
  }
}
