-- Ledger — Financial Hub
-- Run once in the Supabase SQL Editor to provision the schema.
-- 10 tables, each scoped to auth.users via user_id with Row Level Security.

create table income (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  amount numeric not null,
  category text not null,
  date date not null,
  note text,
  created_at timestamptz not null default now()
);

create table expenses (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  amount numeric not null,
  category text not null,
  date date not null,
  note text,
  created_at timestamptz not null default now()
);

create table goals (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  target numeric not null,
  saved numeric not null default 0,
  target_date date,
  created_at timestamptz not null default now()
);

create table budgets (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  category text not null,
  amount numeric not null,
  created_at timestamptz not null default now(),
  unique (user_id, category)
);

create table recurring (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  amount numeric not null,
  category text not null,
  day int not null,
  note text,
  created_at timestamptz not null default now()
);

create table upcoming (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  amount numeric not null,
  category text not null,
  date date,
  note text,
  created_at timestamptz not null default now()
);

create table assets (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  val numeric not null,
  cat text not null,
  created_at timestamptz not null default now()
);

create table liabilities (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  val numeric not null,
  cat text not null,
  created_at timestamptz not null default now()
);

create table debts (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  total numeric not null,
  paid numeric not null default 0,
  monthly numeric not null default 0,
  due date,
  note text,
  created_at timestamptz not null default now()
);

create table notes (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  month text not null,
  text text not null,
  created_at timestamptz not null default now(),
  unique (user_id, month)
);

-- Row Level Security: every table is owner-only via auth.uid() = user_id.
alter table income      enable row level security;
alter table expenses    enable row level security;
alter table goals       enable row level security;
alter table budgets     enable row level security;
alter table recurring   enable row level security;
alter table upcoming    enable row level security;
alter table assets      enable row level security;
alter table liabilities enable row level security;
alter table debts       enable row level security;
alter table notes       enable row level security;

create policy "Owner access" on income      for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Owner access" on expenses    for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Owner access" on goals       for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Owner access" on budgets     for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Owner access" on recurring   for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Owner access" on upcoming    for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Owner access" on assets      for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Owner access" on liabilities for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Owner access" on debts       for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Owner access" on notes       for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
