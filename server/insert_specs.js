import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function main() {
  const specs = [
    { section: 'hero', key: 'spec_condition', value: 'A+++ Scratchless' },
    { section: 'hero', key: 'spec_testing', value: '40-Point QC' },
    { section: 'hero', key: 'spec_warranty', value: 'Standard Support' },
    { section: 'hero', key: 'spec_region', value: 'Imported Quality' },
  ];

  for (const s of specs) {
    await pool.query(
      `INSERT INTO site_content (section, key, value, updated_at)
       VALUES ($1, $2, $3, NOW())
       ON CONFLICT (section, key) DO UPDATE SET value=$3, updated_at=NOW()`,
      [s.section, s.key, s.value]
    );
  }

  console.log("✅ Hero spec cards successfully seeded in site_content database!");
  await pool.end();
}

main().catch(console.error);
