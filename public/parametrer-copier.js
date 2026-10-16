// Guides « Paramétrer Claude » : copie des modèles et détection des balises restantes.
// Script classique (pas de module) ; testé sous Node via scripts/parametrer-guides.test.mjs.
(function () {
  var RE_OBLIGATOIRE = /\[À COMPLÉTER[^\]]*\]/g
  var RE_OPTIONNELLE = /\[OPTIONNEL[^\]]*\]/g

  function balisesRestantes(texte) {
    var t = texte || ''
    return {
      obligatoires: t.match(RE_OBLIGATOIRE) || [],
      optionnelles: t.match(RE_OPTIONNELLE) || [],
    }
  }

  function selectionner(el) {
    var range = document.createRange()
    range.selectNodeContents(el)
    var sel = window.getSelection()
    sel.removeAllRanges()
    sel.addRange(range)
  }

  function afficher(zone, message) {
    if (!zone) return
    zone.textContent = message
    zone.hidden = !message
  }

  function brancher(bouton) {
    var cible = document.getElementById(bouton.getAttribute('data-copier'))
    var zone = document.querySelector(
      '[data-avertissement-pour="' + bouton.getAttribute('data-copier') + '"]'
    )
    var libelle = bouton.textContent
    if (!cible) return

    bouton.addEventListener('click', function () {
      var texte = cible.textContent
      var restantes = balisesRestantes(texte).obligatoires
      var avertissement = restantes.length
        ? 'Il reste ' + restantes.length + ' balise(s) orange à remplacer : ' + restantes.join(' ')
        : ''

      function reussi() {
        bouton.textContent = 'Copié'
        afficher(zone, avertissement)
        setTimeout(function () { bouton.textContent = libelle }, 2000)
      }
      function secours() {
        selectionner(cible)
        afficher(
          zone,
          'Le texte est sélectionné : appuie sur Ctrl+C pour le copier.' +
            (avertissement ? ' ' + avertissement : '')
        )
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(texte).then(reussi, secours)
      } else {
        secours()
      }
    })
  }

  function initBoutonsCopier(racine) {
    var doc = racine || document
    var boutons = doc.querySelectorAll('button[data-copier]')
    for (var i = 0; i < boutons.length; i++) brancher(boutons[i])
  }

  globalThis.PLAIParametrer = { balisesRestantes: balisesRestantes, initBoutonsCopier: initBoutonsCopier }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { initBoutonsCopier() })
    } else {
      initBoutonsCopier()
    }
  }
})()
