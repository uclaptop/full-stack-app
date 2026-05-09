import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.js';
import productsRoutes from './routes/products.js';
import contentRoutes from './routes/content.js';
import servicesRoutes from './routes/services.js';
import whyRoutes from './routes/why.js';
import uploadRoutes from './routes/upload.js';
import stockRoutes from './routes/stock.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000', credentials: true }));
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/why', whyRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/stock', stockRoutes);

app.get('/api/health', (_req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

app.listen(PORT, () => {
  console.log(`\n🚀 UC Backend running on http://localhost:${PORT}`);
  console.log(`📦 API ready at http://localhost:${PORT}/api`);
});
