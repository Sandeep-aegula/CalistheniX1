'use server'

import connectDB from "@/lib/mongoose"
import User from "@/models/User"

// Helper function to convert Mongoose document to plain object
const toPlainObject = (doc) => {
    if (!doc) return null;
    return JSON.parse(JSON.stringify(doc));
};

// Get current missions for a user
export async function getCurrentMissions(email) {
    try {
        await connectDB();
        
        const user = await User.findOne({ email });
        if (!user) {
            return { error: 'User not found' };
        }

        // Check if user has an active workout
        if (!user.currentWorkoutType) {
            return { 
                success: true,
                currentWorkoutType: null,
                missions: [],
                completedMissions: []
            };
        }

        // Define missions based on workout type
        const missions = {
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

        // Get today's date at midnight for comparison
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Mark missions as completed if they were completed today
        const currentMissions = missions[user.currentWorkoutType].map(mission => ({
            ...mission,
            completed: user.completedMissions.some(completedMission => 
                completedMission.missionId === mission.id.toString() &&
                new Date(completedMission.completedAt).setHours(0, 0, 0, 0) === today.getTime()
            )
        }));

        return {
            success: true,
            currentWorkoutType: user.currentWorkoutType,
            missions: currentMissions,
            completedMissions: toPlainObject(user.completedMissions),
            streak: user.streak
        };
    } catch (error) {
        console.error('Error getting current missions:', error);
        return { error: error.message };
    }
} 