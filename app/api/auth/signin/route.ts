import { createServerSupabaseClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Signin API called")
    console.log("[v0] Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL ? "Set" : "Missing")
    console.log("[v0] Supabase Key:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Set" : "Missing")

    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
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

    // Sign in with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      console.log("[v0] Auth error:", authError.message)
      return NextResponse.json({ error: authError.message }, { status: 401 })
    }

    if (!authData.user || !authData.session) {
      return NextResponse.json({ error: "Failed to sign in" }, { status: 500 })
    }

    return NextResponse.json(
      {
        user: {
          id: authData.user.id,
          email: authData.user.email,
        },
        session: authData.session,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Signin error:", error)
    return NextResponse.json(
      { error: `Server error: ${error instanceof Error ? error.message : "Unknown error"}` },
      { status: 500 },
    )
  }
}
