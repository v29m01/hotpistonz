// PREVIEW ONLY: fakes the Express API in the browser so the design can be
// demoed without a server. Not used by the real app.
const wait = (ms = 700) => new Promise((r) => setTimeout(r, ms));
const ref = () => 'HP-' + Math.random().toString(36).slice(2, 7).toUpperCase();
const inDays = (n) => new Date(Date.now() + n * 864e5).toISOString();

const db = [
  { _id: '1', ref: 'HP-Q7M2K', name: 'Omar Al Mansoori', phone: '+971 50 123 4567', marque: 'Porsche', model: '911 Carrera S, 2021', service: 'Transmission Service', preferredDate: inDays(1), timeSlot: 'Morning (8–12)', pickup: true, area: 'Dubai Marina', status: 'new' },
  { _id: '2', ref: 'HP-3XB8D', name: 'Priya Nair', phone: '+971 55 987 6543', marque: 'Mercedes-Benz', model: 'G 63, 2022', service: 'Electrical & Diagnostics', preferredDate: inDays(2), timeSlot: 'Afternoon (12–4)', pickup: false, area: '', status: 'confirmed' },
  { _id: '3', ref: 'HP-9TL4W', name: 'James Carter', phone: '+971 52 555 0199', marque: 'Lamborghini', model: 'Urus, 2023', service: 'Interior & Exterior Detailing', preferredDate: inDays(-1), timeSlot: 'Evening (4–8)', pickup: true, area: 'Emirates Hills', status: 'completed' },
];

export async function createBooking(b) {
  await wait();
  const booking = { ...b, _id: String(Date.now()), ref: ref(), status: 'new' };
  db.unshift(booking);
  return { booking };
}
export async function sendMessage() { await wait(); return { ok: true }; }
export async function listBookings(key) {
  await wait(400);
  if (key !== 'demo') { const e = new Error('Invalid admin key (use "demo" in the preview)'); e.fields = {}; throw e; }
  return { bookings: [...db] };
}
export async function updateBookingStatus(id, status) {
  await wait(200);
  const b = db.find((x) => x._id === id); if (b) b.status = status;
  return { booking: b };
}

// Images: uploads become in-memory blob URLs (the real server stores them on disk).
const images = {};
export async function listImages() { return { images: { ...images } }; }
export async function uploadImage(slot, file, key) {
  await wait(500);
  if (key !== 'demo') throw new Error('Invalid admin key');
  if (!/^(image\/(jpeg|png|webp|avif)|video\/(mp4|webm))$/.test(file.type)) throw new Error('Please choose a JPG, PNG, WebP or AVIF image, or an MP4/WebM video');
  const max = file.type.startsWith('video/') ? 60 : 8;
  if (file.size > max * 1024 * 1024) throw new Error(`File must be under ${max} MB`);
  images[slot] = URL.createObjectURL(file);
  return { slot, url: images[slot] };
}
export async function resetImage(slot) { await wait(200); delete images[slot]; return { ok: true }; }
