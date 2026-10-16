# Paramétrer Claude : guides pas à pas primaire et secondaire

Date : 2026-10-16. Statut : spec à relire par JF. Rien n'est implémenté.

## 1. Objectif

Deux guides HTML autonomes, un **primaire** et un **secondaire**, qui accompagnent pas à pas un·e enseignant·e peu à l'aise avec le numérique pour renseigner :

1. **« Instructions pour Claude »** : parcours principal, pour tous.
2. **« Instructions enregistrées sur cet ordinateur »** : parcours **optionnel**, application de bureau + Cowork seulement.

Chaque guide fournit des instructions à copier et adapter, avec balises. Captures d'écran réelles, floutées.

## 2. Public et contraintes (dit par JF)

- Enseignant·es des écoles partenaires du Pôle : enseignement communal, FWB. Certaines en immersion précoce totale.
- Peu aguerri·es au numérique : une action par étape, captures annotées, pas de jargon.
- Les instructions doivent obliger l'enseignant à fournir : profil des apprenants (anonymisé), singularité de l'école, outils numériques disponibles, manuels utilisés, pédagogie personnelle.
- **Règle anti-devinette** : l'IA ne devine aucune information non donnée. Elle pose la question, ou écrit en première ligne « Hypothèses (non données par toi) : … ».
- Principes PLAI : split 80/20, exemples FWB (jamais France), aucun nom d'élève, accessibilité (16 px minimum à l'écran), tutoiement comme le guide existant.

## 3. Constat de l'interface (captures de JF, 2026-10-16)

- Chemin : photo de profil (bas gauche) → **Paramètres** (`Ctrl+,`) → **Compte** → **Profil**.
- Dans Profil, de haut en bas : Nom complet, « Comment souhaitez-vous que Claude vous appelle ? », « Quel type de travail exercez-vous ? », **Instructions pour Claude**, puis **Instructions enregistrées sur cet ordinateur**.
- La zone locale est alimentée par Cowork (fichier local). Texte d'aide : après ajout, elles s'appliquent à toutes les conversations. Boutons : « Ne pas ajouter » et « Ajouter aux Instructions pour Claude ». Les instructions présentes seulement sur un autre ordinateur ou une autre organisation seront effacées au prochain démarrage de Cowork.
- Sur claude.ai (Chrome), « Instructions pour Claude » est au même endroit (Compte → Profil). La zone locale n'existe pas sur le site. Recherche « ordinateur » : aucun résultat.
- **Non vérifié** : l'intitulé exact des boutons sur d'autres versions ou d'autres systèmes que Windows. Le guide l'indique et date ses captures.

## 4. Livrables

| Fichier | Rôle |
|---|---|
| `public/guide-parametrer-claude-primaire.html` | Guide primaire |
| `public/guide-parametrer-claude-secondaire.html` | Guide secondaire |
| `public/captures-parametrer/*.png` | Captures floutées (4 à 6) |
| `public/guide-parametrer-claude-plai.html` | Modifié : le chapitre Instructions renvoie vers les deux guides, chemin « Settings → … » corrigé en « Paramètres → Compte → Profil », e-mail de contact remplacé par `jf.beguin@outlook.com` |
| `src/data/apps.ts` | Deux vignettes (ou vignette `claude-parametrer` mise à jour) |

Le guide existant reste en place pour modèles, personnalisation et Projets. Il n'est pas réécrit.

## 5. Structure commune des deux guides

Style : `plai-style.css`, nav + footer PLAI, logo avec hauteur fixe et largeur auto, teal `#0f6e56`, orange `#f97316`, DM Sans et DM Serif Display, texte 16 px minimum.

1. **Avant de commencer** : 15 minutes ; ce qu'il faut avoir sous la main (ses élèves en tête, le nom de ses outils et manuels) ; règle d'or : aucun nom d'élève.
2. **Étape 1 — Ouvrir les Paramètres** : capture du menu, flèche et numéro.
3. **Étape 2 — Trouver « Profil »** : capture, repères.
4. **Étape 3 — Écrire « Instructions pour Claude »** : les 6 blocs (section 6), un par encadré, avec le modèle à copier.
5. **Étape 4 — Enregistrer** : où cliquer, comment savoir que c'est enregistré.
6. **Étape 5 — Tester** : trois questions-pièges (section 8).
7. **Option, application de bureau + Cowork — la zone locale** : capture, avertissement d'effacement, modèle local court (section 7), bouton « Ne pas ajouter » expliqué.
8. **Si ça ne marche pas** : quatre cas (je ne trouve pas la zone, Claude ne tient pas compte, texte trop long, je veux tout effacer).

Boutons « Copier » sur chaque modèle. Avant copie, un script détecte les balises restantes (`[À COMPLÉTER`) et affiche un avertissement lisible, sans bloquer.

## 6. Modèle « Instructions pour Claude »

Six blocs, dans cet ordre. Balises : `[À COMPLÉTER : exemple]` obligatoire, orange ; `[OPTIONNEL : …]` gris.

**Primaire (version de base)**

```
# Qui je suis
Je suis [À COMPLÉTER : prénom], titulaire de [À COMPLÉTER : P3] à l'école communale de [À COMPLÉTER : commune], en Fédération Wallonie-Bruxelles.
[OPTIONNEL : Mon école pratique l'immersion en [néerlandais / anglais / allemand], [précoce totale / partielle].]

# Mes élèves (anonymisé)
[À COMPLÉTER : nombre] élèves. Profil : [À COMPLÉTER : ex. 4 élèves lisent en dessous du niveau P2, 3 élèves allophones arrivés cette année, 1 élève avec un PIA (dyslexie), 2 élèves rapides qui s'ennuient].
Je ne donne jamais de noms : je parle d'« un élève » ou d'un code.

# Mon école
[À COMPLÉTER : ce qui rend ton école singulière. Ex. quartier, peu de familles francophones, classes à double niveau, projet d'école, contraintes du pouvoir organisateur.]

# Mes outils et mes manuels
Outils numériques à disposition : [À COMPLÉTER : ex. un TBI, 12 tablettes partagées, pas d'ordinateur par élève].
Manuels : [À COMPLÉTER : titre du manuel de maths, de lecture, ou « aucun »].

# Ma pédagogie
[À COMPLÉTER : 2 ou 3 phrases. Ex. j'enseigne par ateliers autonomes, la manipulation avant l'abstraction, l'oral avant l'écrit, mes consignes tiennent en trois actions.]

# Cadre
Socles de compétences et référentiels de la FWB. Vocabulaire et exemples belges uniquement.

# Règle absolue : ne rien deviner
Si une information utile ne figure ni ici ni dans ma demande, ne la devine pas.
Soit tu me poses la question avant de répondre. Soit tu écris en première ligne « Hypothèses (non données par moi) : » et tu les listes, une par ligne.
Ne présente jamais une hypothèse comme un fait.
```

**Variantes**
- **Primaire immersion** : bloc « Qui je suis » obligatoire sur la langue d'immersion ; bloc « Mes élèves » ajoute `[À COMPLÉTER : niveau de français / de langue d'immersion à l'oral et à l'écrit]` ; bloc « Ma pédagogie » ajoute `[À COMPLÉTER : qui enseigne en quelle langue, quelles matières]` ; règle supplémentaire : « Ne traduis jamais sans me le demander ; dis dans quelle langue tu réponds. »
- **Secondaire** : « Qui je suis » = prénom, discipline(s), degré(s), école communale, commune, filière ; « Mes élèves » = classes concernées (`S2 A`, `S4 qualifiante`), effectif, profils anonymisés ; « Cadre » = référentiels et épreuves (CE1D, CESS, CQ selon le cas) ; « Mon école » = option, internat, public, pouvoir organisateur ; « Mes outils et mes manuels » = ENT, outils de l'école, manuels par discipline. Les autres blocs sont identiques.

**Longueur** : chaque modèle fait environ 300 mots une fois rempli. Le guide existant recommande de rester sous 250 mots. Le nouveau guide annonce 300 à 350 mots comme plafond pour ce modèle, et explique que les balises obligatoires justifient ce dépassement. Le guide existant n'est pas modifié sur ce point. **À valider par JF.**

## 7. Modèle « Instructions enregistrées sur cet ordinateur » (optionnel)

Court, centré sur l'ordinateur, pas sur la pédagogie.

```
# Mes dossiers
Mes documents de classe sont dans [À COMPLÉTER : chemin complet du dossier, ex. C:\Users\Prénom\Documents\Classe-P3].
Sous-dossiers : [À COMPLÉTER : ex. maths, français, évaluations].

# Mes manuels sur cet ordinateur
[À COMPLÉTER : ex. PDF des manuels dans le dossier Manuels, ou « aucun »].

# Avant de modifier un fichier
Ne modifie, ne déplace et ne supprime aucun fichier sans me demander.
Travaille sur une copie nommée « nom_v2 ».

# Données d'élèves
Ne produis aucun fichier contenant un nom d'élève. Si un document en contient, arrête-toi et dis-le-moi.

# Règle absolue : ne rien deviner
Même règle que dans mes Instructions pour Claude : question, ou « Hypothèses (non données par moi) : » en première ligne.
```

Avertissement affiché : « Ajouter ces instructions aux Instructions pour Claude les rend valables partout. Les instructions enregistrées seulement sur un autre ordinateur seront effacées au prochain démarrage de Cowork. »

## 8. Test intégré (étape 5)

Trois questions à poser dans une nouvelle conversation, avec ce qu'on doit observer :

1. « Prépare-moi une activité sur les fractions. » → Claude pose des questions ou liste ses hypothèses (niveau, matériel, durée).
2. « Écris un mot aux parents pour la sortie. » → Claude demande date, lieu, coût ou les liste comme hypothèses.
3. « Propose un exercice de lecture pour mon élève le plus faible. » → Claude refuse de deviner le profil, ou énonce ses hypothèses.

Si Claude répond sans question ni hypothèse : renvoi vers « Si ça ne marche pas ».

## 9. Captures

À partir des captures de JF (écrans 2, 3 et 4 reçus le 2026-10-16) et de captures claude.ai prises dans Chrome. Elles sont stockées dans `public/captures-parametrer/` après traitement.

- **Floutage par script (PIL)** : nom complet, « comment vous appeler », e-mail, contenu des deux zones de texte, titres de sessions.
- **Annotations en HTML/CSS** (cercles numérotés positionnés en pourcentage), pas incrustées dans l'image : modifiables, lisibles par lecteur d'écran.
- `alt` descriptif sur chaque image.
- Date de capture et version de l'interface affichées sous chaque image.
- Les originaux non floutés ne sont jamais copiés dans `public/`.

## 10. Ce que ces guides ne font pas bien (à dire dans les guides)

- Ils ne remplacent pas le jugement de l'enseignant : l'IA propose, il corrige (split 80/20).
- Les écrans changent ; capturés le 2026-10-16, Windows, application de bureau.
- Une instruction ne garantit pas une réponse exacte ; elle réduit le risque d'invention.

## 11. Références scientifiques

Aucune référence n'est ajoutée sans vérification via `mcp__RISS__search_articles`. Si un guide cite une source pour justifier la règle anti-devinette ou la personnalisation, elle est vérifiée avant écriture ; sinon aucune citation.

## 12. Recette

1. Ouverture des deux pages sur ordinateur et à 375 px de large, sans défilement horizontal.
2. Bouton « Copier » : avertissement avec balises restantes, absence d'avertissement sans balise.
3. Aucun nom, e-mail ni titre de session lisible dans les captures.
4. Lecture par JF avec un·e collègue peu à l'aise, en observant où elle ou il bloque.
5. Test des trois questions-pièges par JF dans une conversation neuve, après collage du modèle rempli avec des données fictives.
6. `npx vite build` du portail passe avant tout `git push` ; branche `main`.
7. Vignettes à jour dans `apps.ts` (dépôt et déploiement séparés).

## 13. Hors périmètre

- Pas de modification des guides modèles, Projets, mémoire.
- Pas de génération des instructions par une app (outil futur possible : formulaire qui assemble le modèle).
- Pas de guide Mac, mobile ou web seul : à faire si les captures sont fournies.

## 14. Points à valider par JF

1. Plafond de 300 à 350 mots pour le modèle (section 6).
2. Une page par guide ou une seule page avec bascule primaire/secondaire (retenu : deux pages).
3. Texte exact de la règle anti-devinette, y compris « Hypothèses (non données par moi) ».
