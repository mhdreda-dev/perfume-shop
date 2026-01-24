import { neon } from "@neondatabase/serverless"
import { readFileSync, existsSync } from "fs"
import { resolve } from "path"

// Load .env.local if present (simple parser, no external deps)
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
    // Remove surrounding quotes
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.substring(1, val.length - 1)
    }
    if (!process.env[key]) process.env[key] = val
  }
}

const DATABASE_URL = process.env.DATABASE_URL

if (!DATABASE_URL) {
  console.error("ERROR: DATABASE_URL is not set in .env.local or environment")
  process.exit(1)
}

const sql = neon(DATABASE_URL)

async function initDatabase() {
  try {
    console.log("Reading SQL schema file...")
    const sqlFile = readFileSync(resolve("scripts/init-db.sql"), "utf-8")

    // Split by semicolon to run statements one by one
    const statements = sqlFile
      .split(";")
      .map((stmt) => stmt.trim())
      .filter((stmt) => stmt.length > 0)

    console.log(`Found ${statements.length} SQL statements to execute...`)

    for (const statement of statements) {
      console.log(`Executing: ${statement.substring(0, 60)}...`)
      // Use sql.query for raw SQL strings (non-tagged usage)
      await sql.query(statement)
    }

    console.log("✅ Database initialized successfully!")
    process.exit(0)
  } catch (error) {
    console.error("❌ Error initializing database:", error)
    process.exit(1)
  }
}

initDatabase()
