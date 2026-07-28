import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BANDEAU_INDIVIDUALISATION, FALC_DISCLAIMER } from '../data/parentsFiches';
import type { DecodeurResponse, LangueDecodeur } from '../types';

const MAX_INPUT_CHARS = 4000;

const LANGUES_DECODEUR: { id: LangueDecodeur; label: string }[] = [
  { id: 'turc', label: 'Türkçe' },
  { id: 'arabe', label: 'العربية' },
  { id: 'albanais', label: 'Shqip' },
  { id: 'ukrainien', label: 'Українська' },
];

export default function DecodeurPia() {
  const [texte, setTexte] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [falc, setFalc] = useState(false);
  const [result, setResult] = useState<DecodeurResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [langue, setLangue] = useState<LangueDecodeur | null>(null);
  const [traduction, setTraduction] = useState<string | null>(null);
  const [translating, setTranslating] = useState(false);
  const [translateError, setTranslateError] = useState<string | null>(null);

  const tooLong = texte.length > MAX_INPUT_CHARS;
  const canSubmit = confirmed && texte.trim().length > 0 && !tooLong && !loading;

  async function decoder() {
    if (!canSubmit) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setLangue(null);
    setTraduction(null);
    setTranslateError(null);
    try {
      const res = await fetch('/api/decodeur', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texte }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur inconnue.');
      setResult({ clair: data.clair, falc: data.falc });
      setFalc(false);
    } catch {
      setError("Le Décodeur n'a pas pu décoder ce texte. Réessayez dans un instant.");
    } finally {
      setLoading(false);
    }
  }

  async function traduireEn(cible: LangueDecodeur) {
    if (!result || translating) return;
    setLangue(cible);
    setTranslating(true);
    setTranslateError(null);
    setTraduction(null);
    try {
      const texteAffiche = falc ? result.falc : result.clair;
      const res = await fetch('/api/decodeur-langue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texte: texteAffiche, langue: cible }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur inconnue.');
      setTraduction(data.traduction);
    } catch {
      setTranslateError("La traduction n'a pas pu aboutir. Réessayez dans un instant.");
    } finally {
      setTranslating(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="mb-4">
        <Link to="/parents" className="text-sm font-medium text-[#134e4a] hover:underline">
          ← Espace Parents
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-[#134e4a] mb-3">🔍 Le Décodeur PIA / bulletin</h1>

      <div className="text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 mb-6">
        {BANDEAU_INDIVIDUALISATION}
      </div>

      <div className="text-sm text-blue-900 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 mb-4">
        Collez un extrait de PIA, de bulletin ou de rapport scolaire ci-dessous. <strong>Remplacez le nom de votre enfant par « [enfant] »</strong> avant de coller le texte — rien n'est conservé après le décodage, mais mieux vaut ne jamais envoyer de nom réel.
      </div>

      <label htmlFor="decodeur-checkbox" className="flex items-start gap-2 mb-4 text-sm text-gray-700">
        <input
          id="decodeur-checkbox"
          type="checkbox"
          checked={confirmed}
          onChange={(e) => setConfirmed(e.target.checked)}
          className="mt-1"
        />
        J'ai retiré le nom de mon enfant du texte ci-dessous.
      </label>

      <label htmlFor="decodeur-textarea" className="sr-only">
        Texte à décoder
      </label>
      <textarea
        id="decodeur-textarea"
        value={texte}
        onChange={(e) => setTexte(e.target.value)}
        rows={8}
        placeholder="Ex. : L'élève bénéficie d'un aménagement raisonnable de type organisationnel prévoyant un tiers-temps supplémentaire lors des évaluations écrites…"
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#134e4a] mb-1"
      />
      <div className={`text-xs mb-4 ${tooLong ? 'text-red-600' : 'text-gray-400'}`}>
        {texte.length} / {MAX_INPUT_CHARS} caractères{tooLong ? ' — texte trop long' : ''}
      </div>

      <button
        onClick={decoder}
        disabled={!canSubmit}
        className="rounded-lg px-5 py-2.5 text-white font-semibold text-sm disabled:opacity-40 mb-8"
        style={{ backgroundColor: '#134e4a' }}
      >
        {loading ? 'Décodage en cours…' : 'Décoder'}
      </button>

      {error && <div className="text-sm text-red-600 mb-6">{error}</div>}

      {result && (
        <div>
          <div className="flex items-center justify-between gap-4 mb-3">
            <h2 className="text-xl font-bold text-[#134e4a]">Décodage</h2>
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
          <p className="text-lg leading-relaxed text-gray-800 whitespace-pre-wrap mb-2">
            {falc ? result.falc : result.clair}
          </p>
          <div className="text-xs text-gray-500 mb-6">{FALC_DISCLAIMER}</div>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="text-sm text-gray-600 mr-1">Traduire en :</span>
            {LANGUES_DECODEUR.map((l) => (
              <button
                key={l.id}
                onClick={() => traduireEn(l.id)}
                disabled={translating}
                className={`text-sm font-semibold px-4 py-2 rounded-full border transition disabled:opacity-40 ${
                  langue === l.id ? 'bg-[#134e4a] text-white border-[#134e4a]' : 'bg-white text-[#134e4a] border-[#134e4a]'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          {translating && <div className="text-sm text-gray-500 mb-6">Traduction en cours…</div>}
          {translateError && <div className="text-sm text-red-600 mb-6">{translateError}</div>}

          {traduction && !translating && (
            <p className="text-lg leading-relaxed text-gray-800 whitespace-pre-wrap mb-8" dir="auto">
              {traduction}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
