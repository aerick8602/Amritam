'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="h-screen bg-gradient-to-b from-green-600 to-green-950 flex flex-col justify-center items-center text-white text-center">
      <Image
        className="w-[350px] mb-8 hover:scale-125 transition-transform duration-1000 ease-in-out blur-md invert drop-shadow-xl md:filter-none"
        src="https://www.amritam.co/amritam.png"
        alt="Amritam Logo"
        width={350}
        height={200} // Adjust height as needed
      />
      <h1 className="flex gap-12 text-5xl md:text-7xl font-bold mb-4">
        <p className="hover:scale-110 transition-transform duration-500 ease-in-out bg-gradient-to-r from-green-100 via-white to-green-500 text-transparent bg-clip-text">
          Welcome
        </p>
        <p className="hover:scale-110 transition-transform duration-500 ease-in-out bg-gradient-to-r from-green-100 via-white to-green-500 text-transparent bg-clip-text">
          to
        </p>
        <p className="hover:scale-110 transition-transform duration-500 ease-in-out bg-gradient-to-r from-green-100 via-white to-green-500 text-transparent bg-clip-text">
          Amritam
        </p>
      </h1>
      <p className="text-lg md:text-xl mb-8 mx-4 transition-all duration-300 ease-in-out">
        Reintroducing natural and organic products to nourish your body and mind. Experience the vitality of pure, wholesome food.
      </p>
      <Link href="/components/signup">
        <button className="bg-green-700 px-10 py-4 rounded-full font-bold text-xl cursor-pointer hover:bg-green-800 transition-transform transform hover:scale-105 shadow-lg">
          Explore
        </button>
      </Link>
      <footer className="mt-auto text-sm md:text-base text-gray-300 py-4">
        <p>&copy; {new Date().getFullYear()} Amritam. All rights reserved.</p>
        <p>Developed by Ayush Katiyar</p>
      </footer>
    </div>
  );
}
