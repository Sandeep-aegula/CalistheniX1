'use client'

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const WorkoutCard = ({ card, onSelect, isSelected, isDisabled }) => {
    return (
        <button
            onClick={() => onSelect(card.type)}
            disabled={isDisabled}
            className={`
                relative w-full h-48 rounded-2xl overflow-hidden
                transition-all duration-200 bg-[#2D2D2D]
                ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:ring-2 hover:ring-yellow-600'}
                ${isSelected ? 'ring-2 ring-yellow-600' : ''}
            `}
        >
            {/* Image Container */}
            <div className="absolute inset-0">
                <img
                    src={card.imagePath}
                    alt={card.title}
                    className="w-full h-full object-cover"
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Title Container */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
                <h2 className="text-3xl font-mono text-white px-4 text-center">
                    {card.title}
                </h2>
            </div>
        </button>
    );
};

export default WorkoutCard;