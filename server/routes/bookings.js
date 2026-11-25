import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import Booking from '../models/Booking.js';
import adminAuth from '../middleware/adminAuth.js';

const router = Router();

// Max 10 booking submissions per IP every 15 minutes (spam protection)
const createLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10 });

function validate(b) {
  const fields = {};
  if (!b.name || String(b.name).trim().length < 2) fields.name = 'Please enter your name';
  if (!/^\+?[0-9\s-]{7,16}$/.test(String(b.phone || '').trim())) fields.phone = 'Enter a valid phone number';
  if (b.email && !/^\S+@\S+\.\S+$/.test(b.email)) fields.email = 'Enter a valid email';
  if (!b.marque) fields.marque = 'Select your marque';
  if (!b.service) fields.service = 'Select a service';
  const d = new Date(b.preferredDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (!b.preferredDate || Number.isNaN(d.getTime())) fields.preferredDate = 'Choose a date';
  else if (d < today) fields.preferredDate = 'Date cannot be in the past';
  return fields;
}

// POST /api/bookings  — public: create a booking request
router.post('/', createLimiter, async (req, res, next) => {
  try {
    const fields = validate(req.body);
    if (Object.keys(fields).length) {
      return res.status(400).json({ message: 'Please check the highlighted fields.', fields });
    }
    // Only pick the fields we expect (never trust the whole body)
    const { name, phone, email, marque, model, service, preferredDate, timeSlot, pickup, area, notes } = req.body;
    const booking = await Booking.create({
      name, phone, email, marque, model, service, preferredDate, timeSlot,
      pickup: Boolean(pickup), area, notes,
    });
    // TODO (optional): send an email / WhatsApp notification to the workshop here.
    res.status(201).json({ booking });
  } catch (err) {
    next(err);
  }
});

// GET /api/bookings  — admin: list bookings, newest first
router.get('/', adminAuth, async (_req, res, next) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 }).limit(500);
    res.json({ bookings });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/bookings/:id  — admin: update status
router.patch('/:id', adminAuth, async (req, res, next) => {
  try {
    const allowed = ['new', 'confirmed', 'in-progress', 'completed', 'cancelled'];
    if (!allowed.includes(req.body.status)) return res.status(400).json({ message: 'Invalid status' });
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json({ booking });
  } catch (err) {
    next(err);
  }
});

export default router;
