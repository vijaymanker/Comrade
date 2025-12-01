# COMRADE — AI Personality Quest & Habit Coach

> A full-stack lifestyle improvement platform that combines deterministic personality scoring with AI-powered coaching

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Status: Development](https://img.shields.io/badge/Status-Development-blue.svg)]()

---

## 📋 Table of Contents

- [Overview](#overview)
- [System Architecture](#system-architecture)
- [Personality Framework](#personality-framework)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Development Guide](#development-guide)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

COMRADE is a lifestyle coaching platform that:

1. **Evaluates** user behavior through a 45-question MCQ assessment
2. **Scores** responses using deterministic rule-based logic
3. **Classifies** users into lifestyle categories based on threshold analysis
4. **Generates** personalized coaching quests and micro-habits using LLM
5. **Tracks** progress through streaks, XP, and completion metrics

### Key Principles

- **Deterministic Scoring**: Personality evaluation uses transparent mathematical rules
- **AI for Coaching**: LLM generates actionable, motivational content
- **Privacy First**: No sensitive psychological profiling stored
- **Safe & Realistic**: All recommendations are measurable and achievable

---

## 🏗 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         FRONTEND                             │
│  ┌────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │  Quiz UI   │  │  Dashboard   │  │  Progress View   │   │
│  │  (45 MCQs) │  │  (Quests)    │  │  (Streaks/XP)    │   │
│  └─────┬──────┘  └──────┬───────┘  └────────┬─────────┘   │
└────────┼─────────────────┼──────────────────┼──────────────┘
         │                 │                  │
         ▼                 ▼                  ▼
┌─────────────────────────────────────────────────────────────┐
│                       BACKEND API                            │
│  ┌──────────────┐  ┌───────────────┐  ┌─────────────────┐ │
│  │  Scoring     │  │  LLM Quest    │  │  Progress       │ │
│  │  Engine      │→ │  Generator    │  │  Tracker        │ │
│  └──────────────┘  └───────────────┘  └─────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │   Supabase DB    │
                    │  (Profiles,      │
                    │   Quests, Stats) │
                    └──────────────────┘
```

---

## 🧠 Personality Framework

### Five Core Dimensions

Each dimension is scored from **0-100** based on MCQ responses:

| Dimension | Abbr | Description | Low Score (0-40) | High Score (70-100) |
|-----------|------|-------------|------------------|---------------------|
| **Digital Dependency** | DD | Screen time & phone attachment | Minimal digital use | Compulsive usage patterns |
| **Introversion Scale** | INT | Social energy preference | Extroverted tendencies | Strong introverted needs |
| **Discipline & Focus** | DF | Time management & consistency | Struggles with routine | Strong self-discipline |
| **Physical Activity** | PA | Movement & exercise habits | Sedentary lifestyle | Highly active routine |
| **Social Confidence** | SC | Comfort in social situations | Avoids interaction | Confident & outgoing |

### Lifestyle Categories

Categories are assigned using **threshold-based rules**:

```python
# Category Assignment Logic
if DD >= 70:                                    → Digital Addict
if PA < 40:                                     → Fitness Starter
if PA >= 65:                                    → Physically Active
if DF < 50:                                     → Needs Routine Boost
if DF >= 65:                                    → Routine Builder
if INT >= 60 and SC < 55:                       → Social Introvert
if SC < 50:                                     → Social Growth Needed
if SC >= 70:                                    → Socially Confident
if 40 <= DD < 70 and PA >= 40 and DF >= 50:    → Balanced Lifestyle
```

Each user receives **1-3 category labels** based on their score profile.

---

## 🛠 Technology Stack

### Frontend
- **Framework**: React.js / Next.js
- **Styling**: Tailwind CSS
- **State Management**: React Context / Zustand
- **UI Components**: Custom + shadcn/ui

### Backend
- **Runtime**: Node.js / Python (FastAPI)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **API**: RESTful endpoints

### AI/ML
- **LLM Provider**: Groq API (LLaMA 3.2 8B)
- **Alternative Options**: 
  - Hugging Face (LLaMA/Gemma models)
  - Local inference with Ollama
- **Use Cases**: Quest generation, habit wording, coaching tone

---

## 📦 Installation

### Prerequisites

- Node.js 18+ or Python 3.9+
- Supabase account
- Groq API key (or Hugging Face token)

### Setup

```bash
# Clone repository
git clone https://github.com/yourusername/comrade.git
cd comrade

# Install dependencies
npm install
# or
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Add your API keys:
# - SUPABASE_URL
# - SUPABASE_ANON_KEY
# - GROQ_API_KEY
```

### Database Setup

```sql
-- Run migrations in Supabase SQL Editor
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  scores JSONB NOT NULL,
  categories TEXT[],
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE quests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES user_profiles(id),
  title TEXT NOT NULL,
  task TEXT NOT NULL,
  metric TEXT,
  type TEXT CHECK (type IN ('quest', 'micro_habit')),
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE streaks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  total_xp INTEGER DEFAULT 0,
  last_activity DATE
);
```

---

## 🚀 Usage

### 1. Run the Application

```bash
# Development mode
npm run dev
# or
python main.py

# Access at http://localhost:3000
```

### 2. User Flow

```
1. User completes 45-question quiz
2. Answers submitted to /api/assess endpoint
3. Backend:
   - Calculates dimension scores
   - Assigns lifestyle categories
   - Generates 10 personalized items via LLM
4. Dashboard displays:
   - 5 weekly quests
   - 5 daily micro-habits
   - Current streak & XP
5. User completes tasks → progress tracked
```

### 3. Example API Request

```javascript
// POST /api/assess
{
  "answers": ["A", "C", "B", ...], // 45 answers
  "userId": "uuid-here"
}

// Response
{
  "scores": {
    "digital_dependency": 72,
    "introversion": 55,
    "discipline_focus": 48,
    "physical_activity": 35,
    "social_confidence": 41
  },
  "categories": ["Digital Addict", "Fitness Starter", "Needs Routine Boost"],
  "quests": [
    {
      "title": "Screen-Free Mornings",
      "task": "Don't check phone for first 60 minutes after waking",
      "metric": "7 days in a row"
    }
    // ... 4 more quests
  ],
  "micro_habits": [
    {
      "habit": "5-minute desk stretches every 2 hours",
      "metric": "3x per workday"
    }
    // ... 4 more habits
  ]
}
```

---

## 🔧 Development Guide

### Scoring Logic

```python
# config/scoring_map.py
QUESTION_SCORES = {
    0: {
        "A": {"DD": 3, "DF": -1},
        "B": {"DD": 2},
        "C": {"DD": 0, "DF": 1},
        "D": {"DF": 2, "DD": -1}
    },
    # ... define all 45 questions
}

def calculate_scores(answers):
    scores = {"DD": 0, "INT": 0, "DF": 0, "PA": 0, "SC": 0}
    for i, answer in enumerate(answers):
        if i in QUESTION_SCORES and answer in QUESTION_SCORES[i]:
            for dim, points in QUESTION_SCORES[i][answer].items():
                scores[dim] += points
    return normalize_scores(scores)
```

### LLM Prompt Template

```python
QUEST_GENERATION_PROMPT = """
You are COMRADE, a lifestyle coaching assistant.

User Profile:
- Digital Dependency: {DD}/100
- Introversion: {INT}/100
- Discipline & Focus: {DF}/100
- Physical Activity: {PA}/100
- Social Confidence: {SC}/100
- Categories: {labels}

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

Return valid JSON:
{
  "quests": [
    {"title": "...", "task": "...", "metric": "..."}
  ],
  "micro_habits": [
    {"habit": "...", "metric": "..."}
  ]
}
"""
```

### Testing

```bash
# Run unit tests
npm test
# or
pytest tests/

# Test scoring accuracy
python scripts/test_classification.py

# Generate sample quests
python scripts/test_quest_generation.py
```

---

## 📊 Roadmap

- [x] Core scoring engine
- [x] LLM quest generation
- [x] Basic dashboard UI
- [ ] Mobile app (React Native)
- [ ] Advanced streak rewards system
- [ ] Community challenges
- [ ] Habit analytics dashboard
- [ ] Multi-language support

---

## 🤝 Contributing

Contributions welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) first.

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Inspired by behavioral psychology research
- LLM powered by Groq/Meta LLaMA
- UI components from shadcn/ui
- Database infrastructure by Supabase

---

## 📧 Contact

**Project Maintainer**: Your Name  
**Email**: your.email@example.com  
**Project Link**: https://github.com/yourusername/comrade

---

**Built with ❤️ for a healthier, more balanced lifestyle**