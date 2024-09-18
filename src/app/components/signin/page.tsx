"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaAngleLeft } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { ClipLoader } from "react-spinners";

interface SignInRequestBody {
    email: string;
    password: string;
}

interface AxiosError {
    response?: {
        data?: {
            message?: string;
        };
    };
}

export default function SignInPage() {
    const [user, setUser] = useState<SignInRequestBody>({
        email: '',
        password: '',
    });

    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<string>('');
    const [serverError, setServerError] = useState<string>('');

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const onSignIn = async (): Promise<void> => {
        if (!validateEmail(user.email)) {
            setEmailError("Please enter a valid email address");
            return;
        }

        try {
            setLoading(true);
            setServerError("");
            const response = await axios.post("/api/users/signin", {
                email: user.email,
                password: user.password,
            });
            console.log("Sign in successful", response.data);
            window.location.href = 'https://www.amritam.co/';
        } catch (error) {
            console.log("Failed to sign in", error);
            const axiosError = error as AxiosError;
            const responseError = axiosError.response?.data?.message;
            const errorMessage = responseError || "Invalid credentials. Please try again.";
            setServerError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
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
            {loading ? (
                <div className="flex justify-center items-center h-full">
                    <ClipLoader color="green" size={50} />
                </div>
            ) : (
                <div className="h-full form-container bg-white shadow-lg rounded-lg p-8">
                    <div className="flex justify-center">
                        <Image
                            src="https://www.amritam.co/amritam.png"
                            alt="Logo"
                            width={200}
                            height={200}
                            className="w-[200px]"
                        />
                    </div>
                    <h5 className="text-lg font-bold text-center mb-4 mx-7">Sign In to Your Account</h5>

                    <form className="space-y-6">
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
                            <Link href="/components/signup" className="text-sm text-gray-600">
                                <p className="text-sm text-gray-600">
                                    Don&apos;t have an account? <b className="text-red-500 hover:underline">Sign Up</b>
                                </p>
                            </Link>
                        </div>

                        <button
                            type="button"
                            onClick={onSignIn}
                            className={`lgbtn w-full p-3 text-white font-bold rounded-lg ${buttonDisabled ? 'bg-gray-400' : 'bg-green-800 hover:bg-green-950 hover:scale-105 transition duration-300 ease-in-out'}`}
                            disabled={buttonDisabled}
                        >
                            Sign In
                        </button>
                    </form>

                    <Link href="/" className="mt-4 text-center block text-gray-400">
                        <FaAngleLeft className="inline mr-1" /> Return to Home
                    </Link>
                </div>
            )}
        </div>
    );
}
