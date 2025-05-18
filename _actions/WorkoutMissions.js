'use server'

import connectDB from "@/lib/mongoose"
import User from "@/models/User"

// Select a workout type
export async function selectWorkout(email, workoutType) {
    try {
        await connectDB();
        
        const user = await User.findOne({ email });
        if (!user) {
            return { error: 'User not found' };
        }

        // Check if user already has an active workout
        if (user.currentWorkoutType) {
            return { error: 'You already have an active workout' };
        }

        // Check if the workout type is valid
        const validWorkoutTypes = ['beginner', 'skills', 'fat-burn', 'strength'];
        if (!validWorkoutTypes.includes(workoutType)) {
            return { error: 'Invalid workout type' };
        }

        // Set the workout type and start date
        user.currentWorkoutType = workoutType;
        user.workoutStartDate = new Date();
        await user.save();

        return { success: true, user };
    } catch (error) {
        console.error('Error selecting workout:', error);
        return { error: error.message };
    }
}

// Complete a mission
export async function completeMission(email, missionId) {
    try {
        await connectDB();
        
        const user = await User.findOne({ email });
        if (!user) {
            return { error: 'User not found' };
        }

        // Check if user has an active workout
        if (!user.currentWorkoutType) {
            return { error: 'No active workout found' };
        }

        // Check if mission is already completed today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const alreadyCompleted = user.completedMissions.some(mission => 
            mission.missionId === missionId && 
            new Date(mission.completedAt).setHours(0, 0, 0, 0) === today.getTime()
        );

        if (alreadyCompleted) {
            return { error: 'Mission already completed today' };
        }

        // Add completed mission
        user.completedMissions.push({
            missionId,
            completedAt: new Date()
        });

        // Update streak
        const lastWorkout = user.lastWorkoutDate ? new Date(user.lastWorkoutDate) : null;
        if (lastWorkout) {
            lastWorkout.setHours(0, 0, 0, 0);
        }

        const todayDate = new Date();
        todayDate.setHours(0, 0, 0, 0);

        // If last workout was yesterday, increment streak
        if (lastWorkout && (todayDate - lastWorkout) === 86400000) {
            user.streak += 1;
        }
        // If last workout was more than a day ago, reset streak
        else if (lastWorkout && (todayDate - lastWorkout) > 86400000) {
            user.streak = 1;
        }
        // If this is the first workout, set streak to 1
        else if (!lastWorkout) {
            user.streak = 1;
        }

        user.lastWorkoutDate = new Date();
        await user.save();

        return { 
            success: true, 
            streak: user.streak,
            completedMissions: user.completedMissions
        };
    } catch (error) {
        console.error('Error completing mission:', error);
        return { error: error.message };
    }
}

// Get user's workout status
export async function getWorkoutStatus(email) {
    try {
        await connectDB();
        
        const user = await User.findOne({ email });
        if (!user) {
            return { error: 'User not found' };
        }

        // Check if workout is expired (30 days)
        let isExpired = false;
        if (user.workoutStartDate) {
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            
            if (user.workoutStartDate < thirtyDaysAgo) {
                isExpired = true;
                // Reset workout if expired
                user.currentWorkoutType = null;
                user.workoutStartDate = null;
                await user.save();
            }
        }

        return {
            success: true,
            currentWorkoutType: user.currentWorkoutType,
            workoutStartDate: user.workoutStartDate,
            streak: user.streak,
            lastWorkoutDate: user.lastWorkoutDate,
            completedMissions: user.completedMissions,
            isExpired
        };
    } catch (error) {
        console.error('Error getting workout status:', error);
        return { error: error.message };
    }
} 