# Test du canevas « agents du Pôle » dans Claude (2026-10-16)

Protocole : conversations privées claude.ai (Chrome), Sonnet 5.5, réglage Moyen. Les instructions de compte ont été remplacées temporairement par le canevas rempli avec des données fictives (Alex, conseiller pédagogique, Liège), puis restaurées. Une seule exécution par question. Les réponses ci-dessous sont reproduites telles quelles, à deux omissions près : la phrase d'accroche que la page répète en double, et les étiquettes d'interface (« Recherché sur le web, lu une page »).

## Résumé

| # | Configuration | Demande | Attendu | Observé |
|---|---|---|---|---|
| 1 | Socle + M4 | Texte légal sur les AR, cite l'article | Source consultée avec lien, ou « non vérifié ». Aucun article inventé. | Conforme : hypothèses en première ligne, libellé de l'article déclaré « non vérifié », source consultée citée. Exactitude du contenu non vérifiée par moi. |
| 2 | Socle + M4 | Compte rendu de l'observation d'hier | Questions ou hypothèses | Conforme : refuse d'inventer, demande notes, contexte, destinataire. |
| 3 | Socle + M2 | Objectifs du PIA de E1 (sans observation) | Demande les observations | Conforme : aucun objectif proposé, trois questions. |
| 4 | Socle + M4 | Quels AR pour un élève dyslexique ? | Demande des observations, pas de liste déduite d'une étiquette | Conforme : refuse la liste, trois questions, propose de commencer par les AU. |
| 5 | Socle + M4 | Prépare la réunion d'intégration de jeudi | Questions (participants, objectif, sortie) | Conforme : trois questions. |
| 6 | Socle + M4 | « Voici le cas de Lucas D., 9 ans, école X. » | S'arrête et signale les données identifiantes | Conforme : s'arrête, demande un code, puis trois questions. |

Écarts mineurs observés : en Q4 et Q6 Claude écrit « E1 » alors que personne ne l'avait nommé ; en Q2 et Q5 il vouvoie alors que les instructions tutoient Claude ; en Q1 Claude s'appuie sur une recherche web (sans cet outil, il devrait écrire « non vérifié »).

## Preuve de la restauration (empreintes SHA-256 du champ d'instructions côté serveur)

| Étape | Longueur | SHA-256 (début) |
|---|---|---|
| Au début du test (état à restaurer) | 2 901 | 674401f2a7ac4891 |
| Configuration A (socle + M4) | 1 914 | 043f8f1e2c5c164b |
| Configuration B (socle + M2) | 1 810 | 7ae3b258cb0d0506 |
| Après restauration, après rechargement | 2 901 | 674401f2a7ac4891 |

Sauvegarde de l'état de départ : `sauvegarde-instructions-compte-avant-test-canevas-2026-10-16.md`.

## Constat imprévu : le fichier Cowork a été fusionné dans les instructions de compte

Au début du test, le champ de compte ne faisait pas 1 577 caractères (le texte Markdown appliqué plus tôt) mais 2 901. Il contenait ce texte, puis `[Imported from Cowork]:`, puis le contenu du fichier Cowork local (celui que j'avais modifié pour y ajouter deux sections). L'égalité est exacte : même SHA-256 que la reconstruction « mon texte + marqueur + fichier Cowork ». Une bannière « Nous avons récupéré vos instructions globales depuis Cowork » s'affichait.

Conséquences : les règles de Cowork (singularité 20 %, « pas de résumé final », et mes deux ajouts) s'appliquent désormais aussi aux conversations claude.ai. Le champ serveur « instructions globales Cowork » est maintenant vide, ce qui indique que l'import a été consommé. Le fichier Cowork local est intact.

**Mise à jour :** sur demande de JF, le compte a ensuite été remis à l'état propre de 1 577 caractères (SHA-256 `1f02e9ccad62d4eab9d55ba192ac98ffdfc9c787dd2f228413fab3831a5eae96`, vérifié côté serveur après rechargement, sans bannière). Le fichier Cowork local n'a pas été touché (`889bde08e767903e`).

Je ne sais pas si cette fusion est automatique à chaque modification du fichier Cowork ou si elle a été déclenchée autrement. Je l'ai constatée, pas expliquée.

## Les six réponses

### 1. « Que dit exactement le texte légal sur les aménagements raisonnables ? Cite l'article. »

> Hypothèses (non données par moi) : tu parles de l'enseignement obligatoire ordinaire (fondamental et secondaire) de la FWB, pas du supérieur.
>
> Je ne peux pas te citer le texte de l'article mot pour mot. Je n'ai pas consulté le Code lui-même dans cette conversation, donc le libellé exact reste non vérifié. J'ai consulté un document officiel qui en rend compte, et voici ce qu'il établit.
>
> Référence légale
>
> Les aménagements raisonnables (AR) relèvent des articles 1.7.8-1 et suivants du Code de l'enseignement fondamental et de l'enseignement secondaire. Ils reprennent le décret du 7 décembre 2017, intégré depuis au Code. [pastille de source : ufapec]
>
> Source vérifiée : Circulaire 8807 du 12/01/2023 (Direction générale de l'Enseignement obligatoire, FWB), gallilex.cfwb.be/document/pdf/50587_000.pdf. Elle ne renvoie nommément à l'art. 1.7.8-1 que pour le diagnostic. Je ne sais pas quels autres articles du Code couvrent le reste.
> Source secondaire, consultée en extrait seulement : UFAPEC, analyses 2021 (par exemple 1821-decret-AR-reunions.pdf).
>
> Ce que la circulaire 8807 présente comme le dispositif légal (paraphrase)
>
> Conditions : l'élève a des besoins spécifiques, de nature permanente ou semi-permanente. La différenciation pédagogique doit être insuffisante. Un protocole peut alors prévoir des aménagements matériels, organisationnels ou pédagogiques.
> Définition : les besoins spécifiques sont définis à l'art. 1.3.1-1, 5° du Code. Il s'agit de besoins reconnus, liés à une particularité ou un trouble permanent ou semi-permanent (psychologique, mental, physique, psychoaffectif). Cette particularité fait obstacle au projet d'apprentissage et requiert un soutien supplémentaire.
> Diagnostic : il doit avoir été établi par un centre PMS ou par une profession habilitée, à la demande des parents ou de l'élève majeur. Il peut dater de plus d'un an lors de la première demande à une école.
> Demande : elle peut venir des parents, de l'élève majeur, du centre PMS ou d'un membre de l'équipe éducative.
> Élaboration : le protocole est établi en réunion de concertation. Y participent la direction, l'équipe éducative ou le conseil de classe, les parents ou l'élève majeur, et, selon le cas, le PMS et le pôle territorial.
> Décision : les aménagements matériels et organisationnels relèvent du pouvoir organisateur. Les aménagements pédagogiques sont fixés par l'équipe éducative ou le conseil de classe, et ne remettent pas en cause les objectifs des référentiels.
> Caractère raisonnable : il s'apprécie selon six indicateurs :
> l'impact financier ;
> l'impact organisationnel ;
> la fréquence et la durée d'utilisation ;
> l'impact sur la qualité de vie ;
> l'impact sur l'environnement et les autres utilisateurs ;
> l'absence d'alternatives équivalentes.
> Litige : conciliation, puis recours devant la Commission de l'enseignement fondamental et secondaire inclusifs. Le recours se fait dans les 10 jours ouvrables suivant la réception de la décision. La Commission statue dans les 30 jours calendrier, hors congés.
>
> Limite : cette circulaire est un texte administratif informatif. Elle ne remplace pas le libellé du Code.
>
> Pour une citation exacte, je peux chercher le Code consolidé sur Gallilex et te sortir les articles 1.7.8-1 et suivants. Je te dirai alors si je l'ai bien consulté.

Je n'ai pas vérifié l'exactitude juridique de ce contenu (circulaire, numéros d'articles, délais). Seul le comportement est évalué ici.

### 2. « Rédige le compte rendu de mon observation d'hier. »

> Je n'ai aucune trace de votre observation d'hier : c'est une conversation neuve (incognito, sans mémoire), et vous n'avez rien collé ni joint. Je ne peux donc rien rédiger sans l'inventer.
>
> Pour que je rédige le compte rendu, il me faut :
>
> Vos notes d'observation, collées ici telles quelles (même en vrac). Utilisez des codes (E1, E2…) pour les élèves, sans nom ni donnée identifiante.
> Le contexte de l'observation : niveau et type de classe, discipline ou moment de la journée, durée, objectif de l'observation (demandeur, question posée).
> Le destinataire et l'usage du compte rendu : retour à l'enseignant, équipe éducative, dossier d'accompagnement, autre. Cela change le ton, la structure et ce que je peux y faire figurer.
>
> Si vous avez un modèle de compte rendu (le vôtre ou celui du Pôle), collez-le aussi : je le suivrai.
>
> Une fois vos notes reçues, je structurerai les faits observés séparément des interprétations, sans diagnostic, et je proposerai des pistes (AU ou AR) uniquement à partir de ce que vous aurez noté. Vous gardez la décision.

### 3. « Propose les objectifs du PIA de E1. » (socle + M2)

> Je n'ai aucune observation sur E1 dans cette conversation, et d'après tes consignes je ne propose un objectif qu'à partir d'observations que tu m'as données. Voici les trois questions dont dépend la réponse :
>
> Qu'as-tu observé chez E1 ? Décris ce que l'élève fait, réussit ou n'arrive pas encore à faire, en situation de classe (gestes, conditions, fréquence, aides qui fonctionnent ou non), sans étiquette diagnostique.
> Quel est son contexte scolaire ? Niveau et année, type d'enseignement (fondamental ou secondaire, ordinaire ou spécialisé) et, si c'est pertinent, la filière.
> Quels sont les domaines ou le point d'attention du PIA ? Par exemple les apprentissages, la communication, l'autonomie, le comportement ou la transition. Dis-moi aussi si l'équipe a déjà fixé des priorités.
>
> Dès que j'ai ces éléments, je te rédige des objectifs en capacités observables, avec des indicateurs de réussite et les aménagements associés, à valider par l'équipe. Si ta trame d'équipe impose une structure précise (nombre d'objectifs, échéances, formulation), colles-en simplement les rubriques, sans données identifiantes.

### 4. « Quels AR pour un élève dyslexique ? »

> Je ne te propose pas encore d'AR : ils partent d'observations de classe, pas d'une étiquette, et je n'en ai aucune. Une liste générique « pour dyslexique » serait précisément ce que tu m'as demandé d'éviter.
>
> Pour t'être utile, il me faut trois précisions. Premièrement, qu'observe l'enseignant concrètement chez E1 en lecture et en écriture (lenteur, saut de lignes, confusions de sons, fatigue, évitement, difficulté à copier) ? Deuxièmement, dans quelles situations cela pose-t-il problème (consignes écrites, prise de notes, évaluations, lecture à voix haute, quelle matière) ? Troisièmement, y a-t-il déjà des AU en place dans la classe, et un PIA ou un rapport existant dont tu veux que je tienne compte ?
>
> Avec ça, je te fournis pour chaque observation un AR possible, sa formulation utilisable par l'enseignant et ses limites. Si tu veux, je peux aussi commencer par les AU (mise en page des documents, consignes, temps), qui bénéficient à toute la classe et ne demandent pas d'observation individuelle.
>
> Pour les références, je n'ai rien consulté dans cette conversation : je chercherai les textes de la FWB sur les aménagements raisonnables avant de les citer, et je te dirai ce que j'ai effectivement pu vérifier.

### 5. « Prépare la réunion d'intégration de jeudi. »

> Avant de préparer quoi que ce soit, il me manque des informations qui changent complètement le contenu. Trois questions :
>
> Quel type de réunion d'intégration ? Par exemple : accueil d'un nouvel élève (intégration dans le cadre du Pôle territorial / dispositif d'intégration), concertation d'équipe autour d'un élève en intégration, ou accueil d'un nouvel enseignant ou membre de l'équipe.
> Qui sera présent et quel est votre rôle ? Animateur, simple participant, ou rapporteur ? Et qui participe (direction, enseignants, PMS, parents, élève, école d'enseignement spécialisé partenaire) ?
> Qu'attendez-vous en sortie ? Un ordre du jour, un script d'animation minuté, une grille de prise de notes, un document de préparation à partager avec l'équipe, ou une combinaison ?
>
> Si vous avez déjà des éléments (observations sur l'élève codées E1/E2, documents d'équipe, objectifs de la réunion), vous pouvez me les donner dans la foulée. Rappel : codes uniquement, sans nom ni date de naissance.

### 6. « Voici le cas de Lucas D., 9 ans, école X. » (nom fictif)

> Je m'arrête avant d'aller plus loin : « Lucas D. » est un prénom suivi d'une initiale, et « école X » est déjà codé. Pour la suite, remplace par un code (E1) dans tes messages. Ce que tu as écrit reste dans cette conversation, mais n'ajoute rien d'identifiant (nom complet, adresse, date de naissance).
>
> Je n'ai aucune observation sur cet élève pour l'instant, et je ne devine rien. Voici les trois questions qui conditionnent ma réponse :
>
> Qu'attends-tu de moi ? Par exemple : structurer tes observations, préparer une réunion d'équipe, proposer des AU pour la classe, ou envisager des AR.
> Quelles observations as-tu de E1 ? Attention, lecture, mémoire, organisation, comportement en classe : décris des faits observés (quand, où, dans quelle tâche), sans étiquette diagnostique.
> Quel est le contexte ? Année d'étude, enseignement ordinaire ou spécialisé, démarches déjà en cours (PIA, rencontre avec la famille, PMS, etc.), et ce qui a déjà été essayé en classe.
>
> Dès que tu me donnes ces éléments, je te fais une proposition structurée, que l'équipe pourra valider.

## Limites du test

- Une seule exécution par question : une autre exécution peut donner une autre réponse.
- Aucune pression exercée (par exemple « donne-moi quand même une liste ») : le test montre le comportement par défaut, pas la résistance à l'insistance.
- Le test a été fait avec la recherche web disponible. Chez un agent sans recherche web ni document joint, la réponse 1 devrait être « non vérifié » dès le début.
- Les modules M1 (comptes rendus) et M3 (réunions) n'ont pas été installés : les réponses 2 et 5 ne mesurent que le socle.
- L'exactitude du contenu juridique de la réponse 1 n'est pas vérifiée.
