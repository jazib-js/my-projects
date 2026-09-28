-- Ledger: Productivity upgrade (Tasks, Habits, Body)
-- Run once in the Supabase SQL Editor. Safe to run again; existing tasks, habits and check-ins are kept.

-- Tasks: status, planned day, notes, category, estimate
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

-- Habits: target, how often, archiving
alter table habits add column if not exists target text;
alter table habits add column if not exists per_week int;
alter table habits add column if not exists weekdays int[];
alter table habits add column if not exists archived_at timestamptz;
alter table habits alter column color set default '#c9a84c';
alter table habits drop constraint if exists habits_per_week_check;
alter table habits add constraint habits_per_week_check check (per_week between 1 and 7);

-- Meals: one row per eaten meal
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
alter table meals enable row level security;
drop policy if exists "Owner access" on meals;
create policy "Owner access" on meals for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Daily calorie and protein targets
create table if not exists user_settings (
  user_id uuid primary key references auth.users(id) on delete cascade,
  calorie_target int not null default 2500,
  protein_target int not null default 120,
  updated_at timestamptz not null default now()
);
alter table user_settings enable row level security;
drop policy if exists "Owner access" on user_settings;
create policy "Owner access" on user_settings for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
