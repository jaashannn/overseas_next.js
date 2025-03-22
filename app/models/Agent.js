import mongoose from 'mongoose';

const agentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  country: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  province: { type: String, required: true },
  postalCode: { type: String, required: true },
  certificateType: { type: String },
  certificateNumber: { type: String },
  message: { type: String },
  referredBy: { type: String },
  role: { type: String, default: 'agent' },
  numberOfAgents: { type: Number },
  agencyType: { type: String },
  verified: { type: Boolean, default: false },
  ticoOrIataCertified: { type: String },
  planPurchased: { type: String }, 
});

export default mongoose.models.Agent || mongoose.model('Agent', agentSchema);