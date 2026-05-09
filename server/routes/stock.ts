import { Router, Request, Response } from 'express';
import pool from '../db.js';
import { verifyToken, AuthRequest } from '../middleware/auth.js';

const router = Router();

// Public: get active stock items
router.get('/', async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT * FROM current_stock WHERE is_active = true ORDER BY sort_order ASC, id ASC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// Admin: get all stock items including inactive
router.get('/all', verifyToken, async (_req: AuthRequest, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT * FROM current_stock ORDER BY sort_order ASC, id ASC'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// Admin: add stock item
router.post('/', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const { name, image_url, sort_order } = req.body;
    const result = await pool.query(
      `INSERT INTO current_stock (name, image_url, sort_order, is_active)
       VALUES ($1, $2, $3, true) RETURNING *`,
      [name, image_url, sort_order || 0]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// Admin: update stock item
router.put('/:id', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { name, image_url, sort_order, is_active } = req.body;
    const result = await pool.query(
      `UPDATE current_stock SET name=$1, image_url=$2, sort_order=$3, is_active=$4
       WHERE id=$5 RETURNING *`,
      [name, image_url, sort_order || 0, is_active ?? true, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found.' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// Admin: delete stock item
router.delete('/:id', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM current_stock WHERE id=$1', [id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// Admin: toggle active status
router.put('/:id/toggle', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'UPDATE current_stock SET is_active = NOT is_active WHERE id=$1 RETURNING *',
      [id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

export default router;
