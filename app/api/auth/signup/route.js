import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb'; // Assuming you have a dbConnect utility
import User from '../../../models/User'; 
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    console.log('Connecting to database...');
    await dbConnect();
    console.log('Database connected successfully');

    const { name, email, password, role } = await request.json();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    // Respond with success
    return NextResponse.json({ message: 'User created successfully', user }, { status: 201 });
  } catch (error) {
    console.error('Error in POST function:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}