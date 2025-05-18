'use client';

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Medal, Crown } from "lucide-react";

const LeaderboardPage = () => {
    const { isLoaded, isSignedIn, user } = useUser();
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const mockData = [
            { id: 1, name: "Ritesh", score: 2500, streak: 15 },
            { id: 2, name: "shahbaz", score: 2300, streak: 12 },
            { id: 3, name: "suraj", score: 2100, streak: 10 },
            { id: 4, name: "anil", score: 1900, streak: 8 },
            { id: 5, name: "Sandeep aegula", score: 1700, streak: 7 },
        ];
        setLeaderboardData(mockData);
        setLoading(false);
    }, []);

    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase();
    };

    const getRandomColor = (index) => {
        const colors = [
            'bg-blue-600',
            'bg-green-600',
            'bg-purple-600',
            'bg-pink-600',
            'bg-indigo-600',
            'bg-red-600',
            'bg-yellow-600',
            'bg-teal-600',
        ];
        return colors[index % colors.length];
    };

    if (!isLoaded || loading) {
        return <div className="min-h-screen bg-[#18191A] flex items-center justify-center">
            <div className="text-white">Loading...</div>
        </div>;
    }

    if (!isSignedIn) {
        return <div className="min-h-screen bg-[#18191A] flex items-center justify-center">
            <div className="text-white">Please sign in to view the leaderboard</div>
        </div>;
    }

    return (
        <div className="min-h-screen bg-[#18191A] p-4 mb-15">
            <div className="container mx-auto max-w-4xl">
                <h1 className="text-3xl font-bold text-white mb-8 text-center">Leaderboard</h1>

                {/* Top 3 Podium */}
                <div className="flex justify-center items-end gap-4 mb-8">
                    {/* Second Place */}
                    <div className="flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full bg-gray-700 mb-2 relative flex items-center justify-center">
                            <span className="text-2xl font-bold text-white">{getInitials(leaderboardData[1]?.name || "Player 2")}</span>
                            <div className="absolute -top-2 -right-2 bg-gray-400 rounded-full p-1">
                                <Medal className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <div className="text-white text-center">
                            <p className="font-bold">{leaderboardData[1]?.name || "Player 2"}</p>
                            <p className="text-sm text-gray-400">{leaderboardData[1]?.score || 0} pts</p>
                        </div>
                    </div>

                    {/* First Place */}
                    <div className="flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full bg-yellow-600 mb-2 relative flex items-center justify-center">
                            <span className="text-3xl font-bold text-white">{getInitials(leaderboardData[0]?.name || "Player 1")}</span>
                            <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-1">
                                <Crown className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <div className="text-white text-center">
                            <p className="font-bold">{leaderboardData[0]?.name || "Player 1"}</p>
                            <p className="text-sm text-gray-400">{leaderboardData[0]?.score || 0} pts</p>
                        </div>
                    </div>

                    {/* Third Place */}
                    <div className="flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full bg-amber-700 mb-2 relative flex items-center justify-center">
                            <span className="text-2xl font-bold text-white">{getInitials(leaderboardData[2]?.name || "Player 3")}</span>
                            <div className="absolute -top-2 -right-2 bg-amber-600 rounded-full p-1">
                                <Trophy className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <div className="text-white text-center">
                            <p className="font-bold">{leaderboardData[2]?.name || "Player 3"}</p>
                            <p className="text-sm text-gray-400">{leaderboardData[2]?.score || 0} pts</p>
                        </div>
                    </div>
                </div>

                {/* Leaderboard List */}
                <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                        <CardTitle className="text-white">Global Rankings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {leaderboardData.map((player, index) => (
                                <div key={player.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                                    <div className="flex items-center gap-4">
                                        <span className="text-white font-bold w-8">{index + 1}</span>
                                        <div className={`w-10 h-10 rounded-full ${getRandomColor(index)} flex items-center justify-center`}>
                                            <span className="text-sm font-bold text-white">{getInitials(player.name)}</span>
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">{player.name}</p>
                                            <p className="text-sm text-gray-400">{player.streak} day streak</p>
                                        </div>
                                    </div>
                                    <div className="text-white font-bold">{player.score} pts</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default LeaderboardPage; 