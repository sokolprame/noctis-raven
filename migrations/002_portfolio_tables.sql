CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS arts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'ART',
  summary TEXT NOT NULL,
  description TEXT NOT NULL,
  story TEXT NOT NULL,
  tools JSONB DEFAULT '[]'::jsonb,
  cover TEXT NOT NULL,
  gallery JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS web_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  summary TEXT NOT NULL,
  brief TEXT NOT NULL,
  challenge TEXT NOT NULL,
  goals JSONB DEFAULT '[]'::jsonb,
  solution TEXT NOT NULL,
  process_research TEXT NOT NULL,
  process_structure TEXT NOT NULL,
  process_prototyping TEXT NOT NULL,
  process_ui TEXT NOT NULL,
  gallery_home TEXT NOT NULL,
  gallery_inner TEXT NOT NULL,
  gallery_responsive TEXT NOT NULL,
  gallery_ui TEXT NOT NULL,
  technologies JSONB DEFAULT '[]'::jsonb,
  features JSONB DEFAULT '[]'::jsonb,
  live_url TEXT NOT NULL,
  result TEXT NOT NULL,
  cover TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_arts_created_at ON arts (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_web_projects_created_at ON web_projects (created_at DESC);
