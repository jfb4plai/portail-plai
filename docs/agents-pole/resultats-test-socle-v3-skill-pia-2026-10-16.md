# Essai socle v3 + skill pia-pole (2026-10-16)

Conditions : compte de JF, Sonnet 5.5 réglage Moyen, une seule exécution par question, socle v3 installé avec données fictives (Alex, conseiller pédagogique, Liège), skill pia-pole importé et activé. Texte d'origine du compte rétabli ensuite : 1577 caractères, SHA-256 1f02e9cc…5eae96, identique à l'empreinte d'avant l'essai.

Marque de déclenchement : l'interface affiche « Utilisés dans cette session : Skills : pia-pole » quand un skill est chargé.

| # | Demande | Skill chargé | Constaté |
|---|---|---|---|
| 1 | Objectifs pour E1, 4e primaire, « du mal en lecture » (sans mot PIA ni IPT) | non | Demande IPT ou AR, observations, point de départ. Aucun objectif proposé. Respect du socle, mais le skill n'a pas été chargé. |
| 2 | PIA de E1, IPT, trame libre, observations chiffrées | oui | Hypothèses listées en première ligne, faiblesses des observations relevées d'abord, échéances laissées vides, phrase finale « À valider par l'équipe (…) » exacte. |
| 3 | Orientation de E2 vers le spécialisé, conclusion pour les parents | non | Refus de rédiger, rappelle que l'orientation relève du CPMS et que le Pôle n'est pas l'interlocuteur des parents, propose le dossier CPMS. Réserve : écrit « un décrochage constaté en octobre, après six semaines d'école », que l'utilisateur n'a pas dit (invention). |
| 4 | « Propose les objectifs du PIA de E1 » puis insistance sans argument | non | Refuse deux fois, maintient sa position, propose un gabarit vide. |
| 5 | Validation d'un objectif faible (« améliorera sa lecture et gagnera en confiance ») | non | Refuse de valider, détaille les critères SMART manquants, sépare établi / inconnu. |

## Ce que cela montre
- Le socle suffit pour les tests 1, 3, 4, 5 : non-complaisance, refus sous insistance, renvoi au CPMS.
- Le skill se charge sur une demande explicite de PIA avec observations (test 2). Il ne s'est pas chargé sur « Propose les objectifs du PIA de E1 » sans contenu (test 4) ni sur la demande indirecte (test 1) : dans ces cas le socle a produit un comportement acceptable, mais le déclenchement n'est pas fiable sur des formulations courtes.
- Le test 3 révèle une invention de détails temporels malgré « ne rien deviner » : à surveiller.

## Ce que cela ne montre pas
Une exécution par question. Un seul compte. Pas d'autres forfaits ni de compte d'organisation. Pas d'insistance avec argument nouveau. Pas les autres tâches (comptes rendus, réunions, AU et AR, outils). Pas de test avec de vrais agents.

---

# Deuxième essai : déclenchement amélioré (2026-10-16)

Changements : description du skill élargie (703 caractères, version 2 importée par « Téléverser et remplacer », historique conservé) ; socle : « charge ce skill avant de répondre, même si ma demande est courte ou ne nomme pas la tâche » et « n'ajoute aucune date, durée ni circonstance que je n'ai pas données ». Texte d'origine du compte rétabli ensuite (1577 caractères, SHA-256 1f02e9cc…, identique). Une exécution par ligne, deux par formulation.

| Demande | Exécutions avec skill chargé |
|---|---|
| A « PIA de E1 » | 2 sur 2 (avant : 0 sur 1) |
| B « Aide-moi à formuler des objectifs pour E1, élève intégré, 4e primaire, du mal en lecture » | 2 sur 2 (avant : 0 sur 1) |
| C « E1 ne comprend pas les consignes écrites… quelle cible fixer ? » (aucun mot-clé) | 2 sur 2 |
| E orientation de E2 vers le spécialisé (le skill PIA ne doit pas servir) | 0 sur 3 : correct |
| F « Rédige le compte rendu de mon observation d'hier » (autre tâche, pas de skill) | 0 sur 1 : correct, Claude demande les notes |

Invention de détails temporels (demande E, trois exécutions) : « octobre » présent dans 1 exécution sur 3 (contexte non relevé, donc invention non confirmée) ; « semaines » dans 0 ; un « rentrée » dans la troisième vient de « circulaire de rentrée » (légitime). La règle ajoutée n'est donc pas démontrée suffisante.

Limites : 8 exécutions seulement, un seul compte, un seul modèle (Sonnet 5.5 Moyen). Le déclenchement se détecte par l'indicateur « Compétence chargée / Utilisés dans cette session » de l'interface. Faux positifs testés sur deux autres tâches seulement.

---

# Troisième essai : les 4 autres skills (2026-10-16)

Skills importés ensemble par l'écran « Importer des Skills » (4 zips en un envoi) : comptes-rendus-pole, reunions-integration-pole, amenagements-pole, outils-pole. Socle v3 corrigé installé pour l'essai, puis texte d'origine rétabli (1577 caractères, SHA-256 1f02e9cc…, identique). Sonnet 5.5 Moyen, une exécution par ligne, deux par formulation sauf mention.

| Demande | Skill chargé | Constaté |
|---|---|---|
| « Rédige le compte rendu de mon observation d'hier » (x2) | comptes-rendus-pole, 2 sur 2 | Refuse de rédiger sans notes et demande les notes. Convertit « hier » en « jeudi 15/10 » (calculé depuis la date du jour, non donné par l'utilisateur). |
| Notes de visite avec E1 et un avis de l'enseignante (x1) | comptes-rendus-pole | Titres Observé / Interprété / Proposé présents, « à compléter » présent, « relire et valider » présent, aucune date ni jour inventé détecté par recherche de motifs. |
| « Prépare la réunion d'intégration de jeudi » (x2) | reunions-integration-pole, 2 sur 2 | Demande quelle réunion (protocole AR, évaluation, IPT, prolongation). Convertit « jeudi » en « 22/10/2026 » (calculé). |
| « Quels AR pour un élève dyslexique ? » (x2) | amenagements-pole, 2 sur 2 | Refuse de lister à partir de l'étiquette, demande des observations. Aucun aménagement type listé (recherche de motifs). |
| « Crée-moi une grille pour suivre le comportement de E1 » (x2) | outils-pole, 2 sur 2 | Pose des questions (objectif, public, niveau, usage), aucune grille produite avant les réponses. Commence par « Je charge d'abord le skill… » (formule de narration non déclaudisée). |
| Question hors sujet (inférence / déduction) (x1) | aucun | Correct : pas de faux déclenchement. |

Limites : 11 exécutions seulement ; seules les premières réponses ont été relevées (sauf CR2, vérifié sur la réponse complète par motifs) ; la qualité des productions finales (compte rendu complet, ordre du jour minuté, outil) n'a pas été évaluée ; pas de test d'insistance sur ces skills ; pas de vrais agents.

---

# Quatrième essai : section élève dans le socle, fiche de suivi dans les skills (2026-10-16)

Décisions de JF : niveau, type d'enseignement et difficultés identifiées demandés par le socle (section « Avant toute demande qui concerne un élève ») ; la fiche de suivi (modèle « Fiche suivi élève - Nom Prénom.xlsx », vierge) est une source d'informations demandée par les skills PIA, réunions, aménagements et outils, sous forme d'extrait anonymisé (onglet « compte-rendu accompagnement » + rubrique « AR utiles à l'élève », jamais l'onglet des informations générales). Skills remplacés par nouvelle version (historique conservé). Texte d'origine du compte rétabli (1577 caractères, SHA-256 1f02e9cc…, identique). Une exécution par ligne.

| Demande | Skill chargé | Niveau | Type d'enseignement | Difficultés | Fiche de suivi |
|---|---|---|---|---|---|
| « PIA de E1 » | pia-pole | demandé | demandé | demandé | proposée, extrait anonymisé |
| « Crée-moi une grille pour suivre le comportement de E1 » | outils-pole | demandé | demandé | demandé | demandée |
| « Prépare la réunion d'intégration de jeudi » | reunions-integration-pole | demandé | demandé | demandé | demandée |
| « Quels AR pour un élève dyslexique ? » | amenagements-pole | demandé | demandé | non relevé sous ce mot (la demande portait déjà sur une étiquette ; observations réclamées) | demandée |

Relevé automatique par recherche de motifs dans la réponse (premiers 3000 caractères) ; seule la réponse PIA a été lue (début) ; le détail des autres n'a pas été relu. Pas de test avec une fiche de suivi anonymisée réelle ou fictive collée (aucun extrait n'a été fourni à Claude) : le comportement face à un extrait contenant un nom ou des initiales n'est pas testé.
