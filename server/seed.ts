import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import pool from './db.js';

dotenv.config();

async function seed() {
  console.log('🌱 Seeding database...');
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // ── Create Tables ─────────────────────────────────────────────────────
    await client.query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        brand VARCHAR(100) DEFAULT 'Dell',
        specs TEXT DEFAULT '',
        category VARCHAR(100) DEFAULT 'Business',
        tag VARCHAR(50) DEFAULT '',
        price NUMERIC DEFAULT 0,
        mrp NUMERIC DEFAULT 0,
        image_url TEXT NOT NULL,
        sort_order INT DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT NOW()
      );

      ALTER TABLE products ADD COLUMN IF NOT EXISTS brand VARCHAR(100) DEFAULT 'Dell';
      ALTER TABLE products ADD COLUMN IF NOT EXISTS specs TEXT DEFAULT '';
      ALTER TABLE products ADD COLUMN IF NOT EXISTS price NUMERIC DEFAULT 0;
      ALTER TABLE products ADD COLUMN IF NOT EXISTS mrp NUMERIC DEFAULT 0;
      ALTER TABLE products ADD COLUMN IF NOT EXISTS tag VARCHAR(50) DEFAULT '';
      ALTER TABLE products ADD COLUMN IF NOT EXISTS secondary_image_url TEXT DEFAULT '';
      ALTER TABLE products ADD COLUMN IF NOT EXISTS is_trending BOOLEAN DEFAULT false;
      ALTER TABLE products ADD COLUMN IF NOT EXISTS gallery_images TEXT DEFAULT '';
      ALTER TABLE products ADD COLUMN IF NOT EXISTS description TEXT DEFAULT '';
      ALTER TABLE products ADD COLUMN IF NOT EXISTS sku VARCHAR(100) DEFAULT '';

      CREATE TABLE IF NOT EXISTS current_stock (
        id SERIAL PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        image_url TEXT NOT NULL,
        sort_order INT DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS services (
        id SERIAL PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        description TEXT NOT NULL,
        icon_name VARCHAR(100) DEFAULT 'Laptop',
        sort_order INT DEFAULT 0,
        is_active BOOLEAN DEFAULT true
      );

      CREATE TABLE IF NOT EXISTS why_choose_us (
        id SERIAL PRIMARY KEY,
        point TEXT NOT NULL,
        sort_order INT DEFAULT 0,
        is_active BOOLEAN DEFAULT true
      );

      CREATE TABLE IF NOT EXISTS site_content (
        id SERIAL PRIMARY KEY,
        section VARCHAR(100) NOT NULL,
        key VARCHAR(100) NOT NULL,
        value TEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(section, key)
      );
    `);

    console.log('✅ Tables created');

    // ── Admin User ─────────────────────────────────────────────────────────
    const hash = await bcrypt.hash('UC@admin2024', 12);
    await client.query(`
      INSERT INTO admin_users (username, password_hash)
      VALUES ('admin', $1)
      ON CONFLICT (username) DO NOTHING
    `, [hash]);
    console.log('✅ Admin user: admin / UC@admin2024');

    // ── Products ───────────────────────────────────────────────────────────
    const products = [
      { name: 'HP ProBook 650 G5 i5 8th Gen Refurbished Laptop', brand: 'HP', specs: 'i5 8th Gen | 8GB DDR4 | 256GB NVMe SSD', category: 'Business', price: 29795, mrp: 81000, tag: 'Best Seller', image_url: '/Hp probook 640 G5.png', sort_order: 1 },
      { name: 'HP EliteBook 820 G3 i5 6th Gen Refurbished Laptop', brand: 'HP', specs: 'i5 6th Gen | 8GB DDR4 | 256GB SSD', category: 'Student', price: 18620, mrp: 54000, tag: 'Offer', image_url: '/Hp Elitebook 840 G3.png', sort_order: 2 },
      { name: 'Dell Latitude 5580 i7 7th Gen Refurbished Laptop', brand: 'Dell', specs: 'i7 7th Gen | 8GB DDR4 | 256GB SSD', category: 'High Performance', price: 26566, mrp: 76000, tag: 'Best Seller', image_url: '/Dell latitude  5580.png', sort_order: 3 },
      { name: 'Dell Latitude 5420 i7 11th Gen Refurbished Laptop', brand: 'Dell', specs: 'i7 11th Gen | 16GB DDR4 | 512GB SSD', category: 'Developer', price: 33895, mrp: 86000, tag: 'New', image_url: '/Dell Latitude 5420.png', sort_order: 4 },
      { name: 'Dell Latitude 7420 i7 11th Gen Refurbished Laptop', brand: 'Dell', specs: 'i7 11th Gen | 16GB DDR4 | 512GB SSD', category: 'High Performance', price: 35432, mrp: 83000, tag: 'Best Seller', image_url: '/Dell Latitude  7540.png', sort_order: 5 },
      { name: 'Lenovo ThinkPad T490 i5 8th Gen Business Laptop', brand: 'Lenovo', specs: 'i5 8th Gen | 16GB DDR4 | 512GB SSD', category: 'Business', price: 29999, mrp: 84000, tag: 'Best Seller', image_url: '/T490.png', sort_order: 6 },
      { name: 'HP EliteBook 840 G5 i5 8th Gen Refurbished Laptop', brand: 'HP', specs: 'i5 8th Gen | 16GB DDR4 | 512GB SSD', category: 'Business', price: 27999, mrp: 79000, tag: 'New', image_url: '/Hp Elitebook 840 G5.png', sort_order: 7 },
      { name: 'Dell Precision 5530 i7 8th Gen 4GB Nvidia GPU', brand: 'Dell', specs: 'i7 8th Gen | 16GB RAM | 512GB SSD | GPU', category: 'Graphics', price: 39999, mrp: 98000, tag: 'Best Seller', image_url: '/Dell precision 5530.png', sort_order: 8 },
      { name: 'Dell Latitude 5400 i5 8th Gen Corporate Laptop', brand: 'Dell', specs: 'i5 8th Gen | 8GB DDR4 | 256GB SSD', category: 'Business', price: 25999, mrp: 74000, tag: 'Offer', image_url: '/Dell latitude 5400.png', sort_order: 9 },
      { name: 'Dell Latitude 3570 i3 6th Gen Budget Laptop', brand: 'Dell', specs: 'i3 6th Gen | 8GB RAM | 256GB SSD', category: 'Student', price: 16499, mrp: 48000, tag: 'Offer', image_url: '/Dell Latitude  3570.png', sort_order: 10 },
      { name: 'Dell Latitude 5490 i5 8th Gen Workstation', brand: 'Dell', specs: 'i5 8th Gen | 8GB DDR4 | 256GB SSD', category: 'Business', price: 24850, mrp: 72000, tag: '', image_url: '/Dell latitude  5490.png', sort_order: 11 },
      { name: 'HP EliteBook 745 G6 AMD Ryzen 5 Pro Laptop', brand: 'HP', specs: 'Ryzen 5 Pro | 8GB DDR4 | 256GB SSD', category: 'Business', price: 23499, mrp: 68000, tag: 'New', image_url: '/Hp Elitebook  745 G6.png', sort_order: 12 },
    ];

    for (const p of products) {
      await client.query(
        `INSERT INTO products (name, brand, specs, category, tag, price, mrp, image_url, sort_order, is_active)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, true)`,
        [p.name, p.brand, p.specs, p.category, p.tag, p.price, p.mrp, p.image_url, p.sort_order]
      );
    }
    console.log(`✅ ${products.length} products seeded`);

    // ── Services ───────────────────────────────────────────────────────────
    const services = [
      { title: 'PREMIUM BUILDS', description: 'Imported laptops in A+++ scratch-less condition. Guaranteed performance at half the price.', icon_name: 'Laptop', sort_order: 1 },
      { title: 'POWER USERS', description: 'Curated models for developers, designers, and business power users. High specs, low cost.', icon_name: 'Cpu', sort_order: 2 },
      { title: 'VERIFIED QC', description: 'Every purchase comes with our dedicated warranty support and specialized technician assistance.', icon_name: 'ShieldCheck', sort_order: 3 },
      { title: 'BEST PRICING', description: 'We offer the most competitive prices in the market without compromising on device quality.', icon_name: 'BadgePercent', sort_order: 4 },
      { title: 'SUPPORT SET', description: 'From original chargers to specialized laptop bags and peripherals, we have it all in store.', icon_name: 'Settings', sort_order: 5 },
    ];

    for (const s of services) {
      await client.query(
        `INSERT INTO services (title, description, icon_name, sort_order, is_active)
         VALUES ($1,$2,$3,$4,true)`,
        [s.title, s.description, s.icon_name, s.sort_order]
      );
    }
    console.log(`✅ ${services.length} services seeded`);

    // ── Why Choose Us ──────────────────────────────────────────────────────
    const whyPoints = [
      'Scratch-less A+++ Imported Quality',
      '40-Point Rigorous Quality Testing',
      '9+ Years of Trusted Service',
      'Bulk Availability for Businesses',
      'Affordable Student-Friendly Models',
      'Dedicated Post-Purchase Warranty',
      'Original Accessories Included',
      'Top Google-Rated Store in Proddatur',
    ];

    for (let i = 0; i < whyPoints.length; i++) {
      await client.query(
        `INSERT INTO why_choose_us (point, sort_order, is_active)
         VALUES ($1,$2,true)`,
        [whyPoints[i], i + 1]
      );
    }
    console.log(`✅ ${whyPoints.length} why-points seeded`);

    // ── Site Content ───────────────────────────────────────────────────────
    const contentEntries = [
      { section: 'hero', key: 'badge', value: 'TRUSTED STORE SINCE 2015' },
      { section: 'hero', key: 'headline_line1', value: 'UPGRADE' },
      { section: 'hero', key: 'headline_accent1', value: 'YOUR' },
      { section: 'hero', key: 'headline_accent2', value: 'TECH.' },
      { section: 'hero', key: 'subtext', value: 'Premium Refurbished Laptops from Dell, HP & Lenovo. High performance, verified quality, and student-friendly prices in Proddatur.' },
      { section: 'hero', key: 'stat1_value', value: '1000+' },
      { section: 'hero', key: 'stat1_label', value: 'Happy Clients' },
      { section: 'hero', key: 'stat2_value', value: '9+ YRS' },
      { section: 'hero', key: 'stat2_label', value: 'Market Leader' },
      { section: 'hero', key: 'stat3_value', value: '500+' },
      { section: 'hero', key: 'stat3_label', value: 'Daily Inventory' },
      { section: 'about', key: 'eyebrow', value: "PRODDATUR'S TECH HUB" },
      { section: 'about', key: 'headline', value: 'TRUSTED SINCE 2015.' },
      { section: 'about', key: 'body', value: 'Universal Computers (UC) has been a leading technological hub for over 9 years. Our focus has always been on bridging the gap between premium tech and affordable pricing.' },
      { section: 'about', key: 'badge_text', value: '9+ Years' },
      { section: 'about', key: 'badge_sub', value: 'of Trusted Excellence' },
      { section: 'contact', key: 'phone', value: '+91 87121 73339' },
      { section: 'contact', key: 'phone_raw', value: '8712173339' },
      { section: 'contact', key: 'whatsapp_number', value: '918712173339' },
      { section: 'contact', key: 'address_line1', value: 'D.No 14/331, Church Complex Upstairs' },
      { section: 'contact', key: 'address_city', value: 'Proddatur, AP, India.' },
      { section: 'footer', key: 'tagline', value: "Bringing premium technology within everyone's reach. Trusted by over 1k+ satisfied customers for more than 9 years in Proddatur." },
    ];

    for (const c of contentEntries) {
      await client.query(
        `INSERT INTO site_content (section, key, value)
         VALUES ($1,$2,$3)
         ON CONFLICT (section, key) DO UPDATE SET value=$3, updated_at=NOW()`,
        [c.section, c.key, c.value]
      );
    }
    console.log(`✅ ${contentEntries.length} content entries seeded`);

    await client.query('COMMIT');
    console.log('\n🎉 Database successfully seeded!');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

seed();
