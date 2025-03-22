import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Booking from '../../../models/BookNow';
import { sendEmail } from '../../../lib/mailer';

export async function POST(request) {
  try {
    // Connect to the database
    await dbConnect();

    // Parse the request body
    const { fullName, email, phoneNumber, destination } = await request.json();

    // Validate the data
    if (!fullName || !email || !phoneNumber || !destination) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Create a new booking
    const newBooking = new Booking({
      fullName,
      email,
      phoneNumber,
      destination,
    });

    // Save the booking to the database
    await newBooking.save();

    // Send email to the user
    const userSubject = 'Thank you for signing up!';
    const userText = `Dear ${fullName},\n\nThank you for signing up with us. We will get back to you shortly.\n\nBest regards,\nYour Company`;
    await sendEmail(email, userSubject, userText);

    // Send email to the admin
    const adminEmail = process.env.ADMIN_EMAIL; // Admin email address
    const adminSubject = 'New User Signup';
    const adminText = `A new user has signed up:\n\nName: ${fullName}\nEmail: ${email}\nPhone: ${phoneNumber}\nDestination: ${destination}`;
    await sendEmail(adminEmail, adminSubject, adminText);

    // Return a success response
    return NextResponse.json(
      { message: 'Booking created successfully', booking: newBooking },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error in POST function:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}