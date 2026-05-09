import { Router, Request, Response } from 'express';
import pool from '../db.js';
import { verifyToken, AuthRequest } from '../middleware/auth.js';

const router = Router();

// Public: get all content as flat key-value map
router.get('/', async (_req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT section, key, value FROM site_content');
    const flat: Record<string, string> = {};
    for (const row of result.rows) {
      flat[`${row.section}.${row.key}`] = row.value;
    }
    res.json(flat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// Admin: bulk update content (array of { section, key, value })
router.put('/', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const updates: Array<{ section: string; key: string; value: string }> = req.body;
    for (const item of updates) {
      await pool.query(
        `INSERT INTO site_content (section, key, value, updated_at)
         VALUES ($1, $2, $3, NOW())
         ON CONFLICT (section, key) DO UPDATE SET value=$3, updated_at=NOW()`,
        [item.section, item.key, item.value]
      );
    }
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error.' });
  }
});

export default router;
