# Hot Pistonz Garage — MERN Website

Premium redesign of hotpistonz.com built with **M**ongoDB, **E**xpress, **R**eact and **N**ode.

```
hotpistonz/
├── client/                 ← React app (what visitors see) — built with Vite
│   ├── src/router.jsx      ← tiny router: /, /about-us, /our-services, /car-brands,
│   │                         /areas-we-cover, /contact-us, /book-service, /admin + 14 service pages
│   ├── src/data/services.js ← ✏️ all 14 services: details, FAQs, images (slugs = current site URLs)
│   ├── index.html          ← page title, SEO description, Google Fonts
│   └── src/
│       ├── data/content.js ← ✏️ ALL TEXT lives here (services, marques, phone, areas…)
│       ├── components/     ← one file per section (Hero, Services, BookingForm…)
│       ├── pages/          ← Home.jsx (site) and Admin.jsx (bookings dashboard)
│       ├── api/index.js    ← functions that call the Express API
│       └── styles/global.css ← all styling + colour tokens at the top
├── server/                 ← Express API + MongoDB
│   ├── index.js            ← starts the server, connects to MongoDB
│   ├── models/             ← Booking & Message database schemas
│   ├── routes/             ← /api/bookings and /api/contact endpoints
│   └── middleware/adminAuth.js ← protects admin routes with ADMIN_KEY
└── preview/                ← single-file demo build (no server needed) — ignore for production
```

## 1. What you need installed
- **Node.js 20+** → https://nodejs.org
- **MongoDB**: either install MongoDB Community locally, or create a free cluster on **MongoDB Atlas** (easiest) and copy its connection string.

## 2. Setup (first time)
```bash
cd hotpistonz
npm run install:all          # installs root, server and client packages
cp server/.env.example server/.env
```
Open `server/.env` and set:
- `MONGO_URI` — your local or Atlas connection string
- `ADMIN_KEY` — a long password for the dashboard

## 3. Images
**Premium photos (recommended):** run `npm run photos` once. It downloads 23 real, free-licence Unsplash photos (supercars, brake calipers, engine bays, detailing, dashboards) and swaps them in. Your generated originals are backed up to `client/public/images-generated/`.

All 23 images in `client/public/images` were generated for this site (studio supercar renders, wheel/brake close-ups, gears, ECU circuit, oil, paint beading, tachometers). Their source is in `scripts/artwork`.
To use the client's real workshop photos later, replace a file with one of the same name (e.g. `hero.jpg`, `oil.jpg`).

## 4. Run it
```bash
npm run dev
```
- Website → http://localhost:5173
- API → http://localhost:5000/api/health
- Bookings dashboard → http://localhost:5173/admin (log in with your `ADMIN_KEY`)

## 5. How the pieces talk
1. Visitor fills the booking form (`BookingForm.jsx`)
2. `createBooking()` in `api/index.js` sends `POST /api/bookings`
3. Vite forwards `/api` to Express (see `vite.config.js`)
4. `routes/bookings.js` validates and saves it with the `Booking` model into MongoDB
5. Workshop staff see it at `/admin` and change its status

## 6. Common edits
| I want to… | Edit |
|---|---|
| Change phone / address / hours | `client/src/data/content.js` → `business` |
| Add or rename a service | `content.js` → `services` |
| Add a car brand + its colour | `content.js` → `marques` |
| Change the default gold colour | `global.css` → `--accent` at the top |
| Change a photo | replace the file in `client/public/images/` (keep the name) |
| Use the client's logo file | put it in `client/public/` and edit `Logo.jsx` |

## 7. Deploy
**Vercel (recommended):** follow `DEPLOY-VERCEL.md` step by step — GitHub, MongoDB Atlas, Vercel, uploads and the domain.

**Your own server (Render, Railway, a VPS):**
```bash
npm run install:all
npm run build      # builds React into client/dist
npm start          # Express serves the API AND the built site on PORT
```
Set `MONGO_URI`, `ADMIN_KEY` and `NODE_ENV=production` there. Uploads are saved in `server/uploads`.

## API reference
| Method | Path | Auth | Purpose |
|---|---|---|---|
| POST | `/api/bookings` | — | Create booking request |
| GET | `/api/bookings` | `x-admin-key` | List bookings |
| PATCH | `/api/bookings/:id` | `x-admin-key` | Update status |
| POST | `/api/contact` | — | Contact form message |

## Next ideas
- Email/WhatsApp alert to the workshop on each booking (TODO marked in `routes/bookings.js`)
- Real photos of the workshop and finished cars
- Replace the simple admin key with proper staff logins (JWT)
- Note: the current live site shows "0+" placeholder stats. This version uses true facts instead (24/7, 16 areas, 14 services). Add real numbers (years, cars serviced) once the client confirms them.
