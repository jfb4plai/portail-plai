# Guide Claude Code PLAI — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Créer `public/guide-claude-code-plai.html` — guide complet niveau 1 "De l'idée à l'URL en production" pour les enseignants des écoles coopérantes du PLAI, et l'enregistrer dans le portail.

**Architecture:** Guide HTML statique en deux parties (Comprendre / Construire), même design system que les autres guides du portail (DM Serif Display + DM Sans, variables CSS identiques). Section `#apps-possibles` avec galerie de 12 apps pédagogiques badgées RGPD. Tutoriel fil rouge QCM generator en 6 étapes balisées.

**Tech Stack:** HTML5 statique · CSS design system PLAI · JavaScript vanilla (accordéons, nav active) · Vercel (déploiement via GitHub)

**Spec de référence:** `docs/superpowers/specs/2026-05-29-guide-claude-code-plai-design.md`

---

## Fichiers

| Action | Fichier | Responsabilité |
|---|---|---|
| CREATE | `public/guide-claude-code-plai.html` | Guide complet (toutes sections) |
| MODIFY | `src/data/apps.ts` | Ajouter entrée dans section `claude-code` |

---

## Task 1 : Shell HTML + nav + hero + CSS complet

**Fichiers :**
- Create : `public/guide-claude-code-plai.html`

- [ ] **Vérifier que le fichier n'existe pas encore**

```bash
ls public/guide-claude-code-plai.html 2>/dev/null && echo "EXISTE" || echo "OK - à créer"
```
Expected : `OK - à créer`

- [ ] **Créer le shell avec head, CSS complet, nav, hero, footer et script JS**

Le fichier doit contenir :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Claude Code — Construire ses outils pédagogiques · PLAI</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
<style>
  :root {
    --bg: #faf9f7; --surface: #ffffff; --surface2: #f4f2ee;
    --border: #e8e4dd; --border2: #d4cfc6;
    --text: #1a1814; --text2: #5a564f; --text3: #9a958c;
    --green: #3b6d11; --green-bg: #eaf3de; --green-mid: #639922;
    --blue: #185fa5; --blue-bg: #e6f1fb; --blue-mid: #378add;
    --amber: #854f0b; --amber-bg: #faeeda; --amber-mid: #ef9f27;
    --red: #a32d2d; --red-bg: #fcebeb; --red-mid: #e24b4a;
    --purple: #534ab7; --purple-bg: #eeedfe; --purple-mid: #7f77dd;
    --teal: #0f6e56; --teal-bg: #e1f5ee; --teal-mid: #1d9e75;
    --indigo: #3730a3; --indigo-bg: #eef2ff; --indigo-mid: #6366f1;
    --radius: 10px; --radius-sm: 6px;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text); font-size: 15px; line-height: 1.7; }

  nav {
    position: sticky; top: 0; z-index: 100;
    background: rgba(250,249,247,0.92); backdrop-filter: blur(8px);
    border-bottom: 1px solid var(--border);
    padding: 0 2rem; display: flex; align-items: center; justify-content: space-between; height: 52px;
  }
  .nav-logo { font-family: 'DM Serif Display', serif; font-size: 18px; color: var(--text); text-decoration: none; display: flex; align-items: center; }
  .nav-links { display: flex; gap: 4px; }
  .nav-link { font-size: 12px; font-weight: 500; padding: 5px 10px; border-radius: var(--radius-sm); text-decoration: none; color: var(--text2); transition: background 0.15s, color 0.15s; }
  .nav-link:hover { background: var(--surface2); color: var(--text); }
  .nav-link.active { background: var(--text); color: var(--bg); }

  .container { max-width: 720px; margin: 0 auto; padding: 0 1.5rem; }
  section { padding: 4rem 0 3rem; border-bottom: 1px solid var(--border); }
  section:last-child { border-bottom: none; }

  .hero { padding: 5rem 0 4rem; text-align: center; }
  .hero-eyebrow { display: inline-flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: 1px; color: var(--text3); border: 1px solid var(--border2); padding: 4px 14px; border-radius: 20px; margin-bottom: 1.5rem; }
  .hero h1 { font-family: 'DM Serif Display', serif; font-size: clamp(34px, 6vw, 52px); line-height: 1.1; letter-spacing: -1px; margin-bottom: 1rem; }
  .hero h1 em { font-style: italic; color: var(--text2); }
  .hero-sub { font-size: 17px; color: var(--text2); max-width: 480px; margin: 0 auto 2.5rem; font-family: 'DM Serif Display', serif; font-style: italic; }
  .hero-stats { display: flex; justify-content: center; gap: 3rem; flex-wrap: wrap; }
  .stat-num { font-family: 'DM Serif Display', serif; font-size: 32px; color: var(--text); display: block; }
  .stat-label { font-size: 12px; color: var(--text3); }

  .leitmotiv { background: var(--text); border-radius: var(--radius); padding: 1.25rem 1.5rem; margin: 1.5rem 0; }
  .leitmotiv p { font-family: 'DM Serif Display', serif; font-style: italic; font-size: 16px; color: #e8e5de; margin: 0; line-height: 1.6; }
  .leitmotiv p strong { color: #ffffff; }

  .eyebrow { font-size: 10px; font-weight: 500; text-transform: uppercase; letter-spacing: 1px; color: var(--text3); margin-bottom: 1.5rem; display: flex; align-items: center; gap: 10px; }
  .eyebrow::after { content: ''; flex: 1; height: 1px; background: var(--border); }

  .guide-header { margin-bottom: 2rem; }
  .guide-level-tag { display: inline-flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.6px; padding: 3px 12px; border-radius: 20px; margin-bottom: 0.75rem; }
  .tagv { background: var(--purple-bg); color: var(--purple); }
  .tag1 { background: var(--green-bg); color: var(--green); }
  .tag2 { background: var(--blue-bg); color: var(--blue); }
  .tag3 { background: var(--amber-bg); color: var(--amber); }
  .tag4 { background: var(--teal-bg); color: var(--teal); }
  .tag5 { background: var(--indigo-bg); color: var(--indigo); }
  .guide-title { font-family: 'DM Serif Display', serif; font-size: 30px; line-height: 1.2; margin-bottom: 0.5rem; }
  .guide-subtitle { font-size: 15px; color: var(--text2); font-family: 'DM Serif Display', serif; font-style: italic; }
  .guide-meta-row { display: flex; gap: 1.5rem; margin-top: 1rem; flex-wrap: wrap; }
  .gmeta { font-size: 12px; color: var(--text3); }

  .section-h { font-size: 18px; font-weight: 500; margin-bottom: 0.9rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--border); }
  .prose { font-size: 15px; color: var(--text2); line-height: 1.75; }
  .prose p { margin-bottom: 0.85rem; }
  .prose p:last-child { margin-bottom: 0; }

  .callout { background: var(--blue-bg); border-left: 3px solid var(--blue-mid); border-radius: 0 var(--radius-sm) var(--radius-sm) 0; padding: 0.85rem 1rem; margin: 1.25rem 0; }
  .callout-label { font-size: 10px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; color: #0c447c; margin-bottom: 3px; }
  .callout p { font-size: 14px; color: var(--blue); margin: 0; line-height: 1.6; }
  .warn { background: var(--amber-bg); border-left: 3px solid var(--amber-mid); border-radius: 0 var(--radius-sm) var(--radius-sm) 0; padding: 0.85rem 1rem; margin: 1.25rem 0; }
  .warn-label { font-size: 10px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; color: #633806; margin-bottom: 3px; }
  .warn p { font-size: 14px; color: var(--amber); margin: 0; line-height: 1.6; }
  .ok { background: var(--green-bg); border-left: 3px solid var(--green-mid); border-radius: 0 var(--radius-sm) var(--radius-sm) 0; padding: 0.85rem 1rem; margin: 1.25rem 0; }
  .ok-label { font-size: 10px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; color: #27500a; margin-bottom: 3px; }
  .ok p { font-size: 14px; color: var(--green); margin: 0; line-height: 1.6; }
  .danger { background: var(--red-bg); border-left: 3px solid var(--red-mid); border-radius: 0 var(--radius-sm) var(--radius-sm) 0; padding: 0.85rem 1rem; margin: 1.25rem 0; }
  .danger-label { font-size: 10px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; color: #501313; margin-bottom: 3px; }
  .danger p { font-size: 14px; color: var(--red); margin: 0; line-height: 1.6; }
  .teal-box { background: var(--teal-bg); border-left: 3px solid var(--teal-mid); border-radius: 0 var(--radius-sm) var(--radius-sm) 0; padding: 0.85rem 1rem; margin: 1.25rem 0; }
  .teal-label { font-size: 10px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; color: #085041; margin-bottom: 3px; }
  .teal-box p { font-size: 14px; color: var(--teal); margin: 0; line-height: 1.6; }

  .steps { display: flex; flex-direction: column; gap: 8px; margin: 1.25rem 0; }
  .step { display: flex; gap: 12px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 0.9rem 1rem; }
  .step-n { min-width: 24px; height: 24px; border-radius: 50%; background: var(--surface2); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 500; color: var(--text3); flex-shrink: 0; margin-top: 2px; }
  .step-t { font-size: 14px; font-weight: 500; margin-bottom: 2px; }
  .step-d { font-size: 13px; color: var(--text2); line-height: 1.55; }
  .step-timer { font-size: 11px; color: var(--text3); margin-top: 4px; }

  code { background: var(--surface2); border: 1px solid var(--border); border-radius: 4px; padding: 1px 6px; font-size: 12.5px; color: var(--text); }
  .code-block { background: #1a1814; border-radius: var(--radius); padding: 0.85rem 1rem; margin: 1rem 0; font-family: monospace; font-size: 13px; color: #e8e5de; line-height: 1.7; white-space: pre-wrap; }
  .code-label { font-size: 10px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text3); margin-bottom: 6px; }
  .prompt-block { background: var(--teal-bg); border: 1px solid var(--teal-mid); border-radius: var(--radius); padding: 0.85rem 1rem; margin: 1rem 0; }
  .prompt-label { font-size: 10px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; color: var(--teal); margin-bottom: 6px; }
  .prompt-block pre { font-size: 13px; color: var(--teal); line-height: 1.65; white-space: pre-wrap; font-family: monospace; }
  .variation { background: var(--indigo-bg); border-left: 3px solid var(--indigo-mid); border-radius: 0 var(--radius-sm) var(--radius-sm) 0; padding: 0.85rem 1rem; margin: 1rem 0; }
  .variation-label { font-size: 10px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; color: var(--indigo); margin-bottom: 4px; }
  .variation p { font-size: 13px; color: var(--indigo); margin: 0; line-height: 1.6; font-style: italic; }

  .grid2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 10px; margin: 1.25rem 0; }
  .grid3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px; margin: 1.25rem 0; }
  .card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 0.9rem 1rem; }
  .card-icon { font-size: 20px; margin-bottom: 6px; }
  .card-t { font-size: 13px; font-weight: 500; margin-bottom: 3px; }
  .card-d { font-size: 12px; color: var(--text2); line-height: 1.5; }

  /* Galerie apps */
  .app-grid { display: flex; flex-direction: column; gap: 8px; margin: 1.25rem 0; }
  .app-row { display: flex; align-items: flex-start; gap: 12px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 0.75rem 1rem; }
  .app-badge { font-size: 18px; flex-shrink: 0; margin-top: 2px; }
  .app-body { flex: 1; }
  .app-name { font-size: 14px; font-weight: 500; margin-bottom: 2px; }
  .app-desc { font-size: 12px; color: var(--text2); line-height: 1.5; }
  .app-meta { display: flex; gap: 8px; margin-top: 5px; flex-wrap: wrap; }
  .rgpd-pill { font-size: 10px; font-weight: 500; padding: 2px 8px; border-radius: 8px; }
  .rgpd-vert { background: var(--green-bg); color: var(--green); }
  .rgpd-jaune { background: var(--amber-bg); color: var(--amber); }
  .rgpd-rouge { background: var(--red-bg); color: var(--red); }
  .stack-pill { font-size: 10px; padding: 2px 8px; border-radius: 8px; background: var(--surface2); color: var(--text3); border: 1px solid var(--border); }
  .app-row.highlight { border-color: var(--teal-mid); background: var(--teal-bg); }

  /* Trilogie */
  .trio-card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; margin: 1rem 0; }
  .trio-head { padding: 0.85rem 1rem; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 10px; }
  .trio-emoji { font-size: 1.4rem; }
  .trio-title { font-size: 16px; font-weight: 500; }
  .trio-subtitle { font-size: 12px; color: var(--text3); }
  .trio-body { padding: 0.85rem 1rem; }
  .trio-row { display: flex; gap: 8px; margin-bottom: 6px; font-size: 13px; }
  .trio-label { font-weight: 500; min-width: 80px; color: var(--text2); flex-shrink: 0; }
  .trio-val { color: var(--text2); line-height: 1.5; }

  /* Table options avancées */
  .options-table { border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; margin: 1.25rem 0; }
  .opt-row { display: grid; grid-template-columns: 120px 1fr 1fr; border-bottom: 1px solid var(--border); }
  .opt-row:last-child { border-bottom: none; }
  .opt-head { display: grid; grid-template-columns: 120px 1fr 1fr; background: var(--surface2); border-bottom: 1px solid var(--border); }
  .opt-h { padding: 8px 10px; font-size: 10px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text3); border-right: 1px solid var(--border); }
  .opt-h:last-child { border-right: none; }
  .opt-cell { padding: 10px; font-size: 12px; color: var(--text2); line-height: 1.5; border-right: 1px solid var(--border); }
  .opt-cell:last-child { border-right: none; }
  .opt-name { font-weight: 500; color: var(--text); font-size: 13px; margin-bottom: 2px; }

  .accordion { border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; margin: 1rem 0; }
  .acc-head { background: var(--surface); padding: 0.85rem 1rem; display: flex; align-items: center; gap: 10px; cursor: pointer; user-select: none; border-bottom: 1px solid transparent; transition: background 0.15s; }
  .acc-head:hover { background: var(--surface2); }
  .acc-head.open { border-bottom-color: var(--border); }
  .acc-emoji { font-size: 1.2rem; flex-shrink: 0; }
  .acc-info { flex: 1; }
  .acc-title { font-size: 14px; font-weight: 500; }
  .acc-meta { font-size: 12px; color: var(--text3); margin-top: 1px; }
  .acc-toggle { font-size: 12px; color: var(--text3); transition: transform 0.2s; }
  .acc-toggle.open { transform: rotate(180deg); }
  .acc-body { padding: 1rem 1.1rem; display: none; }
  .acc-body.visible { display: block; }

  .checklist { display: flex; flex-direction: column; gap: 6px; margin: 1.25rem 0; }
  .check-item { display: flex; align-items: flex-start; gap: 10px; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); padding: 0.7rem 0.9rem; cursor: pointer; transition: border-color 0.15s; }
  .check-item:hover { border-color: var(--border2); }
  .check-item.done { background: var(--green-bg); border-color: #c0dd97; }
  .check-box { width: 18px; height: 18px; border: 1.5px solid var(--border2); border-radius: 4px; flex-shrink: 0; margin-top: 2px; display: flex; align-items: center; justify-content: center; font-size: 11px; transition: all 0.15s; }
  .check-item.done .check-box { background: var(--green); border-color: var(--green); color: white; }
  .check-label { font-size: 13px; color: var(--text2); line-height: 1.5; }
  .check-item.done .check-label { color: var(--green); }

  .footer { text-align: center; padding: 3rem 0 2.5rem; font-size: 13px; color: var(--text3); }
  .footer a { color: var(--text2); }
  .footer p + p { margin-top: 6px; }

  @media (max-width: 600px) {
    .nav-links { display: none; }
    .hero h1 { font-size: 30px; }
    .opt-row, .opt-head { grid-template-columns: 100px 1fr; }
    .opt-cell:last-child, .opt-h:last-child { display: none; }
  }
</style>
</head>
<body>

<nav>
  <a class="nav-logo" href="/"><img src="/plai-logo.jpg" alt="PLAI" style="height:32px;width:auto;vertical-align:middle;margin-right:8px;">Claude Code · PLAI</a>
  <div class="nav-links">
    <a class="nav-link" href="#pourquoi">Pourquoi</a>
    <a class="nav-link" href="#apps-possibles">Apps possibles</a>
    <a class="nav-link" href="#trilogie">La trilogie</a>
    <a class="nav-link" href="#tutoriel">Tutoriel</a>
    <a class="nav-link" href="#supabase">Supabase</a>
    <a class="nav-link" href="#prochaine-app">Prochaine app</a>
  </div>
</nav>

<!-- HERO -->
<section id="hero">
<div class="container">
  <div class="hero">
    <div class="hero-eyebrow">🛠️ Guide enseignants · Écoles coopérantes du PLAI</div>
    <h1>Claude Code —<br><em>construire ses outils pédagogiques</em></h1>
    <p class="hero-sub">De l'idée à l'URL en production — sans être développeur.</p>
    <div class="hero-stats">
      <div><span class="stat-num">12</span><span class="stat-label">apps exemples</span></div>
      <div><span class="stat-num">3</span><span class="stat-label">briques techniques</span></div>
      <div><span class="stat-num">~90</span><span class="stat-label">min pour la 1re app</span></div>
    </div>
  </div>
</div>
</section>

<!-- SECTIONS PLACEHOLDER — remplies dans les tâches suivantes -->

<div class="footer">
  <div class="container">
    <p><img src="/plai-logo.jpg" alt="PLAI" style="height:40px;width:auto;display:block;margin:0 auto 8px;"><strong>Guide Claude Code — Écoles coopérantes du PLAI</strong></p>
    <p>Plugin open source Superpowers (MIT) : <a href="https://github.com/obra/superpowers">github.com/obra/superpowers</a> · <a href="https://portail-plai.vercel.app">Retour au portail</a></p>
  </div>
</div>

<script>
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const a = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
        if (a) a.classList.add('active');
      }
    });
  }, { threshold: 0.3 });
  sections.forEach(s => obs.observe(s));

  function toggle(head) {
    const body = head.nextElementSibling;
    const t = head.querySelector('.acc-toggle');
    const open = body.classList.contains('visible');
    body.classList.toggle('visible', !open);
    head.classList.toggle('open', !open);
    t.classList.toggle('open', !open);
  }

  function chk(item) {
    item.classList.toggle('done');
    item.querySelector('.check-box').textContent = item.classList.contains('done') ? '✓' : '';
  }
</script>
</body>
</html>
```

- [ ] **Vérifier présence des éléments clés**

```bash
grep -c "DM+Serif+Display" public/guide-claude-code-plai.html
grep -c "plai-logo.jpg" public/guide-claude-code-plai.html
grep -c "Écoles coopérantes du PLAI" public/guide-claude-code-plai.html
grep -c "nav-link" public/guide-claude-code-plai.html
```
Expected : chaque commande retourne ≥ 1

- [ ] **Commit**

```bash
git add public/guide-claude-code-plai.html
git commit -m "feat: shell HTML guide-claude-code-plai (nav + hero + CSS + footer)"
```

---

## Task 2 : Section #pourquoi

**Fichiers :**
- Modify : `public/guide-claude-code-plai.html` — remplacer `<!-- SECTIONS PLACEHOLDER -->` par la section `#pourquoi`

- [ ] **Écrire la section #pourquoi avant le footer**

Remplacer `<!-- SECTIONS PLACEHOLDER — remplies dans les tâches suivantes -->` par :

```html
<!-- POURQUOI -->
<section id="pourquoi">
<div class="container">
  <div class="guide-header">
    <div class="guide-level-tag tagv">💡 Comprendre</div>
    <div class="guide-title">Pourquoi Claude Code, et pas Claude.ai ?</div>
    <div class="guide-subtitle">La différence entre un conseiller qui explique et un artisan qui construit.</div>
    <div class="guide-meta-row">
      <span class="gmeta">⏧ 5 minutes à lire</span>
      <span class="gmeta">🎯 Avant de commencer</span>
    </div>
  </div>

  <div class="leitmotiv">
    <p>« Claude.ai, c'est un conseiller pédagogique extraordinaire. Il réfléchit avec toi, rédige, explique, suggère. Mais à la fin de la conversation, il ne te remet rien de tangible. <strong>Claude Code, c'est le même cerveau — mais il construit vraiment l'outil que vous avez imaginé ensemble.</strong> »</p>
  </div>

  <div style="margin-bottom:2rem">
    <div class="section-h">La différence en pratique</div>
    <div class="grid2">
      <div class="card">
        <div class="card-icon">💬</div>
        <div class="card-t">Claude.ai</div>
        <div class="card-d">Tu décris une app de QCM → il t'explique comment ça pourrait fonctionner, te donne des idées, rédige une maquette en texte. Résultat : une description.</div>
      </div>
      <div class="card">
        <div class="card-icon">🛠️</div>
        <div class="card-t">Claude Code</div>
        <div class="card-d">Tu décris une app de QCM → il la construit fichier par fichier, la teste, la connecte à GitHub, la déploie sur Vercel. Résultat : une URL à partager.</div>
      </div>
    </div>
  </div>

  <div style="margin-bottom:2rem">
    <div class="section-h">Ce que Claude Code fait concrètement</div>
    <div class="prose">
      <p>Claude Code est une interface de ligne de commande (un programme qui s'ouvre dans un terminal) qui donne à Claude la capacité d'agir sur ton ordinateur : créer des fichiers, écrire du code, installer des dépendances, interagir avec GitHub et Vercel.</p>
      <p>Toutes les apps du portail PLAI ont été construites avec Claude Code — dont <a href="https://retroactif.jfb4plai.com" target="_blank">RetroActif</a>, construite par un enseignant PLAI sans formation en développement.</p>
    </div>
  </div>

  <div style="margin-bottom:2rem">
    <div class="section-h">Ce que Claude Code n'est pas</div>
    <div class="grid3">
      <div class="card"><div class="card-icon">🎁</div><div class="card-t">Pas gratuit</div><div class="card-d">Nécessite un abonnement Claude Pro (20 €/mois). À prévoir dans le budget numérique si plusieurs enseignants développent.</div></div>
      <div class="card"><div class="card-icon">🧠</div><div class="card-t">Pas magique</div><div class="card-d">Il construit ce que tu décris. Une description vague produit une app vague. Mieux tu spécifies, mieux c'est.</div></div>
      <div class="card"><div class="card-icon">🔁</div><div class="card-t">Pas instantané</div><div class="card-d">La première app prend ~90 minutes. Les suivantes, moins — tu réutilises la stack et les habitudes acquises.</div></div>
    </div>
  </div>

  <div class="callout">
    <div class="callout-label">💡 Superpowers</div>
    <p>Un plugin gratuit qui ajoute de la méthode à Claude Code : brainstorming → plan → construction → revue. Sans lui, Claude Code improvise. Avec lui, il suit un protocole. <a href="/superpowers-guide.html">Guide d'installation →</a></p>
  </div>

</div>
</section>

<!-- SECTIONS PLACEHOLDER — remplies dans les tâches suivantes -->
```

- [ ] **Vérifier**

```bash
grep -c "retroactif.jfb4plai.com" public/guide-claude-code-plai.html
grep -c "superpowers-guide.html" public/guide-claude-code-plai.html
```
Expected : chaque commande retourne 1

- [ ] **Commit**

```bash
git add public/guide-claude-code-plai.html
git commit -m "feat: section #pourquoi — Claude.ai vs Claude Code + Superpowers"
```

---

## Task 3 : Section #apps-possibles (galerie 12 apps)

**Fichiers :**
- Modify : `public/guide-claude-code-plai.html` — remplacer `<!-- SECTIONS PLACEHOLDER -->` par la section `#apps-possibles`

- [ ] **Écrire la section #apps-possibles**

Remplacer `<!-- SECTIONS PLACEHOLDER — remplies dans les tâches suivantes -->` par :

```html
<!-- APPS POSSIBLES -->
<section id="apps-possibles">
<div class="container">
  <div class="guide-header">
    <div class="guide-level-tag tag1">🎓 Apps possibles</div>
    <div class="guide-title">Ce que Claude Code peut construire pour ta classe</div>
    <div class="guide-subtitle">12 exemples pédagogiques classés par complexité technique et profil RGPD.</div>
    <div class="guide-meta-row">
      <span class="gmeta">⏧ 5 minutes</span>
      <span class="gmeta">🎯 Trouver son idée</span>
    </div>
  </div>

  <div class="warn">
    <div class="warn-label">⚠️ RGPD — trois règles absolues</div>
    <p>1. Jamais de nom d'élève dans le code ou dans GitHub · 2. Jamais de clé API visible dans le code · 3. Jamais de base de données hors Europe si elle contient des données identifiables</p>
  </div>

  <div style="margin-bottom:2rem">
    <div class="eyebrow">🟢 Niveau 1 — Sans données · zéro RGPD · déployable en 30 min</div>
    <div class="app-grid">
      <div class="app-row highlight">
        <div class="app-badge">📝</div>
        <div class="app-body">
          <div class="app-name">Générateur de QCM <span style="font-size:11px;background:var(--teal-bg);color:var(--teal);padding:1px 7px;border-radius:8px;font-weight:500;margin-left:6px;">App fil rouge de ce guide</span></div>
          <div class="app-desc">L'enseignant colle un texte → l'app génère 5 questions à choix multiple avec bonnes réponses. Différenciation immédiate, zéro préparation.</div>
          <div class="app-meta">
            <span class="rgpd-pill rgpd-vert">🟢 Zéro RGPD</span>
            <span class="stack-pill">HTML · JS · Vercel</span>
          </div>
        </div>
      </div>
      <div class="app-row">
        <div class="app-badge">⏱️</div>
        <div class="app-body">
          <div class="app-name">Minuteur de classe paramétrable</div>
          <div class="app-desc">Phases travail / pause / restitution visibles par tous sur le tableau. L'enseignant définit les durées. Alerte sonore en fin de phase.</div>
          <div class="app-meta"><span class="rgpd-pill rgpd-vert">🟢 Zéro RGPD</span><span class="stack-pill">HTML · JS · Vercel</span></div>
        </div>
      </div>
      <div class="app-row">
        <div class="app-badge">📐</div>
        <div class="app-body">
          <div class="app-name">Convertisseur d'unités pédagogique</div>
          <div class="app-desc">Explique le raisonnement de la conversion, pas seulement le résultat. Conçu pour les élèves dyscalculiques : décomposition visible de chaque étape.</div>
          <div class="app-meta"><span class="rgpd-pill rgpd-vert">🟢 Zéro RGPD</span><span class="stack-pill">HTML · JS · Vercel</span></div>
        </div>
      </div>
      <div class="app-row">
        <div class="app-badge">✂️</div>
        <div class="app-body">
          <div class="app-name">Générateur de consignes simplifiées</div>
          <div class="app-desc">Colle une consigne complexe → reçoit 3 versions : standard, simplifié, FALC. Utile pour la différenciation et les élèves DYS.</div>
          <div class="app-meta"><span class="rgpd-pill rgpd-vert">🟢 Zéro RGPD</span><span class="stack-pill">HTML · IA Claude · Vercel</span></div>
        </div>
      </div>
      <div class="app-row">
        <div class="app-badge">🎲</div>
        <div class="app-body">
          <div class="app-name">Dé de classe virtuel</div>
          <div class="app-desc">Pioche aléatoire d'élève, de groupe ou de rôle. L'enseignant encode la liste une fois, le dé gère l'aléatoire. Paramétrable sans code.</div>
          <div class="app-meta"><span class="rgpd-pill rgpd-vert">🟢 Zéro RGPD</span><span class="stack-pill">HTML · JS · Vercel</span></div>
        </div>
      </div>
    </div>
  </div>

  <div style="margin-bottom:2rem">
    <div class="eyebrow">🟡 Niveau 2 — Données locales (localStorage) · RGPD minimal · rien ne quitte l'appareil</div>
    <div class="app-grid">
      <div class="app-row">
        <div class="app-badge">📚</div>
        <div class="app-body">
          <div class="app-name">Journal de bord de lecture</div>
          <div class="app-desc">L'élève note ses livres lus et impressions. Les données restent dans son navigateur — aucun serveur, aucune transmission. Persiste entre les sessions sur le même appareil.</div>
          <div class="app-meta"><span class="rgpd-pill rgpd-jaune">🟡 Données locales</span><span class="stack-pill">HTML · JS · localStorage · Vercel</span></div>
        </div>
      </div>
      <div class="app-row">
        <div class="app-badge">✅</div>
        <div class="app-body">
          <div class="app-name">Suivi de compétences auto-évalué</div>
          <div class="app-desc">L'élève coche ses compétences maîtrisées. L'enseignant ne voit rien — intentionnel. Favorise la métacognition sans pression d'évaluation externe.</div>
          <div class="app-meta"><span class="rgpd-pill rgpd-jaune">🟡 Données locales</span><span class="stack-pill">HTML · JS · localStorage · Vercel</span></div>
        </div>
      </div>
      <div class="app-row">
        <div class="app-badge">🃏</div>
        <div class="app-body">
          <div class="app-name">Flashcards personnalisables</div>
          <div class="app-desc">L'enseignant crée le deck (vocabulaire, dates, formules), les élèves s'entraînent. Scores stockés localement, progression visible sur le même appareil.</div>
          <div class="app-meta"><span class="rgpd-pill rgpd-jaune">🟡 Données locales</span><span class="stack-pill">HTML · JS · localStorage · Vercel</span></div>
        </div>
      </div>
    </div>
  </div>

  <div style="margin-bottom:2rem">
    <div class="eyebrow">🔴 Niveau 3 — Données utilisateur (Supabase) · RGPD complet obligatoire</div>
    <div class="app-grid">
      <div class="app-row highlight">
        <div class="app-badge">📊</div>
        <div class="app-body">
          <div class="app-name">RetroActif <span style="font-size:11px;background:var(--teal-bg);color:var(--teal);padding:1px 7px;border-radius:8px;font-weight:500;margin-left:6px;">App réelle — construite par un enseignant PLAI</span></div>
          <div class="app-desc">Rétroaction différenciée par compétence, historique par élève (code anonyme). Déjà en production pour les écoles coopérantes du PLAI.</div>
          <div class="app-meta"><span class="rgpd-pill rgpd-rouge">🔴 Supabase EU</span><span class="stack-pill">React · Vite · Supabase · Vercel</span><a href="https://retroactif.jfb4plai.com" target="_blank" style="font-size:10px;color:var(--teal);text-decoration:none;border:1px solid var(--teal-mid);padding:2px 8px;border-radius:8px;">Voir l'app →</a></div>
        </div>
      </div>
      <div class="app-row">
        <div class="app-badge">📋</div>
        <div class="app-body">
          <div class="app-name">Carnet de suivi de classe</div>
          <div class="app-desc">L'enseignant consigne des observations par élève (code anonyme). Accès sécurisé depuis n'importe quel appareil. Données chiffrées, région EU.</div>
          <div class="app-meta"><span class="rgpd-pill rgpd-rouge">🔴 Supabase EU</span><span class="stack-pill">React · Supabase · Vercel</span></div>
        </div>
      </div>
      <div class="app-row">
        <div class="app-badge">📄</div>
        <div class="app-body">
          <div class="app-name">Générateur de fiches différenciées</div>
          <div class="app-desc">Paramètres sauvegardés par enseignant (niveau, matière, style). Profils d'élèves réutilisables d'une session à l'autre.</div>
          <div class="app-meta"><span class="rgpd-pill rgpd-rouge">🔴 Supabase EU</span><span class="stack-pill">React · IA Claude · Supabase · Vercel</span></div>
        </div>
      </div>
      <div class="app-row">
        <div class="app-badge">🎯</div>
        <div class="app-body">
          <div class="app-name">Quiz avec résultats par classe</div>
          <div class="app-desc">Les élèves se connectent (code anonyme), répondent, l'enseignant voit les résultats agrégés en temps réel. Aucun nom stocké.</div>
          <div class="app-meta"><span class="rgpd-pill rgpd-rouge">🔴 Supabase EU</span><span class="stack-pill">React · Supabase · Vercel</span></div>
        </div>
      </div>
    </div>
  </div>

  <div class="ok">
    <div class="ok-label">✅ Par où commencer ?</div>
    <p>Si tu n'as jamais construit d'app, commence par un niveau 🟢. Le tutoriel de ce guide utilise le générateur de QCM — 90 minutes, zéro donnée, un résultat concret.</p>
  </div>

</div>
</section>

<!-- SECTIONS PLACEHOLDER — remplies dans les tâches suivantes -->
```

- [ ] **Vérifier**

```bash
grep -c "app-row" public/guide-claude-code-plai.html
grep -c "retroactif.jfb4plai.com" public/guide-claude-code-plai.html
grep -c "rgpd-pill" public/guide-claude-code-plai.html
```
Expected : ≥ 12, ≥ 2, ≥ 12

- [ ] **Commit**

```bash
git add public/guide-claude-code-plai.html
git commit -m "feat: section #apps-possibles — galerie 12 apps péda avec badges RGPD"
```

---

## Task 4 : Section #trilogie

**Fichiers :**
- Modify : `public/guide-claude-code-plai.html`

- [ ] **Écrire la section #trilogie**

Remplacer `<!-- SECTIONS PLACEHOLDER — remplies dans les tâches suivantes -->` par :

```html
<!-- TRILOGIE -->
<section id="trilogie">
<div class="container">
  <div class="guide-header">
    <div class="guide-level-tag tag2">🏗️ La trilogie</div>
    <div class="guide-title">Les trois briques — et pourquoi elles existent</div>
    <div class="guide-subtitle">Chaque brique résout un problème concret. On ne les utilise pas par convention — on les utilise parce qu'elles sont nécessaires.</div>
    <div class="guide-meta-row">
      <span class="gmeta">⏧ 8 minutes</span>
      <span class="gmeta">🎯 Comprendre avant d'installer</span>
    </div>
  </div>

  <div class="leitmotiv">
    <p>« Claude Code est l'artisan. Le dossier <strong>claude-workspace</strong> est son atelier. <strong>GitHub</strong> est son carnet de chantier. <strong>Vercel</strong> est la vitrine ouverte au public. »</p>
  </div>

  <div class="trio-card">
    <div class="trio-head">
      <div class="trio-emoji">🗂️</div>
      <div><div class="trio-title">claude-workspace</div><div class="trio-subtitle">L'atelier local — sur ton ordinateur</div></div>
    </div>
    <div class="trio-body">
      <div class="trio-row"><div class="trio-label">C'est quoi ?</div><div class="trio-val">Un dossier sur ton ordinateur où vivent tous tes projets. Chaque app a son sous-dossier. Claude Code sait toujours où il est.</div></div>
      <div class="trio-row"><div class="trio-label">Pourquoi pas le bureau ?</div><div class="trio-val">Organisation, chemins stables entre sessions, Claude Code retrouve le contexte d'un projet même après une fermeture.</div></div>
      <div class="trio-row"><div class="trio-label">RGPD</div><div class="trio-val">Les données restent sur ta machine à ce stade. Rien ne sort, rien n'est transmis.</div></div>
    </div>
  </div>

  <div class="trio-card">
    <div class="trio-head">
      <div class="trio-emoji">📒</div>
      <div><div class="trio-title">GitHub</div><div class="trio-subtitle">Le carnet de chantier — historique de chaque modification</div></div>
    </div>
    <div class="trio-body">
      <div class="trio-row"><div class="trio-label">C'est quoi ?</div><div class="trio-val">Un service qui enregistre chaque modification apportée à ton app. Chaque "commit" est une photo de l'état du projet à un instant donné.</div></div>
      <div class="trio-row"><div class="trio-label">Pourquoi ?</div><div class="trio-val">Si Claude Code casse quelque chose, tu reviens à la version d'avant en une commande. Sauvegarde automatique hors de ta machine.</div></div>
      <div class="trio-row"><div class="trio-label">RGPD</div><div class="trio-val">Le code peut être public ou privé. <strong>Règle absolue : jamais de clé API ni de données élèves dans le code déposé sur GitHub.</strong></div></div>
      <div class="trio-row"><div class="trio-label">Compte</div><div class="trio-val">Gratuit sur github.com. Création en 5 minutes.</div></div>
    </div>
  </div>

  <div class="trio-card">
    <div class="trio-head">
      <div class="trio-emoji">🌐</div>
      <div><div class="trio-title">Vercel</div><div class="trio-subtitle">La vitrine — ton app accessible en ligne</div></div>
    </div>
    <div class="trio-body">
      <div class="trio-row"><div class="trio-label">C'est quoi ?</div><div class="trio-val">Un service qui transforme ton code GitHub en URL accessible à n'importe qui, depuis n'importe quel appareil.</div></div>
      <div class="trio-row"><div class="trio-label">Pourquoi pas envoyer le fichier par mail ?</div><div class="trio-val">Mises à jour automatiques à chaque commit, URL stable, HTTPS sécurisé, fonctionne sur mobile sans installation.</div></div>
      <div class="trio-row"><div class="trio-label">RGPD</div><div class="trio-val">Apps sans données = sans risque. Vercel est hébergé aux États-Unis. <strong>Si l'app collecte des données : en informer la direction et préférer Supabase EU pour le stockage.</strong></div></div>
      <div class="trio-row"><div class="trio-label">Compte</div><div class="trio-val">Gratuit, connexion via GitHub. Les apps PLAI tiennent dans le plan gratuit.</div></div>
    </div>
  </div>

  <div style="margin: 2rem 0 1rem">
    <div class="section-h">Options avancées — quand ton app grandit</div>
    <div class="options-table">
      <div class="opt-head">
        <div class="opt-h">Option</div>
        <div class="opt-h">Quand l'ajouter · Ce qu'elle résout</div>
        <div class="opt-h">RGPD</div>
      </div>
      <div class="opt-row">
        <div class="opt-cell"><div class="opt-name">Supabase</div></div>
        <div class="opt-cell">Dès qu'on veut un compte utilisateur ou sauvegarder des données entre sessions. Base de données PostgreSQL + authentification intégrée.</div>
        <div class="opt-cell"><strong>Choisir la région Europe obligatoirement</strong> si l'app traite des données d'élèves identifiables.</div>
      </div>
      <div class="opt-row">
        <div class="opt-cell"><div class="opt-name">Upstash</div></div>
        <div class="opt-cell">Si l'app fait des appels IA fréquents. Limite le nombre de requêtes par utilisateur (rate limiting) pour éviter les abus.</div>
        <div class="opt-cell">Données éphémères, pas de stockage nominatif. Sans risque RGPD particulier.</div>
      </div>
      <div class="opt-row">
        <div class="opt-cell"><div class="opt-name">Variables d'env. Vercel</div></div>
        <div class="opt-cell">Dès qu'une clé API entre dans le projet (Claude, Google, etc.). Les clés sont stockées côté serveur, invisibles dans le code public.</div>
        <div class="opt-cell"><strong>Jamais de clé API dans le code déposé sur GitHub.</strong> Toujours via les variables d'environnement Vercel.</div>
      </div>
      <div class="opt-row">
        <div class="opt-cell"><div class="opt-name">Superpowers</div></div>
        <div class="opt-cell">Dès que les apps deviennent complexes ou livrées à d'autres. Impose la méthode brainstorming → plan → TDD → revue. Évite les apps qui marchent en démo mais cassent en classe.</div>
        <div class="opt-cell">Pas de données. <a href="/superpowers-guide.html">Guide d'installation →</a></div>
      </div>
    </div>
  </div>

  <div class="danger">
    <div class="danger-label">🔐 Règle des 3 jamais</div>
    <p>1. Jamais de nom d'élève dans le code ou sur GitHub · 2. Jamais de clé API visible dans le code · 3. Jamais de base de données hors Europe si elle contient des données identifiables</p>
  </div>

</div>
</section>

<!-- SECTIONS PLACEHOLDER — remplies dans les tâches suivantes -->
```

- [ ] **Vérifier**

```bash
grep -c "trio-card" public/guide-claude-code-plai.html
grep -c "Supabase" public/guide-claude-code-plai.html
grep -c "superpowers-guide.html" public/guide-claude-code-plai.html
```
Expected : 3, ≥ 5, ≥ 2

- [ ] **Commit**

```bash
git add public/guide-claude-code-plai.html
git commit -m "feat: section #trilogie — workspace/GitHub/Vercel + options avancées + RGPD"
```

---

## Task 5 : Section #tutoriel (6 étapes fil rouge)

**Fichiers :**
- Modify : `public/guide-claude-code-plai.html`

- [ ] **Écrire la section #tutoriel**

Remplacer `<!-- SECTIONS PLACEHOLDER — remplies dans les tâches suivantes -->` par :

```html
<!-- TUTORIEL -->
<section id="tutoriel">
<div class="container">
  <div class="guide-header">
    <div class="guide-level-tag tag3">🛠️ Tutoriel</div>
    <div class="guide-title">Construire le générateur de QCM — pas à pas</div>
    <div class="guide-subtitle">De zéro à une URL partageable. Durée totale estimée : 90 minutes.</div>
    <div class="guide-meta-row">
      <span class="gmeta">⏧ 90 min au total</span>
      <span class="gmeta">🎯 Niveau 1 — zéro expérience requise</span>
    </div>
  </div>

  <div class="callout">
    <div class="callout-label">📌 App fil rouge</div>
    <p>L'enseignant colle un texte dans l'app → elle génère 5 questions à choix multiple avec les bonnes réponses. Zéro compte, zéro sauvegarde. Résultat : une URL à partager aux collègues.</p>
  </div>

  <div class="steps">

    <div class="step">
      <div class="step-n">1</div>
      <div>
        <div class="step-t">Prérequis — 15 min</div>
        <div class="step-d">Avant de commencer, vérifier que tu as : <strong>un abonnement Claude Pro actif</strong> sur claude.ai · <strong>Chrome installé</strong> et connecté à claude.ai · <strong>PowerShell 7</strong> installé (chercher "PowerShell 7" dans le menu Démarrer — pas le terminal Windows classique). Pour installer Claude Code et Superpowers en même temps : consulter le <a href="/superpowers-guide.html">guide Superpowers</a> — il couvre les deux.</div>
        <div class="step-timer">⏱ Cumul : 15 min</div>
      </div>
    </div>

    <div class="step">
      <div class="step-n">2</div>
      <div>
        <div class="step-t">L'atelier — 5 min</div>
        <div class="step-d">Ouvrir PowerShell 7. Taper les commandes suivantes une par une :</div>
        <div class="code-block">mkdir "$HOME\claude-workspace\qcm-generator"
cd "$HOME\claude-workspace\qcm-generator"
claude</div>
        <div class="step-d" style="margin-top:8px;">Claude Code s'ouvre dans le dossier de ton projet. Vérifier que Superpowers est actif en tapant <code>/using-superpowers</code>. Tu dois voir un message de confirmation.</div>
        <div class="step-timer">⏱ Cumul : 20 min</div>
      </div>
    </div>

    <div class="step">
      <div class="step-n">3</div>
      <div>
        <div class="step-t">Décrire l'app à Claude Code — 20 min</div>
        <div class="step-d">Taper <code>/brainstorming</code> puis coller ce texte :</div>
        <div class="prompt-block">
          <div class="prompt-label">✍️ À écrire dans Claude Code</div>
          <pre>/brainstorming
Je veux créer une app web simple pour mes élèves de [ton niveau].
L'enseignant colle un texte dans une zone de saisie.
L'app génère 5 questions à choix multiple avec les bonnes réponses,
en utilisant l'IA Claude. Pas de compte, pas de sauvegarde,
juste un résultat à copier-coller ou imprimer.
L'interface doit être claire et utilisable sur tablette.</pre>
        </div>
        <div class="step-d">Claude Code va te poser des questions de précision (niveau, matière, langue). Réponds simplement. Il produira ensuite un document de spécification — <strong>lis-le attentivement avant de valider</strong>.</div>
        <div class="variation">
          <div class="variation-label">🔀 Variation — autre app</div>
          <p>Si ton app est un générateur de consignes simplifiées, remplace la ligne 3 par : "L'enseignant colle une consigne complexe, l'app génère 3 versions : standard, simplifié, FALC."</p>
        </div>
        <div class="step-timer">⏱ Cumul : 40 min</div>
      </div>
    </div>

    <div class="step">
      <div class="step-n">4</div>
      <div>
        <div class="step-t">Valider le plan et laisser construire — 30 min</div>
        <div class="step-d">Superpowers génère un plan d'implémentation avec des tâches de 2 à 5 minutes. <strong>Lis chaque tâche</strong> — c'est là que tu vérifies que l'app correspond à ce que tu veux. Tape <code>ok</code> pour valider et lancer la construction. Claude Code exécute tâche par tâche. Tu n'interviens que si une question se pose. À la fin, l'app tourne en local — Claude Code indique comment la voir dans le navigateur.</div>
        <div class="ok">
          <div class="ok-label">✅ À ce stade</div>
          <p>Ton générateur de QCM fonctionne sur ton ordinateur. Tu peux le tester avec un texte de cours. L'URL commence par localhost — elle n'est pas encore accessible à d'autres.</p>
        </div>
        <div class="step-timer">⏱ Cumul : 70 min</div>
      </div>
    </div>

    <div class="step">
      <div class="step-n">5</div>
      <div>
        <div class="step-t">GitHub — 10 min</div>
        <div class="step-d">Créer un dépôt sur <a href="https://github.com" target="_blank">github.com</a> (bouton "New repository", nom : <code>qcm-generator</code>, laisser les autres options par défaut). Puis dans Claude Code :</div>
        <div class="prompt-block">
          <div class="prompt-label">✍️ À écrire dans Claude Code</div>
          <pre>Pousse le code sur GitHub.
Mon dépôt : https://github.com/[ton-compte]/qcm-generator</pre>
        </div>
        <div class="step-d">Claude Code exécute les commandes Git. Si c'est la première fois, il te demandera de t'authentifier — suis les instructions.</div>
        <div class="variation">
          <div class="variation-label">🔀 Variation</div>
          <p>Pour une app différente, seul le nom du dépôt change. La procédure est identique pour toutes les apps niveau 🟢.</p>
        </div>
        <div class="step-timer">⏱ Cumul : 80 min</div>
      </div>
    </div>

    <div class="step">
      <div class="step-n">6</div>
      <div>
        <div class="step-t">Vercel — 10 min</div>
        <div class="step-d">Aller sur <a href="https://vercel.com" target="_blank">vercel.com</a>, se connecter avec le compte GitHub. Cliquer "Add New Project", sélectionner le dépôt <code>qcm-generator</code>, laisser tous les paramètres par défaut, cliquer "Deploy". Après 1–2 minutes : une URL apparaît.</div>
        <div class="ok">
          <div class="ok-label">✅ À ce stade — 90 min depuis le début</div>
          <p>Ton générateur de QCM est en ligne. L'URL fonctionne sur ordinateur, tablette et smartphone. Chaque modification poussée sur GitHub met l'app à jour automatiquement en 60 secondes.</p>
        </div>
        <div class="warn">
          <div class="warn-label">⚠️ Clé API</div>
          <p>Si ton app utilise l'IA Claude pour générer les questions, la clé ANTHROPIC_API_KEY doit être ajoutée dans les variables d'environnement Vercel — jamais dans le code. Claude Code t'explique comment faire si nécessaire.</p>
        </div>
        <div class="step-timer">⏱ Total : ~90 min</div>
      </div>
    </div>

  </div>

</div>
</section>

<!-- SECTIONS PLACEHOLDER — remplies dans les tâches suivantes -->
```

- [ ] **Vérifier**

```bash
grep -c "step-n" public/guide-claude-code-plai.html
grep -c "prompt-block" public/guide-claude-code-plai.html
grep -c "variation" public/guide-claude-code-plai.html
```
Expected : 6, ≥ 2, ≥ 3

- [ ] **Commit**

```bash
git add public/guide-claude-code-plai.html
git commit -m "feat: section #tutoriel — 6 étapes QCM generator avec blocs prompts et variations"
```

---

## Task 6 : Sections #supabase et #prochaine-app + entrée apps.ts

**Fichiers :**
- Modify : `public/guide-claude-code-plai.html`
- Modify : `src/data/apps.ts`

- [ ] **Écrire la section #supabase**

Remplacer `<!-- SECTIONS PLACEHOLDER — remplies dans les tâches suivantes -->` par :

```html
<!-- SUPABASE -->
<section id="supabase">
<div class="container">
  <div class="guide-header">
    <div class="guide-level-tag tag4">🗄️ Supabase</div>
    <div class="guide-title">Quand ajouter une base de données ?</div>
    <div class="guide-subtitle">Le moment où ton app passe du niveau 🟢 au niveau 🔴 — et ce que ça implique côté RGPD.</div>
    <div class="guide-meta-row">
      <span class="gmeta">⏧ 30 min supplémentaires</span>
      <span class="gmeta">🎯 Après la première app déployée</span>
    </div>
  </div>

  <div style="margin-bottom:2rem">
    <div class="section-h">Le problème concret</div>
    <div class="prose">
      <p>Ton générateur de QCM fonctionne — mais les questions générées disparaissent quand tu fermes l'onglet. Si tu veux que chaque enseignant retrouve ses QCM d'une session à l'autre, ou que plusieurs enseignants aient chacun leur espace, il faut une base de données.</p>
      <p>Supabase fournit les deux en un : base de données PostgreSQL + système d'authentification. Il dispose de serveurs en Europe — indispensable pour les données d'élèves.</p>
    </div>
  </div>

  <div class="danger">
    <div class="danger-label">🔴 RGPD — avant de commencer</div>
    <p>Dès qu'une app stocke des données sur un serveur, même anonymisées, tu dois : <strong>informer les élèves et les parents</strong> · utiliser des <strong>codes anonymes</strong> (jamais de noms réels) · activer le <strong>RLS Supabase</strong> sur toutes les tables · choisir la <strong>région Europe</strong> lors de la création du projet.</p>
  </div>

  <div class="steps">

    <div class="step">
      <div class="step-n">1</div>
      <div>
        <div class="step-t">Créer le projet Supabase</div>
        <div class="step-d">Aller sur <a href="https://supabase.com" target="_blank">supabase.com</a>, créer un compte gratuit, cliquer "New project". Nom : <code>qcm-generator</code>. <strong>Region : choisir "West EU (Ireland)" ou "Central EU (Frankfurt)"</strong>. Copier l'URL du projet et la clé anon — elles seront utilisées à l'étape suivante.</div>
      </div>
    </div>

    <div class="step">
      <div class="step-n">2</div>
      <div>
        <div class="step-t">Demander l'extension à Claude Code</div>
        <div class="step-d">Dans Claude Code, taper :</div>
        <div class="prompt-block">
          <div class="prompt-label">✍️ À écrire dans Claude Code</div>
          <pre>/brainstorming
Je veux que les QCM générés soient sauvegardés pour chaque enseignant.
Ajoute une authentification simple (email + mot de passe) et une base
de données Supabase pour stocker les QCM par utilisateur.
URL Supabase : [coller l'URL]
Clé anon : [coller la clé]
Utilise des codes anonymes pour les élèves, jamais de noms réels.
Active le RLS sur toutes les tables.
Région choisie : Europe.</pre>
        </div>
      </div>
    </div>

    <div class="step">
      <div class="step-n">3</div>
      <div>
        <div class="step-t">Variables d'environnement Vercel</div>
        <div class="step-d">Après le déploiement, aller dans les paramètres du projet sur Vercel → "Environment Variables". Ajouter <code>SUPABASE_URL</code> et <code>SUPABASE_ANON_KEY</code> avec les valeurs copiées de Supabase. <strong>Ne jamais mettre ces valeurs dans le code déposé sur GitHub.</strong></div>
      </div>
    </div>

  </div>

</div>
</section>

<!-- PROCHAINE APP -->
<section id="prochaine-app">
<div class="container">
  <div class="guide-header">
    <div class="guide-level-tag tag5">🚀 Prochaine app</div>
    <div class="guide-title">Construire son propre outil</div>
    <div class="guide-subtitle">5 questions à se poser avant d'ouvrir Claude Code. Une checklist pour démarrer du bon pied.</div>
    <div class="guide-meta-row">
      <span class="gmeta">⏧ 10 min de réflexion</span>
      <span class="gmeta">🎯 Avant de commencer un nouveau projet</span>
    </div>
  </div>

  <div class="section-h">5 questions avant de lancer Claude Code</div>
  <div class="checklist">
    <div class="check-item" onclick="chk(this)">
      <div class="check-box"></div>
      <div class="check-label"><strong>Quel problème concret résout cette app ?</strong> — Pas "une app pour les élèves" mais "les élèves perdent 10 minutes à chercher les consignes sur 3 supports différents".</div>
    </div>
    <div class="check-item" onclick="chk(this)">
      <div class="check-box"></div>
      <div class="check-label"><strong>Qui l'utilise exactement ?</strong> — Moi seul, mes collègues, mes élèves ? Depuis quel appareil ? Cette réponse détermine le niveau RGPD.</div>
    </div>
    <div class="check-item" onclick="chk(this)">
      <div class="check-box"></div>
      <div class="check-label"><strong>Des données sont-elles stockées ?</strong> — Si oui : codes anonymes, Supabase EU, RLS activé, parents informés.</div>
    </div>
    <div class="check-item" onclick="chk(this)">
      <div class="check-box"></div>
      <div class="check-label"><strong>Quel est le cas d'usage principal qui doit absolument fonctionner ?</strong> — Définir la fonction essentielle. Le reste peut venir plus tard.</div>
    </div>
    <div class="check-item" onclick="chk(this)">
      <div class="check-box"></div>
      <div class="check-label"><strong>Est-ce une app simple (🟢) ou complexe (🔴) ?</strong> — Commencer par la version la plus simple possible, ajouter la complexité si le besoin est confirmé.</div>
    </div>
  </div>

  <div style="margin: 2rem 0">
    <div class="section-h">La première commande à taper</div>
    <div class="prompt-block">
      <div class="prompt-label">✍️ Point de départ universel</div>
      <pre>/brainstorming
Je veux créer une app pour [décrire le problème concret].
Utilisateurs : [qui, quel appareil].
Fonctionnalité essentielle : [une phrase].
Données stockées : [oui/non — si oui, lesquelles].</pre>
    </div>
  </div>

  <div class="teal-box">
    <div class="teal-label">📬 Partager ton app</div>
    <p>Tu as construit un outil utile pour tes collègues des écoles coopérantes du PLAI ? Contacte l'équipe PLAI pour l'intégrer au portail : <a href="mailto:jeanfrancois.beguin@ens.ecl.be" style="color:var(--teal)">jeanfrancois.beguin@ens.ecl.be</a></p>
  </div>

</div>
</section>
```

- [ ] **Vérifier les deux sections**

```bash
grep -c "supabase.com" public/guide-claude-code-plai.html
grep -c "check-item" public/guide-claude-code-plai.html
grep -c "SECTIONS PLACEHOLDER" public/guide-claude-code-plai.html
```
Expected : ≥ 2, 5, 0 (le placeholder doit avoir disparu)

- [ ] **Ajouter l'entrée dans apps.ts**

Dans `src/data/apps.ts`, après l'entrée `superpowers-guide` (section `claude-code`), ajouter :

```typescript
  {
    id: 'claude-code-guide',
    name: 'Claude Code — Construire ses outils pédagogiques',
    description: 'De l\'idée à l\'URL en production sans être développeur. Galerie de 12 apps pédagogiques avec profils RGPD, trilogie claude-workspace/GitHub/Vercel, tutoriel fil rouge QCM generator et extension Supabase.',
    url: '/guide-claude-code-plai.html',
    emoji: '🛠️',
    category: 'Guide',
    status: 'disponible',
    color: 'teal',
    section: 'claude-code',
  },
```

- [ ] **Vérifier apps.ts**

```bash
grep -c "claude-code-guide" src/data/apps.ts
```
Expected : 1

- [ ] **Build pour vérifier l'absence d'erreurs TypeScript**

```bash
npm run build 2>&1 | tail -5
```
Expected : `✓ built in`

- [ ] **Commit final**

```bash
git add public/guide-claude-code-plai.html src/data/apps.ts
git commit -m "feat: guide-claude-code-plai complet + entrée portail

- Sections #supabase et #prochaine-app
- Checklist 5 questions pré-lancement
- Entrée apps.ts section claude-code
- Build TypeScript propre"
git push origin main
```

---

## Self-review

**Couverture spec :**
- [x] Partie A : #pourquoi, #apps-possibles (12 apps + badges RGPD), #trilogie (3 briques + options avancées + Superpowers)
- [x] Partie B : #tutoriel (6 étapes + blocs prompts + variations), #supabase (3 étapes + RGPD), #prochaine-app (checklist + prompt universel)
- [x] RetroActif mentionné avec lien live
- [x] Règle des 3 jamais présente dans #trilogie
- [x] Lien superpowers-guide.html dans #pourquoi et #trilogie
- [x] Logo /plai-logo.jpg nav + footer
- [x] "Écoles coopérantes du PLAI" dans hero-eyebrow
- [x] Entrée apps.ts section claude-code

**Placeholders :**
- `[ton niveau]`, `[ton-compte]`, `[coller l'URL]`, `[coller la clé]` — intentionnels, le lecteur les remplace. Signalés dans le texte.

**Cohérence types :**
- Section `claude-code` déjà présente dans `AppSection` (ajoutée en début de session). ✅
