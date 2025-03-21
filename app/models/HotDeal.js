import mongoose from "mongoose";

const hotDealSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  departure: { type: Date, required: true },
  returnDate: { type: Date, required: true },
  class: { type: String, required: true },
  priceFrom: { type: Number, required: true },
  type: { type: String, enum: ["flight", "package", "cruise"], required: true }, // Type of deal
});

export default mongoose.models.HotDeal || mongoose.model("HotDeal", hotDealSchema);