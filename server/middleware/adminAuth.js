import crypto from 'node:crypto';

// Very simple protection for admin routes: the request must send the
// ADMIN_KEY from .env in an "x-admin-key" header.
// For a bigger project, replace this with proper user accounts + JWT.
export function isAdminKey(given = '') {
  const expected = process.env.ADMIN_KEY || '';
  return (
    expected.length > 0 &&
    typeof given === 'string' &&
    Buffer.byteLength(given) === Buffer.byteLength(expected) &&
    crypto.timingSafeEqual(Buffer.from(given), Buffer.from(expected))
  );
}

export default function adminAuth(req, res, next) {
  if (!isAdminKey(req.get('x-admin-key') || '')) return res.status(401).json({ message: 'Invalid admin key' });
  next();
}
