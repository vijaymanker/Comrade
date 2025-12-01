"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import QuizCard from "@/components/QuizCard";
import { QUESTIONS } from "@/lib/questions";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function QuizPage() {
    const router = useRouter();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Array<string | null>>(new Array(45).fill(null));
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAnswerSelect = (answer: "A" | "B" | "C" | "D") => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = answer;
        setAnswers(newAnswers);
    };

    const handleNext = () => {
        if (currentQuestion < 44) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleSubmit = async () => {
        if (answers.some((a) => a === null)) {
            alert("Please answer all questions before submitting");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch("/api/assess", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ answers, userId: crypto.randomUUID() }),
            });

            const data = await response.json();
            localStorage.setItem("assessmentResult", JSON.stringify(data));
            router.push("/results");
        } catch (error) {
            console.error("Submission error:", error);
            alert("Failed to submit assessment. Please try again.");
            setIsSubmitting(false);
        }
    };

    const progress = ((currentQuestion + 1) / 45) * 100;

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-2xl font-light text-nothing-black">Personality Assessment</h1>
                        <span className="text-sm text-nothing-gray-600">
                            {currentQuestion + 1} / 45
                        </span>
                    </div>

                    <div className="w-full h-1 bg-nothing-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-nothing-black transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                <QuizCard
                    question={QUESTIONS[currentQuestion]}
                    selectedAnswer={answers[currentQuestion]}
                    onAnswerSelect={handleAnswerSelect}
                />

                <div className="flex items-center justify-between mt-8">
                    <button
                        onClick={handlePrevious}
                        disabled={currentQuestion === 0}
                        className="inline-flex items-center gap-2 px-6 py-3 border border-nothing-gray-300 rounded-full text-nothing-black disabled:opacity-30 disabled:cursor-not-allowed hover:border-nothing-black transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Previous
                    </button>

                    {currentQuestion === 44 ? (
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting || answers[currentQuestion] === null}
                            className="inline-flex items-center gap-2 px-8 py-3 bg-nothing-black text-nothing-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-glow transition-all"
                        >
                            {isSubmitting ? "Submitting..." : "Submit Assessment"}
                        </button>
                    ) : (
                        <button
                            onClick={handleNext}
                            disabled={answers[currentQuestion] === null}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-nothing-black text-nothing-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-glow transition-all"
                        >
                            Next
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
