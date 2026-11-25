import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Router } from 'express';
import multer from 'multer';
import SiteImage from '../models/SiteImage.js';
import adminAuth, { isAdminKey } from '../middleware/adminAuth.js';

// Two ways to store uploads from the dashboard's Images tab:
//  - "blob": Vercel Blob (used automatically when BLOB_READ_WRITE_TOKEN is set, e.g. on Vercel).
//            The browser uploads the file straight to Blob, so large videos work.
//  - "disk": the server/uploads folder (local development or your own server).
const STORAGE = process.env.BLOB_READ_WRITE_TOKEN ? 'blob' : 'disk';

const router = Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const UPLOAD_DIR = path.join(__dirname, '../uploads');
if (STORAGE === 'disk') {
  try { fs.mkdirSync(UPLOAD_DIR, { recursive: true }); } catch { /* read-only file system */ }
}

const SLOT = /^[a-z0-9-]{1,60}$/;
const TYPES = { 'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp', 'image/avif': '.avif', 'video/mp4': '.mp4', 'video/webm': '.webm' };
const MAX_VIDEO = 60 * 1024 * 1024; // 60 MB
const MAX_IMAGE = 8 * 1024 * 1024; // 8 MB (also checked in the browser)
const isBlobUrl = (url) => {
  try { return new URL(url).hostname.endsWith('.blob.vercel-storage.com'); } catch { return false; }
};

async function removeFile(url) {
  if (!url) return;
  if (url.startsWith('/uploads/')) {
    fs.rm(path.join(UPLOAD_DIR, path.basename(url)), { force: true }, () => {});
  } else if (STORAGE === 'blob' && isBlobUrl(url)) {
    const { del } = await import('@vercel/blob');
    await del(url).catch((e) => console.warn('Could not delete old blob:', e.message));
  }
}

async function saveSlot(slot, url) {
  const old = await SiteImage.findOneAndUpdate({ slot }, { url }, { upsert: true });
  if (old && old.url !== url) await removeFile(old.url);
}

// GET /api/images — public: { slot: url } for every uploaded image
router.get('/', async (_req, res, next) => {
  try {
    const rows = await SiteImage.find();
    res.json({ storage: STORAGE, images: Object.fromEntries(rows.map((r) => [r.slot, r.url])) });
  } catch (err) { next(err); }
});

// ---------- Vercel Blob: the browser asks for a short-lived upload token ----------
// Called by upload() from '@vercel/blob/client' in client/src/api/index.js.
router.post('/blob-token', async (req, res) => {
  if (STORAGE !== 'blob') return res.status(400).json({ error: 'Blob storage is not configured' });
  try {
    const { handleUpload } = await import('@vercel/blob/client');
    const json = await handleUpload({
      body: req.body,
      request: req,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        const { key, slot } = JSON.parse(clientPayload || '{}');
        if (!isAdminKey(key)) throw new Error('Invalid admin key');
        if (!SLOT.test(slot || '') || !pathname.startsWith(`site/${slot}`)) throw new Error('Invalid image slot');
        return { allowedContentTypes: Object.keys(TYPES), maximumSizeInBytes: MAX_VIDEO, addRandomSuffix: true };
      },
      // The dashboard saves the URL itself straight after uploading (see POST /:slot/url),
      // so nothing is needed here. Kept because Vercel Blob calls it when an upload finishes.
      onUploadCompleted: async () => {},
    });
    res.json(json);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST /api/images/:slot/url — admin: save the Blob URL of a file the browser just uploaded
router.post('/:slot/url', adminAuth, async (req, res, next) => {
  const { slot } = req.params;
  const { url } = req.body || {};
  if (!SLOT.test(slot)) return res.status(400).json({ message: 'Invalid image slot' });
  if (!isBlobUrl(url)) return res.status(400).json({ message: 'Invalid file URL' });
  try {
    await saveSlot(slot, url);
    res.status(201).json({ slot, url });
  } catch (e) { next(e); }
});

// ---------- Disk storage: the file is sent to the server ----------
const upload = multer({
  storage: multer.diskStorage({
    destination: UPLOAD_DIR,
    filename: (req, file, cb) => cb(null, `${req.params.slot}-${Date.now()}${TYPES[file.mimetype]}`),
  }),
  limits: { fileSize: MAX_VIDEO },
  fileFilter: (_req, file, cb) => cb(null, Boolean(TYPES[file.mimetype])),
});

// POST /api/images/:slot — admin: upload (field name "image")
router.post('/:slot', adminAuth, (req, res, next) => {
  if (STORAGE === 'blob') return res.status(400).json({ message: 'Uploads go to Vercel Blob. Please reload the dashboard and try again.' });
  if (!SLOT.test(req.params.slot)) return res.status(400).json({ message: 'Invalid image slot' });
  upload.single('image')(req, res, async (err) => {
    if (err) return res.status(400).json({ message: err.code === 'LIMIT_FILE_SIZE' ? 'File must be under 60 MB' : err.message });
    if (!req.file) return res.status(400).json({ message: 'Please choose a JPG, PNG, WebP or AVIF image, or an MP4/WebM video' });
    if (req.file.mimetype.startsWith('image/') && req.file.size > MAX_IMAGE) {
      removeFile(`/uploads/${req.file.filename}`);
      return res.status(400).json({ message: 'Images must be under 8 MB' });
    }
    try {
      const url = `/uploads/${req.file.filename}`;
      await saveSlot(req.params.slot, url);
      res.status(201).json({ slot: req.params.slot, url });
    } catch (e) { next(e); }
  });
});

// DELETE /api/images/:slot — admin: go back to the built-in default image
router.delete('/:slot', adminAuth, async (req, res, next) => {
  try {
    const old = await SiteImage.findOneAndDelete({ slot: req.params.slot });
    if (old) await removeFile(old.url);
    res.json({ ok: true });
  } catch (err) { next(err); }
});

export default router;
