import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  return (
    <header className="shadow-md" style={{ backgroundColor: '#134e4a' }}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src="https://raw.githubusercontent.com/jfb4plai/Picto-lecture/main/public/nouveau_logo_plai_(1).jpg"
            alt="Logo PLAI"
            className="h-12 object-contain rounded-sm flex-shrink-0"
          />
          <div>
            <Link to="/" className="text-xl font-bold text-white leading-tight hover:underline">
              Applications Pédagogiques PLAI
            </Link>
            <p className="text-sm text-white/70">
              Pôle Liégeois d'Accompagnement vers une École Inclusive
            </p>
          </div>
        </div>
        <nav className="flex gap-4">
          <a
            href="/#guides-claude"
            className="text-sm font-medium px-3 py-1.5 rounded-md transition-colors text-white/80 hover:text-white hover:bg-white/10"
          >
            Guides
          </a>
          <Link
            to="/voixactif"
            className={`text-sm font-medium px-3 py-1.5 rounded-md transition-colors ${
              location.pathname === '/voixactif'
                ? 'bg-white/20 text-white'
                : 'text-white/80 hover:text-white hover:bg-white/10'
            }`}
          >
            VoixActif
          </Link>
        </nav>
      </div>
    </header>
  );
}
