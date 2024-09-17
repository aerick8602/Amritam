import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { connectToMongoDB } from '@/connection/db';
import User from '@/models/user';

// Connect to MongoDB
connectToMongoDB();

// Define the type for the request body
interface SignUpRequestBody {
    username: string;
    email: string;
    password: string;
}

// POST route (Create a new user inside the DB)
export async function POST(request: NextRequest) {
    try {
        // Grab data from body
        const reqBody: SignUpRequestBody = await request.json();

        // Destructure the incoming variables
        const { username, email, password } = reqBody;

        // REMOVE IN PRODUCTION
        console.log(reqBody);

        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json(
                { error: 'This user already exists' },
                { status: 400 }
            );
        }

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save it inside the DB
        const savedUser = await newUser.save();

        return NextResponse.json({
            message: 'User created!',
            success: true,
            savedUser,
        });
    } catch (error) {
        // Type the error object correctly
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
