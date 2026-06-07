import { neon } from "@neondatabase/serverless"
import { readFileSync, existsSync } from "fs"
import { resolve } from "path"

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
  console.error("ERROR: DATABASE_URL is not set in .env.local or environment")
  process.exit(1)
}

const sql = neon(DATABASE_URL)

async function migrateGender() {
  try {
    console.log("Starting gender field migration...")

    await sql.query("ALTER TABLE perfumes ADD COLUMN IF NOT EXISTS gender VARCHAR(20)")
    await sql.query("UPDATE perfumes SET gender = 'unisexe' WHERE gender IS NULL OR gender NOT IN ('homme', 'femme', 'unisexe')")
    await sql.query("ALTER TABLE perfumes ALTER COLUMN gender SET DEFAULT 'unisexe'")
    await sql.query("ALTER TABLE perfumes ALTER COLUMN gender SET NOT NULL")
    await sql.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1
          FROM pg_constraint
          WHERE conname = 'perfumes_gender_check'
        ) THEN
          ALTER TABLE perfumes
          ADD CONSTRAINT perfumes_gender_check
          CHECK (gender IN ('homme', 'femme', 'unisexe'));
        END IF;
      END
      $$;
    `)

    console.log("Gender field migration completed successfully.")
    process.exit(0)
  } catch (error) {
    console.error("Error during gender field migration:", error)
    process.exit(1)
  }
}

migrateGender()
