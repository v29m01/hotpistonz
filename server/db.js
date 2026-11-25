import mongoose from 'mongoose';

// One shared connection. On Vercel each function instance reuses it between
// requests instead of reconnecting every time.
let pending = null;

export function connectDB() {
  if (mongoose.connection.readyState === 1) return Promise.resolve();
  if (!process.env.MONGO_URI) return Promise.reject(new Error('MONGO_URI is not set'));
  if (!pending) {
    pending = mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 8000 })
      .catch((err) => { pending = null; throw err; });
  }
  return pending;
}
