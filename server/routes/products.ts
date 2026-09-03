import { Router, Request, Response } from 'express';
import pool from '../db.js';
import { verifyToken, AuthRequest } from '../middleware/auth.js';

const router = Router();

// Public: get all active products
router.get('/', async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT * FROM products WHERE is_active = true ORDER BY sort_order ASC, id ASC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// Admin: get ALL products including inactive
router.get('/all', verifyToken, async (_req: AuthRequest, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT * FROM products ORDER BY sort_order ASC, id ASC'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// Admin: add product
router.post('/', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const { 
      name, brand, specs, category, tag, price, mrp, 
      image_url, secondary_image_url, gallery_images, 
      is_trending, description, sku, sort_order 
    } = req.body;
    const result = await pool.query(
      `INSERT INTO products (
        name, brand, specs, category, tag, price, mrp, 
        image_url, secondary_image_url, gallery_images, 
        is_trending, description, sku, sort_order, is_active
      )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, true) RETURNING *`,
      [
        name,
        brand || 'Dell',
        specs || '',
        category || 'Business',
        tag || '',
        price || 0,
        mrp || 0,
        image_url,
        secondary_image_url || '',
        gallery_images || '',
        Boolean(is_trending),
        description || '',
        sku || '',
        sort_order || 0
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// Admin: update product
router.put('/:id', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { 
      name, brand, specs, category, tag, price, mrp, 
      image_url, secondary_image_url, gallery_images, 
      is_trending, description, sku, sort_order, is_active 
    } = req.body;
    const result = await pool.query(
      `UPDATE products 
       SET name=$1, brand=$2, specs=$3, category=$4, tag=$5, price=$6, mrp=$7, 
           image_url=$8, secondary_image_url=$9, gallery_images=$10, is_trending=$11, 
           description=$12, sku=$13, sort_order=$14, is_active=$15
       WHERE id=$16 RETURNING *`,
      [
        name,
        brand || 'Dell',
        specs || '',
        category || 'Business',
        tag || '',
        price || 0,
        mrp || 0,
        image_url,
        secondary_image_url || '',
        gallery_images || '',
        Boolean(is_trending),
        description || '',
        sku || '',
        sort_order || 0,
        is_active ?? true,
        id
      ]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found.' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// Admin: delete product
router.delete('/:id', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM products WHERE id=$1', [id]);
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
      'UPDATE products SET is_active = NOT is_active WHERE id=$1 RETURNING *',
      [id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// Admin: toggle trending status
router.put('/:id/toggle-trending', verifyToken, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'UPDATE products SET is_trending = NOT is_trending WHERE id=$1 RETURNING *',
      [id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

export default router;
