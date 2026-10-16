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


const lum = (hex) => {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]
}
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p)
  return (x + 0.05) / (y + 0.05)
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
  test(`${fichier} : zone locale : non modifiable prevue, avertissement fidele, bouton sans promesse`, () => {
    assert.ok(html.includes("Si le curseur n'apparaît pas dans la zone"), 'cas zone non modifiable absent')
    assert.ok(html.includes('à la suite de « Instructions pour Claude »'), 'repli absent')
    assert.ok(html.includes('ou sous une autre organisation sur celui-ci'), "citation de l'avertissement absente")
    assert.ok(!html.includes('En cas de doute, clique sur'), 'promesse sur Ne pas ajouter')
    assert.ok(html.includes('ne clique sur aucun'), 'conseil de prudence absent')
  })
  test(`${fichier} : pastilles contrastees (4,5:1) et premiere capture non agrandie`, () => {
    const v = /--pastille:\s*(#[0-9a-fA-F]{6})/.exec(html)
    assert.ok(v, 'variable --pastille absente')
    assert.ok(ratio('#ffffff', v[1]) >= 4.5, `contraste ${ratio('#ffffff', v[1]).toFixed(2)}`)
    assert.ok(/\.pt\s*\{[^}]*var\(--pastille\)/.test(html) && /\.pt-l\s*\{[^}]*var\(--pastille\)/.test(html), 'pastilles pas sur --pastille')
    assert.ok(/class="cadre etroit"/.test(html) && /\.cadre\.etroit\s*\{[^}]*max-width:\s*484px/.test(html), 'capture 01 non limitee')
  })
  test(`${fichier} : pas de ton vert PLAI (style des autres modes d'emploi)`, () => {
    for (const interdit of ['#0f6e56', '#1d9e75', '#e1f5ee', '#0b5844', '--teal']) {
      assert.ok(!html.includes(interdit), `present : ${interdit}`)
    }
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

// ---- Guide existant et vignettes ----
test('guide existant : chemins corriges, renvois, contact', () => {
  const html = readFileSync(join(PUBLIC, 'guide-parametrer-claude-plai.html'), 'utf8')
  assert.ok(!html.includes('Settings'), 'reste "Settings"')
  assert.ok(!html.includes('Instructions for Claude'), 'reste "Instructions for Claude"')
  assert.ok(!html.includes('ens.ecl.be'), 'reste ens.ecl.be')
  assert.ok(html.includes('jf.beguin@outlook.com'))
  assert.ok(html.includes('guide-parametrer-claude-primaire.html'))
  assert.ok(html.includes('guide-parametrer-claude-secondaire.html'))
  assert.ok(html.includes('Paramètres'))
})

test('apps.ts : deux vignettes des nouveaux guides', () => {
  const ts = readFileSync(join(PUBLIC, '..', 'src', 'data', 'apps.ts'), 'utf8')
  for (const id of ['claude-parametrer-primaire', 'claude-parametrer-secondaire']) {
    assert.ok(ts.includes(`id: '${id}'`), id)
  }
  assert.ok(ts.includes("url: '/guide-parametrer-claude-primaire.html'"))
  assert.ok(ts.includes("url: '/guide-parametrer-claude-secondaire.html'"))
})

// ---- Modeles Word : meme contenu que les modeles de la page ----
import { execFileSync } from 'node:child_process'

const WORD = {
  'guide-parametrer-claude-primaire.html': { instructions: 'modele-primaire.docx', immersion: 'modele-primaire-immersion.docx', locale: 'modele-ordinateur-primaire.docx' },
  'guide-parametrer-claude-secondaire.html': { instructions: 'modele-secondaire.docx', locale: 'modele-ordinateur-secondaire.docx' },
}
for (const [page, fichiers] of Object.entries(WORD)) {
  const html = readFileSync(join(PUBLIC, page), 'utf8')
  for (const m of modeles(html)) {
    test(`${page} : modele Word ${m.nom} identique au modele de la page`, () => {
      const chemin = join(PUBLIC, 'modeles-parametrer', fichiers[m.nom])
      assert.ok(existsSync(chemin), `fichier absent : ${fichiers[m.nom]}`)
      const texteWord = execFileSync('python', ['-I', join(PUBLIC, '..', 'scripts', 'lire-docx.py'), chemin], { encoding: 'utf8' })
      const norm = (t) => t.replace(/\s+/g, ' ').trim()
      assert.equal(norm(texteWord), norm(m.texte))
      assert.ok(html.includes(`modeles-parametrer/${fichiers[m.nom]}`), 'lien de telechargement absent de la page')
    })
  }
}
