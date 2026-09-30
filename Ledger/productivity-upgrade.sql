-- Ledger: Productivity setup (Tasks, Habits, Body)
-- Run in the Supabase SQL Editor. Works whether these tables are missing, from an older version, or already up to date.
-- Safe to run more than once: existing tasks, habits, check-ins and meals are kept.

-- ── Tasks ──
create table if not exists tasks (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  deadline date,
  priority text,
  done boolean not null default false,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);
alter table tasks add column if not exists notes text;
alter table tasks add column if not exists status text not null default 'not_started';
alter table tasks add column if not exists planned_for date;
alter table tasks add column if not exists category text not null default 'Other';
alter table tasks add column if not exists estimate_min int;
update tasks set status = 'completed' where done and status <> 'completed';
update tasks set planned_for = (created_at at time zone 'Asia/Karachi')::date where planned_for is null;
alter table tasks alter column planned_for set default current_date;
alter table tasks alter column planned_for set not null;
alter table tasks alter column priority drop not null;
alter table tasks drop constraint if exists tasks_status_check;
alter table tasks add constraint tasks_status_check check (status in ('not_started','in_progress','completed'));

-- ── Habits ──
create table if not exists habits (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  color text not null default '#c9a84c',
  created_at timestamptz not null default now()
);
alter table habits add column if not exists target text;
alter table habits add column if not exists per_week int;
alter table habits add column if not exists weekdays int[];
alter table habits add column if not exists archived_at timestamptz;
alter table habits alter column color set default '#c9a84c';
alter table habits drop constraint if exists habits_per_week_check;
alter table habits add constraint habits_per_week_check check (per_week between 1 and 7);

create table if not exists habit_logs (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  habit_id bigint not null references habits(id) on delete cascade,
  date date not null,
  created_at timestamptz not null default now(),
  unique (habit_id, date)
);

-- ── Meals: one row per eaten meal ──
create table if not exists meals (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  date date not null,
  slot text not null check (slot in ('breakfast','lunch','dinner')),
  name text,
  calories int,
  protein int,
  notes text,
  created_at timestamptz not null default now(),
  unique (user_id, date, slot)
);

-- ── Daily calorie and protein targets ──
create table if not exists user_settings (
  user_id uuid primary key references auth.users(id) on delete cascade,
  calorie_target int not null default 2500,
  protein_target int not null default 120,
  updated_at timestamptz not null default now()
);

-- ── Row Level Security: each person only sees their own rows ──
alter table tasks         enable row level security;
alter table habits        enable row level security;
alter table habit_logs    enable row level security;
alter table meals         enable row level security;
alter table user_settings enable row level security;
drop policy if exists "Owner access" on tasks;
drop policy if exists "Owner access" on habits;
drop policy if exists "Owner access" on habit_logs;
drop policy if exists "Owner access" on meals;
drop policy if exists "Owner access" on user_settings;
create policy "Owner access" on tasks         for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Owner access" on habits        for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Owner access" on habit_logs    for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Owner access" on meals         for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Owner access" on user_settings for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- ── Make the site see the new tables right away ──
notify pgrst, 'reload schema';
