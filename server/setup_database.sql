-- Drop existing tables if they exist (to start fresh)
DROP TABLE IF EXISTS mood_entries CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Create a table for users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    profile_image_url TEXT,
    points INTEGER DEFAULT 0,
    google_id VARCHAR(100) UNIQUE,
    purchased_plants JSONB DEFAULT '[]'
);

-- Create a table for mood entries
CREATE TABLE mood_entries (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    flower_id VARCHAR(50) NOT NULL,
    date DATE NOT NULL UNIQUE,
    note TEXT
);