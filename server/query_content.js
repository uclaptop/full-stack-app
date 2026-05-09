import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function main() {
  const result = await pool.query("SELECT section, key, value FROM site_content WHERE section='hero'");
  console.log("=== CURRENT HERO SECTION CONTENT IN DATABASE ===");
  console.log(JSON.stringify(result.rows, null, 2));
  await pool.end();
}

main().catch(console.error);
