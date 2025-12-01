import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { questId, userId } = body;

        if (!questId) {
            return NextResponse.json({ error: "Quest ID required" }, { status: 400 });
        }

        const { error: questError } = await supabase.from("quests").update({ completed: true }).eq("id", questId);

        if (questError) {
            console.error("Quest update error:", questError);
            return NextResponse.json({ error: "Failed to update quest" }, { status: 500 });
        }

        if (userId) {
            const { data: streakData, error: fetchError } = await supabase.from("streaks").select("*").eq("user_id", userId).single();

            if (!fetchError && streakData) {
                const today = new Date().toISOString().split("T")[0];
                const lastActivity = streakData.last_activity;
                const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

                let newStreak = streakData.current_streak;

                if (lastActivity === yesterday) {
                    newStreak += 1;
                } else if (lastActivity !== today) {
                    newStreak = 1;
                }

                const longestStreak = Math.max(newStreak, streakData.longest_streak);
                const totalXp = streakData.total_xp + 10;

                await supabase
                    .from("streaks")
                    .update({
                        current_streak: newStreak,
                        longest_streak: longestStreak,
                        total_xp: totalXp,
                        last_activity: today,
                    })
                    .eq("user_id", userId);
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Complete API error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
