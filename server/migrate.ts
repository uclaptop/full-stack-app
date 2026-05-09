import dotenv from 'dotenv';
import pool from './db.js';

dotenv.config();

async function migrate() {
  console.log('🔄 Running database migration...');
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // 1. Create current_stock table for the Gallery / Current Stock section
    await client.query(`
      CREATE TABLE IF NOT EXISTS current_stock (
        id SERIAL PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        image_url TEXT NOT NULL,
        sort_order INT DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✅ Created current_stock table');

    // 2. Add new columns to products table if they do not exist
    await client.query(`
      ALTER TABLE products ADD COLUMN IF NOT EXISTS brand VARCHAR(100) DEFAULT '';
      ALTER TABLE products ADD COLUMN IF NOT EXISTS specs TEXT DEFAULT '';
      ALTER TABLE products ADD COLUMN IF NOT EXISTS tag VARCHAR(100) DEFAULT '';
      ALTER TABLE products ADD COLUMN IF NOT EXISTS price VARCHAR(100) DEFAULT '';
    `);
    console.log('✅ Added brand, specs, tag, price columns to products table');

    // 3. Populate products table with fully featured products from src/data/products.ts
    const productsData = [
      { name: 'Dell Latitude 3570', brand: 'Dell', specs: 'i3 6th Gen | 8GB | 256GB SSD', category: 'Student', tag: 'Offer', image: '/Dell Latitude  3570.png', order: 1 },
      { name: 'Dell Latitude 5570', brand: 'Dell', specs: 'i5 6th Gen | 8GB | 256GB SSD', category: 'Business', tag: '', image: '/Dell Latitude  5570.png', order: 2 },
      { name: 'Dell Precision 7540', brand: 'Dell', specs: 'i7 9th Gen | 16GB | 512GB SSD', category: 'High Performance', tag: 'Best Seller', image: '/Dell Latitude  7540.png', order: 3 },
      { name: 'Dell Latitude 5420', brand: 'Dell', specs: 'i5 11th Gen | 8GB | 256GB SSD', category: 'Business', tag: 'New', image: '/Dell Latitude 5420.png', order: 4 },
      { name: 'Dell Latitude 5490', brand: 'Dell', specs: 'i5 8th Gen | 8GB | 256GB SSD', category: 'Business', tag: '', image: '/Dell latitude  5490.png', order: 5 },
      { name: 'Dell Latitude 5580', brand: 'Dell', specs: 'i7 7th Gen | 8GB | 256GB SSD', category: 'High Performance', tag: '', image: '/Dell latitude  5580.png', order: 6 },
      { name: 'Dell Latitude 3400', brand: 'Dell', specs: 'i5 8th Gen | 8GB | 256GB SSD', category: 'Student', tag: '', image: '/Dell latitude 3400.png', order: 7 },
      { name: 'Dell Latitude 3480', brand: 'Dell', specs: 'i5 7th Gen | 8GB | 256GB SSD', category: 'Student', tag: '', image: '/Dell latitude 3480.png', order: 8 },
      { name: 'Dell Latitude 5400', brand: 'Dell', specs: 'i5 8th Gen | 8GB | 256GB SSD', category: 'Business', tag: 'Best Seller', image: '/Dell latitude 5400.png', order: 9 },
      { name: 'Dell Precision 5530', brand: 'Dell', specs: 'i7 8th Gen | 16GB | 512GB SSD | 4GB GPU', category: 'Developer', tag: '', image: '/Dell precision 5530.png', order: 10 },
      { name: 'HP EliteBook 745 G6', brand: 'HP', specs: 'Ryzen 5 | 8GB | 256GB SSD', category: 'Business', tag: '', image: '/Hp Elitebook  745 G6.png', order: 11 },
      { name: 'HP EliteBook 840 G3', brand: 'HP', specs: 'i5 6th Gen | 8GB | 256GB SSD', category: 'Business', tag: 'Offer', image: '/Hp Elitebook 840 G3.png', order: 12 },
      { name: 'HP EliteBook 840 G5', brand: 'HP', specs: 'i5 8th Gen | 8GB | 256GB SSD', category: 'Business', tag: '', image: '/Hp Elitebook 840 G5.png', order: 13 },
      { name: 'HP ProBook 640 G5', brand: 'HP', specs: 'i5 8th Gen | 8GB | 256GB SSD', category: 'Business', tag: '', image: '/Hp probook 640 G5.png', order: 14 },
      { name: 'Lenovo ThinkPad T490', brand: 'Lenovo', specs: 'i5 8th Gen | 8GB | 256GB SSD', category: 'Business', tag: 'Best Seller', image: '/T490.png', order: 15 },
      { name: 'Dell Latitude 5550', brand: 'Dell', specs: 'i5 5th Gen | 8GB | 256GB SSD', category: 'Business', tag: '', image: '/dell latitude 5550.png', order: 16 }
    ];

    // Delete simple products and re-populate with detailed ones
    await client.query('DELETE FROM products');
    for (const p of productsData) {
      await client.query(
        `INSERT INTO products (name, brand, specs, category, tag, image_url, sort_order, is_active)
         VALUES ($1, $2, $3, $4, $5, $6, $7, true)`,
        [p.name, p.brand, p.specs, p.category, p.tag, p.image, p.order]
      );
    }
    console.log(`✅ Seeded ${productsData.length} fully-featured products`);

    // 4. Populate current_stock table with gallery items
    const galleryItems = [
      { name: 'Dell Latitude 3570', image_url: '/Dell Latitude  3570.png', order: 1 },
      { name: 'Dell Latitude 5570', image_url: '/Dell Latitude  5570.png', order: 2 },
      { name: 'Dell Latitude 7540', image_url: '/Dell Latitude  7540.png', order: 3 },
      { name: 'Dell Latitude 5420', image_url: '/Dell Latitude 5420.png', order: 4 },
      { name: 'Dell Latitude 5490', image_url: '/Dell latitude  5490.png', order: 5 },
      { name: 'Dell Latitude 5580', image_url: '/Dell latitude  5580.png', order: 6 },
      { name: 'Dell Latitude 3400', image_url: '/Dell latitude 3400.png', order: 7 },
      { name: 'Dell Latitude 3480', image_url: '/Dell latitude 3480.png', order: 8 },
      { name: 'Dell Latitude 5400', image_url: '/Dell latitude 5400.png', order: 9 },
      { name: 'Dell Precision 5530', image_url: '/Dell precision 5530.png', order: 10 },
      { name: 'HP EliteBook 745 G6', image_url: '/Hp Elitebook  745 G6.png', order: 11 },
      { name: 'HP EliteBook 840 G3', image_url: '/Hp Elitebook 840 G3.png', order: 12 },
      { name: 'HP EliteBook 840 G5', image_url: '/Hp Elitebook 840 G5.png', order: 13 },
      { name: 'HP ProBook 640 G5', image_url: '/Hp probook 640 G5.png', order: 14 },
      { name: 'Lenovo ThinkPad T490', image_url: '/T490.png', order: 15 },
      { name: 'Dell Latitude 5550', image_url: '/dell latitude 5550.png', order: 16 }
    ];

    for (const item of galleryItems) {
      await client.query(
        `INSERT INTO current_stock (name, image_url, sort_order, is_active)
         VALUES ($1, $2, $3, true)`,
        [item.name, item.image_url, item.order]
      );
    }
    console.log(`✅ Seeded ${galleryItems.length} current stock/gallery items`);

    await client.query('COMMIT');
    console.log('🎉 Migration & Seed completed successfully!');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Migration failed:', err);
    throw err;
  } finally {
    client.release();
    process.exit(0);
  }
}

migrate();
