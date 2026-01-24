import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

function mapPerfume(row: any) {
  if (!row) return null
  return {
    ...row,
    id: Number(row.id),
    price: typeof row.price === "string" ? parseFloat(row.price) : Number(row.price),
    stock_quantity: Number(row.stock_quantity),
    is_active: Boolean(row.is_active),
  }
}

export async function getAllPerfumes() {
  try {
    const result = await sql`SELECT * FROM perfumes WHERE is_active = true ORDER BY created_at DESC`
    return result.map(mapPerfume)
  } catch (error) {
    console.error("Error fetching perfumes:", error)
    throw error
  }
}

export async function getPerfumeById(id: number) {
  try {
    const result = await sql`SELECT * FROM perfumes WHERE id = ${id} AND is_active = true`
    return mapPerfume(result[0])
  } catch (error) {
    console.error("Error fetching perfume:", error)
    throw error
  }
}

export async function createPerfume(
  name: string,
  price: number,
  stock_quantity: number,
  image_url: string,
  description: string,
  notes: string,
) {
  try {
    const result = await sql`INSERT INTO perfumes (name, price, stock_quantity, image_url, description, notes) VALUES (${name}, ${price}, ${stock_quantity}, ${image_url}, ${description}, ${notes}) RETURNING *`
    return mapPerfume(result[0])
  } catch (error) {
    console.error("Error creating perfume:", error)
    throw error
  }
}

export async function updatePerfume(
  id: number,
  name: string,
  price: number,
  stock_quantity: number,
  image_url: string,
  description: string,
  notes: string,
) {
  try {
    const result = await sql`UPDATE perfumes SET name = ${name}, price = ${price}, stock_quantity = ${stock_quantity}, image_url = ${image_url}, description = ${description}, notes = ${notes}, updated_at = CURRENT_TIMESTAMP WHERE id = ${id} RETURNING *`
    return mapPerfume(result[0])
  } catch (error) {
    console.error("Error updating perfume:", error)
    throw error
  }
}

export async function deletePerfume(id: number) {
  try {
    await sql`UPDATE perfumes SET is_active = false WHERE id = ${id}`
    return true
  } catch (error) {
    console.error("Error deleting perfume:", error)
    throw error
  }
}
