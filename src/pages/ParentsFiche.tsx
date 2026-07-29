import { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import parentsFiches, { BANDEAU_INDIVIDUALISATION, FALC_DISCLAIMER } from '../data/parentsFiches';
import TipTraductionNavigateur from '../components/TipTraductionNavigateur';

export default function ParentsFiche() {
  const { troubleId } = useParams<{ troubleId: string }>();
  const [falc, setFalc] = useState(false);

  const fiche = parentsFiches.find(f => f.id === troubleId);
  if (!fiche) return <Navigate to="/parents" replace />;

  const blocks = [
    { label: '1. C’est quoi, en clair', block: fiche.cEstQuoi },
    { label: '2. Ce que ça change pour votre enfant', block: fiche.ceQueCaChange },
    { label: '3. Comment aider au quotidien', block: fiche.commentAider },
  ];

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between gap-4 mb-4">
        <Link to="/parents" className="text-sm font-medium text-[#134e4a] hover:underline">
          ← Espace Parents
        </Link>
        <button
          onClick={() => setFalc(v => !v)}
          aria-pressed={falc}
          className={`text-sm font-semibold px-4 py-2 rounded-full border transition ${
            falc ? 'bg-[#134e4a] text-white border-[#134e4a]' : 'bg-white text-[#134e4a] border-[#134e4a]'
          }`}
        >
          🔤 Version FALC {falc ? '(activée)' : ''}
        </button>
      </div>

      <h1 className="text-3xl font-bold text-[#134e4a] mb-3">
        {fiche.emoji} {fiche.titre}
      </h1>

      <div className="text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 mb-8">
        {BANDEAU_INDIVIDUALISATION}
      </div>

      {blocks.map(({ label, block }) => (
        <div key={label} className="mb-8">
          <div className="text-sm font-bold text-[#f97316] uppercase tracking-wide mb-2">{label}</div>
          <p className="text-lg leading-relaxed text-gray-800">{falc ? block.falc : block.clair}</p>
        </div>
      ))}

      <div className="border-t border-gray-200 pt-4 mt-8">
        <div className="text-xs text-gray-500 mb-2">{FALC_DISCLAIMER}</div>
        <div className="text-xs font-semibold text-gray-400 uppercase mb-1">Sources (corpus RISS)</div>
        <ul className="text-xs text-gray-500 space-y-1">
          {fiche.sources.map(s => (
            <li key={s.id}>{s.citation}</li>
          ))}
        </ul>
      </div>

      <TipTraductionNavigateur />
    </div>
  );
}
