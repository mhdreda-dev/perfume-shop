import { neon } from "@neondatabase/serverless"
import { readFileSync, existsSync } from "fs"
import { resolve } from "path"

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

async function migrateDatabase() {
  try {
    console.log("🔄 Starting database migration...")

    // Step 1: Drop existing tables (if any)
    console.log("📍 Step 1: Dropping existing tables...")
    try {
      await sql.query("DROP TABLE IF EXISTS perfumes CASCADE")
      console.log("✓ Dropped perfumes table (if existed)")
    } catch (error) {
      console.log("✓ No existing tables to drop")
    }

    try {
      await sql.query("DROP TABLE IF EXISTS admin_users CASCADE")
      console.log("✓ Dropped admin_users table (if existed)")
    } catch (error) {
      console.log("✓ No existing admin_users table to drop")
    }

    // Step 2: Read and execute new schema
    console.log("📍 Step 2: Creating new schema...")
    const sqlFile = readFileSync(resolve("scripts/init-db.sql"), "utf-8")

    const statements = sqlFile
      .split(";")
      .map((stmt) => stmt.trim())
      .filter((stmt) => stmt.length > 0)

    console.log(`Found ${statements.length} SQL statements to execute...`)

    for (const statement of statements) {
      console.log(`  → Executing: ${statement.substring(0, 50)}...`)
      await sql.query(statement)
    }

    console.log("✅ Database migration completed successfully!")
    console.log("")
    console.log("Summary:")
    console.log("  ✓ All tables dropped")
    console.log("  ✓ New schema created with updated field sizes")
    console.log("  ✓ image_url field now supports up to 2000 characters")
    console.log("")
    console.log("You can now use the application!")

    process.exit(0)
  } catch (error) {
    console.error("❌ Error during database migration:", error)
    process.exit(1)
  }
}

migrateDatabase()
