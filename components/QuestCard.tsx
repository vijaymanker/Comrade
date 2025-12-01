"use client";

import { Quest } from "@/types";
import { CheckCircle2, Circle } from "lucide-react";

interface QuestCardProps {
    quest: Quest;
    onComplete: (id: string) => void;
}

export default function QuestCard({ quest, onComplete }: QuestCardProps) {
    return (
        <div
            className={`bg-nothing-white border rounded-2xl p-6 shadow-soft transition-all ${quest.completed ? "border-nothing-gray-300 opacity-60" : "border-nothing-gray-200 hover:shadow-glow"
                }`}
        >
            <div className="flex items-start gap-4">
                <button
                    onClick={() => !quest.completed && quest.id && onComplete(quest.id)}
                    className="flex-shrink-0 mt-1"
                    disabled={quest.completed}
                >
                    {quest.completed ? (
                        <CheckCircle2 className="w-6 h-6 text-nothing-black" />
                    ) : (
                        <Circle className="w-6 h-6 text-nothing-gray-400 hover:text-nothing-black transition-colors" />
                    )}
                </button>

                <div className="flex-1">
                    <h3 className={`text-lg font-medium mb-2 ${quest.completed ? "line-through text-nothing-gray-500" : "text-nothing-black"}`}>
                        {quest.title}
                    </h3>
                    <p className="text-sm text-nothing-gray-600 mb-3">{quest.task}</p>
                    <div className="inline-block px-3 py-1 bg-nothing-gray-100 rounded-full">
                        <p className="text-xs text-nothing-gray-700">{quest.metric}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
