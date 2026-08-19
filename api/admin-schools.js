// api/admin-schools.js — Gestion des accès école pour le portail (CRUD sur portail_ecoles)
// Toute écriture nécessite ADMIN_PASSWORD (comparé côté serveur) et utilise la clé
// service role — jamais exposée au frontend.
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function slugify(nom) {
  return nom
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // retire les accents (é -> e, etc.)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function randomSuffix() {
  return Math.random().toString(36).slice(2, 6);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!process.env.ADMIN_PASSWORD) {
    return res.status(500).json({ error: 'Configuration serveur invalide.' });
  }

  const { action, password } = req.body || {};

  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Mot de passe incorrect.' });
  }

  try {
    if (action === 'list') {
      const { data, error } = await supabase
        .from('portail_ecoles')
        .select('code, nom, apps_debloquees')
        .order('nom', { ascending: true });
      if (error) throw error;
      return res.status(200).json({ ecoles: data });
    }

    if (action === 'create') {
      const { nom } = req.body || {};
      if (typeof nom !== 'string' || !nom.trim()) {
        return res.status(400).json({ error: 'Nom d\'école requis.' });
      }
      const code = `${slugify(nom)}-${randomSuffix()}`;
      const { data, error } = await supabase
        .from('portail_ecoles')
        .insert({ code, nom: nom.trim(), apps_debloquees: [] })
        .select('code, nom, apps_debloquees')
        .single();
      if (error) throw error;
      return res.status(200).json({
        ecole: data,
        lien: `https://portail-plai.vercel.app/?ecole=${data.code}`,
      });
    }

    if (action === 'update') {
      const { code, apps_debloquees } = req.body || {};
      if (
        typeof code !== 'string' ||
        !code.trim() ||
        !Array.isArray(apps_debloquees) ||
        !apps_debloquees.every((a) => typeof a === 'string')
      ) {
        return res.status(400).json({ error: 'Paramètres invalides.' });
      }
      const { error } = await supabase
        .from('portail_ecoles')
        .update({ apps_debloquees })
        .eq('code', code);
      if (error) throw error;
      return res.status(200).json({ ok: true });
    }

    return res.status(400).json({ error: 'Action inconnue.' });
  } catch (err) {
    return res.status(500).json({ error: 'Erreur serveur.' });
  }
}
