# Décodeur PIA/bulletin Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `/parents/decodeur` — a page where a parent pastes an excerpt of a PIA, bulletin, or school report and gets it translated into clear language + FALC via Claude Haiku, with strict RGPD safeguards (mandatory checkbox, no server-side persistence, single-shot request, no chat history).

**Architecture:** One new page (`DecodeurPia.tsx`) calling one new serverless function (`api/decodeur.ts`), built on the exact pattern already proven in production by `api/boussole.ts` (Anthropic client, `output_config.format` for structured JSON, dynamic `import()` with `.js` extension for cross-referencing `src/data/*.ts` content from `api/*.ts` — required on this Vercel project, see Task 2 note). An 11th card is added to `ParentsHome.tsx`.

**Tech Stack:** React 19, React Router 7, TypeScript, Tailwind CSS 3, `@anthropic-ai/sdk` (already a dependency, already used by `api/boussole.ts` and `api/reformuler.js` — no new dependency, no new secret, reuses the existing `ANTHROPIC_API_KEY`).

Design reference: [`docs/superpowers/specs/2026-07-28-decodeur-pia-parents-design.md`](../specs/2026-07-28-decodeur-pia-parents-design.md)

**Critical project rule (from this repo's CLAUDE.md):** `vite dev` alone does NOT run `/api/*` routes. All manual verification of `/api/decodeur` MUST use `vercel dev`, not `npm run dev` / `vite`. Task 6 reflects this.

---

### Task 1: Response type

**Files:**
- Modify: `src/types/index.ts`

- [ ] **Step 1: Append the `DecodeurResponse` type**

Append at the end of `src/types/index.ts` (after the `GuideDroits` type from the previous chantier):

```ts

export type DecodeurResponse = {
  clair: string;
  falc: string;
};
```

- [ ] **Step 2: Verify the project still type-checks**

Run: `npx tsc -b --noEmit` (from `projets/portail-plai`)
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/types/index.ts
git commit -m "feat(parents): add DecodeurResponse type"
```

---

### Task 2: `api/decodeur.ts` serverless function

**Files:**
- Create: `api/decodeur.ts`

- [ ] **Step 1: Write the function**

```ts
// api/decodeur.ts — Décodeur PIA/bulletin, traducteur pour l'Espace Parents
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const MODEL = 'claude-haiku-4-5';
const MAX_INPUT_CHARS = 4000;

const RGPD_NOTE =
  "\n\n---\n🔒 Ceci n'est pas une interprétation officielle. En cas de doute, vérifiez avec l'enseignant ou le CPMS. Aucune donnée n'est conservée après cette réponse.";

let guideDroitsCache = null;
async function getGuideDroits() {
  if (!guideDroitsCache) {
    const mod = await import('../src/data/guideDroits.js');
    guideDroitsCache = mod.default;
  }
  return guideDroitsCache;
}

function buildGuideContext(guideDroits) {
  return guideDroits.sections.map((s) => `### ${s.titre}\n${s.clair}`).join('\n\n');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { texte } = req.body || {};
  if (typeof texte !== 'string' || !texte.trim()) {
    return res.status(400).json({ error: 'Paramètre texte requis.' });
  }
  if (texte.length > MAX_INPUT_CHARS) {
    return res.status(400).json({ error: `Texte trop long (max ${MAX_INPUT_CHARS} caractères).` });
  }

  try {
    const guideDroits = await getGuideDroits();

    const system = `Tu es le Décodeur, l'assistant de traduction de l'Espace Parents du portail PLAI. Un parent te soumet un extrait de PIA, de bulletin ou de rapport scolaire déjà rédigé par l'école. Ta tâche : le traduire en langage clair, puis en version FALC (Facile à Lire et à Comprendre), sans jamais inventer d'information absente du texte fourni.

Règles strictes :
- Ne jamais ajouter d'information ou d'interprétation qui ne figure pas explicitement dans le texte fourni.
- Ne jamais formuler de conseil juridique ni de recommandation médicale. Si le texte soulève une question de ce type, indique-le et renvoie vers le Guide des droits du portail (/parents/droits) et vers le dialogue avec l'enseignant ou le CPMS — jamais de réponse juridique ou médicale directe.
- Si un nom propre d'enfant apparaît dans le texte, ne jamais le répéter dans ta réponse — remplace-le par "l'enfant" ou "il/elle".
- Style direct, sans préambule ("Voici", "Bien sûr"), sans transition d'IA.
- La version FALC utilise des phrases courtes, une idée par phrase.

Contexte de référence — définitions déjà publiées sur le portail (reste cohérent avec elles) :
${buildGuideContext(guideDroits)}

Réponds UNIQUEMENT par un objet JSON strict, sans aucun texte autour :
{"clair": "...", "falc": "..."}`;

    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 800,
      system,
      messages: [{ role: 'user', content: texte }],
      output_config: {
        format: {
          type: 'json_schema',
          schema: {
            type: 'object',
            properties: {
              clair: { type: 'string' },
              falc: { type: 'string' },
            },
            required: ['clair', 'falc'],
            additionalProperties: false,
          },
        },
      },
    });

    const raw = response.content[0]?.text || '{}';
    const parsed = JSON.parse(raw);
    if (typeof parsed.clair !== 'string' || typeof parsed.falc !== 'string') {
      throw new Error('Réponse invalide.');
    }

    return res.status(200).json({
      clair: parsed.clair + RGPD_NOTE,
      falc: parsed.falc + RGPD_NOTE,
    });
  } catch (err) {
    return res.status(500).json({ error: 'Erreur lors de la traduction.' });
  }
}
```

**Why the dynamic `import('../src/data/guideDroits.js')` with a `.js` extension, not `.ts`:** this Vercel project has `"type": "module"` in `package.json`. A prior chantier on this same portal hit `FUNCTION_INVOCATION_FAILED` in production when an `api/*.ts` file imported a `src/*.ts` file without the `.js` extension — Node's ESM resolution requires the extension the compiled output will actually have, not the source extension. `api/boussole.ts` already does exactly this (`import('../src/data/apps.js')`) and works in production — this task copies that exact, already-validated pattern. Do not "fix" it to `.ts` even though the source file is `guideDroits.ts`.

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc -b --noEmit`
Expected: no errors. (Note: `api/*.ts` files are not part of the `tsc -b` project build in this repo — same as `api/boussole.ts` — so this step mainly guards `src/types/index.ts` and other `src/` files; a syntax-level check of `api/decodeur.ts` happens in Task 6 via `vercel dev`.)

- [ ] **Step 3: Commit**

```bash
git add api/decodeur.ts
git commit -m "feat(parents): add /api/decodeur serverless function"
```

---

### Task 3: `DecodeurPia.tsx` page component

**Files:**
- Create: `src/pages/DecodeurPia.tsx`

- [ ] **Step 1: Write the component**

```tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BANDEAU_INDIVIDUALISATION } from '../data/parentsFiches';
import type { DecodeurResponse } from '../types';

const MAX_INPUT_CHARS = 4000;

export default function DecodeurPia() {
  const [texte, setTexte] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [falc, setFalc] = useState(false);
  const [result, setResult] = useState<DecodeurResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tooLong = texte.length > MAX_INPUT_CHARS;
  const canSubmit = confirmed && texte.trim().length > 0 && !tooLong && !loading;

  async function traduire() {
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch('/api/decodeur', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texte }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur inconnue.');
      setResult({ clair: data.clair, falc: data.falc });
      setFalc(false);
    } catch {
      setError("Le Décodeur n'a pas pu traduire ce texte. Réessayez dans un instant.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="mb-4">
        <Link to="/parents" className="text-sm font-medium text-[#134e4a] hover:underline">
          ← Espace Parents
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-[#134e4a] mb-3">🔍 Le Décodeur PIA / bulletin</h1>

      <div className="text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 mb-6">
        {BANDEAU_INDIVIDUALISATION}
      </div>

      <div className="text-sm text-blue-900 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 mb-4">
        Collez un extrait de PIA, de bulletin ou de rapport scolaire ci-dessous. <strong>Remplacez le nom de votre enfant par « [enfant] »</strong> avant de coller le texte — rien n'est conservé après la traduction, mais mieux vaut ne jamais envoyer de nom réel.
      </div>

      <label htmlFor="decodeur-checkbox" className="flex items-start gap-2 mb-4 text-sm text-gray-700">
        <input
          id="decodeur-checkbox"
          type="checkbox"
          checked={confirmed}
          onChange={(e) => setConfirmed(e.target.checked)}
          className="mt-1"
        />
        J'ai retiré le nom de mon enfant du texte ci-dessous.
      </label>

      <label htmlFor="decodeur-textarea" className="sr-only">
        Texte à traduire
      </label>
      <textarea
        id="decodeur-textarea"
        value={texte}
        onChange={(e) => setTexte(e.target.value)}
        rows={8}
        placeholder="Ex. : L'élève bénéficie d'un aménagement raisonnable de type organisationnel prévoyant un tiers-temps supplémentaire lors des évaluations écrites…"
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#134e4a] mb-1"
      />
      <div className={`text-xs mb-4 ${tooLong ? 'text-red-600' : 'text-gray-400'}`}>
        {texte.length} / {MAX_INPUT_CHARS} caractères{tooLong ? ' — texte trop long' : ''}
      </div>

      <button
        onClick={traduire}
        disabled={!canSubmit}
        className="rounded-lg px-5 py-2.5 text-white font-semibold text-sm disabled:opacity-40 mb-8"
        style={{ backgroundColor: '#134e4a' }}
      >
        {loading ? 'Traduction en cours…' : 'Traduire'}
      </button>

      {error && <div className="text-sm text-red-600 mb-6">{error}</div>}

      {result && (
        <div>
          <div className="flex items-center justify-between gap-4 mb-3">
            <h2 className="text-xl font-bold text-[#134e4a]">Traduction</h2>
            <button
              onClick={() => setFalc((v) => !v)}
              aria-pressed={falc}
              className={`text-sm font-semibold px-4 py-2 rounded-full border transition ${
                falc ? 'bg-[#134e4a] text-white border-[#134e4a]' : 'bg-white text-[#134e4a] border-[#134e4a]'
              }`}
            >
              🔤 Version FALC {falc ? '(activée)' : ''}
            </button>
          </div>
          <p className="text-lg leading-relaxed text-gray-800 whitespace-pre-wrap">
            {falc ? result.falc : result.clair}
          </p>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc -b --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/DecodeurPia.tsx
git commit -m "feat(parents): add DecodeurPia page with mandatory RGPD checkbox"
```

---

### Task 4: Add the Décodeur card to `ParentsHome.tsx`

**Files:**
- Modify: `src/pages/ParentsHome.tsx`

- [ ] **Step 1: Add an 11th card, after the Guide des droits card**

Current file (`src/pages/ParentsHome.tsx`, after the previous chantier):

```tsx
import { Link } from 'react-router-dom';
import parentsFiches from '../data/parentsFiches';

export default function ParentsHome() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-[#134e4a] mb-2">Comprendre et accompagner votre enfant</h1>
      <p className="text-lg text-gray-600 mb-8">
        9 fiches claires, vérifiées à partir de la recherche scientifique francophone (corpus RISS).
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {parentsFiches.map(fiche => (
          <Link
            key={fiche.id}
            to={`/parents/${fiche.id}`}
            className="flex items-center gap-3 bg-[#f4fbf8] border border-[#d7ede4] rounded-xl px-5 py-4 text-lg font-semibold text-[#134e4a] hover:bg-[#e9f6f1] transition"
          >
            <span className="text-2xl">{fiche.emoji}</span>
            {fiche.titre}
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <Link
          to="/parents/droits"
          className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 text-lg font-semibold text-amber-900 hover:bg-amber-100 transition"
        >
          <span className="text-2xl">⚖️</span>
          Le guide des droits
        </Link>
      </div>
    </div>
  );
}
```

Replace with:

```tsx
import { Link } from 'react-router-dom';
import parentsFiches from '../data/parentsFiches';

export default function ParentsHome() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-[#134e4a] mb-2">Comprendre et accompagner votre enfant</h1>
      <p className="text-lg text-gray-600 mb-8">
        9 fiches claires, vérifiées à partir de la recherche scientifique francophone (corpus RISS).
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {parentsFiches.map(fiche => (
          <Link
            key={fiche.id}
            to={`/parents/${fiche.id}`}
            className="flex items-center gap-3 bg-[#f4fbf8] border border-[#d7ede4] rounded-xl px-5 py-4 text-lg font-semibold text-[#134e4a] hover:bg-[#e9f6f1] transition"
          >
            <span className="text-2xl">{fiche.emoji}</span>
            {fiche.titre}
          </Link>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          to="/parents/droits"
          className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 text-lg font-semibold text-amber-900 hover:bg-amber-100 transition"
        >
          <span className="text-2xl">⚖️</span>
          Le guide des droits
        </Link>
        <Link
          to="/parents/decodeur"
          className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-xl px-5 py-4 text-lg font-semibold text-blue-900 hover:bg-blue-100 transition"
        >
          <span className="text-2xl">🔍</span>
          Le Décodeur PIA / bulletin
        </Link>
      </div>
    </div>
  );
}
```

(Note: the amber card moves from a full-width `mt-8` block into a 2-column grid alongside the new blue card — this is an intentional layout change, not a mistake, so both non-fiche tools sit side by side.)

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc -b --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/ParentsHome.tsx
git commit -m "feat(parents): add Décodeur card to ParentsHome"
```

---

### Task 5: Routing

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Add the `/parents/decodeur` route**

Current relevant content (`src/App.tsx`, after the previous chantier):

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BoussoleChat from './components/BoussoleChat';
import Home from './pages/Home';
import VoixActif from './pages/VoixActif';
import ParentsHome from './pages/ParentsHome';
import ParentsFiche from './pages/ParentsFiche';
import GuideDroits from './pages/GuideDroits';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/voixactif" element={<VoixActif />} />
            <Route path="/parents" element={<ParentsHome />} />
            <Route path="/parents/droits" element={<GuideDroits />} />
            <Route path="/parents/:troubleId" element={<ParentsFiche />} />
          </Routes>
        </div>
        <Footer />
        <BoussoleChat />
      </div>
    </BrowserRouter>
  );
}
```

Replace with:

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BoussoleChat from './components/BoussoleChat';
import Home from './pages/Home';
import VoixActif from './pages/VoixActif';
import ParentsHome from './pages/ParentsHome';
import ParentsFiche from './pages/ParentsFiche';
import GuideDroits from './pages/GuideDroits';
import DecodeurPia from './pages/DecodeurPia';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/voixactif" element={<VoixActif />} />
            <Route path="/parents" element={<ParentsHome />} />
            <Route path="/parents/droits" element={<GuideDroits />} />
            <Route path="/parents/decodeur" element={<DecodeurPia />} />
            <Route path="/parents/:troubleId" element={<ParentsFiche />} />
          </Routes>
        </div>
        <Footer />
        <BoussoleChat />
      </div>
    </BrowserRouter>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc -b --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "feat(parents): wire /parents/decodeur route"
```

---

### Task 6: Full build and manual verification (via `vercel dev`)

**Files:** none (verification only)

- [ ] **Step 1: Full production build**

Run: `npx vite build` (from `projets/portail-plai`)
Expected: build succeeds with no TypeScript or bundler errors.

- [ ] **Step 2: Start `vercel dev`, not `vite dev`**

Run: `vercel dev` (from `projets/portail-plai`)
Expected: server starts and serves both the frontend and `/api/*` routes. If prompted to link the project, confirm the existing linked project rather than creating a new one. If `ANTHROPIC_API_KEY` is not present locally, run `vercel env pull` first, then restart `vercel dev`.

- [ ] **Step 3: Manual walkthrough**

Open the local `vercel dev` URL and check:
- `/parents` shows the 11th card "🔍 Le Décodeur PIA / bulletin" (blue), next to the amber Guide des droits card, both in a 2-column row.
- Clicking it loads `/parents/decodeur`: back link, individualization banner, blue RGPD instruction banner, checkbox, textarea with character counter, "Traduire" button.
- "Traduire" is disabled while the checkbox is unchecked, even with text in the textarea.
- Check the checkbox, paste a short **fictional, non-sensitive** test excerpt (e.g. "L'élève bénéficie d'un tiers-temps supplémentaire lors des évaluations écrites, ainsi que d'un accès aux notes de cours en format numérique.") — do NOT use any real child's data — and click "Traduire".
- Confirm a real response comes back from `/api/decodeur` (not a client-side mock) with both `clair` and `falc` text, and that the "🔤 Version FALC" toggle swaps between them.
- Confirm the RGPD note appears at the end of the displayed text.
- Paste text exceeding 4000 characters (e.g. repeat a sentence) and confirm the counter turns red and the button stays disabled before any network call is made.
- Confirm the Navbar has no exit links and Copernic is absent on `/parents/decodeur` (inherited automatically from `Navbar.tsx`'s and `BoussoleChat.tsx`'s existing `/parents` prefix checks — verify it held true, don't just assume).
- Confirm the rest of the portal (`/`, `/voixactif`, `/parents/:troubleId` fiches, `/parents/droits`) still renders unaffected.

- [ ] **Step 4: Commit if any fixups were needed during the walkthrough**

```bash
git add -A
git commit -m "fix(parents): address issues found in manual verification"
```

(Skip this step if no fixups were needed.)
