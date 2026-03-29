export default function Navbar() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center gap-5">
        <div className="flex items-center gap-5">
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
      </div>
    </header>
  );
}
