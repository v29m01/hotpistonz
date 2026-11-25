import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import Message from '../models/Message.js';

const router = Router();
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 5 });

// POST /api/contact — save a contact-form message
router.post('/', limiter, async (req, res, next) => {
  try {
    const { name, company, phone, email, subject, message } = req.body;
    if (!name || !message || !/^\S+@\S+\.\S+$/.test(email || '')) {
      return res.status(400).json({ message: 'Please fill in your name, a valid email and a message.' });
    }
    await Message.create({ name, company, phone, email, subject, message });
    res.status(201).json({ ok: true });
  } catch (err) {
    next(err);
  }
});

export default router;
