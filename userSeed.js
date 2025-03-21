import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import AdminModel from "./app/models/Admin.js"; // Import the Admin model
import connectDB from "./app/lib/mongodb.js"; // Your MongoDB connection utility

// Admin credentials
const adminCredentials = {
  email: "admin@example.com",
  password: "admin123", // Use a strong password in production
  role: "admin",
};

// Seed function to create admin
const seedAdmin = async () => {
  try {
    await connectDB(); // Connect to the database

    // Check if admin already exists
    const existingAdmin = await AdminModel.findOne({ email: adminCredentials.email });
    if (existingAdmin) {
      console.log("Admin already exists!");
      process.exit(0);
    }

    // Create the admin
    const admin = new AdminModel(adminCredentials);
    await admin.save();
    console.log("Admin created successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
};

// Run the seed function
seedAdmin();