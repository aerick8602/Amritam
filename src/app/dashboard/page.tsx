'use client';

import React from 'react';

export default function Dashboard() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-800 via-green-600 to-green-800 text-white">
            <div className="p-10 bg-green-700 rounded-lg shadow-xl text-center">
                <h1 className="text-5xl font-bold mb-6">Welcome to My Dashboard!</h1>
                <p className="text-2xl mb-6">Hi, I&apos;m Ayush, the developer behind this page. It&apos;s great to have you here!</p>
                <p className="text-lg">Explore the features and let me know if you need any assistance. Enjoy my experience!</p>
            </div>
        </div>
    );
}
