---
name: coherence-guides-plai
description: Use when auditing or creating HTML guide files in the portail-plai public/ folder. Triggers on any mention of "cohérence", "guide html", "vérifier les guides", "logo manquant", or when adding a new guide to the portail.
---

# Cohérence des guides HTML — Portail PLAI

## Vue d'ensemble

Checklist d'audit et de correction pour les fichiers HTML du dossier `public/` du portail PLAI. Cinq critères à vérifier systématiquement sur chaque guide.

## Les 5 critères

### A. Police — DM Serif Display + DM Sans
```html
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
```
Les deux familles doivent être présentes. Une seule balise `<link>` suffit.

---

### B. Variables CSS de base dans `:root`
```css
:root {
  --bg: #faf9f7;
  --surface: #ffffff;
  --surface2: #f4f2ee;
  --border: #e8e4dd;
  --border2: #d4cfc6;
  --text: #1a1814;
  --text2: #5a564f;
  --text3: #9a958c;
}
```
`--teal: #0f6e56` recommandé si le guide utilise la couleur PLAI.

---

### C. Logo dans la nav
```html
<a class="nav-logo" href="/">
  <img src="/plai-logo.jpg" alt="PLAI" style="height:32px;width:auto;vertical-align:middle;margin-right:8px;">
  Titre du guide · PLAI
</a>
```
**Chemin critique :** `/plai-logo.jpg` — racine Vercel, pas `/portail-plai/public/plai-logo.jpg`.

---

### D. Logo dans le footer
```html
<div class="footer">
  <div class="container">
    <p>
      <img src="/plai-logo.jpg" alt="PLAI" style="height:40px;width:auto;display:block;margin:0 auto 8px;">
      <strong>Titre du guide — Écoles coopérantes du PLAI</strong>
    </p>
    <p>Lien ou mention complémentaire</p>
  </div>
</div>
```
CSS footer standard (fond clair, pas sombre) :
```css
.footer { text-align: center; padding: 3rem 0 2.5rem; font-size: 13px; color: var(--text3); }
.footer a { color: var(--text2); }
.footer p + p { margin-top: 6px; }
```

---

### E. Mention public-cible dans le hero eyebrow
```html
<div class="hero-eyebrow">🎓 Guide enseignants · Écoles coopérantes du PLAI</div>
```
Formule exacte : **"Écoles coopérantes du PLAI"**

Ne pas écrire :
- ~~"Écoles coopérantes FWB"~~
- ~~"Écoles coopérantes du Pôle Territorial de la Ville de Liège"~~
- ~~"Fédération Wallonie-Bruxelles"~~ seul

---

## Procédure d'audit

### 1. Lister les guides
```bash
ls public/*.html
```

### 2. Vérifier chaque critère par grep
```bash
# A. Police
grep -l "DM+Serif+Display" public/*.html

# B. Variables CSS
grep -l "\-\-bg: #faf9f7" public/*.html

# C. Logo nav
grep -n "plai-logo.jpg" public/*.html

# D. Logo footer
grep -n "footer" public/*.html | grep "plai-logo"

# E. Public-cible
grep -n "Écoles coopérantes du PLAI" public/*.html
```

### 3. Corriger le chemin logo en masse si nécessaire
```bash
# Si le mauvais chemin a été utilisé :
sed -i 's|/portail-plai/public/plai-logo.jpg|/plai-logo.jpg|g' public/*.html
```

---

## Tableau de référence rapide

| Critère | Valeur correcte | Erreur fréquente |
|---|---|---|
| Chemin logo | `/plai-logo.jpg` | `/portail-plai/public/plai-logo.jpg` |
| Logo nav height | `32px` | absent |
| Logo footer height | `40px` | absent |
| Public-cible | `Écoles coopérantes du PLAI` | `Pôle Territorial…` ou `FWB` |
| Footer bg | `var(--bg)` clair | `var(--text)` sombre |
| Font | DM Serif Display + DM Sans | Georgia seul |

---

## Cas particuliers

**claude101-fwb.html** : fichier React JSX compilé. Le logo s'ajoute avec la syntaxe JSX :
```jsx
<img src="/plai-logo.jpg" alt="PLAI" style={{ height:40, width:"auto", display:"block", margin:"0 auto 8px" }} />
```

**Guides à footer sombre** : remplacer le CSS `footer { background: var(--text) }` par le style standard `.footer` (fond clair) avant d'ajouter le logo.

---

## Commit type
```
Corrige cohérence guides HTML (logo + public-cible)
```
