import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function main() {
  const socials = [
    { section: 'footer', key: 'instagram_url', value: 'https://www.instagram.com/_universal_computers_?igsh=bHNrYzMxNHAyNjJl' },
    { section: 'footer', key: 'youtube_url', value: 'https://www.youtube.com/@UniversalComputerspdtr' },
    { section: 'footer', key: 'facebook_url', value: 'https://www.facebook.com/share/14bJmiFVj6T/' },
  ];

  for (const s of socials) {
    await pool.query(
      `INSERT INTO site_content (section, key, value, updated_at)
       VALUES ($1, $2, $3, NOW())
       ON CONFLICT (section, key) DO UPDATE SET value=$3, updated_at=NOW()`,
      [s.section, s.key, s.value]
    );
  }

  console.log("✅ Social media links successfully updated in the database!");
  await pool.end();
}

main().catch(console.error);
