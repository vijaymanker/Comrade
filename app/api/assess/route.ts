import { NextRequest, NextResponse } from "next/server";
import { calculateScores } from "@/lib/scoring";
import { classifyPersonality } from "@/lib/classifier";
import { generateQuests } from "@/lib/llm";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { answers, userId } = body;

        if (!answers || answers.length !== 45) {
            return NextResponse.json({ error: "Invalid answers array" }, { status: 400 });
        }

        const scores = calculateScores(answers);
        const categories = classifyPersonality(scores);
        const { quests, micro_habits } = await generateQuests(scores, categories);

        const { data: profileData, error: profileError } = await supabase
            .from("user_profiles")
            .insert({
                user_id: userId || crypto.randomUUID(),
                scores,
                categories,
            })
            .select()
            .single();

        if (profileError) {
            console.error("Profile insert error:", profileError);
        }

        const profileId = profileData?.id || crypto.randomUUID();

        const questsToInsert = quests.map((q) => ({
            profile_id: profileId,
            title: q.title,
            task: q.task,
            metric: q.metric,
            type: "quest",
            completed: false,
        }));

        const habitsToInsert = micro_habits.map((h) => ({
            profile_id: profileId,
            title: h.habit,
            task: h.habit,
            metric: h.metric,
            type: "micro_habit",
            completed: false,
        }));

        const { error: questsError } = await supabase.from("quests").insert([...questsToInsert, ...habitsToInsert]);

        if (questsError) {
            console.error("Quests insert error:", questsError);
        }

        const { error: streakError } = await supabase.from("streaks").insert({
            user_id: userId || profileId,
            current_streak: 0,
            longest_streak: 0,
            total_xp: 0,
        });

        if (streakError) {
            console.error("Streak insert error:", streakError);
        }

        return NextResponse.json({
            profileId,
            scores,
            categories,
            quests,
            micro_habits,
        });
    } catch (error) {
        console.error("Assessment error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
