import { DimensionScores } from "@/types";

type AnswerKey = "A" | "B" | "C" | "D";
type DimensionKey = "DD" | "INT" | "DF" | "PA" | "SC";

interface ScoreMap {
    [key: string]: number;
}

const QUESTION_SCORES: Record<number, Record<AnswerKey, ScoreMap>> = {
    0: { A: { DD: 4 }, B: { DD: 3 }, C: { DD: 1, DF: 1 }, D: { DD: 0, DF: 2 } },
    1: { A: { INT: 4 }, B: { INT: 2 }, C: { INT: 0, SC: 2 }, D: { INT: 1 } },
    2: { A: { DF: 4 }, B: { DF: 3 }, C: { DF: 1 }, D: { DF: 0 } },
    3: { A: { PA: 0 }, B: { PA: 1 }, C: { PA: 3 }, D: { PA: 4 } },
    4: { A: { SC: 0 }, B: { SC: 1 }, C: { SC: 3 }, D: { SC: 4 } },
    5: { A: { DD: 4 }, B: { DD: 3 }, C: { DD: 1 }, D: { DD: 0 } },
    6: { A: { INT: 0, SC: 3 }, B: { INT: 1 }, C: { INT: 4 }, D: { INT: 2 } },
    7: { A: { DF: 4 }, B: { DF: 3 }, C: { DF: 2 }, D: { DF: 0 } },
    8: { A: { PA: 4 }, B: { PA: 3 }, C: { PA: 1 }, D: { PA: 2 } },
    9: { A: { SC: 4 }, B: { SC: 2 }, C: { SC: 0, INT: 2 }, D: { SC: 1 } },
    10: { A: { DD: 4 }, B: { DD: 3 }, C: { DD: 1 }, D: { DD: 0, DF: 1 } },
    11: { A: { INT: 4 }, B: { INT: 3 }, C: { INT: 1 }, D: { INT: 0, SC: 1 } },
    12: { A: { DF: 4 }, B: { DF: 3 }, C: { DF: 1 }, D: { DF: 0 } },
    13: { A: { PA: 0 }, B: { PA: 1 }, C: { PA: 3 }, D: { PA: 4 } },
    14: { A: { SC: 4 }, B: { SC: 2 }, C: { SC: 1, INT: 2 }, D: { SC: 0, INT: 3 } },
    15: { A: { DD: 4 }, B: { DD: 3 }, C: { DD: 1 }, D: { DD: 0 } },
    16: { A: { INT: 4 }, B: { INT: 2 }, C: { INT: 0, SC: 2 }, D: { INT: 1 } },
    17: { A: { DF: 4 }, B: { DF: 3 }, C: { DF: 1 }, D: { DF: 0 } },
    18: { A: { PA: 4 }, B: { PA: 3 }, C: { PA: 1 }, D: { PA: 0 } },
    19: { A: { SC: 4 }, B: { SC: 2 }, C: { SC: 1 }, D: { SC: 0, INT: 2 } },
    20: { A: { DD: 4 }, B: { DD: 3 }, C: { DD: 1 }, D: { DD: 0 } },
    21: { A: { SC: 3, INT: 0 }, B: { SC: 2 }, C: { SC: 1, INT: 2 }, D: { INT: 4 } },
    22: { A: { DF: 4 }, B: { DF: 2 }, C: { DF: 1 }, D: { DF: 0 } },
    23: { A: { PA: 0 }, B: { PA: 1 }, C: { PA: 3 }, D: { PA: 4 } },
    24: { A: { SC: 4 }, B: { SC: 3 }, C: { SC: 1 }, D: { SC: 0, INT: 2 } },
    25: { A: { DD: 4 }, B: { DD: 3 }, C: { DD: 1 }, D: { DD: 0, DF: 1 } },
    26: { A: { SC: 3, INT: 0 }, B: { SC: 1 }, C: { INT: 2 }, D: { INT: 4, SC: 0 } },
    27: { A: { DF: 4 }, B: { DF: 3 }, C: { DF: 1 }, D: { DF: 0 } },
    28: { A: { PA: 4 }, B: { PA: 3 }, C: { PA: 1 }, D: { PA: 0 } },
    29: { A: { SC: 3, INT: 0 }, B: { SC: 2 }, C: { INT: 2 }, D: { INT: 3 } },
    30: { A: { DD: 4 }, B: { DD: 3 }, C: { DD: 1 }, D: { DD: 0 } },
    31: { A: { INT: 4 }, B: { INT: 2 }, C: { INT: 0, SC: 2 }, D: { INT: 1 } },
    32: { A: { DF: 4 }, B: { DF: 2 }, C: { DF: 1 }, D: { DF: 0 } },
    33: { A: { PA: 4, DF: 1 }, B: { PA: 2 }, C: { PA: 1 }, D: { PA: 0 } },
    34: { A: { SC: 4, INT: 0 }, B: { SC: 2 }, C: { SC: 1, INT: 2 }, D: { INT: 4 } },
    35: { A: { DD: 4 }, B: { DD: 2 }, C: { DD: 1 }, D: { DD: 0 } },
    36: { A: { DD: 4 }, B: { DD: 2 }, C: { DD: 1 }, D: { DD: 0, DF: 1 } },
    37: { A: { SC: 4 }, B: { SC: 3 }, C: { SC: 1, INT: 2 }, D: { SC: 0, INT: 3 } },
    38: { A: { DF: 4 }, B: { DF: 3 }, C: { DF: 1 }, D: { DF: 0 } },
    39: { A: { PA: 4 }, B: { PA: 3 }, C: { PA: 1 }, D: { PA: 0 } },
    40: { A: { SC: 4 }, B: { SC: 2 }, C: { SC: 1, INT: 2 }, D: { INT: 3 } },
    41: { A: { DD: 4 }, B: { DD: 3 }, C: { DD: 1 }, D: { DD: 0 } },
    42: { A: { DD: 3, SC: 2 }, B: { DD: 2 }, C: { DD: 1, INT: 1 }, D: { INT: 2 } },
    43: { A: { DF: 4 }, B: { DF: 3 }, C: { DF: 1 }, D: { DF: 0 } },
    44: { A: { PA: 4 }, B: { PA: 3 }, C: { PA: 1 }, D: { PA: 0 } },
};

const dimensionMap: Record<DimensionKey, keyof DimensionScores> = {
    DD: "digital_dependency",
    INT: "introversion",
    DF: "discipline_focus",
    PA: "physical_activity",
    SC: "social_confidence",
};

export function calculateScores(answers: AnswerKey[]): DimensionScores {
    const rawScores: Record<DimensionKey, number> = {
        DD: 0,
        INT: 0,
        DF: 0,
        PA: 0,
        SC: 0,
    };

    answers.forEach((answer, index) => {
        if (QUESTION_SCORES[index] && QUESTION_SCORES[index][answer]) {
            const scoreDeltas = QUESTION_SCORES[index][answer];
            Object.entries(scoreDeltas).forEach(([dim, points]) => {
                rawScores[dim as DimensionKey] += points;
            });
        }
    });

    const maxScores = {
        DD: 180,
        INT: 180,
        DF: 180,
        PA: 180,
        SC: 180,
    };

    const normalizedScores: DimensionScores = {
        digital_dependency: 0,
        introversion: 0,
        discipline_focus: 0,
        physical_activity: 0,
        social_confidence: 0,
    };

    Object.entries(rawScores).forEach(([key, value]) => {
        const dimKey = key as DimensionKey;
        const normalized = Math.round((value / maxScores[dimKey]) * 100);
        const clamped = Math.max(0, Math.min(100, normalized));
        normalizedScores[dimensionMap[dimKey]] = clamped;
    });

    return normalizedScores;
}
