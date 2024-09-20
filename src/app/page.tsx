'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-green-600 to-green-950 text-white">
      <div className="flex-grow flex flex-col justify-center items-center text-center p-4">
        <Image
          className="w-[350px] mb-8 hover:scale-110 transition-transform duration-1000 ease-in-out blur-md invert drop-shadow-xl md:filter-none"
          src="https://www.amritam.co/amritam.png"
          alt="Amritam Logo"
          width={350}
          height={210}
        />
        <h1 className="flex flex-wrap justify-center gap-6 text-5xl md:text-7xl font-bold mb-4">
          <span className="hover:scale-110 transition-transform duration-500 ease-in-out bg-gradient-to-r from-green-100 via-white to-green-500 text-transparent bg-clip-text">
            Welcome
          </span>
          <span className="hover:scale-110 transition-transform duration-500 ease-in-out bg-gradient-to-r from-green-100 via-white to-green-500 text-transparent bg-clip-text">
            to
          </span>
          <span className="hover:scale-110 transition-transform duration-500 ease-in-out bg-gradient-to-r from-green-100 via-white to-green-500 text-transparent bg-clip-text">
            Amritam
          </span>
        </h1>
        <p className="text-lg md:text-xl mb-8 mx-4 transition-all duration-300 ease-in-out">
          Reintroducing natural and organic products to nourish your body and mind. Experience the vitality of pure, wholesome food.
        </p>
        <Link href="/components/signup">
          <button className="bg-green-700 px-10 py-4 rounded-full font-bold text-xl cursor-pointer hover:bg-green-800 transition-transform transform hover:scale-110 transition-transform duration-300 ease-in-out shadow-lg">
            Explore
          </button>
        </Link>
      </div>
      <footer className="text-gray-300 py-1 w-full text-center text-sm md:text-base opacity-75">
        <p>&copy; {new Date().getFullYear()} Amritam. All rights reserved | Developed by Ayush Katiyar</p>
      </footer>
    </div>
  );
}
