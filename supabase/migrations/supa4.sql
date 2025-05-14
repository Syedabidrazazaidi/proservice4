-- Create bucket if it doesn't exist
INSERT INTO storage.buckets (id, name)
VALUES ('profile-photos', 'profile-photos')
ON CONFLICT (id) DO NOTHING;

-- Allow public to upload profile photos
CREATE POLICY "Public upload"
  ON storage.objects
  FOR INSERT
  TO public
  WITH CHECK (
    bucket_id = 'profile-photos'
  );

-- Allow public to read profile photos
CREATE POLICY "Public read photo"
  ON storage.objects
  FOR SELECT
  TO public
  USING (
    bucket_id = 'profile-photos'
  );
