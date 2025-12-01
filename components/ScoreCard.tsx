"use client";

interface ScoreCardProps {
    dimension: string;
    value: number;
    description: string;
}

export default function ScoreCard({ dimension, value, description }: ScoreCardProps) {
    return (
        <div className="bg-nothing-white border border-nothing-gray-200 rounded-2xl p-6 shadow-soft">
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-medium text-nothing-black">{dimension}</h3>
                <span className="text-2xl font-light text-nothing-black">{value}</span>
            </div>

            <div className="w-full h-2 bg-nothing-gray-100 rounded-full overflow-hidden mb-3">
                <div
                    className="h-full bg-nothing-black transition-all duration-500"
                    style={{ width: `${value}%` }}
                />
            </div>

            <p className="text-sm text-nothing-gray-600">{description}</p>
        </div>
    );
}
