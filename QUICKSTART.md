# COMRADE Platform - Quick Start

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with your credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
GROQ_API_KEY=your_groq_key
```

3. Run Supabase schema (copy from `supabase/schema.sql` to Supabase SQL Editor)

4. Start development server:
```bash
npm run dev
```

5. Open http://localhost:3000

## File Structure

- `app/` - Next.js pages and API routes
- `components/` - React UI components
- `lib/` - Core logic (scoring, classification, LLM)
- `types/` - TypeScript definitions
- `supabase/` - Database schema

## Key Features

✅ 45-question personality quiz
✅ Deterministic scoring (0-100 per dimension)
✅ Rule-based category classification
✅ AI quest generation via Groq
✅ Nothing-style minimal UI
✅ Streak tracking & XP system
