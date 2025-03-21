import { NextResponse } from "next/server";
import dbConnect from '../../../lib/mongodb';
import HotDeal from '../../../models/HotDeal'; 

export async function GET() {
  try {
    // Connect to the database
    await dbConnect();

    // Fetch all hot deals
    const hotDeals = await HotDeal.find({});
    // console.log(hotDeals)

    // Return the hot deals
    return NextResponse.json({ hotDeals }, { status: 200 });
  } catch (error) {
    console.error("Error fetching hot deals:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST request handler to create a new hot deal
export async function POST(request) {
  try {
    // Connect to the database
    await dbConnect();

    // Parse the incoming request body
    const body = await request.json();
    // console.log(body, 'body')
    const { from, to, departure, returnDate, class: travelClass, priceFrom, type } = body;

    // console.log(from, to, departure, returnDate, travelClass, priceFrom, type)

    // Validate the incoming data (optional but recommended)
    if (!from || !to || !departure || !returnDate || !travelClass || !priceFrom || !type) {
      console.log('All fields are required')
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Create a new hot deal in the database
    const newHotDeal = await HotDeal.create({
      from,
      to,
      departure,
      returnDate, // Ensure the field name matches your schema
      class: travelClass,
      priceFrom,
      type,
    });

    // Return the created hot deal as a response
    return NextResponse.json(
      { message: "Hot deal created successfully", hotDeal: newHotDeal },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating hot deal:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

