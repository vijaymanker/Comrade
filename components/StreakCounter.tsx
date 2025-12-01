"use client";

import { Flame, Trophy, Zap } from "lucide-react";

interface StreakCounterProps {
    currentStreak: number;
    longestStreak: number;
    totalXp: number;
}

export default function StreakCounter({ currentStreak, longestStreak, totalXp }: StreakCounterProps) {
    return (
        <div className="bg-nothing-white border border-nothing-gray-200 rounded-2xl p-6 shadow-soft">
            <h2 className="text-xl font-medium text-nothing-black mb-6">Your Progress</h2>

            <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                    <div className="flex justify-center mb-2">
                        <Flame className="w-8 h-8 text-nothing-black" />
                    </div>
                    <p className="text-2xl font-light text-nothing-black mb-1">{currentStreak}</p>
                    <p className="text-xs text-nothing-gray-600">Current Streak</p>
                </div>

                <div className="text-center border-x border-nothing-gray-200">
                    <div className="flex justify-center mb-2">
                        <Trophy className="w-8 h-8 text-nothing-black" />
                    </div>
                    <p className="text-2xl font-light text-nothing-black mb-1">{longestStreak}</p>
                    <p className="text-xs text-nothing-gray-600">Longest Streak</p>
                </div>

                <div className="text-center">
                    <div className="flex justify-center mb-2">
                        <Zap className="w-8 h-8 text-nothing-black" />
                    </div>
                    <p className="text-2xl font-light text-nothing-black mb-1">{totalXp}</p>
                    <p className="text-xs text-nothing-gray-600">Total XP</p>
                </div>
            </div>
        </div>
    );
}
