// src/pages/Admin.tsx
import { useEffect, useState } from 'react';
import apps from '../data/apps';

type Ecole = { code: string; nom: string; apps_debloquees: string[] };

const gatedApps = apps.filter(a => a.gated);

async function callApi(body: Record<string, unknown>) {
  const res = await fetch('/api/admin-schools', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erreur inconnue.');
  return data;
}

export default function Admin() {
  const [password, setPassword] = useState(() => sessionStorage.getItem('plai_admin_password') || '');
  const [authed, setAuthed] = useState(false);
  const [ecoles, setEcoles] = useState<Ecole[]>([]);
  const [error, setError] = useState('');
  const [nouveauNom, setNouveauNom] = useState('');
  const [dernierLien, setDernierLien] = useState('');

  async function chargerEcoles(pwd: string) {
    setError('');
    try {
      const data = await callApi({ action: 'list', password: pwd });
      setEcoles(data.ecoles);
      setAuthed(true);
      sessionStorage.setItem('plai_admin_password', pwd);
    } catch (err) {
      setAuthed(false);
      setError((err as Error).message);
    }
  }

  useEffect(() => {
    if (password) chargerEcoles(password);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function toggleApp(ecole: Ecole, appId: string) {
    const apps_debloquees = ecole.apps_debloquees.includes(appId)
      ? ecole.apps_debloquees.filter(id => id !== appId)
      : [...ecole.apps_debloquees, appId];
    setEcoles(prev => prev.map(e => (e.code === ecole.code ? { ...e, apps_debloquees } : e)));
    try {
      await callApi({ action: 'update', password, code: ecole.code, apps_debloquees });
    } catch (err) {
      const message = (err as Error).message;
      await chargerEcoles(password);
      setError(message);
    }
  }

  async function creerEcole() {
    if (!nouveauNom.trim()) return;
    try {
      const data = await callApi({ action: 'create', password, nom: nouveauNom.trim() });
      setDernierLien(data.lien);
      setNouveauNom('');
      await chargerEcoles(password);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  if (!authed) {
    return (
      <main className="max-w-md mx-auto px-6 py-16">
        <h1 className="text-xl font-bold text-gray-800 mb-4">Administration — Accès écoles</h1>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Mot de passe"
          className="w-full border-2 border-gray-300 rounded-lg px-3 py-2 mb-3"
        />
        <button
          onClick={() => chargerEcoles(password)}
          className="w-full bg-teal-600 text-white rounded-lg px-4 py-2 font-semibold"
        >
          Entrer
        </button>
        {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-xl font-bold text-gray-800 mb-6">Administration — Accès écoles</h1>
      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      <section className="mb-10 border-2 border-gray-200 rounded-xl p-4">
        <h2 className="font-semibold text-gray-700 mb-3">+ Nouvelle école</h2>
        <div className="flex gap-2">
          <input
            value={nouveauNom}
            onChange={e => setNouveauNom(e.target.value)}
            placeholder="Nom de l'école"
            className="flex-1 border-2 border-gray-300 rounded-lg px-3 py-2"
          />
          <button onClick={creerEcole} className="bg-teal-600 text-white rounded-lg px-4 py-2 font-semibold">
            Créer
          </button>
        </div>
        {dernierLien && (
          <p className="text-sm text-gray-600 mt-3">
            Lien à envoyer : <code className="bg-gray-100 px-2 py-1 rounded">{dernierLien}</code>
          </p>
        )}
      </section>

      <div className="space-y-6">
        {ecoles.map(ecole => (
          <div key={ecole.code} className="border-2 border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800">{ecole.nom}</h3>
              <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                https://portail-plai.vercel.app/?ecole={ecole.code}
              </code>
            </div>
            <div className="flex flex-wrap gap-3">
              {gatedApps.map(app => (
                <label key={app.id} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={ecole.apps_debloquees.includes(app.id)}
                    onChange={() => toggleApp(ecole, app.id)}
                  />
                  {app.emoji} {app.name}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
