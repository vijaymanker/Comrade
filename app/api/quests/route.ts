import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const profileId = searchParams.get("profileId");

        if (!profileId) {
            return NextResponse.json({ error: "Profile ID required" }, { status: 400 });
        }

        const { data, error } = await supabase.from("quests").select("*").eq("profile_id", profileId).order("created_at", { ascending: true });

        if (error) {
            console.error("Quests fetch error:", error);
            return NextResponse.json({ error: "Failed to fetch quests" }, { status: 500 });
        }

        const quests = data.filter((q) => q.type === "quest");
        const micro_habits = data.filter((q) => q.type === "micro_habit");

        return NextResponse.json({ quests, micro_habits });
    } catch (error) {
        console.error("Quests API error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
