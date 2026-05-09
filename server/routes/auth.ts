import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db.js';
import rateLimit from 'express-rate-limit';
import { verifyToken } from '../middleware/auth.js';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

let activeOtp: string | null = null;
let otpExpiresAt: number | null = null;
let resetToken: string | null = null;
let resetTokenExpiresAt: number | null = null;

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per `window`
  message: { error: 'Too many login attempts from this IP, please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/login', loginLimiter, async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required.' });
    }

    const result = await pool.query(
      'SELECT * FROM admin_users WHERE username = $1',
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const admin = result.rows[0];
    const valid = await bcrypt.compare(password, admin.password_hash);

    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    if (!process.env.JWT_SECRET) {
      console.error('FATAL: JWT_SECRET environment variable is missing.');
      return res.status(500).json({ error: 'Server configuration error.' });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.cookie('uc_admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 8 * 60 * 60 * 1000, // 8 hours
    });

    res.json({ message: 'Login successful', username: admin.username });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

router.post('/forgot-password', async (req: Request, res: Response) => {
  try {
    activeOtp = Math.floor(100000 + Math.random() * 900000).toString();
    otpExpiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER || 'system',
      to: 'uclaptopstore@gmail.com',
      subject: 'Admin Password Reset OTP',
      text: `Your OTP for admin password reset is: ${activeOtp}. This OTP is valid for 10 minutes.`,
    };

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await transporter.sendMail(mailOptions);
      console.log('OTP sent to uclaptopstore@gmail.com');
    } else {
      console.warn('EMAIL_USER and EMAIL_PASS not set in environment. Mocking email send.');
      console.log(`[MOCK EMAIL] To: uclaptopstore@gmail.com | OTP: ${activeOtp}`);
    }

    res.json({ message: 'OTP sent successfully.' });
  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ error: 'Failed to send OTP.' });
  }
});

router.post('/verify-otp', async (req: Request, res: Response) => {
  try {
    const { otp } = req.body;
    if (!otp) return res.status(400).json({ error: 'OTP is required.' });

    if (!activeOtp || !otpExpiresAt) {
      return res.status(400).json({ error: 'No OTP requested or OTP expired.' });
    }

    if (Date.now() > otpExpiresAt) {
      activeOtp = null;
      otpExpiresAt = null;
      return res.status(400).json({ error: 'OTP has expired. Please request a new one.' });
    }

    if (otp !== activeOtp) {
      return res.status(400).json({ error: 'Invalid OTP.' });
    }

    activeOtp = null;
    otpExpiresAt = null;

    resetToken = crypto.randomBytes(32).toString('hex');
    resetTokenExpiresAt = Date.now() + 15 * 60 * 1000;

    res.json({ message: 'OTP verified successfully.', resetToken });
  } catch (err) {
    console.error('Verify OTP error:', err);
    res.status(500).json({ error: 'Failed to verify OTP.' });
  }
});

router.post('/reset-password', async (req: Request, res: Response) => {
  try {
    const { resetToken: clientToken, newPassword } = req.body;
    
    if (!clientToken || !newPassword) {
      return res.status(400).json({ error: 'Reset token and new password required.' });
    }

    if (!resetToken || !resetTokenExpiresAt || clientToken !== resetToken) {
      return res.status(400).json({ error: 'Invalid or expired reset session.' });
    }

    if (Date.now() > resetTokenExpiresAt) {
      resetToken = null;
      resetTokenExpiresAt = null;
      return res.status(400).json({ error: 'Reset session expired.' });
    }

    const hash = await bcrypt.hash(newPassword, 12);
    // Since there's only one admin globally and we don't have a specific ID, update for username 'admin'.
    // If the database has multiple admins, we should store the username along with resetToken.
    // Assuming 'admin' is the global admin based on seed data.
    await pool.query('UPDATE admin_users SET password_hash = $1 WHERE username = $2', [hash, 'admin']);

    resetToken = null;
    resetTokenExpiresAt = null;

    res.json({ message: 'Password updated successfully.' });
  } catch (err) {
    console.error('Reset password error:', err);
    res.status(500).json({ error: 'Failed to reset password.' });
  }
});

router.get('/verify', verifyToken, (_req: Request, res: Response) => {
  res.json({ ok: true });
});

router.post('/logout', (_req: Request, res: Response) => {
  res.clearCookie('uc_admin_token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  res.json({ message: 'Logged out successfully' });
});

export default router;
