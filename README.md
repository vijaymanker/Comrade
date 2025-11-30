# COMRADE — AI Personality Quest & Habit Coach

A full-stack lifestyle coaching platform with Nothing-style UI, deterministic personality assessment, and AI-powered quest generation.

## Features

- **45-Question Personality Assessment** - Comprehensive MCQ quiz evaluating 5 core dimensions
- **Deterministic Scoring** - Transparent rule-based personality classification
- **AI Quest Generation** - Personalized coaching via Groq LLaMA 3.2
- **Nothing-Style UI** - Monochrome, minimal, high-contrast design aesthetic
- **Progress Tracking** - Streaks, XP, and completion metrics
- **Responsive Design** - Mobile-first, accessible interface

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **AI/LLM**: Groq API (LLaMA 3.2)
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Prerequisites

- Node.js 18+
- Supabase account
- Groq API key

## Installation

1. **Clone the repository**

```bash
cd comrade
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GROQ_API_KEY=your_groq_api_key
```

4. **Set up Supabase database**

Run the SQL schema in your Supabase SQL Editor:

```bash
# Copy contents from supabase/schema.sql
# Paste into Supabase SQL Editor and execute
```

5. **Run the development server**

```bash
npm run dev
```

6. **Open your browser**

Navigate to `http://localhost:3000`

## Project Structure

```
comrade/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── quiz/page.tsx            # 45 MCQ quiz
│   ├── results/page.tsx         # Personality scores
│   ├── dashboard/page.tsx       # Quest dashboard
│   └── api/
│       ├── assess/route.ts      # Assessment endpoint
│       ├── quests/route.ts      # Quest retrieval
│       ├── complete/route.ts    # Completion handler
│       └── streak/route.ts      # Streak data
├── components/
│   ├── QuizCard.tsx
│   ├── ScoreCard.tsx
│   ├── QuestCard.tsx
│   ├── HabitChecklist.tsx
│   └── StreakCounter.tsx
├── lib/
│   ├── scoring.ts               # Scoring engine
│   ├── classifier.ts            # Category classifier
│   ├── llm.ts                   # Groq integration
│   ├── supabase.ts              # Database client
│   └── questions.ts             # 45 MCQ questions
└── types/
    └── index.ts                 # TypeScript types
```

## User Flow

1. **Landing** → User sees minimal hero and starts assessment
2. **Quiz** → Complete 45 MCQ questions with progress tracking
3. **Scoring** → Backend calculates dimension scores (0-100)
4. **Classification** → Assigns 1-3 personality categories
5. **Quest Generation** → LLM creates 5 quests + 5 micro-habits
6. **Dashboard** → User views quests, completes tasks, tracks streaks

## API Endpoints

### POST /api/assess
Submit quiz answers and receive personality profile

**Request:**
```json
{
  "answers": ["A", "C", "B", ...],
  "userId": "uuid"
}
```

**Response:**
```json
{
  "profileId": "uuid",
  "scores": {
    "digital_dependency": 72,
    "introversion": 55,
    "discipline_focus": 48,
    "physical_activity": 35,
    "social_confidence": 41
  },
  "categories": ["Digital Addict", "Fitness Starter"],
  "quests": [...],
  "micro_habits": [...]
}
```

### GET /api/quests?profileId={id}
Fetch user quests and micro-habits

### POST /api/complete
Mark quest/habit as completed

### GET /api/streak?userId={id}
Get streak statistics

## Design Philosophy

**Nothing-Style Aesthetic:**
- Monochrome color palette (black, white, grays)
- High contrast, generous whitespace
- Thin borders (0.5px), 2xl rounded corners
- Soft shadows, subtle glows
- Minimal icons (stroke-only from Lucide)
- Light font weights, calm interactions

## Database Schema

**user_profiles**
- Stores dimension scores and personality categories

**quests**
- Stores generated quests and micro-habits with completion status

**streaks**
- Tracks current streak, longest streak, total XP

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## License

MIT License

## Acknowledgments

- LLM powered by Groq/Meta LLaMA
- Database by Supabase
- Design inspired by Nothing Phone aesthetic
