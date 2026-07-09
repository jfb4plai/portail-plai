# Publication de RituActif sur le portail PLAI — Design

## 1. Objectif

Ajouter RituActif (https://rituactif.jfb4plai.com, déployé et en production depuis 2026-07-09) au portail PLAI, en suivant exactement le modèle existant des autres apps (`AppItem` dans `src/data/apps.ts`, rendu par `Home.tsx`/`GuideModal`). Pas de nouveau mécanisme : une entrée de données, pas de nouveau composant.

## 2. Constat sur le mécanisme "mode d'emploi"

Le skill `coherence-guides-plai` du projet documente un mécanisme de guides HTML autonomes dans `public/*.html` — mais ce dossier est vide (`ls public/*.html` → aucun résultat). En pratique, le "mode d'emploi" et l'"ancrage scientifique" affichés au clic sur une app sont portés par le champ `guide` de l'objet `AppItem` (type `GuideContent`, `src/types/index.ts`), rendu par le composant `GuideModal` (`src/pages/Home.tsx:58-153`) en deux onglets. C'est ce mécanisme, confirmé par la lecture directe du code et de 10+ entrées existantes (RetroActif, Picto Lecture, DéfiniFWB, PlanBot...), qui s'applique ici — pas des fichiers HTML statiques. Le skill `coherence-guides-plai` ne s'applique donc pas à cette tâche.

## 3. Entrée `AppItem`

Emplacement : `src/data/apps.ts`, ajoutée à la suite des entrées existantes (fin du tableau `apps`).

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
  color: 'green',
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
            'Exportez en PDF/PNG pour l\'impression',
            'À l\'écran : cases à cocher de progression (séquentiel/emploi du temps) ou pictos cliquables avec audio, sans notion de progression (grille)',
            'La planche est sauvegardée automatiquement dans votre compte',
          ],
        },
      ],
      tip: 'Pour le mémo-consigne (rendu grille), construisez une planche une fois en début d\'année avec les verbes de consigne récurrents (souligne, entoure, relie, colorie…) et réutilisez-la toute l\'année — c\'est le principe du TLA appliqué à la compréhension des consignes d\'exercice, pas seulement à la communication.',
    },
  },
},
```

**Choix validés avec l'utilisateur** :
- Emoji `📋` (presse-papier — met en avant le rendu grille TLA/mémo-consigne).
- Couleur `green`, alignée sur LireActif (`lireactif`, id `src/data/apps.ts:2571`) car les deux apps partagent des mécanismes proches (double codage image/mot, accessibilité lecture). Note : `green` est également utilisée par DéfiniFWB — les couleurs se répètent déjà ailleurs dans le portail (ex. `amber` 3×), ce n'est pas bloquant.
- `section: 'applications'` — RituActif est un outil d'usage quotidien en classe (comme LireActif, Picto Lecture, DéfiniFWB, Dictée Interactive), pas une simulation de sensibilisation.
- `status: 'disponible'` — déjà en ligne.

## 4. Ancrage scientifique (`guide.scientific`)

Sélection de 5 références RISS, une par pilier de l'app, **vérifiées via `mcp__RISS__get_article`/`search_articles` le 2026-07-09** (pas une reprise brute des IDs notés en mémoire lors de la conception initiale de RituActif — un ID s'est révélé incorrect à la vérification, voir ci-dessous).

| # | ID RISS | Rôle dans le guide |
|---|---|---|
| 1 | `dumas-01927713` (Barany & Charbonnier, 2018) | Ritualisation par emploi du temps visuel — cité tel quel dans le design original de RituActif |
| 2 | `dumas-01521287` (Caroulle, 2010) | Primauté du canal visuel dans l'apprentissage chez l'élève TSA — justifie le picto par défaut |
| 3 | `dumas-04541014` (Denorme, 2023) | Allègement de la mémoire de travail par pictogrammes + décomposition de consignes (FALC) + ritualisation — **remplace `dumas-05150932`**, un meilleur match que la référence initialement retenue en mémoire (qui portait sur le dessin en camp de vacances FLE, un lien plus indirect) |
| 4 | `tel-04807443` (Balssa, 2024) | FALC et école inclusive — même référence que Picto Lecture, pour cohérence du bandeau de réserve |
| 5 | `dumas-05065053` (Lopez, 2024) | Définition sourcée du TLA — **remplace `dumas-03348111`**, un ID incorrect trouvé en mémoire (l'article réel derrière cet ID ne traite pas du TLA ; erreur de transcription lors de la conception initiale, corrigée ici avant publication) |

`summary` (à écrire dans le style des autres entrées, ex. RetroActif/Picto Lecture) : synthèse en un paragraphe reliant ritualisation, primauté visuelle, allègement de la mémoire de travail et TLA au fonctionnement de RituActif (un seul moteur d'items → 3 rendus).

## 5. Mode d'emploi (`guide.howto`)

4 groupes d'étapes suivant le flux réel de l'app (section 5 du design original RituActif) :

1. **Créer une planche** — connexion, nom, choix du rendu (séquentiel / emploi du temps / grille), rattachement (classe générique ou élève à code anonyme).
2. **Simplifier une consigne (optionnel, inspiré du FALC)** — coller une consigne longue, découpage proposé dans une zone éditable, validation obligatoire, bandeau de réserve visible à chaque usage.
3. **Construire les items** — recherche ARASAAC par libellé, validation obligatoire par clic (jamais d'auto-sélection), alternative upload perso/composite, horaire optionnel, réglage texte visible (global ou par item).
4. **Générer et utiliser** — réordonnancement, export PDF/PNG, usage à l'écran (cases à cocher de progression ou pictos cliquables avec audio selon le rendu), sauvegarde automatique.

`tip` : usage du rendu grille comme mémo-consigne permanent construit une fois en début d'année, réutilisé toute l'année — parallèle explicite avec le principe du TLA.

## 6. Ce que cette tâche ne fait pas

Pas de nouvelle vignette graphique (image) — le portail n'utilise pas d'assets par app, uniquement emoji + couleur Tailwind (`colorMap`, `Home.tsx:5-15`). Pas de modification de `GuideModal`, `Home.tsx` ou du système de types — l'entrée suit un contrat déjà stable utilisé par 20+ apps.

## 7. Checklist avant commit

- `npx vite build` du portail sans erreur
- Les 5 références RISS citées existent et correspondent au contenu affiché (vérifié section 4)
- Aperçu visuel de la carte + de la modale (via preview) avant de considérer la tâche terminée
