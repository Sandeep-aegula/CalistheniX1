"use client"
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import welcome from '@/public/images/profile.png';
import { Press_Start_2P } from "next/font/google";

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-press-start'
});

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();
  
  const [today] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(new Date(today));
  const [completedByDate, setCompletedByDate] = useState({});

  const dailyMissions = [
    { name: "Complete 10 push-ups" },
    { name: "Do 5 minutes of stretching" },
    { name: "Walk for 15 minutes" }
  ];

  const formatDateKey = (date) => {
    return date.toISOString().split('T')[0];
  };

  const handleMissionComplete = (index) => {
    const dateKey = formatDateKey(selectedDate);
    setCompletedByDate(prev => {
      const newState = { ...prev };
      if (!newState[dateKey]) {
        newState[dateKey] = [];
      }
      if (!newState[dateKey].includes(index)) {
        newState[dateKey] = [...newState[dateKey], index];
      }
      return newState;
    });
  };

  const generateCalendarDays = (month, year) => {
    const days = [];
    const daysInView = 7; // Show 7 days at a time
    const startDate = new Date(year, month, selectedDate.getDate() - 3); // 3 days before selected

    for (let i = 0; i < daysInView; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      const isSelected = currentDate.getDate() === selectedDate.getDate() && 
                        currentDate.getMonth() === selectedDate.getMonth() && 
                        currentDate.getFullYear() === selectedDate.getFullYear();

      days.push(
        <div
          key={i}
          className={`p-3 rounded-xl text-center w-16 cursor-pointer
            ${isSelected 
              ? 'bg-gradient-to-b from-[#FFD700] to-[#916f15] text-black' 
              : 'bg-[#1f1f1f] text-white hover:bg-[#2D2D2D]'
            }`}
          onClick={() => setSelectedDate(new Date(currentDate))}
        >
          <div className="text-xs text-gray-400 mb-1">
            {currentDate.toLocaleDateString('en-US', { weekday: 'short' })}
          </div>
          <div className="text-lg">
            {currentDate.getDate()}
          </div>
        </div>
      );
    }
    return days;
  };

  const scrollCalendar = (direction) => {
    const newDate = new Date(currentYear, currentMonth + direction, 1);
    setCurrentMonth(newDate.getMonth());
    setCurrentYear(newDate.getFullYear());
  };

  const monthYearText = `${new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} ${currentYear}`;
  const calendarDays = generateCalendarDays(currentMonth, currentYear);
  const completedIndexes = completedByDate[formatDateKey(selectedDate)] || [];

  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#18191A] text-white mb-15 p-4">
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
        <h1 className="text-2xl font-mono">{user?.firstName || 'Player'}</h1>
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
        <div className="flex justify-center items-center gap-3 text-base mb-6">
          <button 
            className="text-gray-400 text-2xl hover:text-gray-300"
            onClick={() => scrollCalendar(-1)}
          >
            &#x3c;
          </button>
          <div className="text-white font-press-start">
            {monthYearText}
          </div>
          <button 
            className="text-gray-400 text-2xl hover:text-gray-300"
            onClick={() => scrollCalendar(1)}
          >
            &#x3e;
          </button>
        </div>
        <div className="flex justify-center gap-2 overflow-x-auto px-4">
          {calendarDays}
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
                className={`px-4 py-2 rounded-md bg-yellow-600 text-white font-mono ${
                  completedIndexes.includes(index) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={() => handleMissionComplete(index)}
                disabled={completedIndexes.includes(index)}
              >
                {completedIndexes.includes(index) ? 'Completed' : 'Done'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}