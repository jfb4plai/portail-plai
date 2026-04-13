import { useState } from 'react';
import type { AppItem, ColorScheme } from '../types';

const colorMap: Record<string, ColorScheme> = {
  blue:   { bg: 'bg-blue-50',   border: 'border-blue-200',   badge: 'bg-blue-100 text-blue-700',    btn: 'bg-blue-600 hover:bg-blue-700',    light: 'bg-blue-100' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', badge: 'bg-purple-100 text-purple-700', btn: 'bg-purple-600 hover:bg-purple-700', light: 'bg-purple-100' },
  green:  { bg: 'bg-green-50',  border: 'border-green-200',  badge: 'bg-green-100 text-green-700',   btn: 'bg-green-600 hover:bg-green-700',   light: 'bg-green-100' },
  gray:   { bg: 'bg-gray-50',   border: 'border-gray-200',   badge: 'bg-gray-100 text-gray-500',    btn: 'bg-gray-400 cursor-not-allowed',   light: 'bg-gray-100' },
  pink:   { bg: 'bg-pink-50',   border: 'border-pink-200',   badge: 'bg-pink-100 text-pink-700',    btn: 'bg-pink-600 hover:bg-pink-700',    light: 'bg-pink-100' },
  orange: { bg: 'bg-orange-50', border: 'border-orange-200', badge: 'bg-orange-100 text-orange-700', btn: 'bg-orange-600 hover:bg-orange-700', light: 'bg-orange-100' },
  amber:  { bg: 'bg-amber-50',  border: 'border-amber-300',  badge: 'bg-amber-100 text-amber-800',  btn: 'bg-amber-600 hover:bg-amber-700',  light: 'bg-amber-100' },
  indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', badge: 'bg-indigo-100 text-indigo-700', btn: 'bg-indigo-600 hover:bg-indigo-700', light: 'bg-indigo-100' },
  teal:   { bg: 'bg-teal-50',   border: 'border-teal-200',   badge: 'bg-teal-100 text-teal-700',    btn: 'bg-teal-600 hover:bg-teal-700',    light: 'bg-teal-100' },
};

import apps from '../data/apps';

export { colorMap };

function GuideModal({ app, onClose }: { app: AppItem; onClose: () => void }) {
  const [tab, setTab] = useState<'howto' | 'scientific'>('howto');
  const c = colorMap[app.color];
  const g = app.guide!;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className={`flex items-center justify-between px-6 py-4 rounded-t-2xl ${c.bg} border-b ${c.border}`}>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{app.emoji}</span>
            <div>
              <h2 className="text-lg font-bold text-gray-800">{app.name}</h2>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.badge}`}>{app.category}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="text-xs px-3 py-1.5 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition"
            >
              🖨️ Imprimer
            </button>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-2xl leading-none">×</button>
          </div>
        </div>

        <div className="flex border-b border-gray-200 px-6 pt-3 gap-4">
          <button
            onClick={() => setTab('howto')}
            className={`pb-2 text-sm font-semibold border-b-2 transition ${tab === 'howto' ? `border-current ${c.badge.split(' ')[1]}` : 'border-transparent text-gray-400 hover:text-gray-600'}`}
          >
            📋 Mode d'emploi
          </button>
          <button
            onClick={() => setTab('scientific')}
            className={`pb-2 text-sm font-semibold border-b-2 transition ${tab === 'scientific' ? `border-current ${c.badge.split(' ')[1]}` : 'border-transparent text-gray-400 hover:text-gray-600'}`}
          >
            🔬 Ancrage scientifique
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-5 flex-1">
          {tab === 'howto' && (
            <div className="space-y-5">
              {g.howto.steps.map((step, i) => (
                <div key={i}>
                  <h3 className="font-semibold text-gray-800 mb-2">{i + 1}. {step.title}</h3>
                  <ul className="space-y-1">
                    {step.items.map((item, j) => (
                      <li key={j} className="flex gap-2 text-sm text-gray-600">
                        <span className="text-gray-400 mt-0.5">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {g.howto.tip && (
                <div className={`rounded-xl p-4 ${c.light} border ${c.border}`}>
                  <p className="text-sm text-gray-700"><strong>💡 Conseil pédagogique :</strong> {g.howto.tip}</p>
                </div>
              )}
            </div>
          )}

          {tab === 'scientific' && (
            <div className="space-y-5">
              <p className="text-sm text-gray-700 italic border-l-4 border-gray-300 pl-4">{g.scientific.summary}</p>
              {g.scientific.references.map((ref, i) => (
                <div key={i} className={`rounded-xl p-4 ${c.light} border ${c.border}`}>
                  <p className="text-xs font-semibold text-gray-500 mb-1">{ref.citation}</p>
                  <p className="text-sm text-gray-700">« {ref.content} »</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-gray-100 flex justify-end">
          <a
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-lg text-white text-sm font-semibold transition ${c.btn}`}
          >
            Ouvrir {app.name} →
          </a>
        </div>
      </div>
    </div>
  );
}

function AppCard({ app, onGuide }: { app: AppItem; onGuide: (app: AppItem) => void }) {
  const c = colorMap[app.color];
  const available = app.status === 'disponible';

  const btnCls = `flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold transition ${c.btn} ${!available ? 'pointer-events-none' : ''}`;

  const openButton = (
    <a
      href={available ? app.url : undefined}
      target={available ? '_blank' : undefined}
      rel="noopener noreferrer"
      className={btnCls}
    >
      {available ? 'Ouvrir →' : 'Bientôt disponible'}
    </a>
  );

  return (
    <div
      className={`flex flex-col rounded-2xl border-2 ${c.border} ${c.bg} p-6 shadow-sm transition hover:shadow-md`}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Bandeau "En développement" — styles inline pour fiabilité cross-build */}
      {app.devBanner && (
        <div
          className="bg-amber-400 text-amber-900 font-bold tracking-wide shadow-sm"
          style={{
            position: 'absolute',
            top: '14px',
            right: '-28px',
            transform: 'rotate(45deg)',
            fontSize: '9px',
            padding: '2px 36px',
            pointerEvents: 'none',
          }}
        >
          EN DÉVELOPPEMENT
        </div>
      )}
      <div className="flex items-start justify-between mb-3">
        <span className="text-4xl">{app.emoji}</span>
        {app.category && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${c.badge}`}>
            {app.category}
          </span>
        )}
      </div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">{app.name}</h2>
      <p className="text-gray-600 text-sm flex-1 mb-3">{app.description}</p>
      {app.browserNote && (
        <div className="flex items-start gap-2 mb-4 bg-blue-50 border border-blue-200 rounded-lg px-3 py-2">
          <span className="text-base leading-none mt-0.5">🌐</span>
          <p className="text-xs text-blue-700">{app.browserNote}</p>
        </div>
      )}
      <div className="flex gap-2">
        {openButton}
        {app.guide && (
          <button
            onClick={() => onGuide(app)}
            className="px-3 py-2 rounded-lg border-2 border-current text-sm font-semibold transition hover:opacity-80"
            style={{ color: 'inherit' }}
            title="Guide d'utilisation"
          >
            📖
          </button>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [guideApp, setGuideApp] = useState<AppItem | null>(null);

  const appItems   = apps.filter(a => (a.section ?? 'applications') === 'applications');
  const sensiItems = apps.filter(a => a.section === 'sensibilisation');
  const available  = appItems.filter(a => a.status === 'disponible');
  const coming     = appItems.filter(a => a.status === 'bientôt');

  return (
    <>
      {guideApp && <GuideModal app={guideApp} onClose={() => setGuideApp(null)} />}

      <main className="max-w-6xl mx-auto px-6 py-10">
        {sensiItems.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
              <h2 className="text-lg font-semibold text-gray-700">Sensibilisation ({sensiItems.length})</h2>
            </div>
            <p className="text-sm text-gray-500 mb-5 pl-5">
              Outils de mise en situation pour comprendre de l'intérieur les défis des élèves à besoins spécifiques.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sensiItems.map(app => <AppCard key={app.id} app={app} onGuide={setGuideApp} />)}
            </div>
          </section>
        )}

        <section className="mb-12">
          <h2 className="text-lg font-semibold text-gray-700 mb-5 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
            Applications disponibles ({available.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {available.map(app => <AppCard key={app.id} app={app} onGuide={setGuideApp} />)}
          </div>
        </section>

        {coming.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-gray-400 mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gray-300 inline-block"></span>
              Prochainement ({coming.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {coming.map(app => <AppCard key={app.id} app={app} onGuide={setGuideApp} />)}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
