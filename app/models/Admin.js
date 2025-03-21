import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  // username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },
  permissions: { type: [String], default: [] }, // Add admin-specific permissions if needed
});

export default mongoose.models.Admin || mongoose.model('Admin', adminSchema);