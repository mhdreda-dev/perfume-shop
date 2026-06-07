import { type NextRequest, NextResponse } from "next/server"
import { getAllPerfumes, createPerfume } from "@/lib/db"
import { normalizeProductGender } from "@/lib/product-gender"
import { getSession } from "@/lib/session"

export async function GET(request: NextRequest) {
  try {
    const perfumes = await getAllPerfumes()
    return NextResponse.json(perfumes, { status: 200 })
  } catch (error) {
    console.error("Error fetching perfumes:", error)
    return NextResponse.json({ error: "Failed to fetch perfumes" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { name, price, stock_quantity, image_url, description, notes } = body
    const gender = body.gender === undefined ? "unisexe" : normalizeProductGender(body.gender)

    if (!name || !price || stock_quantity === undefined || !image_url) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (!gender) {
      return NextResponse.json({ error: "Invalid gender" }, { status: 400 })
    }

    const perfume = await createPerfume(name, price, stock_quantity, image_url, description || "", notes || "", gender)

    return NextResponse.json(perfume, { status: 201 })
  } catch (error) {
    console.error("Error creating perfume:", error)
    return NextResponse.json({ error: "Failed to create perfume" }, { status: 500 })
  }
}
