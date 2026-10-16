import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const RACINE = join(dirname(fileURLToPath(import.meta.url)), '..')
const lire = (p) => readFileSync(join(RACINE, p), 'utf8')
const norm = (t) => t.replace(/\s+/g, ' ').trim()
const decode = (h) => h.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ')

const textes = (blocs) =>
  blocs.flatMap((b) => (b.t === 'table' ? b.rows.flat() : b.t === 'ul' || b.t === 'ol' ? b.items : b.t === 'hr' ? [] : [b.x]))

const SANS = JSON.parse(lire('docs/exemples/reponse-sans.json'))
const AVEC = JSON.parse(lire('docs/exemples/reponse-avec.json'))

for (const [nom, rep] of [['sans', SANS], ['avec', AVEC]]) {
  test(`reponse ${nom} : transcription fidele (empreinte)`, () => {
    const h = createHash('sha256').update(norm(textes(rep.blocs).join(' ')), 'utf8').digest('hex')
    assert.equal(h, rep.empreinte_texte_normalise_sha256)
  })
}

const PAGES = ['guide-parametrer-claude-primaire.html', 'guide-parametrer-claude-secondaire.html']
for (const page of PAGES) {
  const html = lire(`public/${page}`)
  const texte = norm(decode(html))

  test(`${page} : exemple avec et sans instructions, reponses integrales`, () => {
    assert.ok(html.includes('id="exemple"'), 'section exemple absente')
    for (const rep of [SANS, AVEC]) {
      for (const t of textes(rep.blocs)) {
        assert.ok(texte.includes(norm(t)), `texte absent de la page : ${t.slice(0, 60)}`)
      }
    }
    for (const ligne of SANS.demande.split('\n')) assert.ok(texte.includes(norm(ligne)), `demande absente : ${ligne}`)
  })
  test(`${page} : instructions utilisees, date, modele et limites de l'exemple`, () => {
    const instr = readFileSync(join(RACINE, 'docs/exemples/instructions-utilisees.txt'), 'utf8')
    for (const ligne of instr.split('\n').filter((l) => l.trim())) assert.ok(texte.includes(norm(ligne)), `instruction absente : ${ligne.slice(0, 50)}`)
    for (const s of ['Sonnet 5.5', '2026-10-16', 'ne prouve pas', 'budget nul', 'une seule exécution']) assert.ok(texte.includes(s), `absent : ${s}`)
  })
  test(`${page} : formule PLAI et enregistrement constate`, () => {
    assert.ok(texte.includes('Écoles coopérantes du PLAI'), 'formule du public cible absente')
    assert.ok(texte.includes('notification « Enregistré »'), 'enregistrement constate absent')
    assert.ok(!texte.includes('À vérifier sur ton écran'), 'ancien avertissement encore present')
  })
}

test('instructions utilisees : fichier present, sans balise restante', () => {
  const p = join(RACINE, 'docs/exemples/instructions-utilisees.txt')
  assert.ok(existsSync(p))
  assert.ok(!/\[(À COMPLÉTER|OPTIONNEL)/.test(readFileSync(p, 'utf8')))
})
