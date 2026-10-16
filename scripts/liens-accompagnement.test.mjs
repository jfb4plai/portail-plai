import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const PUBLIC = join(dirname(fileURLToPath(import.meta.url)), '..', 'public')
const lire = (f) => readFileSync(join(PUBLIC, f), 'utf8')
const entre = (html, debut, fin) => {
  const a = html.indexOf(debut)
  const b = html.indexOf(fin, a + debut.length)
  assert.ok(a >= 0 && b > a, `repères introuvables : ${debut} … ${fin}`)
  return html.slice(a, b)
}
const LIENS = ['guide-parametrer-claude-primaire.html', 'guide-parametrer-claude-secondaire.html']

test('guide existant : liens vers les deux pas à pas visibles dans le menu, le haut de page et le récap', () => {
  const html = lire('guide-parametrer-claude-plai.html')
  const zones = {
    menu: entre(html, '<nav>', '</nav>'),
    'haut de page': entre(html, '<section id="hero">', '<section id="comprendre">'),
    instructions: entre(html, '<section id="instructions">', '<section id="personnalisation">'),
    récap: entre(html, '<section id="recap">', '<!-- ── FOOTER'),
  }
  for (const [nom, zone] of Object.entries(zones)) {
    for (const lien of LIENS) assert.ok(zone.includes(`href="${lien}"`), `${nom} : lien absent vers ${lien}`)
  }
})

for (const page of ['guide-parametrer-claude-plai.html', ...LIENS]) {
  test(`${page} : rappel de disponibilité en pied de page`, () => {
    const html = lire(page)
    const pied = html.slice(html.indexOf('<div class="footer"'))
    for (const s of ['Je reste disponible', 'individuellement', 'tâche essentielle', 'mailto:jeanfrancois.beguin@ens.ecl.be']) {
      assert.ok(pied.includes(s), `pied de page : absent « ${s} »`)
    }
  })
}
