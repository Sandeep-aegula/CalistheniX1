'use client';

import Header from '@/components/header';
import { useUser } from "@clerk/nextjs";
import { setCurrentWorkout, completeMission, getCurrentMissions } from '@/app/_actions/MissionActions';
import { useState, useEffect } from 'react';

const WorkoutCard = ({ type, title, description, onClick, isSelected }) => (
    <div 
        className={`bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 cursor-pointer transition-all hover:scale-105 ${
            isSelected ? 'ring-2 ring-blue-500' : ''
        }`}
        onClick={onClick}
    >
        <h3 className="text-xl font-bold text-blue-600 mb-2 capitalize">{title}</h3>
        <p className="text-gray-300">{description}</p>
    </div>
);

const MissionItem = ({ mission, onComplete, isCompleted }) => (
    <div className={`flex items-center justify-between p-4 rounded-lg border ${
        isCompleted 
            ? 'bg-green-600/20 border-green-500/50' 
            : 'bg-white/5 border-white/10'
    }`}>
        <div>
            <h4 className="text-lg font-medium text-white">{mission.title}</h4>
            <p className="text-sm text-gray-300">Difficulty: {mission.difficulty}</p>
        </div>
        <button
            onClick={() => onComplete(mission.id)}
            disabled={isCompleted}
            className={`px-4 py-2 rounded-lg ${
                isCompleted 
                    ? 'bg-green-500/50 text-white cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
        >
            {isCompleted ? 'Completed' : 'Complete'}
        </button>
    </div>
);

const WorkoutsPage = () => {
    const { isLoaded, isSignedIn, user } = useUser();
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [missions, setMissions] = useState([]);
    const [streak, setStreak] = useState(0);
    const [loading, setLoading] = useState(false);

    const workoutTypes = [
        {
            type: 'beginner',
            title: 'Beginner Workout',
            description: 'Perfect for those just starting their calisthenics journey'
        },
        {
            type: 'skills',
            title: 'Skills Training',
            description: 'Focus on advanced movements and skill development'
        },
        {
            type: 'fat-burn',
            title: 'Fat Burn',
            description: 'High-intensity workouts to maximize calorie burn'
        },
        {
            type: 'strength',
            title: 'Strength Building',
            description: 'Build raw strength with progressive overload'
        }
    ];

    useEffect(() => {
        const fetchMissions = async () => {
            if (user?.primaryEmailAddress?.emailAddress) {
                const data = await getCurrentMissions(user.primaryEmailAddress.emailAddress);
                if (data.success) {
                    setMissions(data.missions);
                    setStreak(data.streak);
                    setSelectedWorkout(data.currentWorkoutType);
                }
            }
        };

        if (isSignedIn) {
            fetchMissions();
        }
    }, [isSignedIn, user]);

    const handleWorkoutSelect = async (workoutType) => {
        if (!user?.primaryEmailAddress?.emailAddress) return;
        
        setLoading(true);
        try {
            const result = await setCurrentWorkout(
                user.primaryEmailAddress.emailAddress,
                workoutType
            );
            if (result.success) {
                setSelectedWorkout(workoutType);
                setMissions(result.missions.map(mission => ({
                    ...mission,
                    completed: false
                })));
            }
        } catch (error) {
            console.error('Error selecting workout:', error);
        }
        setLoading(false);
    };

    const handleMissionComplete = async (missionId) => {
        if (!user?.primaryEmailAddress?.emailAddress) return;
        
        setLoading(true);
        try {
            const result = await completeMission(
                user.primaryEmailAddress.emailAddress,
                missionId
            );
            if (result.success) {
                setMissions(prevMissions => 
                    prevMissions.map(mission => 
                        mission.id === missionId 
                            ? { ...mission, completed: true }
                            : mission
                    )
                );
                if (result.allCompleted) {
                    setStreak(result.newStreak);
                }
            }
        } catch (error) {
            console.error('Error completing mission:', error);
        }
        setLoading(false);
    };

    if (!isLoaded) {
        return (
            <div className="min-h-screen bg-yellow/80 backdrop-blur-md text-white font-sans flex flex-col">
                <Header />
                <main className="flex-grow container mx-auto px-4 py-8 mt-20 mb-16 min-h-screen flex items-center justify-center">
                    <div className="text-xl">Loading...</div>
                </main>
            </div>
        );
    }

    if (!isSignedIn) {
        return (
            <div className="min-h-screen bg-yellow/80 backdrop-blur-md text-white font-sans flex flex-col">
                <Header />
                <main className="flex-grow container mx-auto px-4 py-8 mt-20 mb-16 min-h-screen flex items-center justify-center">
                    <div className="text-xl">Please sign in to view workouts</div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-yellow/80 backdrop-blur-md text-white font-sans flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 mt-20 mb-16 min-h-screen">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-blue-600">Workouts</h1>
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">🔥</span>
                        <span className="text-xl font-bold">{streak} day streak</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Workout Selection */}
                    <div>
                        <h2 className="text-2xl font-bold text-blue-600 mb-4">Select Workout</h2>
                        <div className="grid grid-cols-1 gap-4">
                            {workoutTypes.map((workout) => (
                                <WorkoutCard
                                    key={workout.type}
                                    {...workout}
                                    isSelected={selectedWorkout === workout.type}
                                    onClick={() => handleWorkoutSelect(workout.type)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Daily Missions */}
                    <div>
                        <h2 className="text-2xl font-bold text-blue-600 mb-4">Daily Missions</h2>
                        {selectedWorkout ? (
                            <div className="space-y-4">
                                {missions.map((mission) => (
                                    <MissionItem
                                        key={mission.id}
                                        mission={mission}
                                        isCompleted={mission.completed}
                                        onComplete={handleMissionComplete}
                                    />
                                ))}
                                    </div>
                        ) : (
                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                                <p className="text-gray-300">Select a workout to see your daily missions</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default WorkoutsPage; 