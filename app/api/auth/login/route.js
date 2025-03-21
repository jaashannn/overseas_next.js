import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb';
import Agent from '../../../models/Agent'; // Import the Agent model
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    console.log('Connecting to database...');
    await dbConnect();
    console.log('Database connected successfully');

    const { email, password } = await request.json();

    // Check if the email exists in the Agent collection
    const user = await Agent.findOne({ email });

    // If user is not found
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 400 });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Invalid credentials');
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });
    }

    // Determine the role (admin or agent)
    const role = user.role; 
    // Generate JWT token
    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    // Respond with token and user details
    return NextResponse.json(
      { message: 'Logged in successfully', token, user: { id: user._id, role } },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in POST function:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}