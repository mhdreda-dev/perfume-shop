import { neon } from "@neondatabase/serverless"
import * as bcrypt from "bcryptjs"
import { readFileSync, existsSync } from "fs"
import { resolve } from "path"
import readline from "readline/promises"
import { stdin as input, stdout as output } from "process"

// Load .env.local if present
const envPath = resolve(".env.local")
if (existsSync(envPath)) {
  const envRaw = readFileSync(envPath, "utf8")
  for (const line of envRaw.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith("#")) continue
    const eq = trimmed.indexOf("=")
    if (eq === -1) continue
    const key = trimmed.substring(0, eq).trim()
    let val = trimmed.substring(eq + 1).trim()
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.substring(1, val.length - 1)
    }
    if (!process.env[key]) process.env[key] = val
  }
}

const DATABASE_URL = process.env.DATABASE_URL
if (!DATABASE_URL) {
  console.error("ERROR: DATABASE_URL is not set in environment or .env.local")
  process.exit(1)
}

const sql = neon(DATABASE_URL)

async function adminExists(email) {
  const res = await sql.query("SELECT id FROM admin_users WHERE email = $1", [email])
  return Array.isArray(res) ? res.length > 0 : (res && res[0])
}

async function createAdmin(email, password) {
  const hashed = await bcrypt.hash(password, 10)
  const result = await sql.query(
    "INSERT INTO admin_users (email, password_hash) VALUES ($1, $2) RETURNING id, email",
    [email, hashed],
  )
  return result[0]
}

function parseArgs() {
  const args = process.argv.slice(2)
  const out = {}
  for (let i = 0; i < args.length; i++) {
    const a = args[i]
    if (a === "--email" || a === "-e") out.email = args[i + 1], i++
    else if (a === "--password" || a === "-p") out.password = args[i + 1], i++
  }
  return out
}

async function run() {
  try {
    const cli = parseArgs()
    const rl = readline.createInterface({ input, output })

    const email = cli.email || (await rl.question("Admin email: "))
    let password = cli.password
    if (!password) {
      // mask not supported by readline/promises, print note
      password = await rl.question("Password (input will be visible): ")
    }

    rl.close()

    if (!email || !password) {
      console.error("Email and password are required")
      process.exit(1)
    }

    const exists = await adminExists(email)
    if (exists) {
      console.error(`Admin with email ${email} already exists.`)
      process.exit(1)
    }

    const admin = await createAdmin(email, password)
    console.log("✅ Admin created:", admin)
    process.exit(0)
  } catch (err) {
    console.error("❌ Failed to create admin:", err)
    process.exit(1)
  }
}

run()
