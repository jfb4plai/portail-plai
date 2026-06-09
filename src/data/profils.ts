// src/data/profils.ts

export type Profil = {
  id: string;
  label: string;
  champsStructures: ChampStructure[];
  champLibreLabel: string;
  champLibrePlaceholder: string;
  modele: 'haiku' | 'sonnet';
};

export type ChampStructure = {
  id: string;
  label: string;
  options: string[];
};

export const PROFILS: Profil[] = [
  {
    id: 'retroaction',
    label: 'Rétroaction élève',
    champsStructures: [
      {
        id: 'niveau',
        label: 'Niveau',
        options: ['1re', '2e', '3e', '4e', '5e', '6e'],
      },
      {
        id: 'ton',
        label: 'Ton',
        options: ['encourageant', 'neutre', 'exigeant'],
      },
    ],
    champLibreLabel: 'Ce que je veux que l\'élève retienne',
    champLibrePlaceholder: 'Ex. : il a bien progressé sur la structure mais doit revoir les accords...',
    modele: 'haiku',
  },
  {
    id: 'consigne',
    label: 'Consigne simplifiée',
    champsStructures: [
      {
        id: 'profil_eleve',
        label: 'Profil élève',
        options: ['DYS', 'TDAH', 'DYS + TDAH', 'difficulté générale'],
      },
      {
        id: 'longueur',
        label: 'Longueur cible',
        options: ['3 phrases max', '5 phrases max', '7 phrases max'],
      },
    ],
    champLibreLabel: 'Contexte de l\'activité',
    champLibrePlaceholder: 'Ex. : exercice de grammaire sur les accords du participe passé, niveau 4e...',
    modele: 'haiku',
  },
  {
    id: 'parents',
    label: 'Communication parents',
    champsStructures: [
      {
        id: 'registre',
        label: 'Registre',
        options: ['formel', 'accessible'],
      },
      {
        id: 'objet',
        label: 'Objet',
        options: ['progrès', 'difficulté', 'rendez-vous'],
      },
    ],
    champLibreLabel: 'Ce que je veux dire en substance',
    champLibrePlaceholder: 'Ex. : l\'élève a rattrapé son retard en lecture mais reste fragile à l\'écrit...',
    modele: 'haiku',
  },
  {
    id: 'synthese',
    label: 'Synthèse orale → écrit',
    champsStructures: [
      {
        id: 'type_contenu',
        label: 'Type de contenu',
        options: ['cours', 'réunion', 'observation élève'],
      },
    ],
    champLibreLabel: 'Points essentiels à conserver',
    champLibrePlaceholder: 'Ex. : différenciation, besoins spécifiques de l\'élève X, stratégies testées...',
    modele: 'haiku',
  },
];
