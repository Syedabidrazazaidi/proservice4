-- Create table
CREATE TABLE IF NOT EXISTS service_providers (
  id uuid PRIMARY KEY,
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

-- Enable RLS
ALTER TABLE service_providers ENABLE ROW LEVEL SECURITY;

-- Allow SELECT for everyone
CREATE POLICY "Public can read providers"
  ON service_providers
  FOR SELECT
  USING (true);

-- Allow INSERT for everyone
CREATE POLICY "Public can insert providers"
  ON service_providers
  FOR INSERT
  WITH CHECK (true);

-- Allow UPDATE for everyone
CREATE POLICY "Public can update providers"
  ON service_providers
  FOR UPDATE
  USING (true);

-- Auto-update 'updated_at' on row update
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to apply function before updates
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON service_providers
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();
