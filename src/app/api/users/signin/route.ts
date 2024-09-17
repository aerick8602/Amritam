import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { connectToMongoDB } from '@/connection/db';
import User from '@/models/user';

// Connect to MongoDB
connectToMongoDB();

// Define the type for the request body
interface SignInRequestBody {
    email: string;
    password: string;
}

export async function POST(request: NextRequest) {
    try {
        // 1- Grab the data inside the request
        const reqBody: SignInRequestBody = await request.json();

        // 1.1 Destructure the data
        const { email, password } = reqBody;
        console.log(reqBody);

        // 2- Check if this user exists by checking its email before login
        const user = await User.findOne({ email });
        // No valid user
        if (!user) {
            return NextResponse.json(
                { error: 'User does not exist in DB' },
                { status: 400 }
            );
        }
        console.log(user);

        // 3- Check if the password is correct
        const validPassword = await bcryptjs.compare(password, user.password);
        // Not valid password
        if (!validPassword) {
            return NextResponse.json({ error: 'Invalid password' }, { status: 400 });
        }

        // 4- Create the TOKEN data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

        // 4.1 - Create TOKEN
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
            expiresIn: '2d',
        });

        // User's cookies
        const response = NextResponse.json({
            message: 'Login Successful',
            success: true,
        });

        // 4.2- Send TOKEN to user's cookies
        response.cookies.set('token', token, { httpOnly: true });
        return response;
    } catch (error) {
        // Type the error object correctly
        const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
