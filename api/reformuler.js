// api/reformuler.js
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const MAX_INPUT_CHARS = 4000;
const MAX_CONTEXTE_CHARS = 1000;

const ALLOWED_CHAMPS = {
  retroaction: {
    niveau: ['1re', '2e', '3e', '4e', '5e', '6e'],
    ton: ['encourageant', 'neutre', 'exigeant'],
  },
  consigne: {
    profil_eleve: ['DYS', 'TDAH', 'DYS + TDAH', 'difficulté générale'],
    longueur: ['3 phrases max', '5 phrases max', '7 phrases max'],
  },
  parents: {
    registre: ['formel', 'accessible'],
    objet: ['progrès', 'difficulté', 'rendez-vous'],
  },
  synthese: {
    type_contenu: ['cours', 'réunion', 'observation élève'],
  },
};

const SYSTEM_PROMPTS = {
  retroaction: (champs) =>
    `Tu es un assistant pédagogique. Reformule le texte dicté par l'enseignant en une rétroaction destinée à un élève de ${champs.niveau} secondaire. Ton : ${champs.ton}. Style direct, sans preamble, sans transition LLM. Maximum 150 mots.`,

  consigne: (champs) =>
    `Tu es un assistant pédagogique. Reformule le texte dicté en une consigne claire et accessible pour un élève avec profil ${champs.profil_eleve}. Longueur : ${champs.longueur}. Phrases courtes, structure visuelle claire (numérotation si nécessaire). Sans preamble.`,

  parents: (champs) =>
    `Tu es un assistant pédagogique. Reformule le texte dicté en un message destiné aux parents d'élève. Registre : ${champs.registre}. Objet : ${champs.objet}. Ton professionnel et bienveillant. Sans preamble. Maximum 120 mots.`,

  synthese: (champs) =>
    `Tu es un assistant pédagogique. Transforme le texte oral dicté en une synthèse écrite structurée. Type de contenu : ${champs.type_contenu}. Utilise des puces ou un plan court. Sans preamble. Conserve tous les points essentiels mentionnés.`,
};

function validateChamps(profilId, champs) {
  const allowed = ALLOWED_CHAMPS[profilId];
  if (!allowed) return null;
  const validated = {};
  for (const [key, allowedValues] of Object.entries(allowed)) {
    const value = champs?.[key];
    if (!value || !allowedValues.includes(value)) {
      return `Valeur invalide ou manquante pour le champ "${key}".`;
    }
    validated[key] = value;
  }
  return validated;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { texte, profilId, champs, contexte } = req.body;

  if (!texte || !profilId || !contexte) {
    return res.status(400).json({ error: 'Paramètres manquants : texte, profilId, contexte requis.' });
  }

  if (texte.length > MAX_INPUT_CHARS) {
    return res.status(400).json({ error: `Texte trop long (max ${MAX_INPUT_CHARS} caractères).` });
  }

  if (contexte.length > MAX_CONTEXTE_CHARS) {
    return res.status(400).json({ error: `Contexte trop long (max ${MAX_CONTEXTE_CHARS} caractères).` });
  }

  const systemPromptFn = SYSTEM_PROMPTS[profilId];
  if (!systemPromptFn) {
    return res.status(400).json({ error: 'Profil inconnu.' });
  }

  const champsValidated = validateChamps(profilId, champs);
  if (!champsValidated || typeof champsValidated === 'string') {
    return res.status(400).json({ error: champsValidated || 'Validation des champs échouée.' });
  }

  const systemPrompt = systemPromptFn(champsValidated);
  const userMessage = `Texte dicté :\n${texte}\n\nContexte de l'enseignant :\n${contexte}`;

  const modele = profilId === 'retroaction' && champsValidated.niveau && ['5e', '6e'].includes(champsValidated.niveau)
    ? 'claude-sonnet-4-6'
    : 'claude-haiku-4-5-20251001';

  try {
    const message = await client.messages.create({
      model: modele,
      max_tokens: 500,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    });

    const resultat = message.content[0]?.text || '';
    return res.status(200).json({ resultat });
  } catch (err) {
    return res.status(500).json({ error: 'Erreur lors de la reformulation.' });
  }
}
