-- Create admin_users table if it doesn't exist
create table if not exists public.admin_users (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id)
);

-- Enable RLS on admin_users
alter table public.admin_users enable row level security;

-- Policy: Allow admins to read all admin_users
create policy "Admins can read admin_users"
  on public.admin_users
  for select
  using (
    exists (
      select 1 from public.admin_users
      where user_id = auth.uid()
    )
  );

-- Policy: Allow admins to insert into admin_users
-- Note: Initial admin must be inserted via Supabase dashboard/service role
create policy "Admins can insert admin_users"
  on public.admin_users
  for insert
  with check (
    exists (
      select 1 from public.admin_users
      where user_id = auth.uid()
    )
  );

-- Policy: Allow admins to update admin_users
create policy "Admins can update admin_users"
  on public.admin_users
  for update
  using (
    exists (
      select 1 from public.admin_users
      where user_id = auth.uid()
    )
  );

-- Policy: Allow admins to delete admin_users
create policy "Admins can delete admin_users"
  on public.admin_users
  for delete
  using (
    exists (
      select 1 from public.admin_users
      where user_id = auth.uid()
    )
  );

-- Jobs RLS policies for admins
-- Policy: Allow admins to read all jobs
create policy "Admins can read all jobs"
  on public.jobs
  for select
  using (
    exists (
      select 1 from public.admin_users
      where user_id = auth.uid()
    )
  );

-- Policy: Allow admins to update all jobs
create policy "Admins can update all jobs"
  on public.jobs
  for update
  using (
    exists (
      select 1 from public.admin_users
      where user_id = auth.uid()
    )
  );

