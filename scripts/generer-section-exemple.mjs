// Injecte la section « La même demande, deux réponses » dans les deux guides a partir de docs/exemples/*.
// Usage : node scripts/generer-section-exemple.mjs   (idempotent : remplace entre les marqueurs)
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const RACINE = join(dirname(fileURLToPath(import.meta.url)), '..')
const lire = (p) => readFileSync(join(RACINE, p), 'utf8')
const SANS = JSON.parse(lire('docs/exemples/reponse-sans.json'))
const AVEC = JSON.parse(lire('docs/exemples/reponse-avec.json'))
const INSTRUCTIONS = lire('docs/exemples/instructions-utilisees.txt')

const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const br = (t) => esc(t).replace(/\n/g, '<br>')

function rendre(blocs) {
  return blocs.map((b) => {
    switch (b.t) {
      case 'p': return `<p>${br(b.x)}</p>`
      case 'h2': return `<h4>${esc(b.x)}</h4>`
      case 'h3': return `<h5>${esc(b.x)}</h5>`
      case 'hr': return '<hr>'
      case 'blockquote': return `<blockquote>${br(b.x)}</blockquote>`
      case 'ul': return `<ul>${b.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`
      case 'ol': return `<ol>${b.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ol>`
      case 'table': {
        const [tete, ...lignes] = b.rows
        const th = tete.map((c) => `<th scope="col">${esc(c)}</th>`).join('')
        const tr = lignes.map((l) => `<tr>${l.map((c, i) => `<td data-label="${esc(tete[i])}">${esc(c)}</td>`).join('')}</tr>`).join('')
        return `<table><thead><tr>${th}</tr></thead><tbody>${tr}</tbody></table>`
      }
      default: throw new Error(`bloc inconnu : ${b.t}`)
    }
  }).join('\n')
}

const CSS = `  /* EXEMPLE-CSS */
  section[id] { scroll-margin-top: 110px; }
  .rep { border: 1px solid var(--border2); border-radius: var(--radius); background: var(--surface); margin: 12px 0; padding: 0 16px; }
  .rep > div { padding: 4px 0 16px; }
  .rep h4 { font-family: 'DM Serif Display', serif; font-size: 1.25rem; margin: 16px 0 8px; }
  .rep h5 { font-size: 1.125rem; margin: 16px 0 8px; }
  .rep table { width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 1rem; }
  .rep th, .rep td { border: 1px solid var(--border2); padding: 8px; text-align: left; vertical-align: top; }
  .rep th { background: var(--surface2); }
  .rep blockquote { border-left: 4px solid var(--border2); background: var(--surface2); padding: 4px 16px; margin: 12px 0; }
  .rep hr { border: 0; border-top: 1px solid var(--border2); margin: 16px 0; }
  pre.instr { white-space: pre-wrap; word-wrap: break-word; font-family: 'DM Sans', Arial, sans-serif; font-size: 1rem; line-height: 1.65; padding: 16px; background: var(--surface); border: 1px solid var(--border2); border-radius: var(--radius); }
  @media (max-width: 600px) {
    .rep table, .rep thead, .rep tbody, .rep tr, .rep td { display: block; }
    .rep thead { position: absolute; left: -9999px; }
    .rep tr { border: 1px solid var(--border2); margin-bottom: 12px; }
    .rep td { border: 0; border-bottom: 1px solid var(--border); }
    .rep td::before { content: attr(data-label); display: block; font-weight: 700; color: var(--text2); }
  }
  /* FIN EXEMPLE-CSS */
`

const VARIANTE = {
  primaire: '',
  secondaire: `  <p>L'exemple est pris en P3 pour montrer le mécanisme. Avec ton modèle secondaire rempli, Claude s'appuie de la même façon sur tes classes, ta discipline et tes outils.</p>\n`,
}

function section(guide) {
  return `<!-- EXEMPLE:DEBUT -->
<section id="exemple">
  <h2>La même demande, deux réponses</h2>
  <p>Voici ce que change le modèle de ce guide. La même demande a été posée deux fois à Claude, dans une conversation privée de claude.ai : d'abord sans aucune instruction, puis avec le modèle primaire rempli avec des données fictives (Camille, titulaire de P3 à Herstal).</p>
${VARIANTE[guide]}  <div class="encadre">
    <strong>La demande, identique dans les deux cas</strong>
    ${br(SANS.demande)}
  </div>
  <details>
    <summary>Voir les instructions utilisées pour le cas « avec »</summary>
    <pre class="instr">${esc(INSTRUCTIONS)}</pre>
  </details>
  <h3>Ce qui change</h3>
  <ul>
    <li><strong>Les hypothèses.</strong> Sans instructions, Claude suppose un seul point (le niveau, « P3-P4 »). Avec, il liste cinq hypothèses étiquetées « (non données par moi) » que tu corriges d'un coup d'œil.</li>
    <li><strong>Ta classe.</strong> Avec, la séance prévoit trois ateliers (élèves sous le niveau P2 et allophones, reste de la classe, deux élèves rapides) et une consigne lue à voix haute pour l'élève avec PIA. Sans, une seule séquence identique pour tous.</li>
    <li><strong>Tes outils.</strong> Avec, le TBI sert à la mise en commun et le matériel reste en papier. Sans, aucun outil numérique n'est utilisé.</li>
    <li><strong>Ta pédagogie.</strong> Avec, la consigne tient en trois actions courtes, comme demandé dans les instructions. Sans, c'est un bloc de sept phrases.</li>
    <li><strong>Le ton.</strong> Avec, Claude te tutoie, comme dans tes instructions. Sans, il te vouvoie.</li>
  </ul>
  <div class="encadre attention">
    <strong>Ce qu'il te reste à faire : les 20 %.</strong>
    Relis les hypothèses : « Tu es seule adulte dans la classe » n'était écrit nulle part. Relis aussi les affirmations : la réponse écrit « budget nul » alors que les instructions disaient « peu de budget ». Puis adapte le minutage et les ateliers à tes élèves réels, et mets tes mots.
  </div>
  <details class="rep">
    <summary>Réponse sans instructions, texte intégral</summary>
    <div>
${rendre(SANS.blocs)}
    </div>
  </details>
  <details class="rep">
    <summary>Réponse avec instructions, texte intégral</summary>
    <div>
${rendre(AVEC.blocs)}
    </div>
  </details>
  <h3>Ce que cet exemple ne prouve pas</h3>
  <ul>
    <li>Il s'agit d'une seule exécution par cas : une autre exécution donnerait une autre réponse.</li>
    <li>Claude répond déjà correctement sans instructions : il a même signalé une hypothèse. Les instructions changent l'ancrage dans ta classe, pas la compétence de Claude.</li>
    <li>Il ne prouve pas que la différenciation s'améliore chez les élèves : il montre seulement que les propositions partent de la classe décrite. Voir l'encadré « Ce que dit la recherche ».</li>
    <li>Les instructions de l'exemple sont fictives. Les tiennes seront différentes, et les réponses aussi.</li>
  </ul>
  <p>Conversations du 2026-10-16 sur claude.ai (navigateur, conversation privée), Sonnet 5.5, réglage Moyen. Les réponses sont reproduites telles quelles, titres et tableaux compris.</p>
</section>
<!-- EXEMPLE:FIN -->
`
}

for (const guide of ['primaire', 'secondaire']) {
  const chemin = join(RACINE, 'public', `guide-parametrer-claude-${guide}.html`)
  let html = readFileSync(chemin, 'utf8')
  const bloc = section(guide)
  if (html.includes('<!-- EXEMPLE:DEBUT -->')) {
    html = html.replace(/<!-- EXEMPLE:DEBUT -->[\s\S]*?<!-- EXEMPLE:FIN -->\n?/, () => bloc)
  } else {
    const debut = html.indexOf('<section id="avant">')
    const fin = html.indexOf('</section>', debut) + '</section>'.length
    html = html.slice(0, fin) + '\n\n' + bloc + html.slice(fin)
  }
  if (html.includes('/* EXEMPLE-CSS */')) {
    html = html.replace(/ {2}\/\* EXEMPLE-CSS \*\/[\s\S]*?\/\* FIN EXEMPLE-CSS \*\/\n/, () => CSS)
  } else {
    html = html.replace('  .footer {', () => CSS + '  .footer {')
  }
  if (!html.includes('href="#exemple"')) {
    html = html.replace('<a href="#avant">Avant de commencer</a>', '<a href="#avant">Avant de commencer</a>\n    <a href="#exemple">Exemple</a>')
  }
  writeFileSync(chemin, html, 'utf8')
  console.log('écrit', guide, html.length, 'octets')
}
