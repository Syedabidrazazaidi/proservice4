/*
  # Remove authentication requirements

  1. Changes
    - Drop all existing policies
    - Remove auth.users foreign key constraint
    - Create new public access policies
    - Ensure RLS remains enabled

  2. Security
    - Allow public access to all operations
    - Remove authentication requirements
*/

-- First, drop all existing policies
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Allow public select" ON service_providers;
    DROP POLICY IF EXISTS "Allow public insert" ON service_providers;
    DROP POLICY IF EXISTS "Allow public update" ON service_providers;
    DROP POLICY IF EXISTS "Enable insert for authenticated users" ON service_providers;
    DROP POLICY IF EXISTS "Enable update for users based on id" ON service_providers;
    DROP POLICY IF EXISTS "Enable read access for all users" ON service_providers;
    DROP POLICY IF EXISTS "Anyone can view service providers" ON service_providers;
    DROP POLICY IF EXISTS "Users can update own profile" ON service_providers;
    DROP POLICY IF EXISTS "Users can insert own profile" ON service_providers;
EXCEPTION
    WHEN undefined_object THEN 
        -- Do nothing, policy doesn't exist
END $$;

-- Drop foreign key constraint to auth.users if it exists
ALTER TABLE service_providers 
DROP CONSTRAINT IF EXISTS service_providers_id_fkey;

-- Create new public access policies
DO $$ 
BEGIN
    -- Only create policies if they don't exist
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'public_select' AND tablename = 'service_providers') THEN
        CREATE POLICY "public_select" ON service_providers FOR SELECT USING (true);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'public_insert' AND tablename = 'service_providers') THEN
        CREATE POLICY "public_insert" ON service_providers FOR INSERT WITH CHECK (true);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'public_update' AND tablename = 'service_providers') THEN
        CREATE POLICY "public_update" ON service_providers FOR UPDATE USING (true);
    END IF;
END $$;

-- Ensure RLS is still enabled
ALTER TABLE service_providers ENABLE ROW LEVEL SECURITY;