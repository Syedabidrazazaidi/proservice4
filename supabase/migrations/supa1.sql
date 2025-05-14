-- Enable RLS
ALTER TABLE service_providers ENABLE ROW LEVEL SECURITY;

-- OPTIONAL: Drop previous policies
-- You'll need to drop them manually via Supabase UI or in SQL using exact names

-- Allow ANYONE (public) to insert data
CREATE POLICY "Public insert"
  ON service_providers
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow ANYONE (public) to update data (not recommended unless necessary)
CREATE POLICY "Public update"
  ON service_providers
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Allow ANYONE (public) to read service providers
CREATE POLICY "Public read"
  ON service_providers
  FOR SELECT
  TO public
  USING (true);
