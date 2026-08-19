// ===== Portail =====

export type AppStatus = 'disponible' | 'bientôt' | 'en-développement';
export type AppSection = 'applications' | 'sensibilisation' | 'claude' | 'claude-code' | 'utilitaires' | 'ia';

export type Reference = { id?: string; citation: string; content: string };
export type StepGroup = { title: string; items: string[] };

export type GuideContent = {
  scientific: { summary: string; references: Reference[] };
  howto: { steps: StepGroup[]; tip?: string };
};

export type Audience = 'élève' | 'enseignant' | 'enseignant + élève';

export type AppItem = {
  id: string;
  name: string;
  description: string;
  url: string;
  emoji: string;
  category: string;
  audience?: Audience;
  status: AppStatus;
  color: string;
  section?: AppSection;
  browserNote?: string;
  devBanner?: boolean;   // affiche le bandeau "En développement" sur la vignette
  isNew?: boolean;       // affiche le badge "Nouveau" en orange PLAI
  gated?: boolean;       // fait partie du système de verrouillage par école
  unlockHint?: string;   // message affiché tant que l'app est verrouillée pour l'école courante
  guide?: GuideContent;
};

export type ColorScheme = {
  bg: string;
  border: string;
  badge: string;
  btn: string;
  light: string;
};

// ===== Espace Parents =====

export type ParentFicheBlock = {
  clair: string;
  falc: string;
};

export type ParentFicheSource = {
  id: string;
  citation: string;
  content: string;
};

export type ParentFiche = {
  id: string;
  emoji: string;
  titre: string;
  cEstQuoi: ParentFicheBlock;
  ceQueCaChange: ParentFicheBlock;
  commentAider: ParentFicheBlock;
  sources: ParentFicheSource[];
};

export type GuideSection = {
  id: string;
  titre: string;
  clair: string;
  falc: string;
};

export type SourceOfficielle = {
  citation: string;
  url: string;
  note?: string;
};

export type GuideDroits = {
  sections: GuideSection[];
  sources: SourceOfficielle[];
};

export type DecodeurResponse = {
  clair: string;
  falc: string;
};

export type LangueDecodeur = 'turc' | 'arabe' | 'albanais' | 'ukrainien';

export type AtelierParent = {
  id: string;
  emoji: string;
  titre: string;
  description: string;
  url: string;
  questions: {
    clair: string;
    falc: string;
  };
};
