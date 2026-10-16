# Paramétrer Claude primaire et secondaire Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publier deux guides HTML pas à pas (primaire, secondaire) pour renseigner « Instructions pour Claude » et, en option, « Instructions enregistrées sur cet ordinateur », avec captures floutées et modèles à balises.

**Architecture:** Deux pages HTML autonomes dans `public/`, un script JS partagé (`parametrer-copier.js`) qui détecte les balises restantes avant copie, trois captures floutées par un script Python. Garde-fous par `node --test` sur le HTML (le projet n'a pas de framework de test).

**Tech Stack:** HTML/CSS inline au style PLAI, JS sans dépendance, Python 3.12 + Pillow 12.1, `node:test` (Node ESM, `"type":"module"`), Vite 8 pour le build du portail.

**Spec:** `docs/superpowers/specs/2026-10-16-parametrer-claude-primaire-secondaire-design.md`

## Global Constraints

- Branche `main`. `npx vite build` passe avant tout `git push`. **Aucun push sans accord de JF** (chaque push redéploie Vercel).
- Texte à l'écran 16 px minimum. Logo PLAI : `height` fixe, `width:auto`, jamais `width` = `height`.
- Contact public : `jf.beguin@outlook.com`, jamais `ens.ecl.be`.
- Exemples et vocabulaire FWB : jamais « collège », « lycée », « Éducation nationale ».
- Aucun nom d'élève, aucun nom ni e-mail de JF, aucun titre de session lisible dans une image publiée.
- Règle anti-devinette, texte exact : `Hypothèses (non données par moi)`.
- Chaque modèle d'instructions : 350 mots maximum, aucune balise imbriquée (`[ … [ … ] … ]` interdit). Balises : `[À COMPLÉTER : …]` obligatoire, `[OPTIONNEL : …]` facultative.
- Tutoiement. Aucun emoji. Aucune référence scientifique non vérifiée via `mcp__RISS__search_articles` (aucune citation n'est prévue).
- Les originaux non floutés ne sont jamais copiés dans `public/`.
- Les chemins ci-dessous sont relatifs à `C:\Users\jfbeg\OneDrive\claude-workspace\projets\portail-plai\`.

## Review Focus

1. Balise imbriquée dans un modèle : la détection regex se trompe et laisse passer une balise. Test dans la Task 1 (fonction) et la Task 3 (HTML).
2. `navigator.clipboard` absent ou refusé (page ouverte en `http`, vieux navigateur) : le bouton « Copier » doit sélectionner le texte et dire « Appuie sur Ctrl+C ». Vérifié en aperçu à la Task 3.
3. Image absente ou sans `alt` : page cassée pour un lecteur d'écran. Test HTML sur toutes les pages (Task 3).
4. Défilement horizontal à 375 px (tableaux, blocs `pre` larges). Vérifié en aperçu aux Tasks 3 et 4.
5. Donnée personnelle résiduelle dans une capture (nom « jf beguin », e-mail, titres de sessions). Test de chaînes dans le HTML + contrôle visuel obligatoire des trois images (Task 2).

---

### Task 1: Script de copie et détection des balises

**Files:**
- Create: `public/parametrer-copier.js`
- Create: `scripts/parametrer-guides.test.mjs`

**Interfaces:**
- Produces: `globalThis.PLAIParametrer.balisesRestantes(texte: string): { obligatoires: string[]; optionnelles: string[] }` ; `globalThis.PLAIParametrer.initBoutonsCopier(racine?: Document): void` (branche tous les `button[data-copier="<id>"]`).
- Marqueur HTML consommé : `<pre id="<id>" data-modele="instructions|locale|immersion">`, avertissement dans `<p data-avertissement-pour="<id>" hidden>`.

- [ ] **Step 1: Écrire les tests de `balisesRestantes` dans `scripts/parametrer-guides.test.mjs`.** Charger le script par `await import('../public/parametrer-copier.js')` puis lire `globalThis.PLAIParametrer`. Cas : texte sans balise → deux tableaux vides ; `Je suis [À COMPLÉTER : prénom], titulaire.` → `obligatoires` = `['[À COMPLÉTER : prénom]']` ; une balise `[OPTIONNEL : immersion]` va dans `optionnelles` ; deux balises obligatoires identiques sont comptées deux fois ; texte vide → tableaux vides.
- [ ] **Step 2: Lancer `node --test scripts/` ; attendu : FAIL (module ou fonction absent).**
- [ ] **Step 3: Implémenter `public/parametrer-copier.js`.** Script classique (pas de `export`), qui assigne `globalThis.PLAIParametrer`. `balisesRestantes` : regex `/\[À COMPLÉTER[^\]]*\]/g` et `/\[OPTIONNEL[^\]]*\]/g`. `initBoutonsCopier` : au clic, lit `textContent` du `pre` cible, appelle `navigator.clipboard.writeText` ; si absent ou rejeté, sélectionne le contenu du `pre` (`Selection`/`Range`) et affiche « Le texte est sélectionné : appuie sur Ctrl+C pour le copier » ; si des obligatoires restent, affiche dans l'élément d'avertissement « Il reste N balise(s) orange à remplacer : <liste> » sans bloquer la copie. Le bouton affiche « Copié » 2 secondes. Appel automatique sur `DOMContentLoaded` seulement si `document` existe (le test s'exécute sous Node).
- [ ] **Step 4: Lancer `node --test scripts/` ; attendu : PASS.**
- [ ] **Step 5: Commit** `feat: script de copie avec détection des balises restantes`.

### Task 2: Captures floutées

**Files:**
- Create: `scripts/flouter-captures.py`
- Create: `public/captures-parametrer/parametrer-01-menu-parametres.png`, `parametrer-02-profil.png`, `parametrer-03-zones-instructions.png`
- Modify: `docs/superpowers/specs/2026-10-16-parametrer-claude-primaire-secondaire-design.md` (section 9 : trois captures au lieu de quatre à six, sans capture claude.ai séparée car l'écran est identique ; section 4 idem)

**Interfaces:**
- Consumes: originaux `C:\Users\jfbeg\AppData\Local\Temp\claude\C--Users-jfbeg-OneDrive-claude-workspace\63313249-e87a-48b4-9717-2ce8cd927ff5\images\` : `4.png` (menu du profil), `3.png` (Profil, zones en bas), `2.png` (zones + boutons « Ne pas ajouter » / « Ajouter aux Instructions pour Claude »). `1.png` n'est pas utilisée.
- Produces: `python scripts/flouter-captures.py <dossier_originaux> public/captures-parametrer` écrit les trois PNG ; coordonnées d'ancrage des numéros notées en pourcentage dans un commentaire de tête du script (réutilisées aux Tasks 3 et 4).

- [ ] **Step 1: Ouvrir chaque original avec l'outil Read, noter les rectangles à flouter.** `4.png` : e-mail en haut du menu, titres des sessions visibles derrière le menu. `3.png` : « Nom complet », « Comment souhaitez-vous que Claude vous appelle ? », contenu des deux zones de texte. `2.png` : champ « appelle », contenu des deux zones de texte (garder lisibles les intitulés, le texte d'aide et les deux boutons).
- [ ] **Step 2: Implémenter `scripts/flouter-captures.py`.** Dictionnaire `{fichier_source: {sortie, rectangles}}`, flou `ImageFilter.GaussianBlur(14)` sur chaque rectangle, réduction à 1200 px de large maximum, sortie PNG optimisée. Exécuter avec `python -I`.
- [ ] **Step 3: Exécuter le script ; attendu : trois fichiers créés, chacun de moins de 400 Ko.**
- [ ] **Step 4: Contrôle visuel obligatoire : ouvrir chaque PNG produit avec Read.** Attendu : aucun mot lisible de votre nom, e-mail, instructions ou titres de sessions ; intitulés et boutons lisibles. Sinon corriger les rectangles et recommencer.
- [ ] **Step 5: Corriger le spec (section 4 et 9), puis commit** `feat: captures floutées des réglages Claude`.

### Task 3: Guide primaire

**Files:**
- Create: `public/guide-parametrer-claude-primaire.html`
- Modify: `scripts/parametrer-guides.test.mjs` (invariants de page, ci-dessous)

**Interfaces:**
- Consumes: `PLAIParametrer` (Task 1) ; les trois PNG (Task 2) ; variables CSS et classes de `../../shared/css/plai-style.css` recopiées dans le `<style>` de la page (les guides de `public/` sont autonomes, voir `guide-economiser-quota-claude.html`).
- Produces: URL `/guide-parametrer-claude-primaire.html` ; modèles `data-modele="instructions"`, `"immersion"`, `"locale"` ; la Task 4 réutilise la même structure.

- [ ] **Step 1: Écrire dans le test une fonction `pagesGuide = ['guide-parametrer-claude-primaire.html','guide-parametrer-claude-secondaire.html']` filtrée sur les fichiers existants, et ces tests par page :** contient `Hypothèses (non données par moi)` ; chaque `<pre data-modele>` fait au plus 350 mots et ne contient aucune balise imbriquée (regex `\[[^\]]*\[`) ; aucun `ens.ecl.be`, `collège`, `lycée`, `Éducation nationale`, `jf beguin` ; contient `jf.beguin@outlook.com` ; chaque `<img>` a un `alt` non vide et un `src` qui existe sous `public/` ; contient `/parametrer-copier.js`, `/plai-logo.jpg`, `Paramètres`, `Compte`, `Profil`, `effacées` ; le logo n'a pas `width` et `height` égaux ; toute valeur `font-size` en px est ≥ 16 et en rem ≥ 1 ; contient `name="viewport"` ; pas d'URI `data:`. Primaire seulement : modèles `instructions`, `immersion` et `locale` présents. Secondaire seulement : `instructions` et `locale` présents.
- [ ] **Step 2: Lancer `node --test scripts/` ; attendu : FAIL (page primaire absente → test de présence échoue).**
- [ ] **Step 3: Écrire la page primaire selon la spec, sections 5, 6, 7, 8, 10.** Ordre : bandeau contact, hero « 15 minutes », avant de commencer, étapes 1 à 5, option bureau + Cowork (zone locale), « Si ça ne marche pas », limites, footer. Modèle `instructions` : texte exact de la section 6 « Primaire », balises en `<span class="balise">` (orange) ou `<span class="balise facultative">` (gris). Modèle `immersion` : variante de la spec. Modèle `locale` : texte exact de la section 7, avec l'avertissement d'effacement en encadré. Étape 5 : les trois questions-pièges de la section 8. Chaque `<img>` : `<figure>` avec légende (« Capture du 2026-10-16, Windows, application de bureau »), cercles numérotés en CSS positionnés en pourcentage selon les ancrages de la Task 2, `alt` descriptif. Chaque modèle : bouton `data-copier` et `<p data-avertissement-pour hidden>`.
- [ ] **Step 4: Lancer `node --test scripts/` ; attendu : PASS.**
- [ ] **Step 5: Vérifier en aperçu (`preview_start` sur `portail-plai`, page `/guide-parametrer-claude-primaire.html`).** Attendu : aucune erreur console ; à 375 px de large pas de défilement horizontal (`document.documentElement.scrollWidth <= 375`) ; bouton « Copier » du modèle brut affiche « Il reste N balise(s) » ; avec `navigator.clipboard` forcé à `undefined` par `javascript_tool`, le message « appuie sur Ctrl+C » apparaît ; capture d'écran des étapes 1 à 3.
- [ ] **Step 6: Commit** `feat: guide Paramétrer Claude primaire`.

### Task 4: Guide secondaire

**Files:**
- Create: `public/guide-parametrer-claude-secondaire.html`

**Interfaces:**
- Consumes: structure et styles de la Task 3 ; tests `pagesGuide` de la Task 3 (la page est testée dès sa création).
- Produces: URL `/guide-parametrer-claude-secondaire.html` ; modèles `instructions` et `locale`.

- [ ] **Step 1: Lancer `node --test scripts/` avec une page secondaire vide créée (`<html></html>`) ; attendu : FAIL sur les invariants.**
- [ ] **Step 2: Écrire la page : même squelette que la Task 3, sans variante immersion.** Modèle `instructions` : six blocs de la section 6 selon la variante « Secondaire » (prénom, discipline(s), degré(s), école communale, commune, filière ; classes `S2 A` / `S4 qualifiante`, effectif, profils anonymisés ; référentiels et épreuves CE1D, CESS, CQ selon le cas ; option, internat, public, pouvoir organisateur ; ENT, outils de l'école, manuels par discipline). Texte de la règle anti-devinette identique mot pour mot. Modèle `locale` : identique à la Task 3 avec dossiers « par discipline ». Exemples : aucun lié à la France.
- [ ] **Step 3: Lancer `node --test scripts/` ; attendu : PASS (les deux pages).**
- [ ] **Step 4: Aperçu à 375 px comme en Task 3, step 5 ; attendu : mêmes résultats.**
- [ ] **Step 5: Commit** `feat: guide Paramétrer Claude secondaire`.

### Task 5: Guide existant et vignettes du portail

**Files:**
- Modify: `public/guide-parametrer-claude-plai.html` (chapitre Instructions : encadré de renvoi vers les deux guides, « Settings → Instructions for Claude » remplacé par « Paramètres → Compte → Profil », « Settings → Profile » corrigé de même, e-mail `jeanfrancois.beguin@ens.ecl.be` remplacé par `jf.beguin@outlook.com` dans le bandeau et le `mailto`)
- Modify: `src/data/apps.ts` (deux entrées après `claude-parametrer`, mêmes champs : `id` `claude-parametrer-primaire` et `claude-parametrer-secondaire`, `audience: 'enseignant'`, `category: 'Guide'`, `status: 'disponible'`, `color: 'teal'`, `section: 'claude'`, `url` des deux pages, `emoji` choisi sans doublon visuel avec la vignette voisine, description de 2 phrases qui cite les deux zones et les captures)

**Interfaces:**
- Consumes: URLs des Tasks 3 et 4.

- [ ] **Step 1: Ajouter au test un cas sur `guide-parametrer-claude-plai.html` :** ne contient plus `Settings →` ni `ens.ecl.be`, contient `guide-parametrer-claude-primaire.html` et `guide-parametrer-claude-secondaire.html`. Un second cas lit `src/data/apps.ts` et vérifie la présence des deux `id` et des deux `url`.
- [ ] **Step 2: `node --test scripts/` ; attendu : FAIL.**
- [ ] **Step 3: Modifier les deux fichiers.** Ne rien réécrire d'autre dans le guide existant.
- [ ] **Step 4: `node --test scripts/` ; attendu : PASS. Puis `npx vite build` ; attendu : build sans erreur.**
- [ ] **Step 5: Commit** `feat: vignettes et renvois vers les guides primaire et secondaire`.

### Task 6: Recette et mise en ligne

**Files:**
- Create: `C:\Users\jfbeg\OneDrive\claude-workspace\memory\parametrer-claude-guides.md` (note de session : état, décisions, reste à faire) et une ligne dans `MEMORY.md`

- [ ] **Step 1: Relire les deux pages en aperçu, desktop puis 375 px ; attendu : aucune erreur console, captures lisibles, boutons fonctionnels.**
- [ ] **Step 2: Remettre à JF le chemin complet des deux fichiers (`C:\Users\jfbeg\OneDrive\claude-workspace\projets\portail-plai\public\guide-parametrer-claude-primaire.html` et `…-secondaire.html`) pour recette** : lecture par un·e collègue, test des trois questions-pièges dans une conversation neuve avec le modèle rempli de données fictives.
- [ ] **Step 3: Après recette de JF, demander l'accord explicite de JF pour `git push origin main`.** Après push : vérifier les deux URLs sur `https://portail-plai.vercel.app/…`.
- [ ] **Step 4: Écrire la note mémoire et son entrée d'index.**

## Erratum (2026-10-16)

L adresse de contact des modes d emploi PLAI est jeanfrancois.beguin@ens.ecl.be (bandeau support standard, tous les guides du portail). Les mentions contraires de ce document (adresse outlook, interdiction de ens.ecl.be) sont caduques. L adresse outlook ne vaut que pour les pages grand public de jfb4plai.com.
