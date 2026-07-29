# Révision pédagogique des fiches + Décodeur Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the targeted pedagogical revisions from the design doc to `src/data/parentsFiches.ts` (9 fiches: 2 jargon glosses, 1 concrete scene, 9 closing "hope" sentences) and add one instruction line to `api/decodeur.ts`'s system prompt.

**Architecture:** All edits are string replacements within the two existing files already in production — no new files, no new types, no structural changes. Every edit either appends a sentence to an existing `commentAider.clair`/`.falc` string or replaces a `ceQueCaChange.clair` string with a version that glosses one term and/or adds a concrete scene. `sources` arrays are never touched (no new scientific claims introduced — this is wording clarity, not new content).

**Tech Stack:** No new dependencies. Plain TypeScript string edits.

Design reference: [`docs/superpowers/specs/2026-07-28-revision-pedagogique-fiches-design.md`](../specs/2026-07-28-revision-pedagogique-fiches-design.md)

---

### Task 1: Dyslexie + Dyscalculie

**Files:**
- Modify: `src/data/parentsFiches.ts`

- [ ] **Step 1: Dyslexie — append closing sentence to `commentAider`**

Find (inside the `dyslexie` entry, `commentAider.clair`):

```ts
      clair:
        "Adapter la police (sans empattement, bien espacée), augmenter la taille du texte et l'interligne facilite la lecture. La synthèse vocale permet de séparer la compréhension du décodage — votre enfant peut comprendre une histoire complexe même s'il ne peut pas encore la lire seul. Valorisez ce qu'il comprend à l'oral, pas seulement ce qu'il déchiffre à l'écrit.",
      falc:
        "Utilisez une police simple et un texte plus grand. Utilisez la lecture à voix haute par ordinateur. Votre enfant peut comprendre une histoire sans savoir la lire seul. Félicitez ce qu'il comprend. Pas seulement ce qu'il lit.",
```

(this exact pair only appears once in the file, inside `dyslexie`)

Replace with:

```ts
      clair:
        "Adapter la police (sans empattement, bien espacée), augmenter la taille du texte et l'interligne facilite la lecture. La synthèse vocale permet de séparer la compréhension du décodage — votre enfant peut comprendre une histoire complexe même s'il ne peut pas encore la lire seul. Valorisez ce qu'il comprend à l'oral, pas seulement ce qu'il déchiffre à l'écrit. La dyslexie ne disparaît pas avec ces aménagements, mais elle cesse d'être un obstacle quotidien : beaucoup d'enfants dyslexiques bien accompagnés deviennent d'excellents lecteurs, à leur façon.",
      falc:
        "Utilisez une police simple et un texte plus grand. Utilisez la lecture à voix haute par ordinateur. Votre enfant peut comprendre une histoire sans savoir la lire seul. Félicitez ce qu'il comprend. Pas seulement ce qu'il lit. La dyslexie ne part pas avec ces aides. Mais elle dérange moins chaque jour. Beaucoup d'enfants dyslexiques bien aidés lisent très bien, à leur façon.",
```

- [ ] **Step 2: Dyscalculie — gloss "mémoire de travail" and add a concrete scene in `ceQueCaChange.clair`**

Find (inside the `dyscalculie` entry, `ceQueCaChange`):

```ts
      clair:
        "L'anxiété mathématique — la peur de se tromper en maths — envahit la mémoire de travail et laisse peu de place au raisonnement : plus votre enfant est stressé par un exercice de calcul, moins il a de ressources cognitives pour le résoudre, même s'il en est capable. Cela peut créer un cercle vicieux où chaque évaluation chronométrée aggrave la difficulté réelle.",
```

Replace with:

```ts
      clair:
        "L'anxiété mathématique — la peur de se tromper en maths — envahit la mémoire de travail (la capacité à garder plusieurs informations « en tête » en même temps pour les manipuler) et laisse peu de place au raisonnement : plus votre enfant est stressé par un exercice de calcul, moins il a de ressources pour le résoudre, même s'il en est capable. Concrètement : il connaît sa table de 7 par cœur à la maison, mais le jour du contrôle chronométré, le stress lui fait tout oublier.",
```

- [ ] **Step 3: Dyscalculie — append closing sentence to `commentAider`**

Find (inside the `dyscalculie` entry, `commentAider`):

```ts
      clair:
        "Entraîner le sens du nombre par la manipulation concrète et le placement sur une droite graduée améliore la représentation mentale des quantités, davantage que la répétition mécanique des tables. Réduisez la pression du chronomètre à la maison. Valorisez les stratégies de calcul, pas seulement le résultat final.",
      falc:
        "Faites manipuler des objets pour compter. Utilisez une droite graduée. Évitez le chronomètre à la maison. Un calcul juste sans stress vaut mieux qu'un calcul raté sous pression. Félicitez la méthode, pas seulement la bonne réponse.",
```

Replace with:

```ts
      clair:
        "Entraîner le sens du nombre par la manipulation concrète et le placement sur une droite graduée améliore la représentation mentale des quantités, davantage que la répétition mécanique des tables. Réduisez la pression du chronomètre à la maison. Valorisez les stratégies de calcul, pas seulement le résultat final. La dyscalculie ne disparaît pas, mais réduire la pression du temps et valoriser la méthode plutôt que le résultat change vraiment ce que votre enfant peut montrer de ce qu'il sait faire.",
      falc:
        "Faites manipuler des objets pour compter. Utilisez une droite graduée. Évitez le chronomètre à la maison. Un calcul juste sans stress vaut mieux qu'un calcul raté sous pression. Félicitez la méthode, pas seulement la bonne réponse. La dyscalculie ne part pas. Mais moins de pression aide vraiment votre enfant à montrer ce qu'il sait faire.",
```

- [ ] **Step 4: Verify it compiles**

Run: `npx tsc -b --noEmit` (from `projets/portail-plai`)
Expected: no errors.

- [ ] **Step 5: Verify the `sources` arrays for both `dyslexie` and `dyscalculie` are byte-identical to before**

Run: `git diff src/data/parentsFiches.ts` and visually confirm the diff touches only the 4 string literals edited above — no lines inside any `sources: [...]` block changed.

- [ ] **Step 6: Commit**

```bash
git add src/data/parentsFiches.ts
git commit -m "feat(parents): pedagogical revision — dyslexie, dyscalculie"
```

---

### Task 2: TDAH + TSA

**Files:**
- Modify: `src/data/parentsFiches.ts`

- [ ] **Step 1: TDAH — append closing sentence to `commentAider`**

Find (inside the `tdah` entry, `commentAider`):

```ts
      clair:
        "La collaboration entre vous, l'enseignant et les professionnels qui suivent votre enfant est un levier reconnu : un cahier de liaison régulier ou des objectifs partagés entre l'école et la maison aident à ajuster les attentes des deux côtés. Découpez les devoirs en étapes courtes avec des pauses actives plutôt qu'une session longue et immobile.",
      falc:
        "Parlez régulièrement avec l'enseignant. Utilisez un cahier de liaison si besoin. Découpez les devoirs en petites étapes. Laissez des pauses pour bouger. Cela aide votre enfant à tenir plus longtemps.",
```

Replace with:

```ts
      clair:
        "La collaboration entre vous, l'enseignant et les professionnels qui suivent votre enfant est un levier reconnu : un cahier de liaison régulier ou des objectifs partagés entre l'école et la maison aident à ajuster les attentes des deux côtés. Découpez les devoirs en étapes courtes avec des pauses actives plutôt qu'une session longue et immobile. Le TDAH ne disparaît pas à l'adolescence pour beaucoup d'enfants, mais un cadre adapté à la maison et à l'école change réellement sa capacité à réussir et à se sentir compétent.",
      falc:
        "Parlez régulièrement avec l'enseignant. Utilisez un cahier de liaison si besoin. Découpez les devoirs en petites étapes. Laissez des pauses pour bouger. Cela aide votre enfant à tenir plus longtemps. Le TDAH ne part pas toujours en grandissant. Mais un bon cadre aide vraiment votre enfant à réussir.",
```

- [ ] **Step 2: TSA — append closing sentence to `commentAider`**

Find (inside the `tsa` entry, `commentAider`):

```ts
      clair:
        "Les supports visuels (pictogrammes, emploi du temps illustré) aident votre enfant à anticiper ce qui l'attend et réduisent l'anxiété liée à l'implicite. Prévenez des changements à l'avance quand c'est possible, et donnez-lui accès à un endroit calme pour se réguler en cas de besoin, à l'école comme à la maison.",
      falc:
        "Utilisez des images pour montrer le programme de la journée. Prévenez des changements à l'avance. Prévoyez un endroit calme pour se reposer. Cela aide votre enfant à se sentir en sécurité.",
```

Replace with:

```ts
      clair:
        "Les supports visuels (pictogrammes, emploi du temps illustré) aident votre enfant à anticiper ce qui l'attend et réduisent l'anxiété liée à l'implicite. Prévenez des changements à l'avance quand c'est possible, et donnez-lui accès à un endroit calme pour se réguler en cas de besoin, à l'école comme à la maison. Le TSA ne disparaît pas, mais des repères stables et prévisibles réduisent vraiment l'anxiété de votre enfant au quotidien et l'aident à se sentir en sécurité.",
      falc:
        "Utilisez des images pour montrer le programme de la journée. Prévenez des changements à l'avance. Prévoyez un endroit calme pour se reposer. Cela aide votre enfant à se sentir en sécurité. Le TSA ne part pas. Mais des repères clairs aident vraiment votre enfant à se sentir en sécurité.",
```

- [ ] **Step 3: Verify it compiles**

Run: `npx tsc -b --noEmit`
Expected: no errors.

- [ ] **Step 4: Verify `sources` untouched**

Run: `git diff src/data/parentsFiches.ts` and confirm only the 2 string literals above changed.

- [ ] **Step 5: Commit**

```bash
git add src/data/parentsFiches.ts
git commit -m "feat(parents): pedagogical revision — TDAH, TSA"
```

---

### Task 3: Troubles visuo-spatiaux + Langage oral

**Files:**
- Modify: `src/data/parentsFiches.ts`

- [ ] **Step 1: Troubles visuo-spatiaux — append closing sentence to `commentAider`**

Find (inside the `troubles-visuo-spatiaux` entry, `commentAider`):

```ts
      clair:
        "Des repères visuels simples (feuilles avec marges pré-tracées, tableaux agrandis et espacés) réduisent la charge liée à l'organisation spatiale. Laissez du temps supplémentaire pour les tâches de copie ou de mise en page, et privilégiez l'explication verbale des consignes spatiales plutôt que la seule démonstration visuelle.",
      falc:
        "Utilisez des feuilles avec des repères déjà tracés. Donnez plus de temps pour copier. Expliquez les consignes à voix haute, pas seulement en montrant. Cela aide votre enfant à s'organiser.",
```

Replace with:

```ts
      clair:
        "Des repères visuels simples (feuilles avec marges pré-tracées, tableaux agrandis et espacés) réduisent la charge liée à l'organisation spatiale. Laissez du temps supplémentaire pour les tâches de copie ou de mise en page, et privilégiez l'explication verbale des consignes spatiales plutôt que la seule démonstration visuelle. Ce trouble ne disparaît pas, mais des repères visuels simples changent vraiment ce que votre enfant arrive à produire, sans lien avec ce qu'il comprend réellement.",
      falc:
        "Utilisez des feuilles avec des repères déjà tracés. Donnez plus de temps pour copier. Expliquez les consignes à voix haute, pas seulement en montrant. Cela aide votre enfant à s'organiser. Ce trouble ne part pas. Mais des repères simples aident vraiment votre enfant à s'organiser.",
```

- [ ] **Step 2: Langage oral (dysphasie) — append closing sentence to `commentAider`**

Find (inside the `langage-oral` entry, `commentAider`):

```ts
      clair:
        "Un diagnostic et une prise en charge orthophonique précoces améliorent nettement l'évolution du trouble et l'apprentissage ultérieur de la lecture. À la maison, reformulez les consignes en phrases courtes, laissez du temps pour répondre, et valorisez la communication non-verbale (gestes, dessins) comme appui, pas comme substitut à corriger.",
      falc:
        "Un diagnostic précoce aide beaucoup. Une orthophoniste peut accompagner votre enfant. Donnez des consignes courtes. Laissez du temps pour répondre. Les gestes et les dessins peuvent aider à communiquer.",
```

Replace with:

```ts
      clair:
        "Un diagnostic et une prise en charge orthophonique précoces améliorent nettement l'évolution du trouble et l'apprentissage ultérieur de la lecture. À la maison, reformulez les consignes en phrases courtes, laissez du temps pour répondre, et valorisez la communication non-verbale (gestes, dessins) comme appui, pas comme substitut à corriger. La dysphasie ne disparaît pas d'un coup, mais une prise en charge orthophonique précoce et de la patience à la maison changent vraiment la trajectoire de votre enfant, y compris pour l'apprentissage futur de la lecture.",
      falc:
        "Un diagnostic précoce aide beaucoup. Une orthophoniste peut accompagner votre enfant. Donnez des consignes courtes. Laissez du temps pour répondre. Les gestes et les dessins peuvent aider à communiquer. La dysphasie ne part pas d'un coup. Mais une aide précoce change vraiment beaucoup de choses pour votre enfant.",
```

- [ ] **Step 3: Verify it compiles**

Run: `npx tsc -b --noEmit`
Expected: no errors.

- [ ] **Step 4: Verify `sources` untouched**

Run: `git diff src/data/parentsFiches.ts` and confirm only the 2 string literals above changed.

- [ ] **Step 5: Commit**

```bash
git add src/data/parentsFiches.ts
git commit -m "feat(parents): pedagogical revision — troubles visuo-spatiaux, langage oral"
```

---

### Task 4: Dyspraxie + Haut potentiel

**Files:**
- Modify: `src/data/parentsFiches.ts`

- [ ] **Step 1: Dyspraxie — append closing sentence to `commentAider`**

Find (inside the `dyspraxie` entry, `commentAider`):

```ts
      clair:
        "L'ordinateur ou la tablette pour écrire, quand c'est possible, libère l'attention de votre enfant pour le contenu plutôt que le geste. Réduisez la quantité de copie demandée à la maison, et valorisez ce qu'il sait, indépendamment de la qualité graphique de son écriture.",
      falc:
        "L'ordinateur peut aider votre enfant à écrire. Réduisez la copie à la maison si possible. Jugez ce que votre enfant sait. Pas seulement son écriture.",
```

Replace with:

```ts
      clair:
        "L'ordinateur ou la tablette pour écrire, quand c'est possible, libère l'attention de votre enfant pour le contenu plutôt que le geste. Réduisez la quantité de copie demandée à la maison, et valorisez ce qu'il sait, indépendamment de la qualité graphique de son écriture. La dyspraxie ne disparaît pas, mais l'ordinateur et moins de copie changent vraiment ce que votre enfant peut montrer de ses idées, indépendamment de son geste graphique.",
      falc:
        "L'ordinateur peut aider votre enfant à écrire. Réduisez la copie à la maison si possible. Jugez ce que votre enfant sait. Pas seulement son écriture. La dyspraxie ne part pas. Mais l'ordinateur aide vraiment votre enfant à montrer ses idées.",
```

- [ ] **Step 2: Haut potentiel — append adapted closing sentence to `commentAider`**

Find (inside the `haut-potentiel` entry, `commentAider`):

```ts
      clair:
        "Proposer des approfondissements plutôt que davantage du même exercice évite l'ennui sans accélérer artificiellement le programme. Si des difficultés d'apprentissage coexistent avec le haut potentiel, ne les minimisez pas au prétexte de l'intelligence de votre enfant — un trouble associé mérite le même accompagnement que chez tout autre enfant.",
      falc:
        "Proposez des activités plus profondes, pas juste plus d'exercices. Si votre enfant a aussi un autre trouble, ne le sous-estimez pas. Il a besoin d'aide comme un autre enfant.",
```

Replace with:

```ts
      clair:
        "Proposer des approfondissements plutôt que davantage du même exercice évite l'ennui sans accélérer artificiellement le programme. Si des difficultés d'apprentissage coexistent avec le haut potentiel, ne les minimisez pas au prétexte de l'intelligence de votre enfant — un trouble associé mérite le même accompagnement que chez tout autre enfant. Le haut potentiel n'est pas un problème à corriger, mais un fonctionnement qui a besoin d'être nourri année après année — un enfant bien stimulé et bien accompagné, y compris sur ses éventuelles difficultés associées, s'épanouit durablement.",
      falc:
        "Proposez des activités plus profondes, pas juste plus d'exercices. Si votre enfant a aussi un autre trouble, ne le sous-estimez pas. Il a besoin d'aide comme un autre enfant. Le haut potentiel n'est pas un problème. C'est une façon de fonctionner qui a besoin d'attention chaque année. Un enfant bien accompagné va bien, sur la durée.",
```

**Note:** this closing sentence for `haut-potentiel` is deliberately worded differently from the other 8 fiches ("n'est pas un problème à corriger" instead of "ne disparaît pas") — high potential is not a disorder, and the design doc explicitly calls for this adapted framing. Do not "fix" it to match the other 8 fiches' pattern.

- [ ] **Step 3: Verify it compiles**

Run: `npx tsc -b --noEmit`
Expected: no errors.

- [ ] **Step 4: Verify `sources` untouched**

Run: `git diff src/data/parentsFiches.ts` and confirm only the 2 string literals above changed.

- [ ] **Step 5: Commit**

```bash
git add src/data/parentsFiches.ts
git commit -m "feat(parents): pedagogical revision — dyspraxie, haut potentiel"
```

---

### Task 5: Anxiété scolaire

**Files:**
- Modify: `src/data/parentsFiches.ts`

- [ ] **Step 1: Gloss "anxiété de séparation" in `ceQueCaChange.clair`**

Find (inside the `anxiete-scolaire` entry, `ceQueCaChange`):

```ts
      clair:
        "Cette détresse peut avoir plusieurs origines : anxiété de performance, anxiété de séparation, ou parfois harcèlement entre pairs — le harcèlement scolaire est associé à une anxiété significativement plus élevée et à une moins bonne qualité de vie. Le lien entre l'origine de l'anxiété et les symptômes observés n'est pas toujours évident depuis la maison.",
```

Replace with:

```ts
      clair:
        "Cette détresse peut avoir plusieurs origines : la peur de ne pas réussir, l'anxiété de séparation (la peur d'être loin de vous, fréquente chez les plus jeunes), ou parfois le harcèlement entre pairs — associé à une anxiété significativement plus élevée et à une moins bonne qualité de vie. Le lien entre l'origine de l'anxiété et les symptômes observés n'est pas toujours évident depuis la maison.",
```

- [ ] **Step 2: Append closing sentence to `commentAider`**

Find (inside the `anxiete-scolaire` entry, `commentAider`):

```ts
      clair:
        "Un retour progressif à l'école, plutôt qu'un évitement prolongé, améliore le pronostic à long terme — plus l'absence se prolonge, plus le retour devient difficile. Une prise en charge structurée (par exemple une thérapie cognitive et comportementale) montre des résultats positifs. Parlez-en tôt avec l'école et un professionnel de santé plutôt que d'attendre que la situation s'aggrave.",
      falc:
        "Un retour progressif à l'école aide plus qu'une longue absence. Plus l'enfant reste absent, plus c'est difficile de revenir. Une aide professionnelle peut vraiment aider. Parlez-en tôt à l'école et à un médecin.",
```

Replace with:

```ts
      clair:
        "Un retour progressif à l'école, plutôt qu'un évitement prolongé, améliore le pronostic à long terme — plus l'absence se prolonge, plus le retour devient difficile. Une prise en charge structurée (par exemple une thérapie cognitive et comportementale) montre des résultats positifs. Parlez-en tôt avec l'école et un professionnel de santé plutôt que d'attendre que la situation s'aggrave. Cette anxiété ne disparaît pas toujours du jour au lendemain, mais un retour progressif bien accompagné change vraiment la trajectoire de votre enfant — la grande majorité des enfants suivis tôt reprennent une scolarité stable.",
      falc:
        "Un retour progressif à l'école aide plus qu'une longue absence. Plus l'enfant reste absent, plus c'est difficile de revenir. Une aide professionnelle peut vraiment aider. Parlez-en tôt à l'école et à un médecin. Cette peur ne part pas toujours d'un coup. Mais un retour progressif bien accompagné aide vraiment votre enfant.",
```

- [ ] **Step 3: Verify it compiles**

Run: `npx tsc -b --noEmit`
Expected: no errors.

- [ ] **Step 4: Verify `sources` untouched**

Run: `git diff src/data/parentsFiches.ts` and confirm only the 2 string literals above changed.

- [ ] **Step 5: Commit**

```bash
git add src/data/parentsFiches.ts
git commit -m "feat(parents): pedagogical revision — anxiété scolaire"
```

---

### Task 6: Décodeur system prompt

**Files:**
- Modify: `api/decodeur.ts`

- [ ] **Step 1: Add a rule to the system prompt's rule list**

Find (inside the `system` template literal in `api/decodeur.ts`):

```
Règles strictes :
- Ne jamais ajouter d'information ou d'interprétation qui ne figure pas explicitement dans le texte fourni.
- Ne jamais formuler de conseil juridique ni de recommandation médicale. Si le texte soulève une question de ce type, indique-le et renvoie vers le Guide des droits du portail (/parents/droits) et vers le dialogue avec l'enseignant ou le CPMS — jamais de réponse juridique ou médicale directe.
- Si un nom propre d'enfant apparaît dans le texte, ne jamais le répéter dans ta réponse — remplace-le par "l'enfant" ou "il/elle".
- Style direct, sans préambule ("Voici", "Bien sûr"), sans transition d'IA.
- La version FALC utilise des phrases courtes, une idée par phrase.
```

Replace with:

```
Règles strictes :
- Ne jamais ajouter d'information ou d'interprétation qui ne figure pas explicitement dans le texte fourni.
- Ne jamais formuler de conseil juridique ni de recommandation médicale. Si le texte soulève une question de ce type, indique-le et renvoie vers le Guide des droits du portail (/parents/droits) et vers le dialogue avec l'enseignant ou le CPMS — jamais de réponse juridique ou médicale directe.
- Si un nom propre d'enfant apparaît dans le texte, ne jamais le répéter dans ta réponse — remplace-le par "l'enfant" ou "il/elle".
- Style direct, sans préambule ("Voici", "Bien sûr"), sans transition d'IA.
- La version FALC utilise des phrases courtes, une idée par phrase.
- Utilise un vocabulaire simple, sans jargon non expliqué ; illustre avec une situation concrète du quotidien scolaire ou familial quand c'est pertinent.
```

- [ ] **Step 2: Verify it compiles**

Run: `npx tsc -b --noEmit`
Expected: no errors (note: `api/*.ts` isn't part of the `tsc -b` project build in this repo, same as noted in prior chantiers — this step guards `src/` files).

- [ ] **Step 3: Commit**

```bash
git add api/decodeur.ts
git commit -m "feat(parents): add plain-language rule to Décodeur system prompt"
```

---

### Task 7: Full build and manual verification

**Files:** none (verification only)

- [ ] **Step 1: Full production build**

Run: `npx vite build` (from `projets/portail-plai`)
Expected: build succeeds, no errors.

- [ ] **Step 2: Confirm no source citations were altered**

Run: `git diff main -- src/data/parentsFiches.ts | grep -E '^\-.*(citation|content):'`
Expected: no output (or only output that is whitespace-identical — if the base ref `main` differs from what's expected, compare against the branch's first commit instead: `git diff <first-commit-of-this-branch>~1 -- src/data/parentsFiches.ts`). The point of this check: confirm every `-` (removed) line in the diff belongs to a `cEstQuoi`/`ceQueCaChange`/`commentAider` block, never to a `sources` entry.

- [ ] **Step 3: Manual walkthrough in dev server**

Run: `npm run dev`, open the printed local URL.

Check in browser, both `clair` and FALC (toggle) modes:
- `/parents/dyslexie` — `commentAider` ends with the new "ne disparaît pas... à leur façon" sentence.
- `/parents/dyscalculie` — `ceQueCaChange` includes the "table de 7" scene and the memory-span gloss; `commentAider` ends with the new closing sentence.
- `/parents/haut-potentiel` — `commentAider` ends with the adapted "n'est pas un problème à corriger" sentence (different wording pattern from the other fiches — confirm it reads naturally, not as a copy-paste error).
- `/parents/anxiete-scolaire` — `ceQueCaChange` includes the "anxiété de séparation (la peur d'être loin de vous...)" gloss; `commentAider` ends with the new closing sentence.
- Spot-check 2 more fiches (e.g. TDAH, dyspraxie) for the closing sentence.
- Confirm no fiche's `sources` list changed (visually spot-check the citations shown at the bottom of 2-3 fiches against what was there before this branch).

- [ ] **Step 4: Commit any fixups**

```bash
git add -A
git commit -m "fix(parents): address issues found in manual verification"
```

(Skip if no fixups were needed.)
