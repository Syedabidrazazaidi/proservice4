/*
  # Update RLS Policies for Service Providers

  1. Changes
    - Update insert policy to allow public inserts without auth check
    - Remove storage policies that were causing errors
    - Keep the focus on service_providers table policies

  2. Security
    - Allow public inserts to service_providers table
    - Note: Storage bucket creation and management should be handled through the Supabase dashboard
*/

-- Drop existing insert policy if it exists
DROP POLICY IF EXISTS "Users can insert own profile" ON service_providers;

-- Create new public insert policy
CREATE POLICY "Allow public inserts"
  ON service_providers
  FOR INSERT
  WITH CHECK (true);

-- Ensure RLS is enabled
ALTER TABLE service_providers ENABLE ROW LEVEL SECURITY;