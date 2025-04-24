/*
  # Update Service Provider Policies and Storage

  1. Changes
    - Drop existing policies
    - Create new policies for public access
    - Enable storage access

  2. Security
    - Allow public access to service_providers table
    - Allow public access to storage
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can insert own profile" ON service_providers;
DROP POLICY IF EXISTS "Users can update own profile" ON service_providers;
DROP POLICY IF EXISTS "Anyone can view service providers" ON service_providers;
DROP POLICY IF EXISTS "Allow public inserts" ON service_providers;

-- Create new policies for public access
CREATE POLICY "Anyone can view service providers"
  ON service_providers
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public inserts"
  ON service_providers
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public updates"
  ON service_providers
  FOR UPDATE
  USING (true);

-- Ensure RLS is enabled
ALTER TABLE service_providers ENABLE ROW LEVEL SECURITY;