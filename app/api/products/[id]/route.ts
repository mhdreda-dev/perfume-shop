import { type NextRequest, NextResponse } from "next/server"
import { getPerfumeById, updatePerfume, deletePerfume } from "@/lib/db"
import { getSession } from "@/lib/session"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const perfume = await getPerfumeById(id)

    if (!perfume) {
      return NextResponse.json({ error: "Perfume not found" }, { status: 404 })
    }

    return NextResponse.json(perfume, { status: 200 })
  } catch (error) {
    console.error("Error fetching perfume:", error)
    return NextResponse.json({ error: "Failed to fetch perfume" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = Number.parseInt(params.id)
    const body = await request.json()
    const { name, price, stock_quantity, image_url, description, notes } = body

    if (!name || !price || stock_quantity === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const perfume = await updatePerfume(
      id,
      name,
      price,
      stock_quantity,
      image_url || "",
      description || "",
      notes || "",
    )

    return NextResponse.json(perfume, { status: 200 })
  } catch (error) {
    console.error("Error updating perfume:", error)
    return NextResponse.json({ error: "Failed to update perfume" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getSession()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = Number.parseInt(params.id)
    await deletePerfume(id)

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Error deleting perfume:", error)
    return NextResponse.json({ error: "Failed to delete perfume" }, { status: 500 })
  }
}
