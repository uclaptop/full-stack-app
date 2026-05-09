import { Router, Request, Response } from 'express';
import pool from '../db.js';
import { verifyToken, AuthRequest } from '../middleware/auth.js';

const router = Router();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT * FROM services WHERE is_active=true ORDER BY sort_order ASC, id ASC'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

router.get('/all', verifyToken, async (_req: AuthRequest, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM services ORDER BY sort_order ASC, id ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

router.post('/', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, icon_name, sort_order } = req.body;
    const result = await pool.query(
      `INSERT INTO services (title, description, icon_name, sort_order, is_active)
       VALUES ($1,$2,$3,$4,true) RETURNING *`,
      [title, description, icon_name || 'Laptop', sort_order || 0]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

router.put('/:id', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, icon_name, sort_order, is_active } = req.body;
    const result = await pool.query(
      `UPDATE services SET title=$1, description=$2, icon_name=$3, sort_order=$4, is_active=$5
       WHERE id=$6 RETURNING *`,
      [title, description, icon_name, sort_order || 0, is_active ?? true, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

router.delete('/:id', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    await pool.query('DELETE FROM services WHERE id=$1', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

export default router;
