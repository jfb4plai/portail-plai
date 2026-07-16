// api/boussole.js — Copernic, l'assistant d'orientation du portail PLAI
import Anthropic from '@anthropic-ai/sdk';
import apps from '../src/data/apps';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const MODEL = 'claude-haiku-4-5';
const MAX_MESSAGE_CHARS = 500;
const MAX_HISTORY_TURNS = 12;
const CONTACT_EMAIL = 'jeanfrancois.beguin@ens.ecl.be';

const STATUS_LABELS = {
  bientôt: '🚧 Bientôt disponible',
  'en-développement': '🚧 En développement',
};

const OUT_OF_SCOPE_MESSAGE =
  "Ce champ n'est pas encore couvert par le portail PLAI. Envoyez un email à " +
  CONTACT_EMAIL +
  ' pour signaler votre demande.';

const RGPD_NOTE =
  "\n\n---\n🔒 RGPD : aucune donnée d'élève ne doit être saisie dans ce chat. " +
  "Les applis PLAI utilisent des codes anonymes pour les élèves, jamais de nom.";

function statusBadge(app) {
  const parts = [];
  if (app.isNew) parts.push('🆕 Nouveau');
  const label = STATUS_LABELS[app.status];
  if (label) parts.push(label);
  return parts.length ? ` (${parts.join(' · ')})` : '';
}

function buildIndex() {
  return apps.map((a) => ({
    id: a.id,
    nom: a.name,
    categorie: a.category,
    description: a.description,
    statut: a.status,
    nouveau: !!a.isNew,
  }));
}

function finalize(text, appIds = []) {
  const badgeLine = appIds
    .map((id) => apps.find((a) => a.id === id))
    .filter(Boolean)
    .map((a) => `${a.name}${statusBadge(a)} — ${a.url}`)
    .join('\n');
  return `${text}${badgeLine ? `\n\n${badgeLine}` : ''}${RGPD_NOTE}`;
}

function sanitizeHistory(messages) {
  let trimmed = messages.slice(-MAX_HISTORY_TURNS);
  // L'API Claude exige que le premier message soit "user".
  while (trimmed.length && trimmed[0].role !== 'user') {
    trimmed = trimmed.slice(1);
  }
  return trimmed;
}

async function routeQuery(messages) {
  const system = `Tu es le module d'orientation de Copernic, l'assistant du portail PLAI (Pôle Liégeois d'Accompagnement vers une École Inclusive). Ton rôle : orienter l'enseignant vers la bonne application parmi celles listées ci-dessous — jamais en dehors de cette liste.

Applications disponibles (JSON) :
${JSON.stringify(buildIndex())}

Règles :
- Si la demande est trop vague pour identifier une application, pose une question de clarification courte et concrète (propose 2-3 pistes si possible).
- Si une ou plusieurs applications correspondent clairement, indique leurs id (1 à 2 maximum).
- Si la demande ne correspond à aucune application listée, indique-le.

Réponds UNIQUEMENT par un objet JSON strict, sans aucun texte autour :
{"action": "clarify" | "apps" | "none", "question": "...", "appIds": ["..."]}`;

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 300,
    system,
    messages,
  });

  const raw = response.content[0]?.text || '{}';
  try {
    const parsed = JSON.parse(raw);
    if (parsed.action === 'apps' && Array.isArray(parsed.appIds) && parsed.appIds.length) {
      return parsed;
    }
    if (parsed.action === 'clarify' && typeof parsed.question === 'string' && parsed.question) {
      return parsed;
    }
    return { action: 'none' };
  } catch {
    return { action: 'clarify', question: raw.slice(0, 300) };
  }
}

function buildGuideContext(selected) {
  return selected
    .map((a) => {
      const g = a.guide;
      const refs =
        g?.scientific?.references?.map((r) => `- ${r.citation} : ${r.content}`).join('\n') ||
        'non renseignées';
      const steps =
        g?.howto?.steps
          ?.map((s) => `${s.title} :\n${s.items.map((i) => `  - ${i}`).join('\n')}`)
          .join('\n') || 'non renseigné';
      return `### ${a.name} (${a.url})
Description : ${a.description}
Résumé scientifique : ${g?.scientific?.summary || 'non renseigné'}
Références :
${refs}
Mode d'emploi :
${steps}
${g?.howto?.tip ? `Astuce : ${g.howto.tip}` : ''}`;
    })
    .join('\n\n');
}

async function answerFromGuides(messages, appIds) {
  const selected = appIds.map((id) => apps.find((a) => a.id === id)).filter(Boolean);
  if (!selected.length) return null;

  const system = `Tu es Copernic, l'assistant du portail PLAI. Réponds à la question de l'enseignant en te basant STRICTEMENT sur les informations ci-dessous (mode d'emploi et ancrage scientifique). N'invente aucune information en dehors de ce texte — si le texte ne répond pas à la question, dis-le. Style direct, sans préambule ("Voici", "Bien sûr"), sans transition d'IA.

${buildGuideContext(selected)}`;

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 600,
    system,
    messages,
  });

  return response.content[0]?.text || '';
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Paramètre messages requis.' });
  }

  const trimmed = sanitizeHistory(messages);
  const lastMessage = trimmed[trimmed.length - 1];
  if (typeof lastMessage?.content !== 'string' || !lastMessage.content.trim()) {
    return res.status(400).json({ error: 'Message vide.' });
  }
  if (lastMessage.content.length > MAX_MESSAGE_CHARS) {
    return res.status(400).json({ error: `Message trop long (max ${MAX_MESSAGE_CHARS} caractères).` });
  }

  try {
    const decision = await routeQuery(trimmed);

    if (decision.action === 'apps') {
      const answer = await answerFromGuides(trimmed, decision.appIds);
      if (answer) {
        return res.status(200).json({ reply: finalize(answer, decision.appIds) });
      }
    }

    if (decision.action === 'clarify') {
      return res.status(200).json({ reply: finalize(decision.question) });
    }

    return res.status(200).json({ reply: finalize(OUT_OF_SCOPE_MESSAGE) });
  } catch (err) {
    return res.status(500).json({ error: 'Erreur lors de la génération de la réponse.' });
  }
}
