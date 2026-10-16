// Produit des reponses reelles de Claude, sans puis avec les modeles d'instructions remplis (donnees fictives).
// Usage : ANTHROPIC_API_KEY=... node scripts/generer-exemples-parametrer.mjs   (ou cle non vide dans .env.local ; jamais affichee)
// Sortie : docs/exemples/parametrer-exemples.json
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const RACINE = join(dirname(fileURLToPath(import.meta.url)), '..')
const MODELE = 'claude-sonnet-5-5'

let cle = process.env.ANTHROPIC_API_KEY?.trim()
if (!cle) {
  try {
    cle = (/^ANTHROPIC_API_KEY\s*=\s*(.+)$/m.exec(readFileSync(join(RACINE, '.env.local'), 'utf8')) || [])[1]?.trim().replace(/^["']|["']$/g, '')
  } catch {}
}
if (!cle) throw new Error("ANTHROPIC_API_KEY absente (variable environnement) ou vide dans .env.local")

const decoder = (h) => h.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"')

function modeleRempli(page, reponses) {
  const html = readFileSync(join(RACINE, 'public', page), 'utf8')
  const pre = /<pre[^>]*data-modele="instructions"[^>]*>([\s\S]*?)<\/pre>/.exec(html)[1]
  let i = 0
  const texte = decoder(
    pre.replace(/<span class="balise( facultative)?">([\s\S]*?)<\/span>/g, (_, facultative) => (facultative ? '\u0000OPT\u0000' : `\u0000OBL${i++}\u0000`))
  )
  if (i !== reponses.length) throw new Error(`${page} : ${i} balises obligatoires, ${reponses.length} reponses`)
  return texte
    .split('\n').filter((l) => !l.includes('\u0000OPT\u0000')).join('\n')
    .replace(/\u0000OBL(\d+)\u0000/g, (_, n) => reponses[Number(n)])
}

const EXEMPLES = [
  {
    guide: 'primaire',
    page: 'guide-parametrer-claude-primaire.html',
    demande: [
      'Objectif : faire comprendre que 1/2 et 2/4 représentent la même quantité.',
      'Durée : une séance de 50 minutes.',
      'À produire : le déroulement de la séance avec le minutage, la consigne que je lirai aux élèves, et une trace écrite de trois lignes.',
      'Contrainte : une seule feuille, imprimable en noir et blanc.',
    ].join('
'),
    reponses: [
      'Camille', 'P3', 'Herstal', '21',
      '4 élèves lisent en dessous du niveau P2, 3 élèves allophones arrivés cette année, 1 élève avec un PIA pour dyslexie, 2 élèves rapides qui s\'ennuient',
      'école de quartier, peu de familles parlent français à la maison, une seule classe de P3 pour toute l\'école, peu de budget pour le matériel',
      'un TBI dans la classe, 8 tablettes partagées entre 3 classes, pas d\'ordinateur par élève',
      'les fiches de la méthode de maths de l\'école ; pas de manuel de lecture',
      'j\'enseigne par ateliers autonomes selon les besoins, la manipulation avant l\'abstraction, l\'oral avant l\'écrit ; mes consignes tiennent en trois actions au maximum',
    ],
  },
  {
    guide: 'secondaire',
    page: 'guide-parametrer-claude-secondaire.html',
    demande: [
      'Matière : français.',
      'Objectif : vérifier que mes élèves savent conjuguer les verbes au présent de l'indicatif.',
      'Durée : 30 minutes.',
      'À produire : une interrogation de 10 questions, le corrigé et une grille de correction sur 20.',
      'Contrainte : pas de question piège, une seule page recto.',
    ].join('
'),
    reponses: [
      'Alix', 'français et histoire', 'S2 et S3', 'Herstal', 'générale',
      'S2 A avec 22 élèves, S3 B avec 18 élèves',
      '6 élèves lisent à un niveau de fin de primaire, 3 élèves allophones, 2 élèves avec un PIA pour dyslexie, plusieurs élèves proches du décrochage',
      'compétences terminales de français, programme de la discipline, CE1D pour les S2',
      'école communale de quartier, public populaire, projet d\'établissement centré sur la remédiation, pas d\'internat',
      'une salle informatique partagée, un TBI dans deux locaux, l\'ENT de l\'école, pas d\'ordinateur par élève',
      'un manuel de français en S2 ; pas de manuel d\'histoire',
      'j\'enseigne par tâches complexes à partir de documents réels, je fais verbaliser avant d\'écrire, mes consignes tiennent en trois actions au maximum',
    ],
  },
]

async function appeler(system, demande) {
  const corps = { model: MODELE, max_tokens: 1800, messages: [{ role: 'user', content: demande }] }
  if (system) corps.system = system
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-api-key': cle, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify(corps),
  })
  if (!r.ok) throw new Error(`API ${r.status} : ${(await r.text()).slice(0, 300)}`)
  const j = await r.json()
  return { texte: j.content.filter((b) => b.type === 'text').map((b) => b.text).join('\n'), usage: j.usage, arret: j.stop_reason }
}

const resultats = []
for (const e of EXEMPLES) {
  const instructions = modeleRempli(e.page, e.reponses)
  const sans = await appeler(null, e.demande)
  const avec = await appeler(instructions, e.demande)
  console.log(e.guide, 'sans:', sans.usage.output_tokens, 'tokens,', sans.arret, '| avec:', avec.usage.output_tokens, 'tokens,', avec.arret)
  resultats.push({ guide: e.guide, demande: e.demande, instructions, sans, avec })
}
writeFileSync(
  join(RACINE, 'docs', 'exemples', 'parametrer-exemples.json'),
  JSON.stringify({ date: new Date().toISOString().slice(0, 10), modele: MODELE, voie: 'API Messages, instructions passées en system', exemples: resultats }, null, 2)
)
console.log('écrit docs/exemples/parametrer-exemples.json')
