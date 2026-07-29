# Ateliers pour parents — Espace Parents — Design

## 1. Contexte

Quatrième et dernier chantier initialement identifié pour l'Espace Parents (zone+fiches, Guide des droits, Décodeur PIA/bulletin sont livrés et en production). Ce chantier ouvre aux parents les deux ateliers de sensibilisation "vécue" déjà en production pour les enseignants : Atelier Dyslexie (`atelier-dyslexie-plai.vercel.app`, simulation de lecture dyslexique) et Atelier Maya (`atelier-maya.vercel.app`, simulation de désorientation numérique dyscalculique).

## 2. Ce qui a été vérifié avant de concevoir

Les deux apps sont des fichiers `index.html` autonomes (pas de framework, pas de repo partagé avec portail-plai). Inspection directe du code (pas supposition) :
- Le cadrage "réunion d'équipe" / "formation" que je craignais de devoir réécrire en profondeur **ne vit pas dans ces fichiers** — il est dans le guide affiché par portail-plai aux enseignants (`src/data/apps.ts`, champ `guide.howto.tip`), qui n'est jamais chargé par l'Espace Parents.
- Dans les fichiers HTML eux-mêmes, seules quelques mentions ponctuelles orientées enseignant existent :
  - `atelier-dyslexie-plai/index.html:434` — sous-titre "Outil de sensibilisation pour enseignants"
  - `atelier-dyslexie-plai/index.html:595` — note RISS "développer l'empathie **des enseignants** envers les élèves"
  - `atelier-maya/index.html:179` — libellé "Configuration — **Animateur**"
  - `atelier-maya/index.html:219` — aide "regroupe les résultats d'une même **formation**"
  - `atelier-maya/index.html:738` — note RISS "...permet de faire vivre **aux enseignants**"

L'adaptation "mode parent" est donc un remplacement ciblé de ces quelques chaînes, pas une réécriture de la simulation.

## 3. Architecture

- **`src/pages/AteliersParents.tsx`** (nouveau, dans portail-plai) — route `/parents/ateliers`. Présente les deux ateliers avec un cadrage écrit directement pour un parent seul chez lui, et des questions de réflexion guidée après chaque essai (contenu neuf, pas copié du guide enseignant).
- **`src/data/ateliersParents.ts`** (nouveau, dans portail-plai) — données des 2 ateliers.
- **Liens externes** vers `atelier-dyslexie-plai.vercel.app/?public=parent` et `atelier-maya.vercel.app/?public=parent`.
- **Dans `atelier-dyslexie-plai/index.html`** et **`atelier-maya/index.html`** (2 petits chantiers séparés, sur leurs propres repos, hors du repo portail-plai) : un script inline lit `new URLSearchParams(location.search).get('public') === 'parent'` et, si vrai, remplace les chaînes listées au §2 par un phrasé neutre (ni "enseignant", ni "animateur", ni "formation"). Aucune autre modification de ces apps.
- **`ParentsHome.tsx`** — 12e carte, pointant vers `/parents/ateliers`.

## 4. Contenu de `/parents/ateliers`

- Bandeau d'individualisation (réutilisé, comme sur les autres pages).
- Intro courte : pourquoi vivre l'expérience soi-même change le regard, plus qu'une explication théorique.
- Pour chaque atelier : emoji, titre, description courte, bouton vers l'app externe (`target="_blank"`, `?public=parent`), et un bloc de questions de réflexion guidée (clair/FALC, toggle page-level comme sur `GuideDroits.tsx`) à lire après avoir essayé.
- Astuce traduction navigateur (`TipTraductionNavigateur`, réutilisé).

### Questions de réflexion — Atelier Dyslexie
- **Clair** : "Qu'avez-vous ressenti en essayant de lire ce texte déformé ? Beaucoup de parents décrivent de la fatigue, de la frustration, parfois de l'anxiété — c'est exactement ce que peut ressentir votre enfant face à un texte scolaire ordinaire. Qu'est-ce que ça change dans votre regard sur le temps qu'il met à faire ses devoirs de lecture ?"
- **FALC** : "Comment vous êtes-vous senti en lisant ce texte difficile ? Fatigué ? Frustré ? C'est peut-être ce que ressent votre enfant à l'école. Ça change quelque chose dans votre regard sur ses devoirs ?"

### Questions de réflexion — Atelier Maya (dyscalculie)
- **Clair** : "Qu'avez-vous ressenti face à ces chiffres mayas, avec le chronomètre qui tourne ? Beaucoup de parents décrivent un stress qui empêche de réfléchir clairement — c'est le mécanisme même de l'anxiété mathématique que peut vivre un enfant dyscalculique face à un exercice chronométré. Qu'est-ce que ça change dans votre regard sur la pression du temps lors des devoirs de mathématiques ?"
- **FALC** : "Comment vous êtes-vous senti avec le chronomètre qui tourne ? Stressé ? C'est peut-être ce que ressent votre enfant en maths. Ça change quelque chose dans votre regard sur la pression du temps pendant les devoirs ?"

### Intro
- **Clair** : "Vivre soi-même, quelques minutes, ce que peut vivre un enfant porteur d'un trouble d'apprentissage change souvent plus le regard qu'une explication théorique. Ces deux ateliers, conçus au départ pour les enseignants, sont ouverts aux parents : essayez-les seul, à votre rythme, chez vous."
- **FALC** : "Essayer soi-même, quelques minutes, aide à comprendre son enfant. Ces deux ateliers étaient prévus pour les enseignants. Vous pouvez les essayer aussi. Seul, chez vous, à votre rythme."

## 5. Modèle de données

```ts
export type AtelierParent = {
  id: string;
  emoji: string;
  titre: string;
  description: string;
  url: string; // inclut déjà ?public=parent
  questions: { clair: string; falc: string };
};
```

## 6. Hors scope

Toggle FALC transversal au reste du portail (chantier 5, jamais traité, ni planifié pour l'instant). Modification de la simulation elle-même dans les deux apps externes (seul le texte de cadrage change, pas la mécanique). Nouvelle app à part entière — explicitement écarté au profit de l'adaptation légère des apps existantes.

## 7. Vérification

- `npx tsc -b --noEmit` et `npx vite build` passent (portail-plai).
- `/parents` affiche la 12e carte ; `/parents/ateliers` affiche les 2 ateliers, le toggle FALC bascule les questions de réflexion.
- Les liens externes s'ouvrent avec `?public=parent` dans un nouvel onglet.
- Dans chaque app externe, vérifier manuellement que `?public=parent` change bien les chaînes listées au §2, et que l'app sans ce paramètre (URL actuelle utilisée par les enseignants) reste identique à aujourd'hui — aucune régression pour l'usage enseignant existant.
- Restrictions déjà en place sur l'Espace Parents (pas de lien de sortie Navbar, pas de Copernic) héritées automatiquement sur `/parents/ateliers`.
