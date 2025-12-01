CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    scores JSONB NOT NULL,
    categories TEXT [],
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
    user_id UUID NOT NULL UNIQUE,
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    total_xp INTEGER DEFAULT 0,
    last_activity DATE,
    created_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX idx_quests_profile_id ON quests(profile_id);
CREATE INDEX idx_streaks_user_id ON streaks(user_id);