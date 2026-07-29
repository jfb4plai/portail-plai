import { Link } from 'react-router-dom';
import parentsFiches from '../data/parentsFiches';
import TipTraductionNavigateur from '../components/TipTraductionNavigateur';

export default function ParentsHome() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-[#134e4a] mb-2">Comprendre et accompagner votre enfant</h1>
      <p className="text-lg text-gray-600 mb-8">
        9 fiches claires, vérifiées à partir de la recherche scientifique francophone (corpus RISS).
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {parentsFiches.map(fiche => (
          <Link
            key={fiche.id}
            to={`/parents/${fiche.id}`}
            className="flex items-center gap-3 bg-[#f4fbf8] border border-[#d7ede4] rounded-xl px-5 py-4 text-lg font-semibold text-[#134e4a] hover:bg-[#e9f6f1] transition"
          >
            <span className="text-2xl">{fiche.emoji}</span>
            {fiche.titre}
          </Link>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          to="/parents/droits"
          className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-5 py-4 text-lg font-semibold text-amber-900 hover:bg-amber-100 transition"
        >
          <span className="text-2xl">⚖️</span>
          Le guide des droits
        </Link>
        <Link
          to="/parents/decodeur"
          className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-xl px-5 py-4 text-lg font-semibold text-blue-900 hover:bg-blue-100 transition"
        >
          <span className="text-2xl">🔍</span>
          Le Décodeur PIA / bulletin
        </Link>
      </div>

      <TipTraductionNavigateur />
    </div>
  );
}
