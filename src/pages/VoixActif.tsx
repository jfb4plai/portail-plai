// src/pages/VoixActif.tsx
import { useState } from 'react';
import { PROFILS } from '../data/profils';

type ChampValues = Record<string, string>;

export default function VoixActif() {
  const [texte, setTexte] = useState('');
  const [profilId, setProfilId] = useState(PROFILS[0].id);
  const [champs, setChamps] = useState<ChampValues>({});
  const [contexte, setContexte] = useState('');
  const [resultat, setResultat] = useState('');
  const [loading, setLoading] = useState(false);
  const [erreur, setErreur] = useState('');
  const [onboardingVisible, setOnboardingVisible] = useState(
    () => localStorage.getItem('voixactif_onboarding_dismissed') !== '1'
  );

  const profil = PROFILS.find((p) => p.id === profilId)!;
  const peutReformuler = texte.trim().length > 0 && contexte.trim().length > 0;

  function handleProfilChange(id: string) {
    setProfilId(id);
    setChamps({});
    setResultat('');
    setErreur('');
  }

  function handleChampChange(champId: string, value: string) {
    setChamps((prev) => ({ ...prev, [champId]: value }));
  }

  function dismissOnboarding() {
    localStorage.setItem('voixactif_onboarding_dismissed', '1');
    setOnboardingVisible(false);
  }

  async function handleReformuler() {
    setLoading(true);
    setErreur('');
    setResultat('');
    try {
      const res = await fetch('/api/reformuler', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texte, profilId, champs, contexte }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErreur(data.error || 'Erreur inattendue.');
      } else {
        setResultat(data.resultat);
      }
    } catch {
      setErreur('Impossible de contacter le serveur.');
    } finally {
      setLoading(false);
    }
  }

  async function handleCopier() {
    await navigator.clipboard.writeText(resultat);
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <div>
        <h2 className="text-2xl font-bold" style={{ color: '#0a9370' }}>
          VoixActif
        </h2>
        <p className="text-gray-600 mt-1">
          Dictez avec votre outil STT, collez ici, reformulez en un clic.
        </p>
      </div>

      {/* Onboarding Handy */}
      {onboardingVisible && (
        <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 text-sm text-teal-800 flex justify-between items-start gap-4">
          <span>
            Nouveau ?{' '}
            <a
              href="https://github.com/cjpais/Handy"
              target="_blank"
              rel="noreferrer"
              className="underline font-medium"
            >
              Installez Handy
            </a>{' '}
            pour dicter directement dans cette zone via un raccourci clavier (offline, gratuit).
          </span>
          <button
            onClick={dismissOnboarding}
            className="text-teal-600 hover:text-teal-800 font-medium flex-shrink-0"
          >
            ✕
          </button>
        </div>
      )}

      {/* Zone texte source */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Texte dicté
        </label>
        <textarea
          className="w-full border rounded-lg p-3 text-base resize-y min-h-[120px] focus:outline-none focus:ring-2 focus:ring-[#0a9370]"
          placeholder="Collez ici votre texte dicté..."
          value={texte}
          onChange={(e) => setTexte(e.target.value)}
          maxLength={4000}
        />
        <p className="text-xs text-gray-400 text-right">{texte.length}/4000</p>
      </div>

      {/* Sélection profil */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Profil pédagogique
        </label>
        <div className="flex flex-wrap gap-2">
          {PROFILS.map((p) => (
            <button
              key={p.id}
              onClick={() => handleProfilChange(p.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                profilId === p.id
                  ? 'text-white border-transparent'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-teal-400'
              }`}
              style={profilId === p.id ? { backgroundColor: '#0a9370', borderColor: '#0a9370' } : {}}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Champs structurés */}
      {profil.champsStructures.map((champ) => (
        <div key={champ.id}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {champ.label}
          </label>
          <div className="flex flex-wrap gap-2">
            {champ.options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleChampChange(champ.id, opt)}
                className={`px-3 py-1.5 rounded-md text-sm border transition-colors ${
                  champs[champ.id] === opt
                    ? 'text-white border-transparent'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-orange-400'
                }`}
                style={
                  champs[champ.id] === opt
                    ? { backgroundColor: '#f97316', borderColor: '#f97316' }
                    : {}
                }
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Champ libre obligatoire */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {profil.champLibreLabel}{' '}
          <span className="text-red-500">*</span>
        </label>
        <textarea
          className="w-full border rounded-lg p-3 text-base resize-y min-h-[80px] focus:outline-none focus:ring-2"
          placeholder={profil.champLibrePlaceholder}
          value={contexte}
          onChange={(e) => setContexte(e.target.value)}
          maxLength={1000}
        />
        <div className="flex justify-between items-center mt-1">
          {!contexte.trim() ? (
            <p className="text-xs text-red-400">
              Ce champ est obligatoire pour activer la reformulation.
            </p>
          ) : (
            <span />
          )}
          <p className="text-xs text-gray-400">{contexte.length}/1000</p>
        </div>
      </div>

      {/* Bouton reformuler */}
      <button
        onClick={handleReformuler}
        disabled={!peutReformuler || loading}
        className="w-full py-3 rounded-lg font-semibold text-white transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ backgroundColor: '#0a9370' }}
      >
        {loading ? 'Reformulation en cours...' : 'Reformuler'}
      </button>

      {/* Erreur */}
      {erreur && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded p-3">
          {erreur}
        </p>
      )}

      {/* Zone résultat éditable */}
      {resultat && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Résultat — à relire et ajuster avant utilisation
          </label>
          <textarea
            className="w-full border-2 rounded-lg p-3 text-base resize-y min-h-[140px] focus:outline-none"
            style={{ borderColor: '#0a9370' }}
            value={resultat}
            onChange={(e) => setResultat(e.target.value)}
          />
          <button
            onClick={handleCopier}
            className="mt-2 px-4 py-2 rounded-lg text-sm font-medium text-white"
            style={{ backgroundColor: '#f97316' }}
          >
            Copier
          </button>
        </div>
      )}
    </main>
  );
}
