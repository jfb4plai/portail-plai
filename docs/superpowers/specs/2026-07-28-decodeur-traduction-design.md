# Traduction du résultat décodé + rappel FALC + astuce navigateur — Design

## 1. Contexte

Complément au Décodeur PIA/bulletin (livré, en production sur `/parents/decodeur`). Trois ajouts distincts, groupés dans un seul chantier car tous mineurs et localisés :

1. **Traduction du texte décodé** dans une langue autre que le français, pour les parents allophones les moins francophones en FWB.
2. **Rappel FALC manquant** : `DecodeurPia.tsx` n'affiche jamais la mention "inspiré du FALC, non certifié" que les fiches troubles et le Guide des droits affichent déjà — oubli corrigé ici.
3. **Astuce traduction navigateur** : un rappel, sur chaque page de l'Espace Parents, que le navigateur (Chrome, Edge...) peut traduire la page entière — complémentaire à la traduction ciblée du Décodeur, couvre toutes les langues sans limite à 4.

## 2. Traduction du résultat décodé

**Langues** : turc, arabe, albanais, ukrainien — les langues maternelles les plus représentées chez les familles les moins francophones en FWB (turc/arabe/albanais confirmés par une étude ORBI/ULiège sur les élèves allophones ; ukrainien ajouté pour les familles réfugiées récemment arrivées, généralement peu francophones).

**Étiquettes** : chaque langue est affichée dans sa propre langue, pas en français, pour que le parent la reconnaisse visuellement :
- Türkçe
- العربية
- Shqip
- Українська

**Déclenchement** : 4 boutons apparaissent à côté du toggle FALC, uniquement une fois qu'un résultat de décodage existe. Un seul choix actif à la fois — sélectionner une langue remplace la traduction précédemment affichée (pas d'empilement de plusieurs langues simultanées).

**Texte source de la traduction** : le texte actuellement affiché à l'écran (`result.clair` ou `result.falc`, selon l'état du toggle FALC au moment du clic) — jamais le texte original collé par le parent. Ce texte est déjà passé par le Décodeur, donc déjà nettoyé de tout nom propre d'enfant (garde-fou déjà en place dans `api/decodeur.ts`) : la traduction hérite de cette protection sans rien ajouter.

**Affichage** : la traduction apparaît dans un nouveau bloc sous le texte français, sans le remplacer — le parent garde la version française sous les yeux (utile pour en reparler avec l'enseignant, qui ne lira probablement pas le turc ou l'ukrainien).

**Backend** : nouvel endpoint `api/decodeur-langue.ts`, séparé de `api/decodeur.ts`. Plus simple : pas de grounding sur `guideDroits.ts` nécessaire (pure traduction, pas de reformulation ni de règles PIA à respecter), pas de sortie structurée clair/FALC (une seule chaîne traduite en sortie). Reçoit `{ texte, langue }`, `langue` validée côté serveur contre une liste fermée (`turc | arabe | albanais | ukrainien`) pour éviter tout prompt-injection sur le choix de langue.

## 3. Rappel FALC (correctif)

`DecodeurPia.tsx` importe et affiche `FALC_DISCLAIMER` (déjà exporté par `src/data/parentsFiches.ts`, réutilisé tel quel — même texte que sur les fiches et le Guide des droits). Affiché dans le bloc résultat, sous le texte décodé, visible en permanence dès qu'un résultat existe (indépendamment de l'état du toggle FALC/clair — cohérent avec le pattern déjà utilisé sur `ParentsFiche.tsx` et `GuideDroits.tsx`, où le disclaimer FALC est dans une zone fixe, pas conditionné au toggle).

## 4. Astuce traduction navigateur

Nouveau composant partagé `src/components/TipTraductionNavigateur.tsx` : bloc de texte court expliquant que le navigateur (Chrome, Edge...) propose une traduction automatique de page entière (clic droit → Traduire, ou icône dans la barre d'adresse), utile pour toutes les langues au-delà des 4 proposées par le Décodeur. Importé et affiché en bas de page sur les 4 pages de l'Espace Parents : `ParentsHome.tsx`, `ParentsFiche.tsx`, `GuideDroits.tsx`, `DecodeurPia.tsx`.

## 5. Modèle de données

```ts
export type LangueDecodeur = 'turc' | 'arabe' | 'albanais' | 'ukrainien';

export const LANGUES_DECODEUR: { id: LangueDecodeur; label: string }[] = [
  { id: 'turc', label: 'Türkçe' },
  { id: 'arabe', label: 'العربية' },
  { id: 'albanais', label: 'Shqip' },
  { id: 'ukrainien', label: 'Українська' },
];
```

## 6. Hors scope

Traduction du texte original collé (avant décodage) — toujours refusée, cohérence avec le principe déjà posé que seul le texte déjà décodé/nettoyé transite vers une nouvelle requête. Traduction de la mention RGPD elle-même (reste en français dans les deux versions). Sélection simultanée de plusieurs langues (tranché : un seul choix actif à la fois).

## 7. Vérification

- `npx tsc -b --noEmit` et `npx vite build` passent.
- Sur `/parents/decodeur` : après un décodage réussi, les 4 boutons de langue apparaissent ; cliquer sur un bouton affiche une traduction sous le texte français ; changer de langue remplace la traduction précédente sans dupliquer de bloc.
- Le rappel FALC apparaît dans le résultat du Décodeur, comme sur les fiches et le Guide des droits.
- L'astuce traduction navigateur apparaît en bas des 4 pages de l'Espace Parents.
- Aucune régression sur le décodage lui-même (chantier précédent, déjà en production).
