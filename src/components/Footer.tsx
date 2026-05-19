export default function Footer() {
  return (
    <footer className="mt-16" style={{ backgroundColor: '#134e4a' }}>
      <div className="max-w-6xl mx-auto px-6 py-8 text-white">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="font-bold text-lg">PLAI</p>
            <p className="text-white/75 text-sm">Pôle Liégeois d'Accompagnement vers une École Inclusive</p>
            <p className="text-white/50 text-xs mt-1">Pôle Territorial de la Ville de Liège — Fédération Wallonie-Bruxelles</p>
          </div>
          <p className="text-white/40 text-xs text-right">
            &copy; {new Date().getFullYear()} — Corpus RISS · 522&nbsp;627 articles scientifiques francophones
          </p>
        </div>
      </div>
    </footer>
  );
}
