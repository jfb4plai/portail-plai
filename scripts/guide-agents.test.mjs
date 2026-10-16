import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const RACINE = join(dirname(fileURLToPath(import.meta.url)), '..')
const PUBLIC = join(RACINE, 'public')
const PAGE = 'guide-parametrer-claude-agents-pole.html'
const norm = (t) => t.replace(/\s+/g, ' ').trim()
const decode = (h) => h.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ')
const mots = (t) => t.trim().split(/\s+/).filter(Boolean).length

// Source de vérité : le canevas versionné (socle puis cinq modules, dans cet ordre)
const canevas = readFileSync(join(RACINE, 'docs/agents-pole/canevas-instructions.md'), 'utf8').replace(/\r\n/g, '\n')
const blocs = [...canevas.matchAll(/```text\n([\s\S]*?)```/g)].map((m) => m[1].replace(/\n+$/, ''))
const NOMS = ['socle', 'comptes-rendus', 'pia', 'reunions', 'amenagements', 'outils']
const DOCX = {
  'comptes-rendus': 'modele-agents-comptes-rendus.docx',
  pia: 'modele-agents-pia.docx',
  reunions: 'modele-agents-reunions.docx',
  amenagements: 'modele-agents-amenagements.docx',
  outils: 'modele-agents-outils.docx',
}

test('canevas versionné : socle + 5 modules, SMART dans le module PIA', () => {
  assert.equal(blocs.length, 6)
  assert.ok(blocs[2].includes('SMART : spécifique, mesurable, atteignable, réaliste, daté'))
  for (const b of blocs) assert.ok(!/\[[^\]]*\[/.test(b), 'balise imbriquée')
})

test('canevas : P3 (strict nécessaire), P4 (PIA = IPT) et bloc Projet', () => {
  assert.ok(blocs[0].includes('Ne demande que le strict nécessaire.'))
  assert.ok(blocs[2].includes("Un PIA concerne un élève en IPT (sinon : protocole AR) : demande lequel s'applique."))
  const projet = /```projet\n([\s\S]*?)```/.exec(canevas)
  assert.ok(projet, 'bloc projet absent')
  for (const s of ['circulaire n° 9759 du 07/07/2026', 'cite la page imprimée', 'non trouvé dans la circulaire', 'ARU', 'AU', 'qui prévaut']) {
    assert.ok(projet[1].includes(s), `bloc projet : absent « ${s} »`)
  }
  assert.ok(canevas.toLowerCase().includes('à revoir chaque année'), 'revue annuelle absente du canevas')
})

test('page agents : fichier présent', () => {
  assert.ok(existsSync(join(PUBLIC, PAGE)), 'page absente')
})

if (existsSync(join(PUBLIC, PAGE))) {
  const html = readFileSync(join(PUBLIC, PAGE), 'utf8')
  const texte = norm(decode(html))
  const decodeCompact = (h) => decode(h.replace(/<[^>]+>/g, ''))
  const pres = Object.fromEntries([...html.matchAll(/<pre[^>]*data-modele="([^"]+)"[^>]*>([\s\S]*?)<\/pre>/g)].map((m) => [m[1], decodeCompact(m[2])]))

  test('page agents : socle et modules identiques au canevas', () => {
    assert.deepEqual(Object.keys(pres).sort(), [...NOMS].sort())
    NOMS.forEach((nom, i) => assert.equal(norm(pres[nom]), norm(blocs[i]), `modèle ${nom} différent du canevas`))
  })

  test('page agents : socle + un module, 350 mots maximum', () => {
    for (const nom of NOMS.slice(1)) {
      const total = mots(pres.socle) + mots(pres[nom])
      assert.ok(total <= 350, `${nom} : ${total} mots`)
    }
  })

  test('page agents : règles clés présentes dans le socle', () => {
    for (const s of ['Hypothèses (non données par moi)', 'ne la devine pas', 'non vérifié', 'aucune source trouvée', 'consultée dans cette conversation', "d'adresse ni de date de naissance", 'aucun diagnostic']) {
      assert.ok(pres.socle.includes(s), `socle : absent « ${s} »`)
    }
  })

  for (const [nom, fichier] of Object.entries(DOCX)) {
    test(`page agents : modèle Word ${nom} = socle + module`, () => {
      const chemin = join(PUBLIC, 'modeles-parametrer', fichier)
      assert.ok(existsSync(chemin), `fichier absent : ${fichier}`)
      const sortie = execFileSync('python', ['-I', join(RACINE, 'scripts', 'lire-docx.py'), chemin], { encoding: 'utf8' })
      assert.equal(norm(sortie), norm(pres.socle + '\n' + pres[nom]))
      assert.ok(html.includes(`modeles-parametrer/${fichier}`), 'lien de téléchargement absent')
    })
  }

  test('page agents : exemples réels intégraux (questions 2, 4 et 6 du test)', () => {
    const resultats = readFileSync(join(RACINE, 'docs/agents-pole/resultats-test-canevas.md'), 'utf8')
    for (const num of [2, 4, 6]) {
      const m = new RegExp(`### ${num}\\. [^\\n]*\\n\\n((?:>[^\\n]*\\n?)+)`).exec(resultats)
      assert.ok(m, `réponse ${num} introuvable dans les résultats`)
      const lignes = m[1].split('\n').map((l) => l.replace(/^>\s?/, '').trim()).filter(Boolean)
      assert.ok(lignes.length >= 3)
      for (const l of lignes) assert.ok(texte.includes(norm(l)), `réponse ${num} : ligne absente : ${l.slice(0, 60)}`)
    }
    for (const s of ['Sonnet 5.5', '2026-10-16', 'une seule exécution', 'ne prouve pas']) assert.ok(texte.includes(s), `absent : ${s}`)
  })

  test('page agents : Projet avec la circulaire, bloc copiable, revue annuelle', () => {
    const m = /<pre[^>]*data-bloc="projet"[^>]*>([\s\S]*?)<\/pre>/.exec(html)
    assert.ok(m, 'bloc projet absent de la page')
    const proj = /```projet\n([\s\S]*?)```/.exec(canevas)[1].trim()
    assert.equal(norm(decodeCompact(m[1])), norm(proj))
    assert.ok(!('projet' in pres), 'le bloc projet ne doit pas être un modèle Word')
    for (const s of ['circulaire n° 9759', 'Nouveau projet', 'à revoir chaque année']) assert.ok(texte.toLowerCase().includes(s.toLowerCase()), `absent : ${s}`)
  })

  test('page agents : limites honnêtes affichées', () => {
    for (const s of ['sans recherche', 'pas encore été testé avec des agents', "[Imported from Cowork]", 'module PIA', 'après le test']) {
      assert.ok(texte.includes(s), `limite absente : ${s}`)
    }
  })

  test('page agents : chemins relatifs, images, texte 16 px, contact, aucun vert, encart', () => {
    const racine = [...html.matchAll(/\b(?:src|href)="(\/[^"]+)"/g)].map((m) => m[1])
    assert.deepEqual(racine, [], `chemins absolus : ${racine.join(' ')}`)
    const imgs = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0])
    assert.ok(imgs.length >= 3)
    for (const tag of imgs) {
      const alt = /\balt="([^"]*)"/.exec(tag)
      assert.ok(alt && alt[1].trim(), `alt manquant : ${tag}`)
      assert.ok(existsSync(join(PUBLIC, /\bsrc="([^"]+)"/.exec(tag)[1])), `fichier absent : ${tag}`)
    }
    for (const m of html.matchAll(/font-size:\s*([\d.]+)(px|rem)/g)) assert.ok(m[2] === 'px' ? Number(m[1]) >= 16 : Number(m[1]) >= 1, `font-size ${m[0]}`)
    assert.ok(html.includes('mailto:jeanfrancois.beguin@ens.ecl.be') && !html.includes('outlook'))
    assert.ok(html.includes('référent numérique du PLAI'))
    for (const interdit of ['#0f6e56', '#1d9e75', '#e1f5ee', '--teal', 'collège', 'lycée', 'Éducation nationale']) assert.ok(!html.includes(interdit), `présent : ${interdit}`)
    const debut = html.indexOf('id="accompagnement"')
    const pied = html.indexOf('class="footer"')
    assert.ok(debut > 0 && pied > debut)
    for (const s of ['Je reste disponible', 'individuellement', 'tâche essentielle', 'class="accomp-bouton"']) assert.ok(html.slice(debut, pied).includes(s), `encart : absent ${s}`)
    for (const s of ['src="parametrer-copier.js"', 'src="plai-logo.jpg"', 'name="viewport"', 'Agents du Pôle', 'guide-parametrer-claude-primaire.html', 'guide-parametrer-claude-secondaire.html']) assert.ok(html.includes(s), `absent : ${s}`)
  })
}

test('portail : vignette de la page agents, sans badge public erroné', () => {
  const ts = readFileSync(join(RACINE, 'src/data/apps.ts'), 'utf8')
  const i = ts.indexOf("id: 'claude-parametrer-agents'")
  assert.ok(i > 0, 'vignette absente')
  const fin = ts.indexOf('\n  },', i)
  const entree = ts.slice(i, fin)
  assert.ok(entree.includes("url: '/guide-parametrer-claude-agents-pole.html'"))
  assert.ok(entree.includes("section: 'claude'"))
  assert.ok(!entree.includes('audience:'), 'audience renseignée : le badge afficherait « Enseignant + élève »')
})
