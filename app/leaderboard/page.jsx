'use client';

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from 'react';
import { Press_Start_2P } from "next/font/google";

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
});

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
        <div className="min-h-screen bg-[#141414] text-white font-press-start p-4 pb-24">
            {/* Header */}
            <h1 className="text-center text-4xl mb-8">
                <span className="text-[#FFD700]">Leader</span>
                <span className="text-white">Board</span>
            </h1>

            {/* Current Player Card */}
            <div className="bg-[#1f1f1f] rounded-2xl p-4 mt-6 mb-8">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl mb-1">{user?.username || 'Player'}</h2>
                        <p className="text-[#FFD700] text-sm">Rank: rookie</p>
                    </div>
                    <div className="flex gap-2">
                        <div className="bg-[#2D2D2D] px-3 py-1 rounded-lg text-sm">Lvl 1</div>
                        <div className="bg-[#2D2D2D] px-3 py-1 rounded-lg text-sm">XP 1700</div>
                    </div>
                </div>
            </div>

            {/* Leaderboard List */}
            <div className="space-y-4">
                {leaderboardData.map((player, index) => (
                    <div 
                        key={player.id} 
                        className={`
                            flex items-center justify-between p-4 rounded-2xl
                            ${index === 0 ? 'bg-gradient-to-r from-[#FFD700] to-[#916f15]' : 'bg-[#1f1f1f]'}
                        `}
                    >
                        <div className="flex items-center gap-4">
                            <span className="text-xl w-8">{index + 1}</span>
                            <div>
                                <h3 className="text-xl mb-1">{player.name}</h3>
                                <p className="text-[#FFD700] text-sm">Rank: rookie</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <div className="bg-[#2D2D2D] px-3 py-1 rounded-lg text-sm mb-1">
                                Lvl {Math.floor(player.score / 1000)}
                            </div>
                            <div className="bg-[#2D2D2D] px-3 py-1 rounded-lg text-sm">
                                XP {player.score}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation - Unchanged
            <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center bg-[#141414] py-4">
                <div className="w-10 h-10 rounded-full bg-[#2D2D2D] flex items-center justify-center">🏠</div>
                <div className="w-10 h-10 rounded-full bg-[#2D2D2D] flex items-center justify-center">📈</div>
                <div className="w-16 h-16 rounded-full bg-gradient-to-b from-[#FFD700] to-[#916f15] flex items-center justify-center -mt-8">🏆</div>
                <div className="w-10 h-10 rounded-full bg-[#2D2D2D] flex items-center justify-center">📷</div>
                <div className="w-10 h-10 rounded-full bg-[#2D2D2D] flex items-center justify-center">👤</div>
            </nav> */}
        </div>
    );
};

export default LeaderboardPage;