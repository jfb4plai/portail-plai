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
    récap: entre(html, '<section id="recap">', '<section id="accompagnement"'),
  }
  for (const [nom, zone] of Object.entries(zones)) {
    for (const lien of LIENS) assert.ok(zone.includes(`href="${lien}"`), `${nom} : lien absent vers ${lien}`)
  }
})

for (const page of ['guide-parametrer-claude-plai.html', ...LIENS]) {
  test(`${page} : encart d'accompagnement visible, avant le pied de page`, () => {
    const html = lire(page)
    const debut = html.indexOf('id="accompagnement"')
    const pied = html.indexOf('class="footer"')
    assert.ok(debut > 0 && pied > debut, 'encart absent ou placé après le pied de page')
    const encart = html.slice(debut, pied)
    for (const s of ['Je reste disponible', 'individuellement', 'tâche essentielle', 'mailto:jeanfrancois.beguin@ens.ecl.be', 'class="accomp-bouton"']) {
      assert.ok(encart.includes(s), `encart : absent « ${s} »`)
    }
    assert.ok(!html.slice(pied).includes('Je reste disponible'), 'rappel dupliqué dans le pied de page')
    const css = /\.accomp-carte p\s*\{[^}]*font-size:\s*([\d.]+)rem/.exec(html)
    assert.ok(css && Number(css[1]) >= 1.125, 'texte de l\'encart trop petit')
  })
}
