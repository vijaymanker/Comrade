"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import QuestCard from "@/components/QuestCard";
import HabitChecklist from "@/components/HabitChecklist";
import StreakCounter from "@/components/StreakCounter";
import { Quest, MicroHabit, StreakData } from "@/types";

export default function DashboardPage() {
    const searchParams = useSearchParams();
    const profileId = searchParams.get("profileId");

    const [quests, setQuests] = useState<Quest[]>([]);
    const [microHabits, setMicroHabits] = useState<MicroHabit[]>([]);
    const [streakData, setStreakData] = useState<StreakData>({
        current_streak: 0,
        longest_streak: 0,
        total_xp: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (profileId) {
            fetchData();
        }
    }, [profileId]);

    const fetchData = async () => {
        try {
            const [questsRes, streakRes] = await Promise.all([
                fetch(`/api/quests?profileId=${profileId}`),
                fetch(`/api/streak?userId=${profileId}`),
            ]);

            const questsData = await questsRes.json();
            const streakDataRes = await streakRes.json();

            setQuests(questsData.quests || []);
            setMicroHabits(questsData.micro_habits || []);
            setStreakData(streakDataRes);
        } catch (error) {
            console.error("Failed to fetch data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleQuestComplete = async (questId: string) => {
        try {
            await fetch("/api/complete", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ questId, userId: profileId }),
            });

            setQuests(quests.map((q) => (q.id === questId ? { ...q, completed: true } : q)));

            const streakRes = await fetch(`/api/streak?userId=${profileId}`);
            const streakDataRes = await streakRes.json();
            setStreakData(streakDataRes);
        } catch (error) {
            console.error("Failed to complete quest:", error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-nothing-gray-600">Loading your dashboard...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="mb-12">
                    <h1 className="text-4xl font-light text-nothing-black mb-2">Your Quest Dashboard</h1>
                    <p className="text-nothing-gray-600">Complete quests and build habits to level up</p>
                </div>

                <div className="mb-8">
                    <StreakCounter
                        currentStreak={streakData.current_streak}
                        longestStreak={streakData.longest_streak}
                        totalXp={streakData.total_xp}
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                        <h2 className="text-2xl font-light text-nothing-black mb-6">Weekly Quests</h2>
                        <div className="space-y-4">
                            {quests.map((quest) => (
                                <QuestCard key={quest.id} quest={quest} onComplete={handleQuestComplete} />
                            ))}
                        </div>
                    </div>

                    <div>
                        <HabitChecklist habits={microHabits} />
                    </div>
                </div>
            </div>
        </div>
    );
}
