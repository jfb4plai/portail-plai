import type { AppItem } from '../types';

const apps: AppItem[] = [
  {
    id: 'planbot',
    name: 'PlanBot',
    description: "Jeu de rééducation des fonctions exécutives : planification, inhibition, mémoire de travail, métacognition. Pour logopèdes, psychomotriciens et enseignants spécialisés FWB. 6 niveaux progressifs, 11 paramètres cliniques configurables.",
    url: 'https://planbot-plai.vercel.app',
    emoji: '🤖',
    category: 'Fonctions exécutives',
    status: 'disponible',
    color: 'indigo',
    section: 'sensibilisation',
    guide: {
      scientific: {
        summary:
          "PlanBot repose sur les modèles neurocognitifs des fonctions exécutives (FE) : planification, inhibition, mémoire de travail et flexibilité cognitive. Le jeu combine deux paradigmes validés — résolution de labyrinthe planifiée (FE de planification) et paradigme Go/No-Go adapté au feu tricolore (FE d'inhibition) — et intègre des outils de suivi clinique : détection des persévérations, estimation de confiance (métacognition), verbalisation de séquence et mode exécution directe (impulsivité motrice).",
        references: [
          {
            citation: 'Diamond, A. (2013). Executive Functions. Annual Review of Psychology, 64, 135–168. Réel, hors corpus RISS.',
            content:
              "Les fonctions exécutives comprennent l'inhibition, la mémoire de travail et la flexibilité cognitive. Ces trois composantes, et celles qui en dérivent (planification, résolution de problèmes), sont indispensables à la réussite scolaire et au développement personnel.",
          },
          {
            id: 'tel-04717319',
            citation:
              'Abou Assi, K. (2022). Implication des fonctions exécutives dans les activités de codage et de robotique : un effet de réciprocité ? Thèse, Université de Rouen Normandie.',
            content:
              "Les activités de codage et de robotique mobilisent intensément les FE (planification séquentielle, inhibition des erreurs, mise à jour en MDT). L'entraînement par ces activités améliore en retour les performances exécutives mesurées.",
          },
          {
            id: 'tel-04496182',
            citation:
              "Rezende, G. (2022). Entraînement au contrôle inhibiteur et méditation de pleine conscience : une approche multi-niveaux et développementale. Thèse, Université Paris Cité.",
            content:
              "Les paradigmes de réponse temporisée (Stop Signal, Go/No-Go) constituent des outils valides pour l'entraînement et la rééducation du contrôle inhibiteur chez l'enfant et l'adolescent. Le feu tricolore de PlanBot s'inscrit dans cette famille de paradigmes.",
          },
          {
            id: 'tel-01259986',
            citation:
              "Moreno Torres, M. (2014). La relation gestes-parole dans la planification de la résolution du problème de la Tour de Hanoï chez des enfants, adolescents et adultes colombiens. Thèse, Université de Toulouse.",
            content:
              "La Tour de Hanoï est le paradigme classique de planification optimale par séquences — même structure cognitive que PlanBot (trouver le chemin le plus court). L'indicateur de chemin optimal (+2 pts bonus) s'ancre dans ce paradigme.",
          },
          {
            id: 'dumas-02180844',
            citation:
              "de Lepineau, J. (2018). Étude de l'hypothèse d'une fatigabilité cognitive excessive comme substrat de l'impulsivité chez les adultes avec TDAH. Mémoire, Université de Bordeaux.",
            content:
              "La persévération — persistance dans un schéma cognitif erroné — est associée au déficit d'inhibition dans le TDAH. PlanBot détecte automatiquement les séquences en échec répétées et les signale au thérapeute via un compteur.",
          },
          {
            id: 'hal-04457436',
            citation:
              "Allix, P., Lubin, A., Lanoë, C., & Rossi, S. (2023). Connais-toi toi-même : une perspective globale de la métacognition. Psychologie Française, 68(3), 451–469.",
            content:
              "Les jugements d'estimation de confiance ('est-ce que je suis sûr de ma réponse ?') constituent un indicateur fiable du monitoring métacognitif. PlanBot sollicite ce jugement après chaque planification, avant l'exécution.",
          },
          {
            id: 'dumas-00905984',
            citation:
              "Carre, E. & de Casas, C. (2013). La verbalisation des procédures favorise-t-elle l'autorégulation des élèves ? Mémoire ESPE.",
            content:
              "Verbaliser une procédure améliore l'autorégulation — ce qui est exactement la logique du mode verbalisation dans PlanBot : nommer à voix haute le chemin planifié avant de valider.",
          },
          {
            id: 'dumas-01592161',
            citation:
              "Brouilliard Rouseau, L. (2017). Joindre le geste… Intérêt de la psychomotricité dans la prise en charge des troubles des fonctions exécutives : tentative d'élaboration d'un test psychomoteur évaluant les capacités d'inhibition chez l'enfant. Mémoire, Université de Bordeaux.",
            content:
              "Faire verbaliser avant de se lancer réduit l'impulsivité motrice et cognitive. PlanBot distingue un mode planification préalable d'un mode exécution directe (⚡) permettant d'observer et de travailler l'impulsivité chez l'enfant.",
          },
        ],
      },
      howto: {
        steps: [
          {
            title: 'Se connecter',
            items: [
              "Un compte est requis pour accéder à PlanBot et sauvegarder les séances.",
              "Créer un compte ou se connecter sur la page d'accueil de l'application.",
              "Le tableau de bord et l'historique des séances sont liés au compte connecté.",
            ],
          },
          {
            title: 'Configurer la session',
            items: [
              "Entrer le prénom du joueur et choisir le groupe d'âge (6 ans / 7–10 ans / 11–13 ans).",
              'Choisir le niveau de départ (1 = planification seule, 6 = toutes FE combinées).',
              "Ouvrir « Réglages thérapeute » pour personnaliser :",
              "→ Feu tricolore : mode (off / fixe / aléatoire), tempo (lent/moyen/rapide), durée orange.",
              "→ Timer de planification : pression temporelle fixe ou aléatoire pour travailler l'impulsivité.",
              "→ Masquage temporel : la grille se cache après X secondes (entraînement de la MDT).",
              "→ Direction désactivée : une flèche inaccessible (contrainte de flexibilité).",
              "→ Verbalisation : bannière rappelant de lire le chemin à voix haute avant de valider.",
              "→ Mode exécution directe ⚡ : le robot se déplace case par case sans planification préalable.",
            ],
          },
          {
            title: 'Phase 1 — Planifier le chemin',
            items: [
              "Le robot 🤖 doit rejoindre l'étoile ⭐ en évitant les murs 🧱.",
              'Construire une séquence de commandes (↑ ↓ ← →) avec les boutons directionnels.',
              "Aux niveaux 3–4 : ramasser la ou les clés 🔑 dans l'ordre avant l'étoile.",
              'Groupe 11-13 ans, niveaux 5–6 uniquement : le modificateur 🔀 inverse gauche et droite après passage.',
              "Cliquer « Valider » pour vérifier le chemin. Un indice oriente la révision en cas d'erreur.",
              "Badge ⭐ Optimal visible : si la séquence atteint l'étoile avec le minimum de commandes → +2 pts bonus.",
              "Badge 🔁 Persévération : PlanBot détecte et compte les séquences en échec identiques soumises plusieurs fois.",
              "En mode exécution directe ⚡ : chaque bouton déplace immédiatement le robot — pas de séquence à construire.",
            ],
          },
          {
            title: 'Estimation de confiance (métacognition)',
            items: [
              "Après validation réussie, l'enfant évalue sa confiance : 😟 / 😐 / 🙂 / 💪.",
              "Cette étape sollicite le monitoring métacognitif : 'Est-ce que je suis sûr que mon chemin va fonctionner ?'",
              "Le rating est sauvegardé et consultable dans le tableau de bord.",
            ],
          },
          {
            title: 'Phase 2 — Exécuter au feu tricolore',
            items: [
              "La séquence validée s'exécute commande par commande.",
              'Attendre le feu vert 🟢, puis appuyer sur le bouton pour avancer le robot.',
              'Appuyer trop tôt (rouge/orange) ou trop tard (fenêtre expirée) coûte 1 point.',
              "Tempo configurable : lent (3–5 s de vert), moyen (2–3 s), rapide (1–2 s) — durées tirées aléatoirement pour chaque déplacement afin de rendre le rythme imprévisible.",
              "En mode « Désactivé », le feu est absent : appuyer librement.",
            ],
          },
          {
            title: 'Tableau de bord',
            items: [
              "Accessible via le bouton 📊 depuis l'écran de profil.",
              "Historique par joueur : score, essais de planification, persévérations, confiance, précision au feu tricolore.",
              'Ajouter ou modifier une note clinique directement dans le tableau.',
            ],
          },
        ],
        tip: "Débuter niveau 1, feu désactivé, aucune contrainte. Introduire le timer de planification (30 s fixe) au niveau 2 pour observer l'impulsivité. Activer la verbalisation dès qu'une persévération est détectée. Utiliser le mode exécution directe ⚡ en séance initiale pour évaluer le profil spontané de l'enfant.",
      },
    },
  },
  {
    id: 'flashfwb',
    name: 'FlashPLAI',
    description: "Flashcards interactives pour la mémorisation. Création de decks par l'enseignant (texte, image, audio), révision par système Leitner (3 boîtes) pour les élèves — sans compte.",
    url: 'https://flashfwb.vercel.app',
    emoji: '🃏',
    category: 'Mémorisation',
    status: 'disponible',
    color: 'blue',
    section: 'applications',
    guide: {
      scientific: {
        summary: "FlashPLAI repose sur trois piliers validés par les sciences cognitives : le rappel actif, la répétition espacée et l'auto-évaluation immédiate. Le système Leitner (3 boîtes : À revoir / Presque / Maîtrisé) implémente la répétition espacée adaptive : les cartes moins bien connues reviennent plus fréquemment.",
        references: [
          {
            id: 'tel-03216648',
            citation: "Choffin, B. (2021). Algorithmes d'espacement adaptatif de l'apprentissage pour l'optimisation de la maîtrise à long terme de composantes de connaissance.",
            content: "La répétition espacée améliore significativement la mémorisation à long terme par rapport à une révision « massée » en une seule session — c'est l'effet d'espacement (spacing effect). Les algorithmes adaptatifs comme Leitner ajustent l'intervalle de révision selon les performances de l'apprenant.",
          },
          {
            id: 'dumas-03775591',
            citation: 'Gayraud-Simon, N. (2022). Les apports des sciences cognitives à la mémorisation en classe de collège.',
            content: "La relecture passive (stratégie préférée des élèves) est bien moins efficace que le rappel actif : se forcer à retrouver une information sans la relire consolide davantage la trace mnésique.",
          },
          {
            id: 'dumas-04842736',
            citation: 'Lacombe, A. (2024). Utilisation de flashcard sous forme de schéma fonctionnel en situation d\'apprentissage : étude d\'une approche combinée dans le processus de mémorisation à long terme.',
            content: "L'approche combinée (flashcard + représentation schématique ou image) optimise la rétention à long terme par double encodage verbal et visuel.",
          },
        ],
      },
      howto: {
        steps: [
          {
            title: 'Créer un deck',
            items: [
              'Connectez-vous → "Nouveau deck"',
              "Donnez un nom (ex. : Tables de multiplication — 7×)",
              "Ajoutez vos cartes : recto (question/terme) + verso (réponse/définition)",
              "Enrichissez chaque face avec une image (upload ou recherche ARASAAC) ou un enregistrement audio",
            ],
          },
          {
            title: 'Partager avec les élèves',
            items: [
              "Publiez le deck → un code de classe et un QR code sont générés",
              "Les élèves entrent le code sur leur appareil — aucun compte nécessaire",
              "Ils pratiquent en mode auto-évaluation (Je sais / Pas encore) — le système Leitner répartit les cartes en 3 boîtes",
            ],
          },
          {
            title: 'Suivi',
            items: [
              "Le tableau de bord montre la répartition Leitner (À revoir / Presque / Maîtrisé) par élève",
              "Réactivez un deck en fin de séquence pour ancrer les apprentissages",
            ],
          },
        ],
        tip: "Privilégiez des sessions courtes et fréquentes (5 min / jour) plutôt qu'une longue session hebdomadaire. L'audio est particulièrement utile pour les élèves DYS ou allophones.",
      },
    },
  },
  {
    id: 'picto-lecture',
    name: 'Picto Lecture',
    description: 'Convertit un texte en pictogrammes ARASAAC pour faciliter la lecture et la compréhension. Export PDF et Word.',
    url: 'https://picto-lecture.vercel.app',
    emoji: '🖼️',
    category: 'Lecture',
    status: 'disponible',
    color: 'purple',
    section: 'applications',
    guide: {
      scientific: {
        summary: "Picto Lecture s'inscrit dans la tradition de la Communication Alternative et Augmentée (CAA) en rendant le texte accessible par le canal visuel. L'association texte + pictogramme active un double encodage (verbal et visuel) qui renforce la compréhension et la mémorisation — bénéfice validé pour les élèves avec TSA, retard de langage ou difficultés de lecture.",
        references: [
          {
            id: 'dumas-02972128',
            citation: "Chasseur, L. (2020). ÉvalCom : évaluation de l'acceptabilité et l'utilisabilité des outils de CAA par tableaux de pictogrammes.",
            content: "Les outils CAA par pictogrammes améliorent l'accès au sens pour les élèves à besoins spécifiques, à condition d'être intégrés dans une pratique régulière et contextualisée.",
          },
          {
            id: 'dumas-03695978',
            citation: 'Ferreira, C. (2021). Un outil novateur au service des compétences en langage oral chez les plus jeunes élèves : les tableaux de langage assisté.',
            content: "Le recours aux pictogrammes en lecture partagée développe les compétences langagières orales dès la maternelle, y compris pour des élèves sans troubles déclarés.",
          },
          {
            id: 'dumas-04390420',
            citation: 'Fouré, L. (2023). Influence des Tableaux de Langage Assisté sur les compétences pronominales chez des enfants présentant un TSA.',
            content: "L'image-symbole (pictogramme) constitue un pont cognitif entre le langage oral et le sens, particulièrement bénéfique pour les élèves présentant un TSA ou un retard de langage.",
          },
        ],
      },
      howto: {
        steps: [
          {
            title: 'Préparer un texte',
            items: [
              'Connectez-vous → "Nouvelle histoire"',
              'Donnez un titre au texte',
              'Tapez ou collez votre texte — ou importez un fichier .docx / .txt',
            ],
          },
          {
            title: 'Configurer la conversion',
            items: [
              'Dans le panneau Paramètres, choisissez la langue (français/anglais)',
              'Cochez les catégories à pictogrammiser : Noms, Verbes, Adjectifs',
              'Ajoutez des listes de mots personnalisés (expressions multi-mots supportées : ex. "Père Noël")',
              'Activez "Masquer le texte sous les pictogrammes" pour les exercices oraux ou dictées',
            ],
          },
          {
            title: 'Valider le résultat',
            items: [
              'Cliquez "Générer les pictogrammes"',
              'Les mots en orange sont ambigus → cliquez pour choisir un pictogramme alternatif',
              'Cliquez sur n\'importe quel mot pour lui ajouter / modifier / retirer un pictogramme',
            ],
          },
          {
            title: 'Exporter',
            items: [
              'PDF → impression directe pour la classe',
              'Word (.docx) → document éditable, images intégrées dans le texte, idéal pour travail élève',
              'Sauvegarder → retrouver l\'histoire depuis n\'importe quel appareil',
            ],
          },
        ],
        tip: "Créez des listes de mots personnalisés pour le vocabulaire spécifique de vos élèves (prénoms, lieux familiers, vocabulaire de classe). Le mode 'masquer le texte' transforme l'activité en exercice d'expression orale guidée par les images.",
      },
    },
  },
  {
    id: 'definifwb',
    name: 'DéfiniFWB',
    description: 'Séances interactives de vocabulaire pour TBI. Six modes de jeu, import CSV/PDF, pictogrammes ARASAAC, QR code élève.',
    url: 'https://definifwb.vercel.app',
    emoji: '📖',
    category: 'Vocabulaire',
    status: 'disponible',
    color: 'green',
    section: 'applications',
    guide: {
      scientific: {
        summary: "DéfiniFWB transforme une leçon de vocabulaire traditionnelle (frontale, passive) en activité collective interactive, conforme aux recommandations sur l'usage pédagogique du TBI. L'efficacité du TBI dépend du mode d'usage : un usage partagé et participatif, où les élèves sont acteurs, produit des gains d'apprentissage que l'usage frontal ne génère pas.",
        references: [
          {
            id: 'tel-04137370',
            citation: "Redouani, A. (2022). L'impact de l'usage pédagogique du Tableau Blanc Interactif (TBI) sur l'engagement scolaire des élèves.",
            content: "L'usage du TBI en classe augmente significativement l'engagement comportemental et cognitif des élèves, à condition que l'outil soit intégré dans une démarche participative.",
          },
          {
            id: 'dumas-03933008',
            citation: 'Grondin, O. (2019). Apprendre et enseigner autrement avec le tableau interactif.',
            content: "Le TBI n'améliore les apprentissages que lorsqu'il génère de l'interaction entre élèves et entre élèves et contenu — pas en usage purement frontal.",
          },
          {
            id: 'dumas-01938967',
            citation: "Hesto, J. (2018). L'impact du TBI sur la motivation et la réussite scolaire.",
            content: "La motivation intrinsèque est renforcée quand l'élève est acteur — ce que les modes de jeu de DéfiniFWB visent explicitement.",
          },
        ],
      },
      howto: {
        steps: [
          {
            title: 'Créer une séance',
            items: [
              'Connectez-vous → "Nouvelle séance"',
              'Entrez votre liste de mots : saisie manuelle, import CSV ou PDF',
              'Pour chaque mot : définition, image optionnelle, pictogramme ARASAAC',
            ],
          },
          {
            title: 'Choisir le mode de jeu',
            items: [
              '6 modes disponibles : Mot cliquable, Clavier guidé, Relier, Retrouver le mot, Quiz flash, Indice progressif',
              'Projetez l\'application sur le TBI ou partagez l\'URL via QR code',
            ],
          },
          {
            title: 'Lancer avec les élèves',
            items: [
              'Mode TBI : activité collective projetée, l\'enseignant anime',
              'Mode élève : les élèves accèdent à la séance depuis leur tablette via QR code ou URL',
            ],
          },
          {
            title: 'Après la séance',
            items: [
              'Consultez les statistiques de consultation par mot (nombre de fois qu\'un mot a été cliqué/consulté)',
              'Réutilisez la séance lors d\'une prochaine séquence',
            ],
          },
        ],
        tip: "Utilisez le mode TBI pour une activité collective, puis activez le mode élève (QR code) pour une consolidation autonome sur tablette.",
      },
    },
  },
  {
    id: 'droite-graduee',
    name: 'Droite Graduée',
    description: "Activités interactives sur la droite graduée. Estimation, apprentissage multi-droites et mix. Configurations sauvegardées par l'enseignant.",
    url: 'https://droite-graduee.vercel.app',
    emoji: '📏',
    category: 'Numération',
    status: 'disponible',
    color: 'pink',
    section: 'applications',
    guide: {
      scientific: {
        summary: "Droite Graduée traduit directement les recommandations de la recherche en neurosciences de l'éducation : faire manipuler la droite graduée de façon active et répétée, avec feedback immédiat.",
        references: [
          {
            id: 'hal-05519479',
            citation: 'Fanjat, J. & Roditi, E. (2025). Interrogations didactiques à propos de la ligne numérique mentale.',
            content: "Les auteurs distinguent la ligne numérique mentale (représentation cognitive innée), la droite numérique (objet mathématique) et la droite graduée (outil didactique). C'est sur cette dernière que l'enseignant agit.",
          },
          {
            id: 'hal-05188689',
            citation: 'Hirsch, M. & Roditi, E. (2023). Quand les neurosciences analysent les apprentissages et en tirent des conséquences pour l\'enseignement.',
            content: "Le placement des nombres sur la droite numérique est fondamental et déterminant pour leur apprentissage — conclusion validée par le Conseil scientifique de l'Éducation nationale française (2022).",
          },
          {
            id: 'dumas-04098715',
            citation: 'Vignali, J. (2022). Effets du jeu sur le développement de la ligne numérique mentale.',
            content: "Les activités ludiques de placement et d'estimation sur droite graduée accélèrent le développement de la représentation spatiale des nombres, avec des effets mesurables.",
          },
        ],
      },
      howto: {
        steps: [
          {
            title: 'Configurer une activité',
            items: [
              'Connectez-vous → configurez vos paramètres (plage numérique, graduation, affichage)',
              'Définissez la plage numérique (ex. : 0–100, 0–1000, nombres décimaux)',
              'Choisissez le type d\'activité : ① Estimation, ② Apprentissage multi-droites, ③ Mix',
            ],
          },
          {
            title: 'Utiliser en classe',
            items: [
              'Basculez en Mode élève → projetez sur TBI ou partagez l\'URL',
              'L\'élève place le nombre sur la droite → feedback visuel immédiat',
              'Variez les plages pour travailler différentes compétences',
            ],
          },
          {
            title: 'Sauvegarder et partager',
            items: [
              'Nommez et sauvegardez vos configurations → réutilisables d\'une séance à l\'autre',
              'Exportez vos configs en JSON pour les partager avec des collègues ou les importer sur un autre appareil',
            ],
          },
        ],
        tip: "Commencez par des plages connues (0–10, 0–100) avant d'étendre. L'estimation est plus formatrice que le placement exact guidé.",
      },
    },
  },
  {
    id: 'dictation',
    name: 'Dictée Interactive',
    description: "Séances de dictée interactives avec code d'accès élève. Mode clavier ou lettres mélangées, résultats en temps réel pour l'enseignant.",
    url: 'https://plai-french-interactive-dictation.vercel.app',
    emoji: '✍️',
    category: 'Orthographe',
    status: 'disponible',
    color: 'orange',
    section: 'applications',
    guide: {
      scientific: {
        summary: "Dictée Interactive répond aux trois conditions scientifiquement validées : pratique active de l'orthographe + feedback immédiat + réduction de l'anxiété liée à l'erreur (le numérique dédramatise).",
        references: [
          {
            id: 'tel-00979303',
            citation: "Pérez, M. (2013). L'apprentissage de l'orthographe lors de la dictée et la copie de mots manuscrits : effets des tâches et processus sous-jacents.",
            content: "La dictée reste une des modalités les plus efficaces pour l'apprentissage de l'orthographe lexicale — à condition que l'erreur soit traitée, pas seulement sanctionnée.",
          },
          {
            id: 'tel-00801214',
            citation: "Borchardt, G. (2012). L'influence des connaissances graphotactiques sur l'acquisition de l'orthographe lexicale.",
            content: "Le feedback immédiat après chaque erreur améliore significativement les performances lors d'évaluations différées — sans feedback, l'erreur se consolide.",
          },
          {
            id: 'dumas-02430370',
            citation: 'Massé, J. (2019). Usage du numérique en classe et effets sur la mobilisation chez les élèves de SEGPA.',
            content: "La dictée numérique avec correction immédiate augmente la mobilisation des élèves en difficulté — le numérique dédramatise l'erreur là où l'outil papier génère souvent blocage et démotivation.",
          },
        ],
      },
      howto: {
        steps: [
          {
            title: 'Créer une séance',
            items: [
              'Connectez-vous → "Nouvelle séance"',
              'Donnez un titre (ex. : Dictée semaine 12 — mots en -tion)',
              'Entrez votre liste de mots (une par ligne)',
            ],
          },
          {
            title: 'Configurer les options',
            items: [
              'Mode clavier : l\'élève tape le mot librement',
              'Mode lettres mélangées (par défaut) : l\'élève remet les lettres dans l\'ordre (plus accessible)',
              'Lettres parasites : des lettres supplémentaires s\'ajoutent pour corser l\'exercice',
              'Lettres pré-remplies : certaines lettres sont déjà placées (aide pour les élèves en difficulté)',
              'Image par mot : associez une illustration à chaque mot (indice visuel)',
              'Mode prononciation : le mot est lu à voix haute (synthèse vocale)',
            ],
          },
          {
            title: 'Lancer la séance',
            items: [
              'Un code d\'accès est généré → écrivez-le au tableau ou partagez le lien',
              'Les élèves accèdent sans compte depuis n\'importe quel appareil',
              'Suivez les résultats en temps réel sur votre tableau de bord',
            ],
          },
          {
            title: 'Analyser les résultats',
            items: [
              'Résultats par élève et par mot après la séance',
              'Identifiez les mots systématiquement ratés → reprise ciblée',
              'Dupliquez la séance pour créer une version différenciée (options différentes, même liste)',
            ],
          },
        ],
        tip: "Combinez les options pour différencier : mode lettres mélangées + lettres pré-remplies + image pour les élèves dyslexiques, mode clavier + lettres parasites pour les plus avancés — même liste de mots, modalités adaptées.",
      },
    },
  },
  {
    id: 'atelier-dyslexie',
    name: 'Atelier Dyslexie',
    description: "Simulation de lecture dyslexique. Plonge l'enseignant dans les chaussures d'un élève porteur de dyslexie pour faire émerger — de l'intérieur — les aménagements universels.",
    url: 'https://atelier-dyslexie-plai.vercel.app',
    emoji: '🧠',
    category: 'Dyslexie',
    status: 'disponible',
    color: 'amber',
    section: 'sensibilisation',
    browserNote: 'Recommandé dans Microsoft Edge : voix neuronales (fr-BE) disponibles + surlignage mot par mot synchronisé avec la lecture audio.',
    guide: {
      scientific: {
        summary: "L'Atelier Dyslexie exploite l'expérience vécue comme levier de formation : en vivant eux-mêmes la désorganisation de la lecture dyslexique, les enseignants construisent une compréhension incarnée de la difficulté — et font émerger spontanément les aménagements pertinents. Note : les confusions b/d/p/q simulées sont d'origine phonologique, non visuelle (difficulté d'association graphème-phonème) — la simulation reste pédagogiquement valide pour développer l'empathie.",
        references: [
          {
            id: 'dumas-04304754',
            citation: "Deleuze, C. (2023). Troubles spécifiques des apprentissages : création d'une action de sensibilisation à destination des enseignants en école élémentaire.",
            content: "Les enseignants sont souvent peu sensibilisés aux troubles Dys, alors qu'ils en sont en demande. Une action de sensibilisation auprès de 53 enseignants montre « une nette amélioration des connaissances [...] et sur leur sentiment de compétence » pour accompagner les élèves concernés.",
          },
          {
            id: 'dumas-03279190',
            citation: "Adrian, S. (2021). Dimension psychoaffective des enfants présentant des troubles des apprentissages et effets de la sensibilisation par la simulation en classe en ergothérapie.",
            content: "L'expérience scolaire des enfants avec troubles des apprentissages est décrite comme « plutôt traumatisante, provoquant des niveaux de détresse et de douleur psychique ». La simulation permet aux enseignants de comprendre cette réalité de l'intérieur — bien au-delà d'un exposé théorique.",
          },
          {
            id: 'hal-03962468',
            citation: "Coffin, M., Goulet, C. & Piquard-Kipffer, A. (2023). L'accessibilité numérique au service des étudiants dyslexiques.",
            content: "« La modification de la typographie permet d'accéder plus facilement au sens d'un texte (interligne, police sans empattement, espaces interlettres et intermots augmentés). L'outil de synthèse vocale [...] permet de gagner du temps et de la fatigue en lecture. »",
          },
        ],
      },
      howto: {
        steps: [
          {
            title: 'Mise en situation',
            items: [
              "Collez ou importez un texte (.txt ou .docx)",
              "Activez les effets dyslexie : mélange de lettres, décalages verticaux, confusions b/d/p/q (symétrie)",
              "Essayez de lire — ressentez la charge cognitive et la fatigue visuelle",
              "Utilisez 'Afficher l'original' pour comparer avec et sans effets",
            ],
          },
          {
            title: 'Explorer les aménagements',
            items: [
              "Modifiez la police (Arial recommandée, Comic Sans, French Script MT pour simuler l'illisibilité, Times New Roman avec empattement)",
              "Ajustez taille, interligne, espacement des lettres et espacement des mots",
              "Testez les fonds colorés (crème, bleu ciel, vert tableau…)",
              "Activez la colorisation un mot sur deux (bicolor) — personnalisez les deux couleurs",
              "Associez une image au texte comme indice visuel de compréhension",
            ],
          },
          {
            title: 'Utiliser la lecture audio',
            items: [
              "Lancez le TTS — le mot lu est surligné en temps réel dans le texte",
              "Choisissez une voix naturelle (Edge recommandé pour voix neuronales fr-BE)",
              "Faites le lien : si la compréhension est l'objectif, l'audio compense le décodage",
            ],
          },
          {
            title: 'Débat pédagogique',
            items: [
              "Échangez : quels aménagements avez-vous spontanément cherchés ?",
              "Conclusion : ces aménagements sont universels — ils aident tous les élèves",
              "Étape suivante : appliquer ces réglages aux documents de classe",
            ],
          },
        ],
        tip: "Utilisez cet atelier en formation ou en réunion d'équipe : 5 minutes de simulation génèrent plus de compréhension que 1h d'exposé sur la dyslexie.",
      },
    },
  },
  {
    id: 'chaussures-de-maya',
    name: 'Atelier Maya',
    description: "Activité de sensibilisation : placez des chiffres mayas sur une droite graduée. Les enseignants vivent l'expérience d'un élève dyscalculique privé de la représentation habituelle du nombre.",
    url: 'https://atelier-maya.vercel.app',
    emoji: '🏺',
    category: 'Dyscalculie',
    status: 'disponible',
    color: 'pink',
    section: 'sensibilisation',
    guide: {
      scientific: {
        summary: "Cette activité place les enseignants dans la peau d'un élève dyscalculique en remplaçant les chiffres arabes par des glyphes mayas — une désorientation contrôlée qui révèle le rapport anxiogène au nombre. Le chronomètre visible amplifie la pression temporelle caractéristique des situations scolaires évaluées.",
        references: [
          {
            id: 'dumas-05241399',
            citation: "Favodon, A. & Wasielewski, B. (2025). Le jeu mathématique comme outil évaluatif pour réduire l'anxiété des élèves.",
            content: "L'anxiété mathématique « envahit la mémoire de travail et laisse peu de place à l'activité cognitive réelle » — un cercle vicieux que cette activité permet aux enseignants de vivre de l'intérieur.",
          },
          {
            id: 'dumas-04161650',
            citation: "Ginésy, M. (2023). Anxiété mathématique : apport de la sophrologie chez l'adolescent présentant un trouble des apprentissages mathématiques. Étude d'un cas clinique.",
            content: "La détérioration des processus cognitifs par l'anxiété mathématique — notamment de la mémoire de travail — majore les difficultés, particulièrement chez les élèves à besoins spécifiques.",
          },
          {
            id: 'dumas-03285680',
            citation: "Sayegh, M. (2021). Intérêt d'un entraînement autour de la ligne numérique avec apport de stratégies explicites chez des sujets présentant un trouble des apprentissages mathématiques.",
            content: "L'entraînement au placement sur droite numérique améliore le sens du nombre chez les élèves présentant des troubles de la cognition mathématique.",
          },
        ],
      },
      howto: {
        steps: [
          {
            title: "Configurer l'activité",
            items: [
              'Choisissez le nombre de cartes (2 à 8)',
              'Entrez les valeurs librement : nombres négatifs, positifs, ou expressions (4-8, 2*5…)',
              'Bouton "Surprise !" pour des valeurs aléatoires',
              'Activez/désactivez : chronomètre, aide (indice), validation, mode partagé',
            ],
          },
          {
            title: "Lancer l'activité",
            items: [
              "Cliquez \"Lancer l'activité\" — la droite graduée s'adapte automatiquement aux valeurs",
              'Faites glisser les cartes mayas sur la droite (souris ou tactile)',
              'Le triangle sous chaque carte indique la position précise',
              'Le chronomètre tourne — la pression temporelle est intentionnelle',
            ],
          },
          {
            title: 'Valider et débriefing',
            items: [
              '"Vérifier" : les cartes correctes se verrouillent en vert, les incorrectes reviennent au pool',
              'La tâche se termine quand toutes les cartes sont vertes',
              'Le bouton "?" sur chaque carte révèle la valeur en chiffre arabe (3 sec) — usage tracé',
              "Le bilan affiche : temps, nb de vérifications, nb d'aides demandées → matière à débat pédagogique",
            ],
          },
        ],
        tip: "En mode partagé, l'activité devient collégiale : l'animateur projette l'écran et le groupe décide ensemble. En mode solo, chaque participant vit l'expérience individuellement. Comparez les bilans pour alimenter la discussion sur le vécu dyscalculique.",
      },
    },
  },
  {
    id: 'glissement',
    name: "Glissement à l'IA",
    description: "Fiction interactive sur la délégation cognitive à l'IA. On confie ses tâches à Pl'ai — et on glisse. 15 mécanismes sourcés en psychologie cognitive. 3 actes, 3 fins. Mode facilitation pour formateurs.",
    url: 'https://glissement-plai.vercel.app',
    emoji: '🫧',
    category: 'IA & cognition',
    status: 'disponible',
    color: 'amber',
    section: 'sensibilisation',
    guide: {
      scientific: {
        summary: "Glissement fait vivre la délégation cognitive : chaque tâche confiée à Pl'ai diminue les capacités humaines (agentivité, créativité, curiosité, effort). Les 15 projets du jeu sont adossés à des mécanismes documentés en psychologie cognitive — tous vérifiés dans le corpus RISS.",
        references: [
          {
            id: 'hal-05421232',
            citation: "Lakel, A. (2025). Ne dites plus LLM : Larges Discours Models (LDM) et Agent Discursif Artificiel (ADA) ?",
            content: "Introduit le concept de « dette cognitive » : le déficit cumulatif en capacités de raisonnement critique résultant de la délégation systématique des tâches cognitives à l'IA. C'est exactement le mécanisme que Glissement fait vivre.",
          },
          {
            id: 'hal-04013223',
            citation: "Romero, M. et al. (2023). Enseigner et apprendre à l'ère de l'intelligence artificielle.",
            content: "Ouvrage collectif avec contributeurs FWB (Patricia Corieri, Julie Henry). Cadre de référence pour penser l'agentivité face aux outils IA en contexte éducatif francophone.",
          },
          {
            id: 'edutice-00000081',
            citation: "Tricot, A. (1998). Charge cognitive et apprentissage. Revue de Psychologie de l'Éducation, 3, 37–64.",
            content: "La répétition d'une tâche déléguée réduit l'activation cérébrale associée. Cet effet est réversible si la pratique reprend, mais le délai de récupération augmente avec la durée d'interruption.",
          },
          {
            citation: "Sparrow, B., Liu, J. & Wegner, D. M. (2011). Google effects on memory. Science, 333(6043). Réel, hors corpus RISS.",
            content: "Quand on sait qu'une information sera accessible numériquement, les taux de mémorisation diminuent — on retient l'emplacement plutôt que le contenu. Dans Glissement, c'est le projet « Mémoire augmentée ».",
          },
        ],
      },
      howto: {
        steps: [
          {
            title: 'Découvrir le jeu (20-30 min)',
            items: [
              "Ouvrez le jeu — vous êtes à la page 47 d'un carnet bleu",
              "Pl'ai propose des tâches : acceptez (⟳ Pl'ai agit) ou écrivez vous-même (✎ J'écris)",
              "Observez vos jauges : Agentivité, Créativité, Curiosité, Effort",
              "Activez des projets permanents — chacun a un coût et une source scientifique",
              "3 fins possibles selon vos choix : optimisation, reconquête ou équilibre",
            ],
          },
          {
            title: 'Utiliser en formation (mode facilitation)',
            items: [
              "Ouvrez jeu.html?fac=1 — panneau de contrôle en bas d'écran",
              "Montrez les 3 actes (Assistance → Substitution → Obsolescence)",
              "Déclenchez manuellement les seuils narratifs pour illustrer chaque étape",
              "Utilisez le panneau Sources pour afficher les 15 notes pédagogiques",
              "Terminez par une fin au choix et lancez le débat",
            ],
          },
          {
            title: 'Débat pédagogique',
            items: [
              "Quelles tâches avez-vous déléguées en premier ? Pourquoi ?",
              "À quel moment avez-vous remarqué le glissement ?",
              "Lien avec le quotidien : quelles tâches déléguez-vous déjà à l'IA ?",
              "Référentiels FWB : compétences FMTTN 4.2, 5.3, 5.4",
            ],
          },
        ],
        tip: "En formation IFC/IFPC : projetez le mode facilitation et jouez collectivement. 20 minutes de jeu + 10 minutes de débat suffisent pour ancrer la réflexion sur la délégation cognitive.",
      },
    },
  },
  {
    id: 'laboucle',
    name: 'La Boucle',
    description: "Fiction interactive sur la littératie à la rétroaction. Alex reçoit une copie corrigée — et doit apprendre à fermer la boucle entre les remarques de l'enseignant et une vraie progression. 3 fins. Mode facilitation pour formateurs.",
    url: 'https://laboucle-plai.vercel.app',
    emoji: '🔄',
    category: 'Rétroaction',
    status: 'disponible',
    color: 'amber',
    section: 'sensibilisation',
    guide: {
      scientific: {
        summary: "La Boucle fait vivre l'incapacité à utiliser la rétroaction — avant d'expliquer pourquoi. Elle repose sur le modèle en 4 dimensions de Carless & Boud (2018) : Dispositions, Conception, Littératie, Appropriation. Sans maîtrise de ces 4 dimensions, même la rétroaction la plus pertinente reste lettre morte.",
        references: [
          {
            id: 'hal-04646895',
            citation: "Calone, A. & Lafontaine, D. (2023). L'impact des différents types de feedbacks en contexte de classe.",
            content: "Le feedback n'opère que s'il est orienté vers la tâche et le processus — pas vers la note ou la personne. Cette distinction, que La Boucle fait vivre dans la Remarque 2, est centrale à la littératie à la rétroaction.",
          },
          {
            id: 'dumas-05324645',
            citation: "Altinsoy, M. (2025). Les évaluations scolaires comme levier d'autorégulation et de développement des compétences métacognitives au cycle 3.",
            content: "L'évaluation formative opère quand l'élève dispose de critères transparents et peut s'autoévaluer avant soumission. C'est exactement la compétence que construit Alex dans le chemin vers la Fin C.",
          },
          {
            id: 'W4225545444',
            citation: "Brault Foisy, L.-M. (2022). Mieux comprendre les mécanismes cérébraux d'apprentissage pour faciliter la réussite scolaire des élèves.",
            content: "La rétroaction n'a d'effet neurologique que si elle est activement traitée. L'évitement (Fin A) est rationnel à court terme — et dévastateur à long terme. La Boucle le fait ressentir plutôt qu'expliquer.",
          },
        ],
      },
      howto: {
        steps: [
          {
            title: 'Mise en situation',
            items: [
              "Jouez seul(e) d'abord — sans le mode facilitation",
              "Repérez à quel moment vos choix ressemblent à ceux de vos élèves",
              "Notez quelle fin vous avez obtenue et pourquoi",
            ],
          },
          {
            title: 'En formation ou en réunion d\'équipe',
            items: [
              "Faites jouer le groupe en mode élève (URL sans ?fac=1)",
              "Comparez les fins obtenues et les choix qui y ont mené",
              "Basculez en mode facilitation (?fac=1) pour décoder les mécanismes",
            ],
          },
          {
            title: 'Débat pédagogique',
            items: [
              "Quels choix avez-vous faits instinctivement ? Pourquoi ?",
              "À quel moment Alex aurait eu besoin d'un enseignement explicite ?",
              "Quand enseignez-vous explicitement la littératie à la rétroaction ?",
              "Lien FWB : compétences transversales, socles de compétences, APC",
            ],
          },
        ],
        tip: "Le mode facilitation (?fac=1 dans l'URL) révèle les mécanismes scientifiques à chaque moment clé — idéal pour un débriefing en formation d'enseignants.",
      },
    },
  },
  {
    id: 'systeme-solaire',
    name: 'Système Solaire',
    description: "Visualisation interactive des tailles relatives et des révolutions planétaires. Zoom, noms, orbites et vitesse réglables. Idéal pour ancrer les proportions et les durées de révolution.",
    url: 'https://systeme-solaire-plai.vercel.app',
    emoji: '🪐',
    category: 'Sciences',
    status: 'disponible',
    color: 'blue',
    guide: {
      scientific: {
        summary: "La visualisation dynamique des proportions planétaires mobilise la pensée spatiale et la mémoire à long terme. Voir les tailles relatives et les révolutions en temps réel ancre des représentations que le texte seul ne peut pas construire.",
        references: [
          {
            id: 'hal-03481844',
            citation: "Rollinde, E. (2021). L'Astronomie pour l'éducation dans l'espace francophone.",
            content: "L'enseignement du système solaire gagne à s'appuyer sur des activités visuelles et dynamiques : séances sur les planètes telluriques et gazeuses, leurs proportions et leurs positions relatives ancrent des représentations que le texte seul ne peut construire.",
          },
          {
            id: 'dumas-01804357',
            citation: "Kpodar, J.-L. (2017). Effets des instructions de pertinence spécifiques et des attitudes environnementales sur les apprentissages avec des animations dans le cadre de l'éducation au développement durable.",
            content: "Le guidage attentionnel dans une animation permet de réduire la charge cognitive extrinsèque (Sweller). Pour le système solaire, l'affichage progressif des noms, orbites et vitesses remplit ce rôle : chaque option libère des ressources pour la compréhension conceptuelle.",
          },
          {
            id: 'hal-04180240',
            citation: "Puma, S. & Tricot, A. (2021). Prendre en compte la mémoire de travail lors de la conception de situations d'apprentissage scolaire. A.N.A.E., 171, 217–225.",
            content: "La théorie de la charge cognitive identifie trois charges à gérer : intrinsèque (la matière), extrinsèque (conception non optimale du support) et utile (transfert vers la mémoire à long terme). L'affichage progressif des options dans le Système Solaire réduit la charge extrinsèque et libère des ressources pour la compréhension.",
          },
        ],
      },
      howto: {
        steps: [
          {
            title: 'Découvrir les tailles relatives',
            items: [
              "Lancez l'animation → observez la différence de taille entre planètes telluriques et géantes gazeuses",
              "Activez les noms des planètes pour identifier chacune",
              "Utilisez le zoom pour mieux voir les petites planètes intérieures",
            ],
          },
          {
            title: 'Explorer les révolutions',
            items: [
              "Activez les orbites pour visualiser les trajectoires",
              "Observez la vitesse relative : Mercure tourne bien plus vite que Neptune",
              "Réglez la vitesse (×1 = temps réel simulé, ×10 = accéléré) pour rendre les révolutions perceptibles",
            ],
          },
          {
            title: 'Exploiter en classe',
            items: [
              "Posez la question : combien de fois la Terre tourne-t-elle pendant une révolution de Neptune ?",
              "Faites observer les proportions : Jupiter est ≈ 11× plus grande que la Terre",
              "Laissez les élèves explorer librement — le temps réel ancre les durées mieux qu'un tableau",
            ],
          },
        ],
        tip: "Projetez l'animation en temps réel (vitesse ×1) pendant une séquence : les élèves voient concrètement ce que signifie « une année sur Neptune dure 165 ans terrestres ».",
      },
    },
  },
  {
    id: 'fractions-visuelles',
    name: 'Fractions — Représentations',
    description: "Visualisez une fraction sous 4 formes : disque, barre, droite numérique, collection. Idéal pour ancrer le sens de la fraction avant toute opération.",
    url: 'https://fractions-visuelles-plai.vercel.app',
    emoji: '🔵',
    category: 'Mathématiques',
    status: 'disponible',
    color: 'purple',
    guide: {
      scientific: {
        summary: "La compréhension des fractions nécessite de multiplier les registres de représentation : aucune représentation seule ne suffit à révéler toutes les caractéristiques de l'objet mathématique.",
        references: [
          {
            id: 'hal-05166265',
            citation: "Nguala, J.-B., Guillon, C. & Di Beta, M. (2025). De la fraction partage à la fraction nombre : étude des conditions de transfert et des effets d'un dispositif de formation à Mayotte.",
            content: "Chaque changement de représentation est important : il permet à chaque registre de mettre en évidence une partie des caractéristiques de l'objet fraction. Plusieurs conversions sont nécessaires pour en espérer une connaissance totale.",
          },
          {
            id: 'dumas-03695946',
            citation: "Fanet, H. (2021). Ritualiser la représentation des fractions au cycle 3.",
            content: "Ritualiser plusieurs représentations (bande, disque, droite, ensemble) développe la capacité à identifier et produire différentes formes d'une même fraction, compétence clé pour les élèves en difficulté.",
          },
          {
            id: 'hal-05123050',
            citation: "Ledan, L. (2025). Quelles conditions pour une conceptualisation des fractions dans le manuel français « La méthode de Singapour » en CE1-CE2 ?",
            content: "La méthode Singapour associe systématiquement l'écriture chiffrée à une représentation imagée et à la position sur une droite graduée — trois registres mobilisés simultanément pour ancrer le concept.",
          },
        ],
      },
      howto: {
        steps: [
          {
            title: 'Explorer le sens de la fraction',
            items: [
              "Entrez une fraction simple (ex. 3/4) — observez les 4 représentations",
              "Changez le dénominateur : comment la représentation en disque évolue-t-elle ?",
              "Comparez 1/2, 2/4, 4/8 : sont-elles identiques sur la droite numérique ?",
            ],
          },
          {
            title: 'Travailler avec les élèves',
            items: [
              "Montrez la même fraction sous 2 représentations différentes : demandez aux élèves ce qui change",
              "Activez 'Valeur décimale' pour relier fraction et écriture décimale",
              "Utilisez la collection pour les fractions d'un groupe (ex. 3/5 des élèves)",
            ],
          },
        ],
        tip: "Pour les élèves dyscalculiques, la droite numérique ancre la fraction comme 'position' plutôt que comme 'partage' — changement de registre souvent libérateur.",
      },
    },
  },
  {
    id: 'fractions-operations',
    name: 'Fractions — Opérations',
    description: "Calculs sur les fractions (+, −, ×, ÷) décomposés étape par étape avec représentations visuelles. Chaque étape est expliquée et illustrée.",
    url: 'https://fractions-operations-plai.vercel.app',
    emoji: '➗',
    category: 'Mathématiques',
    status: 'disponible',
    color: 'purple',
    guide: {
      scientific: {
        summary: "Rendre visibles les étapes intermédiaires d'une opération sur les fractions permet à l'élève d'identifier précisément l'obstacle et de construire un raisonnement procédural solide.",
        references: [
          {
            id: 'dumas-03948596',
            citation: "Duveau, M. (2022). La place et le rôle de l'erreur dans l'enseignement et l'apprentissage des fractions simples en CM1.",
            content: "L'erreur dans l'apprentissage des fractions est une étape normale : rendre visible chaque étape de calcul permet à l'élève d'identifier précisément où se situe l'obstacle et de le corriger.",
          },
          {
            id: 'dumas-01373176',
            citation: "Morisse, A. (2016). Validation d'épreuves d'évaluation de la numération au sein d'une batterie informatisée (Examath) visant à évaluer les troubles de la cognition mathématique.",
            content: "La batterie Examath identifie les profils de difficultés dans la cognition mathématique, dont la numération et la compréhension des fractions. La maîtrise de la fraction ordinaire y figure comme étape diagnostique préalable à celle des fractions décimales.",
          },
          {
            id: 'hal-05166265',
            citation: "Nguala, J.-B., Guillon, C. & Di Beta, M. (2025). De la fraction partage à la fraction nombre : étude des conditions de transfert et des effets d'un dispositif de formation à Mayotte.",
            content: "Le passage de la fraction-partage à la fraction-nombre est une rupture conceptuelle majeure. Visualiser les opérations comme transformations de quantités (barres) soutient ce passage.",
          },
        ],
      },
      howto: {
        steps: [
          {
            title: 'Découvrir les opérations',
            items: [
              "Entrez deux fractions et choisissez une opération (+, −, ×, ÷)",
              "Cliquez sur = CALCULER et suivez les étapes visuelles",
              "Identifiez l'étape clé : pour + et −, c'est la réduction au même dénominateur",
            ],
          },
          {
            title: 'Utiliser en remédiation',
            items: [
              "Montrez l'étape de simplification : l'élève voit pourquoi on peut réduire",
              "Pour la division : l'étape 'on inverse !' est souvent celle qui bloque — la visualiser aide",
              "Comparez addition et multiplication : pourquoi le résultat est-il plus petit avec ×?",
            ],
          },
        ],
        tip: "L'outil est particulièrement utile pour les élèves qui 'appliquent la règle sans comprendre' : les barres visuelles donnent du sens à chaque étape procédurale.",
      },
    },
  },
  {
    id: 'puissances',
    name: 'Puissances — Règles de calcul',
    description: "Règles des puissances (produit, quotient, puissance d'une puissance, exposant nul/négatif) avec logigramme aide-mémoire, exercices interactifs et clavier TBI.",
    url: 'https://puissances-plai.vercel.app',
    emoji: '🔢',
    category: 'Mathématiques',
    status: 'disponible',
    color: 'indigo',
    guide: {
      scientific: {
        summary: "Les erreurs sur les règles des puissances sont souvent liées à une incompréhension de la signification des exposants. Un support visuel procédural (logigramme) réduit la charge cognitive et ancre les règles avant leur automatisation.",
        references: [
          {
            id: 'W4313042527',
            citation: "Loretan, C., Weiss, L. & Müller, A. (2018). Quelle est la place du raisonnement semi-quantitatif (RSQ) dans l'enseignement des sciences. Revue de Mathématiques pour l'école, 229, 15–21.",
            content: "Les puissances de 10 et la notation scientifique sont enseignées mais peu de séquences concrètes font appel au raisonnement semi-quantitatif. Un outillage visuel explicite est nécessaire.",
          },
          {
            id: 'hal-00190165',
            citation: "Croset, M.-C. (2006). Vers une modélisation épistémique de l'apprenant. Cas du développement et réduction d'expressions algébriques.",
            content: "L'analyse des erreurs stables des élèves en algèbre révèle des connaissances implicites qui résistent à l'enseignement. Identifier ces obstacles avant d'introduire les règles de calcul sur les puissances permet de cibler précisément ce qui bloque.",
          },
          {
            id: 'dumas-00760968',
            citation: "Varinot, A. (2012). La médiation pédagogique au service de la métacognition.",
            content: "Le schéma visuel au tableau et l'explicitation de la procédure par l'élève anticipent la surcharge cognitive et renforcent la métacognition sur les règles de calcul.",
          },
        ],
      },
      howto: {
        steps: [
          {
            title: 'Utiliser en classe (TBI)',
            items: [
              "Affichez le logigramme aide-mémoire pour guider le choix de la règle à appliquer",
              "Sélectionnez le type de règle (produit, quotient, puissance…) pour cibler la difficulté",
              "Les élèves saisissent leur réponse avec exposants via le clavier TBI",
            ],
          },
          {
            title: 'Mode Enseignant',
            items: [
              "Accédez aux justificatifs scientifiques RISS depuis le panneau enseignant",
              "Ajustez le type d'exercice et le nombre de questions selon le niveau",
              "Le score et la progression sont visibles en temps réel sur TBI",
            ],
          },
        ],
        tip: "Commencez par le logigramme avant les exercices : nommer la règle avant de l'appliquer réduit les erreurs de surcharge procédurale.",
      },
    },
  },
  {
    id: 'complements-puissances',
    name: 'Compléments des Puissances de 10',
    description: "Calcul mental des compléments à une puissance de 10. Abaque coloré par rang, addition posée rang par rang, clavier TBI. Exemple résolu optionnel pour l'enseignant.",
    url: 'https://complements-puissances-plai.vercel.app',
    emoji: '🔟',
    category: 'Mathématiques',
    status: 'disponible',
    color: 'blue',
    guide: {
      scientific: {
        summary: "L'ancrage visuel positionnel rang par rang réduit la charge cognitive et soutient l'automatisation des compléments — particulièrement efficace pour les élèves dyscalculiques.",
        references: [
          {
            id: 'dumas-04485606',
            citation: "Quiterio, L. (2023). L'utilisation du boulier pour les élèves dyscalculiques.",
            content: "Le boulier/abaque crée des automatismes de manipulation mentale en passant par la manipulation physique et visuelle. Recommandé comme outil de médiation pour les élèves dyscalculiques.",
          },
          {
            id: 'dumas-02939068',
            citation: "Oesinger, F. (2020). Enseigner plus explicitement permet-il de lutter contre les malentendus scolaires ?",
            content: "L'explicitation du raisonnement rang par rang réduit la charge cognitive extrinsèque et libère la mémoire de travail pour l'activité de calcul elle-même.",
          },
          {
            id: 'hal-03186638',
            citation: "Millon Faure, K. & Gombert, A. (2021). Analyse d'une situation en mathématiques pour une élève dyscalculique. Méthodologie pour la conception d'adaptations pédagogiques et didactiques.",
            content: "Pour les élèves dyscalculiques, visualiser l'algorithme positionnel colonne par colonne est un étayage essentiel avant l'automatisation des faits numériques.",
          },
        ],
      },
      howto: {
        steps: [
          {
            title: 'Utiliser en classe (TBI)',
            items: [
              "Sélectionnez la puissance de 10 cible (10¹ à 10⁶) selon le niveau",
              "L'abaque coloré décompose le nombre rang par rang avec l'addition posée",
              "Les élèves tapent leur réponse sur le clavier TBI et valident",
            ],
          },
          {
            title: 'Mode Enseignant',
            items: [
              "Activez 'Exemple résolu' pour afficher un exemple complet à gauche",
              "Ajustez la puissance, activez les décimales, fixez l'objectif d'exercices",
              "Le score et la barre de progression suivent l'avancement en temps réel",
            ],
          },
        ],
        tip: "Commencez sans l'exemple résolu pour évaluer les acquis, puis activez-le en remédiation pour rendre le raisonnement positionnel explicite.",
      },
    },
  },
  {
    id: 'grammaire-3d',
    name: 'Grammaire 3D Interactive',
    description: "Analyse de phrase en Grammaire 3D (FWB) : assiettes colorées (fonctions), formes géométriques (nature), pictogrammes ARASAAC (sémantique). Manipulations syntaxiques sur TBI. Images personnalisées.",
    url: 'https://grammaire-3d-plai.vercel.app',
    emoji: '🍽️',
    category: 'Français',
    status: 'en-développement',
    color: 'purple',
    devBanner: true,
    guide: {
      scientific: {
        summary: "L'approche manipulatoire de la Grammaire 3D (assiettes + formes géométriques) réduit la charge cognitive déclarative et favorise l'identification fonctionnelle des groupes syntaxiques — particulièrement efficace pour les élèves dyslexiques et TDAH.",
        references: [
          {
            citation: "Lechat, L. (2020). L'enseignement des manipulations syntaxiques au cycle 4. DUMAS.",
            content: "La progression déplacement→effacement→substitution→encadrement structure l'acquisition des fonctions syntaxiques. Le support visuel (assiettes) réduit la charge procédurale.",
          },
          {
            citation: "Boulanger, C. (2018). Observer, manipuler, classer : faire de la grammaire autrement. DUMAS.",
            content: "L'activité de manipulation sur les groupes fonctionnels est plus efficace qu'un enseignement déclaratif pour les élèves en difficulté (dyslexie, TDAH). Canal visuel + kinesthésique.",
          },
          {
            citation: "Monneret, P. & Poli, F. (2022). La grammaire du français du CP à la 6e. HAL.",
            content: "Les critères de manipulation (effacement, déplacement, remplacement) sont les seuls outils fiables d'identification des groupes syntaxiques, supérieurs à la définition sémantique traditionnelle.",
          },
        ],
      },
      howto: {
        steps: [
          {
            title: 'Utiliser en classe (TBI)',
            items: [
              "Tapez une phrase complète → les mots apparaissent automatiquement avec leur pictogramme ARASAAC",
              "Sélectionnez un ou plusieurs mots → assignez une assiette (fonction syntaxique)",
              "Cliquez sur un mot → assignez sa nature (forme géométrique noire)",
            ],
          },
          {
            title: 'Manipulations 3D',
            items: [
              "🏄 Déplacement : identifie visuellement les compléments de phrase mobiles (assiette verte)",
              "✂️ Effacement : montre qu'un groupe peut disparaître sans briser la phrase",
              "🔄 Substitution : invite à remplacer un groupe par un pronom",
            ],
          },
          {
            title: 'Mode Enseignant',
            items: [
              "Activez/désactivez les pictogrammes ARASAAC, les symboles de nature, les manipulations",
              "Glissez une image personnalisée sur un token pour remplacer le pictogramme ARASAAC",
              "Double-cliquez sur un pictogramme pour choisir parmi les alternatives ARASAAC",
            ],
          },
        ],
        tip: "Commencez par les assiettes (syntaxe) avant les formes géométriques (nature) : identifier la fonction d'un groupe précède l'analyse morphologique de ses constituants.",
      },
    },
  },
  {
    id: 'abaque-unites',
    name: 'Abaque des Unités',
    description: "Conversions d'unités (longueur, masse, volume, surface) sur abaque interactif. Relation ×10 visible entre cases, flèches de direction, pont dm³=L. Exercices générés avec clavier TBI.",
    url: 'https://abaque-unites-plai.vercel.app',
    emoji: '📏',
    category: 'Mathématiques',
    status: 'disponible',
    color: 'teal',
    guide: {
      scientific: {
        summary: "L'abaque des unités sans affichage explicite des relations multiplicatives crée des malentendus durables. La relation ×10 (ou ×1000 pour les volumes cubiques) doit être visible dans la structure même de l'outil.",
        references: [
          {
            id: 'dumas-04582690',
            citation: "Renault, K. (2023). Rôle et place de l'abaque dans l'enseignement de la numération en cycle 2.",
            content: "L'abaque sans affichage explicite des relations entre unités crée des malentendus. La relation multiplicative doit être rendue visible dans chaque cellule.",
          },
          {
            citation: "Roditi, E. (2002). La multiplication des nombres décimaux en sixième. Recherche en Didactique des Mathématiques, 23(2), 183–216. Réel, hors corpus RISS.",
            content: "Il importe de comprendre la règle du déplacement de la virgule — pas seulement l'appliquer mécaniquement. Distinguer ×10, ×100 et ×1000 selon les catégories d'unités.",
          },
          {
            id: 'hal-01995387',
            citation: "Andreucci, C. & Mercier, A. (2005). Le volume : un exemple d'approche didactique d'un problème récurrent.",
            content: "Le rapport litre/m³ est toujours de 1 à 1000 — erreur classique d'appliquer ×10 aux unités cubiques. Le pont dm³=L doit être enseigné comme équivalence fondamentale.",
          },
        ],
      },
      howto: {
        steps: [
          {
            title: 'Utiliser en classe (TBI)',
            items: [
              "Sélectionnez la catégorie (longueur, masse, volume capacité, volume cubique)",
              "Choisissez les unités de départ et d'arrivée — l'abaque colore le chemin",
              "Les élèves saisissent leur réponse au clavier TBI et valident",
            ],
          },
          {
            title: 'Mode Enseignant',
            items: [
              "Activez 'Varier les unités' pour changer la paire à chaque exercice (consolidation)",
              "Affichez ou masquez le pont dm³=L selon la phase d'apprentissage",
              "Filtrez les catégories disponibles selon le niveau de la classe",
            ],
          },
        ],
        tip: "Commencez par Volume capacité (×10) puis Volume cubique (×1000) en montrant le pont dm³=L : le conflit cognitif entre les deux abaques ancre la distinction durablement.",
      },
    },
  },
  // PLAI-Quiz
  {
    id: 'plai-quiz',
    name: 'PLAI-Quiz',
    description: "Quiz accessible pour la classe inclusive. QCM, QR code, mode papier, tiers-temps, feedback enrichi. Résultats consultables par l'enseignant.",
    url: 'https://plai-quiz.vercel.app',
    emoji: '🎯',
    category: 'Évaluation formative',
    status: 'disponible',
    color: 'indigo',
    guide: {
      scientific: {
        summary: "PLAI-Quiz s'appuie sur l'effet test (testing effect) : le fait de se rappeler activement une information consolide la trace mémorielle bien plus efficacement que la relecture passive. Combiné à un feedback immédiat et à des adaptations d'accessibilité, le quiz formatif devient un outil de différenciation à part entière.",
        references: [
          {
            id: 'W4389335350',
            citation: "McMullin, S. & Masson, S. (2023). La récupération en mémoire et l'espacement. Neuroeducation.",
            content: "La récupération active en mémoire (testing effect) renforce durablement les apprentissages. Chaque tentative de rappel, même infructueuse, contribue à consolider la trace mémorielle — ce qui justifie le recours régulier au quiz en classe.",
          },
          {
            id: 'dumas-03052674',
            citation: "Keller, J. (2020). Évaluation d'une stratégie d'apprentissage par récupération chez des adolescents avec TDAH : une étude observationnelle.",
            content: "L'apprentissage par récupération (quiz, tests d'entraînement) produit de meilleurs résultats en mémorisation à long terme que l'apprentissage passif, y compris pour les élèves présentant un TDAH — ce qui en fait un outil inclusif particulièrement pertinent.",
          },
          {
            id: 'dumas-05327442',
            citation: "Romeyer-Dherbey, E. (2025). L'impact des feedbacks sur la motivation des élèves en Éducation Physique et Sportive.",
            content: "Dans le contexte de l'EPS, les rétroactions immédiates favorisent l'apprentissage, notamment chez les élèves débutants. Ce principe de feedback immédiat, documenté en EPS, est transposé ici à la correction instantanée proposée par PLAI-Quiz.",
          },
          {
            id: 'dumas-04032213',
            citation: "Capel Malo, E. et al. (2020). Le numérique au service de l'école inclusive.",
            content: "Le numérique peut être au cœur d'un enseignement différencié à condition que les outils soient conçus pour s'adapter aux besoins spécifiques des élèves. PLAI-Quiz intègre tiers-temps, lecture vocale (TTS) et polices accessibles (OpenDyslexic, Luciole) dans cette perspective.",
          },
        ],
      },
      howto: {
        steps: [
          {
            title: 'Créer un quiz',
            items: [
              'Connectez-vous → "Nouveau quiz"',
              'Donnez un titre et choisissez le profil : Fondamental ou Secondaire',
              'Ajoutez vos questions manuellement ou importez un fichier CSV (format Live Quiz : Question;BonneRéponse;Fausse1;Fausse2;Fausse3;Durée)',
              'Chaque question peut avoir une image, une durée personnalisée et un feedback explicatif',
            ],
          },
          {
            title: 'Lancer une session',
            items: [
              'Cliquez sur "▶ Lancer" depuis votre liste de quiz',
              'Choisissez le mode : Digital (QR code + code à 6 chiffres) ou Papier (style Plickers)',
              'Activez les options inclusives si besoin : tiers-temps (+33%), masquer le chrono, lecture vocale des questions',
              'Projetez le QR code ou dictez le code à 6 chiffres aux élèves',
            ],
          },
          {
            title: 'Consulter les résultats',
            items: [
              'Tableau de bord → visualisez les résultats par élève et par question',
              'Les questions avec moins de 50% de réussite sont signalées ⚠️',
              'Les demandes de SOS (bouton ?) sont comptabilisées par élève pour cibler la rétroaction',
              'Export imprimable disponible pour archivage ou communication aux parents',
            ],
          },
        ],
        tip: "Le bouton SOS (?) permet à l'élève de signaler discrètement qu'il est en difficulté sans interrompre la classe. Consultez ces signalements après la session pour cibler votre rétroaction.",
      },
    },
  },
  {
    id: 'transcripteur-plai',
    name: 'Transcripteur PLAI',
    description: "Convertit audio et vidéo en texte (MP3, M4A, MP4…). 100 % local — aucune donnée envoyée. Export TXT, Word, PDF, SRT. Fonctionne sur clé USB ou installation locale.",
    url: 'http://localhost:8000',
    emoji: '🎙️',
    category: 'Transcription',
    status: 'disponible',
    color: 'teal',
    browserNote: "Avant d'utiliser : branchez la clé USB PLAI (ou ouvrez le dossier Transcripteur PLAI sur votre PC) → double-cliquez LANCER.bat → une fenêtre noire s'ouvre → revenez ici et cliquez Ouvrir. À refaire à chaque utilisation.",
    guide: {
      scientific: {
        summary: "La transcription automatique locale réduit la charge cognitive liée à la prise de notes et rend accessibles les contenus oraux aux élèves ayant des troubles « dys » ou un TDAH. Traitement 100 % local : aucune donnée audio transmise à un tiers (RGPD).",
        references: [
          {
            id: 'hal-05450529',
            citation: "Fliti, A. & Avarello, V. (2025). Modèles Génératifs et Accès au Savoir pour les Personnes en Situation de Handicap : défis, opportunités et implications.",
            content: "Les modèles de reconnaissance vocale (dont Whisper) offrent un potentiel d'accessibilité majeur pour les personnes en situation de handicap — sous réserve d'un traitement local garantissant la confidentialité des données.",
          },
          {
            id: 'hal-05249093',
            citation: "Jean-Baptiste, P. (2025). L'IA en action : écouter comme une machine.",
            content: "La transcription automatique de cours et de réunions permet une relecture différée et une mise en texte que les élèves ayant des difficultés grapho-motrices ou attentionnelles ne peuvent produire seuls.",
          },
          {
            id: 'dumas-04562654',
            citation: "Fournier, M. (2024). Les adaptations pédagogiques de l'enseignant pour les élèves ayant des troubles « dys ».",
            content: "Fournir un support écrit issu d'un oral (cours, consigne, témoignage) est une adaptation reconnue pour les élèves avec TSLA ou TDAH — elle réduit la surcharge de la mémoire de travail.",
          },
        ],
      },
      howto: {
        steps: [
          {
            title: "① Démarrer l'application (à faire à chaque utilisation)",
            items: [
              "Branchez la clé USB PLAI sur votre PC — ou ouvrez le dossier Transcripteur PLAI",
              "Double-cliquez sur le fichier LANCER.bat (icône d'engrenage ou fichier .bat)",
              "Une fenêtre noire s'ouvre : c'est normal, ne la fermez pas — elle fait tourner l'app",
              "Votre navigateur s'ouvre automatiquement. Sinon, tapez : localhost:8000",
              "Premier démarrage uniquement : attendre ~10 s le temps que le modèle se charge",
            ],
          },
          {
            title: "② Transcrire un fichier audio ou vidéo",
            items: [
              "Glissez votre fichier dans la zone pointillée, ou cliquez « Parcourir »",
              "Formats acceptés : MP3, M4A, WAV, MP4, MKV, MOV… jusqu'à 500 MB",
              "Choisissez la langue (Français par défaut) et cliquez « Transcrire »",
              "Patience : comptez ~20-40 min pour 60 min d'audio selon votre PC",
            ],
          },
          {
            title: "③ Récupérer la transcription",
            items: [
              "Le texte apparaît à l'écran dès la fin",
              "Choisissez le format : Word (.docx) pour modifier, PDF pour imprimer, TXT pour copier",
              "Cliquez « Télécharger » — le fichier se retrouve dans votre dossier Téléchargements",
              "Vos données audio sont supprimées immédiatement — rien n'est conservé",
            ],
          },
          {
            title: "④ Quitter l'application",
            items: [
              "Fermez l'onglet du navigateur",
              "Fermez la fenêtre noire (ou appuyez Ctrl+C dedans)",
              "Retirez la clé USB si utilisée",
            ],
          },
        ],
        tip: "Idéal pour transcrire des cours magistraux, conseils de classe, témoignages ou réunions d'équipe — et rendre ces contenus accessibles aux élèves en difficulté de lecture ou de prise de notes.",
      },
    },
  },
  {
    id: 'mathipulatifs',
    name: 'Mathipulatifs PLAI',
    description:
      "6 manipulables mathématiques interactifs pour la classe inclusive : blocs base 10, droite numérique, fractions, réglettes Cuisenaire, cadres à 10, grille des 100. Profils élèves adaptatifs (dyscalculie, TDAH, dyslexie). Galerie FWB partagée entre enseignants.",
    url: 'https://mathipulatifs-plai.vercel.app',
    emoji: '🧮',
    category: 'Manipulables mathématiques',
    status: 'disponible',
    devBanner: true,
    color: 'blue',
    section: 'applications',
    guide: {
      scientific: {
        summary:
          "Mathipulatifs PLAI repose sur le triptyque manipulation–verbalisation–abstraction, socle de l'enseignement explicite en mathématiques (Jolivel, 2023). Les manipulables virtuels permettent d'externaliser le raisonnement — l'élève agit sur des représentations concrètes avant de progresser vers l'abstraction symbolique. Cette progression est particulièrement bénéfique pour les élèves présentant une dyscalculie, un TDAH ou une dyslexie, pour qui la charge cognitive de l'écriture mathématique classique constitue un frein majeur (Bergeron & Barallobres, 2021). L'usage des TICE dans ce contexte améliore l'autonomie et l'estime de soi des élèves dys (Najjar, 2015), tandis que l'enseignement explicite structuré réduit l'anxiété mathématique (Ochsenbein, 2024). La barre d'accessibilité (police OpenDyslexic, grand texte, mode focus, audio TTS) réduit la charge cognitive extrinsèque pour maximiser la ressource cognitive disponible pour l'apprentissage mathématique.",
        references: [
          {
            id: 'dumas-04324162',
            citation:
              'Jolivel, P. (2023). La manipulation en mathématiques.',
            content:
              "Le triptyque manipulation–verbalisation–abstraction constitue l'une des 21 mesures de Villani & Torossian (2018) pour réussir en mathématiques. La manipulation doit être placée au bon moment du processus d'apprentissage (phase d'acquisition) et s'inscrire dans un cadre d'enseignement explicite : modelage, pratique guidée, pratique autonome. Elle libère l'élève de la tâche graphique et lui permet d'utiliser un canal sensoriel privilégié.",
          },
          {
            id: 'W4410891703',
            citation:
              "Bergeron, L. & Barallobres, G. (2021). Processus d'abstraction et difficultés d'apprentissage en mathématiques : quelques repères théoriques.",
            content:
              "Rester dans le concret matériel sans remonter vers l'abstrait structurant éloigne paradoxalement l'élève de l'activité mathématique. Les manipulables doivent accompagner la montée vers l'abstraction symbolique, pas s'y substituer. Le passage explicite concret → semi-concret → abstrait est indispensable, notamment pour les élèves en difficulté.",
          },
          {
            id: 'dumas-03790385',
            citation:
              'Dubar, H. (2022). La manipulation en grandeurs et mesures au cycle 3.',
            content:
              "Il est important de séparer les temps d'apprentissage et de marquer explicitement les moments de passage du concret à l'abstrait, laissant les élèves s'éloigner peu à peu du matériel. La manipulation seule ne suffit pas : c'est le va-et-vient guidé entre les représentations qui construit la compréhension.",
          },
          {
            id: 'tel-01358006',
            citation:
              "Najjar, N. (2015). L'impact de l'usage des TICE sur l'apprentissage des enfants et jeunes dyslexiques, dysorthographiques et dyscalculiques : l'autonomie et l'estime de soi. Thèse de doctorat.",
            content:
              "Les outils numériques interactifs améliorent significativement l'autonomie et l'estime de soi des élèves dys. L'appropriation progressive de l'outil, disponible à tout moment, permet un travail dans l'univers de travail habituel de l'élève, réduisant l'écart ressenti avec les pairs.",
          },
          {
            id: 'dumas-04794253',
            citation:
              "Ochsenbein, J. (2024). Favoriser la motivation et réduire l'anxiété en mathématiques dans les réseaux d'éducation prioritaires : l'enseignement explicite peut-il être une solution ?",
            content:
              "L'enseignement explicite réduit l'anxiété mathématique en rendant transparents les objectifs, les critères de réussite et les étapes de résolution. Une étude au primaire (Baker et al., 2002) montre son efficacité centrée sur l'enseignant. En REP, cette approche structure l'environnement cognitif et affectif.",
          },
        ],
      },
      howto: {
        steps: [
          {
            title: "Explorer sans compte (mode démo)",
            items: [
              "Sur la page d'accueil, cliquer « Essayer » sous le manipulable choisi.",
              "Aucune inscription requise — accès immédiat pour tester en classe.",
              "Activer le profil élève adapté (dyscalculie / TDAH / dyslexie) via la barre d'accessibilité.",
            ],
          },
          {
            title: "Créer un compte enseignant",
            items: [
              "Cliquer « Accéder à l'espace enseignant » → « Créer un compte ».",
              "Renseigner nom, école (optionnel), niveau (primaire / secondaire / les deux).",
              "Connexion sécurisée via Supabase Auth — aucune donnée élève nominative stockée.",
            ],
          },
          {
            title: "Créer et modifier un exercice",
            items: [
              "Tableau de bord → « + Créer un exercice ».",
              "Donner un titre et une consigne (lue à voix haute si l'élève active l'audio).",
              "Choisir parmi les 6 manipulables et paramétrer : cible, cadres, couleurs, multiples…",
              "Valider → un lien unique (token) est généré. Modifiable à tout moment — le lien reste inchangé.",
            ],
          },
          {
            title: "Partager dans la Galerie FWB",
            items: [
              "Tableau de bord → « 🏫 Partager » sur un exercice.",
              "Indiquer le niveau (P1–P6, S1–S7) et une courte description pédagogique.",
              "L'exercice devient visible dans la galerie /galerie — les collègues peuvent le copier et l'adapter.",
            ],
          },
          {
            title: "Consulter les résultats",
            items: [
              "Tableau de bord → « 📊 Résultats » sur chaque exercice.",
              "Détail par élève : prénom, résultat correct/incorrect, durée.",
              "Exporter en PDF pour une trace imprimable.",
            ],
          },
        ],
        tip: "Privilégier la progression CPA : d'abord manipulation libre (Concret), puis demander à l'élève de dessiner ce qu'il a construit (Pictural), enfin écrire la notation mathématique (Abstrait). Cette progression est particulièrement efficace pour les élèves dyscalculiques.",
      },
    },
  },
  {
    id: 'feed-back-adapt',
    name: 'FEED-BACK ADAPT',
    description: "Classifie les erreurs mathématiques en 4 types d'obstacles cognitifs et génère un feedback pédagogique adapté via IA. Fondamental & secondaire, FR/NL/EN.",
    url: 'https://feed-back-adapt.vercel.app',
    emoji: '🎯',
    category: 'Différenciation',
    status: 'disponible',
    color: 'blue',
    section: 'sensibilisation',
    guide: {
      scientific: {
        summary: "FEED-BACK ADAPT repose sur la distinction entre erreurs symptomatiques et obstacles d'appropriation (Fouchet-Isambard & Millon Faure, 2025) et sur l'efficacité documentée du feedback élaboré en contexte scolaire. L'IA générative permet une différenciation immédiate sans surcharge pour l'enseignant.",
        references: [
          {
            id: 'hal-05361521',
            citation: "Fouchet-Isambard, K. & Millon Faure, K. (2025). Élaboration d'une typologie des erreurs en mathématiques pour concevoir des feedbacks adaptatifs.",
            content: "Article fondateur de l'app : classification des erreurs mathématiques (épistémologiques, didactiques, ontogéniques) comme base de feedbacks adaptatifs différenciés.",
          },
          {
            id: 'hal-00516595',
            citation: "Brousseau, G. (1998). Les obstacles épistémologiques, problèmes et ingénierie didactique.",
            content: "Cadre théorique fondateur : les obstacles épistémologiques comme source d'erreurs récurrentes — base de la classification utilisée dans FEED-BACK ADAPT.",
          },
          {
            id: 'dumas-05106961',
            citation: "Mahi Haddad, N. & Beaud, A. (2025). L'IA au service de la différenciation pédagogique en mathématiques : expérimentation de ChatGPT en CE1 en REP.",
            content: "Expérimentation de l'IA générative pour la différenciation en maths — résultats documentés proches du contexte FWB.",
          },
          {
            id: 'hal-04652880',
            citation: "Félix, E. (2023). Introduction à l'explicabilité dans les feedback automatisés fournis aux apprenants.",
            content: "Travaux sur la personnalisation des feedbacks automatiques pour améliorer leur efficacité perçue par les apprenants.",
          },
        ],
      },
      howto: {
        steps: [
          {
            title: "Créer un compte enseignant",
            items: [
              "Aller sur feed-back-adapt.vercel.app → Créer un compte.",
              "Renseigner prénom, nom et école.",
              "Connexion immédiate — aucune confirmation email requise.",
            ],
          },
          {
            title: "Créer un profil élève",
            items: [
              "Dashboard → + Nouvel élève.",
              "Choisir le niveau : Fondamental (6–12 ans) ou Secondaire.",
              "Choisir la langue d'enseignement : FR, NL ou EN (CLIL).",
            ],
          },
          {
            title: "Lancer une session",
            items: [
              "Cliquer « Nouvelle session » → un code 4 lettres est généré.",
              "Donner le code ou montrer le QR code à l'élève sur sa tablette.",
              "L'élève ouvre l'app et entre le code — aucun compte requis.",
            ],
          },
          {
            title: "Lire les résultats",
            items: [
              "Le tableau de bord se met à jour en temps réel pendant la session.",
              "Chaque erreur est colorée selon son type d'obstacle cognitif.",
              "Une alerte apparaît si une même erreur se répète 3 fois ou plus.",
            ],
          },
        ],
        tip: "En mode fondamental, l'élève peut écouter chaque question à voix haute (bouton 🔊) — idéal pour les élèves dyslexiques ou en difficulté de lecture.",
      },
    },
  },
  {
    id: 'dialogue-audio',
    name: 'Dialogue Audio',
    description: "Génère des dialogues audio multivoix (2 à 4 locuteurs) via l'assistant IA contextuel. Langues : NL, FR, FR(BE), DE, EN, ES, IT — voix génératives IA — profils de personnages — QR code imprimable intégré.",
    url: 'https://dialogue-audio-plai.vercel.app',
    emoji: '🎙️',
    category: 'Langues',
    status: 'disponible',
    color: 'teal',
    devBanner: true,
    guide: {
      scientific: {
        summary: "Deux axes scientifiques fondent l'usage de cet outil : l'efficacité des dialogues audio pour l'acquisition en LVE, et l'importance de contextualiser l'apprentissage dans le domaine professionnel de l'élève. Dix références vérifiées dans le corpus RISS (522 627 articles scientifiques francophones).",
        references: [
          {
            citation: "Évrard, J. (2017) — corpus RISS dumas-01760327",
            content: "L'écoute orientée vers la production (listening-as-acquisition) favorise l'ancrage lexical et phonologique, distinctement de la simple écoute-compréhension — fonde l'usage de dialogues audio à réécouter.",
          },
          {
            citation: "Bazelaire, E. (2012) — corpus RISS dumas-00765301",
            content: "Exposer l'oreille à des sonorités et rythmes nouveaux est une priorité de l'enseignement des LVE — légitime la répétition de dialogues audio à voix distinctes.",
          },
          {
            citation: "Forest, D. & Gruson, B. (2011) — corpus RISS hal-04050423",
            content: "Les activités de pré-écoute et post-écoute autour d'un document sonore structurent les transactions didactiques en classe de langue — cadre directement applicable aux dialogues générés.",
          },
          {
            citation: "Bidenti, G. (2024) — corpus RISS dumas-04828505",
            content: "Les obstacles prosodiques (rythme, intonation) freinent la compréhension orale en L2 ; l'entraînement répété à l'écoute de dialogues structurés permet de les réduire progressivement.",
          },
          {
            citation: "Jouannaud, M.-P. (2021) — corpus RISS tel-03235381",
            content: "Une exposition sonore structurée et répétée améliore l'acquisition du lexique en L2 — valide l'usage de dialogues audio différenciés par niveau et par locuteur.",
          },
          {
            citation: "Payet, A. (2022) — corpus RISS dumas-03984644",
            content: "Utiliser la contextualisation couplée à la perspective actionnelle en lycée professionnel est un moyen efficient de mobiliser les apprenants — valide l'ancrage des dialogues dans la filière métier (cuisine, coiffure, service…).",
          },
          {
            citation: "Sowa, M. (2022) — corpus RISS W4225401879",
            content: "L'ancrage dans le domaine professionnel réel rend le curriculum plus opérationnel et l'apprentissage plus signifiant pour l'élève de l'enseignement secondaire professionnel.",
          },
          {
            citation: "Desaivres, T. & Davoli, G. (2025) — corpus RISS dumas-05216415",
            content: "L'intérêt attribué par l'élève à une tâche et son ancrage situationnel sont des leviers directs de motivation intrinsèque en langue étrangère — justifie les dialogues situés dans un contexte professionnel familier.",
          },
          {
            citation: "Eucat, L., Khadraoui, S. & Dahman, K. (2023) — corpus RISS dumas-04676095",
            content: "La dimension concrète et contextualisée des productions est un levier de motivation spécifique aux élèves de lycée professionnel — renforce l'effet du dialogue ancré dans le métier de l'élève.",
          },
          {
            citation: "Leglinel Conti, G. (2021) — corpus RISS dumas-03699714",
            content: "Intégrer la dimension professionnelle dans un cours de langue étrangère a un effet positif sur l'engagement et la valorisation des compétences — fonde l'usage du générateur de scripts par filière et par métier.",
          },
        ],
      },
      howto: {
        steps: [
          {
            title: "1. Choisir la langue et les locuteurs",
            items: [
              "Sélectionnez la langue cible : néerlandais (BE), néerlandais (NL), français, français (Belgique), allemand, anglais (UK), espagnol, italien.",
              "8 voix génératives IA (4 féminines + 4 masculines) — personnalité, âge, rôle, registre émotionnel configurables.",
              "Choisissez 2 à 4 locuteurs (A, B, C, D) et configurez le profil de chaque personnage.",
              "Ajoutez une ambiance sonore (café, bureau, rue…) pour contextualiser le dialogue.",
            ],
          },
          {
            title: "2. Préparer le script — 3 options",
            items: [
              '✨ Option A — Génération IA (recommandée) : ouvrez le panneau coloré en étape 3, remplissez le niveau, le domaine, le sujet et le nombre de répliques. Le script est généré directement dans la langue cible et reste éditable. Max 10 générations/heure.',
              "Option B — Traduction : rédigez le script en français (format A:/B:), puis cliquez \"Traduire\" pour obtenir une version dans la langue cible via DeepL. Option disponible dans la limite du crédit — en cas de dépassement, contactez le Pôle.",
              'Option C — Saisie manuelle ou import Word : chaque ligne DOIT commencer par "A: texte" ou "B: texte". Les lignes sans préfixe sont ignorées. Rafraîchissez la page pour réinitialiser.',
              "Le prévisualiseur coloré affiche le script par locuteur en temps réel avec une estimation de durée.",
            ],
          },
          {
            title: "3. Générer et distribuer",
            items: [
              "Cliquez \"Générer le dialogue audio\" (60–120 secondes selon la longueur). ⚠ Max ~30 répliques par génération recommandé.",
              "Écoutez via le lecteur intégré, téléchargez le MP3, copiez le lien.",
              "Imprimez ou intégrez le QR code (600×600 px) sur vos fiches papier. L'audio est disponible ~10 minutes après génération (délai Internet Archive).",
              "Les élèves scannent le QR code avec leur smartphone pour écouter directement.",
            ],
          },
        ],
        tip: "Réserve d'usage : l'outil est en développement actif. Limite : 500 générations/jour pour l'ensemble des utilisateurs des écoles coopérantes. L'audio est stocké sur Internet Archive (accès public permanent). Ne pas utiliser pour des contenus sensibles ou confidentiels.",
      },
    },
  },
  {
    id: 'claude101',
    name: 'Claude l\'assistant pédagogique',
    description: 'Guide progressif en 5 niveaux : des premières conversations à l\'automatisation. Exemples ancrés dans le quotidien des enseignants FWB, zéro jargon technique.',
    url: '/claude101-fwb.html',
    emoji: '📚',
    category: 'Guide',
    status: 'disponible',
    color: 'purple',
    section: 'claude',
  },
  {
    id: 'claude-parametrer',
    name: 'Paramétrer Claude',
    description: 'Mode d\'emploi pour configurer Claude : choisir le bon modèle, rédiger ses instructions système, gérer les projets et la mémoire. Pour un usage professionnel ancré dans ton contexte d\'enseignant.',
    url: '/guide-parametrer-claude-plai.html',
    emoji: '⚙️',
    category: 'Guide',
    status: 'disponible',
    color: 'teal',
    section: 'claude',
  },
  {
    id: 'claude-design',
    name: 'Claude Design',
    description: 'Mode d\'emploi pour créer des visuels professionnels (affiches, decks, pages web) sans toucher à du code. Scénarios concrets pour le fondamental et le secondaire FWB.',
    url: '/guide-claude-design-enseignants-fwb.html',
    emoji: '🎨',
    category: 'Guide',
    status: 'disponible',
    color: 'orange',
    section: 'claude',
  },
  {
    id: 'claude-skills',
    name: 'Claude Skills',
    description: 'Mode d\'emploi pour activer et utiliser les Skills Claude : des commandes pédagogiques contextualisées pour le terrain PLAI (simplification, évaluation adaptée, FALC, quiz iPad...).',
    url: '/guide-skills-claude-plai.html',
    emoji: '⚡',
    category: 'Guide',
    status: 'disponible',
    color: 'indigo',
    section: 'claude',
  },
  {
    id: 'import-skill-partage',
    name: 'Importer un skill partagé',
    description: 'Mode d\'emploi pour activer un fichier .skill reçu d\'un collègue : procédure d\'import, vérifications de sécurité et checklist avant activation.',
    url: '/guide-import-skill-partage.html',
    emoji: '📥',
    category: 'Guide',
    status: 'disponible',
    color: 'indigo',
    section: 'claude',
  },
  {
    id: 'bien-ecrire-claude',
    name: 'Bien écrire à Claude',
    description: 'Guide pratique pour formuler des prompts efficaces dans Claude (particulièrement pour Opus 4.7) : structure d\'une bonne demande, exemples par type de tâche pédagogique, erreurs fréquentes et astuces PLAI.',
    url: '/guide-bien-ecrire-claude-plai.html',
    emoji: '✍️',
    category: 'Guide',
    status: 'disponible',
    color: 'indigo',
    section: 'claude',
  },
  {
    id: 'ia-enseignants-plai',
    name: 'Quelle IA pour quoi faire ?',
    description: 'Portraits de 5 IA (Gemini, ChatGPT, Claude, Kimi, DeepSeek) ancrés dans le contexte FWB : forces, angles morts, prompts qui fonctionnent, combinaisons multi-IA. Choisir le bon outil pour chaque tâche pédagogique.',
    url: '/guide-ia-enseignants-plai.html',
    emoji: '🧭',
    category: 'Guide',
    status: 'disponible',
    color: 'amber',
    section: 'ia',
  },
  {
    id: 'claude-cowork',
    name: 'Claude Cowork — Automatiser ses tâches',
    description: 'Créer des workflows qui automatisent les tâches répétitives (ranger des copies, préparer des comptes rendus, trier des fichiers) avec Claude Cowork. Aucun code requis — tu décris en français, Claude exécute.',
    url: '/guide-cowork-automatismes-plai.html',
    emoji: '🤖',
    category: 'Guide',
    status: 'disponible',
    color: 'teal',
    section: 'claude',
  },
  {
    id: 'superpowers-guide',
    name: 'Donner des supers pouvoirs à Claude Code',
    description: 'Comprendre et installer le plugin Superpowers : pourquoi Claude Code a besoin de discipline, ce que le plugin garantit concrètement, les 14 commandes disponibles et le guide d\'installation Windows testé.',
    url: '/superpowers-guide.html',
    emoji: '🚀',
    category: 'Guide',
    status: 'disponible',
    color: 'indigo',
    section: 'claude-code',
  },
  {
    id: 'claude-code-guide',
    name: 'Claude Code — Construire ses outils pédagogiques',
    description: 'De l\'idée à l\'URL en production sans être développeur. Galerie de 12 apps pédagogiques avec profils RGPD, trilogie claude-workspace/GitHub/Vercel, tutoriel fil rouge QCM generator et extension Supabase.',
    url: '/guide-claude-code-plai.html',
    emoji: '🛠️',
    category: 'Guide',
    status: 'disponible',
    color: 'teal',
    section: 'claude-code',
  },
  {
    id: 'ytdl-plai',
    name: 'YT-DL PLAI',
    emoji: '📥',
    category: 'Outil local',
    description: 'Télécharge des vidéos YouTube en MP4 et extrait les transcripts — sans publicité, sans connexion en classe. S\'installe sur l\'ordinateur, s\'ouvre dans le navigateur. Windows uniquement.',
    url: 'http://localhost:7890',
    status: 'en-développement',
    devBanner: true,
    color: 'teal',
    section: 'utilitaires',
    browserNote: 'Application locale à installer sur chaque ordinateur. Consulter le guide 📖 pour l\'installation pas à pas.',
    guide: {
      howto: {
        steps: [
          {
            title: 'Télécharger et installer (une seule fois, ~2 minutes)',
            items: [
              'Télécharger le fichier d\'installation : https://github.com/jfb4plai/ytdl-plai/releases/latest/download/YT-DL-PLAI-Setup.exe',
              'Double-cliquer sur le fichier téléchargé.',
              'Windows affiche un avertissement bleu : "Windows a protégé votre ordinateur" — c\'est normal pour tout logiciel non commercial.',
              'Cliquer sur "Informations complémentaires" (lien gris, en bas du message).',
              'Cliquer sur "Exécuter quand même".',
              'L\'installateur s\'ouvre : cliquer 3 fois sur "Suivant" puis "Installer".',
              'Un raccourci "YT-DL PLAI" apparaît sur le Bureau.',
            ],
          },
          {
            title: 'Lancer l\'application',
            items: [
              'Double-cliquer sur l\'icône "YT-DL PLAI" sur le Bureau.',
              'Une petite fenêtre noire s\'ouvre — c\'est normal, ne pas la fermer, c\'est le moteur de l\'app.',
              'Le navigateur (Chrome, Firefox…) s\'ouvre automatiquement sur la page de l\'outil.',
              'Si le navigateur ne s\'ouvre pas : taper manuellement "localhost:7890" dans la barre d\'adresse.',
            ],
          },
          {
            title: 'Télécharger une vidéo YouTube en MP4',
            items: [
              'Aller sur YouTube et copier l\'adresse de la vidéo (la barre en haut du navigateur).',
              'Coller l\'adresse dans le champ "URL YouTube" de l\'application.',
              'Cliquer sur "Télécharger MP4 1080p".',
              'Une barre de progression apparaît avec la vitesse et le temps restant.',
              'Quand c\'est terminé, un message vert confirme : la vidéo est dans le dossier "Téléchargements" de l\'ordinateur.',
            ],
          },
          {
            title: 'Extraire le texte d\'une vidéo (transcript)',
            items: [
              'Cliquer sur l\'onglet "Transcript" (en haut de la carte).',
              'Coller l\'URL YouTube dans le champ.',
              'Cliquer "Extraire le transcript".',
              'Le texte de la vidéo s\'affiche — uniquement si la vidéo possède des sous-titres (automatiques ou manuels).',
              'Cliquer "Copier" pour l\'utiliser dans un document, ou "Télécharger .txt" pour le sauvegarder.',
            ],
          },
          {
            title: 'Fermer l\'application',
            items: [
              'En bas de la page de l\'outil, cliquer sur "Arrêter l\'application".',
              'Confirmer. La fenêtre noire se ferme automatiquement.',
              'Alternative : fermer la petite fenêtre noire directement.',
            ],
          },
        ],
        tip: 'Téléchargez les vidéos la veille au soir depuis chez vous : elles seront disponibles le lendemain en classe, même sans connexion internet. Idéal pour les écoles avec réseau instable.',
      },
      scientific: {
        summary:
          'L\'accès asynchrone et hors-ligne aux ressources vidéo soutient l\'autonomie des apprenants, réduit la charge cognitive liée aux interruptions techniques et s\'inscrit dans les principes de la classe inversée. Éliminer les publicités supprime une source de distraction extrinsèque documentée comme nuisible à la concentration des élèves à besoins spécifiques.',
        references: [
          {
            id: 'halshs-03762352',
            citation:
              'Carminatti, N., Charalampopoulou, C., & Carnus, M.-F. (2021). Quelle présence pour accompagner l\'apprentissage à distance ? Questions Vives. DOI: 10.4000/questionsvives.6083',
            content:
              'En mode asynchrone formel, l\'enseignant propose des ressources pouvant être consultées à tout moment (en temps différé), laissant à chacun la capacité d\'organiser son apprentissage en autonomie, librement et à son propre rythme.',
          },
          {
            id: 'dumas-04355318',
            citation:
              'Grover, D. (2023). La classe inversée et l\'enseignement-apprentissage de la grammaire à l\'Alliance Française de Delhi. Mémoire, Sciences humaines et sociales.',
            content:
              'La capsule vidéo constitue un support pédagogique central de la pédagogie inversée : consultée hors classe, elle libère le temps présentiel pour les activités d\'interaction, de pratique et de remédiation.',
          },
          {
            id: 'dumas-01867157',
            citation:
              'Martin, W. (2018). Création de supports audiovisuels en odontologie pédiatrique. Mémoire, Sciences du Vivant.',
            content:
              'La ressource vidéo a pour but d\'amorcer une discussion accompagnée d\'une réflexion en classe. Cette méthode d\'enseignement découle du constructivisme pédagogique : l\'apprenant construit son savoir à partir d\'une expérience médiatisée avant la mise en commun.',
          },
        ],
      },
    },
  },
  {
    id: 'diffactif',
    name: 'DiffActif',
    description: "Différenciation pédagogique par Aménagements Universels (AUs) : cartographie les profils de besoins (DYS, TDAH, HPI, allophone, décrocheur), génère des variantes d'activités adaptées par profil via IA (split 80/20), planifie des séquences différenciées avec AUs intégrés, suit la progression de la pratique. Codes anonymes. 8 références RISS vérifiées.",
    url: 'https://diffactif.vercel.app',
    emoji: '🧩',
    category: 'Différenciation',
    status: 'en-développement',
    color: 'orange',
    devBanner: true,
    guide: {
      scientific: {
        summary:
          "DiffActif opérationnalise la Conception Universelle de l'Apprentissage (CUA/UDL) en contexte FWB : ses 5 modules couvrent les 3 principes CAST (représentation, action/expression, engagement). L'IA génère des variantes différenciées selon le profil de l'élève (DYS, TDAH, HPI, allophone, décrocheur), en laissant 20% de décision à l'enseignant. Toutes les stratégies-clés proposées par profil sont ancrées dans des recherches du corpus RISS (522 627 articles scientifiques francophones). Les codes anonymes garantissent la conformité RGPD.",
        references: [
          {
            citation: "Rusconi, L. (2025). La conception universelle de l'apprentissage (CUA) dans la formation des enseignants. [RISS : W4414205903]",
            content:
              "Le cadre CUA/CAST préconise une inclusion pédagogique dès la conception des activités, selon trois principes : varier les formes de représentation, les modalités d'action/expression et les leviers d'engagement. DiffActif structure ses modules et sa génération IA autour de ces trois axes.",
          },
          {
            citation: "Alvarez, L. (2024). La conception universelle de l'apprentissage. [RISS : W4402615917]",
            content:
              "La CUA part du constat que la variabilité des apprenants est la norme, non l'exception. Concevoir d'emblée pour la diversité est plus efficace que d'adapter a posteriori pour chaque cas individuel.",
          },
          {
            citation: "Mahi Haddad, S. & Beaud, M. (2025). L'IA au service de la différenciation pédagogique dans l'enseignement des mathématiques. [RISS : dumas-05106961]",
            content:
              "L'IA générative permet une différenciation immédiate et individualisée sans surcharge pour l'enseignant, à condition de maintenir le jugement professionnel de celui-ci dans la boucle — ce que DiffActif formalise par le split 80% IA / 20% enseignant.",
          },
          {
            citation: "Fournier, M. (2024). Les adaptations pédagogiques de l'enseignant pour les élèves ayant des troubles « dys ». [RISS : dumas-04562654]",
            content:
              "Les stratégies d'adaptation efficaces pour les élèves DYS portent sur la forme des supports (typographie, interligne), la formulation des consignes (verbe d'action, phrases courtes) et les modalités de production (oral, numérique). Ces stratégies structurent les profils DYS de DiffActif.",
          },
          {
            citation: "Goetchel, E-M. (2025). Diversité des profils, unité dans l'apprentissage : la différenciation pédagogique. [RISS : dumas-05353601]",
            content:
              "La différenciation pédagogique efficace s'évalue selon cinq dimensions : adaptation du contenu, des processus, des productions, de l'environnement et des pratiques inclusives. Le Module 5 de DiffActif (Progression) reprend cette grille d'auto-évaluation.",
          },
          {
            citation: "Huau, A., Jover, M. & Roussey, J-Y. (2017). Difficultés associées et scolarisation des enfants dyslexiques. [RISS : hal-01792683]",
            content:
              "La dyslexie s'accompagne fréquemment de comorbidités (dysorthographie, dyscalculie, TDAH) qui complexifient le profil de l'élève. DiffActif permet de combiner plusieurs profils pour un même élève et de générer des variantes adaptées à ce profil composite.",
          },
        ],
      },
      howto: {
        steps: [
          {
            title: "1. Cartographier la classe",
            items: [
              "Connectez-vous avec votre compte PLAI (partagé avec les autres apps).",
              "Allez dans 'Profils' et créez vos élèves avec un code anonyme (ex. : A1, B3, Élève12).",
              "Pour chaque élève, sélectionnez un ou plusieurs profils de besoins : dyslexie, dyscalculie, dyspraxie, TDAH, allophone, décrocheur, HPI.",
              "Les stratégies-clés associées à chaque profil s'affichent automatiquement — elles guideront la génération IA.",
            ],
          },
          {
            title: "2. Adapter une activité",
            items: [
              "Allez dans 'Adapter' et collez le texte d'une activité existante (exercice, consigne, document).",
              "Sélectionnez les profils cibles et la matière.",
              "Cliquez 'Générer' — l'IA produit une variante par profil en 10 à 20 secondes.",
              "Chaque variante reste modifiable : le 20% enseignant s'applique ici — ajustez selon ce que vous savez de vos élèves.",
              "Exportez les variantes en DOCX, prêtes à imprimer ou à partager.",
            ],
          },
          {
            title: "3. Planifier une séquence CUA",
            items: [
              "Allez dans 'Séquence' pour structurer une séquence complète selon les 3 principes CUA.",
              "Pour chaque séance, renseignez les objectifs, les modalités de représentation, d'action/expression et d'engagement.",
              "La séquence peut être exportée en DOCX ou partagée avec l'équipe pédagogique.",
            ],
          },
          {
            title: "4. Bibliothèque et suivi de progression",
            items: [
              "La bibliothèque propose des exemples concrets validés par la recherche RISS, filtrables par profil et par niveau FWB.",
              "Le module Progression propose une grille d'auto-évaluation en 5 dimensions pour suivre l'évolution de votre pratique différenciée dans le temps.",
            ],
          },
        ],
        tip: "Commencez par adapter une seule activité pour un seul profil — le résultat sera plus précis et plus utile qu'une différenciation tous profils d'un coup. Une fois à l'aise avec le module Adapter, la Séquence CUA devient un outil de planification trimestrielle puissant.",
      },
    },
  },
];

export default apps;
