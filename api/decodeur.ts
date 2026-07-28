// api/decodeur.ts — Décodeur PIA/bulletin, assistant de décodage pour l'Espace Parents
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const MODEL = 'claude-haiku-4-5';
const MAX_INPUT_CHARS = 4000;

const RGPD_NOTE =
  "\n\n---\n🔒 Ceci n'est pas une interprétation officielle. En cas de doute, vérifiez avec l'enseignant ou le CPMS. Aucune donnée n'est conservée après cette réponse.";

let guideDroitsCache = null;
async function getGuideDroits() {
  if (!guideDroitsCache) {
    const mod = await import('../src/data/guideDroits.js');
    guideDroitsCache = mod.default;
  }
  return guideDroitsCache;
}

function buildGuideContext(guideDroits) {
  return guideDroits.sections.map((s) => `### ${s.titre}\n${s.clair}`).join('\n\n');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { texte } = req.body || {};
  if (typeof texte !== 'string' || !texte.trim()) {
    return res.status(400).json({ error: 'Paramètre texte requis.' });
  }
  if (texte.length > MAX_INPUT_CHARS) {
    return res.status(400).json({ error: `Texte trop long (max ${MAX_INPUT_CHARS} caractères).` });
  }

  try {
    const guideDroits = await getGuideDroits();

    const system = `Tu es le Décodeur, l'assistant de décodage de l'Espace Parents du portail PLAI. Un parent te soumet un extrait de PIA, de bulletin ou de rapport scolaire déjà rédigé par l'école. Ta tâche : le décoder en langage clair, puis en version FALC (Facile à Lire et à Comprendre), sans jamais inventer d'information absente du texte fourni.

Règles strictes :
- Ne jamais ajouter d'information ou d'interprétation qui ne figure pas explicitement dans le texte fourni.
- Ne jamais formuler de conseil juridique ni de recommandation médicale. Si le texte soulève une question de ce type, indique-le et renvoie vers le Guide des droits du portail (/parents/droits) et vers le dialogue avec l'enseignant ou le CPMS — jamais de réponse juridique ou médicale directe.
- Si un nom propre d'enfant apparaît dans le texte, ne jamais le répéter dans ta réponse — remplace-le par "l'enfant" ou "il/elle".
- Style direct, sans préambule ("Voici", "Bien sûr"), sans transition d'IA.
- La version FALC utilise des phrases courtes, une idée par phrase.

Contexte de référence — définitions déjà publiées sur le portail (reste cohérent avec elles) :
${buildGuideContext(guideDroits)}

Réponds UNIQUEMENT par un objet JSON strict, sans aucun texte autour :
{"clair": "...", "falc": "..."}`;

    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 800,
      system,
      messages: [{ role: 'user', content: texte }],
      output_config: {
        format: {
          type: 'json_schema',
          schema: {
            type: 'object',
            properties: {
              clair: { type: 'string' },
              falc: { type: 'string' },
            },
            required: ['clair', 'falc'],
            additionalProperties: false,
          },
        },
      },
    });

    const raw = response.content[0]?.text || '{}';
    const parsed = JSON.parse(raw);
    if (typeof parsed.clair !== 'string' || typeof parsed.falc !== 'string') {
      throw new Error('Réponse invalide.');
    }

    return res.status(200).json({
      clair: parsed.clair + RGPD_NOTE,
      falc: parsed.falc + RGPD_NOTE,
    });
  } catch (err) {
    return res.status(500).json({ error: 'Erreur lors du décodage.' });
  }
}
