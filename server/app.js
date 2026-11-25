import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { connectDB } from './db.js';
import bookingRoutes from './routes/bookings.js';
import contactRoutes from './routes/contact.js';
import imageRoutes, { UPLOAD_DIR } from './routes/images.js';

// The Express app, shared by local development (server/index.js)
// and Vercel (api/index.js).
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const onVercel = Boolean(process.env.VERCEL);

// ---------- Middleware ----------
app.set('trust proxy', 1); // correct visitor IPs behind Vercel / a proxy (used by the rate limits)
app.use(helmet({ contentSecurityPolicy: false, crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin: process.env.CLIENT_URL || (onVercel ? true : 'http://localhost:5173') }));
app.use(express.json({ limit: '20kb' }));

// ---------- API routes ----------
app.get('/api/health', (_req, res) => res.json({ ok: true }));

// Every other API route needs the database.
app.use('/api', (_req, res, next) => {
  connectDB().then(() => next()).catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    res.status(503).json({ message: 'Service temporarily unavailable. Please call or WhatsApp us.' });
  });
});
app.use('/api/bookings', bookingRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/images', imageRoutes);

// Uploaded files saved on disk (local / own server only — on Vercel they go to Vercel Blob)
if (!onVercel) app.use('/uploads', express.static(UPLOAD_DIR, { maxAge: '30d' }));

// ---------- Serve the React build (own server only — Vercel serves it from its CDN) ----------
if (process.env.NODE_ENV === 'production' && !onVercel) {
  const dist = path.join(__dirname, '../client/dist');
  app.use(express.static(dist));
  app.get('*', (_req, res) => res.sendFile(path.join(dist, 'index.html')));
}

// ---------- Errors ----------
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Server error. Please try again later.' });
});

export default app;
