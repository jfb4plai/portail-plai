import type { AppItem } from '../types';

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
    id: 'glissement',
    name: 'Glissement',
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
            citation: "Lakel, A. (2025). Ne dites plus LLM : Larges Discours Models (LDM) et Agent Discursif Artificiel (ADA) ? RISS : hal-05421232.",
            content: "Introduit le concept de « dette cognitive » : le déficit cumulatif en capacités de raisonnement critique résultant de la délégation systématique des tâches cognitives à l'IA. C'est exactement le mécanisme que Glissement fait vivre.",
          },
          {
            citation: "Romero, M. et al. (2023). Enseigner et apprendre à l'ère de l'intelligence artificielle. RISS : hal-04013223.",
            content: "Ouvrage collectif avec contributeurs FWB (Patricia Corieri, Julie Henry). Cadre de référence pour penser l'agentivité face aux outils IA en contexte éducatif francophone.",
          },
          {
            citation: "Tricot, A. (1998). Charge cognitive et apprentissage. Revue de Psychologie de l'Éducation, 3, 37–64. RISS : hal-04180240.",
            content: "La répétition d'une tâche déléguée réduit l'activation cérébrale associée. Cet effet est réversible si la pratique reprend, mais le délai de récupération augmente avec la durée d'interruption.",
          },
          {
            citation: "Sparrow, B., Liu, J. & Wegner, D. M. (2011). Google effects on memory. Science, 333(6043). RISS : cité dans le corpus.",
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
            citation: "Calone, A. & Lafontaine, D. (2023). L'impact des différents types de feedbacks en contexte de classe. RISS : hal-04646895.",
            content: "Le feedback n'opère que s'il est orienté vers la tâche et le processus — pas vers la note ou la personne. Cette distinction, que La Boucle fait vivre dans la Remarque 2, est centrale à la littératie à la rétroaction.",
          },
          {
            citation: "Altinsoy, M. (2025). Les évaluations scolaires comme levier d'autorégulation et de développement des compétences métacognitives au cycle 3. RISS : dumas-05324645.",
            content: "L'évaluation formative opère quand l'élève dispose de critères transparents et peut s'autoévaluer avant soumission. C'est exactement la compétence que construit Alex dans le chemin vers la Fin C.",
          },
          {
            citation: "Brault Foisy, L.-M. (2022). Mieux comprendre les mécanismes cérébraux d'apprentissage pour faciliter la réussite scolaire. RISS : W4225545444.",
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
            citation: "Loretan, C., Weiss, L. & Müller, A. (2018). Quelle est la place du raisonnement semi-quantitatif dans l'enseignement des sciences ? Revue de mathématiques.",
            content: "Les puissances de 10 et la notation scientifique sont enseignées mais peu de séquences concrètes font appel au raisonnement semi-quantitatif. Un outillage visuel explicite est nécessaire.",
          },
          {
            citation: "Croset, M.-C. (2005). Modélisation didactique et informatique des connaissances des élèves en algèbre. HAL.",
            content: "La disparition du discours sur la nécessité de l'algèbre est à l'origine des difficultés rencontrées lors de l'introduction des règles du calcul littéral, dont les puissances.",
          },
          {
            citation: "Varinot, A. (2012). La médiation pédagogique au service de la métacognition. DUMAS.",
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
  {
    id: 'grammaire-3d',
    name: 'Grammaire 3D Interactive',
    description: "Analyse de phrase en Grammaire 3D (FWB) : assiettes colorées (fonctions), formes géométriques (nature), pictogrammes ARASAAC (sémantique). Manipulations syntaxiques sur TBI. Images personnalisées.",
    url: 'https://grammaire-3d-plai.vercel.app',
    emoji: '🍽️',
    category: 'Français',
    status: 'disponible',
    color: 'purple',
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
            citation: "Renault, K. (2023). Rôle et place de l'abaque dans l'enseignement de la numération en cycle 2. DUMAS.",
            content: "L'abaque sans affichage explicite des relations entre unités crée des malentendus. La relation multiplicative doit être rendue visible dans chaque cellule.",
          },
          {
            citation: "Roditi, E. (2002). La multiplication des nombres décimaux. HAL.",
            content: "Il importe de comprendre la règle du déplacement de la virgule — pas seulement l'appliquer mécaniquement. Distinguer ×10, ×100 et ×1000 selon les catégories d'unités.",
          },
          {
            citation: "Andreucci, C. & Mercier, A. (2005). Le volume : une approche didactique d'un problème récurrent. HAL.",
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
            citation: "McMullin, S. & Masson, S. (2023). La récupération en mémoire et l'espacement. Neuroeducation.",
            content: "La récupération active en mémoire (testing effect) renforce durablement les apprentissages. Chaque tentative de rappel, même infructueuse, contribue à consolider la trace mémorielle — ce qui justifie le recours régulier au quiz en classe.",
          },
          {
            citation: "Keller, J. (2020). Évaluation d'une stratégie d'apprentissage par récupération chez des adolescents avec TDAH.",
            content: "L'apprentissage par récupération (quiz, tests d'entraînement) produit de meilleurs résultats en mémorisation à long terme que l'apprentissage passif, y compris pour les élèves présentant un TDAH — ce qui en fait un outil inclusif particulièrement pertinent.",
          },
          {
            citation: "Romeyer-Dherbey, E. (2025). L'impact des feedbacks sur la motivation des élèves.",
            content: "Les rétroactions immédiates favorisent l'apprentissage, notamment chez les élèves débutants. Un feedback différé n'a pas d'effet notable comparable — ce qui justifie la correction instantanée proposée par PLAI-Quiz.",
          },
          {
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
];

export default apps;
