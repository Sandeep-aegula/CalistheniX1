'use client';

import Header from '@/components/header';
import { useUser } from "@clerk/nextjs";
import { getCurrentMissions } from '@/_actions/MissionActions';
import { useEffect, useState, Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const ProfileContent = () => {
    const { isLoaded, isSignedIn, user } = useUser();
    const [missions, setMissions] = useState([]);
    const [streak, setStreak] = useState(0);
    const [currentWorkoutType, setCurrentWorkoutType] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isSignedIn && user) {
            loadMissions();
        }
    }, [isSignedIn, user]);

    const loadMissions = async () => {
        try {
            setLoading(true);
            const result = await getCurrentMissions(user.emailAddresses[0].emailAddress);
            if (result.success) {
                setMissions(result.missions);
                setStreak(result.streak);
                setCurrentWorkoutType(result.currentWorkoutType);
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

    if (!isLoaded || loading) {
        return <div>Loading...</div>;
    }

    if (!isSignedIn) {
        return <div>Please sign in to view your profile</div>;
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />
            
            <main className="container mx-auto px-4 py-8 mt-20 mb-16">
                <h1 className="text-4xl font-bold mb-10">Profile</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* User Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle>User Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">Email</p>
                                    <p className="text-lg">{user.emailAddresses[0].emailAddress}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Current Streak</p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl">🔥</span>
                                        <p className="text-lg">{streak} days</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Current Workout</p>
                                    <p className="text-lg capitalize">{currentWorkoutType || 'None selected'}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Daily Missions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Today's Missions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {currentWorkoutType ? (
                                <>
                                    <Progress value={getProgress()} className="mb-4" />
                                    <div className="space-y-4">
                                        {missions.map((mission) => (
                                            <Card key={mission.id} className={mission.completed ? "bg-muted" : ""}>
                                                <CardContent className="p-4 flex justify-between items-center">
                                                    <span className="text-lg">{mission.title}</span>
                                                    {mission.completed ? (
                                                        <Badge variant="success">Completed</Badge>
                                                    ) : (
                                                        <Badge variant="secondary">Pending</Badge>
                                                    )}
                                                </CardContent>
                                            </Card>
                                        ))}
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

const ProfilePage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ProfileContent />
        </Suspense>
    );
};

export default ProfilePage; 