# Accès conditionnel par école — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Permettre de verrouiller certaines vignettes du portail par école (débloquées uniquement après sensibilisation), avec activation à distance via une interface d'admin protégée par mot de passe — sans toucher au portail en production tant que la solution n'est pas validée.

**Architecture:** Table Supabase `portail_ecoles` (code → liste d'apps débloquées), lue côté client (clé anon, lecture publique) pour griser les vignettes correspondantes ; écrite exclusivement via une fonction serverless Vercel qui vérifie un mot de passe côté serveur et utilise la clé service role. Tout le travail se fait sur une branche dédiée, déployée en preview Vercel — `main` n'est pas touché.

**Tech Stack:** React 19 + Vite 8 + TypeScript, react-router-dom v7, `@supabase/supabase-js`, Vercel Serverless Functions.

**Note sur les tests :** ce projet n'a aucun framework de test installé (pas de vitest/jest, aucun fichier `*.test.*`) — c'est un site statique sans infrastructure de test existante. Conformément à la règle du projet ("suivre les patterns existants, ne pas restructurer unilatéralement"), ce plan n'introduit pas de framework de test. La vérification de chaque tâche se fait par `npx vite build` (compilation TypeScript stricte) et par des vérifications manuelles précises dans le navigateur / avec `vercel dev`, détaillées à chaque étape.

Spec source : [`docs/superpowers/specs/2026-08-19-acces-conditionnel-ecoles-design.md`](../specs/2026-08-19-acces-conditionnel-ecoles-design.md)

---

## File Structure

- Create: `supabase/001_portail_ecoles.sql` — schéma de la table + RLS
- Create: `src/lib/supabase.js` — client Supabase anon (frontend)
- Create: `src/lib/ecoleAccess.ts` — hook `useEcoleAccess` + helper `isAppUnlocked`
- Create: `api/admin-schools.js` — fonction serverless (liste/création/mise à jour des écoles, clé service role)
- Create: `src/pages/Admin.tsx` — interface d'admin (mot de passe, liste écoles, cases à cocher, création)
- Create: `.env.local.example` — modèle des variables d'environnement nécessaires en local
- Modify: `src/types/index.ts` — ajout de `gated?: boolean` et `unlockHint?: string` à `AppItem`
- Modify: `src/data/apps.ts` — marquage d'une app de test avec `gated: true` + `unlockHint`
- Modify: `src/pages/Home.tsx` — intégration du hook, bandeau de verrouillage, `muted` dynamique
- Modify: `src/App.tsx` — ajout de la route `/admin`
- Modify: `package.json` — ajout de la dépendance `@supabase/supabase-js`

---

## Task 0: Créer la branche de travail

**Files:** aucun

- [ ] **Step 1: Créer et basculer sur la branche dédiée**

```bash
git checkout -b feat/acces-conditionnel-ecoles
```

Expected: `Switched to a new branch 'feat/acces-conditionnel-ecoles'`

- [ ] **Step 2: Vérifier l'arbre propre avant de commencer**

```bash
git status --short
```

Expected: aucune sortie (rien à commiter).

---

## Task 1: Ajouter la dépendance Supabase

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Installer `@supabase/supabase-js`**

```bash
npm install @supabase/supabase-js
```

Expected: la commande se termine sans erreur, `package.json` et `package-lock.json` sont modifiés (nouvelle dépendance `@supabase/supabase-js` dans `dependencies`).

- [ ] **Step 2: Vérifier que le build passe toujours**

```bash
npx vite build
```

Expected: build réussi (aucune erreur TypeScript ni Vite).

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: ajoute @supabase/supabase-js"
```

---

## Task 2: Schéma Supabase — table `portail_ecoles`

**Files:**
- Create: `supabase/001_portail_ecoles.sql`

- [ ] **Step 1: Vérifier l'absence de conflit de nom de table**

```bash
grep -rl "portail_ecoles" ../*/supabase/ ../**/supabase/ 2>/dev/null
```

Expected: aucune sortie (nom de table encore inutilisé dans les autres apps du projet Supabase partagé).

- [ ] **Step 2: Écrire le fichier de migration**

```sql
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
```

- [ ] **Step 3: Exécuter le script dans le projet Supabase partagé `dfoaumjleqtxjeaplnna`**

Ouvrir Supabase Studio → SQL Editor → coller le contenu de `supabase/001_portail_ecoles.sql` → Run.

Expected : message de succès, table `portail_ecoles` visible dans Table Editor avec RLS activé et une seule policy `lecture publique` (select).

- [ ] **Step 4: Commit**

```bash
git add supabase/001_portail_ecoles.sql
git commit -m "feat: ajoute la table Supabase portail_ecoles"
```

---

## Task 3: Client Supabase côté frontend

**Files:**
- Create: `src/lib/supabase.js`
- Create: `.env.local.example`

- [ ] **Step 1: Écrire le client anon**

```js
// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Variables Supabase manquantes dans .env.local')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

- [ ] **Step 2: Documenter les variables d'environnement**

```bash
# .env.local.example
VITE_SUPABASE_URL=https://dfoaumjleqtxjeaplnna.supabase.co
VITE_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_PASSWORD=
```

- [ ] **Step 3: Créer le `.env.local` réel (non commité) avec les vraies valeurs**

Copier `.env.local.example` vers `.env.local`, remplir `VITE_SUPABASE_ANON_KEY` (Supabase Studio → Project Settings → API → `anon public`), `SUPABASE_SERVICE_ROLE_KEY` (même page → `service_role`, secret) et un `ADMIN_PASSWORD` de ton choix.

```bash
cp .env.local.example .env.local
```

Expected: `.env.local` n'apparaît pas dans `git status` (déjà ignoré par `.gitignore`).

- [ ] **Step 4: Vérifier que le build passe**

```bash
npx vite build
```

Expected: build réussi (le fichier `src/lib/supabase.js` n'est pas encore importé nulle part, donc pas d'erreur liée aux variables manquantes à ce stade).

- [ ] **Step 5: Commit**

```bash
git add src/lib/supabase.js .env.local.example
git commit -m "feat: ajoute le client Supabase frontend (lecture anon)"
```

---

## Task 4: Types `AppItem` — champs `gated` et `unlockHint`

**Files:**
- Modify: `src/types/index.ts:16-31`

- [ ] **Step 1: Ajouter les deux champs optionnels**

Dans `src/types/index.ts`, modifier le type `AppItem` :

```ts
export type AppItem = {
  id: string;
  name: string;
  description: string;
  url: string;
  emoji: string;
  category: string;
  audience?: Audience;
  status: AppStatus;
  color: string;
  section?: AppSection;
  browserNote?: string;
  devBanner?: boolean;   // affiche le bandeau "En développement" sur la vignette
  isNew?: boolean;       // affiche le badge "Nouveau" en orange PLAI
  gated?: boolean;       // fait partie du système de verrouillage par école
  unlockHint?: string;   // message affiché tant que l'app est verrouillée pour l'école courante
  guide?: GuideContent;
};
```

- [ ] **Step 2: Vérifier que le build passe**

```bash
npx vite build
```

Expected: build réussi.

- [ ] **Step 3: Commit**

```bash
git add src/types/index.ts
git commit -m "feat: ajoute gated et unlockHint au type AppItem"
```

---

## Task 5: Marquer une app de test comme `gated`

**Files:**
- Modify: `src/data/apps.ts:594-667` (entrée `atelier-dyslexie`)

- [ ] **Step 1: Ajouter `gated: true` et `unlockHint` à l'app `atelier-dyslexie`**

Dans `src/data/apps.ts`, sur l'entrée `id: 'atelier-dyslexie'` (ligne ~594), ajouter les deux champs juste après `status: 'disponible',` :

```ts
    status: 'disponible',
    gated: true,
    unlockHint: 'Disponible après la sensibilisation Atelier Dyslexie en présentiel.',
    color: 'purple',
```

Cette app sert de cas de test pour la suite du plan — Jean-François pourra ensuite choisir librement quelles apps marquer `gated: true` (et retirer ce marquage de test si besoin) une fois la fonctionnalité validée.

- [ ] **Step 2: Vérifier que le build passe**

```bash
npx vite build
```

Expected: build réussi.

- [ ] **Step 3: Commit**

```bash
git add src/data/apps.ts
git commit -m "test: marque Atelier Dyslexie comme app gated (fixture de test)"
```

---

## Task 6: Hook `useEcoleAccess`

**Files:**
- Create: `src/lib/ecoleAccess.ts`

- [ ] **Step 1: Écrire le hook et le helper**

```ts
// src/lib/ecoleAccess.ts
import { useEffect, useState } from 'react';
import { supabase } from './supabase.js';
import type { AppItem } from '../types';

const STORAGE_KEY = 'plai_ecole_code';

export function useEcoleAccess() {
  const [unlockedAppIds, setUnlockedAppIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get('ecole');
    if (fromUrl) {
      localStorage.setItem(STORAGE_KEY, fromUrl);
    }
    const code = fromUrl || localStorage.getItem(STORAGE_KEY);

    if (!code) {
      setLoading(false);
      return;
    }

    supabase
      .from('portail_ecoles')
      .select('apps_debloquees')
      .eq('code', code)
      .maybeSingle()
      .then(({ data, error }: { data: { apps_debloquees: string[] } | null; error: unknown }) => {
        setUnlockedAppIds(!error && data ? data.apps_debloquees ?? [] : []);
        setLoading(false);
      });
  }, []);

  return { unlockedAppIds, loading };
}

export function isAppUnlocked(app: AppItem, unlockedAppIds: string[]): boolean {
  return !app.gated || unlockedAppIds.includes(app.id);
}
```

- [ ] **Step 2: Vérifier que le build passe**

```bash
npx vite build
```

Expected: build réussi (le hook n'est pas encore utilisé, donc pas d'effet visible).

- [ ] **Step 3: Commit**

```bash
git add src/lib/ecoleAccess.ts
git commit -m "feat: ajoute le hook useEcoleAccess et isAppUnlocked"
```

---

## Task 7: Intégrer le verrouillage dans `Home.tsx`

**Files:**
- Modify: `src/pages/Home.tsx:1-20` (imports)
- Modify: `src/pages/Home.tsx:166-260` (`AppCard`)
- Modify: `src/pages/Home.tsx:264-400` (`Home`)

- [ ] **Step 1: Importer le hook et le helper**

En haut de `src/pages/Home.tsx`, ajouter à côté des imports existants :

```ts
import { useEcoleAccess, isAppUnlocked } from '../lib/ecoleAccess';
```

- [ ] **Step 2: Ajouter le bandeau de verrouillage dans `AppCard`**

Dans `AppCard` (`src/pages/Home.tsx:207-218`), le bloc d'ouverture actuel est :

```tsx
  return (
    <div className={`flex flex-col rounded-2xl border-2 ${c.border} ${c.bg} shadow-sm transition hover:shadow-md overflow-hidden ${muted ? 'opacity-50 grayscale pointer-events-none' : ''}`}>
      {app.isNew && (
        <div className="w-full text-xs font-bold text-center py-1 tracking-wide text-white" style={{ backgroundColor: '#FF3399' }}>
          Nouveau
        </div>
      )}
      {app.devBanner && !app.isNew && (
        <div className="w-full bg-amber-400 text-amber-900 text-xs font-bold text-center py-1 tracking-wide">
          En développement
        </div>
      )}
```

Le remplacer par (ajout du bandeau `🔒`, non affecté par `opacity-50 grayscale` car placé hors du conteneur grisé — nouveau wrapper `<div className="flex flex-col rounded-2xl overflow-hidden">` en plus autour du conteneur existant) :

```tsx
  const locked = Boolean(muted && app.gated && app.unlockHint);

  return (
    <div className="flex flex-col rounded-2xl overflow-hidden">
      {locked && (
        <div className="w-full bg-gray-700 text-white text-xs font-semibold text-center py-1.5 px-3 tracking-wide">
          🔒 {app.unlockHint}
        </div>
      )}
      <div className={`flex flex-col rounded-2xl border-2 ${c.border} ${c.bg} shadow-sm transition hover:shadow-md overflow-hidden ${muted ? 'opacity-50 grayscale pointer-events-none' : ''}`}>
        {app.isNew && (
          <div className="w-full text-xs font-bold text-center py-1 tracking-wide text-white" style={{ backgroundColor: '#FF3399' }}>
            Nouveau
          </div>
        )}
        {app.devBanner && !app.isNew && (
          <div className="w-full bg-amber-400 text-amber-900 text-xs font-bold text-center py-1 tracking-wide">
            En développement
          </div>
        )}
```

Note : tout le contenu entre ce bloc et la fin du composant (lignes `src/pages/Home.tsx:219-256`, la carte proprement dite : emoji, catégorie, titre, description, boutons) reste indenté d'un niveau supplémentaire mais **inchangé** — seul l'ajout d'un wrapper autour compte, pas de modification de son contenu.

La fin actuelle de `AppCard` (`src/pages/Home.tsx:256-260`) est :

```tsx
        </div>
      </div>
    </div>
  );
}
```

Ces 3 `</div>` ferment respectivement : le `div` des boutons (`flex gap-2`), le `div` de contenu (`flex flex-col flex-1 p-6`), et le `div` de carte (`rounded-2xl border-2 ...`). Avec le nouveau wrapper extérieur ajouté à l'étape précédente, il faut une 4e fermeture. Remplacer ce bloc par :

```tsx
        </div>
      </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Utiliser le hook dans `Home` et calculer `muted` dynamiquement**

Dans `export default function Home()` (`src/pages/Home.tsx:264-274`), ajouter l'appel au hook :

```tsx
export default function Home() {
  const [guideApp, setGuideApp] = useState<AppItem | null>(null);
  const { unlockedAppIds } = useEcoleAccess();

  const appItems    = apps.filter(a => (a.section ?? 'applications') === 'applications');
  const sensiItems  = apps.filter(a => a.section === 'sensibilisation');
  const claudeItems     = apps.filter(a => a.section === 'claude');
  const claudeCodeItems = apps.filter(a => a.section === 'claude-code');
  const iaItems         = apps.filter(a => a.section === 'ia');
  const utilItems   = apps.filter(a => a.section === 'utilitaires');
  const available   = appItems.filter(a => a.status === 'disponible' || a.status === 'en-développement');
  const coming      = appItems.filter(a => a.status === 'bientôt');
```

- [ ] **Step 4: Passer `muted` dynamique à chaque `AppCard` (hors section "Prochainement")**

Remplacer chacune des lignes suivantes dans `src/pages/Home.tsx` :

Ligne 295 :
```tsx
                <AppCard key={app.id} app={app} onGuide={setGuideApp} colorOverride="amber" />
```
devient :
```tsx
                <AppCard key={app.id} app={app} onGuide={setGuideApp} colorOverride="amber" muted={!isAppUnlocked(app, unlockedAppIds)} />
```

Ligne 311 :
```tsx
              <AppCard key={app.id} app={app} onGuide={setGuideApp} />
```
devient :
```tsx
              <AppCard key={app.id} app={app} onGuide={setGuideApp} muted={!isAppUnlocked(app, unlockedAppIds)} />
```

Ligne 344 :
```tsx
                <AppCard key={app.id} app={app} onGuide={setGuideApp} />
```
devient :
```tsx
                <AppCard key={app.id} app={app} onGuide={setGuideApp} muted={!isAppUnlocked(app, unlockedAppIds)} />
```

Ligne 361 :
```tsx
                <AppCard key={app.id} app={app} onGuide={setGuideApp} colorOverride="purple" />
```
devient :
```tsx
                <AppCard key={app.id} app={app} onGuide={setGuideApp} colorOverride="purple" muted={!isAppUnlocked(app, unlockedAppIds)} />
```

Ligne 378 :
```tsx
                <AppCard key={app.id} app={app} onGuide={setGuideApp} colorOverride="indigo" />
```
devient :
```tsx
                <AppCard key={app.id} app={app} onGuide={setGuideApp} colorOverride="indigo" muted={!isAppUnlocked(app, unlockedAppIds)} />
```

Ligne 395 :
```tsx
                <AppCard key={app.id} app={app} onGuide={setGuideApp} colorOverride="amber" />
```
devient :
```tsx
                <AppCard key={app.id} app={app} onGuide={setGuideApp} colorOverride="amber" muted={!isAppUnlocked(app, unlockedAppIds)} />
```

La ligne 327 (section "Prochainement", `muted` déjà à `true` en dur) reste inchangée — ce `muted` n'est pas lié au verrouillage par école.

- [ ] **Step 5: Vérifier que le build passe**

```bash
npx vite build
```

Expected: build réussi, aucune erreur de balise JSX non fermée.

- [ ] **Step 6: Vérification manuelle en local**

```bash
npm run dev
```

Ouvrir `http://localhost:5173/` (sans `?ecole=`) : la vignette "Atelier Dyslexie" (section Sensibilisation) doit apparaître grisée avec le bandeau `🔒 Disponible après la sensibilisation Atelier Dyslexie en présentiel.` en haut, et son bouton "Ouvrir" doit être inactif (le clic ne doit rien faire).

- [ ] **Step 7: Commit**

```bash
git add src/pages/Home.tsx
git commit -m "feat: grise les vignettes gated non débloquées avec message explicite"
```

---

## Task 8: Fonction serverless `api/admin-schools.js`

**Files:**
- Create: `api/admin-schools.js`

- [ ] **Step 1: Écrire la fonction**

```js
// api/admin-schools.js — Gestion des accès école pour le portail (CRUD sur portail_ecoles)
// Toute écriture nécessite ADMIN_PASSWORD (comparé côté serveur) et utilise la clé
// service role — jamais exposée au frontend.
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function slugify(nom) {
  return nom
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // retire les accents (é -> e, etc.)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function randomSuffix() {
  return Math.random().toString(36).slice(2, 6);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { action, password } = req.body || {};

  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Mot de passe incorrect.' });
  }

  try {
    if (action === 'list') {
      const { data, error } = await supabase
        .from('portail_ecoles')
        .select('code, nom, apps_debloquees')
        .order('nom', { ascending: true });
      if (error) throw error;
      return res.status(200).json({ ecoles: data });
    }

    if (action === 'create') {
      const { nom } = req.body || {};
      if (typeof nom !== 'string' || !nom.trim()) {
        return res.status(400).json({ error: 'Nom d\'école requis.' });
      }
      const code = `${slugify(nom)}-${randomSuffix()}`;
      const { data, error } = await supabase
        .from('portail_ecoles')
        .insert({ code, nom: nom.trim(), apps_debloquees: [] })
        .select('code, nom, apps_debloquees')
        .single();
      if (error) throw error;
      return res.status(200).json({
        ecole: data,
        lien: `https://portail-plai.vercel.app/?ecole=${data.code}`,
      });
    }

    if (action === 'update') {
      const { code, apps_debloquees } = req.body || {};
      if (typeof code !== 'string' || !Array.isArray(apps_debloquees)) {
        return res.status(400).json({ error: 'Paramètres invalides.' });
      }
      const { error } = await supabase
        .from('portail_ecoles')
        .update({ apps_debloquees })
        .eq('code', code);
      if (error) throw error;
      return res.status(200).json({ ok: true });
    }

    return res.status(400).json({ error: 'Action inconnue.' });
  } catch (err) {
    return res.status(500).json({ error: 'Erreur serveur.' });
  }
}
```

- [ ] **Step 2: Vérifier que le build passe**

```bash
npx vite build
```

Expected: build réussi (les fichiers `api/*.js` ne sont pas compilés par Vite, seulement par Vercel au déploiement — le build ne doit pas régresser).

- [ ] **Step 3: Commit**

```bash
git add api/admin-schools.js
git commit -m "feat: ajoute la fonction serverless admin-schools (CRUD écoles)"
```

---

## Task 9: Page d'administration `/admin`

**Files:**
- Create: `src/pages/Admin.tsx`
- Modify: `src/App.tsx:1-11` (imports), `src/App.tsx:19` (route)

- [ ] **Step 1: Écrire la page d'admin**

```tsx
// src/pages/Admin.tsx
import { useEffect, useState } from 'react';
import apps from '../data/apps';

type Ecole = { code: string; nom: string; apps_debloquees: string[] };

const gatedApps = apps.filter(a => a.gated);

async function callApi(body: Record<string, unknown>) {
  const res = await fetch('/api/admin-schools', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erreur inconnue.');
  return data;
}

export default function Admin() {
  const [password, setPassword] = useState(() => sessionStorage.getItem('plai_admin_password') || '');
  const [authed, setAuthed] = useState(false);
  const [ecoles, setEcoles] = useState<Ecole[]>([]);
  const [error, setError] = useState('');
  const [nouveauNom, setNouveauNom] = useState('');
  const [dernierLien, setDernierLien] = useState('');

  async function chargerEcoles(pwd: string) {
    setError('');
    try {
      const data = await callApi({ action: 'list', password: pwd });
      setEcoles(data.ecoles);
      setAuthed(true);
      sessionStorage.setItem('plai_admin_password', pwd);
    } catch (err) {
      setAuthed(false);
      setError((err as Error).message);
    }
  }

  useEffect(() => {
    if (password) chargerEcoles(password);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function toggleApp(ecole: Ecole, appId: string) {
    const apps_debloquees = ecole.apps_debloquees.includes(appId)
      ? ecole.apps_debloquees.filter(id => id !== appId)
      : [...ecole.apps_debloquees, appId];
    setEcoles(prev => prev.map(e => (e.code === ecole.code ? { ...e, apps_debloquees } : e)));
    try {
      await callApi({ action: 'update', password, code: ecole.code, apps_debloquees });
    } catch (err) {
      setError((err as Error).message);
      await chargerEcoles(password);
    }
  }

  async function creerEcole() {
    if (!nouveauNom.trim()) return;
    try {
      const data = await callApi({ action: 'create', password, nom: nouveauNom.trim() });
      setDernierLien(data.lien);
      setNouveauNom('');
      await chargerEcoles(password);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  if (!authed) {
    return (
      <main className="max-w-md mx-auto px-6 py-16">
        <h1 className="text-xl font-bold text-gray-800 mb-4">Administration — Accès écoles</h1>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Mot de passe"
          className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 mb-3"
        />
        <button
          onClick={() => chargerEcoles(password)}
          className="w-full bg-teal-600 text-white rounded-lg px-4 py-2 font-semibold"
        >
          Entrer
        </button>
        {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-xl font-bold text-gray-800 mb-6">Administration — Accès écoles</h1>
      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      <section className="mb-10 border-2 border-gray-200 rounded-xl p-4">
        <h2 className="font-semibold text-gray-700 mb-3">+ Nouvelle école</h2>
        <div className="flex gap-2">
          <input
            value={nouveauNom}
            onChange={e => setNouveauNom(e.target.value)}
            placeholder="Nom de l'école"
            className="flex-1 border-2 border-gray-300 rounded-lg px-3 py-2"
          />
          <button onClick={creerEcole} className="bg-teal-600 text-white rounded-lg px-4 py-2 font-semibold">
            Créer
          </button>
        </div>
        {dernierLien && (
          <p className="text-sm text-gray-600 mt-3">
            Lien à envoyer : <code className="bg-gray-100 px-2 py-1 rounded">{dernierLien}</code>
          </p>
        )}
      </section>

      <div className="space-y-6">
        {ecoles.map(ecole => (
          <div key={ecole.code} className="border-2 border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800">{ecole.nom}</h3>
              <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                https://portail-plai.vercel.app/?ecole={ecole.code}
              </code>
            </div>
            <div className="flex flex-wrap gap-3">
              {gatedApps.map(app => (
                <label key={app.id} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={ecole.apps_debloquees.includes(app.id)}
                    onChange={() => toggleApp(ecole, app.id)}
                  />
                  {app.emoji} {app.name}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Ajouter la route dans `App.tsx`**

Dans `src/App.tsx`, ajouter l'import :

```tsx
import Admin from './pages/Admin';
```

Et ajouter la route (à la suite des routes existantes, avant la fermeture `</Routes>`) :

```tsx
            <Route path="/admin" element={<Admin />} />
```

- [ ] **Step 3: Vérifier que le build passe**

```bash
npx vite build
```

Expected: build réussi.

- [ ] **Step 4: Commit**

```bash
git add src/pages/Admin.tsx src/App.tsx
git commit -m "feat: ajoute l'interface d'admin /admin"
```

---

## Task 10: Vérification end-to-end en local avec `vercel dev`

**Files:** aucun (vérification uniquement)

- [ ] **Step 1: Lancer l'environnement complet**

```bash
vercel dev
```

Expected: le serveur démarre et sert à la fois le frontend Vite et les fonctions `/api/*`.

- [ ] **Step 2: Créer une école de test via `/admin`**

Ouvrir `http://localhost:3000/admin`, saisir le mot de passe défini dans `.env.local`, créer une école "École Test". Vérifier que le lien généré apparaît (`?ecole=ecole-test-xxxx`).

- [ ] **Step 3: Débloquer l'app de test**

Cocher "Atelier Dyslexie" pour "École Test" dans l'admin.

- [ ] **Step 4: Vérifier le déblocage côté portail**

Ouvrir le lien généré (`http://localhost:3000/?ecole=ecole-test-xxxx`) dans un nouvel onglet (ou navigation privée). Vérifier que la vignette "Atelier Dyslexie" s'affiche normalement (pas grisée, bouton actif).

- [ ] **Step 5: Vérifier le comportement sans code reconnu**

Ouvrir `http://localhost:3000/` en navigation privée (sans `?ecole=`). Vérifier que "Atelier Dyslexie" est grisée avec le bandeau `🔒`.

- [ ] **Step 6: Vérifier la persistance du code école**

Toujours dans l'onglet ouvert avec `?ecole=ecole-test-xxxx` (étape 4), naviguer vers `http://localhost:3000/` sans le paramètre. Vérifier que "Atelier Dyslexie" reste débloquée (le code a été mémorisé en `localStorage`).

- [ ] **Step 7: Revenir en arrière et vérifier le reverrouillage**

Toujours dans l'admin, décocher "Atelier Dyslexie" pour "École Test". Recharger l'onglet du portail avec le code de cette école. Vérifier que la vignette redevient grisée.

Aucun commit pour cette tâche — vérification uniquement.

---

## Task 11: Déployer en preview Vercel et configurer les variables d'environnement

**Files:** aucun (configuration Vercel + push)

- [ ] **Step 1: Pousser la branche**

```bash
git push -u origin feat/acces-conditionnel-ecoles
```

Expected: Vercel détecte la branche et crée un déploiement preview (si l'intégration GitHub est active sur ce repo) — noter l'URL de preview affichée.

- [ ] **Step 2: Configurer les variables d'environnement pour l'environnement Preview**

Dans le dashboard Vercel du projet `portail-plai` → Settings → Environment Variables, ajouter pour l'environnement **Preview** (pas seulement Production) :
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ADMIN_PASSWORD`

- [ ] **Step 3: Redéclencher le déploiement preview si nécessaire**

Si les variables ont été ajoutées après le premier déploiement preview, redéployer (Vercel dashboard → Deployments → le déploiement de la branche → "Redeploy").

- [ ] **Step 4: Refaire la vérification end-to-end (Task 10) sur l'URL de preview**

Répéter les étapes 2 à 7 de la Task 10 en remplaçant `http://localhost:3000` par l'URL de preview Vercel.

Expected: comportement identique à la vérification locale. La branche `main` / le portail en production (`portail-plai.vercel.app`) n'a reçu aucune modification à ce stade.

Aucun commit pour cette tâche.

---

## Self-Review Notes

- **Couverture de la spec** : identification par lien+code (Task 6/7), table Supabase avec RLS lecture publique / écriture bloquée (Task 2), champs `gated`/`unlockHint` en code (Task 4/5), bandeau explicite sur vignette grisée (Task 7), comportement par défaut sans code reconnu (Task 7 Step 6, vérifié Task 10 Step 5), admin avec mot de passe vérifié côté serveur (Task 8/9), création d'école + lien généré (Task 9), déploiement preview sans toucher `main` (Task 0, Task 11) — tout couvert.
- **Cohérence des types** : `isAppUnlocked(app: AppItem, unlockedAppIds: string[])` défini en Task 6, utilisé identiquement en Task 7 ; `Ecole` type utilisé de façon cohérente dans `Admin.tsx`.
- **Pas de placeholder** : chaque étape contient le code complet à écrire, aucun TODO.
