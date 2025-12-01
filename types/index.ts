export interface QuizAnswer {
    questionId: number;
    answer: "A" | "B" | "C" | "D";
}

export interface DimensionScores {
    digital_dependency: number;
    introversion: number;
    discipline_focus: number;
    physical_activity: number;
    social_confidence: number;
}

export interface PersonalityCategory {
    label: string;
    description: string;
}

export interface Quest {
    id?: string;
    title: string;
    task: string;
    metric: string;
    type: "quest" | "micro_habit";
    completed: boolean;
    created_at?: string;
}

export interface MicroHabit {
    habit: string;
    metric: string;
}

export interface UserProfile {
    id?: string;
    user_id?: string;
    scores: DimensionScores;
    categories: string[];
    created_at?: string;
}

export interface StreakData {
    id?: string;
    user_id?: string;
    current_streak: number;
    longest_streak: number;
    total_xp: number;
    last_activity?: string;
}

export interface AssessmentResponse {
    scores: DimensionScores;
    categories: string[];
    quests: Quest[];
    micro_habits: MicroHabit[];
}

export interface Question {
    id: number;
    text: string;
    options: {
        A: string;
        B: string;
        C: string;
        D: string;
    };
}
