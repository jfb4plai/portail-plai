import type { GuideDroits } from '../types';

export const AVERTISSEMENT_DROITS =
  "Ce guide n'est pas un conseil juridique personnalisé. Les textes cités peuvent évoluer (circulaires mises à jour chaque année) — vérifiez la version en vigueur auprès de votre école ou du Pôle territorial. La voie du dialogue avec la direction et le CPMS reste toujours à privilégier, même quand un recours formel est possible : c'est ce qui sert le mieux votre enfant.";

const guideDroits: GuideDroits = {
  sections: [
    {
      id: 'cadre-international',
      titre: "Le droit à l'éducation inclusive",
      clair:
        "La Convention relative aux droits des personnes handicapées, adoptée par l'ONU et ratifiée par la Belgique, reconnaît explicitement le droit de tout enfant à l'éducation. Son article 24 précise que les États doivent faire en sorte que le système éducatif « pourvoie à l'insertion scolaire à tous les niveaux ». Ce n'est pas une option laissée à la discrétion de chaque école : c'est un engagement international que la Belgique a signé.",
      falc:
        "L'ONU a écrit un texte sur les droits des personnes handicapées. La Belgique a signé ce texte. Ce texte dit que chaque enfant a droit à l'école. Il dit aussi que l'école doit accueillir tous les enfants. Ce n'est pas un choix de l'école. C'est une règle internationale.",
    },
    {
      id: 'cadre-fwb',
      titre: 'Ce que dit la loi en Fédération Wallonie-Bruxelles',
      clair:
        "En Fédération Wallonie-Bruxelles, le décret du 7 décembre 2017 met ce droit en pratique. Il définit un « aménagement raisonnable » comme une mesure adaptée aux besoins concrets de votre enfant (article 2), sauf si elle représente une charge disproportionnée pour l'école. Tout élève de l'enseignement ordinaire qui présente des besoins spécifiques a le droit d'en bénéficier, tant que sa situation ne rend pas indispensable un enseignement spécialisé (article 102/1 §1). Quand l'aménagement est pédagogique, il doit s'inscrire dans un Plan Individualisé d'Apprentissage, ou PIA (article 102/1 §6) — un document qui précise concrètement ce qui est mis en place pour votre enfant.",
      falc:
        "En Fédération Wallonie-Bruxelles, une loi de 2017 explique comment appliquer ce droit. Un « aménagement raisonnable » est une aide adaptée à votre enfant. L'école doit le mettre en place. Sauf si c'est vraiment trop difficile pour elle. Chaque élève avec des besoins spécifiques a droit à cette aide. Le PIA est un document qui écrit cette aide noir sur blanc.",
    },
    {
      id: 'qui-fait-quoi',
      titre: 'Qui fait quoi',
      clair:
        "La direction de l'école prend la décision finale sur les aménagements matériels et organisationnels. Le Centre PMS (CPMS) a une vision plus large et suit votre enfant sur la durée — il peut aussi jouer un rôle d'interface entre vous et l'école en cas de désaccord. Le Pôle territorial est une équipe pluridisciplinaire (enseignants, éducateurs, logopèdes, kinésithérapeutes...) qui accompagne l'école — et donc indirectement votre enfant — pour que les aménagements se mettent en place concrètement, sans obliger l'enfant à quitter l'enseignement ordinaire.",
      falc:
        "La direction de l'école décide des aménagements matériels et d'organisation. Le CPMS suit votre enfant sur plusieurs années. Il peut aider si vous n'êtes pas d'accord avec l'école. Le Pôle territorial est une équipe de plusieurs métiers. Elle aide l'école à mettre en place les aménagements. Votre enfant peut rester dans une école ordinaire.",
    },
    {
      id: 'comment-demander',
      titre: 'Comment demander un aménagement',
      clair:
        "La demande passe par une réunion de concertation, organisée par la direction de l'école, réunissant le conseil de classe (ou ses représentants), le CPMS, et vous en tant que parent (ou votre enfant lui-même s'il est majeur). Cette réunion aboutit à un protocole d'aménagements raisonnables, qui décrit concrètement ce qui sera mis en place. Le Pôle territorial peut accompagner cette étape si l'école le sollicite.",
      falc:
        "Vous pouvez demander une réunion. La direction organise cette réunion. Le CPMS et l'école y participent. Vous participez aussi. Cette réunion écrit un document. Ce document dit ce que l'école va faire pour votre enfant.",
    },
    {
      id: 'en-cas-de-desaccord',
      titre: 'En cas de désaccord',
      clair:
        "Avant tout recours formel, le dialogue direct avec la direction et le CPMS reste la meilleure option — même quand la loi vous donne raison, une solution négociée sert mieux votre enfant qu'une procédure longue. Si le dialogue n'aboutit vraiment pas, une conciliation peut être demandée dans le mois qui suit la demande initiale. Si elle échoue à son tour, un recours est possible devant la Commission de l'enseignement obligatoire inclusif, dans les 10 jours ouvrables suivant la décision de conciliation. La Commission doit statuer dans les 30 jours calendrier (ou au plus tard le 31 juillet si le recours est introduit après le 1er juin). Une décision favorable de la Commission s'impose à l'école.",
      falc:
        "D'abord, parlez avec la direction et le CPMS. C'est souvent la meilleure solution pour votre enfant. Si ça ne marche pas, vous pouvez demander une conciliation. Vous avez un mois pour le faire. Si ça ne marche toujours pas, vous pouvez faire un recours. Vous avez 10 jours ouvrables pour le faire. Une commission doit répondre dans les 30 jours. Si la commission vous donne raison, l'école doit suivre sa décision.",
    },
  ],
  sources: [
    {
      citation: 'Convention relative aux droits des personnes handicapées (ONU), article 24',
      url: 'https://www.un.org/development/desa/disabilities-fr/la-convention-en-bref-2/texte-integral-de-la-convention-relative-aux-droits-des-personnes-handicapees-23.html',
    },
    {
      citation:
        "Décret du 7 décembre 2017 relatif à l'accueil, à l'accompagnement et au maintien dans l'enseignement ordinaire fondamental et secondaire des élèves présentant des besoins spécifiques — articles 2, 102/1, 102/2",
      url: 'https://etaamb.openjustice.be/fr/decret-du-07-decembre-2017_n2018010181.html',
      note: 'Vérifier la version consolidée en vigueur — un décret peut être modifié par des textes ultérieurs.',
    },
    {
      citation: "Les pôles territoriaux pour une école inclusive — Pacte pour un Enseignement d'excellence",
      url: 'https://pactepourunenseignementdexcellence.cfwb.be/mesures/des-poles-territoriaux-pour-une-ecole-inclusive/',
    },
  ],
};

export default guideDroits;
