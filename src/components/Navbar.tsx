export default function Navbar() {
  return (
    <header className="shadow-md" style={{ backgroundColor: '#134e4a' }}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
        <img
          src="https://raw.githubusercontent.com/jfb4plai/Picto-lecture/main/public/nouveau_logo_plai_(1).jpg"
          alt="Logo PLAI"
          className="h-12 object-contain rounded-sm flex-shrink-0"
        />
        <div>
          <h1 className="text-xl font-bold text-white leading-tight">
            Applications Pédagogiques PLAI
          </h1>
          <p className="text-sm text-white/70">
            Pôle Liégeois d'Accompagnement vers une École Inclusive
          </p>
        </div>
      </div>
    </header>
  );
}
