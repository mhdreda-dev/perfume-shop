import * as bcrypt from "bcryptjs"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash)
}

export async function getAdminByEmail(email: string) {
  try {
    const result = await sql`SELECT * FROM admin_users WHERE email = ${email}`
    return result[0] || null
  } catch (error) {
    console.error("Error fetching admin:", error)
    throw error
  }
}

export async function createAdmin(email: string, password: string) {
  try {
    const hashedPassword = await hashPassword(password)
    const result = await sql`INSERT INTO admin_users (email, password_hash) VALUES (${email}, ${hashedPassword}) RETURNING id, email`
    return result[0]
  } catch (error) {
    console.error("Error creating admin:", error)
    throw error
  }
}
