import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL || '';

const isSslRequired = () => {
  if (process.env.DATABASE_SSL === 'true') return { rejectUnauthorized: false };
  if (process.env.DATABASE_SSL === 'false') return false;
  if (!connectionString) return false;
  if (
    connectionString.includes('localhost') ||
    connectionString.includes('127.0.0.1') ||
    connectionString.includes('sslmode=disable')
  ) {
    return false;
  }
  if (
    connectionString.includes('sslmode=require') ||
    connectionString.includes('supabase.co') ||
    connectionString.includes('neon.tech') ||
    connectionString.includes('aws') ||
    connectionString.includes('render.com') ||
    connectionString.includes('railway.app')
  ) {
    return { rejectUnauthorized: false };
  }
  return false;
};

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isSslRequired(),
});

export default pool;
