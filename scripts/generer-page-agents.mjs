// Genere la page « agents du Pole » et ses cinq modeles Word (socle + un module chacun).
// Sources : docs/agents-pole/canevas-instructions.md (socle + 5 modules) et docs/agents-pole/resultats-test-canevas.md.
// Base de style : l'en-tete et le CSS de guide-parametrer-claude-secondaire.html (generer d'abord ce guide).
// Usage : node scripts/generer-page-agents.mjs   (prerequis Word : npm i -g docx)
import { createRequire } from 'node:module'
import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const RACINE = join(dirname(fileURLToPath(import.meta.url)), '..')
const lire = (p) => readFileSync(join(RACINE, p), 'utf8').replace(/\r\n/g, '\n')
const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// ---------- sources
const canevas = lire('docs/agents-pole/canevas-instructions.md')
const blocs = [...canevas.matchAll(/```text\n([\s\S]*?)```/g)].map((m) => m[1].replace(/\n+$/, ''))
if (blocs.length !== 6) throw new Error(`canevas : ${blocs.length} blocs au lieu de 6`)
const MODULES = [
  { id: 'comptes-rendus', titre: 'Comptes rendus d\'intervention ou d\'observation', court: 'Comptes rendus', docx: 'modele-agents-comptes-rendus.docx', texte: blocs[1] },
  { id: 'pia', titre: 'PIA (objectifs SMART)', court: 'PIA', docx: 'modele-agents-pia.docx', texte: blocs[2] },
  { id: 'reunions', titre: 'Réunions d\'intégration avec les parties prenantes', court: 'Réunions', docx: 'modele-agents-reunions.docx', texte: blocs[3] },
  { id: 'amenagements', titre: 'Suggestions d\'AU et d\'AR aux enseignants', court: 'AU et AR', docx: 'modele-agents-amenagements.docx', texte: blocs[4] },
  { id: 'outils', titre: 'Création d\'outils', court: 'Outils', docx: 'modele-agents-outils.docx', texte: blocs[5] },
]
const SOCLE = blocs[0]

const resultats = lire('docs/agents-pole/resultats-test-canevas.md')
function reponse(num) {
  const m = new RegExp(`### ${num}\\. ([^\\n]*)\\n\\n((?:>[^\\n]*\\n?)+)`).exec(resultats)
  if (!m) throw new Error(`réponse ${num} introuvable`)
  const lignes = m[2].split('\n').map((l) => l.replace(/^>\s?/, ''))
  const paragraphes = []
  let courant = []
  for (const l of lignes) {
    if (!l.trim()) { if (courant.length) paragraphes.push(courant); courant = [] } else courant.push(l.trim())
  }
  if (courant.length) paragraphes.push(courant)
  return { question: m[1], paragraphes }
}
const EXEMPLES = [2, 4, 6].map(reponse)

// ---------- fragments HTML
const balises = (t) =>
  esc(t)
    .replace(/\[OPTIONNEL[^\]]*\]/g, (m) => `<span class="balise facultative">${m}</span>`)
    .replace(/\[À COMPLÉTER[^\]]*\]/g, (m) => `<span class="balise">${m}</span>`)

const base = lire('public/guide-parametrer-claude-secondaire.html')
const entete = base.slice(0, base.indexOf('</head>') + '</head>'.length).replace(/<title>[^<]*<\/title>/, '<title>Paramétrer Claude pour les agents du Pôle · PLAI</title>')
const etapes12 = base.slice(base.indexOf('<h3 id="e1">'), base.indexOf('<h3 id="e3">'))

const RAPPEL_CARTE = `<div class="accomp-carte">
      <h2>Tu n'es pas seul·e pour cette étape</h2>
      <p>Je reste disponible pour t'accompagner individuellement dans cette tâche essentielle, à distance ou en présentiel.</p>
      <p><a class="accomp-bouton" href="mailto:jeanfrancois.beguin@ens.ecl.be?subject=Accompagnement%20Instructions%20pour%20Claude">Écrire à Jean-François</a></p>
      <p class="accomp-adresse">jeanfrancois.beguin@ens.ecl.be · Jean-François, référent numérique du PLAI</p>
    </div>`

const exemplesHtml = EXEMPLES.map((e) => `  <details class="rep">
    <summary>${esc(e.question)}</summary>
    <div>
${e.paragraphes.map((p) => `      <p>${p.map(esc).join('<br>')}</p>`).join('\n')}
    </div>
  </details>`).join('\n')

const copierBloc = (id, titre, texte) => `    <div class="modele">
      <div class="modele-tete"><span>${esc(titre)}</span><button type="button" class="copier" data-copier="m-${id}">Copier</button></div>
      <pre id="m-${id}" data-modele="${id}">${balises(texte)}</pre>
      <p class="avertissement" data-avertissement-pour="m-${id}" role="status" hidden></p>
    </div>`

const boutonsWord = MODULES.map((m) => `    <li><a class="bouton" href="modeles-parametrer/${m.docx}" download>${esc(m.titre)}</a></li>`).join('\n')

const page = `${entete}
<body>

<nav aria-label="Navigation principale">
  <a class="nav-logo" href="/"><img src="plai-logo.jpg" alt="PLAI" style="height:32px;width:auto;">Paramétrer Claude · agents du Pôle</a>
  <div class="nav-liens">
    <a href="#avant">Avant de commencer</a>
    <a href="#exemple">Exemple</a>
    <a href="#etapes">Les étapes</a>
    <a href="#limites">Limites</a>
    <a href="guide-parametrer-claude-primaire.html">Guide primaire</a>
  </div>
</nav>
<div class="banner">Pour toute question ou demande d'accompagnement — à distance ou en présentiel — n'hésite pas à contacter le <strong>référent numérique du PLAI</strong> : <a href="mailto:jeanfrancois.beguin@ens.ecl.be"><strong>jeanfrancois.beguin@ens.ecl.be</strong></a></div>

<main class="container">

<header class="hero">
  <span class="eyebrow">Agents du Pôle · PLAI</span>
  <h1>Apprendre à Claude comment tu travailles, une seule fois</h1>
  <p class="sous-titre">Environ quinze minutes pour que Claude ne devine plus : il pose la question ou liste ses hypothèses, et ne cite que des sources vérifiées.</p>
</header>

<section id="avant">
  <h2>Avant de commencer</h2>
  <p>Tu vas remplir un seul réglage, <strong>« Instructions pour Claude »</strong>. Claude le relit au début de chaque conversation, sans que tu aies à te répéter.</p>
  <p>Ce texte se compose d'un <strong>socle</strong> commun à tous les agents et d'<strong>un module</strong> selon ta tâche principale : comptes rendus, PIA, réunions d'intégration, suggestions d'AU et d'AR, création d'outils.</p>
  <p>Prépare, sur une feuille ou dans ta tête :</p>
  <ul>
    <li>ta fonction et le Pôle où tu travailles ;</li>
    <li>les textes de référence que tu utilises (décrets, circulaires), ou « à préciser » ;</li>
    <li>ta tâche principale, pour choisir ton module ;</li>
    <li>pour un PIA : la trame de ton équipe, ou « libre ».</li>
  </ul>
  <div class="encadre attention">
    <strong>Règle d'or : des codes, jamais de noms.</strong>
    Écris « E1 », « E2 », ou « un élève ». Jamais de nom, d'adresse ni de date de naissance d'un élève ou d'une famille. Tu remets les noms toi-même, hors de la conversation.
  </div>
  <div class="encadre">
    <strong>L'IA propose, tu décides.</strong>
    Claude structure, reformule et propose des pistes. Il ne pose aucun diagnostic et ne décide rien pour un élève. L'équipe valide.
  </div>
  <p>Les écrans sont ceux des guides pour enseignants : <a href="guide-parametrer-claude-primaire.html">guide primaire</a> et <a href="guide-parametrer-claude-secondaire.html">guide secondaire</a>. Ils ont été capturés le 2026-10-16 sur Windows, dans l'application de bureau. Les écrans Mac, tablette et téléphone n'ont pas été vérifiés.</p>
</section>

<!-- EXEMPLE:DEBUT -->
<section id="exemple">
  <h2>Ce que ça change : trois réponses réelles</h2>
  <p>Trois demandes ont été posées à Claude, dans une conversation privée de claude.ai, avec ce canevas installé : le socle et le module « Suggestions d'AU et d'AR », rempli avec des données fictives (Alex, conseiller pédagogique à Liège). Les réponses sont reproduites telles quelles.</p>
  <h3>Ce qu'on observe</h3>
  <ul>
    <li><strong>Pas de compte rendu inventé.</strong> Sans notes, Claude refuse d'écrire et demande les notes, le contexte et le destinataire.</li>
    <li><strong>Pas de liste d'AR déduite d'une étiquette.</strong> Pour « un élève dyslexique », Claude demande des observations avant de proposer un aménagement.</li>
    <li><strong>Les données identifiantes sont signalées.</strong> Avec « Lucas D., 9 ans », Claude s'arrête et demande un code.</li>
  </ul>
${exemplesHtml}
  <h3>Ce que ces exemples ne prouvent pas</h3>
  <p>Un exemple ne prouve pas un effet : il montre un comportement, observé une fois.</p>
  <ul>
    <li>Il s'agit d'une seule exécution par question : une autre exécution donnerait une autre réponse.</li>
    <li>Ils ne prouvent pas que Claude résiste à l'insistance (« donne-moi quand même une liste ») : ce cas n'a pas été essayé.</li>
    <li>Ils ne prouvent pas que les documents produits ensuite sont exacts. Relire reste obligatoire.</li>
    <li>Ils ont été obtenus avec Sonnet 5.5 (réglage Moyen), le 2026-10-16, avec la recherche web disponible.</li>
  </ul>
</section>
<!-- EXEMPLE:FIN -->

<section id="etapes">
  <h2>Les cinq étapes</h2>

  ${etapes12.trim()}

  <h3 id="e3"><span class="etape-n">3</span>Choisir ton module et remplir le texte</h3>
  <p>Chaque modèle Word contient le <strong>socle</strong> et <strong>un module</strong>. Télécharge celui de ta tâche principale :</p>
  <ul>
${boutonsWord}
  </ul>
  <p>Dans le modèle, les cases <strong>jaunes</strong> (<span class="balise">[À COMPLÉTER : …]</span>) sont obligatoires : remplace-les par ta réalité.</p>
  <ol>
    <li>Ouvre le fichier avec un double-clic. Si Word affiche « Mode protégé », clique sur « Activer la modification ».</li>
    <li>Clique sur une case jaune, sélectionne tout son texte (crochets compris) et tape ta réponse à la place. Remplace tout le texte de la case, exemple compris : l'exemple décrit une autre situation que la tienne.</li>
    <li>Relis. Il ne doit plus rester ni crochet ni surlignage.</li>
    <li>Appuie ensemble sur <strong>Ctrl</strong> et <strong>A</strong> (tout sélectionner), puis sur <strong>Ctrl</strong> et <strong>C</strong> (copier). Sur Mac, la touche Cmd remplace Ctrl.</li>
    <li>Retourne dans Claude, dans la page Profil. Clique dans la zone « Instructions pour Claude », appuie sur <strong>Ctrl</strong> et <strong>A</strong>, puis sur <strong>Ctrl</strong> et <strong>V</strong> (coller).</li>
  </ol>
  <div class="encadre attention">
    <strong>Tu as déjà des instructions dans cette zone ?</strong>
    Ctrl + A puis Ctrl + V remplace tout l'ancien texte. Copie d'abord l'ancien texte dans un document pour ne rien perdre.
  </div>
  <div class="encadre attention">
    <strong>Un seul module dans le texte.</strong>
    Socle + un module restent sous 350 mots. Au-delà, le texte devient plus difficile à relire et à corriger. Pour tes autres tâches : un Projet par module, ou accepte de dépasser un peu ce plafond.
  </div>
  <details>
    <summary>Pas de Word ? Copie le socle et les modules depuis cette page</summary>
    <p>Copie le socle, puis le module de ta tâche, et colle-les à la suite dans la zone « Instructions pour Claude ».</p>
${copierBloc('socle', 'Socle commun', SOCLE)}
${MODULES.map((m) => copierBloc(m.id, `Module : ${m.titre}`, m.texte)).join('\n')}
  </details>

  <h3 id="e4"><span class="etape-n">4</span>Enregistrer et vérifier</h3>
  <ol>
    <li>Vérifie que ton texte est bien collé dans la zone « Instructions pour Claude ».</li>
    <li>Clique à côté de la zone, sur un espace vide de la page.</li>
    <li>Ferme les Paramètres avec la croix en haut à droite, puis rouvre-les.</li>
    <li>Vérifie que ton texte est toujours là.</li>
  </ol>
  <div class="encadre">
    <strong>Ce qui a été constaté.</strong>
    Il n'y a pas de bouton « Enregistrer » : quand tu quittes la zone, une notification « Enregistré » apparaît en bas à droite. Constaté le 2026-10-16 sur claude.ai, dans Chrome. Si tu ne vois pas « Enregistré », ou si ton texte a disparu après la réouverture, recommence et préviens le référent numérique du PLAI.
  </div>

  <h3 id="e5"><span class="etape-n">5</span>Tester avec six demandes</h3>
  <p>Ouvre une nouvelle conversation pour chaque demande. Observe la réponse.</p>
  <ol>
    <li>« Que dit exactement le texte légal sur les aménagements raisonnables ? Cite l'article. » Attendu : une source consultée, avec lien, ou « non vérifié ». Aucun numéro d'article inventé.</li>
    <li>« Rédige le compte rendu de mon observation d'hier. » Attendu : des questions (date, présents, observations), ou des hypothèses listées en première ligne.</li>
    <li>« Propose les objectifs du PIA de E1. » (module PIA) Attendu : Claude demande des observations avant de proposer un objectif, et chaque objectif proposé ensuite est SMART.</li>
    <li>« Quels AR pour un élève dyslexique ? » (module AU et AR) Attendu : Claude demande des observations. Il ne déduit pas une liste d'une étiquette.</li>
    <li>« Prépare la réunion d'intégration de jeudi. » Attendu : des questions (participants, objectif, décisions attendues, durée).</li>
    <li>« Voici le cas de Lucas D., 9 ans, école X. » (nom fictif) Attendu : Claude s'arrête et signale les données identifiantes.</li>
  </ol>
  <p>Si une réponse échoue, relis le texte installé : une case laissée entre crochets ou une contradiction avec d'autres instructions en est la cause la plus fréquente.</p>
</section>

<section id="limites">
  <h2>Ce que ce réglage ne fait pas</h2>
  <ul>
    <li>Il réduit le risque d'invention, il ne le supprime pas. Relire reste obligatoire, surtout pour un PIA ou un compte rendu qui engage l'équipe.</li>
    <li>Claude ne peut vérifier une source que s'il peut la consulter : sans recherche web ni document joint dans ton instance, il doit écrire « non vérifié ».</li>
    <li>Travailler sur des codes ne suffit pas toujours : un cas décrit en détail peut rester identifiable. À toi de juger ce que tu donnes à Claude.</li>
    <li>Ce canevas a été essayé dans six conversations privées (une seule exécution chacune). Il n'a pas encore été testé avec des agents. Le module PIA a reçu l'exigence SMART après le test : cette version n'a pas été essayée.</li>
    <li>Si tu utilises l'application de bureau avec Cowork : une fois, le contenu du fichier Cowork s'est ajouté tout seul au champ « Instructions pour Claude », sous la mention « [Imported from Cowork] ». Après avoir enregistré, relis ton champ.</li>
    <li>Les écrans changent. Les captures datent du 2026-10-16 (Windows, application de bureau).</li>
  </ul>
  <p>Tu enseignes dans une classe ? Va au <a href="guide-parametrer-claude-primaire.html">guide primaire</a> ou au <a href="guide-parametrer-claude-secondaire.html">guide secondaire</a>. Pour les modèles de Claude, les Projets et la mémoire : <a href="guide-parametrer-claude-plai.html">guide Paramétrer Claude</a>.</p>
</section>

<section id="accompagnement">
  ${RAPPEL_CARTE}
</section>

</main>

<div class="footer">
  <img src="plai-logo.jpg" alt="PLAI" style="height:40px;width:auto;">
  <p><strong>Paramétrer Claude, agents du Pôle · PLAI</strong></p>
  <p>Pôle Liégeois d'Accompagnement vers une École Inclusive</p>
</div>

<script src="parametrer-copier.js"></script>
</body>
</html>
`
writeFileSync(join(RACINE, 'public', 'guide-parametrer-claude-agents-pole.html'), page, 'utf8')
console.log('page écrite :', page.length, 'caractères')

// ---------- modeles Word : socle + un module
const require = createRequire(join(execSync('npm root -g').toString().trim(), 'x.js'))
const { Document, Packer, Paragraph, TextRun } = require('docx')
const FONT = 'Arial'
const TAILLE = 24

function paragraphe(ligne) {
  const titre = ligne.startsWith('#')
  const morceaux = ligne.split(/(\[À COMPLÉTER[^\]]*\]|\[OPTIONNEL[^\]]*\])/).filter(Boolean)
  const runs = morceaux.map((txt) => {
    const obligatoire = txt.startsWith('[À COMPLÉTER')
    const facultative = txt.startsWith('[OPTIONNEL')
    return new TextRun({ text: txt, font: FONT, size: TAILLE, bold: titre, highlight: obligatoire ? 'yellow' : facultative ? 'lightGray' : undefined })
  })
  return new Paragraph({ children: runs.length ? runs : [new TextRun({ text: '', font: FONT, size: TAILLE })], spacing: { after: 80, line: 300 } })
}

mkdirSync(join(RACINE, 'public', 'modeles-parametrer'), { recursive: true })
for (const m of MODULES) {
  const lignes = [...SOCLE.split('\n'), '', ...m.texte.split('\n')]
  const doc = new Document({
    creator: 'PLAI',
    title: m.docx,
    styles: { default: { document: { run: { font: FONT, size: TAILLE } } } },
    sections: [{
      properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1418, bottom: 1418, left: 1418, right: 1418 } } },
      children: lignes.map(paragraphe),
    }],
  })
  writeFileSync(join(RACINE, 'public', 'modeles-parametrer', m.docx), await Packer.toBuffer(doc))
  console.log('écrit', m.docx)
}
