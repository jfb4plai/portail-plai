// api/decodeur-langue.ts — Traduction du texte déjà décodé, pour l'Espace Parents
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const MODEL = 'claude-haiku-4-5';
const MAX_INPUT_CHARS = 4000;

const LANGUES = {
  turc: 'turc',
  arabe: 'arabe',
  albanais: 'albanais',
  ukrainien: 'ukrainien',
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { texte, langue } = req.body || {};
  if (typeof texte !== 'string' || !texte.trim()) {
    return res.status(400).json({ error: 'Paramètre texte requis.' });
  }
  if (texte.length > MAX_INPUT_CHARS) {
    return res.status(400).json({ error: `Texte trop long (max ${MAX_INPUT_CHARS} caractères).` });
  }
  if (typeof langue !== 'string' || !LANGUES[langue]) {
    return res.status(400).json({ error: 'Langue non prise en charge.' });
  }

  const system = `Tu traduis un texte déjà rédigé en français clair vers le ${LANGUES[langue]}, pour un parent d'élève en Fédération Wallonie-Bruxelles. Traduis fidèlement, sans ajouter ni retirer d'information. Réponds uniquement par la traduction, sans aucun texte autour, sans préambule.`;

  try {
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 800,
      system,
      messages: [{ role: 'user', content: texte }],
    });

    const traduction = response.content[0]?.text || '';
    if (!traduction) throw new Error('Réponse vide.');

    return res.status(200).json({ traduction });
  } catch (err) {
    return res.status(500).json({ error: 'Erreur lors de la traduction.' });
  }
}
