"use client";

import { Question } from "@/types";

interface QuizCardProps {
    question: Question;
    selectedAnswer: string | null;
    onAnswerSelect: (answer: "A" | "B" | "C" | "D") => void;
}

export default function QuizCard({ question, selectedAnswer, onAnswerSelect }: QuizCardProps) {
    const options: Array<"A" | "B" | "C" | "D"> = ["A", "B", "C", "D"];

    return (
        <div className="bg-nothing-white border border-nothing-gray-200 rounded-3xl p-8 shadow-soft">
            <p className="text-sm text-nothing-gray-500 mb-2">Question {question.id + 1} of 45</p>
            <h3 className="text-xl font-medium text-nothing-black mb-6">{question.text}</h3>

            <div className="space-y-3">
                {options.map((option) => (
                    <button
                        key={option}
                        onClick={() => onAnswerSelect(option)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all ${selectedAnswer === option
                                ? "border-nothing-black bg-nothing-black text-nothing-white"
                                : "border-nothing-gray-300 bg-nothing-white text-nothing-black hover:border-nothing-gray-400"
                            }`}
                    >
                        <span className="font-medium mr-3">{option}.</span>
                        {question.options[option]}
                    </button>
                ))}
            </div>
        </div>
    );
}
