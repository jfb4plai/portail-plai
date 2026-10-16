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
