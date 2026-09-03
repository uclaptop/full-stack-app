import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRoutes from '../server/routes/auth.js';
import productsRoutes from '../server/routes/products.js';
import contentRoutes from '../server/routes/content.js';
import servicesRoutes from '../server/routes/services.js';
import whyRoutes from '../server/routes/why.js';
import uploadRoutes from '../server/routes/upload.js';
import stockRoutes from '../server/routes/stock.js';

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/why', whyRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/stock', stockRoutes);

app.get('/api/health', (_req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

export default app;
