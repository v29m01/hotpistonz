import 'dotenv/config';
import app from './app.js';
import { connectDB } from './db.js';

// Local development / your own server. (On Vercel, api/index.js is used instead.)
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚗 API running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
