# Guide des droits (Espace Parents) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `/parents/droits` — a single page explaining parents' rights and concrete accommodation procedures in Wallonia-Brussels education (from the UN CRPD to the FWB decree of Dec 7, 2017), reusing the Espace Parents pattern (FALC toggle, individualization banner, no-login, no exit links).

**Architecture:** One new page (`GuideDroits.tsx`) reading from a new data file (`guideDroits.ts`) with a page-level (not per-section) FALC toggle. A 10th card is added to the existing `ParentsHome.tsx` grid, visually distinct from the 9 trouble fiches. Routing follows the existing `/parents/*` pattern already wired in `App.tsx` and already excluded from Navbar exit links via `isParentsZone`.

**Tech Stack:** React 19, React Router 7, TypeScript, Tailwind CSS 3 (same as the rest of portail-plai, no new dependencies).

Design reference: [`docs/superpowers/specs/2026-07-28-guide-droits-parents-design.md`](../specs/2026-07-28-guide-droits-parents-design.md)

Legal sources were verified via real web research for this plan (UN CRPD official text, the FWB decree of 7 December 2017 via `etaamb.openjustice.be`, and the territorial poles page via `pactepourunenseignementdexcellence.cfwb.be`) — not fabricated, not from general memory. See design spec §2 for full citations.

---

### Task 1: Content types

**Files:**
- Modify: `src/types/index.ts`

- [ ] **Step 1: Append the `GuideDroits` types**

Append at the end of `src/types/index.ts` (after the existing `ParentFiche` type):

```ts

export type GuideSection = {
  id: string;
  titre: string;
  clair: string;
  falc: string;
};

export type SourceOfficielle = {
  citation: string;
  url: string;
  note?: string;
};

export type GuideDroits = {
  sections: GuideSection[];
  sources: SourceOfficielle[];
};
```

- [ ] **Step 2: Verify the project still type-checks**

Run: `npx tsc -b --noEmit` (from `projets/portail-plai`)
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/types/index.ts
git commit -m "feat(parents): add GuideDroits content types"
```

---

### Task 2: `guideDroits.ts` data file

**Files:**
- Create: `src/data/guideDroits.ts`

- [ ] **Step 1: Create the file with the 5 sections, sources, and avertissement constant**

```ts
import type { GuideDroits } from '../types';

export const AVERTISSEMENT_DROITS =
  "Ce guide n'est pas un conseil juridique personnalisé. Les textes cités peuvent évoluer (circulaires mises à jour chaque année) — vérifiez la version en vigueur auprès de votre école ou du Pôle territorial. La voie du dialogue avec la direction et le CPMS reste toujours à privilégier, même quand un recours formel est possible : c'est ce qui sert le mieux votre enfant.";

const guideDroits: GuideDroits = {
  sections: [
    {
      id: 'cadre-international',
      titre: "Le droit à l'éducation inclusive",
      clair:
        "La Convention relative aux droits des personnes handicapées, adoptée par l'ONU et ratifiée par la Belgique, reconnaît explicitement le droit de tout enfant à l'éducation. Son article 24 précise que les États doivent faire en sorte que le système éducatif « pourvoie à l'insertion scolaire à tous les niveaux ». Ce n'est pas une option laissée à la discrétion de chaque école : c'est un engagement international que la Belgique a signé.",
      falc:
        "L'ONU a écrit un texte sur les droits des personnes handicapées. La Belgique a signé ce texte. Ce texte dit que chaque enfant a droit à l'école. Il dit aussi que l'école doit accueillir tous les enfants. Ce n'est pas un choix de l'école. C'est une règle internationale.",
    },
    {
      id: 'cadre-fwb',
      titre: 'Ce que dit la loi en Fédération Wallonie-Bruxelles',
      clair:
        "En Fédération Wallonie-Bruxelles, le décret du 7 décembre 2017 met ce droit en pratique. Il définit un « aménagement raisonnable » comme une mesure adaptée aux besoins concrets de votre enfant (article 2), sauf si elle représente une charge disproportionnée pour l'école. Tout élève de l'enseignement ordinaire qui présente des besoins spécifiques a le droit d'en bénéficier, tant que sa situation ne rend pas indispensable un enseignement spécialisé (article 102/1 §1). Quand l'aménagement est pédagogique, il doit s'inscrire dans un Plan Individualisé d'Apprentissage, ou PIA (article 102/1 §6) — un document qui précise concrètement ce qui est mis en place pour votre enfant.",
      falc:
        "En Fédération Wallonie-Bruxelles, une loi de 2017 explique comment appliquer ce droit. Un « aménagement raisonnable » est une aide adaptée à votre enfant. L'école doit le mettre en place. Sauf si c'est vraiment trop difficile pour elle. Chaque élève avec des besoins spécifiques a droit à cette aide. Le PIA est un document qui écrit cette aide noir sur blanc.",
    },
    {
      id: 'qui-fait-quoi',
      titre: 'Qui fait quoi',
      clair:
        "La direction de l'école prend la décision finale sur les aménagements matériels et organisationnels. Le Centre PMS (CPMS) a une vision plus large et suit votre enfant sur la durée — il peut aussi jouer un rôle d'interface entre vous et l'école en cas de désaccord. Le Pôle territorial est une équipe pluridisciplinaire (enseignants, éducateurs, logopèdes, kinésithérapeutes...) qui accompagne l'école — et donc indirectement votre enfant — pour que les aménagements se mettent en place concrètement, sans obliger l'enfant à quitter l'enseignement ordinaire.",
      falc:
        "La direction de l'école décide des aménagements matériels et d'organisation. Le CPMS suit votre enfant sur plusieurs années. Il peut aider si vous n'êtes pas d'accord avec l'école. Le Pôle territorial est une équipe de plusieurs métiers. Elle aide l'école à mettre en place les aménagements. Votre enfant peut rester dans une école ordinaire.",
    },
    {
      id: 'comment-demander',
      titre: 'Comment demander un aménagement',
      clair:
        "La demande passe par une réunion de concertation, organisée par la direction de l'école, réunissant le conseil de classe (ou ses représentants), le CPMS, et vous en tant que parent (ou votre enfant lui-même s'il est majeur). Cette réunion aboutit à un protocole d'aménagements raisonnables, qui décrit concrètement ce qui sera mis en place. Le Pôle territorial peut accompagner cette étape si l'école le sollicite.",
      falc:
        "Vous pouvez demander une réunion. La direction organise cette réunion. Le CPMS et l'école y participent. Vous participez aussi. Cette réunion écrit un document. Ce document dit ce que l'école va faire pour votre enfant.",
    },
    {
      id: 'en-cas-de-desaccord',
      titre: 'En cas de désaccord',
      clair:
        "Avant tout recours formel, le dialogue direct avec la direction et le CPMS reste la meilleure option — même quand la loi vous donne raison, une solution négociée sert mieux votre enfant qu'une procédure longue. Si le dialogue n'aboutit vraiment pas, une conciliation peut être demandée dans le mois qui suit la demande initiale. Si elle échoue à son tour, un recours est possible devant la Commission de l'enseignement obligatoire inclusif, dans les 10 jours ouvrables suivant la décision de conciliation. La Commission doit statuer dans les 30 jours calendrier (ou au plus tard le 31 juillet si le recours est introduit après le 1er juin). Une décision favorable de la Commission s'impose à l'école.",
      falc:
        "D'abord, parlez avec la direction et le CPMS. C'est souvent la meilleure solution pour votre enfant. Si ça ne marche pas, vous pouvez demander une conciliation. Vous avez un mois pour le faire. Si ça ne marche toujours pas, vous pouvez faire un recours. Vous avez 10 jours ouvrables pour le faire. Une commission doit répondre dans les 30 jours. Si la commission vous donne raison, l'école doit suivre sa décision.",
    },
  ],
  sources: [
    {
      citation: 'Convention relative aux droits des personnes handicapées (ONU), article 24',
      url: 'https://www.un.org/development/desa/disabilities-fr/la-convention-en-bref-2/texte-integral-de-la-convention-relative-aux-droits-des-personnes-handicapees-23.html',
    },
    {
      citation:
        "Décret du 7 décembre 2017 relatif à l'accueil, à l'accompagnement et au maintien dans l'enseignement ordinaire fondamental et secondaire des élèves présentant des besoins spécifiques — articles 2, 102/1, 102/2",
      url: 'https://etaamb.openjustice.be/fr/decret-du-07-decembre-2017_n2018010181.html',
      note: 'Vérifier la version consolidée en vigueur — un décret peut être modifié par des textes ultérieurs.',
    },
    {
      citation: "Les pôles territoriaux pour une école inclusive — Pacte pour un Enseignement d'excellence",
      url: 'https://pactepourunenseignementdexcellence.cfwb.be/mesures/des-poles-territoriaux-pour-une-ecole-inclusive/',
    },
  ],
};

export default guideDroits;
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc -b --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/guideDroits.ts
git commit -m "feat(parents): add guideDroits content (5 sections, official sources)"
```

---

### Task 3: `GuideDroits.tsx` page component

**Files:**
- Create: `src/pages/GuideDroits.tsx`

- [ ] **Step 1: Write the component**

```tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import guideDroits, { AVERTISSEMENT_DROITS } from '../data/guideDroits';
import { BANDEAU_INDIVIDUALISATION } from '../data/parentsFiches';

export default function GuideDroits() {
  const [falc, setFalc] = useState(false);

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between gap-4 mb-4">
        <Link to="/parents" className="text-sm font-medium text-[#134e4a] hover:underline">
          ← Espace Parents
        </Link>
        <button
          onClick={() => setFalc(v => !v)}
          aria-pressed={falc}
          className={`text-sm font-semibold px-4 py-2 rounded-full border transition ${
            falc ? 'bg-[#134e4a] text-white border-[#134e4a]' : 'bg-white text-[#134e4a] border-[#134e4a]'
          }`}
        >
          🔤 Version FALC {falc ? '(activée)' : ''}
        </button>
      </div>

      <h1 className="text-3xl font-bold text-[#134e4a] mb-3">⚖️ Le guide des droits</h1>

      <div className="text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 mb-8">
        {BANDEAU_INDIVIDUALISATION}
      </div>

      {guideDroits.sections.map(section => (
        <div key={section.id} id={section.id} className="mb-8">
          <h2 className="text-xl font-bold text-[#134e4a] mb-2">{section.titre}</h2>
          <p className="text-lg leading-relaxed text-gray-800">{falc ? section.falc : section.clair}</p>
        </div>
      ))}

      <div className="text-sm text-amber-900 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-8">
        {AVERTISSEMENT_DROITS}
      </div>

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
    </div>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc -b --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/GuideDroits.tsx
git commit -m "feat(parents): add GuideDroits page with page-level FALC toggle"
```

---

### Task 4: Add the Guide des droits card to `ParentsHome.tsx`

**Files:**
- Modify: `src/pages/ParentsHome.tsx`

- [ ] **Step 1: Add a 10th, visually distinct card after the fiches grid**

Current file (`src/pages/ParentsHome.tsx`):

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

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc -b --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/ParentsHome.tsx
git commit -m "feat(parents): add Guide des droits card to ParentsHome"
```

---

### Task 5: Routing

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Add the `/parents/droits` route**

Current relevant lines (`src/App.tsx`):

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BoussoleChat from './components/BoussoleChat';
import Home from './pages/Home';
import VoixActif from './pages/VoixActif';
import ParentsHome from './pages/ParentsHome';
import ParentsFiche from './pages/ParentsFiche';

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

**Important:** `/parents/droits` must be declared BEFORE `/parents/:troubleId` in the plan's route list above — but note React Router v7 matches routes by specificity regardless of declaration order within a flat `<Routes>` block (confirmed during the previous chantier's review), so this ordering is for readability, not functional necessity. Do not skip adding the route just because order "shouldn't matter" — both routes must be present.

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc -b --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "feat(parents): wire /parents/droits route"
```

---

### Task 6: Full build and manual verification

**Files:** none (verification only)

- [ ] **Step 1: Full production build**

Run: `npx vite build` (from `projets/portail-plai`)
Expected: build succeeds with no TypeScript or bundler errors.

- [ ] **Step 2: Manual walkthrough in dev server**

Run: `npm run dev`, open the printed local URL.

Check:
- `/parents` shows the 9 trouble cards plus a 10th, visually distinct amber card "⚖️ Le guide des droits".
- Clicking it loads `/parents/droits`: back link, FALC toggle, title, individualization banner, 5 sections in order (cadre-international, cadre-fwb, qui-fait-quoi, comment-demander, en-cas-de-desaccord), amber avertissement box, and a "Sources officielles" list with 3 working external links (each opens in a new tab).
- Clicking "Version FALC" swaps the text of all 5 sections at once (page-level toggle, not per-section) without a page reload.
- Confirm the Navbar on `/parents/droits` still has no exit links (no "Applications Pédagogiques", "Guides", "VoixActif") — same restriction as the rest of the Espace Parents, already enforced globally in `Navbar.tsx`.
- Confirm Copernic (🧭 chat bubble) is still absent on `/parents/droits` (already enforced globally in `BoussoleChat.tsx` via the `/parents` path prefix check).
- Confirm the rest of the portal (`/`, `/voixactif`, existing `/parents/:troubleId` fiches) still renders unaffected.

- [ ] **Step 3: Commit if any fixups were needed during the walkthrough**

```bash
git add -A
git commit -m "fix(parents): address issues found in manual verification"
```

(Skip this step if no fixups were needed.)
