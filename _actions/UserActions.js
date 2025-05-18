'use server'

import connectDB from "@/lib/mongoose"
import User from "@/models/User"

export async function createUser(name, email) {
    try {
        await connectDB();
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return { error: 'User with this email already exists' };
        }

        // Create new user
        const user = await User.create({
            name,
            email,
        });
        
        // Convert MongoDB document to plain object
        const userObject = {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            streak: user.streak || 0,
            currentWorkoutType: user.currentWorkoutType || null
        };
        
        return { success: true, user: userObject };
    } catch (error) {
        console.error('Error creating user:', error);
        return { error: error.message };
    }
}

export async function getUsers() {
    try {
        await connectDB();
        const users = await User.find({}).sort({ createdAt: -1 });
        
        // Convert MongoDB documents to plain objects
        const userObjects = users.map(user => ({
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            streak: user.streak || 0,
            currentWorkoutType: user.currentWorkoutType || null
        }));
        
        return { success: true, users: userObjects };
    } catch (error) {
        console.error('Error fetching users:', error);
        return { error: error.message };
    }
} 