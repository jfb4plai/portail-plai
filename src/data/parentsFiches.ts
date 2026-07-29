import type { ParentFiche } from '../types';

export const BANDEAU_INDIVIDUALISATION =
  "Découvrir une difficulté durable chez son enfant n'est jamais simple à accepter — c'est normal d'avoir besoin de temps. Durable ne veut pas dire figé : des progrès concrets restent possibles. Un enfant n'est pas son trouble : cette page donne des repères généraux, ce qui compte est la réalité vécue par votre enfant, pas l'étiquette diagnostique.";

export const FALC_DISCLAIMER =
  "Cette fiche s'inspire des règles du Facile à Lire et à Comprendre (FALC), mais n'est pas une traduction FALC certifiée — celle-ci exige une relecture par une personne porteuse de déficience intellectuelle.";

const parentsFiches: ParentFiche[] = [
  {
    id: 'dyslexie',
    emoji: '📖',
    titre: 'Comprendre la dyslexie',
    cEstQuoi: {
      clair:
        "La dyslexie est un trouble spécifique de l'apprentissage de la lecture : le cerveau associe plus difficilement les lettres aux sons qu'elles représentent. Ce n'est ni un manque d'intelligence, ni un manque de travail — c'est une différence neurologique durable. Certains enfants dyslexiques lisent lentement, d'autres confondent des lettres proches (b/d, p/q), d'autres encore comprennent bien à l'oral mais butent sur l'écrit.",
      falc:
        "La dyslexie touche la lecture. Le cerveau a plus de mal à relier les lettres aux sons. Ce n'est pas un manque d'intelligence. Ce n'est pas un manque d'effort. Chaque enfant dyslexique lit différemment.",
    },
    ceQueCaChange: {
      clair:
        "À l'école, votre enfant peut se fatiguer plus vite en lecture, mettre plus de temps pour les mêmes exercices, ou éviter de lire à voix haute par peur de se tromper. L'expérience scolaire des enfants avec troubles des apprentissages est parfois vécue comme éprouvante sur le plan psychologique — pas seulement académique. À la maison, les devoirs de lecture peuvent devenir une source de tension si le rythme attendu ne correspond pas à celui de votre enfant.",
      falc:
        "À l'école, lire peut fatiguer votre enfant plus vite. Il peut mettre plus de temps. Il peut avoir peur de se tromper devant la classe. À la maison, les devoirs de lecture peuvent être difficiles. Ce n'est pas de la mauvaise volonté.",
    },
    commentAider: {
      clair:
        "Adapter la police (sans empattement, bien espacée), augmenter la taille du texte et l'interligne facilite la lecture. La synthèse vocale permet de séparer la compréhension du décodage — votre enfant peut comprendre une histoire complexe même s'il ne peut pas encore la lire seul. Valorisez ce qu'il comprend à l'oral, pas seulement ce qu'il déchiffre à l'écrit.",
      falc:
        "Utilisez une police simple et un texte plus grand. Utilisez la lecture à voix haute par ordinateur. Votre enfant peut comprendre une histoire sans savoir la lire seul. Félicitez ce qu'il comprend. Pas seulement ce qu'il lit.",
    },
    sources: [
      {
        id: 'dumas-04304754',
        citation:
          "Deleuze, C. (2023). Troubles spécifiques des apprentissages : création d'une action de sensibilisation à destination des enseignants en école élémentaire.",
        content:
          "Les enseignants sont souvent peu sensibilisés aux troubles Dys, alors qu'ils en sont en demande. Une action de sensibilisation montre une nette amélioration des connaissances et du sentiment de compétence pour accompagner les élèves concernés.",
      },
      {
        id: 'dumas-03279190',
        citation:
          "Adrian, S. (2021). Dimension psychoaffective des enfants présentant des troubles des apprentissages et effets de la sensibilisation par la simulation en classe en ergothérapie.",
        content:
          "L'expérience scolaire des enfants avec troubles des apprentissages est décrite comme pouvant être traumatisante, provoquant des niveaux de détresse et de douleur psychique.",
      },
      {
        id: 'hal-03962468',
        citation:
          "Coffin, M., Goulet, C. & Piquard-Kipffer, A. (2023). L'accessibilité numérique au service des étudiants dyslexiques.",
        content:
          "La modification de la typographie (interligne, police sans empattement, espacement) et la synthèse vocale permettent de gagner en accès au sens et de réduire la fatigue de lecture.",
      },
      {
        id: 'tel-04807443',
        citation:
          "Balssa, F. (2024). Facile à Lire et à Comprendre (FALC) et école inclusive : questionnements et applications des règles FALC en école élémentaire.",
        content:
          "Le FALC officiel exige une relecture participative par une personne porteuse de déficience intellectuelle — justifie la mention 'inspiré du FALC, non certifié' affichée sur chaque fiche.",
      },
    ],
  },
  {
    id: 'dyscalculie',
    emoji: '🔢',
    titre: 'Comprendre la dyscalculie',
    cEstQuoi: {
      clair:
        "La dyscalculie est un trouble spécifique du sens du nombre et du calcul : votre enfant a du mal à estimer une quantité, à mémoriser les tables, ou à comprendre la valeur des chiffres selon leur position. Ce n'est pas un problème de logique générale — un enfant dyscalculique peut être très à l'aise en raisonnement, en langage ou en sciences, et pourtant buter sur des calculs simples.",
      falc:
        "La dyscalculie touche les chiffres et les calculs. L'enfant a du mal à estimer une quantité. Il a du mal à retenir les tables. Ce n'est pas un problème d'intelligence. Un enfant dyscalculique peut être fort dans d'autres matières.",
    },
    ceQueCaChange: {
      clair:
        "L'anxiété mathématique — la peur de se tromper en maths — envahit la mémoire de travail et laisse peu de place au raisonnement : plus votre enfant est stressé par un exercice de calcul, moins il a de ressources cognitives pour le résoudre, même s'il en est capable. Cela peut créer un cercle vicieux où chaque évaluation chronométrée aggrave la difficulté réelle.",
      falc:
        "Les maths peuvent faire peur à votre enfant. La peur prend de la place dans sa tête. Il lui reste moins de place pour calculer. Plus il a peur, plus c'est difficile. Ce n'est pas parce qu'il ne comprend pas.",
    },
    commentAider: {
      clair:
        "Entraîner le sens du nombre par la manipulation concrète et le placement sur une droite graduée améliore la représentation mentale des quantités, davantage que la répétition mécanique des tables. Réduisez la pression du chronomètre à la maison. Valorisez les stratégies de calcul, pas seulement le résultat final.",
      falc:
        "Faites manipuler des objets pour compter. Utilisez une droite graduée. Évitez le chronomètre à la maison. Un calcul juste sans stress vaut mieux qu'un calcul raté sous pression. Félicitez la méthode, pas seulement la bonne réponse.",
    },
    sources: [
      {
        id: 'dumas-05241399',
        citation:
          "Favodon, A. & Wasielewski, B. (2025). Le jeu mathématique comme outil évaluatif pour réduire l'anxiété des élèves.",
        content:
          "L'anxiété mathématique envahit la mémoire de travail et laisse peu de place à l'activité cognitive réelle — un cercle vicieux qui aggrave la difficulté observée.",
      },
      {
        id: 'dumas-04161650',
        citation:
          "Ginésy, M. (2023). Anxiété mathématique : apport de la sophrologie chez l'adolescent présentant un trouble des apprentissages mathématiques. Étude d'un cas clinique.",
        content:
          "La détérioration des processus cognitifs par l'anxiété mathématique, notamment de la mémoire de travail, majore les difficultés chez les élèves à besoins spécifiques.",
      },
      {
        id: 'dumas-03285680',
        citation:
          "Sayegh, M. (2021). Intérêt d'un entraînement autour de la ligne numérique avec apport de stratégies explicites chez des sujets présentant un trouble des apprentissages mathématiques.",
        content:
          "L'entraînement au placement sur droite numérique améliore le sens du nombre chez les élèves présentant des troubles de la cognition mathématique.",
      },
    ],
  },
  {
    id: 'tdah',
    emoji: '⚡',
    titre: 'Comprendre le TDAH',
    cEstQuoi: {
      clair:
        "Le Trouble Déficit de l'Attention avec ou sans Hyperactivité (TDAH) est un trouble neurologique qui touche la régulation de l'attention, de l'impulsivité et parfois du niveau d'activité motrice. C'est la pathologie la plus fréquente parmi les troubles du comportement chez l'enfant, et elle entraîne souvent de réelles difficultés scolaires — pas un manque de discipline ou d'envie de bien faire.",
      falc:
        "Le TDAH touche l'attention. Il touche aussi parfois le mouvement et l'impulsivité. C'est un trouble neurologique, pas un problème de discipline. Beaucoup d'enfants ont un TDAH. Ce n'est pas rare.",
    },
    ceQueCaChange: {
      clair:
        "En classe, votre enfant peut avoir du mal à rester assis, à attendre son tour, ou à maintenir son attention sur une tâche longue — même s'il comprend parfaitement la consigne. À la maison, les devoirs peuvent prendre beaucoup plus de temps que prévu, non par manque de compréhension mais par difficulté à maintenir l'effort attentionnel jusqu'au bout.",
      falc:
        "En classe, votre enfant peut avoir du mal à rester assis. Il peut avoir du mal à attendre son tour. Il peut perdre le fil d'une tâche longue. Il comprend quand même la consigne. À la maison, les devoirs peuvent prendre plus de temps que prévu.",
    },
    commentAider: {
      clair:
        "La collaboration entre vous, l'enseignant et les professionnels qui suivent votre enfant est un levier reconnu : un cahier de liaison régulier ou des objectifs partagés entre l'école et la maison aident à ajuster les attentes des deux côtés. Découpez les devoirs en étapes courtes avec des pauses actives plutôt qu'une session longue et immobile.",
      falc:
        "Parlez régulièrement avec l'enseignant. Utilisez un cahier de liaison si besoin. Découpez les devoirs en petites étapes. Laissez des pauses pour bouger. Cela aide votre enfant à tenir plus longtemps.",
    },
    sources: [
      {
        id: 'dumas-03288500',
        citation:
          "Priol, A. (2021). Partenariat entre enseignants de l'école élémentaire, parents et orthophonistes : quelle collaboration autour du TDAH ?",
        content:
          "Les parents, les enseignants et les orthophonistes ont des rôles déterminants et complémentaires dans le suivi de l'enfant avec TDAH.",
      },
      {
        id: 'dumas-04903104',
        citation: 'Bourgeois, C. (2024). École inclusive et TDAH.',
        content:
          "Le TDAH est la pathologie la plus fréquente parmi les troubles du comportement chez l'enfant ; trouble neurologique entraînant de grandes difficultés scolaires.",
      },
      {
        id: 'dumas-02865941',
        citation:
          "Ghio, C. (2020). La collaboration entre ergothérapeutes et enseignants auprès d'enfants atteints de TDAH en école inclusive.",
        content:
          "Dans une école inclusive, la structure et l'adaptation de l'enseignant, en lien avec les professionnels paramédicaux, contribuent au suivi de l'enfant avec TDAH.",
      },
    ],
  },
  {
    id: 'tsa',
    emoji: '🧩',
    titre: "Comprendre le trouble du spectre de l'autisme",
    cEstQuoi: {
      clair:
        "Le Trouble du Spectre de l'Autisme (TSA) est un trouble neurodéveloppemental qui touche la communication sociale, les interactions et souvent le traitement sensoriel (bruit, lumière, texture). Le mot « spectre » est important : deux enfants avec un diagnostic de TSA peuvent avoir des profils très différents — certains parlent peu, d'autres beaucoup mais de façon particulière ; certains recherchent le contact, d'autres l'évitent.",
      falc:
        "Le TSA touche la communication. Il touche aussi parfois les sens : bruit, lumière, toucher. Le mot « spectre » veut dire que chaque enfant est différent. Deux enfants avec un TSA ne se ressemblent pas forcément.",
    },
    ceQueCaChange: {
      clair:
        "En classe, votre enfant peut avoir besoin de repères visuels et d'une structure prévisible pour se sentir en sécurité — un changement d'emploi du temps non annoncé peut être plus déstabilisant pour lui que pour d'autres élèves. Un retrait soudain peut survenir après une accumulation de sollicitations sensorielles ou sociales, sans que cela soit visible avant qu'il n'arrive.",
      falc:
        "Votre enfant a besoin de repères clairs. Un changement surprise peut le déstabiliser. Parfois il peut se fermer d'un coup. C'est une réaction à une fatigue accumulée. Ce n'est pas un caprice.",
    },
    commentAider: {
      clair:
        "Les supports visuels (pictogrammes, emploi du temps illustré) aident votre enfant à anticiper ce qui l'attend et réduisent l'anxiété liée à l'implicite. Prévenez des changements à l'avance quand c'est possible, et donnez-lui accès à un endroit calme pour se réguler en cas de besoin, à l'école comme à la maison.",
      falc:
        "Utilisez des images pour montrer le programme de la journée. Prévenez des changements à l'avance. Prévoyez un endroit calme pour se reposer. Cela aide votre enfant à se sentir en sécurité.",
    },
    sources: [
      {
        id: 'dumas-02445449',
        citation: 'Ravet, P.-A. (2019). Enfants neuroatypiques et aménagement de la classe.',
        content:
          "Les enfants neuroatypiques, dont les enfants TSA, bénéficient d'aménagements de classe pensés pour prévenir les situations de rupture (« shutdown ») liées à une accumulation de sollicitations.",
      },
      {
        id: 'dumas-01927713',
        citation: "Barany, M. & Charbonnier, C. (2018). Inclusion d'un élève avec des troubles du spectre autistique.",
        content:
          "La mise en place d'un emploi du temps visuel des différentes activités de la journée permet de ritualiser les activités et de les matérialiser pour l'élève TSA.",
      },
      {
        id: 'tel-04530743',
        citation:
          'Chastang, J. (2023). Troubles du neurodéveloppement de l\'enfant : vécu des parents et des enseignants, qualité de vie et outil de repérage.',
        content:
          "Le vécu des parents d'enfants avec TSA est marqué par un besoin de repérage et d'accompagnement partagé entre la famille et l'école.",
      },
    ],
  },
  {
    id: 'troubles-visuo-spatiaux',
    emoji: '🗺️',
    titre: 'Comprendre les troubles visuo-spatiaux',
    cEstQuoi: {
      clair:
        "Les troubles visuo-spatiaux touchent la façon dont le cerveau organise et interprète l'espace : se repérer sur une page, organiser un cahier, copier une figure géométrique ou évaluer des distances peut être difficile, alors que le langage et le raisonnement verbal sont souvent bien préservés. On les retrouve parfois associés à la dyspraxie ou regroupés sous le terme de trouble d'apprentissage non-verbal.",
      falc:
        "Les troubles visuo-spatiaux touchent le repérage dans l'espace. Se repérer sur une page peut être difficile. Copier un dessin peut être difficile. Le langage, lui, va souvent bien. Ce trouble est parfois lié à la dyspraxie.",
    },
    ceQueCaChange: {
      clair:
        "En classe, votre enfant peut avoir du mal à s'organiser sur une feuille (marges, alignement), à lire un tableau à double entrée, ou à se repérer sur une carte ou un plan. Un enfant très à l'aise à l'oral peut sembler en difficulté 'sans raison' dès qu'un exercice demande de l'organisation visuelle — ce décalage surprend souvent l'entourage.",
      falc:
        "Écrire droit sur une feuille peut être difficile. Lire un tableau peut être difficile. Se repérer sur une carte peut être difficile. Votre enfant peut très bien parler et comprendre. Ce décalage est normal pour ce trouble.",
    },
    commentAider: {
      clair:
        "Des repères visuels simples (feuilles avec marges pré-tracées, tableaux agrandis et espacés) réduisent la charge liée à l'organisation spatiale. Laissez du temps supplémentaire pour les tâches de copie ou de mise en page, et privilégiez l'explication verbale des consignes spatiales plutôt que la seule démonstration visuelle.",
      falc:
        "Utilisez des feuilles avec des repères déjà tracés. Donnez plus de temps pour copier. Expliquez les consignes à voix haute, pas seulement en montrant. Cela aide votre enfant à s'organiser.",
    },
    sources: [
      {
        id: 'dumas-01026293',
        citation: "Claveloux, E. (2014). Étude des habiletés sociales chez l'enfant dyspraxique visuospatial.",
        content:
          "Les enfants présentant un trouble du traitement visuospatial montrent des difficultés de discrimination et de perception sociale liées à ce trouble spécifique.",
      },
      {
        id: 'dumas-05139935',
        citation:
          "Gruel, M. (2025). Le syndrôme de dysfonction non verbale (SDNV) ou trouble d'apprentissage non-verbal : contribution à l'identification de critères diagnostiques d'un trouble du neurodéveloppement fréquent et méconnu.",
        content:
          "Le SDNV, ou trouble d'apprentissage non-verbal, est un trouble neurodéveloppemental fréquent et méconnu caractérisé par des troubles visuo-spatiaux avec préservation relative du langage.",
      },
      {
        id: 'W4412454689',
        citation:
          "Joffroy-Frixons, A., Colas, P., Abed, K., Gruel, M. & Habib, M. (2025). Le syndrome de dysfonctions non verbales (SDNV) : actualisation des connaissances et analyse d'une cohorte de 89 patients.",
        content:
          "Cohorte clinique confirmant un trouble visuospatial ou constructif avéré comme critère diagnostique central, distinct des troubles sévères du langage oral.",
      },
    ],
  },
  {
    id: 'langage-oral',
    emoji: '🗣️',
    titre: 'Comprendre les troubles du langage oral (dysphasie)',
    cEstQuoi: {
      clair:
        "La dysphasie est un trouble sévère et durable du développement du langage oral : votre enfant peut avoir du mal à construire des phrases, à trouver ses mots, ou à comprendre des consignes complexes, alors que son intelligence non-verbale est préservée. Ce trouble s'accompagne souvent de difficultés associées (attention, mémoire) qui compliquent le repérage précoce.",
      falc:
        "La dysphasie touche le langage oral. Construire des phrases peut être difficile. Trouver ses mots peut être difficile. L'intelligence de l'enfant n'est pas touchée. C'est un trouble reconnu et pris en charge.",
    },
    ceQueCaChange: {
      clair:
        "En classe, votre enfant peut comprendre moins bien les consignes orales longues, avoir du mal à raconter un événement dans l'ordre, ou paraître en retrait dans les échanges de groupe — non par manque d'idées, mais par difficulté à les mettre en mots rapidement. Le jeu, notamment en maternelle, reste un vecteur d'apprentissage du langage important, y compris pour ces enfants.",
      falc:
        "Une consigne orale longue peut être difficile à suivre. Raconter un événement dans l'ordre peut être difficile. Votre enfant a des idées. Il a du mal à les dire vite. Le jeu aide à apprendre le langage.",
    },
    commentAider: {
      clair:
        "Un diagnostic et une prise en charge orthophonique précoces améliorent nettement l'évolution du trouble et l'apprentissage ultérieur de la lecture. À la maison, reformulez les consignes en phrases courtes, laissez du temps pour répondre, et valorisez la communication non-verbale (gestes, dessins) comme appui, pas comme substitut à corriger.",
      falc:
        "Un diagnostic précoce aide beaucoup. Une orthophoniste peut accompagner votre enfant. Donnez des consignes courtes. Laissez du temps pour répondre. Les gestes et les dessins peuvent aider à communiquer.",
    },
    sources: [
      {
        id: 'dumas-03936634',
        citation: 'Liagre, C. (2021). La dysphasie dans les revues scientifiques traitant des besoins éducatifs particuliers.',
        content:
          "La dysphasie est présentée dans la littérature comme un trouble spécifique du langage oral, parfois associé à d'autres troubles complémentaires comme la dyspraxie.",
      },
      {
        id: 'dumas-01513822',
        citation:
          "Andrieux, H. (2011). La prise en charge des enfants dysphasiques : analyse et recherche des bénéfices d'un diagnostic précoce, d'une prise en charge orthophonique intensive et d'un apprentissage de la lecture anticipé.",
        content:
          "Un diagnostic précoce et une prise en charge orthophonique intensive améliorent l'évolution du trouble et facilitent l'apprentissage ultérieur de la lecture.",
      },
      {
        id: 'dumas-01696941',
        citation: "Danton, M. (2017). Notion de jeu en maternelle chez l'enfant dysphasique.",
        content:
          "Le jeu en maternelle reste un vecteur essentiel du développement du langage, y compris pour les enfants présentant un trouble du langage oral.",
      },
    ],
  },
  {
    id: 'dyspraxie',
    emoji: '✋',
    titre: 'Comprendre la dyspraxie',
    cEstQuoi: {
      clair:
        "La dyspraxie, ou trouble développemental de la coordination (TDC), touche la planification et l'automatisation des gestes : s'habiller, faire du vélo, ou surtout écrire à la main peuvent demander à votre enfant un effort conscient que d'autres enfants automatisent rapidement. C'est un trouble neurologique reconnu par l'expertise collective de l'Inserm, distinct d'un simple manque d'entraînement.",
      falc:
        "La dyspraxie touche les gestes. Écrire à la main peut demander beaucoup d'effort. S'habiller peut demander beaucoup d'effort. Ce n'est pas un manque d'entraînement. C'est un trouble reconnu par la médecine.",
    },
    ceQueCaChange: {
      clair:
        "En classe, l'écriture manuscrite peut coûter tellement d'énergie à votre enfant qu'il lui reste moins de ressources pour réfléchir au contenu de ce qu'il écrit — un enfant dyspraxique peut avoir de bonnes idées et une écriture illisible ou très lente, sans lien avec son niveau de compréhension. La copie, le graphisme ou l'utilisation d'instruments de géométrie sont souvent particulièrement coûteux.",
      falc:
        "Écrire à la main peut fatiguer votre enfant très vite. Il peut avoir de bonnes idées et une écriture difficile à lire. Copier un texte peut être très fatigant. Utiliser une règle ou un compas peut être difficile.",
    },
    commentAider: {
      clair:
        "L'ordinateur ou la tablette pour écrire, quand c'est possible, libère l'attention de votre enfant pour le contenu plutôt que le geste. Réduisez la quantité de copie demandée à la maison, et valorisez ce qu'il sait, indépendamment de la qualité graphique de son écriture.",
      falc:
        "L'ordinateur peut aider votre enfant à écrire. Réduisez la copie à la maison si possible. Jugez ce que votre enfant sait. Pas seulement son écriture.",
    },
    sources: [
      {
        id: 'hal-03346364',
        citation:
          "Vaivre-Douret, L., Mazeau, M., Jolly, C., Huron, C., Arnaud, C., Gonzalez-Monge, S. & Assaiante, C. (2021). L'expertise collective de l'Inserm sur le trouble développemental de la coordination ou dyspraxie : état des principaux travaux et recommandations.",
        content:
          "Expertise collective de référence établissant le trouble développemental de la coordination (dyspraxie) comme un trouble neurologique reconnu, avec recommandations de prise en charge.",
      },
      {
        id: 'dumas-04711962',
        citation: "Boitelle, A. (2024). Écrire pour exister : rééducation de l'écriture et Trouble Développemental de la Coordination.",
        content:
          "L'écriture manuscrite représente un coût cognitif et moteur majeur pour l'enfant avec TDC, indépendant de son niveau de compréhension du contenu.",
      },
      {
        id: 'hal-02408788',
        citation:
          "Albaret, J.-M., Arnaud, C., Assaiante, C., Gonzalez-Monge, S., Huron, C., Jolly, C., Kaiser, M.-L., Liotard, P., Mazeau, M., Tallet, J., Vaivre-Douret, L. & Woollven, M. (2019). Trouble développemental de la coordination ou dyspraxie.",
        content:
          "Consensus international sur la terminologie et le diagnostic du trouble développemental de la coordination, encore couramment désigné par le terme de dyspraxie.",
      },
    ],
  },
  {
    id: 'haut-potentiel',
    emoji: '💡',
    titre: 'Comprendre le haut potentiel intellectuel',
    cEstQuoi: {
      clair:
        "Le haut potentiel intellectuel (HPI) concerne environ 2 à 2,5 % des enfants d'âge scolaire. Ce n'est pas toujours synonyme de facilité scolaire : certains enfants HPI s'ennuient et décrochent, d'autres masquent leur potentiel pour s'intégrer, et une partie présente aussi des troubles des apprentissages associés qui peuvent retarder ou compliquer le repérage.",
      falc:
        "Le haut potentiel intellectuel touche environ 2 enfants sur 100. Ce n'est pas toujours facile à l'école. Certains enfants HPI s'ennuient. D'autres cachent leurs capacités. Certains ont aussi un autre trouble en même temps.",
    },
    ceQueCaChange: {
      clair:
        "En classe, votre enfant peut sembler distrait ou peu motivé alors qu'il s'ennuie faute de défi, ou au contraire multiplier les questions qui bousculent le rythme du groupe. Le parcours avant l'identification du haut potentiel est souvent vécu par les parents comme long et confus, avec des interprétations contradictoires du comportement de l'enfant selon les interlocuteurs.",
      falc:
        "Votre enfant peut sembler distrait s'il s'ennuie. Il peut poser beaucoup de questions. Le chemin avant un diagnostic est souvent long. Les avis peuvent être différents selon les personnes. Ce n'est pas facile pour les parents.",
    },
    commentAider: {
      clair:
        "Proposer des approfondissements plutôt que davantage du même exercice évite l'ennui sans accélérer artificiellement le programme. Si des difficultés d'apprentissage coexistent avec le haut potentiel, ne les minimisez pas au prétexte de l'intelligence de votre enfant — un trouble associé mérite le même accompagnement que chez tout autre enfant.",
      falc:
        "Proposez des activités plus profondes, pas juste plus d'exercices. Si votre enfant a aussi un autre trouble, ne le sous-estimez pas. Il a besoin d'aide comme un autre enfant.",
    },
    sources: [
      {
        id: 'hal-05195587',
        citation:
          'Martin, M.-A., Courtinat-Camps, A. & Guignard, J.-H. (2025). Points de vue de parents sur le parcours pré-identificatoire du haut potentiel intellectuel.',
        content:
          "Le parcours des parents avant l'identification du haut potentiel intellectuel de leur enfant est souvent décrit comme long et marqué par des interprétations divergentes.",
      },
      {
        id: 'dumas-03641633',
        citation:
          "Manikom-Permal, A.-S. (2021). Étude qualitative de l'expérience de la parentalité d'enfant à haut potentiel intellectuel avec des difficultés comportementales.",
        content:
          "Les enfants à haut potentiel intellectuel peuvent présenter des difficultés comportementales associées, qui nécessitent un accompagnement spécifique au même titre qu'un autre enfant.",
      },
      {
        id: 'dumas-01503726',
        citation:
          "Duhard, C. (2013). Recherche de particularités orthophoniques chez des enfants intellectuellement précoces présentant des troubles des apprentissages associés.",
        content:
          "La précocité intellectuelle s'associe parfois à des difficultés d'apprentissage du langage écrit, qui constituent une population à risque de repérage tardif et d'échec scolaire incompris.",
      },
    ],
  },
  {
    id: 'anxiete-scolaire',
    emoji: '😰',
    titre: "Comprendre l'anxiété scolaire",
    cEstQuoi: {
      clair:
        "L'anxiété scolaire va du simple stress avant une évaluation jusqu'au refus scolaire anxieux (parfois appelé « phobie scolaire ») : une détresse si intense à l'idée d'aller à l'école que l'enfant peut développer des symptômes physiques (maux de ventre, nausées) le matin. Ce n'est ni un caprice ni un simple refus d'obéir — c'est une réaction anxieuse qui échappe au contrôle volontaire de l'enfant.",
      falc:
        "L'anxiété scolaire va du simple stress à une vraie peur d'aller à l'école. Certains enfants ont mal au ventre le matin. Ce n'est pas un caprice. C'est une vraie détresse pour l'enfant.",
    },
    ceQueCaChange: {
      clair:
        "Cette détresse peut avoir plusieurs origines : anxiété de performance, anxiété de séparation, ou parfois harcèlement entre pairs — le harcèlement scolaire est associé à une anxiété significativement plus élevée et à une moins bonne qualité de vie. Le lien entre l'origine de l'anxiété et les symptômes observés n'est pas toujours évident depuis la maison.",
      falc:
        "Plusieurs causes sont possibles. La peur des évaluations. La peur d'être séparé de vous. Le harcèlement par d'autres élèves. Il n'est pas toujours facile de savoir laquelle, depuis la maison.",
    },
    commentAider: {
      clair:
        "Un retour progressif à l'école, plutôt qu'un évitement prolongé, améliore le pronostic à long terme — plus l'absence se prolonge, plus le retour devient difficile. Une prise en charge structurée (par exemple une thérapie cognitive et comportementale) montre des résultats positifs. Parlez-en tôt avec l'école et un professionnel de santé plutôt que d'attendre que la situation s'aggrave.",
      falc:
        "Un retour progressif à l'école aide plus qu'une longue absence. Plus l'enfant reste absent, plus c'est difficile de revenir. Une aide professionnelle peut vraiment aider. Parlez-en tôt à l'école et à un médecin.",
    },
    sources: [
      {
        id: 'dumas-01280251',
        citation: 'Kheladi, J. (2015). La phobie scolaire ou refus anxieux scolaire.',
        content:
          "Distingue l'anxiété de performance ordinaire du refus scolaire anxieux, une détresse intense et non volontaire face à l'idée d'aller à l'école.",
      },
      {
        id: 'dumas-02956190',
        citation:
          "Caron, E. (2018). Traitement du refus scolaire anxieux à l'adolescence : évaluation d'un programme de thérapie cognitive et comportementale en hospitalisation de jour.",
        content:
          "Un programme de thérapie cognitive et comportementale montre des résultats positifs dans le traitement du refus scolaire anxieux ; le retour progressif est corrélé à un meilleur pronostic.",
      },
      {
        id: 'dumas-02887515',
        citation: 'Levain, E. (2019). Harcèlement scolaire entre pairs, anxiété et qualité de vie : une étude transversale en population clinique.',
        content:
          "Le harcèlement scolaire entre pairs est associé à une anxiété significativement plus élevée et à une moins bonne qualité de vie chez les enfants concernés.",
      },
    ],
  },
];

export default parentsFiches;
