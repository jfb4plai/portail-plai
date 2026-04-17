// ===== Portail =====

export type AppStatus = 'disponible' | 'bientôt' | 'en-développement';
export type AppSection = 'applications' | 'sensibilisation';

export type Reference = { citation: string; content: string };
export type StepGroup = { title: string; items: string[] };

export type GuideContent = {
  scientific: { summary: string; references: Reference[] };
  howto: { steps: StepGroup[]; tip?: string };
};

export type AppItem = {
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
  devBanner?: boolean;   // affiche le bandeau "En développement" sur la vignette
  guide?: GuideContent;
};

export type ColorScheme = {
  bg: string;
  border: string;
  badge: string;
  btn: string;
  light: string;
};
