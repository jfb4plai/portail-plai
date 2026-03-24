import './index.css';

type AppStatus = 'disponible' | 'bientôt';

type AppItem = {
  id: string;
  name: string;
  description: string;
  url: string;
  emoji: string;
  category: string;
  status: AppStatus;
  color: string;
};

const apps: AppItem[] = [
  {
    id: 'flashfwb',
    name: 'Flash FWB',
    description: 'Flashcards interactives pour la mémorisation. Création de decks par l\'enseignant, apprentissage adaptatif pour l\'élève.',
    url: 'https://flashfwb.vercel.app',
    emoji: '🃏',
    category: 'Mémorisation',
    status: 'disponible',
    color: 'blue',
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
  },
  {
    id: 'droite-graduee',
    name: 'Droite Graduée',
    description: 'Activités interactives sur la droite graduée. Estimation, apprentissage multi-droites et mix. Configurations sauvegardées par l\'enseignant.',
    url: 'https://droite-graduee.vercel.app',
    emoji: '📏',
    category: 'Numération',
    status: 'disponible',
    color: 'pink',
  },
];

const colorMap: Record<string, { bg: string; border: string; badge: string; btn: string }> = {
  blue:   { bg: 'bg-blue-50',   border: 'border-blue-200',   badge: 'bg-blue-100 text-blue-700',   btn: 'bg-blue-600 hover:bg-blue-700' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', badge: 'bg-purple-100 text-purple-700', btn: 'bg-purple-600 hover:bg-purple-700' },
  green:  { bg: 'bg-green-50',  border: 'border-green-200',  badge: 'bg-green-100 text-green-700',  btn: 'bg-green-600 hover:bg-green-700' },
  gray:   { bg: 'bg-gray-50',   border: 'border-gray-200',   badge: 'bg-gray-100 text-gray-500',   btn: 'bg-gray-400 cursor-not-allowed' },
  pink:   { bg: 'bg-pink-50',   border: 'border-pink-200',   badge: 'bg-pink-100 text-pink-700',   btn: 'bg-pink-600 hover:bg-pink-700' },
};

function AppCard({ app }: { app: AppItem }) {
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
      <p className="text-gray-600 text-sm flex-1 mb-5">{app.description}</p>
      <a
        href={available ? app.url : undefined}
        target={available ? '_blank' : undefined}
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold transition ${c.btn} ${!available ? 'pointer-events-none' : ''}`}
      >
        {available ? 'Ouvrir l\'application →' : 'Bientôt disponible'}
      </a>
    </div>
  );
}

export default function App() {
  const available = apps.filter(a => a.status === 'disponible');
  const coming = apps.filter(a => a.status === 'bientôt');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
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
        {/* Applications disponibles */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-gray-700 mb-5 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
            Applications disponibles ({available.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {available.map(app => <AppCard key={app.id} app={app} />)}
          </div>
        </section>

        {/* À venir */}
        {coming.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-gray-400 mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gray-300 inline-block"></span>
              Prochainement ({coming.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {coming.map(app => <AppCard key={app.id} app={app} />)}
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
