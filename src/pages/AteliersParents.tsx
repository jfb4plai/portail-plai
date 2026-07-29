import { useState } from 'react';
import { Link } from 'react-router-dom';
import ateliersParents, { INTRO_ATELIERS } from '../data/ateliersParents';
import { BANDEAU_INDIVIDUALISATION } from '../data/parentsFiches';
import TipTraductionNavigateur from '../components/TipTraductionNavigateur';

export default function AteliersParents() {
  const [falc, setFalc] = useState(false);

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between gap-4 mb-4">
        <Link to="/parents" className="text-sm font-medium text-[#134e4a] hover:underline">
          ← Espace Parents
        </Link>
        <button
          onClick={() => setFalc((v) => !v)}
          aria-pressed={falc}
          className={`text-sm font-semibold px-4 py-2 rounded-full border transition ${
            falc ? 'bg-[#134e4a] text-white border-[#134e4a]' : 'bg-white text-[#134e4a] border-[#134e4a]'
          }`}
        >
          🔤 Version FALC {falc ? '(activée)' : ''}
        </button>
      </div>

      <h1 className="text-3xl font-bold text-[#134e4a] mb-3">🎭 Les ateliers</h1>

      <div className="text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 mb-6">
        {BANDEAU_INDIVIDUALISATION}
      </div>

      <p className="text-lg leading-relaxed text-gray-800 mb-10">
        {falc ? INTRO_ATELIERS.falc : INTRO_ATELIERS.clair}
      </p>

      {ateliersParents.map((atelier) => (
        <div key={atelier.id} className="mb-10 border border-gray-200 rounded-xl p-5">
          <h2 className="text-xl font-bold text-[#134e4a] mb-2">
            {atelier.emoji} {atelier.titre}
          </h2>
          <p className="text-base text-gray-700 mb-4">{atelier.description}</p>
          <a
            href={atelier.url}
            target="_blank"
            rel="noreferrer"
            className="inline-block rounded-lg px-5 py-2.5 text-white font-semibold text-sm mb-4"
            style={{ backgroundColor: '#134e4a' }}
          >
            Essayer l'atelier ↗
          </a>
          <div className="text-sm font-bold text-[#f97316] uppercase tracking-wide mb-2 mt-4">
            Après l'avoir essayé
          </div>
          <p className="text-lg leading-relaxed text-gray-800">
            {falc ? atelier.questions.falc : atelier.questions.clair}
          </p>
        </div>
      ))}

      <TipTraductionNavigateur />
    </div>
  );
}
