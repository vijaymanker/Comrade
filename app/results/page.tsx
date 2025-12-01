"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ScoreCard from "@/components/ScoreCard";
import { DimensionScores } from "@/types";
import { ArrowRight } from "lucide-react";

export default function ResultsPage() {
    const router = useRouter();
    const [scores, setScores] = useState<DimensionScores | null>(null);
    const [categories, setCategories] = useState<string[]>([]);
    const [profileId, setProfileId] = useState<string>("");

    useEffect(() => {
        const data = localStorage.getItem("assessmentResult");
        if (data) {
            const result = JSON.parse(data);
            setScores(result.scores);
            setCategories(result.categories);
            setProfileId(result.profileId);
        } else {
            router.push("/quiz");
        }
    }, [router]);

    const handleContinue = () => {
        if (profileId) {
            router.push(`/dashboard?profileId=${profileId}`);
        }
    };

    if (!scores) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-nothing-gray-600">Loading results...</p>
            </div>
        );
    }

    const dimensionDescriptions = {
        digital_dependency: "Your relationship with digital devices and screen time",
        introversion: "Your preference for solitude versus social interaction",
        discipline_focus: "Your ability to maintain routines and complete tasks",
        physical_activity: "Your engagement in movement and exercise",
        social_confidence: "Your comfort level in social situations",
    };

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-light text-nothing-black mb-4">Your Personality Profile</h1>
                    <p className="text-nothing-gray-600">Based on your responses, here's your assessment</p>
                </div>

                <div className="mb-12">
                    <h2 className="text-xl font-medium text-nothing-black mb-4">Lifestyle Categories</h2>
                    <div className="flex flex-wrap gap-3">
                        {categories.map((category, index) => (
                            <div
                                key={index}
                                className="px-6 py-3 bg-nothing-black text-nothing-white rounded-full text-sm"
                            >
                                {category}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-12">
                    <h2 className="text-xl font-medium text-nothing-black mb-6">Dimension Scores</h2>
                    <div className="space-y-4">
                        {Object.entries(scores).map(([key, value]) => (
                            <ScoreCard
                                key={key}
                                dimension={key
                                    .split("_")
                                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                    .join(" ")}
                                value={value}
                                description={dimensionDescriptions[key as keyof typeof dimensionDescriptions]}
                            />
                        ))}
                    </div>
                </div>

                <div className="text-center">
                    <button
                        onClick={handleContinue}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-nothing-black text-nothing-white rounded-full hover:shadow-glow transition-all"
                    >
                        View Your Quests
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
