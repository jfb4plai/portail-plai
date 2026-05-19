import { useState } from 'react';

const refs = [
  {
    id: 'ensl-05383435',
    citation: 'Fenoglio, P. (2024). L\'éducation inclusive et numérique : quelles convergences ? ENS Lyon.',
    content: '« Les outils numériques sont un des leviers à une inclusion efficiente. Ils nécessitent toutefois des pratiques renouvelées de la part des enseignants, donc une formation continue redéployée. »',
  },
  {
    id: 'hal-04775055',
    citation: 'Lignée, P. & Pasquier, F. (2024). Formation au numérique et aux pratiques pédagogiques inclusives : vers un enrichissement réciproque ?',
    content: '« Ces gestes professionnels offrent à l\'ensemble des enseignants, grâce aux exemples d\'outils numériques, une proposition d\'opérationnalité inclusive de l\'enseignement-apprentissage. »',
  },
];

export default function Hero() {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-teal-100" style={{ backgroundColor: '#f0fdf9' }}>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <p className="text-2xl font-semibold text-gray-800 leading-snug mb-2">
          Des outils numériques inclusifs, construits{' '}
          <span style={{ color: '#0a9370' }}>avec</span> les enseignants —{' '}
          <button
            onClick={() => setOpen(o => !o)}
            title="Voir les références scientifiques"
            style={{
              color: '#0a9370',
              fontWeight: 600,
              fontSize: 'inherit',
              textDecoration: 'underline',
              textDecorationStyle: 'dotted',
              textUnderlineOffset: '3px',
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
            }}
          >
            avec ancrage scientifique{open ? ' ▲' : ' ▼'}
          </button>
        </p>
        <p className="text-sm text-gray-500 max-w-2xl mb-3">
          Pôle Territorial de la Ville de Liège — Fédération Wallonie-Bruxelles.{' '}
          Chaque outil est ancré dans la recherche scientifique francophone (corpus RISS, 522&nbsp;627 articles).
        </p>

        {open && (
          <div className="mt-3 space-y-3 max-w-2xl">
            {refs.map(r => (
              <div key={r.id} className="rounded-xl border border-teal-200 bg-white px-4 py-3">
                <p className="text-xs font-semibold text-gray-500 mb-1">
                  {r.citation}{' '}
                  <span className="font-normal text-teal-600">[RISS : {r.id}]</span>
                </p>
                <p className="text-sm text-gray-700 italic">{r.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
