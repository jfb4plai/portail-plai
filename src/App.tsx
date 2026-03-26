import { useState } from 'react';
import './index.css';

type AppStatus  = 'disponible' | 'bientôt';
type AppSection = 'applications' | 'sensibilisation';

type Reference = { citation: string; content: string };
type StepGroup = { title: string; items: string[] };

type GuideContent = {
  scientific: { summary: string; references: Reference[] };
  howto: { steps: StepGroup[]; tip?: string };
};

type AppItem = {
  id: string;
  name: string;
  description: string;
  url: string;
  emoji: string;
  category: string;
  status: AppStatus;
  color: string;
  section?: AppSection;
  browserNote?: string;
  guide?: GuideContent;
};

const apps: AppItem[] = [
  {
    id: 'flashfwb',
    name: 'Flash FWB',
    description: "Flashcards interactives pour la mémorisation. Création de decks par l'enseignant, apprentissage adaptatif pour l'élève.",
    url: 'https://flashfwb.vercel.app',
    emoji: '🃏',
    category: 'Mémorisation',
    status: 'disponible',
    color: 'blue',
    guide: {
      scientific: {
        summary: "Flash FWB repose sur trois piliers validés par les sciences cognitives : le rappel actif, la répétition espacée et l'auto-évaluation immédiate.",
        references: [
          {
            citation: "Choffin, B. (2021). Algorithmes d'espacement adaptatif de l'apprentissage.",
            content: "La répétition espacée améliore significativement la mémorisation à long terme par rapport à une révision « massée » en une seule session — c'est l'effet d'espacement (spacing effect).",
          },
          {
            citation: 'Gayraud-Simon, N. (2022). Les apports des sciences cognitives à la mémorisation en classe de collège.',
            content: "La relecture passive (stratégie préférée des élèves) est bien moins efficace que le rappel actif : se forcer à retrouver une information sans la relire consolide davantage la trace mnésique.",
          },
          {
            citation: 'Lacombe, A. (2024). Utilisation de flashcard sous forme de schéma fonctionnel dans le processus de mémorisation à long terme.',
            content: "L'approche combinée (flashcard + représentation schématique) optimise la rétention à long terme.",
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
              "Possibilité d'ajouter une image au recto ou au verso",
            ],
          },
          {
            title: 'Partager avec les élèves',
            items: [
              "Publiez le deck → un code de classe est généré",
              "Les élèves entrent le code sur leur appareil — aucun compte nécessaire",
              "Ils pratiquent en mode auto-évaluation (je sais / je ne sais pas)",
            ],
          },
          {
            title: 'Suivi',
            items: [
              "Le tableau de bord montre les cartes maîtrisées vs à retravailler par élève",
              "Réactivez un deck en fin de séquence pour ancrer les apprentissages",
            ],
          },
        ],
        tip: "Privilégiez des sessions courtes et fréquentes (5 min / jour) plutôt qu'une longue session hebdomadaire.",
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
    guide: {
      scientific: {
        summary: "Picto Lecture s'inscrit dans la tradition de la Communication Alternative et Augmentée (CAA) en rendant le texte accessible par le canal visuel, multipliant les entrées sensorielles pour un même contenu.",
        references: [
          {
            citation: "Chasseur, L. (2020). ÉvalCom : évaluation de l'acceptabilité des outils de CAA par tableaux de pictogrammes.",
            content: "Les outils CAA par pictogrammes améliorent l'accès au sens pour les élèves à besoins spécifiques, à condition d'être intégrés dans une pratique régulière et contextualisée.",
          },
          {
            citation: 'Ferreira, C. (2021). Un outil novateur au service des compétences en langage oral : les tableaux de langage assisté.',
            content: "Le recours aux pictogrammes en lecture partagée développe les compétences langagières orales dès la maternelle, y compris pour des élèves sans troubles déclarés.",
          },
          {
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
              'Dans le panneau Paramètres (droite), choisissez la langue (français/anglais)',
              'Cochez les catégories à pictogrammiser : Noms, Verbes, Adjectifs',
              'Activez vos listes de mots personnalisés si créées',
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
        tip: "Créez des listes de mots personnalisés pour le vocabulaire spécifique de vos élèves (prénoms, lieux familiers, vocabulaire de classe).",
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
    guide: {
      scientific: {
        summary: "DéfiniFWB transforme une leçon de vocabulaire traditionnelle (frontale, passive) en activité collective interactive, conforme aux recommandations sur l'usage pédagogique du TBI.",
        references: [
          {
            citation: "Redouani, A. (2022). L'impact de l'usage pédagogique du TBI sur l'engagement scolaire des élèves.",
            content: "L'usage du TBI en classe augmente significativement l'engagement comportemental et cognitif des élèves, à condition que l'outil soit intégré dans une démarche participative.",
          },
          {
            citation: 'Grondin, O. (2019). Apprendre et enseigner autrement avec le tableau interactif.',
            content: "Le TBI n'améliore les apprentissages que lorsqu'il génère de l'interaction entre élèves et entre élèves et contenu — pas en usage purement frontal.",
          },
          {
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
              'Sélectionnez parmi les 6 modes disponibles (association, devinette, classement…)',
              'Projetez l\'application sur le TBI',
            ],
          },
          {
            title: 'Lancer avec les élèves',
            items: [
              'Partagez le QR code ou le code d\'accès',
              'Les élèves rejoignent depuis leur tablette / PC',
              'Animez la séance depuis votre vue enseignant',
            ],
          },
          {
            title: 'Après la séance',
            items: [
              'Consultez les résultats par élève et par mot',
              'Réutilisez la séance ou exportez les résultats',
            ],
          },
        ],
        tip: "Utilisez le mode TBI pour une activité collective, puis passez en mode individuel (QR code) pour une consolidation autonome.",
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
    guide: {
      scientific: {
        summary: "Droite Graduée traduit directement les recommandations de la recherche en neurosciences de l'éducation : faire manipuler la droite graduée de façon active et répétée, avec feedback immédiat.",
        references: [
          {
            citation: 'Fanjat, J. & Roditi, E. (2025). Interrogations didactiques à propos de la ligne numérique mentale.',
            content: "Les auteurs distinguent la ligne numérique mentale (représentation cognitive innée), la droite numérique (objet mathématique) et la droite graduée (outil didactique). C'est sur cette dernière que l'enseignant agit.",
          },
          {
            citation: 'Hirsch, M. & Roditi, E. (2023). Quand les neurosciences analysent les apprentissages en mathématiques.',
            content: "Le placement des nombres sur la droite numérique est fondamental et déterminant pour leur apprentissage — conclusion validée par le Conseil scientifique de l'Éducation nationale française (2022).",
          },
          {
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
              'Connectez-vous → "Nouvelle configuration"',
              'Définissez la plage numérique (ex. : 0–100, 0–1000, nombres décimaux)',
              'Choisissez le type d\'activité : estimation, placement précis, mix',
            ],
          },
          {
            title: 'Utiliser en classe',
            items: [
              'Projetez sur TBI ou partagez le lien avec les élèves',
              'L\'élève place le nombre sur la droite → feedback visuel immédiat',
              'Variez les plages pour travailler différentes compétences',
            ],
          },
          {
            title: 'Sauvegarder',
            items: [
              'Enregistrez vos configurations → réutilisables d\'une séance à l\'autre',
              'Pas besoin de reconfigurer à chaque cours',
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
    guide: {
      scientific: {
        summary: "Dictée Interactive répond aux trois conditions scientifiquement validées : pratique active de l'orthographe + feedback immédiat + réduction de l'anxiété liée à l'erreur (le numérique dédramatise).",
        references: [
          {
            citation: "Pérez, M. (2013). L'apprentissage de l'orthographe lors de la dictée et la copie de mots manuscrits.",
            content: "La dictée reste une des modalités les plus efficaces pour l'apprentissage de l'orthographe lexicale — à condition que l'erreur soit traitée, pas seulement sanctionnée.",
          },
          {
            citation: "Borchardt, G. (2012). L'influence des connaissances graphotactiques sur l'acquisition de l'orthographe lexicale.",
            content: "Le feedback immédiat après chaque erreur améliore significativement les performances lors d'évaluations différées — sans feedback, l'erreur se consolide.",
          },
          {
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
              'Entrez votre liste de mots',
            ],
          },
          {
            title: 'Configurer les options',
            items: [
              'Mode clavier : l\'élève tape le mot',
              'Mode lettres mélangées : l\'élève remet les lettres dans l\'ordre (plus accessible)',
              'Lettres parasites : des lettres supplémentaires s\'ajoutent pour corser l\'exercice',
              'Mode prononciation : le mot est lu à voix haute (TTS)',
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
            ],
          },
        ],
        tip: "Le mode lettres mélangées est idéal en différenciation pour les élèves dyslexiques — même liste de mots, modalité adaptée.",
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
        summary: "L'Atelier Dyslexie exploite l'expérience vécue comme levier de formation : en vivant eux-mêmes la désorganisation de la lecture dyslexique, les enseignants construisent une compréhension incarnée de la difficulté — et font émerger spontanément les aménagements pertinents.",
        references: [
          {
            citation: "Deleuze, C. (2023). Troubles spécifiques des apprentissages : création d'une action de sensibilisation à destination des enseignants en école élémentaire. DUMAS.",
            content: "Les enseignants sont souvent peu sensibilisés aux troubles Dys, alors qu'ils en sont en demande. Une action de sensibilisation auprès de 53 enseignants montre « une nette amélioration des connaissances [...] et sur leur sentiment de compétence » pour accompagner les élèves concernés.",
          },
          {
            citation: "Adrian, S. (2021). Dimension psychoaffective des enfants présentant des troubles des apprentissages et effets de la sensibilisation par la simulation en classe en ergothérapie. DUMAS.",
            content: "L'expérience scolaire des enfants avec troubles des apprentissages est décrite comme « plutôt traumatisante, provoquant des niveaux de détresse et de douleur psychique ». La simulation permet aux enseignants de comprendre cette réalité de l'intérieur — bien au-delà d'un exposé théorique.",
          },
          {
            citation: "Coffin, M., Goulet, C. & Piquard-Kipffer, A. (2023). L'accessibilité numérique au service des étudiants dyslexiques. Les Cahiers Pédagogiques, 582, pp.10-11.",
            content: "« La modification de la typographie permet d'accéder plus facilement au sens d'un texte (interligne, police sans empattement, espaces interlettres et intermots augmentés). L'outil de synthèse vocale [...] permet de gagner du temps et de la fatigue en lecture. »",
          },
        ],
      },
      howto: {
        steps: [
          {
            title: 'Mise en situation',
            items: [
              "Collez ou importez un texte (supporte .txt et .docx)",
              "Activez les effets Dyslexie : inversions, mélange de lettres, décalages verticaux",
              "Essayez de lire — ressentez la charge cognitive et la fatigue visuelle",
            ],
          },
          {
            title: 'Explorer les aménagements',
            items: [
              "Modifiez la police (OpenDyslexic, Arial, Verdana…)",
              "Augmentez la taille, l'interligne, l'espacement des lettres",
              "Testez les fonds colorés (crème, bleu ciel, vert tableau…)",
              "Activez la colorisation un mot sur deux (bicolor)",
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
            citation: "Rollinde, E. (2021). L'Astronomie pour l'éducation dans l'espace francophone. HAL.",
            content: "L'enseignement du système solaire gagne à s'appuyer sur des activités visuelles et dynamiques : séances sur les planètes telluriques et gazeuses, leurs proportions et leurs positions relatives ancrent des représentations que le texte seul ne peut construire.",
          },
          {
            citation: "Kpodar, J.-L. (2017). Effets des instructions de pertinence spécifiques sur les apprentissages avec des animations. DUMAS.",
            content: "Le guidage attentionnel dans une animation permet de réduire la charge cognitive extrinsèque (Sweller). Pour le système solaire, l'affichage progressif des noms, orbites et vitesses remplit ce rôle : chaque option libère des ressources pour la compréhension conceptuelle.",
          },
          {
            citation: "Puma, S. (2016). Optimisation des apprentissages : modèles et mesures de la charge cognitive. Thèse de doctorat.",
            content: "La réduction de la charge extrinsèque par des représentations visuelles adaptées améliore significativement la compréhension et la rétention pour tous les profils d'apprenants, y compris les élèves à besoins spécifiques.",
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
            citation: "Nguala, Guillon & Di Beta (2025). De la fraction partage à la fraction nombre. HAL.",
            content: "Chaque changement de représentation est important : il permet à chaque registre de mettre en évidence une partie des caractéristiques de l'objet fraction. Plusieurs conversions sont nécessaires pour en espérer une connaissance totale.",
          },
          {
            citation: "Fanet, H. (2021). Ritualiser la représentation des fractions au cycle 3. DUMAS.",
            content: "Ritualiser plusieurs représentations (bande, disque, droite, ensemble) développe la capacité à identifier et produire différentes formes d'une même fraction, compétence clé pour les élèves en difficulté.",
          },
          {
            citation: "Ledan, L. (2025). Conceptualisation des fractions dans La méthode de Singapour en CE1-CE2. HAL.",
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
            citation: "Duveau, M. (2022). La place et le rôle de l'erreur dans l'apprentissage des fractions simples en CM1. DUMAS.",
            content: "L'erreur dans l'apprentissage des fractions est une étape normale : rendre visible chaque étape de calcul permet à l'élève d'identifier précisément où se situe l'obstacle et de le corriger.",
          },
          {
            citation: "Morisse, A. (2016). Validation d'épreuves d'évaluation de la numération au sein d'Examath. DUMAS.",
            content: "La compréhension des fractions ordinaires précède celle des fractions décimales. Des représentations visuelles étape par étape réduisent la charge cognitive et rendent les procédures accessibles.",
          },
          {
            citation: "Nguala, Guillon & Di Beta (2025). De la fraction partage à la fraction nombre. HAL.",
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
            citation: "Quiterio, L. (2023). L'utilisation du boulier pour les élèves dyscalculiques. DUMAS.",
            content: "Le boulier/abaque crée des automatismes de manipulation mentale en passant par la manipulation physique et visuelle. Recommandé comme outil de médiation pour les élèves dyscalculiques.",
          },
          {
            citation: "Oesinger, F. (2020). Enseigner plus explicitement permet-il de lutter contre les malentendus scolaires ? DUMAS.",
            content: "L'explicitation du raisonnement rang par rang réduit la charge cognitive extrinsèque et libère la mémoire de travail pour l'activité de calcul elle-même.",
          },
          {
            citation: "Millon Faure, K. & Gombert, A. (2021). Analyse d'une situation en mathématiques pour une élève dyscalculique. HAL.",
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
];

const colorMap: Record<string, { bg: string; border: string; badge: string; btn: string; light: string }> = {
  blue:   { bg: 'bg-blue-50',   border: 'border-blue-200',   badge: 'bg-blue-100 text-blue-700',    btn: 'bg-blue-600 hover:bg-blue-700',    light: 'bg-blue-100' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', badge: 'bg-purple-100 text-purple-700', btn: 'bg-purple-600 hover:bg-purple-700', light: 'bg-purple-100' },
  green:  { bg: 'bg-green-50',  border: 'border-green-200',  badge: 'bg-green-100 text-green-700',   btn: 'bg-green-600 hover:bg-green-700',   light: 'bg-green-100' },
  gray:   { bg: 'bg-gray-50',   border: 'border-gray-200',   badge: 'bg-gray-100 text-gray-500',    btn: 'bg-gray-400 cursor-not-allowed',   light: 'bg-gray-100' },
  pink:   { bg: 'bg-pink-50',   border: 'border-pink-200',   badge: 'bg-pink-100 text-pink-700',    btn: 'bg-pink-600 hover:bg-pink-700',    light: 'bg-pink-100' },
  orange: { bg: 'bg-orange-50', border: 'border-orange-200', badge: 'bg-orange-100 text-orange-700', btn: 'bg-orange-600 hover:bg-orange-700', light: 'bg-orange-100' },
  amber:  { bg: 'bg-amber-50',  border: 'border-amber-300',  badge: 'bg-amber-100 text-amber-800',  btn: 'bg-amber-600 hover:bg-amber-700',  light: 'bg-amber-100' },
};

function GuideModal({ app, onClose }: { app: AppItem; onClose: () => void }) {
  const [tab, setTab] = useState<'howto' | 'scientific'>('howto');
  const c = colorMap[app.color];
  const g = app.guide!;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`flex items-center justify-between px-6 py-4 rounded-t-2xl ${c.bg} border-b ${c.border}`}>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{app.emoji}</span>
            <div>
              <h2 className="text-lg font-bold text-gray-800">{app.name}</h2>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.badge}`}>{app.category}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="text-xs px-3 py-1.5 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition"
            >
              🖨️ Imprimer
            </button>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-2xl leading-none">×</button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 px-6 pt-3 gap-4">
          <button
            onClick={() => setTab('howto')}
            className={`pb-2 text-sm font-semibold border-b-2 transition ${tab === 'howto' ? `border-current ${c.badge.split(' ')[1]}` : 'border-transparent text-gray-400 hover:text-gray-600'}`}
          >
            📋 Mode d'emploi
          </button>
          <button
            onClick={() => setTab('scientific')}
            className={`pb-2 text-sm font-semibold border-b-2 transition ${tab === 'scientific' ? `border-current ${c.badge.split(' ')[1]}` : 'border-transparent text-gray-400 hover:text-gray-600'}`}
          >
            🔬 Ancrage scientifique
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto px-6 py-5 flex-1">
          {tab === 'howto' && (
            <div className="space-y-5">
              {g.howto.steps.map((step, i) => (
                <div key={i}>
                  <h3 className="font-semibold text-gray-800 mb-2">{i + 1}. {step.title}</h3>
                  <ul className="space-y-1">
                    {step.items.map((item, j) => (
                      <li key={j} className="flex gap-2 text-sm text-gray-600">
                        <span className="text-gray-400 mt-0.5">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {g.howto.tip && (
                <div className={`rounded-xl p-4 ${c.light} border ${c.border}`}>
                  <p className="text-sm text-gray-700"><strong>💡 Conseil pédagogique :</strong> {g.howto.tip}</p>
                </div>
              )}
            </div>
          )}

          {tab === 'scientific' && (
            <div className="space-y-5">
              <p className="text-sm text-gray-700 italic border-l-4 border-gray-300 pl-4">{g.scientific.summary}</p>
              {g.scientific.references.map((ref, i) => (
                <div key={i} className={`rounded-xl p-4 ${c.light} border ${c.border}`}>
                  <p className="text-xs font-semibold text-gray-500 mb-1">{ref.citation}</p>
                  <p className="text-sm text-gray-700">« {ref.content} »</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
          <a
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-lg text-white text-sm font-semibold transition ${c.btn}`}
          >
            Ouvrir {app.name} →
          </a>
        </div>
      </div>
    </div>
  );
}

function AppCard({ app, onGuide }: { app: AppItem; onGuide: (app: AppItem) => void }) {
  const c = colorMap[app.color];
  const available = app.status === 'disponible';

  return (
    <div className={`flex flex-col rounded-2xl border-2 ${c.border} ${c.bg} p-6 shadow-sm transition hover:shadow-md`}>
      <div className="flex items-start justify-between mb-3">
        <span className="text-4xl">{app.emoji}</span>
        {app.category && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${c.badge}`}>
            {app.category}
          </span>
        )}
      </div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">{app.name}</h2>
      <p className="text-gray-600 text-sm flex-1 mb-3">{app.description}</p>
      {app.browserNote && (
        <div className="flex items-start gap-2 mb-4 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
          <span className="text-base leading-none mt-0.5">🌐</span>
          <p className="text-xs text-blue-700">{app.browserNote}</p>
        </div>
      )}
      <div className="flex gap-2">
        <a
          href={available ? app.url : undefined}
          target={available ? '_blank' : undefined}
          rel="noopener noreferrer"
          className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold transition ${c.btn} ${!available ? 'pointer-events-none' : ''}`}
        >
          {available ? "Ouvrir →" : 'Bientôt disponible'}
        </a>
        {app.guide && (
          <button
            onClick={() => onGuide(app)}
            className="px-3 py-2 rounded-lg border-2 border-current text-sm font-semibold transition hover:opacity-80"
            style={{ color: 'inherit' }}
            title="Guide d'utilisation"
          >
            📖
          </button>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [guideApp, setGuideApp] = useState<AppItem | null>(null);

  const appItems    = apps.filter(a => (a.section ?? 'applications') === 'applications');
  const sensiItems  = apps.filter(a => a.section === 'sensibilisation');
  const available   = appItems.filter(a => a.status === 'disponible');
  const coming      = appItems.filter(a => a.status === 'bientôt');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {guideApp && <GuideModal app={guideApp} onClose={() => setGuideApp(null)} />}

      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center gap-5">
          <img
            src="https://raw.githubusercontent.com/jfb4plai/Picto-lecture/main/public/nouveau_logo_plai_(1).jpg"
            alt="Logo PLAI"
            className="h-14 object-contain"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">
              Applications Pédagogiques PLAI
            </h1>
            <p className="text-sm text-gray-500">
              Pôle Liégeois d'Accompagnement vers une École Inclusive
            </p>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-6 py-10">

        {/* ── Sensibilisation ── */}
        {sensiItems.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
              <h2 className="text-lg font-semibold text-gray-700">Sensibilisation ({sensiItems.length})</h2>
            </div>
            <p className="text-sm text-gray-500 mb-5 pl-5">
              Outils de mise en situation pour comprendre de l'intérieur les défis des élèves à besoins spécifiques.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sensiItems.map(app => <AppCard key={app.id} app={app} onGuide={setGuideApp} />)}
            </div>
          </section>
        )}

        {/* ── Applications disponibles ── */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-gray-700 mb-5 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
            Applications disponibles ({available.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {available.map(app => <AppCard key={app.id} app={app} onGuide={setGuideApp} />)}
          </div>
        </section>

        {coming.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-gray-400 mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gray-300 inline-block"></span>
              Prochainement ({coming.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {coming.map(app => <AppCard key={app.id} app={app} onGuide={setGuideApp} />)}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-200 bg-white py-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} PLAI — Pôle Liégeois d'Accompagnement vers une École Inclusive
      </footer>
    </div>
  );
}
