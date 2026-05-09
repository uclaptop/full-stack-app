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
        image_url TEXT NOT NULL,
        category VARCHAR(100) DEFAULT '',
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
      { name: 'Dell Latitude 3570', image_url: '/Dell Latitude  3570.png', category: 'Dell', sort_order: 1 },
      { name: 'Dell Latitude 5570', image_url: '/Dell Latitude  5570.png', category: 'Dell', sort_order: 2 },
      { name: 'Dell Latitude 7540', image_url: '/Dell Latitude  7540.png', category: 'Dell', sort_order: 3 },
      { name: 'Dell Latitude 5420', image_url: '/Dell Latitude 5420.png', category: 'Dell', sort_order: 4 },
      { name: 'Dell Latitude 5490', image_url: '/Dell latitude  5490.png', category: 'Dell', sort_order: 5 },
      { name: 'Dell Latitude 5580', image_url: '/Dell latitude  5580.png', category: 'Dell', sort_order: 6 },
      { name: 'Dell Latitude 3400', image_url: '/Dell latitude 3400.png', category: 'Dell', sort_order: 7 },
      { name: 'Dell Latitude 3480', image_url: '/Dell latitude 3480.png', category: 'Dell', sort_order: 8 },
      { name: 'Dell Latitude 5400', image_url: '/Dell latitude 5400.png', category: 'Dell', sort_order: 9 },
      { name: 'Dell Precision 5530', image_url: '/Dell precision 5530.png', category: 'Dell', sort_order: 10 },
      { name: 'HP EliteBook 745 G6', image_url: '/Hp Elitebook  745 G6.png', category: 'HP', sort_order: 11 },
      { name: 'HP EliteBook 840 G3', image_url: '/Hp Elitebook 840 G3.png', category: 'HP', sort_order: 12 },
      { name: 'HP EliteBook 840 G5', image_url: '/Hp Elitebook 840 G5.png', category: 'HP', sort_order: 13 },
      { name: 'HP ProBook 640 G5', image_url: '/Hp probook 640 G5.png', category: 'HP', sort_order: 14 },
      { name: 'Lenovo ThinkPad T490', image_url: '/T490.png', category: 'Lenovo', sort_order: 15 },
      { name: 'Dell Latitude 5550', image_url: '/dell latitude 5550.png', category: 'Dell', sort_order: 16 },
    ];

    for (const p of products) {
      await client.query(
        `INSERT INTO products (name, image_url, category, sort_order, is_active)
         VALUES ($1,$2,$3,$4,true)
         ON CONFLICT DO NOTHING`,
        [p.name, p.image_url, p.category, p.sort_order]
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
         VALUES ($1,$2,$3,$4,true)
         ON CONFLICT DO NOTHING`,
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
         VALUES ($1,$2,true) ON CONFLICT DO NOTHING`,
        [whyPoints[i], i + 1]
      );
    }
    console.log(`✅ ${whyPoints.length} why-choose-us points seeded`);

    // ── Site Content ───────────────────────────────────────────────────────
    const content = [
      // Hero
      { section: 'hero', key: 'badge', value: 'TRUSTED STORE SINCE 2015' },
      { section: 'hero', key: 'headline_line1', value: 'UPGRADE' },
      { section: 'hero', key: 'headline_accent1', value: 'YOUR' },
      { section: 'hero', key: 'headline_accent2', value: 'TECH.' },
      { section: 'hero', key: 'subtext', value: 'Premium Refurbished Laptops from Dell, HP & Lenovo. High performance, verified quality, and student-friendly prices.' },
      { section: 'hero', key: 'stat1_value', value: '1000+' },
      { section: 'hero', key: 'stat1_label', value: 'Happy Clients' },
      { section: 'hero', key: 'stat2_value', value: '9+ YRS' },
      { section: 'hero', key: 'stat2_label', value: 'Market Leader' },
      { section: 'hero', key: 'stat3_value', value: '500+' },
      { section: 'hero', key: 'stat3_label', value: 'Daily Inventory' },
      // About
      { section: 'about', key: 'eyebrow', value: "PRODDATUR'S TECH HUB" },
      { section: 'about', key: 'headline', value: 'TRUSTED SINCE 2015.' },
      { section: 'about', key: 'body', value: 'Universal Computers (UC) has been a leading technological hub for over 9 years. Our focus has always been on bridging the gap between premium tech and affordable pricing.' },
      { section: 'about', key: 'badge_text', value: '9+ Years' },
      { section: 'about', key: 'badge_sub', value: 'of Trusted Excellence' },
      { section: 'about', key: 'stat1_value', value: '1k+' },
      { section: 'about', key: 'stat1_label', value: 'Customers' },
      { section: 'about', key: 'stat2_value', value: '500+' },
      { section: 'about', key: 'stat2_label', value: 'Models' },
      { section: 'about', key: 'stat3_value', value: '#1' },
      { section: 'about', key: 'stat3_label', value: 'Rated' },
      // Contact
      { section: 'contact', key: 'phone', value: '+91 87121 73339' },
      { section: 'contact', key: 'whatsapp_number', value: '918712173339' },
      { section: 'contact', key: 'address_line1', value: 'D.No 14/331, Church Complex Upstairs' },
      { section: 'contact', key: 'address_city', value: 'Proddatur, AP, India.' },
      // Footer
      { section: 'footer', key: 'hours_weekday', value: 'MON-SAT 9AM-8:30PM' },
      { section: 'footer', key: 'hours_weekend', value: 'SUN 10AM-6:00PM' },
      { section: 'footer', key: 'tagline', value: 'Bringing premium technology within everyone\'s reach. Trusted by over 1k+ satisfied customers for more than 9 years in Proddatur.' },
      { section: 'footer', key: 'instagram_url', value: 'https://www.instagram.com/_universal_computers_' },
      { section: 'footer', key: 'youtube_url', value: 'https://www.youtube.com/@UniversalComputerspdtr' },
      { section: 'footer', key: 'facebook_url', value: 'https://www.facebook.com/share/14bJmiFVj6T/' },
    ];

    for (const c of content) {
      await client.query(
        `INSERT INTO site_content (section, key, value, updated_at)
         VALUES ($1,$2,$3,NOW())
         ON CONFLICT (section, key) DO NOTHING`,
        [c.section, c.key, c.value]
      );
    }
    console.log(`✅ ${content.length} content entries seeded`);

    await client.query('COMMIT');
    console.log('\n🎉 Database seeded successfully!');
    console.log('👤 Admin Login: username=admin | password=UC@admin2024');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Seed failed:', err);
    throw err;
  } finally {
    client.release();
    process.exit(0);
  }
}

seed();
