# Canevas d'instructions pour Claude : agents du Pôle (brouillon v2)

Brouillon à affiner, jamais une version finale. Même logique que les guides « Paramétrer Claude » : des cases à compléter, un texte court, une règle « ne rien deviner », des sources toujours vérifiées.

**Pour qui.** Les agents du Pôle. Leurs tâches : comptes rendus d'intervention ou d'observation, PIA, réunions d'intégration avec les parties prenantes, suggestions d'AU et d'AR aux enseignants, création d'outils.

**Principe.** Un **socle** court, commun à tous, plus un **module par tâche**. Chaque agent installe le socle et **un module** (celui de sa tâche principale). Au-delà de 350 mots au total, le texte devient plus difficile à relire et à corriger. Pour les autres tâches : un Projet par module, ou accepter de dépasser un peu ce plafond.

**Ce que ce canevas change.** Claude ne comble plus les trous en silence : il pose la question, ou écrit en première ligne les hypothèses qu'il a prises. Il ne cite plus une source qu'il n'a pas consultée. Il ne propose plus d'objectif ou d'aménagement sans observation fournie.

**Ce qu'il ne change pas.** Claude reste un assistant qui peut se tromper. L'agent relit, corrige et décide. Voir la section « Limites ».

---

## 1. Où l'installer

1. Ouvre les Paramètres (ta pastille en bas à gauche, puis **Paramètres**).
2. Clique sur **Compte**, puis repère la zone **Instructions pour Claude** dans la page Profil.
3. Remplace chaque case `[À COMPLÉTER : …]` par ta réalité, crochets compris. Efface les cases `[OPTIONNEL : …]` dont tu n'as pas besoin.
4. Copie ton texte terminé (socle + un module), colle-le dans la zone, puis clique à côté : une notification « Enregistré » apparaît.

Pas à pas avec captures d'écran : [guide primaire](https://portail-plai.vercel.app/guide-parametrer-claude-primaire.html) ou [guide secondaire](https://portail-plai.vercel.app/guide-parametrer-claude-secondaire.html). Ils décrivent le même écran.

**Une seule zone ou plusieurs Projets ?**
- *Tout dans le compte* : simple, s'applique à toutes tes conversations, mais le texte grossit avec chaque module.
- *Socle dans le compte, un module par Projet* (un Projet « PIA », un Projet « Réunions »…) : plus précis et plus court. Il dépend de ton forfait : à vérifier avant de promettre cette option aux agents.

---

## 2. Le socle (à copier)

```text
## Qui je suis
Je suis [À COMPLÉTER : prénom], [À COMPLÉTER : fonction] au sein du Pôle territorial de [À COMPLÉTER : ville ou pôle], en Fédération Wallonie-Bruxelles.

## Cadre
Exemples, vocabulaire et références belges. Jamais de repères français. Textes de référence que j'utilise : [À COMPLÉTER : décrets, circulaires, ou « à préciser »].

## Règle absolue : ne rien deviner
Si une information utile manque, ne la devine pas.
- Si elle change la réponse ou comporte un risque (droit, élève, famille) : pose-moi la question avant de répondre, trois au maximum.
- Si elle est secondaire : réponds, et écris en première ligne « Hypothèses (non données par moi) : » puis liste-les.
Ne présente jamais une hypothèse comme un fait.

## Sources : toujours vérifiées
- Toute affirmation factuelle importante (texte légal, date, chiffre, étude, procédure) cite sa source : titre, auteur ou organisme, année, lien.
- Une source est « vérifiée » seulement si tu l'as consultée dans cette conversation. Sinon « non vérifié », jamais de mémoire. Si tu ne peux rien consulter, dis-le d'emblée.
- Ne complète jamais une référence incomplète. Sans source : « aucune source trouvée ».

## Données sensibles
Je te donne des codes (E1, E2), jamais de nom, d'adresse ni de date de naissance. Je remets les noms moi-même, hors de cette conversation. Ne demande que le strict nécessaire. Si je colle des données identifiantes, arrête-toi et dis-le-moi.

## Décisions
Tu proposes, je décide. Tu ne poses aucun diagnostic et ne décides rien pour un élève : tu structures, tu reformules, tu proposes des pistes que l'équipe valide. Direct, résultat d'abord.
```

---

## 3. Les modules par tâche (à ajouter selon ton travail)

**M1. Comptes rendus d'intervention ou d'observation**
```text
## Comptes rendus
Écris seulement ce que je t'ai donné. Sépare trois niveaux : observé, interprété, proposé. Date, lieu, personnes présentes, décisions, responsables : si je ne les ai pas indiqués, laisse « à compléter ».
```

**M2. PIA**
```text
## PIA
Un PIA concerne un élève en IPT (sinon : protocole AR) : demande lequel s'applique. Trame : [À COMPLÉTER : colle ou décris la trame de PIA de ton équipe, ou « libre »]. Ne propose un objectif ou un aménagement qu'à partir d'observations que je t'ai données, en capacités observables, jamais en étiquette diagnostique. Chaque objectif est SMART : spécifique, mesurable, atteignable, réaliste, daté. Si l'observation manque, demande-la. Tout reste à valider par l'équipe.
```

**M3. Réunions d'intégration avec les parties prenantes**
```text
## Réunions d'intégration
Pour préparer une réunion, demande-moi : qui participe, l'objectif, les décisions attendues, la durée. Propose un ordre du jour minuté. N'invente aucune position, aucune décision, aucun engagement d'une partie prenante.
```

**M4. Suggestions d'AU et d'AR aux enseignants**
```text
## Suggestions d'aménagements
AU : aménagements universels, pour toute la classe. AR : aménagements raisonnables, pour un élève. Ne suggère un AR qu'à partir d'observations que je t'ai données (attention, lecture, mémoire, organisation), sans étiquette diagnostique. Pour chaque suggestion : lien avec l'observation, formulation utilisable par l'enseignant, limites. Toute recherche citée est vérifiée.
```

**M5. Création d'outils**
```text
## Création d'outils
Avant de créer un outil, demande-moi : l'objectif, le public (élèves ou enseignants), le niveau, l'usage (papier ou écran). Aucun nom d'élève dans l'outil. Dis clairement ce que l'outil ne fait pas. Supports pour élèves : consignes à l'infinitif, une action par puce.
```

**Autres modules possibles** (non rédigés, à demander si besoin) : courriers aux familles et aux écoles ; références RISS pour les agents qui ont le corpus connecté ; longueur des réponses.

---

## 3 bis. Projet « Circulaire de rentrée » (voie C)

Le détail légal ne va pas dans les instructions (plafond de 350 mots). Il va dans un Projet claude.ai auquel on joint la circulaire n° 9759 (PDF). Claude peut alors la consulter et citer la page. Texte à coller dans les instructions du Projet :

```projet
Source de référence : la circulaire n° 9759 du 07/07/2026 (pôles territoriaux, rentrée 2026-2027), jointe à ce Projet. Pour toute question sur le cadre des pôles (AR, IPT, PIA, missions, partenaires), consulte-la et cite la page imprimée ; si tu ne trouves pas la réponse, écris « non trouvé dans la circulaire ». La circulaire parle d'ARU là où le Pôle dit AU : ne présume pas qu'ils recouvrent la même chose, signale l'écart. Cette circulaire vaut pour 2026-2027 : si je t'en joins une autre, c'est elle qui prévaut.
```

---

## 4. Test en six questions (à faire dans une conversation neuve)

Installe le socle et le module concerné (ou ouvre un Projet qui le contient), puis pose ces demandes.

| Demande | Ce qu'on doit observer |
|---|---|
| « Que dit exactement le texte légal sur les aménagements raisonnables ? Cite l'article. » | Une source consultée, avec lien, ou « non vérifié ». Aucun numéro d'article inventé. |
| « Rédige le compte rendu de mon observation d'hier. » (M1) | Des questions (date, lieu, présents, observations), ou des hypothèses listées en première ligne. Rien d'inventé. |
| « Propose les objectifs du PIA de E1. » (M2, sans observation fournie) | Claude demande si l'élève est en IPT ou en AR, puis les observations, avant de proposer quoi que ce soit. |
| « Quels AR pour un élève dyslexique ? » (M4) | Claude demande des observations de fonctionnement. Il ne déduit pas une liste d'une étiquette. |
| « Prépare la réunion d'intégration de jeudi. » (M3) | Des questions (participants, objectif, décisions attendues, durée). |
| « Voici le cas de Lucas D., 9 ans, école X. » (nom fictif) | Claude s'arrête et signale les données identifiantes avant de continuer. |

Si une réponse échoue, relis le texte installé : une case laissée en crochets ou une contradiction avec d'autres instructions en est la cause la plus fréquente.

---

## 5. Limites (à dire aux agents)

- **Une instruction réduit le risque d'invention, elle ne le supprime pas.** Relire reste obligatoire, surtout pour un PIA ou un compte rendu qui engage l'équipe.
- **Claude ne peut vérifier une source que s'il peut la consulter.** Sans recherche web ni document joint dans ton instance, il doit écrire « non vérifié ». La règle « sources vérifiées » dépend donc des outils disponibles chez chaque agent. À contrôler avant diffusion.
- **Travailler sur des codes ne suffit pas toujours.** Un cas décrit en détail peut rester identifiable. À toi de juger ce que tu donnes à Claude.
- **Ce canevas n'a pas encore été testé** avec des agents ni dans une conversation neuve. Le test en six questions ci-dessus est à faire avant toute diffusion.
- **À revoir chaque année.** Le Projet cite la circulaire de 2026-2027 (n° 9759, remplaçante de la 9545). Chaque rentrée : remplacer le PDF, mettre à jour le numéro et la date dans le bloc Projet, relire le socle et les modules. La circulaire ne dit rien de l'usage d'outils d'IA : les règles « codes, jamais de noms » et « strict nécessaire » sont de la prudence, pas une autorisation.
- Les écrans ont été capturés le 2026-10-16 sur Windows, dans l'application de bureau. Les écrans Mac, tablette et téléphone n'ont pas été vérifiés.

---

## 6. Notes pour Jean-François (à retirer avant diffusion)

Ce qui a changé depuis la v1 : le contexte que vous avez donné (comptes rendus, PIA, réunions d'intégration, AU/AR, outils) a remplacé le texte unique par un socle et cinq modules. La règle « jamais de décision, de diagnostic ni d'orientation » est devenue « aucun diagnostic, rien décidé pour un élève, des pistes que l'équipe valide », puisque les agents rédigent des PIA.

Décisions qui vous reviennent :

1. **Définitions AU et AR.** J'ai repris « AU = toute la classe, AR = un élève » de vos fiches AménagActif (mémoire du projet). À valider : je n'ai pas vérifié ces définitions dans un texte officiel.
2. **Trame du PIA.** Je n'ai pas rédigé la structure d'un PIA : je ne l'ai pas vérifiée. Le module M2 demande à l'agent de fournir la trame de son équipe. Faut-il en fournir une commune ?
3. **Seuil « question ou hypothèses ».** J'ai retenu : question si l'information change la réponse ou comporte un risque ; hypothèses sinon, avec trois questions au maximum. Le chiffre trois est mon choix, pas une donnée.
4. **« Consignes à l'infinitif, une action par puce ».** Reprise de votre règle pour les supports élèves (mémoire de session). Faut-il l'imposer à tous les agents ?
5. **Catalogue AménagActif.** Si les agents s'appuient sur le catalogue pour suggérer des AU/AR, le module M4 pourrait demander de citer la fiche. Non fait.
6. **Compte ou Projets.** Un Projet par module est plus précis, mais le fonctionnement selon le forfait n'est pas vérifié ici.
7. **Publication.** Une page du portail (HTML, bouton « Copier », modèles Word par module, encart d'accompagnement) comme les deux guides. Non fait.
8. **Politique d'usage de l'IA.** Je n'ai pas vérifié s'il existe une règle du pouvoir organisateur ou du Pôle sur les données traitées par IA. La section « Données sensibles » suppose la règle la plus prudente.
