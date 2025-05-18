'use client';

import { useUser } from "@clerk/nextjs";
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import welcome from '@/public/images/profile.png';
export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const dailyMissions = [
    {
      name: "Complete 10 push-ups",
      isDone: true
    },
    {
      name: "Do 5 minutes of stretching",
      isDone: true
    },
    {
      name: "Walk for 15 minutes",
      isDone: true
    }
  ];

  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#18191A] text-white   mb-15 p-4">
      {/* Stats Bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-xs">
          <span className="bg-[#2D2D2D] px-2 py-1 rounded-md">LVL 0</span>
        </div>
        <div className="text-xs">
          <span className="bg-[#2D2D2D] px-2 py-1 rounded-md">XP 0</span>
        </div>
      </div>

      {/* Welcome Section with Character */}
      <div className="mb-4">
        <p className="text-gray-400 text-sm">Welcome Back,</p>
        <h1 className="text-2xl font-mono">Player</h1>
      </div>

      {/* Character Section with Progress */}
      <div className="relative mb-8">
        <div className="h-[400px] w-[400px] mx-auto flex items-center justify-center">
          <Image
            src={welcome}
            alt="CalistheniX Mascot"
            width={400}
            height={400}
            className="object-contain"
            priority
          />
        </div>
        
        {/* Level Progress Bar */}
        <div className="flex items-center gap-2 mt-4">
          <span className="text-xs text-gray-400">LVL</span>
          <div className="flex-1 relative h-2">
            <div className="absolute inset-0 bg-[#2D2D2D] rounded-full"></div>
            <div className="absolute inset-0 bg-yellow-600 rounded-full w-1/3">
              <div className="absolute -right-1 -top-1 w-4 h-4 bg-yellow-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <ChevronLeft className="text-gray-400 cursor-pointer" />
          <h2 className="text-xl font-mono">May 2025</h2>
          <ChevronRight className="text-gray-400 cursor-pointer" />
        </div>
        <div className="flex justify-between">
          {[
            { day: 'Mon', date: 11 },
            { day: 'Tue', date: 12 },
            { day: 'Wed', date: 13 },
            { day: 'Thu', date: 14 },
            { day: 'Fri', date: 15 },
            { day: 'Sat', date: 16 },
            { day: 'Sun', date: 17 },
          ].map(({ day, date }) => (
            <div
              key={date}
              className={`w-[13%] h-24 flex flex-col items-center justify-center rounded-xl
                ${date === 14 ? 'bg-yellow-600' : 'bg-[#2D2D2D]'}
                ${date === 14 ? 'ring-2 ring-yellow-600' : ''}`}
            >
              <span className="text-xs text-gray-400 mb-1">{day}</span>
              <span className="text-lg text-white">{date}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Missions */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-2xl font-mono">Daily Missions</h2>
          <div className="flex items-center">
            <span className="text-2xl">🔥</span>
            <span className="text-sm text-gray-400 ml-1">1 day</span>
          </div>
        </div>
        <div className="space-y-3">
          {dailyMissions.map((mission, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-[#2D2D2D] rounded-lg p-4"
            >
              <div>
                <h3 className="font-mono">{mission.name}</h3>
                
              </div>
              <button 
                className="px-4 py-2 rounded-md bg-yellow-600 text-white font-mono"
              >
                {mission.isDone ? 'Completed' : 'Done'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}