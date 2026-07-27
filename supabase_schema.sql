-- Run this script in your Supabase Dashboard SQL Editor:
-- https://supabase.com/dashboard/project/mitpvuvaihjkvcxvsvzg/sql/new

-- 1. Create users table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "accountId" TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  "imageUrl" TEXT,
  status BOOLEAN DEFAULT true,
  "emailVerification" BOOLEAN DEFAULT false,
  is_pro BOOLEAN DEFAULT false,
  subscription_license_key TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Create links table
CREATE TABLE IF NOT EXISTS public.links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "userId" TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  "imageUrl" TEXT,
  "imageId" TEXT,
  is_show_social_icons BOOLEAN DEFAULT true,
  is_show_verified_icon BOOLEAN DEFAULT false,
  is_show_watermark BOOLEAN DEFAULT true,
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT,
  ga_tag TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Create social_media table
CREATE TABLE IF NOT EXISTS public.social_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  link_id TEXT UNIQUE NOT NULL,
  twitter TEXT,
  telegram TEXT,
  linked_in TEXT,
  github TEXT,
  instagram TEXT,
  twitch TEXT,
  skype TEXT,
  tiktok TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Create link_blocks table
CREATE TABLE IF NOT EXISTS public.link_blocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  link_id TEXT NOT NULL,
  block_type TEXT NOT NULL,
  other_values TEXT,
  link TEXT,
  block_order INT DEFAULT 0,
  is_private BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  total_clicks INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Create stats table
CREATE TABLE IF NOT EXISTS public.stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  link_id TEXT NOT NULL,
  ip_address TEXT NOT NULL,
  city TEXT,
  region TEXT,
  country TEXT,
  zip TEXT,
  "countryCode" TEXT,
  referrer TEXT,
  total_views_by_ip INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Create plans table
CREATE TABLE IF NOT EXISTS public.plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS) and grant access
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.link_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public access to users" ON public.users;
CREATE POLICY "Allow public access to users" ON public.users FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public access to links" ON public.links;
CREATE POLICY "Allow public access to links" ON public.links FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public access to social_media" ON public.social_media;
CREATE POLICY "Allow public access to social_media" ON public.social_media FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public access to link_blocks" ON public.link_blocks;
CREATE POLICY "Allow public access to link_blocks" ON public.link_blocks FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public access to stats" ON public.stats;
CREATE POLICY "Allow public access to stats" ON public.stats FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public access to plans" ON public.plans;
CREATE POLICY "Allow public access to plans" ON public.plans FOR ALL USING (true) WITH CHECK (true);
