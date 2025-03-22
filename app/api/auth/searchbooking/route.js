import { NextResponse } from "next/server";
import dbConnect from '../../../lib/mongodb';
import Booking from '../../../models/SearchBooking';  // Import the Booking model
import { sendEmail } from '../../../lib/mailer'; // Import the mailer utility

export async function POST(request) {
  try {
    // Connect to the database
    await dbConnect();

    // Parse the request body
    const data = await request.json();

    // Validate the data
    if (
      !data.fromLocation ||
      !data.toLocation ||
      !data.startDate ||
      !data.endDate ||
      !data.totalPeople ||
      data.children === undefined ||
      !data.name ||
      !data.email ||
      !data.contact
    ) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Create a new booking
    const newBooking = new Booking(data);

    // Save the booking to the database
    await newBooking.save();

    // Send email to the user
    const userSubject = 'Thank you for your booking!';
    const userText = `Dear ${data.name},\n\nThank you for booking with us. Here are your booking details:\n\nFrom: ${data.fromLocation}\nTo: ${data.toLocation}\nStart Date: ${data.startDate}\nEnd Date: ${data.endDate}\nTotal People: ${data.totalPeople}\nChildren: ${data.children}\n\nWe will get back to you shortly.\n\nBest regards,\nYour Company`;
    await sendEmail(data.email, userSubject, userText);

    // Send email to the admin
    const adminEmail = process.env.ADMIN_EMAIL; // Admin email address
    const adminSubject = 'New Booking Received';
    const adminText = `A new booking has been received:\n\nName: ${data.name}\nEmail: ${data.email}\nContact: ${data.contact}\nFrom: ${data.fromLocation}\nTo: ${data.toLocation}\nStart Date: ${data.startDate}\nEnd Date: ${data.endDate}\nTotal People: ${data.totalPeople}\nChildren: ${data.children}`;
    await sendEmail(adminEmail, adminSubject, adminText);

    // Return a success response
    return NextResponse.json(
      { message: "Booking details saved successfully", booking: newBooking },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST function:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}