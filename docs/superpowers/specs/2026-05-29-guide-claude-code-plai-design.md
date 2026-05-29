# Design — Guide Claude Code PLAI

**Date :** 2026-05-29
**Fichier cible :** `public/guide-claude-code-plai.html`
**Statut :** Approuvé pour implémentation

---

## 1. Objectif et public

**Promesse :** un enseignant niveau 1 (zéro terminal, zéro code) repart avec une app pédagogique déployée en ligne et une URL à partager à ses collègues.

**Publics :**
- **Cible principale B** — l'enseignant qui a une idée d'outil et veut la concrétiser
- **Secondaire A** — l'enseignant curieux qui veut comprendre sans forcément faire
- **Secondaire D** — Jean-François lui-même, documentation de référence de la méthode PLAI

**Niveau technique supposé :** zéro. Jamais ouvert un terminal, ne sait pas ce qu'est Git.

---

## 2. Architecture du guide

**Titre :** *Claude Code — Construire ses propres outils pédagogiques*
**Sous-titre :** *De l'idée à l'URL en production — sans être développeur*
**Fichier :** `public/guide-claude-code-plai.html`

### Nav sticky — 6 ancres

`#pourquoi` · `#apps-possibles` · `#trilogie` · `#tutoriel` · `#supabase` · `#prochaine-app`

### Partie A — Comprendre et choisir *(publics A + D)*

| Section | Contenu |
|---|---|
| `#pourquoi` | Ce que Claude Code fait que Claude.ai ne peut pas faire seul. Analogie : Claude.ai = conseiller, Claude Code = entrepreneur qui construit. Mention Superpowers. |
| `#apps-possibles` | Galerie de 12 apps pédagogiques en 3 niveaux de complexité. Chaque app : nom, intérêt pédagogique, badge RGPD (🟢/🟡/🔴), stack minimale. |
| `#trilogie` | Les 3 briques + options avancées. Chaque brique expliquée par le problème qu'elle résout. Tableau comparatif avec profil RGPD. |

### Partie B — Construire et déployer *(public B)*

| Section | Contenu |
|---|---|
| `#tutoriel` | Fil rouge QCM generator. 6 étapes balisées avec durées, blocs "À écrire dans Claude Code", points de variation pour d'autres apps. |
| `#supabase` | Extension base de données. Quand l'ajouter, comment, pourquoi Europe obligatoire. |
| `#prochaine-app` | Checklist de démarrage pour sa propre idée. `/brainstorming` comme première commande. |

---

## 3. Galerie d'apps pédagogiques

### Niveau 🟢 — Sans données, zéro RGPD
*Déployable en 30 min, aucune authentification*

| App | Intérêt pédagogique |
|---|---|
| Générateur de QCM | Colle un texte → reçoit 5 questions à choix multiple. Différenciation immédiate. **App fil rouge du tutoriel.** |
| Minuteur de classe paramétrable | Phases travail / pause / restitution visibles par tous. Gestion du temps explicite. |
| Convertisseur d'unités pédagogique | Explique le raisonnement, pas juste le résultat. Dyscalculie-friendly. |
| Générateur de consignes simplifiées | Consigne complexe → 3 versions (standard / simplifié / FALC). |
| Dé de classe virtuel | Pioche aléatoire d'élève, groupe ou rôle. Paramétrable. |

### Niveau 🟡 — Données locales (localStorage), RGPD minimal
*Données stockées dans le navigateur — rien ne quitte l'appareil*

| App | Intérêt pédagogique |
|---|---|
| Journal de bord de lecture | L'élève note ses livres et impressions. Persiste entre sessions sur le même appareil. |
| Suivi de compétences auto-évalué | L'élève coche ses compétences maîtrisées. L'enseignant ne voit rien — intentionnel. |
| Flashcards personnalisables | L'enseignant crée le deck, les élèves s'entraînent. Scores stockés localement. |

### Niveau 🔴 — Données utilisateur (Supabase), RGPD complet requis
*Compte, authentification, données persistantes multi-appareils*

| App | Intérêt pédagogique |
|---|---|
| RetroActif | Rétroaction différenciée par compétence. Historique par élève (code anonyme). **Construite par un enseignant PLAI avec Claude Code — visible sur retroactif.jfb4plai.com** |
| Carnet de suivi de classe | Observations par élève. Multi-appareils, accès sécurisé. |
| Générateur de fiches différenciées | Paramètres sauvegardés par enseignant. Profils d'élèves réutilisables. |
| Quiz avec résultats par classe | Les élèves se connectent, répondent, l'enseignant voit les résultats agrégés. |

---

## 4. La trilogie — contenu détaillé

### Analogie centrale
> *"Claude Code est l'artisan. Le dossier claude-workspace est son atelier. GitHub est son carnet de chantier. Vercel est la vitrine ouverte au public."*

### Brique 1 — `claude-workspace` (l'atelier local)

- **C'est quoi ?** Un dossier sur l'ordinateur où vit le code des apps.
- **Pourquoi pas le bureau ?** Organisation, Claude Code s'y retrouve entre les sessions, chemins stables.
- **RGPD :** Les données restent sur la machine — aucune fuite possible à ce stade.

### Brique 2 — GitHub (le carnet de chantier)

- **C'est quoi ?** Un service qui conserve l'historique de chaque modification.
- **Pourquoi ?** Retour en arrière en une commande si quelque chose casse. Sauvegarde hors machine.
- **RGPD :** Dépôt public ou privé au choix. **Règle absolue : jamais de clés API ni de données élèves dans le code.**
- **Compte :** Gratuit. Compte `jfb4plai` comme modèle de référence.

### Brique 3 — Vercel (la vitrine)

- **C'est quoi ?** Un service qui transforme le code GitHub en URL accessible à tous.
- **Pourquoi pas envoyer le fichier HTML par mail ?** Mises à jour automatiques, URL stable, HTTPS, mobile.
- **RGPD :** Apps sans données = sans risque. Vercel hébergé aux États-Unis — **à mentionner à la direction si l'app collecte des données.**
- **Compte :** Gratuit, connexion via GitHub.

### Options avancées

| Option | Quand l'ajouter | Ce qu'elle résout | RGPD |
|---|---|---|---|
| **Supabase** | Dès qu'on veut un compte utilisateur ou sauvegarder entre sessions | Base de données PostgreSQL + authentification | **Choisir la région Europe obligatoirement pour des données élèves** |
| **Upstash** | Si l'app fait des appels IA fréquents | Rate limiting — limite les requêtes par utilisateur | Données éphémères, pas de stockage nominatif |
| **Variables d'environnement Vercel** | Dès qu'une clé API entre dans le projet | Clés secrètes invisibles dans le code public | **Jamais de clé API dans le code — toujours dans les variables Vercel** |
| **Superpowers** | Dès que les apps deviennent complexes ou livrées à d'autres | Impose la méthode brainstorming → plan → TDD → revue. Évite les apps qui marchent en démo mais cassent en classe. | — |

Lien Superpowers → `superpowers-guide.html` (guide existant sur le portail).

### Callout RGPD synthétique — règle des 3 jamais
1. Jamais de nom d'élève dans le code ou dans GitHub
2. Jamais de clé API visible dans le code
3. Jamais de base de données hors Europe si elle contient des données identifiables

---

## 5. Tutoriel fil rouge — QCM generator

### Structure en 6 étapes balisées

Chaque étape affiche : durée estimée + cumul depuis le début + callout "À ce stade ton app est...".

**Étape 1 — Prérequis (15 min)**
- Abonnement Claude Pro actif
- Chrome installé et connecté à claude.ai
- PowerShell 7 installé
- Lien vers guide installation Superpowers (`superpowers-guide.html`)

**Étape 2 — L'atelier (5 min)**
- Créer `claude-workspace/qcm-generator/`
- Ouvrir Claude Code dans ce dossier
- Vérifier Superpowers actif : `/using-superpowers`

**Étape 3 — Décrire l'app à Claude Code (20 min)**

Bloc "À écrire dans Claude Code" :
```
/brainstorming
Je veux créer une app web simple pour mes élèves de [niveau].
L'enseignant colle un texte, l'app génère 5 questions à choix multiple
avec les bonnes réponses. Pas de compte, pas de sauvegarde,
juste un résultat à copier-coller ou imprimer.
```

Le guide décrit ce que Claude Code fait typiquement (questions de précision, proposition de plan) et comment valider.

Point de variation :
> *"Et si ton app était un générateur de consignes simplifiées ? Tu changerais la ligne 3 : 'L'enseignant colle une consigne complexe, l'app génère 3 versions : standard, simplifié, FALC.'"*

**Étape 4 — Valider le plan et laisser construire (30 min)**
- Valider le document de spécification produit par Superpowers
- Valider le plan d'implémentation tâche par tâche
- Claude Code exécute — le lecteur surveille et approuve les jalons

**Étape 5 — GitHub (10 min)**
- Créer le dépôt sur github.com
- Pousser le code depuis Claude Code
- Chaque commande Git expliquée mot à mot

**Étape 6 — Vercel (10 min)**
- Connecter Vercel au dépôt GitHub
- Premier déploiement automatique
- L'URL apparaît — la partager à un collègue = validation finale

---

## 6. Extension Supabase

**Déclencheur pédagogique :** les QCM générés disparaissent à la fermeture du navigateur.

**3 sous-étapes :**
1. Pourquoi ajouter Supabase — le problème concret
2. Créer le projet Supabase, choisir la région **Europe** (callout RGPD obligatoire)
3. Demander l'extension à Claude Code — bloc prompt exact

Bloc "À écrire dans Claude Code" :
```
Je veux que les QCM générés soient sauvegardés pour chaque enseignant.
Ajoute une authentification simple et une base de données Supabase
pour stocker les QCM par utilisateur. Projet Supabase : [ID].
Utilise des codes anonymes pour les élèves, jamais de noms réels.
Active le RLS sur toutes les tables.
```

---

## 7. Section "Prochaine app"

- Checklist de démarrage pour sa propre idée (5 questions à se poser avant d'ouvrir Claude Code)
- `/brainstorming` comme première commande à taper
- Lien vers le formulaire de contact PLAI pour partager l'app créée

---

## 8. Éléments transversaux

- **Callout RGPD** systématique sur chaque choix technique qui touche des données
- **Blocs "À écrire dans Claude Code"** pour chaque invite du tutoriel — texte exact à copier
- **Points de variation** à chaque étape du tutoriel — "et si ton app était X..."
- **Badges complexité** sur les apps exemples : 🟢 🟡 🔴
- **Durées cumulées** à chaque étape du tutoriel
- **Cohérence visuelle** : même style que les autres guides PLAI (DM Serif Display + DM Sans, variables CSS, logo `/plai-logo.jpg`, "Écoles coopérantes du PLAI")

---

## 9. Stack technique du guide lui-même

- HTML statique dans `public/guide-claude-code-plai.html`
- Même CSS design system que les autres guides (copie du template de base)
- Aucune dépendance externe hors Google Fonts
- Ajout de la carte dans `apps.ts` avec `section: 'claude-code'` (section existante)

---

## 10. Ce que ce guide n'est pas

- Pas un manuel exhaustif de Claude Code
- Pas un cours de programmation
- Pas une garantie que tout fonctionnera du premier coup sans tâtonnement
- Pas adapté aux apps nécessitant des fonctionnalités très spécifiques (intégrations LMS, systèmes de notation officiels)

Ces limites seront mentionnées explicitement dans le guide.
