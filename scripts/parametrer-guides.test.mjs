import { test } from 'node:test'
import assert from 'node:assert/strict'

await import('../public/parametrer-copier.js')
const { balisesRestantes } = globalThis.PLAIParametrer

test('texte sans balise : aucun resultat', () => {
  const r = balisesRestantes('Je suis institutrice.')
  assert.deepEqual(r, { obligatoires: [], optionnelles: [] })
})

test('une balise obligatoire est listee', () => {
  const r = balisesRestantes('Je suis [À COMPLÉTER : prénom], titulaire.')
  assert.deepEqual(r.obligatoires, ['[À COMPLÉTER : prénom]'])
})

test('une balise optionnelle va dans optionnelles', () => {
  const r = balisesRestantes('Ecole [OPTIONNEL : immersion en néerlandais].')
  assert.deepEqual(r.optionnelles, ['[OPTIONNEL : immersion en néerlandais]'])
  assert.deepEqual(r.obligatoires, [])
})

test('deux balises identiques sont comptees deux fois', () => {
  const r = balisesRestantes('[À COMPLÉTER : x] et [À COMPLÉTER : x]')
  assert.equal(r.obligatoires.length, 2)
})

test('texte vide : aucun resultat', () => {
  assert.deepEqual(balisesRestantes(''), { obligatoires: [], optionnelles: [] })
})

// ---- Invariants de page (guides primaire et secondaire) ----
import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const PUBLIC = join(dirname(fileURLToPath(import.meta.url)), '..', 'public')
const PAGES = {
  'guide-parametrer-claude-primaire.html': ['instructions', 'immersion', 'locale'],
  'guide-parametrer-claude-secondaire.html': ['instructions', 'locale'],
}

const motsDe = (t) => t.trim().split(/\s+/).filter(Boolean).length
const decode = (h) => h.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ')
const modeles = (html) =>
  [...html.matchAll(/<pre[^>]*data-modele="([^"]+)"[^>]*>([\s\S]*?)<\/pre>/g)].map((m) => ({ nom: m[1], texte: decode(m[2]) }))

for (const [fichier, attendus] of Object.entries(PAGES)) {
  const chemin = join(PUBLIC, fichier)
  if (!existsSync(chemin)) continue
  const html = readFileSync(chemin, 'utf8')
  const texte = decode(html)

  test(`${fichier} : modeles attendus presents`, () => {
    assert.deepEqual(modeles(html).map((m) => m.nom).sort(), [...attendus].sort())
  })
  test(`${fichier} : regle anti-devinette exacte`, () => {
    assert.ok(html.includes('Hypothèses (non données par moi)'))
  })
  test(`${fichier} : modeles de 350 mots maximum, sans balise imbriquee`, () => {
    for (const m of modeles(html)) {
      assert.ok(motsDe(m.texte) <= 350, `${m.nom} : ${motsDe(m.texte)} mots`)
      assert.ok(!/\[[^\]]*\[/.test(m.texte), `${m.nom} : balise imbriquee`)
    }
  })
  test(`${fichier} : termes et donnees interdits absents`, () => {
    for (const interdit of ['ens.ecl.be', 'collège', 'lycée', 'Éducation nationale', 'jf beguin']) {
      assert.ok(!texte.includes(interdit), `present : ${interdit}`)
    }
    assert.ok(html.includes('jf.beguin@outlook.com'))
  })
  test(`${fichier} : images avec alt et fichier existant`, () => {
    const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0])
    assert.ok(imgs.length >= 3)
    for (const tag of imgs) {
      const alt = /\balt="([^"]*)"/.exec(tag)
      assert.ok(alt && alt[1].trim().length > 0, `alt manquant : ${tag}`)
      const src = /\bsrc="([^"]+)"/.exec(tag)[1]
      assert.ok(!src.startsWith('data:'), 'URI data: interdite')
      assert.ok(existsSync(join(PUBLIC, src.replace(/^\//, ''))), `fichier absent : ${src}`)
    }
  })
  test(`${fichier} : ressources, chemin et avertissement`, () => {
    for (const s of ['/parametrer-copier.js', '/plai-logo.jpg', 'name="viewport"', 'Paramètres', 'Compte', 'Profil', 'effacées']) {
      assert.ok(html.includes(s), `absent : ${s}`)
    }
    const logo = /<img\b[^>]*plai-logo[^>]*>/.exec(html)[0]
    const w = /\bwidth="(\d+)"/.exec(logo), h = /\bheight="(\d+)"/.exec(logo)
    assert.ok(!(w && h && w[1] === h[1]), 'logo deforme')
  })
  test(`${fichier} : texte a 16 px minimum`, () => {
    for (const m of html.matchAll(/font-size:\s*([\d.]+)(px|rem)/g)) {
      const v = Number(m[1])
      assert.ok(m[2] === 'px' ? v >= 16 : v >= 1, `font-size ${m[0]}`)
    }
  })
}

test('au moins la page primaire existe', () => {
  assert.ok(existsSync(join(PUBLIC, 'guide-parametrer-claude-primaire.html')))
})
