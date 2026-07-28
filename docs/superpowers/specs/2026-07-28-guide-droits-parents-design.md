# Guide des droits — Espace Parents — Design

## 1. Contexte et objectif

Deuxième des 5 chantiers de l'Espace Parents (le premier — zone + 9 fiches RISS-FALC par trouble — est livré et en production sur `/parents`). Ce chantier ajoute une page unique expliquant aux parents leurs droits et les démarches concrètes en matière d'aménagements pour leur enfant en Fédération Wallonie-Bruxelles, du cadre international au recours en cas de désaccord.

Contrairement aux 9 fiches troubles (vérifiées via le corpus RISS, littérature scientifique), ce chantier s'appuie sur des **textes officiels** : conventions internationales, décret FWB, textes réglementaires. La vérification se fait par recherche des sources primaires (déjà effectuée pour ce spec via recherche web sur les textes officiels — `etaamb.openjustice.be`, `un.org`, `pactepourunenseignementdexcellence.cfwb.be`), pas via `mcp__RISS__search_articles`.

## 2. Sources vérifiées (textes officiels réels, pas de mémoire générale)

- **Convention relative aux droits des personnes handicapées (ONU, CRPD)**, article 24 : "Les États Parties reconnaissent le droit des personnes handicapées à l'éducation. En vue d'assurer l'exercice de ce droit sans discrimination et sur la base de l'égalité des chances, les États Parties font en sorte que le système éducatif pourvoie à l'insertion scolaire à tous les niveaux." — texte officiel, ratifié par la Belgique.
- **Décret du 7 décembre 2017** relatif à l'accueil, à l'accompagnement et au maintien dans l'enseignement ordinaire fondamental et secondaire des élèves présentant des besoins spécifiques (source primaire : `etaamb.openjustice.be/fr/decret-du-07-decembre-2017_n2018010181.html`) :
  - **Art. 2** : définition de l'aménagement raisonnable — "mesures appropriées, prises en fonction des besoins dans une situation concrète", sauf si charge disproportionnée.
  - **Art. 102/1 §1** : tout élève de l'enseignement ordinaire présentant des besoins spécifiques a droit à des aménagements raisonnables matériels, organisationnels ou pédagogiques, tant que sa situation ne rend pas indispensable un enseignement spécialisé.
  - **Art. 102/1 §6** : les aménagements pédagogiques suivent un Plan Individualisé d'Apprentissage (PIA), sur base des méthodes du décret du 30 juin 2006.
  - **Art. 102/2 §1** : possibilité de conciliation, demande dans le mois suivant la demande initiale.
  - **Art. 102/2 §2** : en cas d'échec de la conciliation, recours possible devant la Commission de l'enseignement obligatoire inclusif dans les 10 jours ouvrables ; décision de la commission sous 30 jours calendrier (ou au plus tard le 31 juillet si le recours est introduit après le 1er juin) ; une décision favorable de la commission s'impose à l'école.
- **Pôles territoriaux** (source : `pactepourunenseignementdexcellence.cfwb.be`) : 48 pôles en FWB depuis 2022-2023, équipes pluridisciplinaires (enseignants, éducateurs, logopèdes, kinés), mission d'aide aux enfants à besoins spécifiques et à leurs enseignants pour rester en enseignement ordinaire.
- **CPMS** : rôle d'interface entre l'école et les parents, notamment en cas de désaccord ; vision longitudinale du parcours de l'élève.

Toute mise à jour future de ce contenu doit revérifier ces sources (une circulaire ou un article peut être modifié) — voir §7 (avertissement).

## 3. Architecture

- `src/pages/GuideDroits.tsx` — nouvelle page, route `/parents/droits`. Une seule page à sections ancrées (pas un mini-index séparé — cohérent avec le choix validé : une seule page en sections).
- `src/data/guideDroits.ts` — nouveau fichier de données : les sections (avec deux niveaux de lecture, comme les fiches) et la liste des sources officielles.
- `ParentsHome.tsx` (existant) — ajoute une 10e carte pointant vers `/parents/droits`, distincte visuellement des 9 fiches troubles (catégorie différente : pas un trouble, un guide).
- Pas de nouveau type de route générique : `/parents/droits` est une route dédiée dans `App.tsx`, pas une variante de `/parents/:troubleId` (le contenu et la structure — sections multiples avec ancres — diffèrent trop d'une fiche trouble pour partager `ParentsFiche.tsx`).

## 4. Modèle de contenu

```ts
export type GuideSection = {
  id: string;           // ancre, ex. 'cadre-international'
  titre: string;
  clair: string;
  falc: string;
};

export type SourceOfficielle = {
  citation: string;      // ex. "Décret du 7 décembre 2017, art. 102/1 §1"
  url: string;
  note?: string;          // précision, ex. "Vérifier la version consolidée en vigueur"
};

export type GuideDroits = {
  sections: GuideSection[];
  sources: SourceOfficielle[];
};
```

Distinct du modèle `ParentFiche` : ici pas de découpage fixe en 3 blocs (c'est quoi / ce que ça change / comment aider), mais une liste de sections ordonnées, chacune avec ses deux niveaux de lecture. Les sources sont des textes officiels (citation + URL), pas des références RISS (pas de champ `content` résumant un article scientifique — la citation renvoie directement au texte de loi).

## 5. Sections de la page (contenu, dans l'ordre)

1. **Le droit à l'éducation inclusive** — CRPD art. 24, ratifiée par la Belgique : le droit existe au niveau international, pas seulement en FWB.
2. **Ce que dit la loi en Fédération Wallonie-Bruxelles** — décret du 7/12/2017 : définition de l'aménagement raisonnable (art. 2), droit de l'élève (art. 102/1 §1), le PIA (art. 102/1 §6).
3. **Qui fait quoi** — direction d'école (décision), CPMS (interface, vision longitudinale), Pôle territorial (accompagnement pluridisciplinaire).
4. **Comment demander un aménagement** — réunion de concertation (direction, conseil de classe ou représentants, CPMS, parents/élève majeur) aboutissant à un protocole d'aménagements raisonnables.
5. **En cas de désaccord** — procédure réelle : conciliation (1 mois) puis recours devant la Commission de l'enseignement obligatoire inclusif (10 jours ouvrables, décision sous 30 jours) ; **cadré explicitement comme dernier recours** — la concertation directe avec la direction et le CPMS reste la voie à privilégier avant tout recours formel, y compris quand la loi donne raison au parent, parce que c'est ce qui sert le mieux l'élève au quotidien.

Chaque section existe en deux versions (`clair` / `falc`), toggle commun à toute la page (pas par section) — cohérence avec le choix validé "même pattern que les fiches", mais une page à sections longues bascule mieux d'un coup que section par section.

## 6. Bandeau et avertissement

- **Bandeau permanent en tête de page** (même principe que `BANDEAU_INDIVIDUALISATION` des fiches troubles, réutilisé tel quel) : rappelle que chaque situation est particulière.
- **Avertissement de fin de page**, nouveau contenu spécifique à ce guide (pas le `FALC_DISCLAIMER` des fiches troubles, qui concerne la simplification de contenu scientifique — ici l'enjeu est différent) :
  > Ce guide n'est pas un conseil juridique personnalisé. Les textes cités peuvent évoluer (circulaires mises à jour chaque année) — vérifiez la version en vigueur auprès de votre école ou du Pôle territorial. La voie du dialogue avec la direction et le CPMS reste toujours à privilégier, même quand un recours formel est possible : c'est ce qui sert le mieux votre enfant.

## 7. Sources affichées en bas de page

Liste des textes officiels cités (§2), chacun avec sa citation exacte et un lien vers le texte primaire (`etaamb.openjustice.be`, `un.org`, `pactepourunenseignementdexcellence.cfwb.be`). Étiquette "Sources officielles" — distincte de l'étiquette "Sources (corpus RISS)" utilisée sur les fiches troubles, pour ne pas laisser croire que ce contenu a suivi le même circuit de vérification scientifique.

## 8. Carte sur l'index `/parents`

Nouvelle carte dans la grille de `ParentsHome.tsx`, avec un visuel légèrement différent des 9 cartes-troubles (ex. bordure ou icône distincte — ⚖️) pour signaler que ce n'est pas une fiche-trouble mais un guide transversal. Placée en premier ou en dernier dans la grille (à trancher en phase de plan, décision de layout mineure).

## 9. Hors scope

Décodeur PIA/bulletin, Ateliers pour parents, toggle FALC transversal au reste du portail : chantiers 2 (au sens numérotation initiale), 4 et 5, non traités ici. Ce guide **définit** ce qu'est un PIA (§5.2) mais ne traite pas encore de la conversion d'un PIA réel en langage clair — c'est le rôle du futur Décodeur.

## 10. Vérification

Pas de test automatisé (cohérent avec le reste du portail). Vérification manuelle prévue à l'implémentation :
- `npx tsc -b --noEmit` et `npx vite build` doivent passer.
- Navigation `/parents` → carte Guide des droits → `/parents/droits`, ancres fonctionnelles, toggle FALC bascule bien les 5 sections.
- Vérifier qu'aucun lien de sortie du Navbar n'apparaît sur `/parents/droits` (même restriction que le reste de l'Espace Parents, déjà en place globalement dans `Navbar.tsx` via `isParentsZone`).
