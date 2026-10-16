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

// Source de vérité : le canevas versionné (un socle) et les cinq skills
const canevas = readFileSync(join(RACINE, 'docs/agents-pole/canevas-instructions.md'), 'utf8').replace(/\r\n/g, '\n')
const blocs = [...canevas.matchAll(/```text\n([\s\S]*?)```/g)].map((m) => m[1].replace(/\n+$/, ''))
const SKILLS = ['comptes-rendus-pole', 'pia-pole', 'reunions-integration-pole', 'amenagements-pole', 'outils-pole']
const AVEC_FICHE = ['pia-pole', 'reunions-integration-pole', 'amenagements-pole', 'outils-pole']
const skillMd = (nom) => readFileSync(join(RACINE, 'docs/agents-pole/skills', nom, 'SKILL.md'), 'utf8').replace(/\r\n/g, '\n')
const lireZip = (chemin) =>
  execFileSync('python', ['-I', '-c', "import sys,zipfile;z=zipfile.ZipFile(sys.argv[1]);n=z.namelist();sys.stdout.buffer.write(('|'.join(n)+'\\n').encode('utf8')+z.read(n[0]))", chemin], { encoding: 'utf8' })

test('canevas versionné : un seul socle, règles clés, sans plafond de mots', () => {
  assert.equal(blocs.length, 1, 'un seul bloc text : le socle')
  const socle = blocs[0]
  assert.ok(!/\[[^\]]*\[/.test(socle), 'balise imbriquée')
  for (const s of [
    'Missions du Pôle : tu restes dans le cadre',
    "Tu ne la conclus pas ; tu peux m'aider à préparer le dossier du CPMS.",
    'Avant toute demande qui concerne un élève',
    'son niveau (année d\'étude), son type d\'enseignement et les difficultés déjà identifiées',
    'Ne demande que le strict nécessaire.',
    "N'ajoute aucune date, durée ni circonstance que je n'ai pas données.",
    'Exactitude et non-complaisance',
    "Ne me donne pas raison par défaut.",
    "charge ce skill avant de répondre, même si ma demande est courte",
    'Hypothèses (non données par moi)',
    'SMART : spécifique, mesurable, atteignable, réaliste, daté',
  ]) assert.ok(socle.includes(s), `socle : absent « ${s} »`)
  assert.ok(!canevas.includes('350 mots'), 'le plafond de 350 mots ne doit plus apparaître')
  assert.ok(!canevas.includes('un module'), 'plus de module à choisir')
})

test('canevas : bloc Projet avec la circulaire et revue annuelle', () => {
  const projet = /```projet\n([\s\S]*?)```/.exec(canevas)
  assert.ok(projet, 'bloc projet absent')
  for (const s of ['circulaire n° 9759 du 07/07/2026', 'cite la page imprimée', 'non trouvé dans la circulaire', 'ARU', 'AU', 'qui prévaut']) {
    assert.ok(projet[1].includes(s), `bloc projet : absent « ${s} »`)
  }
  assert.ok(canevas.toLowerCase().includes('à revoir chaque année'), 'revue annuelle absente du canevas')
})

for (const nom of SKILLS) {
  test(`skill ${nom} : SKILL.md valide, zip identique`, () => {
    const md = skillMd(nom)
    const m = /^---\nname: ([^\n]+)\ndescription: ([^\n]+)\n---\n/.exec(md)
    assert.ok(m, 'frontmatter name + description attendu')
    assert.equal(m[1], nom)
    assert.ok(m[2].length > 150 && m[2].length <= 1024, `description : ${m[2].length} caractères`)
    assert.ok(md.includes('Les règles du socle'), 'renvoi au socle absent')
    assert.ok(canevas.includes(`\`${nom}\``), 'skill absent du tableau du canevas')
    const [entrees, contenu] = lireZip(join(RACINE, 'docs/agents-pole/skills', `${nom}.zip`)).split('\n', 2).concat([''])
    const reste = lireZip(join(RACINE, 'docs/agents-pole/skills', `${nom}.zip`))
    assert.equal(reste.split('\n')[0], `${nom}/SKILL.md`)
    assert.equal(reste.slice(reste.indexOf('\n') + 1).replace(/\r\n/g, '\n'), md, 'le zip ne correspond pas à SKILL.md')
    void entrees; void contenu
  })
}

test('skills : fiche de suivi anonymisée demandée par PIA, réunions, aménagements, outils', () => {
  for (const nom of SKILLS) {
    const md = skillMd(nom)
    if (AVEC_FICHE.includes(nom)) {
      for (const s of ['Source : fiche de suivi de l\'élève', 'anonymisé', 'compte-rendu accompagnement', 'AR utiles à l\'élève', 'Ne demande jamais l\'onglet des informations générales', 'initiales d\'accompagnant']) {
        assert.ok(md.includes(s), `${nom} : absent « ${s} »`)
      }
    } else {
      assert.ok(!md.includes('fiche de suivi'), `${nom} ne demande pas la fiche de suivi`)
    }
  }
})

test('page agents : fichier présent', () => {
  assert.ok(existsSync(join(PUBLIC, PAGE)), 'page absente')
})

if (existsSync(join(PUBLIC, PAGE))) {
  const html = readFileSync(join(PUBLIC, PAGE), 'utf8')
  const texte = norm(decode(html))
  const decodeCompact = (h) => decode(h.replace(/<[^>]+>/g, ''))
  const pres = Object.fromEntries([...html.matchAll(/<pre[^>]*data-modele="([^"]+)"[^>]*>([\s\S]*?)<\/pre>/g)].map((m) => [m[1], decodeCompact(m[2])]))

  test('page agents : le socle est identique au canevas', () => {
    assert.deepEqual(Object.keys(pres), ['socle'])
    assert.equal(norm(pres.socle), norm(blocs[0]))
  })

  test('page agents : bloc Projet copiable, hors modèles Word', () => {
    const m = /<pre[^>]*data-bloc="projet"[^>]*>([\s\S]*?)<\/pre>/.exec(html)
    assert.ok(m, 'bloc projet absent de la page')
    const proj = /```projet\n([\s\S]*?)```/.exec(canevas)[1].trim()
    assert.equal(norm(decodeCompact(m[1])), norm(proj))
    for (const s of ['circulaire n° 9759', 'Nouveau projet', 'à revoir chaque année']) assert.ok(texte.toLowerCase().includes(s.toLowerCase()), `absent : ${s}`)
  })

  test('page agents : modèle Word du socle, plus de modules Word', () => {
    const chemin = join(PUBLIC, 'modeles-parametrer', 'modele-agents-socle.docx')
    assert.ok(existsSync(chemin), 'modèle Word du socle absent')
    const sortie = execFileSync('python', ['-I', join(RACINE, 'scripts', 'lire-docx.py'), chemin], { encoding: 'utf8' })
    assert.equal(norm(sortie), norm(pres.socle))
    assert.ok(html.includes('modeles-parametrer/modele-agents-socle.docx'), 'lien de téléchargement absent')
    for (const ancien of ['comptes-rendus', 'pia', 'reunions', 'amenagements', 'outils']) {
      assert.ok(!existsSync(join(PUBLIC, 'modeles-parametrer', `modele-agents-${ancien}.docx`)), `modèle de module obsolète : ${ancien}`)
      assert.ok(!html.includes(`modele-agents-${ancien}.docx`), `lien obsolète : ${ancien}`)
    }
  })

  for (const nom of SKILLS) {
    test(`page agents : skill ${nom} téléchargeable et identique`, () => {
      const rel = `modeles-parametrer/skills/${nom}.zip`
      assert.ok(html.includes(`href="${rel}"`), 'lien de téléchargement absent')
      assert.ok(existsSync(join(PUBLIC, rel)), 'zip absent de public')
      const publie = lireZip(join(PUBLIC, rel))
      assert.equal(publie.split('\n')[0], `${nom}/SKILL.md`)
      assert.equal(publie.slice(publie.indexOf('\n') + 1).replace(/\r\n/g, '\n'), skillMd(nom))
    })
  }

  test('page agents : import des skills expliqué, limites honnêtes affichées', () => {
    for (const s of ['Importer un Skill', 'Personnalisation', 'Remplacer', 'Compétence chargée', 'compte Pro', 'fiche de suivi', 'anonymisé', 'Le déclenchement']) {
      assert.ok(texte.includes(s), `absent : ${s}`)
    }
    for (const interdit of ['350 mots', 'Un seul module', 'un module selon']) assert.ok(!texte.includes(interdit), `obsolète : ${interdit}`)
    for (const s of ["pas été testée avec des agents", "[Imported from Cowork]", 'à revoir chaque année', 'sans recherche']) {
      assert.ok(texte.toLowerCase().includes(s.toLowerCase()), `limite absente : ${s}`)
    }
  })

  test('page agents : exemples réels de la version précédente, présentés comme tels', () => {
    const resultats = readFileSync(join(RACINE, 'docs/agents-pole/resultats-test-canevas.md'), 'utf8')
    for (const num of [2, 4, 6]) {
      const m = new RegExp(`### ${num}\\. [^\\n]*\\n\\n((?:>[^\\n]*\\n?)+)`).exec(resultats)
      assert.ok(m, `réponse ${num} introuvable dans les résultats`)
      const lignes = m[1].split('\n').map((l) => l.replace(/^>\s?/, '').trim()).filter(Boolean)
      assert.ok(lignes.length >= 3)
      for (const l of lignes) assert.ok(texte.includes(norm(l)), `réponse ${num} : ligne absente : ${l.slice(0, 60)}`)
    }
    for (const s of ['Sonnet 5.5', '2026-10-16', 'version précédente', 'une seule exécution', 'ne prouve pas']) assert.ok(texte.includes(s), `absent : ${s}`)
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
