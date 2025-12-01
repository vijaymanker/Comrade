"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="max-w-3xl w-full text-center">
                <div className="mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-2 border-nothing-black mb-6">
                        <span className="text-3xl font-light">C</span>
                    </div>
                </div>

                <h1 className="text-5xl md:text-6xl font-light text-nothing-black mb-6 tracking-tight">COMRADE</h1>

                <p className="text-xl text-nothing-gray-600 mb-12 max-w-2xl mx-auto font-light">
                    AI-powered lifestyle coaching through deterministic personality assessment
                </p>

                <Link
                    href="/quiz"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-nothing-black text-nothing-white rounded-full hover:shadow-glow transition-all"
                >
                    Start Assessment
                    <ArrowRight className="w-5 h-5" />
                </Link>

                <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                    <div className="text-center">
                        <p className="text-3xl font-light text-nothing-black mb-2">45</p>
                        <p className="text-sm text-nothing-gray-600">Questions</p>
                    </div>
                    <div className="text-center border-x border-nothing-gray-200">
                        <p className="text-3xl font-light text-nothing-black mb-2">5</p>
                        <p className="text-sm text-nothing-gray-600">Dimensions</p>
                    </div>
                    <div className="text-center">
                        <p className="text-3xl font-light text-nothing-black mb-2">10</p>
                        <p className="text-sm text-nothing-gray-600">Coaching Items</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
