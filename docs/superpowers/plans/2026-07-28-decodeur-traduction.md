# Traduction du Décodeur + rappel FALC + astuce navigateur Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a 4-language translation option (turc/arabe/albanais/ukrainien) to the already-decoded result on `/parents/decodeur`, fix the missing FALC disclaimer on that same page, and add a shared "your browser can translate this page" tip to all 4 Espace Parents pages.

**Architecture:** One new serverless function (`api/decodeur-langue.ts`, simpler sibling of `api/decodeur.ts` — plain text output, no `guideDroits` grounding needed), one new shared component (`TipTraductionNavigateur.tsx`), modifications to `DecodeurPia.tsx` (translation UI + FALC disclaimer) and to all 4 Espace Parents pages (tip placement).

**Tech Stack:** React 19, TypeScript, Tailwind CSS 3, `@anthropic-ai/sdk` (already a dependency, reuses `ANTHROPIC_API_KEY`, no new secret).

Design reference: [`docs/superpowers/specs/2026-07-28-decodeur-traduction-design.md`](../specs/2026-07-28-decodeur-traduction-design.md)

**Verification note carried over from the previous chantier:** local `vercel dev` cannot exercise `/api/*` end-to-end on this project (pre-existing ESM import-resolution limitation, confirmed not a regression). Task 6 verifies everything that's testable via `vite build`/`vite dev`, and flags the live translation round-trip for manual confirmation in production after merge — same pattern the user already validated for the decode feature itself.

---

### Task 1: `LangueDecodeur` type

**Files:**
- Modify: `src/types/index.ts`

- [ ] **Step 1: Append the type**

Append at the end of `src/types/index.ts` (after `DecodeurResponse`):

```ts

export type LangueDecodeur = 'turc' | 'arabe' | 'albanais' | 'ukrainien';
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc -b --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/types/index.ts
git commit -m "feat(parents): add LangueDecodeur type"
```

---

### Task 2: `api/decodeur-langue.ts` serverless function

**Files:**
- Create: `api/decodeur-langue.ts`

- [ ] **Step 1: Write the function**

```ts
// api/decodeur-langue.ts — Traduction du texte déjà décodé, pour l'Espace Parents
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const MODEL = 'claude-haiku-4-5';
const MAX_INPUT_CHARS = 4000;

const LANGUES = {
  turc: 'turc',
  arabe: 'arabe',
  albanais: 'albanais',
  ukrainien: 'ukrainien',
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { texte, langue } = req.body || {};
  if (typeof texte !== 'string' || !texte.trim()) {
    return res.status(400).json({ error: 'Paramètre texte requis.' });
  }
  if (texte.length > MAX_INPUT_CHARS) {
    return res.status(400).json({ error: `Texte trop long (max ${MAX_INPUT_CHARS} caractères).` });
  }
  if (typeof langue !== 'string' || !LANGUES[langue]) {
    return res.status(400).json({ error: 'Langue non prise en charge.' });
  }

  const system = `Tu traduis un texte déjà rédigé en français clair vers le ${LANGUES[langue]}, pour un parent d'élève en Fédération Wallonie-Bruxelles. Traduis fidèlement, sans ajouter ni retirer d'information. Réponds uniquement par la traduction, sans aucun texte autour, sans préambule.`;

  try {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 800,
      system,
      messages: [{ role: 'user', content: texte }],
    });

    const traduction = response.content[0]?.text || '';
    if (!traduction) throw new Error('Réponse vide.');

    return res.status(200).json({ traduction });
  } catch (err) {
    return res.status(500).json({ error: 'Erreur lors de la traduction.' });
  }
}
```

**Why `langue` is validated against a closed dictionary (`LANGUES`), not interpolated directly from the request body:** the value flows into the system prompt (`vers le ${LANGUES[langue]}`). Looking it up in a fixed dictionary and rejecting anything not in it (400 response) prevents a client from injecting arbitrary text into the system prompt via the `langue` field — same defensive pattern as `reformuler.js`'s `validateChamps` against `ALLOWED_CHAMPS` elsewhere in this `api/` folder.

**Why no `guideDroits` grounding here, unlike `api/decodeur.ts`:** this endpoint only translates text that was already produced (and already vetted against `guideDroits`) by `/api/decodeur` — it never sees the raw pasted PIA text. A pure translation task doesn't need the PIA/rights context.

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc -b --noEmit`
Expected: no errors (same note as the previous chantier: `api/*.ts` isn't part of the `tsc -b` project build, this mainly guards `src/` files).

- [ ] **Step 3: Commit**

```bash
git add api/decodeur-langue.ts
git commit -m "feat(parents): add /api/decodeur-langue translation endpoint"
```

---

### Task 3: Wire the translation UI into `DecodeurPia.tsx`

**Files:**
- Modify: `src/pages/DecodeurPia.tsx`

- [ ] **Step 1: Replace the full file**

Current file (`src/pages/DecodeurPia.tsx`, after the "Décoder" wording fix):

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

  async function decoder() {
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
      setError("Le Décodeur n'a pas pu décoder ce texte. Réessayez dans un instant.");
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
        Collez un extrait de PIA, de bulletin ou de rapport scolaire ci-dessous. <strong>Remplacez le nom de votre enfant par « [enfant] »</strong> avant de coller le texte — rien n'est conservé après le décodage, mais mieux vaut ne jamais envoyer de nom réel.
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
        Texte à décoder
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
        onClick={decoder}
        disabled={!canSubmit}
        className="rounded-lg px-5 py-2.5 text-white font-semibold text-sm disabled:opacity-40 mb-8"
        style={{ backgroundColor: '#134e4a' }}
      >
        {loading ? 'Décodage en cours…' : 'Décoder'}
      </button>

      {error && <div className="text-sm text-red-600 mb-6">{error}</div>}

      {result && (
        <div>
          <div className="flex items-center justify-between gap-4 mb-3">
            <h2 className="text-xl font-bold text-[#134e4a]">Décodage</h2>
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

Replace with:

```tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BANDEAU_INDIVIDUALISATION, FALC_DISCLAIMER } from '../data/parentsFiches';
import type { DecodeurResponse, LangueDecodeur } from '../types';

const MAX_INPUT_CHARS = 4000;

const LANGUES_DECODEUR: { id: LangueDecodeur; label: string }[] = [
  { id: 'turc', label: 'Türkçe' },
  { id: 'arabe', label: 'العربية' },
  { id: 'albanais', label: 'Shqip' },
  { id: 'ukrainien', label: 'Українська' },
];

export default function DecodeurPia() {
  const [texte, setTexte] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [falc, setFalc] = useState(false);
  const [result, setResult] = useState<DecodeurResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [langue, setLangue] = useState<LangueDecodeur | null>(null);
  const [traduction, setTraduction] = useState<string | null>(null);
  const [translating, setTranslating] = useState(false);
  const [translateError, setTranslateError] = useState<string | null>(null);

  const tooLong = texte.length > MAX_INPUT_CHARS;
  const canSubmit = confirmed && texte.trim().length > 0 && !tooLong && !loading;

  async function decoder() {
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setLangue(null);
    setTraduction(null);
    setTranslateError(null);
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
      setError("Le Décodeur n'a pas pu décoder ce texte. Réessayez dans un instant.");
    } finally {
      setLoading(false);
    }
  }

  async function traduireEn(cible: LangueDecodeur) {
    if (!result || translating) return;
    setLangue(cible);
    setTranslating(true);
    setTranslateError(null);
    setTraduction(null);
    try {
      const texteAffiche = falc ? result.falc : result.clair;
      const res = await fetch('/api/decodeur-langue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texte: texteAffiche, langue: cible }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur inconnue.');
      setTraduction(data.traduction);
    } catch {
      setTranslateError("La traduction n'a pas pu aboutir. Réessayez dans un instant.");
    } finally {
      setTranslating(false);
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
        Collez un extrait de PIA, de bulletin ou de rapport scolaire ci-dessous. <strong>Remplacez le nom de votre enfant par « [enfant] »</strong> avant de coller le texte — rien n'est conservé après le décodage, mais mieux vaut ne jamais envoyer de nom réel.
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
        Texte à décoder
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
        onClick={decoder}
        disabled={!canSubmit}
        className="rounded-lg px-5 py-2.5 text-white font-semibold text-sm disabled:opacity-40 mb-8"
        style={{ backgroundColor: '#134e4a' }}
      >
        {loading ? 'Décodage en cours…' : 'Décoder'}
      </button>

      {error && <div className="text-sm text-red-600 mb-6">{error}</div>}

      {result && (
        <div>
          <div className="flex items-center justify-between gap-4 mb-3">
            <h2 className="text-xl font-bold text-[#134e4a]">Décodage</h2>
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
          <p className="text-lg leading-relaxed text-gray-800 whitespace-pre-wrap mb-2">
            {falc ? result.falc : result.clair}
          </p>
          <div className="text-xs text-gray-500 mb-6">{FALC_DISCLAIMER}</div>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-sm text-gray-600 mr-1">Traduire en :</span>
            {LANGUES_DECODEUR.map((l) => (
              <button
                key={l.id}
                onClick={() => traduireEn(l.id)}
                disabled={translating}
                className={`text-sm font-semibold px-4 py-2 rounded-full border transition disabled:opacity-40 ${
                  langue === l.id ? 'bg-[#134e4a] text-white border-[#134e4a]' : 'bg-white text-[#134e4a] border-[#134e4a]'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          {translating && <div className="text-sm text-gray-500 mb-6">Traduction en cours…</div>}
          {translateError && <div className="text-sm text-red-600 mb-6">{translateError}</div>}

          {traduction && !translating && (
            <p className="text-lg leading-relaxed text-gray-800 whitespace-pre-wrap mb-8" dir="auto">
              {traduction}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
```

**Note on `dir="auto"`:** the translated paragraph gets `dir="auto"` so the browser detects right-to-left script (Arabic) automatically and renders it correctly, without needing to hardcode direction per language.

**Note on resetting translation state in `decoder()`:** `setLangue(null)`, `setTraduction(null)`, `setTranslateError(null)` are added to the start of `decoder()` so that decoding a new text clears any stale translation from a previous decode — otherwise a leftover Turkish translation could stay on screen next to a brand-new, unrelated decoded result.

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc -b --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/DecodeurPia.tsx
git commit -m "feat(parents): add language translation and FALC disclaimer to DecodeurPia"
```

---

### Task 4: `TipTraductionNavigateur` shared component

**Files:**
- Create: `src/components/TipTraductionNavigateur.tsx`

- [ ] **Step 1: Write the component**

```tsx
export default function TipTraductionNavigateur() {
  return (
    <div className="text-xs text-gray-500 border-t border-gray-200 pt-4 mt-8">
      💡 Votre navigateur (Chrome, Edge…) peut traduire cette page entière dans votre langue : clic droit sur la page → « Traduire en… », ou l'icône de traduction dans la barre d'adresse.
    </div>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc -b --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/TipTraductionNavigateur.tsx
git commit -m "feat(parents): add TipTraductionNavigateur shared component"
```

---

### Task 5: Render the tip on all 4 Espace Parents pages

**Files:**
- Modify: `src/pages/ParentsHome.tsx`
- Modify: `src/pages/ParentsFiche.tsx`
- Modify: `src/pages/GuideDroits.tsx`
- Modify: `src/pages/DecodeurPia.tsx`

- [ ] **Step 1: `ParentsHome.tsx`**

Current file:

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

Replace with (adds the import and the tip before the closing `</div>`):

```tsx
import { Link } from 'react-router-dom';
import parentsFiches from '../data/parentsFiches';
import TipTraductionNavigateur from '../components/TipTraductionNavigateur';

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

      <TipTraductionNavigateur />
    </div>
  );
}
```

- [ ] **Step 2: `ParentsFiche.tsx`**

Current relevant end of file:

```tsx
import { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import parentsFiches, { BANDEAU_INDIVIDUALISATION, FALC_DISCLAIMER } from '../data/parentsFiches';

export default function ParentsFiche() {
```

... (rest of the file unchanged down to) ...

```tsx
      <div className="border-t border-gray-200 pt-4 mt-8">
        <div className="text-xs text-gray-500 mb-2">{FALC_DISCLAIMER}</div>
        <div className="text-xs font-semibold text-gray-400 uppercase mb-1">Sources (corpus RISS)</div>
        <ul className="text-xs text-gray-500 space-y-1">
          {fiche.sources.map(s => (
            <li key={s.id}>{s.citation}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

Apply these two edits:

1. Add the import at the top, after the existing `parentsFiches` import line:

```tsx
import { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import parentsFiches, { BANDEAU_INDIVIDUALISATION, FALC_DISCLAIMER } from '../data/parentsFiches';
import TipTraductionNavigateur from '../components/TipTraductionNavigateur';
```

2. Add `<TipTraductionNavigateur />` right before the final closing `</div>` (after the sources `<ul>`'s closing `</div>`, still inside the root container):

```tsx
      <div className="border-t border-gray-200 pt-4 mt-8">
        <div className="text-xs text-gray-500 mb-2">{FALC_DISCLAIMER}</div>
        <div className="text-xs font-semibold text-gray-400 uppercase mb-1">Sources (corpus RISS)</div>
        <ul className="text-xs text-gray-500 space-y-1">
          {fiche.sources.map(s => (
            <li key={s.id}>{s.citation}</li>
          ))}
        </ul>
      </div>

      <TipTraductionNavigateur />
    </div>
  );
}
```

- [ ] **Step 3: `GuideDroits.tsx`**

Apply the same two-part edit:

1. Add the import after the existing imports:

```tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import guideDroits, { AVERTISSEMENT_DROITS } from '../data/guideDroits';
import { BANDEAU_INDIVIDUALISATION } from '../data/parentsFiches';
import TipTraductionNavigateur from '../components/TipTraductionNavigateur';
```

2. Add `<TipTraductionNavigateur />` right before the final closing `</div>`:

```tsx
      <div className="border-t border-gray-200 pt-4">
        <div className="text-xs font-semibold text-gray-400 uppercase mb-1">Sources officielles</div>
        <ul className="text-xs text-gray-500 space-y-1">
          {guideDroits.sources.map(s => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noreferrer" className="underline hover:text-gray-700">
                {s.citation}
              </a>
              {s.note ? ` — ${s.note}` : ''}
            </li>
          ))}
        </ul>
      </div>

      <TipTraductionNavigateur />
    </div>
  );
}
```

- [ ] **Step 4: `DecodeurPia.tsx`**

Apply the same two-part edit on top of Task 3's version of this file:

1. Add the import after the existing imports (after `import type { DecodeurResponse, LangueDecodeur } from '../types';`):

```tsx
import TipTraductionNavigateur from '../components/TipTraductionNavigateur';
```

2. Add `<TipTraductionNavigateur />` right before the final closing `</div>` — i.e. immediately after the `{result && ( ... )}` block's closing `)}`, still inside the root container:

```tsx
      )}

      <TipTraductionNavigateur />
    </div>
  );
}
```

- [ ] **Step 5: Verify it compiles**

Run: `npx tsc -b --noEmit`
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add src/pages/ParentsHome.tsx src/pages/ParentsFiche.tsx src/pages/GuideDroits.tsx src/pages/DecodeurPia.tsx
git commit -m "feat(parents): render TipTraductionNavigateur on all Espace Parents pages"
```

---

### Task 6: Build and manual verification

**Files:** none (verification only)

- [ ] **Step 1: Full production build**

Run: `npx vite build` (from `projets/portail-plai`)
Expected: build succeeds with no TypeScript or bundler errors.

- [ ] **Step 2: Manual walkthrough in dev server (`npm run dev`, plain Vite — no live API needed for these checks)**

Check:
- `/parents`, each `/parents/:troubleId` fiche, `/parents/droits`, and `/parents/decodeur` all show the "💡 Votre navigateur…" tip at the bottom of the page.
- On `/parents/decodeur`, before any decode happens, no language buttons and no FALC-disclaimer line are visible (they're inside the `{result && (...)}` block).
- `npx tsc -b --noEmit` stays clean throughout.

- [ ] **Step 3: Live API verification (requires a real decode result — do this after deploying, in production, same approach the user already used to validate the decode feature itself)**

On `https://portail-plai.vercel.app/parents/decodeur`: check the RGPD box, paste a short fictional (non-real-child) excerpt, click "Décoder". Once a result appears, confirm:
- The FALC disclaimer line appears under the decoded text.
- 4 language buttons appear (Türkçe / العربية / Shqip / Українська), each labeled in its own language/script.
- Clicking one shows "Traduction en cours…", then a translated paragraph appears below the French text (French text stays visible, not replaced).
- Clicking a different language button replaces the previous translation, doesn't stack multiple translations.
- Decoding a new (second) text clears any previous translation and language selection.

- [ ] **Step 4: Commit if any fixups were needed**

```bash
git add -A
git commit -m "fix(parents): address issues found in manual verification"
```

(Skip this step if no fixups were needed.)
