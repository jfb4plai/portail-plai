# Ateliers pour parents Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `/parents/ateliers` to portail-plai, presenting Atelier Dyslexie and Atelier Maya to parents with a home-alone framing and reflection questions, and lightly adapt both external apps to recognize a `?public=parent` URL flag that swaps a handful of teacher-specific strings to audience-neutral ones.

**Architecture:** New page + data file in portail-plai (same pattern as `GuideDroits.tsx`/`guideDroits.ts`: page-level FALC toggle, static content, individualization banner, browser-translate tip). Two small, isolated edits in two separate external repos (`atelier-dyslexie-plai`, `atelier-maya`), each a single-file static HTML app — no build step, no framework, changes are ids added to existing elements plus a small conditional script block.

**Tech Stack:** portail-plai: React 19, TypeScript, Tailwind CSS 3 (no new dependencies). External apps: vanilla JS, no dependencies, no build step.

Design reference: [`docs/superpowers/specs/2026-07-28-ateliers-parents-design.md`](../specs/2026-07-28-ateliers-parents-design.md)

**Repo note:** this plan spans 3 separate git repositories on disk:
- `C:\Users\jfbeg\OneDrive\claude-workspace\projets\portail-plai` (Tasks 1-5)
- `C:\Users\jfbeg\OneDrive\claude-workspace\projets\atelier-dyslexie-plai` (Task 6)
- `C:\Users\jfbeg\OneDrive\claude-workspace\projets\atelier-maya` (Task 7)

Tasks 1-5 happen on a portail-plai feature branch, per this project's usual workflow. Tasks 6-7 are small, isolated, single-purpose diffs on each external app's own `main` branch directly (no feature branch — these are tiny, fully-reviewed changes to apps that don't share portail-plai's branch history) — push each only after explicit confirmation, same as every other push in this project.

---

### Task 1: `AtelierParent` type

**Files:**
- Modify: `src/types/index.ts`

- [ ] **Step 1: Append the type**

Append at the end of `src/types/index.ts` (after `LangueDecodeur`):

```ts

export type AtelierParent = {
  id: string;
  emoji: string;
  titre: string;
  description: string;
  url: string;
  questions: {
    clair: string;
    falc: string;
  };
};
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc -b --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/types/index.ts
git commit -m "feat(parents): add AtelierParent type"
```

---

### Task 2: `ateliersParents.ts` data file

**Files:**
- Create: `src/data/ateliersParents.ts`

- [ ] **Step 1: Create the file**

```ts
import type { AtelierParent } from '../types';

export const INTRO_ATELIERS = {
  clair:
    "Vivre soi-même, quelques minutes, ce que peut vivre un enfant porteur d'un trouble d'apprentissage change souvent plus le regard qu'une explication théorique. Ces deux ateliers, conçus au départ pour les enseignants, sont ouverts aux parents : essayez-les seul, à votre rythme, chez vous.",
  falc:
    "Essayer soi-même, quelques minutes, aide à comprendre son enfant. Ces deux ateliers étaient prévus pour les enseignants. Vous pouvez les essayer aussi. Seul, chez vous, à votre rythme.",
};

const ateliersParents: AtelierParent[] = [
  {
    id: 'dyslexie',
    emoji: '🧠',
    titre: 'Atelier Dyslexie',
    description: "Vivez de l'intérieur la lecture dyslexique : mélange de lettres, décalages, confusions b/d/p/q.",
    url: 'https://atelier-dyslexie-plai.vercel.app/?public=parent',
    questions: {
      clair:
        "Qu'avez-vous ressenti en essayant de lire ce texte déformé ? Beaucoup de parents décrivent de la fatigue, de la frustration, parfois de l'anxiété — c'est exactement ce que peut ressentir votre enfant face à un texte scolaire ordinaire. Qu'est-ce que ça change dans votre regard sur le temps qu'il met à faire ses devoirs de lecture ?",
      falc:
        "Comment vous êtes-vous senti en lisant ce texte difficile ? Fatigué ? Frustré ? C'est peut-être ce que ressent votre enfant à l'école. Ça change quelque chose dans votre regard sur ses devoirs ?",
    },
  },
  {
    id: 'maya',
    emoji: '🏺',
    titre: 'Atelier Maya',
    description: 'Placez des chiffres mayas sur une droite graduée, chronomètre en marche — vivez la désorientation numérique.',
    url: 'https://atelier-maya.vercel.app/?public=parent',
    questions: {
      clair:
        "Qu'avez-vous ressenti face à ces chiffres mayas, avec le chronomètre qui tourne ? Beaucoup de parents décrivent un stress qui empêche de réfléchir clairement — c'est le mécanisme même de l'anxiété mathématique que peut vivre un enfant dyscalculique face à un exercice chronométré. Qu'est-ce que ça change dans votre regard sur la pression du temps lors des devoirs de mathématiques ?",
      falc:
        "Comment vous êtes-vous senti avec le chronomètre qui tourne ? Stressé ? C'est peut-être ce que ressent votre enfant en maths. Ça change quelque chose dans votre regard sur la pression du temps pendant les devoirs ?",
    },
  },
];

export default ateliersParents;
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc -b --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/data/ateliersParents.ts
git commit -m "feat(parents): add ateliersParents content"
```

---

### Task 3: `AteliersParents.tsx` page component

**Files:**
- Create: `src/pages/AteliersParents.tsx`

- [ ] **Step 1: Write the component**

```tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ateliersParents, { INTRO_ATELIERS } from '../data/ateliersParents';
import { BANDEAU_INDIVIDUALISATION } from '../data/parentsFiches';
import TipTraductionNavigateur from '../components/TipTraductionNavigateur';

export default function AteliersParents() {
  const [falc, setFalc] = useState(false);

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between gap-4 mb-4">
        <Link to="/parents" className="text-sm font-medium text-[#134e4a] hover:underline">
          ← Espace Parents
        </Link>
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

      <h1 className="text-3xl font-bold text-[#134e4a] mb-3">🎭 Les ateliers</h1>

      <div className="text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 mb-6">
        {BANDEAU_INDIVIDUALISATION}
      </div>

      <p className="text-lg leading-relaxed text-gray-800 mb-10">
        {falc ? INTRO_ATELIERS.falc : INTRO_ATELIERS.clair}
      </p>

      {ateliersParents.map((atelier) => (
        <div key={atelier.id} className="mb-10 border border-gray-200 rounded-xl p-5">
          <h2 className="text-xl font-bold text-[#134e4a] mb-2">
            {atelier.emoji} {atelier.titre}
          </h2>
          <p className="text-base text-gray-700 mb-4">{atelier.description}</p>
          <a
            href={atelier.url}
            target="_blank"
            rel="noreferrer"
            className="inline-block rounded-lg px-5 py-2.5 text-white font-semibold text-sm mb-4"
            style={{ backgroundColor: '#134e4a' }}
          >
            Essayer l'atelier ↗
          </a>
          <div className="text-sm font-bold text-[#f97316] uppercase tracking-wide mb-2 mt-4">
            Après l'avoir essayé
          </div>
          <p className="text-lg leading-relaxed text-gray-800">
            {falc ? atelier.questions.falc : atelier.questions.clair}
          </p>
        </div>
      ))}

      <TipTraductionNavigateur />
    </div>
  );
}
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc -b --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/pages/AteliersParents.tsx
git commit -m "feat(parents): add AteliersParents page"
```

---

### Task 4: Add the Ateliers card to `ParentsHome.tsx`

**Files:**
- Modify: `src/pages/ParentsHome.tsx`

- [ ] **Step 1: Add a 3rd card to the second grid**

Current file (`src/pages/ParentsHome.tsx`, after the Décodeur chantier):

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

Replace with (adds a 3rd card, switching that grid to 3 columns on `sm:` and up):

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

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
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
        <Link
          to="/parents/ateliers"
          className="flex items-center gap-3 bg-purple-50 border border-purple-200 rounded-xl px-5 py-4 text-lg font-semibold text-purple-900 hover:bg-purple-100 transition"
        >
          <span className="text-2xl">🎭</span>
          Les ateliers
        </Link>
      </div>

      <TipTraductionNavigateur />
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
git commit -m "feat(parents): add Ateliers card to ParentsHome"
```

---

### Task 5: Routing

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Add the `/parents/ateliers` route**

Current relevant content (`src/App.tsx`, after the Décodeur chantier):

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
import AteliersParents from './pages/AteliersParents';

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
            <Route path="/parents/ateliers" element={<AteliersParents />} />
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
git commit -m "feat(parents): wire /parents/ateliers route"
```

---

### Task 6: `?public=parent` mode in `atelier-dyslexie-plai`

**Files (different repo):**
- Modify: `C:\Users\jfbeg\OneDrive\claude-workspace\projets\atelier-dyslexie-plai\index.html`

- [ ] **Step 1: Add an id to the header subtitle**

Current (`index.html:434`):

```html
        <p>Simulateur de perception · Outil de sensibilisation pour enseignants</p>
```

Replace with:

```html
        <p id="header-subtitle">Simulateur de perception · Outil de sensibilisation pour enseignants</p>
```

- [ ] **Step 2: Wrap the audience phrase in the scientific note**

Current (`index.html:595`):

```html
                <strong>Muneaux, Ducrot &amp; Bastien-Toniazzo (2014)</strong> — ces confusions sont d'origine phonologique, non visuelle : la dyslexie traduit une difficulté à associer graphème et phonème, pas une inversion visuelle des lettres. La simulation reste pédagogiquement valide pour développer l'empathie des enseignants envers les élèves porteurs de ce trouble.
```

Replace with:

```html
                <strong>Muneaux, Ducrot &amp; Bastien-Toniazzo (2014)</strong> — ces confusions sont d'origine phonologique, non visuelle : la dyslexie traduit une difficulté à associer graphème et phonème, pas une inversion visuelle des lettres. La simulation reste pédagogiquement valide pour développer l'empathie <span id="sci-note-audience">des enseignants </span>envers les élèves porteurs de ce trouble.
```

(Note the trailing space inside the `<span>`, before the closing tag — when the span's content is cleared in Step 3, the sentence must read "l'empathie envers les élèves" with exactly one space, not zero or two.)

- [ ] **Step 3: Add the mode-parent script at the end of the existing `<script>` block**

Current end of file (`index.html`, last lines):

```html
// ── Init ──────────────────────────────────────────────────────────────────
updateDisplay();
</script>
</body>
</html>
```

Replace with:

```html
// ── Init ──────────────────────────────────────────────────────────────────
updateDisplay();

// ── Mode parent (?public=parent) ────────────────────────────────────────
if (new URLSearchParams(location.search).get('public') === 'parent') {
    const subtitle = document.getElementById('header-subtitle');
    if (subtitle) subtitle.textContent = 'Simulateur de perception · Vivez ce que peut vivre votre enfant';
    const audience = document.getElementById('sci-note-audience');
    if (audience) audience.textContent = '';
}
</script>
</body>
</html>
```

- [ ] **Step 4: Manual verification (this is a static HTML file, no build step — open it directly)**

Open the file in a browser two ways and compare:
- `file:///C:/Users/jfbeg/OneDrive/claude-workspace/projets/atelier-dyslexie-plai/index.html` (no param) — header must still read "Simulateur de perception · Outil de sensibilisation pour enseignants", unchanged from before this change (no regression for the existing teacher-facing usage).
- `file:///C:/Users/jfbeg/OneDrive/claude-workspace/projets/atelier-dyslexie-plai/index.html?public=parent` — header must read "Simulateur de perception · Vivez ce que peut vivre votre enfant", and the scientific note under "Confusions b/d/p/q" must read "...développer l'empathie envers les élèves porteurs de ce trouble." (no "des enseignants", no double space).

- [ ] **Step 5: Commit (do not push yet — ask before pushing, per this project's rules)**

```bash
git add index.html
git commit -m "feat: ajoute le mode parent (?public=parent)"
```

---

### Task 7: `?public=parent` mode in `atelier-maya`

**Files (different repo):**
- Modify: `C:\Users\jfbeg\OneDrive\claude-workspace\projets\atelier-maya\index.html`

- [ ] **Step 1: Add ids to the 3 config-screen elements to change**

Current (`index.html:179-180`):

```html
      <div class="cfg-h1">⚙️ Configuration — Animateur</div>
      <div class="cfg-sub">Paramétrez l'activité avant de la projeter pour les participants</div>
```

Replace with:

```html
      <div class="cfg-h1" id="cfg-h1">⚙️ Configuration — Animateur</div>
      <div class="cfg-sub" id="cfg-sub">Paramétrez l'activité avant de la projeter pour les participants</div>
```

Current (`index.html:219`):

```html
        <label class="lbl">Code session <small>(optionnel — regroupe les résultats d'une même formation)</small></label>
```

Replace with:

```html
        <label class="lbl">Code session <small id="code-hint">(optionnel — regroupe les résultats d'une même formation)</small></label>
```

**Why these 3, beyond the 2 strings the design doc listed for this file:** `cfg-sub`'s "avant de la projeter pour les participants" is directly adjacent to `cfg-h1`'s "Configuration — Animateur" — leaving it unchanged while retitling the section above it would read inconsistently for a parent using the tool alone. Same audience-neutral goal as the design's listed strings, just caught while reading the exact surrounding markup.

- [ ] **Step 2: Add the `PUBLIC_PARENT` flag and apply it, near the top of the existing `<script>` block**

Current (`index.html:284`):

```html
<script>
```

Replace with:

```html
<script>
const PUBLIC_PARENT = new URLSearchParams(location.search).get('public') === 'parent';
if (PUBLIC_PARENT) {
  document.getElementById('cfg-h1').textContent = '⚙️ Configuration';
  document.getElementById('cfg-sub').textContent = "Paramétrez l'activité avant de l'essayer";
  document.getElementById('code-hint').textContent = '(optionnel — regroupe plusieurs essais)';
}
```

- [ ] **Step 3: Make the results-screen scientific note audience-neutral in parent mode**

Current (`index.html:738`):

```js
    <p>L'anxiété mathématique « envahit la mémoire de travail et laisse peu de place à l'activité cognitive réelle » — un cercle vicieux que le chronomètre visible permet de faire vivre aux enseignants. <cite>Favodon &amp; Wasielewski (2025). <em>Le jeu mathématique comme outil évaluatif pour réduire l'anxiété des élèves.</em></cite> [RISS : dumas-05241399]</p>
```

Replace with:

```js
    <p>L'anxiété mathématique « envahit la mémoire de travail et laisse peu de place à l'activité cognitive réelle » — un cercle vicieux que le chronomètre visible permet de faire vivre ${PUBLIC_PARENT ? "à qui l'essaie" : 'aux enseignants'}. <cite>Favodon &amp; Wasielewski (2025). <em>Le jeu mathématique comme outil évaluatif pour réduire l'anxiété des élèves.</em></cite> [RISS : dumas-05241399]</p>
```

- [ ] **Step 4: Manual verification (static HTML, open directly in a browser)**

Open both ways and compare:
- `file:///C:/Users/jfbeg/OneDrive/claude-workspace/projets/atelier-maya/index.html` (no param) — config screen must still read "⚙️ Configuration — Animateur" / "Paramétrez l'activité avant de la projeter pour les participants" / "(optionnel — regroupe les résultats d'une même formation)", unchanged (no regression for existing teacher-facing usage). Run through one activity to the results screen and confirm the scientific note still says "...permet de faire vivre aux enseignants."
- `file:///C:/Users/jfbeg/OneDrive/claude-workspace/projets/atelier-maya/index.html?public=parent` — config screen must read "⚙️ Configuration" / "Paramétrez l'activité avant de l'essayer" / "(optionnel — regroupe plusieurs essais)". Run through one activity and confirm the results-screen note reads "...permet de faire vivre à qui l'essaie."

- [ ] **Step 5: Commit (do not push yet — ask before pushing, per this project's rules)**

```bash
git add index.html
git commit -m "feat: ajoute le mode parent (?public=parent)"
```

---

### Task 8: Final build and manual verification (portail-plai)

**Files:** none (verification only)

- [ ] **Step 1: Full production build**

Run (from `projets/portail-plai`): `npx vite build`
Expected: build succeeds, no errors.

- [ ] **Step 2: Manual walkthrough in dev server**

Run: `npm run dev`, open the printed local URL.

Check:
- `/parents` shows the 3rd card "🎭 Les ateliers" (purple), alongside the amber and blue cards, in a 3-column row on desktop.
- `/parents/ateliers`: back link, FALC toggle, individualization banner, intro paragraph, both atelier blocks (title, description, "Essayer l'atelier ↗" button opening in a new tab, reflection question). Toggling FALC swaps both the intro and both reflection questions at once.
- Confirm no Navbar exit links and no Copernic on `/parents/ateliers` (inherited automatically via the existing `/parents` prefix checks in `Navbar.tsx` / `BoussoleChat.tsx` — verify it held true, don't just assume).
- Confirm the rest of the portal is unaffected.

- [ ] **Step 3: Commit any fixups**

```bash
git add -A
git commit -m "fix(parents): address issues found in manual verification"
```

(Skip if no fixups were needed.)
