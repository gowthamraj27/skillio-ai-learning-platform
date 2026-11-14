-- ============================================================================
-- SKILLIO: Blobby AI Learning Companion & Memory Schema
-- Tables: blobby_conversations, blobby_messages, blobby_memory
-- ============================================================================

-- 1. CONVERSATIONS TABLE
create table if not exists public.blobby_conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null default 'Learning Quest',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_blobby_conversations_user 
  on public.blobby_conversations(user_id, updated_at desc);

-- 2. MESSAGES TABLE
create table if not exists public.blobby_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.blobby_conversations(id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  expression text default 'happy',
  suggested_action jsonb default null,
  created_at timestamptz not null default now()
);

create index if not exists idx_blobby_messages_conversation 
  on public.blobby_messages(conversation_id, created_at asc);

-- 3. LONG-TERM MEMORY TABLE
create table if not exists public.blobby_memory (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  memory_type text not null, -- 'goal', 'preference', 'topic_strength', 'weakness'
  memory_content text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_blobby_memory_user 
  on public.blobby_memory(user_id);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

alter table public.blobby_conversations enable row level security;
alter table public.blobby_messages enable row level security;
alter table public.blobby_memory enable row level security;

-- Conversations RLS Policies
create policy "Users can view own conversations"
  on public.blobby_conversations for select
  using (auth.uid() = user_id or auth.uid() is null);

create policy "Users can insert own conversations"
  on public.blobby_conversations for insert
  with check (auth.uid() = user_id or auth.uid() is null);

create policy "Users can update own conversations"
  on public.blobby_conversations for update
  using (auth.uid() = user_id or auth.uid() is null);

create policy "Users can delete own conversations"
  on public.blobby_conversations for delete
  using (auth.uid() = user_id or auth.uid() is null);

-- Messages RLS Policies
create policy "Users can view messages for own conversations"
  on public.blobby_messages for select
  using (
    exists (
      select 1 from public.blobby_conversations c
      where c.id = blobby_messages.conversation_id
      and (c.user_id = auth.uid() or auth.uid() is null)
    )
  );

create policy "Users can insert messages for own conversations"
  on public.blobby_messages for insert
  with check (
    exists (
      select 1 from public.blobby_conversations c
      where c.id = blobby_messages.conversation_id
      and (c.user_id = auth.uid() or auth.uid() is null)
    )
  );

create policy "Users can delete messages for own conversations"
  on public.blobby_messages for delete
  using (
    exists (
      select 1 from public.blobby_conversations c
      where c.id = blobby_messages.conversation_id
      and (c.user_id = auth.uid() or auth.uid() is null)
    )
  );

-- Memory RLS Policies
create policy "Users can manage own memory"
  on public.blobby_memory for all
  using (auth.uid() = user_id or auth.uid() is null)
  with check (auth.uid() = user_id or auth.uid() is null);
