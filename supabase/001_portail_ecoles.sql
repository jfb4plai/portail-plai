-- supabase/001_portail_ecoles.sql
-- Table de gestion des accès conditionnels par école pour le portail PLAI.
-- Lecture publique (le portail vérifie les accès sans authentification) ;
-- écriture réservée à la fonction serverless api/admin-schools.js (clé service role).

create table portail_ecoles (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  nom text not null,
  apps_debloquees text[] not null default '{}',
  created_at timestamptz default now()
);

alter table portail_ecoles enable row level security;

create policy "lecture publique" on portail_ecoles
  for select using (true);
