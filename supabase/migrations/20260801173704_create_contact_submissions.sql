/*
# Create contact_submissions table (single-tenant, no auth)

1. New Tables
- `contact_submissions`
  - `id` (uuid, primary key)
  - `name` (text, not null) — submitter's full name
  - `email` (text, not null) — submitter's email address
  - `company` (text, nullable) — optional company name
  - `project_type` (text, nullable) — type of project requested
  - `budget` (text, nullable) — budget range selected
  - `message` (text, not null) — the inquiry message
  - `created_at` (timestamptz, default now())
  - `is_read` (boolean, default false) — tracks whether the inquiry has been reviewed

2. Security
- Enable RLS on `contact_submissions`.
- This is a no-auth public contact form, so the anon-key client must be able to INSERT.
- Allow anon + authenticated INSERT only (the public submits forms).
- SELECT/UPDATE/DELETE restricted to authenticated (the site owner reads/manages submissions in a private admin context).
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  company text,
  project_type text,
  budget text,
  message text NOT NULL,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Public can submit contact forms (INSERT only)
DROP POLICY IF EXISTS "anon_insert_contact_submissions" ON contact_submissions;
CREATE POLICY "anon_insert_contact_submissions"
ON contact_submissions FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only authenticated (site owner) can read submissions
DROP POLICY IF EXISTS "auth_select_contact_submissions" ON contact_submissions;
CREATE POLICY "auth_select_contact_submissions"
ON contact_submissions FOR SELECT
TO authenticated
USING (true);

-- Only authenticated can mark as read / update
DROP POLICY IF EXISTS "auth_update_contact_submissions" ON contact_submissions;
CREATE POLICY "auth_update_contact_submissions"
ON contact_submissions FOR UPDATE
TO authenticated
USING (true) WITH CHECK (true);

-- Only authenticated can delete
DROP POLICY IF EXISTS "auth_delete_contact_submissions" ON contact_submissions;
CREATE POLICY "auth_delete_contact_submissions"
ON contact_submissions FOR DELETE
TO authenticated
USING (true);
