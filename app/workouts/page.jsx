'use client'

import Header from '@/components/header';
import WorkoutCard from '@/app/components/WorkoutCard';
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { selectWorkout, completeMission, getWorkoutStatus } from '@/_actions/WorkoutActions';

const WorkoutsPage = () => {
    const { isLoaded, isSignedIn, user } = useUser();
    const [selectedWorkout, setSelectedWorkout] = useState(null);

    // Define workout cards data
    const workoutCards = [
        { title: "Beginner", imagePath: "/images/beginner.png", type: "beginner" },
        { title: "Skills", imagePath: "/images/skills.png", type: "skills" },
        { title: "Fat Burn", imagePath: "/images/fatburn.png", type: "fat-burn" },
        { title: "Strength", imagePath: "/images/strength.png", type: "strength" },
    ];

    useEffect(() => {
        if (isSignedIn && user) {
            // loadWorkoutStatus is likely not needed here anymore
            // loadWorkoutStatus();
        }
    }, [isSignedIn, user]);

    const handleWorkoutSelect = async (workoutType) => {
        if (!isSignedIn) {
            // setMessage('Please sign in to select a workout'); // message state removed
            return;
        }

        // Use selectWorkout from WorkoutActions
        const result = await selectWorkout(user.emailAddresses[0].emailAddress, workoutType);
        
        if (result.error) {
            // setMessage(result.error); // message state removed
        } else {
            // setMessage('Workout selected successfully!'); // message state removed
            setSelectedWorkout(workoutType);
            // Missions state and related logic likely not needed here anymore
            // setMissions(mockMissions[workoutType]);
            // loadWorkoutStatus();
        }
    };

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    if (!isSignedIn) {
        return <div>Please sign in to view workouts</div>;
    }

    return (
        <div className="min-h-screen bg-[#18191A] text-white">
            <Header />
            
            <main className="container mx-auto px-4 py-8 mb-16">
                <h1 className="text-3xl font-mono text-yellow-600 mb-8">Workouts</h1>
                
                <div className="space-y-4">
                    {workoutCards.map((card) => (
                        <WorkoutCard 
                            key={card.title.toLowerCase()}
                            card={card}
                            onSelect={handleWorkoutSelect}
                            isSelected={selectedWorkout === card.type}
                            isDisabled={selectedWorkout !== null && selectedWorkout !== card.type}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default WorkoutsPage;