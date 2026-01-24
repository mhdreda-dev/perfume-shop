import { cookies } from "next/headers"
import * as jwt from "jsonwebtoken"

const SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production"

export async function createSession(adminId: number, email: string) {
  const token = jwt.sign({ adminId, email }, SECRET, { expiresIn: "24h" })
  const cookieStore = await cookies()
  cookieStore.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 24 * 60 * 60, // 24 hours
  })
  return token
}

export async function getSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get("auth_token")?.value

  if (!token) {
    return null
  }

  try {
    const decoded = jwt.verify(token, SECRET) as { adminId: number; email: string }
    return decoded
  } catch (error) {
    return null
  }
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete("auth_token")
}
