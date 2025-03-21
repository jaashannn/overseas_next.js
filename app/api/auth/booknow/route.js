import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Booking from '../../../models/BookNow';

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