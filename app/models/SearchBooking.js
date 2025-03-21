import mongoose from "mongoose";

const SearchBooking = new mongoose.Schema({
  fromLocation: { type: String, required: true },
  toLocation: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalPeople: { type: Number, required: true },
  children: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.SearchBooking || mongoose.model("SearchBooking", SearchBooking);