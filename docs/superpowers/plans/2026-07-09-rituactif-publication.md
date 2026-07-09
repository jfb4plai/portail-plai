# Publication de RituActif sur le portail PLAI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ajouter RituActif au portail PLAI (`src/data/apps.ts`) avec vignette, mode d'emploi et ancrage scientifique RISS, suivant exactement le modèle des apps existantes.

**Architecture:** Une seule entrée `AppItem` ajoutée à un tableau existant. Aucun nouveau composant, aucun nouveau type — le contrat `AppItem`/`GuideContent` (`src/types/index.ts`) est déjà stable et utilisé par 20+ apps, rendu par `GuideModal` (`src/pages/Home.tsx`).

**Tech Stack:** React 18 + Vite 5 + TypeScript, Tailwind CSS.

**Spec de référence :** `docs/superpowers/specs/2026-07-09-rituactif-publication-design.md`

---

### Task 1: Ajouter l'entrée RituActif à apps.ts

**Files:**
- Modify: `src/data/apps.ts`

- [ ] **Step 1: Localiser le point d'insertion**

Ouvrir `src/data/apps.ts`. L'entrée `lireactif` (id `'lireactif'`) est actuellement la dernière du tableau `apps`, se terminant par :

```ts
  {
    id: 'lireactif',
    name: 'LireActif',
    description:
      "Entraînement à la fluence de lecture par présentation sérielle (RSVP), réglages individualisés par profil élève, testable sans compte en mode découverte. Accès élève par jeton, export PDF des réglages.",
    url: 'https://lire-actif.vercel.app',
    emoji: '👓',
    category: 'Lecture',
    status: 'en-développement',
    color: 'green',
    section: 'applications',
    devBanner: true,
  },
```

La nouvelle entrée RituActif s'insère juste après cette accolade fermante `},` de `lireactif`.

- [ ] **Step 2: Insérer l'entrée `AppItem` complète**

```ts
  {
    id: 'rituactif',
    name: 'RituActif',
    description:
      "Générateur de séquentiels visuels, emplois du temps et grilles de pictogrammes (TLA / mémo-consigne) pour ritualiser le quotidien de classe. Simplification de consigne inspirée du FALC en amont, validation humaine obligatoire de chaque pictogramme, audio par synthèse vocale. Codes élève anonymes.",
    url: 'https://rituactif.jfb4plai.com',
    emoji: '📋',
    category: 'Ritualisation',
    status: 'disponible',
    color: 'purple',
    section: 'applications',
    guide: {
      scientific: {
        summary:
          "RituActif s'appuie sur quatre piliers validés : la ritualisation par supports visuels (emploi du temps, séquentiels) qui structure le temps et réduit l'anxiété face à l'implicite ; la primauté du canal visuel chez l'élève TSA, qui justifie le pictogramme comme entrée par défaut et le texte comme réglage optionnel ; l'allègement de la mémoire de travail par décomposition d'une consigne complexe en étapes courtes, inspirée des règles FALC ; et le tableau de langage assisté (TLA) comme grille de communication thématique ou mémo-consigne permanent. Un seul moteur d'items validés par l'enseignant alimente les trois rendus (séquentiel, emploi du temps, grille) — jamais de sélection automatique du pictogramme.",
        references: [
          {
            id: 'dumas-01927713',
            citation: "Barany, M. & Charbonnier, C. (2018). Inclusion d'un élève avec des troubles du spectre autistique. Mémoire, ESPE.",
            content: "La mise en place d'un emploi du temps visuel des différentes activités de la journée permet de ritualiser les activités et de les matérialiser — le principe fondateur du moteur RituActif : une planche = une séquence d'items visuels ordonnée dans le temps.",
          },
          {
            id: 'dumas-01521287',
            citation: "Caroulle, A. (2010). Mise en place et expérimentation d'une méthode d'apprentissage de la lecture spécifiquement adaptée aux enfants avec autisme. Mémoire.",
            content: "L'utilisation préférentielle du canal visuel pour extraire l'information est une caractéristique cognitive communément admise chez l'enfant autiste. RituActif en tire la conséquence directe : le pictogramme est l'entrée par défaut, le texte un réglage optionnel superposable.",
          },
          {
            id: 'dumas-04541014',
            citation: "Denorme, M. (2023). Accompagner des élèves en Unité d'Enseignement Externalisée et présentant des difficultés mnésiques dans l'acquisition de compétences en français. Écrit professionnel CAPPEI.",
            content: "Décomposer une consigne complexe en étapes courtes associées à des pictogrammes allège la mémoire de travail et rend l'activité davantage autonome — la même logique que l'assistant de simplification inspiré du FALC de RituActif, qui découpe une consigne longue en étapes validées une à une par l'enseignant.",
          },
          {
            id: 'tel-04807443',
            citation: "Balssa, F. (2024). Facile à Lire et à Comprendre (FALC) et école inclusive : questionnements et applications des règles FALC en école élémentaire. Thèse, Université de Bordeaux.",
            content: "Le FALC officiel exige une relecture participative par une personne porteuse de déficience intellectuelle. RituActif s'inspire de règles FALC pour découper une consigne en étapes courtes, sans se substituer à une traduction FALC certifiée — d'où le bandeau de réserve affiché à chaque usage.",
          },
          {
            id: 'dumas-05065053',
            citation: "Lopez, L. (2024). Mise en place d'outils de communication alternative et améliorée (CAA) pour enfants non oralisants ou peu oralisants porteurs d'une déficience visuelle. Mémoire d'orthophonie.",
            content: "Les tableaux de langage assisté (TLA) sont des grilles de communication à base de pictogrammes, organisées sur une seule page, destinées à une activité ou un contexte spécifique. C'est exactement le rendu grille de RituActif, utilisable en planche de communication thématique ou en mémo-consigne permanent.",
          },
        ],
      },
      howto: {
        steps: [
          {
            title: 'Créer une planche',
            items: [
              'Connectez-vous → « Nouvelle planche »',
              'Nommez la planche et choisissez le rendu cible : séquentiel court, emploi du temps, ou grille (TLA / mémo-consigne)',
              'Choisissez le rattachement : classe générique (ex. « Retour de récré ») ou élève à code anonyme (ex. « Élève-7 »)',
            ],
          },
          {
            title: 'Simplifier une consigne (optionnel, inspiré du FALC)',
            items: [
              'Collez une consigne longue → cliquez « Simplifier »',
              "L'IA propose un découpage en étapes courtes, une idée par phrase — le résultat reste dans une zone éditable",
              "Validez, corrigez ou réordonnez avant de continuer : rien n'est enregistré sans votre validation",
              'Étape à sauter si vous préférez taper vos étapes directement',
            ],
          },
          {
            title: 'Construire les items',
            items: [
              'Pour chaque étape : tapez le libellé → RituActif propose 3 à 6 pictogrammes ARASAAC',
              'Validez le pictogramme par clic — jamais de sélection automatique',
              "Si aucun picto ne convient : uploadez une image perso ou composez un pictogramme à partir d'éléments ARASAAC (utile pour « souligne », « relie »…)",
              "Renseignez l'horaire si le rendu emploi du temps le nécessite",
              "Réglez l'affichage du texte sous le picto : hérité du réglage global, ou ajusté item par item pour cibler un travail lexical précis",
            ],
          },
          {
            title: 'Générer et utiliser',
            items: [
              'Réordonnez par glisser-déposer (séquentiel/emploi du temps) ou positionnez dans la grille',
              "Exportez en PDF/PNG pour l'impression",
              "À l'écran : cases à cocher de progression (séquentiel/emploi du temps) ou pictos cliquables avec audio, sans notion de progression (grille)",
              'La planche est sauvegardée automatiquement dans votre compte',
            ],
          },
        ],
        tip: "Pour le mémo-consigne (rendu grille), construisez une planche une fois en début d'année avec les verbes de consigne récurrents (souligne, entoure, relie, colorie…) et réutilisez-la toute l'année — c'est le principe du TLA appliqué à la compréhension des consignes d'exercice, pas seulement à la communication.",
      },
    },
  },
```

- [ ] **Step 3: Vérifier le build TypeScript**

Run (from `C:\Users\jfbeg\OneDrive\claude-workspace\projets\portail-plai`): `npx vite build`
Expected: build réussi, aucune erreur TypeScript (le type `AppItem` doit accepter l'objet tel quel — pas de champ manquant, pas de faute de frappe dans `AppSection`/`AppStatus`).

- [ ] **Step 4: Commit**

```bash
git add src/data/apps.ts
git commit -m "$(cat <<'EOF'
Publie RituActif sur le portail PLAI

Générateur de séquentiels visuels/emplois du temps/grilles de
pictogrammes, déployé le 2026-07-09 sur rituactif.jfb4plai.com.
Vignette, mode d'emploi et 5 références RISS vérifiées.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: Vérification visuelle (carte + modale)

**Files:** aucun (vérification uniquement)

- [ ] **Step 1: Démarrer le serveur de preview**

Utiliser `preview_start` avec la configuration `portail-plai` (déjà déclarée dans `.claude/launch.json` racine du workspace, port 5175).

- [ ] **Step 2: Vérifier la présence de la carte**

Avec `preview_snapshot`, confirmer que la carte "RituActif" apparaît dans la section "applications", avec l'emoji 📋 et la couleur purple (même style que la carte Picto Lecture).

- [ ] **Step 3: Vérifier la modale de guide**

Cliquer sur la carte RituActif (`preview_click`), confirmer via `preview_snapshot` que la modale `GuideModal` s'ouvre avec :
- Onglet "Mode d'emploi" actif par défaut, affichant les 4 groupes d'étapes
- Onglet "Ancrage scientifique" affichant les 5 références RISS et leur contenu
- Lien "Ouvrir RituActif →" pointant vers `https://rituactif.jfb4plai.com`

- [ ] **Step 4: Capturer une preuve visuelle**

`preview_screenshot` de la carte et de la modale ouverte, à partager avec l'utilisateur.

- [ ] **Step 5: Arrêter le serveur de preview**

`preview_stop` une fois la vérification terminée.
