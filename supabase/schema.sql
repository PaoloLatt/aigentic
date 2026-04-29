-- ============================================================
-- AgentForge — Supabase Schema
-- Esegui questo file nel SQL Editor di Supabase:
--   Dashboard → SQL Editor → New query → incolla → Run
-- ============================================================

-- ── 1. LEADS ────────────────────────────────────────────────

create table if not exists public.leads (
  id           uuid         default gen_random_uuid() primary key,
  created_at   timestamptz  default now()             not null,
  name         text                                   not null,
  email        text                                   not null,
  company      text         default ''                not null,
  interest     text         default ''                not null,
  message      text         default ''                not null,
  score        integer      default 50                not null,
  status       text         default 'Nuovo'           not null,
  utm_source   text,
  utm_medium   text,
  utm_campaign text,
  source_page  text,

  constraint leads_status_check check (
    status in ('Nuovo', 'Contattato', 'In trattativa', 'Chiuso vinto', 'Chiuso perso')
  )
);

-- Index per ordinamento admin
create index if not exists idx_leads_created_at
  on public.leads(created_at desc);

create index if not exists idx_leads_status
  on public.leads(status);

-- RLS: tabella accessibile solo via service role key (mai esposta al client)
alter table public.leads enable row level security;

-- Nessuna policy pubblica — solo service role può leggere/scrivere
-- (Il client Supabase nel backend usa la service role key, che bypassa RLS)

-- ── 2. CONSENT LOGS ─────────────────────────────────────────

create table if not exists public.consent_logs (
  id               uuid         default gen_random_uuid() primary key,
  created_at       timestamptz  default now()             not null,
  anonymous_id     text                                   not null,
  consent_version  text         default '1.0'             not null,
  categories       jsonb                                  not null,
  action           text                                   not null,
  user_agent       text,

  constraint consent_logs_action_check check (
    action in ('accept_all', 'reject_all', 'custom')
  )
);

create index if not exists idx_consent_logs_created_at
  on public.consent_logs(created_at desc);

create index if not exists idx_consent_logs_action
  on public.consent_logs(action);

alter table public.consent_logs enable row level security;

-- ── 3. COOKIE SETTINGS ──────────────────────────────────────

create table if not exists public.cookie_settings (
  id         uuid         default gen_random_uuid() primary key,
  key        text                                   not null unique,
  value      jsonb                                  not null,
  updated_at timestamptz  default now()             not null
);

alter table public.cookie_settings enable row level security;

-- Seed con i valori di default del banner
insert into public.cookie_settings (key, value) values
  (
    'banner_config',
    '{
      "title": "Questo sito utilizza i cookie",
      "text": "Utilizziamo cookie tecnici necessari al funzionamento del sito e, con il tuo consenso, cookie di analisi e marketing per migliorare la tua esperienza e misurare l''efficacia dei nostri servizi.",
      "position": "bottom",
      "theme": "dark",
      "buttons": {
        "accept": "Accetta tutti",
        "reject": "Rifiuta tutti",
        "customize": "Personalizza"
      }
    }'
  ),
  (
    'privacy_info',
    '{
      "company_name": "AgentForge",
      "company_address": "[Indirizzo]",
      "company_email": "privacy@agentforge.it",
      "company_vat": "[P.IVA]",
      "last_updated": "2026-04-29"
    }'
  )
on conflict (key) do nothing;

-- ── 4. FUNZIONI UTILI ────────────────────────────────────────

-- Conteggio lead per interesse (usata dalla dashboard)
create or replace function public.leads_by_interest()
returns table(interest text, count bigint)
language sql stable
as $$
  select
    case
      when interest ilike '%marketing%' then 'Marketing'
      when interest ilike '%sales%'     then 'Sales'
      when interest ilike '%customer%'  then 'Customer Service'
      when interest ilike '%operation%' then 'Operations'
      else 'Altro'
    end as interest,
    count(*) as count
  from public.leads
  group by 1
  order by 2 desc;
$$;

-- ============================================================
-- VERIFICA — esegui dopo per controllare che le tabelle siano state create:
--
--   select table_name from information_schema.tables
--   where table_schema = 'public'
--   order by table_name;
--
-- Risultato atteso: consent_logs, cookie_settings, leads
-- ============================================================
