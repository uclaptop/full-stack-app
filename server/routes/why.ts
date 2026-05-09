import { Router, Request, Response } from 'express';
import pool from '../db.js';
import { verifyToken, AuthRequest } from '../middleware/auth.js';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT * FROM why_choose_us WHERE is_active=true ORDER BY sort_order ASC, id ASC'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

router.get('/all', verifyToken, async (_req: AuthRequest, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM why_choose_us ORDER BY sort_order ASC, id ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

router.post('/', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const { point, sort_order } = req.body;
    const result = await pool.query(
      'INSERT INTO why_choose_us (point, sort_order, is_active) VALUES ($1,$2,true) RETURNING *',
      [point, sort_order || 0]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

router.put('/:id', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { point, sort_order, is_active } = req.body;
    const result = await pool.query(
      'UPDATE why_choose_us SET point=$1, sort_order=$2, is_active=$3 WHERE id=$4 RETURNING *',
      [point, sort_order || 0, is_active ?? true, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

router.delete('/:id', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    await pool.query('DELETE FROM why_choose_us WHERE id=$1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

export default router;
