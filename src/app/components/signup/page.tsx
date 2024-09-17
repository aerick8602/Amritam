"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FaAngleLeft } from 'react-icons/fa6';
import Link from 'next/link';
import Image from 'next/image';

interface SignUpRequestBody {
    username: string;
    email: string;
    password: string;
}

export default function SignUpPage() {
    const router = useRouter();

    const [user, setUser] = useState<SignUpRequestBody>({
        username: '',
        email: '',
        password: '',
    });

    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<string>('');
    const [serverError, setServerError] = useState<string>('');

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const onSignUp = async (): Promise<void> => {
        if (!validateEmail(user.email)) {
            setEmailError('Please enter a valid email address');
            return;
        }

        try {
            setLoading(true);
            setServerError(''); // Clear previous errors
            const response = await axios.post('/api/users/signup', user);
            console.log('Sign up successful', response.data);
            router.push('/dashboard');
        } catch (error: unknown) {
            console.log('Failed to sign up', error);
            const errorMessage = (error as Error).message || 'Sign up failed. Please try again.';
            setServerError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.username.length > 0 && user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    useEffect(() => {
        if (user.email.length > 0 && !validateEmail(user.email)) {
            setEmailError('Please enter a valid email address');
        } else {
            setEmailError('');
        }
    }, [user.email]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(https://www.amritam.co/bg-1.jpg)' }}>
            <div className="h-full form-container bg-white shadow-lg rounded-lg p-8">
                <div className="flex justify-center">
                    <Image
                        src="https://www.amritam.co/amritam.png"
                        alt="Logo"
                        width={200}
                        height={200} // Adjust width and height as needed
                        className="w-[200px]"
                    />
                </div>
                <h5 className="text-lg font-bold text-center mb-4 mx-7">Create your free account</h5>

                <form className="space-y-6">
                    <div className="input-wrapper">
                        <input
                            type="text"
                            placeholder="Enter your username"
                            className="logininput w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                        />
                    </div>

                    <div className="input-wrapper">
                        <input
                            type="text"
                            placeholder="Enter your email"
                            className="logininput w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                        />
                        {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                    </div>

                    <div className="input-wrapper">
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="logininput w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                        />
                    </div>

                    {serverError && <p className="text-red-500 text-sm mt-1 text-center">{serverError}</p>}

                    <div className="social-container mt-4 text-center">
                        <Link href="/components/signin" className="text-sm text-gray-600">
                            <p className="text-sm text-gray-600">
                                Already have an account? <b className="text-red-500 hover:underline">Sign In</b>
                            </p>

                        </Link>
                    </div>

                    <button
                        type="button"
                        onClick={onSignUp}
                        className={`lgbtn w-full p-3 text-white font-bold rounded-lg ${buttonDisabled ? 'bg-gray-400' : 'bg-green-800 hover:bg-green-950 hover:scale-105 transition duration-300 ease-in-out'}`}
                        disabled={buttonDisabled}
                    >
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>
                <Link href="/" className="mt-4 text-center block text-gray-400">
                    <FaAngleLeft className="inline mr-1" /> Return to Home
                </Link>
            </div>
        </div>
    );
}
