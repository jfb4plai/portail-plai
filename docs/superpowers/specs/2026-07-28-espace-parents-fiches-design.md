# Espace Parents — zone dédiée + fiches RISS-FALC par trouble — Design

## 1. Contexte et objectif

Le portail PLAI (`portail-plai.vercel.app`) est aujourd'hui entièrement pensé pour un public enseignant : les ~30 entrées de `src/data/apps.ts` ont toutes `audience: 'enseignant'` ou `'enseignant + élève'`. Aucune n'adresse les parents d'élèves à besoins spécifiques, alors que le décret inclusion FWB les inscrit comme partenaires du PIA. C'est un angle mort par rapport au principe fondateur #1 (inclusion réelle) de la mission PLAI.

Ce spec couvre le **premier des 5 chantiers** identifiés pour combler ce manque :
1. **Zone Parents + fiches RISS-FALC par trouble** ← ce spec
2. Décodeur PIA/bulletin (hors scope)
3. Guide des droits, sourcé ONU/UNESCO/décrets/circulaires (hors scope)
4. Ateliers de sensibilisation pour parents, dérivés des fiches (hors scope, dépend de #1)
5. Toggle FALC transversal au reste du portail (hors scope, prématuré tant qu'un seul chantier a du contenu FALC)

## 2. Périmètre des 9 fiches

Les 4 troubles déjà traités ailleurs sur le portail (par Atelier Dyslexie, Atelier Maya, et le corpus RISS mobilisé dans ces apps) : **dyslexie, dyscalculie, TDAH, TSA**.

Plus 5 situations non encore couvertes : **troubles visuo-spatiaux, troubles du langage oral / dysphasie, dyspraxie / troubles moteurs, haut potentiel / précocité, anxiété scolaire / phobie scolaire**.

## 3. Architecture

Aucun nouveau mécanisme de rendu de fond — on suit le pattern React Router déjà en place dans `App.tsx` (routes déclaratives, `Navbar` commun, `Footer` commun) :

- `src/pages/ParentsHome.tsx` — nouvelle page, route `/parents`. Grille de 9 cartes (une par trouble/situation).
- `src/pages/ParentsFiche.tsx` — nouvelle page, route `/parents/:troubleId`. Affiche une fiche à partir de `troubleId` (`useParams`).
- `src/data/parentsFiches.ts` — nouveau fichier de données, un tableau de 9 entrées typées `ParentFiche` (voir §5). Séparé de `apps.ts` : structure de contenu différente (deux niveaux de lecture, 4 blocs fixes), pas un `AppItem`.
- `Navbar.tsx` — ajout d'un lien "Espace Parents" pointant vers `/parents`, à côté de "Guides" et "VoixActif".
- `App.tsx` — ajout des deux routes.

**Accès** : libre, sans compte, sans Supabase. Aucune donnée personnelle stockée pour ce chantier (pas de suivi de lecture, pas de favoris — cohérent avec le choix "accès libre" validé).

## 4. Identité visuelle

Style validé après maquette comparative (3 pistes montrées, l'option B retenue) : **identité PLAI actuelle inchangée** (teal `#134e4a`, police Inter, logo PLAI), pas de nouvelle palette. Seuls changements par rapport au reste du portail :
- Police et espacements agrandis (au moins équivalent au seuil 16px déjà en vigueur, viser plus large ici vu le public)
- Boutons plus grands, moins de densité d'information par écran

Ce choix évite un système de design parallèle à maintenir et garantit que le parent reconnaît "l'outil de l'école" — au prix d'une différenciation visuelle plus faible entre zone pro et zone parents. Compensé par le contenu et le ton, pas par la couleur.

## 5. Modèle de contenu d'une fiche

```ts
interface ParentFicheBlock {
  clair: string;   // langage clair, détaillé
  falc: string;    // FALC : phrases courtes, une idée par phrase
}

interface ParentFiche {
  id: string;              // ex. 'dyslexie', utilisé dans l'URL /parents/:id
  emoji: string;
  titre: string;            // ex. "Comprendre la dyslexie"
  bandeau: string;          // rappel individualisation — fixe, pas de version FALC séparée (texte déjà court)
  bloc1_c_est_quoi: ParentFicheBlock;
  bloc2_ce_que_ca_change: ParentFicheBlock;
  bloc3_comment_aider: ParentFicheBlock;
  sources: {
    citation: string;
    content: string;
    id?: string;           // identifiant RISS si disponible
  }[];
  falcDisclaimer: string;   // fixe : "inspiré du FALC, non certifié" — mention obligatoire, cf. Picto Lecture
}
```

Les blocs 1 à 3 existent en deux versions (`clair` / `falc`) ; le bandeau et les sources ne changent pas entre les deux modes d'affichage.

## 6. Structure d'une page fiche (`ParentsFiche.tsx`)

Dans l'ordre, de haut en bas :

1. **Header de fiche** : titre + bouton toggle "Version FALC" en haut à droite. Le toggle est local à la fiche (état React `useState`), pas un réglage global au portail.
2. **Bandeau permanent** sous le titre, discret mais non fermable : rappel qu'un enfant dyslexique (ou TDAH, TSA...) n'est pas l'autre — la fiche donne des repères généraux, ce qui compte est la difficulté réelle vécue par l'enfant en classe, pas l'étiquette diagnostique. Affiché quel que soit le mode (clair/FALC).
3. **Bloc 1 — C'est quoi, en clair**
4. **Bloc 2 — Ce que ça change concrètement pour cet enfant, à l'école et à la maison**
5. **Bloc 3 — Comment aider au quotidien**
6. **Bloc 4 — Sources RISS**, avec la mention fixe "inspiré du FALC, non certifié" (le FALC officiel exige une relecture participative par une personne porteuse de déficience intellectuelle — cf. justification déjà utilisée pour Picto Lecture et RituActif, `tel-04807443`)

## 7. Règle de rédaction transversale (les 9 fiches × 2 niveaux)

Jamais de généralisation déficitaire ("les enfants dyslexiques ont besoin de..."). Toujours individualisé : "certains enfants dyslexiques peuvent rencontrer X — ce qui compte, c'est ce que vit concrètement votre enfant". Cette règle s'applique aux blocs 1 à 3, dans les deux versions (clair et FALC), et est distincte du bandeau (qui la rend explicite une fois, le style d'écriture doit la respecter partout).

## 8. Vérification RISS (obligatoire, par fiche)

Conformément à la règle absolue PLAI, chaque fiche est vérifiée via `mcp__RISS__search_articles` **avant** rédaction du contenu — pas après. Ce spec fige la structure et le processus, pas les références : les 9 fiches seront écrites et vérifiées une à une pendant l'implémentation, dans l'ordre des 4 troubles déjà couverts par le portail (réutilisation directe des références déjà validées pour Atelier Dyslexie / Atelier Maya) puis les 5 situations nouvelles.

Pour les situations sans équivalent RISS suffisant, appliquer la règle déjà en vigueur ailleurs sur le portail : mentionner explicitement "réel, hors corpus RISS" plutôt que d'omettre ou d'inventer une source.

## 9. Page d'accueil (`ParentsHome.tsx`)

Titre d'intro + grille de 9 cartes (2 colonnes sur mobile, plus large sur desktop), une par fiche : emoji + titre court, lien vers `/parents/:id`. Pas de filtre/recherche pour ce volume (9 items) — à reconsidérer si le périmètre s'élargit lors des chantiers suivants.

## 10. Tests / vérification

Pas de suite de tests automatisés existante sur le portail pour ce type de contenu (les autres pages sont des rendus de données statiques). Vérification manuelle prévue :
- `npx vite build` doit passer sans erreur avant tout push (règle absolue du projet)
- Navigation `/parents` → clic sur une carte → `/parents/:id` → toggle FALC bascule bien le contenu des blocs 1-3 sans recharger la page
- Bandeau individualisation visible et identique dans les deux modes
- Vérifier au moins une fiche par groupe (une des 4 existantes, une des 5 nouvelles) en `vercel dev` local avant déploiement

## 11. Hors scope (rappel)

Décodeur PIA/bulletin, Guide des droits, Ateliers pour parents, toggle FALC transversal au reste du portail : chantiers 2 à 5, spécifiés séparément. Le lien entre les Ateliers pour parents (chantier 4) et les fiches (ce chantier) sera conçu une fois ce chantier livré, pas anticipé ici.
