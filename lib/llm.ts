import Groq from "groq-sdk";
import { DimensionScores, Quest, MicroHabit } from "@/types";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

interface LLMResponse {
    quests: Array<{ title: string; task: string; metric: string }>;
    micro_habits: Array<{ habit: string; metric: string }>;
}

export async function generateQuests(
    scores: DimensionScores,
    categories: string[]
): Promise<{ quests: Quest[]; micro_habits: MicroHabit[] }> {
    const prompt = `You are COMRADE, a lifestyle coaching assistant.

User Profile:
- Digital Dependency: ${scores.digital_dependency}/100
- Introversion: ${scores.introversion}/100
- Discipline & Focus: ${scores.discipline_focus}/100
- Physical Activity: ${scores.physical_activity}/100
- Social Confidence: ${scores.social_confidence}/100
- Categories: ${categories.join(", ")}

Generate exactly 10 coaching items:
- 5 weekly challenges (achievable in 7 days)
- 5 daily micro-habits (under 5 minutes each)

Target areas:
- Digital detox (if DD > 60)
- Movement & fitness (if PA < 50)
- Routine building (if DF < 50)
- Social interaction (if SC < 50)

Rules:
- Keep tasks specific and measurable
- No extreme challenges or unsafe advice
- Include clear completion metrics
- Use motivational but realistic language

Return ONLY valid JSON in this exact format:
{
  "quests": [
    {"title": "Quest Title", "task": "Specific task description", "metric": "Success criteria"}
  ],
  "micro_habits": [
    {"habit": "Habit description", "metric": "Daily metric"}
  ]
}`;

    try {
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            model: "llama-3.2-90b-text-preview",
            temperature: 0.7,
            max_tokens: 2000,
        });

        const content = completion.choices[0]?.message?.content || "{}";
        const parsed: LLMResponse = JSON.parse(content);

        const quests: Quest[] = parsed.quests.map((q) => ({
            title: q.title,
            task: q.task,
            metric: q.metric,
            type: "quest" as const,
            completed: false,
        }));

        const micro_habits: MicroHabit[] = parsed.micro_habits.map((h) => ({
            habit: h.habit,
            metric: h.metric,
        }));

        return { quests, micro_habits };
    } catch (error) {
        console.error("LLM generation error:", error);
        return getFallbackQuests(scores, categories);
    }
}

function getFallbackQuests(scores: DimensionScores, categories: string[]): { quests: Quest[]; micro_habits: MicroHabit[] } {
    const quests: Quest[] = [
        {
            title: "Screen-Free Mornings",
            task: "Don't check phone for first 60 minutes after waking",
            metric: "7 days in a row",
            type: "quest",
            completed: false,
        },
        {
            title: "Daily Movement",
            task: "Take a 20-minute walk outside",
            metric: "5 days this week",
            type: "quest",
            completed: false,
        },
        {
            title: "Routine Reset",
            task: "Go to bed at the same time every night",
            metric: "7 consecutive nights",
            type: "quest",
            completed: false,
        },
        {
            title: "Social Connection",
            task: "Have a meaningful conversation with someone new",
            metric: "At least 2 conversations this week",
            type: "quest",
            completed: false,
        },
        {
            title: "Focus Block",
            task: "Work on one task for 90 minutes without distractions",
            metric: "Complete 3 focus blocks this week",
            type: "quest",
            completed: false,
        },
    ];

    const micro_habits: MicroHabit[] = [
        { habit: "5-minute desk stretches every 2 hours", metric: "3x per workday" },
        { habit: "Put phone in another room during meals", metric: "Every meal" },
        { habit: "Write down 3 priorities before starting work", metric: "Every morning" },
        { habit: "Take stairs instead of elevator", metric: "Every opportunity" },
        { habit: "Make eye contact and smile at one stranger", metric: "Once daily" },
    ];

    return { quests, micro_habits };
}
