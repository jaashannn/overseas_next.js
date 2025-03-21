import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Agent from '../../../models/Agent'; // Ensure this model exists
import bcrypt from 'bcryptjs'; // Import bcrypt for password hashing
import { sendEmail } from '../../../lib/mailer'; // Import the mailer utility

export async function POST(request) {
  await dbConnect();

  const {
    title,
    name,
    email,
    phoneNumber,
    password, // Plain text password from the request
    country,
    address,
    city,
    province,
    postalCode,
    certificateType,
    certificateNumber,
    message,
    referredBy,
    role,
    numberOfAgents,
    agencyType,
    ticoOrIataCertified
  } = await request.json();

  try {
    // Check if agent already exists
    const existingAgent = await Agent.findOne({ email });
    if (existingAgent) {
      return NextResponse.json({ message: 'Agent already exists' }, { status: 400 });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10); // Generate a salt
    const hashedPassword = await bcrypt.hash(password, salt); // Hash the password

    // Create a new agent with the hashed password
    const agent = new Agent({
      title,
      name,
      email,
      phoneNumber,
      password: hashedPassword, // Store the hashed password
      country,
      address,
      city,
      province,
      postalCode,
      certificateType,
      certificateNumber,
      message,
      referredBy,
      role,
      numberOfAgents,
      agencyType,
      ticoOrIataCertified
    });

    await agent.save();

    // Send email to the user
    const userSubject = 'Thank you for signing up as an agent!';
    const userText = `Dear ${name},\n\nThank you for signing up as an agent with us. We will review your application and get back to you shortly.\n\nBest regards,\nYour Company`;
    await sendEmail(email, userSubject, userText);

    // Send email to the admin
    const adminEmail = process.env.ADMIN_EMAIL; // Admin email address
    const adminSubject = 'New Agent Signup';
    const adminText = `A new agent has signed up:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phoneNumber}\nCountry: ${country}\nAgency Type: ${agencyType}`;
    await sendEmail(adminEmail, adminSubject, adminText);

    // Respond with success
    return NextResponse.json({ message: 'Agent created successfully', agent }, { status: 201 });
  } catch (error) {
    console.error('Error in POST function:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// GET request handler to fetch all agents
export async function GET() {
  try {
    // Connect to the database
    await dbConnect();

    // Fetch all agents from the database
    const agents = await Agent.find({});

    // Return the agents as a response
    return NextResponse.json({ agents }, { status: 200 });
  } catch (error) {
    console.error('Error fetching agents:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}