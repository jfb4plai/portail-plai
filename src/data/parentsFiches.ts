import type { ParentFiche } from '../types';

export const BANDEAU_INDIVIDUALISATION =
  "Un enfant n'est pas son trouble. Cette fiche donne des repères généraux — ce qui compte, c'est la réalité vécue par votre enfant en classe et à la maison, pas l'étiquette diagnostique.";

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
];

export default parentsFiches;
