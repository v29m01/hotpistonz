import mongoose from 'mongoose';

// Short human-friendly reference, e.g. HP-7K2Q9
const makeRef = () => 'HP-' + Math.random().toString(36).slice(2, 7).toUpperCase();

const bookingSchema = new mongoose.Schema(
  {
    ref: { type: String, default: makeRef, unique: true },
    name: { type: String, required: true, trim: true, maxlength: 80 },
    phone: { type: String, required: true, trim: true, maxlength: 20 },
    email: { type: String, trim: true, lowercase: true, maxlength: 120 },
    marque: { type: String, required: true, trim: true, maxlength: 40 },
    model: { type: String, trim: true, maxlength: 80 },
    service: { type: String, required: true, trim: true, maxlength: 80 },
    preferredDate: { type: Date, required: true },
    timeSlot: { type: String, trim: true, maxlength: 40 },
    pickup: { type: Boolean, default: false },
    area: { type: String, trim: true, maxlength: 60 },
    notes: { type: String, trim: true, maxlength: 1000 },
    status: {
      type: String,
      enum: ['new', 'confirmed', 'in-progress', 'completed', 'cancelled'],
      default: 'new',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Booking', bookingSchema);
