import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Agent from '../../../models/Agent';
import bcrypt from 'bcryptjs';
import { sendEmail } from '../../../lib/mailer';
import jwt from 'jsonwebtoken'; // Add jsonwebtoken package

export async function POST(request) {
  await dbConnect();

  const {
    title,
    name,
    email,
    phoneNumber,
    password,
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
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new agent with the hashed password
    const agent = new Agent({
      title,
      name,
      email,
      phoneNumber,
      password: hashedPassword,
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

    // Generate JWT token
    const token = jwt.sign(
      { id: agent._id, email: agent.email, role: agent.role },
      process.env.JWT_SECRET || 'your-secret-key', // Make sure to set this in your .env file
      { expiresIn: '30d' } // Token expiration time
    );

    // Prepare user object for response
    const user = {
      id: agent._id,
      email: agent.email,
      role: agent.role,
      name: agent.name
    };

    // Send email to the user
    const userSubject = 'Thank you for signing up as an agent!';
    const userText = `Dear ${name},\n\nThank you for signing up as an agent with us. We will review your application and get back to you shortly.\n\nBest regards,\nOverseas Travel`;
    await sendEmail(email, userSubject, userText);

    // Send email to the admin
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminSubject = 'New Agent Signup';
    const adminText = `A new agent has signed up:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phoneNumber}\nCountry: ${country}\nAgency Type: ${agencyType}`;
    await sendEmail(adminEmail, adminSubject, adminText);

    // Respond with success, including token and user data
    return NextResponse.json(
      { 
        message: 'Agent created successfully', 
        token, 
        user 
      }, 
      { status: 201 }
    );
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

    // Fetch all agents with the role of 'agent'
    const agents = await Agent.find({ role: 'agent' });

    // Return the filtered agents as a response
    return NextResponse.json({ agents }, { status: 200 });
  } catch (error) {
    console.error('Error fetching agents:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}



export async function DELETE(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'Agent ID is required' }, { status: 400 });
    }

    await Agent.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Agent deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting agent:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ message: 'Agent ID is required' }, { status: 400 });
    }

    const agent = await Agent.findByIdAndUpdate(id, { verified: true }, { new: true });
    return NextResponse.json({ agent }, { status: 200 });
  } catch (error) {
    console.error('Error verifying agent:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}