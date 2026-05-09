import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  admin?: { id: number; username: string };
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies?.uc_admin_token;

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ error: 'Server configuration error.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
      id: number;
      username: string;
    };
    req.admin = decoded;
    next();
  } catch {
    return res.status(403).json({ error: 'Invalid or expired token.' });
  }
};
