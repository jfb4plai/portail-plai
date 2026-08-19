# Accès conditionnel par école — verrouillage des vignettes du portail

## Contexte et objectif

Le portail PLAI (portail-plai.vercel.app) est aujourd'hui un site statique : toutes les
écoles voient exactement les mêmes vignettes d'apps, sans distinction. Jean-François
souhaite pouvoir réserver certaines apps (typiquement celles qui n'ont de sens qu'après
une sensibilisation vécue en présentiel) à des écoles précises, et ouvrir cet accès à
distance, sans redéploiement de code pour chaque école.

Les vignettes non débloquées pour une école donnée doivent rester visibles mais grisées,
avec un message explicite indiquant pourquoi et ce qu'il faut faire pour les débloquer —
pas une disparition pure et simple.

## Hors périmètre

- Authentification enseignant (compte, mot de passe par école) : explicitement écarté au
  profit d'un simple lien avec code école.
- Décider automatiquement quelles apps sont "gated" en fonction de leur section
  (`sensibilisation` etc.) : la liste des apps concernées est choisie manuellement par
  Jean-François, app par app.
- Expiration ou révocation temporisée d'un accès : non demandé, l'admin peut décocher une
  app manuellement si besoin.

## Architecture

### 1. Identification de l'école — lien avec code

Chaque école reçoit un lien du type `https://portail-plai.vercel.app/?ecole=XXXX`. Pas de
compte, pas de mot de passe côté enseignant. Au premier chargement avec ce paramètre, le
code est mémorisé en `localStorage` (clé `plai_ecole_code`) pour que le lien n'ait besoin
d'être ouvert qu'une seule fois par appareil — les visites suivantes sans le paramètre
d'URL réutilisent le code mémorisé.

Un visiteur sans code reconnu (ni paramètre d'URL, ni valeur en `localStorage`) voit
toutes les apps `gated` grisées par défaut.

### 2. Stockage des accès — table Supabase `portail_ecoles`

Projet Supabase partagé existant `dfoaumjleqtxjeaplnna` (déjà utilisé par la majorité des
apps PLAI — pas de nouveau projet créé, conformément à la limite de 2 projets gratuits).

```sql
create table portail_ecoles (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  nom text not null,
  apps_debloquees text[] not null default '{}',
  created_at timestamptz default now()
);

alter table portail_ecoles enable row level security;

-- Lecture publique : le portail (visiteur anonyme) doit pouvoir vérifier les accès
-- de sa propre école sans authentification.
create policy "lecture publique" on portail_ecoles
  for select using (true);

-- Aucune policy insert/update/delete pour les rôles anon/authenticated :
-- toute écriture passe exclusivement par la fonction serverless (clé service role),
-- qui vérifie le mot de passe admin côté serveur avant d'écrire.
```

Pas de trigger `updated_at` : aucun besoin de traçabilité des modifications pour cette
table.

Nommage conforme à la convention PLAI (préfixe `portail_`) — vérifié en amont : aucune
table `portail_ecoles` existante dans les autres apps du projet partagé.

### 3. Déclaration des apps concernées — `apps.ts` / `types/index.ts`

Deux champs optionnels ajoutés au type `AppItem` :

```ts
gated?: boolean;      // cette app fait partie du système de verrouillage par école
unlockHint?: string;  // message affiché tant qu'elle est verrouillée
```

Décider quelles apps sont `gated` reste une décision prise en code par Jean-François
(changement rare, nécessite un déploiement). Ce qui est piloté à distance, c'est le
déblocage d'une app précise pour une école précise — pas la liste des apps verrouillables
elle-même.

### 4. Affichage conditionnel — `Home.tsx`

- Au montage du composant `Home` : lecture de `?ecole=` dans l'URL (via
  `URLSearchParams`), écriture en `localStorage` si présent, sinon lecture de la valeur
  déjà stockée.
- Si un code est disponible : requête Supabase (clé anon)
  `select apps_debloquees from portail_ecoles where code = <code>`. Si la requête échoue
  ou ne retourne rien (code inconnu), on traite comme "aucun accès débloqué" — jamais
  d'erreur bloquante pour l'utilisateur.
- Fonction `isUnlocked(app)` : `!app.gated || (unlockedAppIds?.includes(app.id) ?? false)`.
- `AppCard` : le style "grisé" existant (`opacity-50 grayscale pointer-events-none`,
  utilisé aujourd'hui pour le statut "bientôt disponible") est réutilisé pour les apps
  verrouillées.
- Ajout d'un bandeau non grisé en haut de la vignette verrouillée (même emplacement que
  le bandeau "En développement" actuel), affichant `🔒 {app.unlockHint}` — ce bandeau
  reste lisible car il n'hérite pas de l'opacité/grayscale appliqué au reste de la carte.

### 5. Interface d'administration — `/admin`

Route non liée dans la navigation (accès par URL directe uniquement).

**Authentification** : écran mot de passe unique. Le mot de passe n'est jamais comparé
côté client — chaque appel à l'API d'admin envoie le mot de passe saisi, qui est validé
côté serveur contre la variable d'environnement Vercel `ADMIN_PASSWORD`. Le mot de passe
est conservé en `sessionStorage` le temps de la session d'onglet, pour éviter de le
ressaisir à chaque action.

**Fonction serverless `api/admin-schools.js`** (Vercel Serverless Function, seule autorisée
à écrire dans `portail_ecoles` via `SUPABASE_SERVICE_ROLE_KEY` — jamais exposée côté
frontend) :

- `POST { action: 'list', password }` → retourne la liste des écoles (nom, code,
  apps_debloquees).
- `POST { action: 'create', password, nom }` → génère un `code` (slug du nom + suffixe
  aléatoire court pour garantir l'unicité), insère la ligne, retourne le code et le lien
  complet `https://portail-plai.vercel.app/?ecole=<code>`.
- `POST { action: 'update', password, code, apps_debloquees }` → met à jour la liste des
  apps débloquées pour l'école désignée par `code`.
- Toute requête dont le mot de passe ne correspond pas à `ADMIN_PASSWORD` retourne 401,
  sans détail sur la raison de l'échec.

**Interface `/admin`** :

- Écran de saisie du mot de passe.
- Une fois authentifié : liste des écoles existantes, chacune avec son nom, son lien
  complet (bouton "copier"), et une case à cocher par app marquée `gated: true` dans
  `apps.ts` (source de vérité pour la liste des apps affichées ici).
- Formulaire "+ Nouvelle école" (nom uniquement) → à la création, affiche immédiatement le
  lien généré à copier-coller et envoyer à l'école.
- Chaque modification de cases à cocher déclenche un appel `action: 'update'` (sauvegarde
  immédiate, pas de bouton "enregistrer" global à retenir).

## Variables d'environnement Vercel à ajouter

- `SUPABASE_SERVICE_ROLE_KEY` (serveur uniquement — jamais dans le frontend)
- `ADMIN_PASSWORD` (serveur uniquement)
- `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` si pas déjà présentes (nécessaires côté
  client pour la lecture publique des accès débloqués)

## Tests / vérification

- `npx vite build` doit passer avant tout push (règle du projet).
- Test manuel : lien avec code inconnu → apps gated grisées avec message. Lien avec code
  connu et une app débloquée → cette app s'affiche normalement, les autres apps gated
  restent grisées. Admin : création d'école, cochage/décochage d'une app, vérification
  immédiate sur le portail (avec le lien généré) que le changement est pris en compte.
- Vérifier que `vercel dev` (pas `vite dev` seul) est utilisé pour tester la route
  `/api/admin-schools.js` en local.
