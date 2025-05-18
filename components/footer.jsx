'use client'

import React from "react";
import { Button } from "./ui/button";
import { Mail, Info, Sparkles, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { Press_Start_2P } from 'next/font/google';

const pressStart2P = Press_Start_2P({ 
    weight: '400',
    subsets: ['latin'],
});

const Header = () => {
   
    return (
        <header className={`fixed top-0 w-full bg-yellow/80 backdrop-blur-md z-50 border-b ${pressStart2P.className}`}>
            <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold text-blue-600">
                    CalistheniX
                </Link>

               
                {/* Action Buttons */}
                <div className="flex items-center space-x-4">
                    <SignedIn>
                        <Link
                            href="/"
                            className="text-gray-600 hover:text-blue-600 flex items-center gap-2"
                        >
                            <Button variant="outline" className="font-press-start">
                                <LayoutDashboard size={18} />
                                <span className="hidden md:inline">Home</span>
                            </Button>
                        </Link>
                        <Link
                            href="/workouts"
                            className="text-gray-600 hover:text-blue-600 flex items-center gap-2"
                        >
                            <Button variant="outline" className="font-press-start">
                                <Info size={18} />
                                <span className="hidden md:inline">Workouts</span>
                            </Button>
                        </Link>
                        <Link
                            href="/stats"
                            className="text-gray-600 hover:text-blue-600 flex items-center gap-2"
                        >
                            <Button variant="outline" className="font-press-start">
                                <Sparkles size={18} />
                                <span className="hidden md:inline">Support</span>
                            </Button>
                        </Link>
                        <Link
                            href="/profile"
                            className="text-gray-600 hover:text-blue-600 flex items-center gap-2"
                        >
                            <Button variant="outline" className="font-press-start">
                                <Mail size={18} />
                                <span className="hidden md:inline">Profile</span>
                            </Button>
                        </Link>
                    </SignedIn>
                    <SignedOut>
                        <SignInButton forceRedirectUrl="/profile">
                            <Button variant="outline" className="cursor-pointer font-press-start">Login</Button>
                        </SignInButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: "w-10 h-10",
                                },
                            }}
                        />
                    </SignedIn>
                </div>
            </nav>
        </header>
    );
};

export default Header;