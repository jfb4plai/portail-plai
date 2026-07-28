# Décodeur PIA/bulletin — Espace Parents — Design

## 1. Contexte et objectif

Troisième chantier de l'Espace Parents (zone + 9 fiches RISS-FALC et Guide des droits sont livrés et en production sur `/parents`). Ce chantier ajoute un outil qui traduit en langage clair (avec option FALC) un texte déjà rédigé par l'école — extrait de PIA, bulletin, rapport logopédique — que le parent colle dans une zone de texte.

Contrairement aux deux chantiers précédents (contenu statique pré-écrit), c'est le premier outil **génératif** de l'Espace Parents : appel à Claude Haiku via une fonction serverless Vercel, sur le modèle déjà en place pour Copernic (`api/boussole.ts`).

## 2. Enjeu RGPD — pourquoi ce chantier est différent des précédents

Un extrait de PIA ou de bulletin contient potentiellement le nom réel de l'enfant, un diagnostic, des difficultés précises. C'est la donnée la plus sensible de tout le portail — à l'opposé des codes anonymes utilisés partout ailleurs (RetroActif, Corpus Actif...). Décisions actées en brainstorming :

- **Aucune persistance côté serveur** : le texte collé part vers l'API Claude pour une seule requête, puis disparaît. Pas d'historique de conversation (voir §3 — format en un clic, pas un chat).
- **Format en un clic plutôt que chat** : un chat accumulerait la donnée sensible sur plusieurs échanges, renvoyant tout l'historique à chaque question de suivi. Le format "coller → traduire" n'envoie le texte qu'une fois. Un chat pourra être envisagé plus tard si le besoin de questions de suivi se confirme à l'usage — pas dès la v1, sur le contenu le plus sensible du portail.
- **Case à cocher obligatoire** avant d'activer le bouton Traduire : "J'ai retiré le nom de mon enfant du texte ci-dessous." Un bandeau seul est trop facilement ignoré (comme des CGU) ; une case à cocher force une interaction active, cohérente avec la rigueur déjà appliquée ailleurs sur PLAI (codes anonymes obligatoires, jamais de nom).

## 3. Architecture

- `src/pages/DecodeurPia.tsx` — nouvelle page, route `/parents/decodeur`. Zone de texte + case à cocher + bouton Traduire + résultat avec toggle clair/FALC.
- `api/decodeur.ts` — nouvelle fonction serverless, sur le modèle exact de `api/boussole.ts` : Claude Haiku, `ANTHROPIC_API_KEY` déjà configurée côté serveur (réutilisée, pas de nouveau secret), stateless, une requête = une réponse (pas d'historique de messages à gérer côté client au-delà du texte collé et de la réponse).
- `ParentsHome.tsx` — 11e carte, distincte visuellement des fiches (teal) et du Guide des droits (ambre) — bleu, icône 🔍.
- Route `/parents/decodeur` héritée automatiquement des restrictions déjà en place (`isParentsZone` dans `Navbar.tsx`, exclusion de Copernic dans `BoussoleChat.tsx`) — aucune modification nécessaire à ces fichiers.

## 4. Cohérence avec le Guide des droits

Le prompt système de `api/decodeur.ts` injecte le contenu de `guideDroits.ts` comme contexte — même pattern que `api/boussole.ts` qui injecte `apps.ts`. Objectif : que le Décodeur explique "PIA" ou "aménagement raisonnable" exactement comme `/parents/droits` le fait déjà, sans risque de divergence entre deux sources d'explication du même terme.

## 5. Flux détaillé de la page

1. **Bandeau RGPD** en tête, avant la zone de texte : consigne explicite de remplacer le nom de l'enfant par `[enfant]` avant de coller.
2. **Case à cocher obligatoire** : "J'ai retiré le nom de mon enfant du texte ci-dessous." Le bouton Traduire reste désactivé tant qu'elle n'est pas cochée.
3. **Zone de texte** (textarea) pour coller l'extrait. Limite de longueur (alignée sur le `MAX_MESSAGE_CHARS` déjà pratiqué côté API pour Copernic, mais un document est plus long qu'un message de chat — limite dédiée, plus généreuse, ex. 4000 caractères) avec message d'erreur clair si dépassement, avant l'appel réseau.
4. **Bouton Traduire** → `POST /api/decodeur` avec le texte collé.
5. **Résultat** : affiché sous la zone de texte, avec toggle clair/FALC (même composant visuel que les fiches et le Guide des droits — bouton `🔤 Version FALC`, `aria-pressed`).
6. **Pied de résultat** : rappel RGPD (sur le modèle de `RGPD_NOTE` dans `boussole.ts`) + rappel explicite "ceci n'est pas une interprétation officielle — en cas de doute, vérifiez avec l'enseignant ou le CPMS", cohérent avec le principe dialogue-d'abord déjà posé dans l'avertissement du Guide des droits.
7. **Bandeau d'individualisation** (`BANDEAU_INDIVIDUALISATION`, réutilisé tel quel) affiché en permanence, comme sur les autres pages de l'Espace Parents.

## 6. Contraintes du prompt système (`api/decodeur.ts`)

- Traduire/clarifier strictement le texte fourni par le parent — ne jamais inventer d'information absente du texte source.
- Ne jamais formuler de conseil juridique ou de recommandation médicale — renvoyer vers `/parents/droits` et le dialogue école/CPMS pour ces questions (cohérence avec §2 de ce même document et avec le Guide des droits).
- Ne jamais reproduire de nom propre repéré dans le texte source dans la réponse — si un nom apparaît malgré la case cochée, le neutraliser (ex. "l'enfant", "il/elle") plutôt que le répéter tel quel, comme filet de sécurité supplémentaire derrière la case à cocher.
- Répondre en deux versions (clair / FALC) dans une structure exploitable côté client (JSON structuré, comme `routeQuery` dans `boussole.ts` utilise déjà `output_config.format` pour éviter le texte enrobé en Markdown).

## 7. Modèle de données (types)

```ts
export type DecodeurResponse = {
  clair: string;
  falc: string;
};
```

Pas de nouveau type de contenu statique (`ParentFiche`/`GuideDroits`) — la réponse est générée à la volée, pas stockée dans `src/data/`.

## 8. Hors scope

Chat de suivi (voir §2 — différé), toggle FALC transversal au reste du portail (chantier 5, non traité ici), Ateliers pour parents (chantier 4, non traité ici — mais pourra référencer le Décodeur une fois livré).

## 9. Vérification

Pas de test automatisé (cohérent avec le reste du portail). Vérification manuelle prévue à l'implémentation, avec `vercel dev` (pas `vite dev` seul — la fonction serverless `/api/decodeur` ne tourne pas sous `vite dev`, règle déjà documentée dans le CLAUDE.md du projet) :
- `npx tsc -b --noEmit` et `npx vite build` passent.
- Navigation `/parents` → carte Décodeur → `/parents/decodeur`.
- Bouton Traduire désactivé tant que la case n'est pas cochée.
- Dépassement de la limite de caractères bloqué côté client avec message clair.
- Appel réel à `/api/decodeur` avec un texte de test (sans donnée réelle) retourne une réponse structurée clair/FALC, toggle fonctionnel.
- Confirmer qu'aucun lien de sortie du Navbar ni Copernic n'apparaissent sur `/parents/decodeur` (héritage automatique, à vérifier quand même).
