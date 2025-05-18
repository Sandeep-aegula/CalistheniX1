'use client';
import { press_2_start } from "next/font/google";
import Header from '@/components/header';
import { useUser , } from "@clerk/nextjs";
import { getCurrentMissions } from '@/_actions/MissionActions';
import { useEffect, useState, Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Image from 'next/image';
import welcome from '@/public/images/profile.png';
import strength from '@/public/images/strength.png';

const ProfileContent = () => {
    const { isLoaded, isSignedIn, user } = useUser();
    const [missions, setMissions] = useState([]);
    const [streak, setStreak] = useState(0);
    const [currentWorkoutType, setCurrentWorkoutType] = useState(null);
    const [loading, setLoading] = useState(true);
    const [lastMissionUpdate, setLastMissionUpdate] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [streakDates, setStreakDates] = useState([]);

    useEffect(() => {
        if (isSignedIn && user) {
            loadMissions();
            // Set up interval to check for new day
            const interval = setInterval(checkForNewDay, 60000); // Check every minute
            return () => clearInterval(interval);
        }
    }, [isSignedIn, user]);

    const checkForNewDay = () => {
        const now = new Date();
        const lastUpdate = lastMissionUpdate ? new Date(lastMissionUpdate) : null;
        
        // If it's after midnight and we haven't updated today
        if (lastUpdate && 
            now.getDate() !== lastUpdate.getDate() && 
            now.getHours() >= 0) {
            loadMissions();
        }
    };

    const loadMissions = async () => {
        try {
            setLoading(true);
            const result = await getCurrentMissions(user.emailAddresses[0].emailAddress);
            if (result.success) {
                setMissions(result.missions);
                setStreak(result.streak);
                setCurrentWorkoutType(result.currentWorkoutType);
                setLastMissionUpdate(new Date().toISOString());
                setStreakDates(result.streakDates || []);
            }
        } catch (error) {
            console.error('Error loading missions:', error);
        } finally {
            setLoading(false);
        }
    };

    const getProgress = () => {
        if (!missions.length) return 0;
        const completed = missions.filter(mission => mission.completed).length;
        return (completed / missions.length) * 100;
    };

    const getNextMissionUpdate = () => {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        
        const timeUntilUpdate = tomorrow - now;
        const hours = Math.floor(timeUntilUpdate / (1000 * 60 * 60));
        const minutes = Math.floor((timeUntilUpdate % (1000 * 60 * 60)) / (1000 * 60));
        
        return `${hours}h ${minutes}m`;
    };

    const getDaysInMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    };

    const isDateInStreak = (date) => {
        return streakDates.some(streakDate => {
            const streakDateObj = new Date(streakDate);
            return streakDateObj.getFullYear() === date.getFullYear() &&
                   streakDateObj.getMonth() === date.getMonth() &&
                   streakDateObj.getDate() === date.getDate();
        });
    };

    const renderCalendar = () => {
        const daysInMonth = getDaysInMonth(currentMonth);
        const days = [];

        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
            const isToday = date.toDateString() === new Date().toDateString();
            const isStreakDay = isDateInStreak(date);

            days.push(
                <div 
                    key={i} 
                    className={`flex-none w-20 h-24 flex flex-col items-center justify-center rounded-lg font-mono p-2
                        ${isStreakDay ? 'bg-yellow-600' : 'bg-gray-800'}
                        ${isToday ? 'ring-2 ring-white' : ''}
                        text-white text-center`}
                >
                     <span className="text-sm text-gray-400">{date.toLocaleString('default', { weekday: 'short' })}</span>
                     <span className="text-2xl mt-2">{i}</span>
                </div>
            );
        }

        return days;
    };

    if (!isLoaded || loading) {
        return <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>Loading...</div>;
    }

    if (!isSignedIn) {
        return <div>Please sign in to view your profile</div>;
    }

    return (
        <div className="min-h-screen bg-[#18191A] text-white font-sans">
           
            
            <main className="container mx-auto px-4 py-8 ">
                {/* User Profile Section */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="relative w-32 h-32 rounded-full bg-gray-800 overflow-hidden">
                    
                        <Image 
                            src={strength} 
                            alt="Player" 
                            fill
                             className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <h1 className="text-4xl font-mono text-white">{user.fullName}</h1>
                        <div className="flex gap-8 mt-4 text-gray-400">
                            <div>
                                <p>Age</p>
                                <p className="text-white font-mono">{user?.age || "20"} yo</p>
                            </div>
                            <div>
                                <p>Height</p>
                                <p className="text-white font-mono">5.9 ft</p>
                            </div>
                            <div>
                                <p>Weight</p>
                                <p className="text-white font-mono">60 kilos</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* User Info and Missions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    {/* User Info Card */}
                    <Card className="bg-gray-800 border-gray-700">
                        <CardHeader>
                            <CardTitle className="text-white">User Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-400">Email</p>
                                    <p className="text-lg text-white">{user.emailAddresses[0].emailAddress}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Current Streak</p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">🔥</span>
                                        <p className="text-lg text-white">{streak} days</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Current Workout</p>
                                    <p className="text-lg text-white capitalize">{currentWorkoutType || 'None selected'}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                
                </div>

                

                {/* Workouts Section */}
                <div>
                    <h2 className="text-white font-mono text-xl mb-4">Workouts</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative h-48 bg-gray-800 rounded-lg overflow-hidden">
                            <Image 
                                src={strength} 
                                alt="Strength" 
                                fill
                                className="object-cover opacity-50"
                            />
                            <div className="absolute bottom-4 left-4">
                                <h3 className="text-white font-mono text-2xl">Strength</h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                 
            </main>
        </div>
    );
};

const ProfilePage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ProfileContent />
        </Suspense>
    );
};

export default ProfilePage;