import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { verifyToken, AuthRequest } from '../middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, '../../public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (_req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) cb(null, true);
    else cb(new Error('Only image files are allowed.'));
  },
});

const router = Router();

// POST /api/upload — local file upload
router.post('/', verifyToken, upload.single('image'), (req: AuthRequest, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }
  const url = `/uploads/${req.file.filename}`;
  res.json({ url, filename: req.file.filename });
});

// POST /api/upload/drive — convert Google Drive URL to direct image URL
router.post('/drive', verifyToken, (req: AuthRequest, res: Response) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'URL required.' });

  // Extract file ID from various Google Drive URL formats:
  // https://drive.google.com/file/d/FILE_ID/view?usp=sharing
  // https://drive.google.com/open?id=FILE_ID
  // https://drive.google.com/uc?id=FILE_ID
  const match = url.match(/(?:\/d\/|[?&]id=)([a-zA-Z0-9_-]{15,})/);
  if (!match) {
    return res.status(400).json({ error: 'Could not extract file ID from Google Drive URL.' });
  }

  const fileId = match[1];
  const directUrl = `https://drive.google.com/uc?id=${fileId}`;
  const fallbackUrl = `https://lh3.googleusercontent.com/d/${fileId}`;

  res.json({ url: directUrl, fallbackUrl, fileId });
});

export default router;
