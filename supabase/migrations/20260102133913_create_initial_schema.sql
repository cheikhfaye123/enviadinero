/*
  # Initial Database Schema for Comparison Platform

  ## Overview
  Creates the core database structure for a multilingual country comparison platform
  with articles, countries, services comparison, and user checklists.

  ## New Tables

  ### `profiles`
  - `id` (uuid, primary key, references auth.users)
  - `email` (text)
  - `full_name` (text)
  - `preferred_language` (text, default 'fr')
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `articles`
  - `id` (uuid, primary key)
  - `slug` (text, unique)
  - `title_fr` (text)
  - `title_en` (text)
  - `content_fr` (text)
  - `content_en` (text)
  - `excerpt_fr` (text)
  - `excerpt_en` (text)
  - `image_url` (text)
  - `category` (text)
  - `published` (boolean, default false)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `countries`
  - `id` (uuid, primary key)
  - `code` (text, unique)
  - `name_fr` (text)
  - `name_en` (text)
  - `description_fr` (text)
  - `description_en` (text)
  - `flag_emoji` (text)
  - `cost_of_living` (integer)
  - `quality_of_life` (integer)
  - `safety_rating` (integer)
  - `healthcare_rating` (integer)
  - `weather_rating` (integer)
  - `language_barrier` (integer)
  - `created_at` (timestamptz)

  ### `services`
  - `id` (uuid, primary key)
  - `name_fr` (text)
  - `name_en` (text)
  - `description_fr` (text)
  - `description_en` (text)
  - `category` (text)
  - `price_range` (text)
  - `url` (text)
  - `created_at` (timestamptz)

  ### `user_checklists`
  - `id` (uuid, primary key)
  - `user_id` (uuid, references auth.users)
  - `item_fr` (text)
  - `item_en` (text)
  - `completed` (boolean, default false)
  - `category` (text)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Add policies for authenticated users to manage their own data
  - Public read access for articles and countries
  - Service directory is publicly readable
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  preferred_language text DEFAULT 'fr',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title_fr text NOT NULL,
  title_en text NOT NULL,
  content_fr text NOT NULL,
  content_en text NOT NULL,
  excerpt_fr text,
  excerpt_en text,
  image_url text,
  category text DEFAULT 'general',
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published articles"
  ON articles FOR SELECT
  TO public
  USING (published = true);

-- Create countries table
CREATE TABLE IF NOT EXISTS countries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  name_fr text NOT NULL,
  name_en text NOT NULL,
  description_fr text,
  description_en text,
  flag_emoji text,
  cost_of_living integer DEFAULT 50,
  quality_of_life integer DEFAULT 50,
  safety_rating integer DEFAULT 50,
  healthcare_rating integer DEFAULT 50,
  weather_rating integer DEFAULT 50,
  language_barrier integer DEFAULT 50,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE countries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view countries"
  ON countries FOR SELECT
  TO public
  USING (true);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_fr text NOT NULL,
  name_en text NOT NULL,
  description_fr text,
  description_en text,
  category text DEFAULT 'general',
  price_range text,
  url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view services"
  ON services FOR SELECT
  TO public
  USING (true);

-- Create user_checklists table
CREATE TABLE IF NOT EXISTS user_checklists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  item_fr text NOT NULL,
  item_en text NOT NULL,
  completed boolean DEFAULT false,
  category text DEFAULT 'general',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_checklists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own checklist items"
  ON user_checklists FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own checklist items"
  ON user_checklists FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own checklist items"
  ON user_checklists FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own checklist items"
  ON user_checklists FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);