"use client";

import { MicroHabit } from "@/types";
import { CheckSquare, Square } from "lucide-react";
import { useState } from "react";

interface HabitChecklistProps {
    habits: MicroHabit[];
}

export default function HabitChecklist({ habits }: HabitChecklistProps) {
    const [completed, setCompleted] = useState<Set<number>>(new Set());

    const toggleHabit = (index: number) => {
        const newCompleted = new Set(completed);
        if (completed.has(index)) {
            newCompleted.delete(index);
        } else {
            newCompleted.add(index);
        }
        setCompleted(newCompleted);
    };

    return (
        <div className="bg-nothing-white border border-nothing-gray-200 rounded-2xl p-6 shadow-soft">
            <h2 className="text-xl font-medium text-nothing-black mb-4">Daily Micro-Habits</h2>

            <div className="space-y-3">
                {habits.map((habit, index) => (
                    <button
                        key={index}
                        onClick={() => toggleHabit(index)}
                        className="w-full flex items-start gap-3 text-left p-3 rounded-xl hover:bg-nothing-gray-50 transition-colors"
                    >
                        {completed.has(index) ? (
                            <CheckSquare className="w-5 h-5 text-nothing-black flex-shrink-0 mt-0.5" />
                        ) : (
                            <Square className="w-5 h-5 text-nothing-gray-400 flex-shrink-0 mt-0.5" />
                        )}
                        <div className="flex-1">
                            <p className={`text-sm ${completed.has(index) ? "line-through text-nothing-gray-500" : "text-nothing-black"}`}>
                                {habit.habit}
                            </p>
                            <p className="text-xs text-nothing-gray-500 mt-1">{habit.metric}</p>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
