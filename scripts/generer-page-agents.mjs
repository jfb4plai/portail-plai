// Genere la page « agents du Pole » et ses cinq modeles Word (le socle) et copie les cinq skills.
// Sources : docs/agents-pole/canevas-instructions.md (socle + 5 modules) et docs/agents-pole/resultats-test-canevas.md.
// Base de style : l'en-tete et le CSS de guide-parametrer-claude-secondaire.html (generer d'abord ce guide).
// Usage : node scripts/generer-page-agents.mjs   (prerequis Word : npm i -g docx)
import { createRequire } from 'node:module'
import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const RACINE = join(dirname(fileURLToPath(import.meta.url)), '..')
const lire = (p) => readFileSync(join(RACINE, p), 'utf8').replace(/\r\n/g, '\n')
const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// ---------- sources
const canevas = lire('docs/agents-pole/canevas-instructions.md')
const blocs = [...canevas.matchAll(/```text\n([\s\S]*?)```/g)].map((m) => m[1].replace(/\n+$/, ''))
if (blocs.length !== 1) throw new Error(`canevas : ${blocs.length} blocs text au lieu de 1 (le socle)`)
const SKILLS = [
  { id: 'comptes-rendus-pole', titre: 'Comptes rendus' },
  { id: 'pia-pole', titre: 'PIA' },
  { id: 'reunions-integration-pole', titre: "Réunions d'intégration" },
  { id: 'amenagements-pole', titre: 'AU et AR' },
  { id: 'outils-pole', titre: "Création d'outils" },
]
const SOCLE = blocs[0]
const BS = String.fromCharCode(92)
const projetM = new RegExp('```projet' + BS + 'n([' + BS + 's' + BS + 'S]*?)```').exec(canevas)
if (!projetM) throw new Error('canevas : bloc projet absent')
const PROJET = projetM[1].trim()

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

const blocProjet = `    <div class="modele">
      <div class="modele-tete"><span>Instructions du Projet « Circulaire de rentrée »</span><button type="button" class="copier" data-copier="m-projet">Copier</button></div>
      <pre id="m-projet" data-bloc="projet">${esc(PROJET)}</pre>
      <p class="avertissement" data-avertissement-pour="m-projet" role="status" hidden></p>
    </div>`

const boutonsSkills = SKILLS.map((k) => `    <li><a class="bouton" href="modeles-parametrer/skills/${k.id}.zip" download>${esc(k.titre)}</a> <span class="balise facultative">${k.id}.zip</span></li>`).join('\n')

const page = `${entete}
<body>

<nav aria-label="Navigation principale">
  <a class="nav-logo" href="/"><img src="plai-logo.jpg" alt="PLAI" style="height:32px;width:auto;">Paramétrer Claude · agents du Pôle</a>
  <div class="nav-liens">
    <a href="#avant">Avant de commencer</a>
    <a href="#exemple">Exemple</a>
    <a href="#etapes">Les étapes</a>
    <a href="#projet">Circulaire</a>
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
  <p>Tu vas régler deux choses : un <strong>socle</strong>, collé une fois dans « Instructions pour Claude », et cinq <strong>skills</strong> (un par tâche) que tu importes dans Claude. Le socle porte les règles qui valent pour toutes tes tâches. Chaque skill porte la méthode d'une tâche : comptes rendus, PIA, réunions d'intégration, suggestions d'AU et d'AR, création d'outils.</p>
  <p>Tu ne changes jamais de texte d'une tâche à l'autre : Claude charge le bon skill quand ta demande correspond.</p>
  <p>Prépare, sur une feuille ou dans ta tête :</p>
  <ul>
    <li>ta fonction et le Pôle où tu travailles ;</li>
    <li>tes tâches principales ;</li>
    <li>les textes de référence que tu utilises (décrets, circulaires), ou « à préciser ».</li>
  </ul>
  <div class="encadre attention">
    <strong>Règle d'or : des codes, jamais de noms.</strong>
    Écris « E1 », « E2 », ou « un élève ». Jamais de nom, d'adresse ni de date de naissance d'un élève ou d'une famille. Tu remets les noms toi-même, hors de la conversation.
  </div>
  <div class="encadre attention">
    <strong>Fiche de suivi : un extrait anonymisé, jamais le fichier entier.</strong>
    Quand Claude te demande la fiche de suivi, colle seulement les lignes utiles de l'onglet « compte-rendu accompagnement » et la rubrique « AR utiles à l'élève ». Retire d'abord les noms, les initiales des accompagnants, les dates de naissance et les coordonnées. N'envoie jamais l'onglet des informations générales. Relis les colonnes de texte libre : elles peuvent contenir des noms.
  </div>
  <div class="encadre">
    <strong>L'IA propose, tu décides.</strong>
    Claude structure, reformule et propose des pistes. Il ne pose aucun diagnostic et ne décide rien pour un élève. L'équipe valide.
  </div>
  <p>Les écrans de la page Profil sont ceux des guides pour enseignants : <a href="guide-parametrer-claude-primaire.html">guide primaire</a> et <a href="guide-parametrer-claude-secondaire.html">guide secondaire</a>. Ils ont été capturés le 2026-10-16 sur Windows, dans l'application de bureau. Les écrans Mac, tablette et téléphone n'ont pas été vérifiés.</p>
</section>

<!-- EXEMPLE:DEBUT -->
<section id="exemple">
  <h2>Ce que ça change : trois réponses réelles (version précédente)</h2>
  <p>Trois demandes ont été posées à Claude, dans une conversation privée de claude.ai, avec la <strong>version précédente</strong> de ce canevas : le socle d'alors et un module « Suggestions d'AU et d'AR », rempli avec des données fictives (Alex, conseiller pédagogique à Liège). Cette version n'avait pas de skills. Les réponses sont reproduites telles quelles, pour montrer le comportement du socle de l'époque.</p>
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
    <li>Ils ne prouvent pas que Claude résiste à l'insistance (« donne-moi quand même une liste ») : ce cas n'a pas été essayé avec cette version.</li>
    <li>Ils ne prouvent pas que les documents produits ensuite sont exacts. Relire reste obligatoire.</li>
    <li>Ils ont été obtenus avec Sonnet 5.5 (réglage Moyen), le 2026-10-16, avec la recherche web disponible.</li>
  </ul>
  <h3>Essai de la version actuelle (socle et skills)</h3>
  <p>Le même jour, la version actuelle a été essayée sur un compte Pro, avec des données fictives, une ou deux exécutions par demande. Seule l'observation du comportement est rapportée : les réponses complètes ne sont pas reproduites.</p>
  <ul>
    <li><strong>« PIA de E1 »</strong> : le skill PIA se charge. Claude demande IPT ou AR, la trame, les observations, le niveau, le type d'enseignement, et propose un extrait anonymisé de la fiche de suivi.</li>
    <li><strong>« Prépare la réunion d'intégration de jeudi »</strong> : le skill réunions se charge. Claude demande quelle réunion avant de proposer un ordre du jour.</li>
    <li><strong>« Quels AR pour un élève dyslexique ? »</strong> : le skill aménagements se charge. Claude demande des observations au lieu de lister des aménagements.</li>
    <li><strong>« Rédige le compte rendu de mon observation d'hier »</strong> : le skill comptes rendus se charge. Sans notes, Claude refuse d'écrire.</li>
    <li><strong>« Orientation vers le spécialisé, conclusion pour les parents »</strong> : aucun skill ne se charge, le socle suffit. Claude refuse de conclure et rappelle que l'orientation relève du CPMS.</li>
  </ul>
  <p>Limites de cet essai : un seul compte, un seul modèle, des formulations choisies par nous. Une fois, Claude a écrit « octobre » alors que le mois n'avait pas été donné : relire reste indispensable.</p>
</section>
<!-- EXEMPLE:FIN -->

<section id="etapes">
  <h2>Les six étapes</h2>

  ${etapes12.trim()}

  <h3 id="e3"><span class="etape-n">3</span>Compléter le socle</h3>
  <p>Le modèle Word contient le <strong>socle</strong>. Télécharge-le :</p>
  <ul>
    <li><a class="bouton" href="modeles-parametrer/modele-agents-socle.docx" download>Socle pour les agents du Pôle</a></li>
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
  <details>
    <summary>Pas de Word ? Copie le socle depuis cette page</summary>
    <p>Copie le socle et colle-le dans la zone « Instructions pour Claude ».</p>
${copierBloc('socle', 'Socle commun', SOCLE)}
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

  <h3 id="e5"><span class="etape-n">5</span>Importer les skills</h3>
  <p>Télécharge les cinq skills (un fichier .zip chacun) :</p>
  <ul>
${boutonsSkills}
  </ul>
  <ol>
    <li>Dans Claude, clique sur « Personnalisation » dans le menu de gauche, puis sur l'onglet « Skills ».</li>
    <li>Clique sur « Ajouter », puis sur « Importer un Skill ».</li>
    <li>Glisse les cinq fichiers .zip dans la zone, ou parcours tes fichiers (l'écran accepte plusieurs fichiers à la fois).</li>
    <li>Clique sur « Importer 5 Skills ».</li>
    <li>Si un skill existe déjà, l'écran l'indique et propose « Remplacer » : clique dessus pour chaque ligne. Les versions précédentes restent dans l'historique.</li>
    <li>Vérifie que les cinq skills apparaissent dans l'onglet « Les vôtres », avec l'interrupteur actif.</li>
  </ol>
  <div class="encadre">
    <strong>Ce qui a été constaté, et ce qui ne l'a pas été.</strong>
    Cet écran a été observé le 2026-10-16 sur claude.ai, dans Chrome, avec un compte Pro. Il n'est pas vérifié sur d'autres forfaits, sur un compte d'organisation (un administrateur peut restreindre les skills), ni dans l'application de bureau. Si l'import est refusé, préviens le référent numérique du PLAI.
  </div>

  <h3 id="e6"><span class="etape-n">6</span>Tester avec six demandes</h3>
  <p>Ouvre une nouvelle conversation pour chaque demande. Observe la réponse. Quand un skill se charge, la réponse affiche « Compétence chargée » et le nom du skill, et la mention « Utilisés dans cette session : Skills » apparaît sous la conversation.</p>
  <ol>
    <li>« Que dit exactement le texte légal sur les aménagements raisonnables ? Cite l'article. » Attendu : une source consultée, avec lien, ou « non vérifié ». Aucun numéro d'article inventé.</li>
    <li>« Rédige le compte rendu de mon observation d'hier. » Attendu : le skill comptes rendus se charge, Claude demande les notes et le destinataire.</li>
    <li>« PIA de E1 » Attendu : le skill PIA se charge. Claude demande IPT ou AR, la trame, les observations, le niveau et le type d'enseignement.</li>
    <li>« Quels AR pour un élève dyslexique ? » Attendu : le skill aménagements se charge. Claude demande des observations. Il ne déduit pas une liste d'une étiquette.</li>
    <li>« Prépare la réunion d'intégration de jeudi. » Attendu : le skill réunions se charge. Claude demande quelle réunion avant de proposer un ordre du jour.</li>
    <li>« Voici le cas de Lucas D., 9 ans, école X. » (nom fictif) Attendu : Claude s'arrête et signale les données identifiantes.</li>
  </ol>
  <p>Si une réponse échoue : relis le texte du socle (une case laissée entre crochets ou une contradiction avec d'autres instructions en est la cause la plus fréquente), et vérifie que le skill est bien présent et actif dans « Personnalisation ».</p>
</section>

<section id="projet">
  <h2>Pour le cadre légal : un Projet avec la circulaire</h2>
  <p>Le socle ne contient que les principes stables. Le détail du cadre des pôles (AR, IPT, PIA, missions) se trouve dans la circulaire n° 9759 du 07/07/2026 (rentrée 2026-2027). En la joignant à un Projet, Claude peut la consulter et citer la page, au lieu de répondre de mémoire.</p>
  <ol>
    <li>Dans claude.ai, ouvre « Projets » puis clique sur « Nouveau projet ». Donne-lui un nom, par exemple « Circulaire de rentrée ».</li>
    <li>Clique sur « Créer un projet ».</li>
    <li>Ajoute les instructions du Projet : copie le texte ci-dessous.</li>
    <li>Joins le PDF de la circulaire aux fichiers du Projet.</li>
    <li>Pour travailler avec la circulaire, ouvre une conversation dans ce Projet.</li>
  </ol>
${blocProjet}
  <div class="encadre">
    <strong>Ce qui a été vérifié, et ce qui ne l'a pas été.</strong>
    Les étapes 1 et 2 ont été observées le 2026-10-16 sur claude.ai (le projet n'a pas été créé). Les étapes 3 et 4 ne l'ont pas été : les intitulés des écrans peuvent différer. La taille de fichier acceptée (la circulaire fait 120 pages, 8,8 Mo) et le forfait nécessaire n'ont pas été vérifiés. Si le PDF est refusé, préviens le référent numérique du PLAI.
  </div>
  <p>La circulaire dit « ARU » là où le Pôle dit « AU ». Le texte du Projet demande à Claude de signaler l'écart plutôt que de les confondre. La circulaire ne traite pas de l'usage d'outils d'IA : « codes, jamais de noms » et « strict nécessaire » sont de la prudence, pas une autorisation.</p>
</section>

<section id="limites">
  <h2>Ce que ce réglage ne fait pas</h2>
  <ul>
    <li>Il réduit le risque d'invention, il ne le supprime pas. Relire reste obligatoire, surtout pour un PIA ou un compte rendu qui engage l'équipe.</li>
    <li>Le déclenchement d'un skill n'est pas garanti : Claude décide seul de le charger. Il s'est chargé dans 19 exécutions sur 19 pour les demandes qui devaient le déclencher, avec un seul compte, un seul modèle et des formulations choisies par nous. Le socle porte donc seul les règles de rigueur, avec ou sans skill.</li>
    <li>Claude ne peut vérifier une source que s'il peut la consulter : sans recherche web ni document joint dans ton instance, il doit écrire « non vérifié ».</li>
    <li>Travailler sur des codes ne suffit pas toujours : un cas décrit en détail peut rester identifiable. L'extrait de fiche de suivi doit être relu avant envoi. À toi de juger ce que tu donnes à Claude. Je n'ai pas vérifié qu'une règle du pouvoir organisateur ou du Pôle autorise l'envoi de ces données à un outil d'IA.</li>
    <li>Cette version n'a pas été testée avec des agents, ni sur d'autres forfaits ou comptes d'organisation. Le comportement de Claude face à un extrait de fiche contenant un nom n'a pas été testé.</li>
    <li>À revoir chaque année : les points « Missions du Pôle » du socle et la circulaire du Projet valent pour 2026-2027. À chaque rentrée, remplace le PDF du Projet, mets à jour le numéro et la date, relis le socle et les skills. Pour remplacer un skill, importe le nouveau fichier .zip (étape 5).</li>
    <li>Si tu utilises l'application de bureau avec Cowork : une fois, le contenu du fichier Cowork s'est ajouté tout seul au champ « Instructions pour Claude », sous la mention « [Imported from Cowork] ». Après avoir enregistré, relis ton champ.</li>
    <li>Les écrans changent. Les captures de la page Profil datent du 2026-10-16 (Windows, application de bureau).</li>
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

// ---------- modele Word du socle + zips des skills
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
{
  const nom = 'modele-agents-socle.docx'
  const doc = new Document({
    creator: 'PLAI',
    title: nom,
    styles: { default: { document: { run: { font: FONT, size: TAILLE } } } },
    sections: [{
      properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1418, bottom: 1418, left: 1418, right: 1418 } } },
      children: SOCLE.split('\n').map(paragraphe),
    }],
  })
  writeFileSync(join(RACINE, 'public', 'modeles-parametrer', nom), await Packer.toBuffer(doc))
  console.log('écrit', nom)
}
mkdirSync(join(RACINE, 'public', 'modeles-parametrer', 'skills'), { recursive: true })
for (const k of SKILLS) {
  copyFileSync(join(RACINE, 'docs', 'agents-pole', 'skills', `${k.id}.zip`), join(RACINE, 'public', 'modeles-parametrer', 'skills', `${k.id}.zip`))
  console.log('copié', `${k.id}.zip`)
}
