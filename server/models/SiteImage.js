import mongoose from 'mongoose';

// Which uploaded file is used for each image slot on the site (e.g. "hero", "hero-porsche").
const siteImageSchema = new mongoose.Schema(
  {
    slot: { type: String, required: true, unique: true, trim: true, maxlength: 60 },
    url: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('SiteImage', siteImageSchema);
