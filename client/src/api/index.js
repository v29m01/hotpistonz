// Talks to the Express backend. In development Vite proxies "/api" to
// http://localhost:5000 (see vite.config.js), so relative URLs work everywhere.

async function request(path, { method = 'GET', body, adminKey } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (adminKey) headers['x-admin-key'] = adminKey;

  const res = await fetch(`/api${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error(data.message || 'Something went wrong. Please try again.');
    err.fields = data.fields || {};
    throw err;
  }
  return data;
}

export const createBooking = (booking) => request('/bookings', { method: 'POST', body: booking });
export const sendMessage = (msg) => request('/contact', { method: 'POST', body: msg });
export const listBookings = (adminKey) => request('/bookings', { adminKey });
export const updateBookingStatus = (id, status, adminKey) =>
  request(`/bookings/${id}`, { method: 'PATCH', body: { status }, adminKey });

// ----- Site images -----
// "blob" on Vercel (files go straight from the browser to Vercel Blob), "disk" elsewhere.
let storage = 'disk';
export const listImages = () => request('/images').then((d) => { storage = d.storage || 'disk'; return d; });

export async function uploadImage(slot, file, adminKey) {
  if (storage === 'blob') {
    const { upload } = await import('@vercel/blob/client');
    const ext = (file.name.match(/\.[a-z0-9]+$/i) || [''])[0].toLowerCase();
    let blob;
    try {
      blob = await upload(`site/${slot}${ext}`, file, {
        access: 'public',
        handleUploadUrl: '/api/images/blob-token',
        clientPayload: JSON.stringify({ key: adminKey, slot }),
        multipart: file.size > 20 * 1024 * 1024,
      });
    } catch (e) {
      throw new Error(/admin key/i.test(e.message) ? 'Wrong dashboard password' : `Upload failed: ${e.message}`);
    }
    return request(`/images/${slot}/url`, { method: 'POST', body: { url: blob.url }, adminKey });
  }
  const body = new FormData();
  body.append('image', file);
  const res = await fetch(`/api/images/${slot}`, { method: 'POST', headers: { 'x-admin-key': adminKey }, body });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Upload failed');
  return data;
}
export const resetImage = (slot, adminKey) => request(`/images/${slot}`, { method: 'DELETE', adminKey });
