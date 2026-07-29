# Révision pédagogique de l'Espace Parents — Design

## 1. Contexte

Suite au chantier Ateliers pour parents, exigence explicite de l'utilisateur : le contenu déjà livré (9 fiches troubles, Guide des droits, Décodeur) doit être plus pédagogique pour des parents qui n'ont pas les bases des enseignants, et plus sensible à la difficulté d'accepter un trouble durable chez son enfant. Le bandeau partagé (`BANDEAU_INDIVIDUALISATION`) et les questions des Ateliers ont déjà été mis à jour dans le chantier précédent avec la validation émotionnelle et la nuance "durable ≠ figé". Ce chantier couvre le reste.

## 2. Périmètre et méthode

Après relecture complète des 9 fiches (`src/data/parentsFiches.ts`), le jargon non expliqué est localisé, pas généralisé. Décision actée en brainstorming : **révision ciblée**, pas réécriture complète des 54 blocs — corriger précisément ce qui pose problème, garder intact ce qui fonctionne déjà (contenu vérifié RISS).

Trois interventions par fiche :
1. **Jargon** : glose courte ajoutée inline pour les 2 termes techniques non expliqués repérés (mémoire de travail, anxiété de séparation).
2. **Concret** : une scène quotidienne ajoutée où le texte reste abstrait (repéré : dyscalculie).
3. **Clôture d'espoir** : une phrase ajoutée à la fin de `commentAider` (clair + FALC), sur le modèle déjà appliqué aux Ateliers — rappelle que le trouble ne disparaît pas mais que l'aide change concrètement le quotidien. Adaptée pour le haut potentiel (qui n'est pas un trouble à corriger).

Guide des droits : déjà conçu pour définir son jargon juridique au fil du texte (PIA, aménagement raisonnable, CPMS) — pas de changement nécessaire dans ce chantier, le problème signalé ne s'y retrouve pas à la même échelle.

Décodeur (`api/decodeur.ts`) : ajout d'une instruction dans le prompt système pour que le contenu généré à la volée suive aussi ces principes (vocabulaire simple, exemples concrets).

## 3. Modifications exactes, fiche par fiche

### Dyslexie
Pas de jargon à corriger, pas de scène à ajouter. Clôture d'espoir ajoutée à `commentAider` :
- **clair**, ajouter : " La dyslexie ne disparaît pas avec ces aménagements, mais elle cesse d'être un obstacle quotidien : beaucoup d'enfants dyslexiques bien accompagnés deviennent d'excellents lecteurs, à leur façon."
- **falc**, ajouter : " La dyslexie ne part pas avec ces aides. Mais elle dérange moins chaque jour. Beaucoup d'enfants dyslexiques bien aidés lisent très bien, à leur façon."

### Dyscalculie
`ceQueCaChange.clair` : gloser "mémoire de travail" et ajouter une scène concrète. Remplacer :
> "L'anxiété mathématique — la peur de se tromper en maths — envahit la mémoire de travail et laisse peu de place au raisonnement : plus votre enfant est stressé par un exercice de calcul, moins il a de ressources cognitives pour le résoudre, même s'il en est capable. Cela peut créer un cercle vicieux où chaque évaluation chronométrée aggrave la difficulté réelle."

Par :
> "L'anxiété mathématique — la peur de se tromper en maths — envahit la mémoire de travail (la capacité à garder plusieurs informations « en tête » en même temps pour les manipuler) et laisse peu de place au raisonnement : plus votre enfant est stressé par un exercice de calcul, moins il a de ressources pour le résoudre, même s'il en est capable. Concrètement : il connaît sa table de 7 par cœur à la maison, mais le jour du contrôle chronométré, le stress lui fait tout oublier."

`commentAider` clôture d'espoir :
- **clair**, ajouter : " La dyscalculie ne disparaît pas, mais réduire la pression du temps et valoriser la méthode plutôt que le résultat change vraiment ce que votre enfant peut montrer de ce qu'il sait faire."
- **falc**, ajouter : " La dyscalculie ne part pas. Mais moins de pression aide vraiment votre enfant à montrer ce qu'il sait faire."

### TDAH
Pas de jargon, pas de scène à ajouter. Clôture d'espoir :
- **clair**, ajouter : " Le TDAH ne disparaît pas à l'adolescence pour beaucoup d'enfants, mais un cadre adapté à la maison et à l'école change réellement sa capacité à réussir et à se sentir compétent."
- **falc**, ajouter : " Le TDAH ne part pas toujours en grandissant. Mais un bon cadre aide vraiment votre enfant à réussir."

### TSA
Pas de jargon supplémentaire, pas de scène à ajouter. Clôture d'espoir :
- **clair**, ajouter : " Le TSA ne disparaît pas, mais des repères stables et prévisibles réduisent vraiment l'anxiété de votre enfant au quotidien et l'aident à se sentir en sécurité."
- **falc**, ajouter : " Le TSA ne part pas. Mais des repères clairs aident vraiment votre enfant à se sentir en sécurité."

### Troubles visuo-spatiaux
Pas de jargon supplémentaire, pas de scène à ajouter. Clôture d'espoir :
- **clair**, ajouter : " Ce trouble ne disparaît pas, mais des repères visuels simples changent vraiment ce que votre enfant arrive à produire, sans lien avec ce qu'il comprend réellement."
- **falc**, ajouter : " Ce trouble ne part pas. Mais des repères simples aident vraiment votre enfant à s'organiser."

### Langage oral (dysphasie)
Pas de jargon supplémentaire, pas de scène à ajouter. Clôture d'espoir :
- **clair**, ajouter : " La dysphasie ne disparaît pas d'un coup, mais une prise en charge orthophonique précoce et de la patience à la maison changent vraiment la trajectoire de votre enfant, y compris pour l'apprentissage futur de la lecture."
- **falc**, ajouter : " La dysphasie ne part pas d'un coup. Mais une aide précoce change vraiment beaucoup de choses pour votre enfant."

### Dyspraxie
Pas de jargon supplémentaire, pas de scène à ajouter (déjà vivant : "écriture illisible... sans lien avec son niveau de compréhension"). Clôture d'espoir :
- **clair**, ajouter : " La dyspraxie ne disparaît pas, mais l'ordinateur et moins de copie changent vraiment ce que votre enfant peut montrer de ses idées, indépendamment de son geste graphique."
- **falc**, ajouter : " La dyspraxie ne part pas. Mais l'ordinateur aide vraiment votre enfant à montrer ses idées."

### Haut potentiel
Cas différent : le HPI n'est pas un trouble à "surmonter". Clôture adaptée, pas de jargon à corriger, pas de scène à ajouter :
- **clair**, ajouter : " Le haut potentiel n'est pas un problème à corriger, mais un fonctionnement qui a besoin d'être nourri année après année — un enfant bien stimulé et bien accompagné, y compris sur ses éventuelles difficultés associées, s'épanouit durablement."
- **falc**, ajouter : " Le haut potentiel n'est pas un problème. C'est une façon de fonctionner qui a besoin d'attention chaque année. Un enfant bien accompagné va bien, sur la durée."

### Anxiété scolaire
`ceQueCaChange.clair` : gloser "anxiété de séparation". Remplacer :
> "Cette détresse peut avoir plusieurs origines : anxiété de performance, anxiété de séparation, ou parfois harcèlement entre pairs — le harcèlement scolaire est associé à une anxiété significativement plus élevée et à une moins bonne qualité de vie. Le lien entre l'origine de l'anxiété et les symptômes observés n'est pas toujours évident depuis la maison."

Par :
> "Cette détresse peut avoir plusieurs origines : la peur de ne pas réussir, l'anxiété de séparation (la peur d'être loin de vous, fréquente chez les plus jeunes), ou parfois le harcèlement entre pairs — associé à une anxiété significativement plus élevée et à une moins bonne qualité de vie. Le lien entre l'origine de l'anxiété et les symptômes observés n'est pas toujours évident depuis la maison."

`commentAider` clôture d'espoir :
- **clair**, ajouter : " Cette anxiété ne disparaît pas toujours du jour au lendemain, mais un retour progressif bien accompagné change vraiment la trajectoire de votre enfant — la grande majorité des enfants suivis tôt reprennent une scolarité stable."
- **falc**, ajouter : " Cette peur ne part pas toujours d'un coup. Mais un retour progressif bien accompagné aide vraiment votre enfant."

## 4. Décodeur — instruction de prompt

Dans `api/decodeur.ts`, ajouter une règle à la liste existante du prompt système :
> "- Utilise un vocabulaire simple, sans jargon non expliqué ; illustre avec une situation concrète du quotidien scolaire ou familial quand c'est pertinent."

## 5. Hors scope

Guide des droits (jugé déjà conforme). Réécriture complète des blocs `cEstQuoi`/`ceQueCaChange` au-delà des ajustements ciblés listés ci-dessus. Vérification RISS des sources existantes (non affectées — aucune nouvelle affirmation scientifique introduite, seulement de la clarification de vocabulaire et du liant narratif).

## 6. Vérification

- `npx tsc -b --noEmit` et `npx vite build` passent.
- Relecture visuelle d'au moins 3 fiches (dyslexie, dyscalculie, haut potentiel — cas particulier) en navigateur, dans les deux modes clair/FALC.
- Confirmer qu'aucune source RISS n'a été supprimée ou altérée (seuls les blocs `cEstQuoi`/`ceQueCaChange`/`commentAider` sont touchés, jamais `sources`).
