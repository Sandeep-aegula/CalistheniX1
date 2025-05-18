'use client';

import Image from "next/image";
import Link from "next/link";
import welcome from "@/public/images/welcome.png";
import { SignInButton, useUser } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Press_Start_2P } from "next/font/google";

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-press-start'
});

export default function WelcomePage() {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  // Redirect signed-in users to the home page
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push('/home');
    }
  }, [isLoaded, isSignedIn, router]);

  // Show loading or null while checking auth state
  if (!isLoaded) {
    return <div className="min-h-screen bg-[#18191A] flex items-center justify-center text-white">Loading...</div>;
  }

  // Render welcome page only if signed out
  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-end pb-20 min-h-screen  bg-[#18191A]">
        <h1 className="text-4xl md:text-5xl font-extrabold font-mono text-white mb-2">
         <span className={pressStart2P.className}>W</span>elcome to Calistheni<span className="text-yellow-400">X</span>
        </h1>
        <p className="text-gray-300 mb-8 text-lg">The Game of Gains</p>
        <Image
          src={welcome} 
          alt="CalistheniX Mascot"
          width={550}
          height={250}
          className=""
          priority
        />
        <SignInButton forceRedirectUrl="/home">
          <button className="bg-yellow-600 w-auto cursor:pointer hover:bg-yellow-500 text-white font-mono font-bold py-3 px-40 rounded-full text-lg shadow-lg transition">
            Get Started
          </button>
        </SignInButton>
      </div>
    );
  }

  // Render nothing or a loading state if signed in and redirecting
  return <div className="min-h-screen bg-[#18191A] flex items-center justify-center text-white">Loading...</div>;
} 
