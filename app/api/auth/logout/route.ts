import { createServerSupabaseClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    console.log("[v0] Logout API called")

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.json({ error: "Server configuration error: Missing Supabase credentials" }, { status: 500 })
    }

    const supabase = await createServerSupabaseClient()
    await supabase.auth.signOut()

    return NextResponse.json({ message: "Logged out successfully" })
  } catch (error) {
    console.error("[v0] Logout error:", error)
    return NextResponse.json(
      { error: `Server error: ${error instanceof Error ? error.message : "Unknown error"}` },
      { status: 500 },
    )
  }
}
