import { NextResponse } from "next/server";
import dbConnect from '../../../lib/mongodb';
import Booking from '../../../models/SearchBooking';  // Import the Booking model

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