import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ error: "User ID required" }, { status: 400 });
        }

        const { data, error } = await supabase.from("streaks").select("*").eq("user_id", userId).single();

        if (error) {
            console.error("Streak fetch error:", error);
            return NextResponse.json(
                {
                    current_streak: 0,
                    longest_streak: 0,
                    total_xp: 0,
                },
                { status: 200 }
            );
        }

        return NextResponse.json({
            current_streak: data.current_streak,
            longest_streak: data.longest_streak,
            total_xp: data.total_xp,
        });
    } catch (error) {
        console.error("Streak API error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
