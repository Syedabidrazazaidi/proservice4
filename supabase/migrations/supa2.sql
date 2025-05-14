/*
  # Remove authentication requirements

  1. Changes
    - Remove auth.users foreign key constraint
    - Update RLS policies to allow public access
    - Remove authentication checks
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON service_providers;
DROP POLICY IF EXISTS "Enable update for users based on id" ON service_providers;
DROP POLICY IF EXISTS "Enable read access for all users" ON service_providers;

-- Drop foreign key constraint to auth.users
ALTER TABLE service_providers 
DROP CONSTRAINT IF EXISTS service_providers_id_fkey;

-- Create new public access policies
CREATE POLICY "Allow public select"
  ON service_providers
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert"
  ON service_providers
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update"
  ON service_providers
  FOR UPDATE
  USING (true);

-- Ensure RLS is still enabled
ALTER TABLE service_providers ENABLE ROW LEVEL SECURITY;