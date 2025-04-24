/*
  # Service Providers Schema

  1. New Tables
    - `service_providers`
      - `id` (uuid, primary key, references auth.users)
      - `full_name` (text)
      - `profession` (text)
      - `experience_years` (integer)
      - `specialization` (text, nullable)
      - `availability` (text, nullable)
      - `age` (integer)
      - `phone` (text)
      - `location` (text)
      - `photo_url` (text, nullable)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for viewing, updating, and inserting records
    - Add trigger for updating timestamps
*/

CREATE TABLE IF NOT EXISTS service_providers (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text NOT NULL,
  profession text NOT NULL,
  experience_years integer NOT NULL,
  specialization text,
  availability text,
  age integer NOT NULL,
  phone text NOT NULL,
  location text NOT NULL,
  photo_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE service_providers ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Anyone can view service providers" ON service_providers;
    DROP POLICY IF EXISTS "Users can update own profile" ON service_providers;
    DROP POLICY IF EXISTS "Users can insert own profile" ON service_providers;
EXCEPTION
    WHEN undefined_object THEN 
END $$;

-- Create policies
CREATE POLICY "Anyone can view service providers"
  ON service_providers
  FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON service_providers
  FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON service_providers
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create function to automatically set updated_at
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS set_updated_at ON service_providers;

-- Create trigger to automatically update updated_at
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON service_providers
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();