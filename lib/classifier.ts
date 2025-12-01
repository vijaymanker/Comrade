import { DimensionScores } from "@/types";

export function classifyPersonality(scores: DimensionScores): string[] {
    const categories: string[] = [];

    const { digital_dependency, introversion, discipline_focus, physical_activity, social_confidence } = scores;

    if (digital_dependency >= 70) {
        categories.push("Digital Addict");
    }

    if (physical_activity < 40) {
        categories.push("Fitness Starter");
    } else if (physical_activity >= 65) {
        categories.push("Physically Active");
    }

    if (discipline_focus < 50) {
        categories.push("Needs Routine Boost");
    } else if (discipline_focus >= 65) {
        categories.push("Routine Builder");
    }

    if (introversion >= 60 && social_confidence < 55) {
        categories.push("Social Introvert");
    }

    if (social_confidence < 50 && !categories.includes("Social Introvert")) {
        categories.push("Social Growth Needed");
    } else if (social_confidence >= 70) {
        categories.push("Socially Confident");
    }

    if (
        categories.length === 0 &&
        digital_dependency >= 40 &&
        digital_dependency < 70 &&
        physical_activity >= 40 &&
        discipline_focus >= 50
    ) {
        categories.push("Balanced Lifestyle");
    }

    if (categories.length === 0) {
        categories.push("Developing Balance");
    }

    return categories.slice(0, 3);
}
