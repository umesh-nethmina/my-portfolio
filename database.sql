-- Create Projects Table
create table public.projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text not null,
  image_url text,
  github_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Blogs Table
create table public.blogs (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  content text not null,
  cover_image text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Migration: If blogs table already exists, add cover_image column
-- ALTER TABLE public.blogs ADD COLUMN IF NOT EXISTS cover_image text;

-- Set up Row Level Security (RLS)
alter table public.projects enable row level security;
alter table public.blogs enable row level security;

-- Create Policies
-- Allow public read access to projects
create policy "Allow public read-only access to projects" on public.projects
  for select using (true);

-- Allow authenticated users to manage projects
create policy "Allow authenticated users to manage projects" on public.projects
  for all using (auth.role() = 'authenticated');

-- Allow public read access to blogs
create policy "Allow public read-only access to blogs" on public.blogs
  for select using (true);

-- Allow authenticated users to manage blogs
create policy "Allow authenticated users to manage blogs" on public.blogs
  for all using (auth.role() = 'authenticated');

-- Storage Bucket for Images (Bonus feature)
insert into storage.buckets (id, name, public) 
values ('portfolio-images', 'portfolio-images', true);

-- Storage Policies
create policy "Allow public read-only access to storage" on storage.objects
  for select using (bucket_id = 'portfolio-images');

create policy "Allow authenticated uploads" on storage.objects
  for insert with check (
    bucket_id = 'portfolio-images' and auth.role() = 'authenticated'
  );

create policy "Allow authenticated update" on storage.objects
  for update using (
    bucket_id = 'portfolio-images' and auth.role() = 'authenticated'
  );

create policy "Allow authenticated delete" on storage.objects
  for delete using (
    bucket_id = 'portfolio-images' and auth.role() = 'authenticated'
  );
