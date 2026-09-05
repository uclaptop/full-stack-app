import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_AIgX05nalFjt@ep-quiet-truth-b3m8nr3g-pooler.c-4.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: { rejectUnauthorized: false },
});

async function main() {
  await pool.query(
    `INSERT INTO site_content (section, key, value, updated_at)
     VALUES ('contact', 'email', 'uclaptopstore@gmail.com', NOW())
     ON CONFLICT (section, key) DO UPDATE SET value = 'uclaptopstore@gmail.com', updated_at = NOW()`
  );
  console.log("✅ Official email successfully updated to uclaptopstore@gmail.com in Neon DB!");
  await pool.end();
}

main().catch(console.error);
