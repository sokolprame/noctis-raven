CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS contact_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL CHECK (char_length(name) <= 100),
  email TEXT NOT NULL CHECK (char_length(email) <= 254),
  message TEXT NOT NULL CHECK (char_length(message) <= 5000),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_contact_requests_created_at
  ON contact_requests (created_at DESC);
