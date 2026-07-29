import { useState } from 'react';
import { Link } from 'react-router-dom';
import guideDroits, { AVERTISSEMENT_DROITS } from '../data/guideDroits';
import { BANDEAU_INDIVIDUALISATION } from '../data/parentsFiches';
import TipTraductionNavigateur from '../components/TipTraductionNavigateur';

export default function GuideDroits() {
  const [falc, setFalc] = useState(false);

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

      <h1 className="text-3xl font-bold text-[#134e4a] mb-3">⚖️ Le guide des droits</h1>

      <div className="text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 mb-8">
        {BANDEAU_INDIVIDUALISATION}
      </div>

      {guideDroits.sections.map(section => (
        <div key={section.id} id={section.id} className="mb-8">
          <h2 className="text-xl font-bold text-[#134e4a] mb-2">{section.titre}</h2>
          <p className="text-lg leading-relaxed text-gray-800">{falc ? section.falc : section.clair}</p>
        </div>
      ))}

      <div className="text-sm text-amber-900 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-8">
        {AVERTISSEMENT_DROITS}
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="text-xs font-semibold text-gray-400 uppercase mb-1">Sources officielles</div>
        <ul className="text-xs text-gray-500 space-y-1">
          {guideDroits.sources.map(s => (
            <li key={s.url}>
              <a href={s.url} target="_blank" rel="noreferrer" className="underline hover:text-gray-700">
                {s.citation}
              </a>
              {s.note ? ` — ${s.note}` : ''}
            </li>
          ))}
        </ul>
      </div>

      <TipTraductionNavigateur />
    </div>
  );
}
