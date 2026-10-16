// Genere les modeles Word a partir des modeles des pages (source unique : les <pre data-modele> du HTML).
// Usage : node scripts/generer-modeles-word.mjs
// Prerequis : la bibliotheque npm "docx" installee globalement (npm i -g docx). Les .docx produits sont commites.
import { createRequire } from 'node:module'
import { execSync } from 'node:child_process'
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const require = createRequire(join(execSync('npm root -g').toString().trim(), 'x.js'))
const { Document, Packer, Paragraph, TextRun } = require('docx')

const PUBLIC = join(dirname(fileURLToPath(import.meta.url)), '..', 'public')
const SORTIE = join(PUBLIC, 'modeles-parametrer')
const FICHIERS = {
  'guide-parametrer-claude-primaire.html': { instructions: 'modele-primaire.docx', immersion: 'modele-primaire-immersion.docx', locale: 'modele-ordinateur-primaire.docx' },
  'guide-parametrer-claude-secondaire.html': { instructions: 'modele-secondaire.docx', locale: 'modele-ordinateur-secondaire.docx' },
}

const decoder = (h) => h.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"')

// Decoupe une ligne de HTML en segments { texte, mode } : mode = 'obligatoire' | 'facultative' | null
function segments(ligne) {
  const res = []
  const re = /<span class="balise( facultative)?">([\s\S]*?)<\/span>/g
  let dernier = 0, m
  while ((m = re.exec(ligne))) {
    if (m.index > dernier) res.push({ texte: decoder(ligne.slice(dernier, m.index)), mode: null })
    res.push({ texte: decoder(m[2]), mode: m[1] ? 'facultative' : 'obligatoire' })
    dernier = m.index + m[0].length
  }
  if (dernier < ligne.length) res.push({ texte: decoder(ligne.slice(dernier)), mode: null })
  return res
}

const FONT = 'Arial'
const TAILLE = 24 // 12 pt

function paragraphe(ligne) {
  const titre = ligne.startsWith('# ')
  const runs = segments(ligne).map(
    (s) => new TextRun({
      text: s.texte, font: FONT, size: TAILLE, bold: titre,
      highlight: s.mode === 'obligatoire' ? 'yellow' : s.mode === 'facultative' ? 'lightGray' : undefined,
    })
  )
  return new Paragraph({ children: runs, spacing: { after: 80, line: 300 } })
}

mkdirSync(SORTIE, { recursive: true })
for (const [page, fichiers] of Object.entries(FICHIERS)) {
  const html = readFileSync(join(PUBLIC, page), 'utf8')
  for (const m of html.matchAll(/<pre[^>]*data-modele="([^"]+)"[^>]*>([\s\S]*?)<\/pre>/g)) {
    const nom = fichiers[m[1]]
    const lignes = m[2].split('\n')
    const doc = new Document({
      creator: 'PLAI',
      title: nom,
      styles: { default: { document: { run: { font: FONT, size: TAILLE } } } },
      sections: [{
        properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1418, bottom: 1418, left: 1418, right: 1418 } } },
        children: lignes.map(paragraphe),
      }],
    })
    writeFileSync(join(SORTIE, nom), await Packer.toBuffer(doc))
    console.log('écrit', nom)
  }
}
