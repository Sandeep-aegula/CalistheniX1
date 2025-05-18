'use client'

import React from "react";
import { Button } from "./ui/button";
import { Home, Activity, Trophy, Camera, User, Dumbbell, Crown } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const Header = () => {
    return (
        <footer className="fixed bottom-0 w-full bg-[#18191A] border-t border-gray-800 z-50">
            <nav className="container mx-auto px-4 py-2">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex flex-col items-center">
                        <Home className="w-6 h-6 text-gray-400" />
                        <span className="text-xs text-gray-400 mt-1">Home</span>
                    </Link>
                    
                    <Link href="/workouts" className="flex flex-col items-center">
                        <Dumbbell className="w-6 h-6 text-gray-400" />
                        <span className="text-xs text-gray-400 mt-1">Workouts</span>
                    </Link>
                    
                    <Link href="/leaderboard" className="flex flex-col items-center -mt-6">
                        <div className="w-14 h-14 rounded-full bg-yellow-600 flex items-center justify-center">
                            <Crown className="w-7 h-7 text-white" />
                        </div>
                    </Link>
                    
                    <Link href="/progress" className="flex flex-col items-center">
                        <Trophy className="w-6 h-6 text-gray-400" />
                        <span className="text-xs text-gray-400 mt-1">Progress</span>
                    </Link>
                    
                    <Link href="/profile" className="flex flex-col items-center">
                    <SignInButton>
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: "w-10 h-10",
                                },
                            }}
                        />
                    </SignInButton>
                        <span className="text-xs text-gray-400 mt-1">Profile</span>
                    </Link>
                </div>
            </nav>
        </footer>
    );
};

export default Header;