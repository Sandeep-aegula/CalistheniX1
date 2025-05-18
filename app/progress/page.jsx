'use client'

import Header from '@/components/header';
import WorkoutCard from '@/app/components/WorkoutCard';
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { selectWorkout, completeMission, getWorkoutStatus } from '@/_actions/WorkoutActions';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Press_Start_2P } from "next/font/google";

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-press-start'
});

const WorkoutsPage = () => {
    const { isLoaded, isSignedIn, user } = useUser();
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [streak, setStreak] = useState(0);
    const [message, setMessage] = useState('');
    const [workoutStatus, setWorkoutStatus] = useState(null);
    const [missions, setMissions] = useState([]);

    // Define workout cards data
    const workoutCards = [
        { title: "Beginner", imagePath: "/images/beginner.png", type: "beginner" },
        { title: "Skills", imagePath: "/images/skills.png", type: "skills" },
        { title: "Fat Burn", imagePath: "/images/fatburn.png", type: "fat-burn" },
        { title: "Strength", imagePath: "/images/strength.png", type: "strength" },
    ];

    // Mock data for missions
    const mockMissions = {
        beginner: [
            { id: 1, title: "Complete 10 push-ups", completed: false },
            { id: 2, title: "Do 5 minutes of stretching", completed: false },
            { id: 3, title: "Walk for 15 minutes", completed: false }
        ],
        skills: [
            { id: 4, title: "Practice handstand for 5 minutes", completed: false },
            { id: 5, title: "Do 3 pull-ups", completed: false },
            { id: 6, title: "Work on muscle-up technique", completed: false }
        ],
        "fat-burn": [
            { id: 7, title: "Complete 20 burpees", completed: false },
            { id: 8, title: "Do 30 seconds of mountain climbers", completed: false },
            { id: 9, title: "Run in place for 5 minutes", completed: false }
        ],
        strength: [
            { id: 10, title: "Do 15 push-ups", completed: false },
            { id: 11, title: "Complete 10 pull-ups", completed: false },
            { id: 12, title: "Hold plank for 1 minute", completed: false }
        ]
    };

    useEffect(() => {
        if (isSignedIn && user) {
            loadWorkoutStatus();
        }
    }, [isSignedIn, user]);

    const loadWorkoutStatus = async () => {
        try {
            const status = await getWorkoutStatus(user.emailAddresses[0].emailAddress);
            console.log('Workout Status:', status); // Debug log
            
            if (status.success) {
                setWorkoutStatus(status);
                setSelectedWorkout(status.currentWorkoutType);
                setStreak(status.streak || 0);
                if (status.currentWorkoutType) {
                    const workoutMissions = mockMissions[status.currentWorkoutType];
                    console.log('Setting missions:', workoutMissions); // Debug log
                    setMissions(workoutMissions);
                } else {
                    setMissions([]);
                }
            }
        } catch (error) {
            console.error('Error loading workout status:', error);
            setMessage('Error loading workout status');
        }
    };

    const handleWorkoutSelect = async (workoutType) => {
        if (!isSignedIn) {
            setMessage('Please sign in to select a workout');
            return;
        }

        const result = await selectWorkout(user.emailAddresses[0].emailAddress, workoutType);
        
        if (result.error) {
            setMessage(result.error);
        } else {
            setMessage('Workout selected successfully!');
            setSelectedWorkout(workoutType);
            setMissions(mockMissions[workoutType]);
            loadWorkoutStatus();
        }
    };

    const handleMissionComplete = async (missionId) => {
        if (!isSignedIn) {
            setMessage('Please sign in to complete missions');
            return;
        }

        const result = await completeMission(user.emailAddresses[0].emailAddress, missionId);
        
        if (result.error) {
            setMessage(result.error);
        } else {
            setMessage('Mission completed!');
            setStreak(result.streak);
            loadWorkoutStatus();
        }
    };

    const getProgress = () => {
        console.log('Current missions:', missions); // Debug log
        console.log('Workout status:', workoutStatus); // Debug log
        
        if (!missions || !workoutStatus || !workoutStatus.completedMissions) {
            console.log('Returning 0 because:', { 
                missions: !missions, 
                workoutStatus: !workoutStatus, 
                completedMissions: !workoutStatus?.completedMissions 
            });
            return 0;
        }
        
        const totalMissions = missions.length;
        const completed = workoutStatus.completedMissions.filter(m => 
            missions.some(mission => mission.id.toString() === m.missionId)
        ).length;
        
        console.log('Progress calculation:', { totalMissions, completed }); // Debug log
        return (completed / totalMissions) * 100;
    };

    return (
        <div className="min-h-screen ">
            <h1 className="text-3xl font-bold mx-10  mt-10">Progress</h1>
              <Header />
        
            <main className="container mx-auto px-4 py-8  mb-16">
               

                    {/* Right Column - Streak and Missions */}
                    <div className="space-y-6">
                        {/* Streak Counter */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Current Streak</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center  gap-4">
                                    <div className="text-4xl">🔥</div>
                                    <div className="text-3xl font-bold">{streak} days</div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Daily Missions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Daily Missions</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {selectedWorkout ? (
                                    <>
                                        <Progress value={getProgress()} className="mb-4" />
                                        <div className="space-y-4 ">
                                            {missions.map((mission) => {
                                                const isCompleted = workoutStatus?.completedMissions.some(
                                                    m => m.missionId === mission.id.toString()
                                                );
                                                return (
                                                    <Card key={mission.id} className={isCompleted ? "bg-muted" : ""}>
                                                        <CardContent className="p-4 flex justify-between text-yellow-400 items-center">
                                                            <span className="text-lg">{mission.title}</span>
                                                            {isCompleted ? (
                                                                <Badge variant="success">Completed</Badge>
                                                            ) : (
                                                                <button className={"text-yellow-400"}
                                                                    onClick={() => handleMissionComplete(mission.id.toString())}
                                                                   
                                                                >
                                                                    Complete
                                                                </button>
                                                            )}
                                                        </CardContent>
                                                    </Card>
                                                );
                                            })}
                                        </div>
                                    </>
                                ) : (
                                    <p className="text-muted-foreground">Select a workout to see your daily missions</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
               
            </main>
        </div>
    );
};

export default WorkoutsPage;