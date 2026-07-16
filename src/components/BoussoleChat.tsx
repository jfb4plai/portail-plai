import { useState, useRef, useEffect } from 'react';

type ChatMessage = { role: 'user' | 'assistant'; content: string };

const TEAL = '#0a9370';
const ORANGE = '#f97316';

const GREETING: ChatMessage = {
  role: 'assistant',
  content:
    "Bonjour, je suis Copernic 🧭. Décrivez ce que vous cherchez — une difficulté d'élève, une matière, un objectif — et je vous oriente vers l'application PLAI adaptée. Si je ne trouve pas, je vous le dirai directement.",
};

export default function BoussoleChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const history = [...messages, { role: 'user' as const, content: text }];
    setMessages(history);
    setInput('');
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/boussole', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erreur inconnue.');
      setMessages([...history, { role: 'assistant', content: data.reply }]);
    } catch {
      setError("Copernic n'a pas pu répondre. Réessayez dans un instant.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <div
          className="w-[min(380px,calc(100vw-3rem))] h-[min(560px,calc(100vh-8rem))] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
          role="dialog"
          aria-label="Chat avec Copernic, assistant du portail PLAI"
        >
          <div
            className="px-4 py-3 flex items-center justify-between text-white flex-shrink-0"
            style={{ backgroundColor: TEAL }}
          >
            <div>
              <p className="font-bold text-base leading-tight">🧭 Copernic</p>
              <p className="text-xs text-white/80 leading-tight">Boussole pédagogique et inclusive</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Fermer le chat"
              className="text-white/80 hover:text-white text-xl leading-none px-2"
            >
              ×
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-xl px-3 py-2 text-[15px] leading-snug whitespace-pre-wrap ${
                  m.role === 'user'
                    ? 'ml-auto text-white'
                    : 'mr-auto bg-white border border-gray-200 text-gray-800'
                }`}
                style={m.role === 'user' ? { backgroundColor: TEAL } : undefined}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="mr-auto bg-white border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-500">
                Copernic réfléchit…
              </div>
            )}
            {error && <div className="mr-auto text-sm text-red-600 px-1">{error}</div>}
          </div>

          <div className="p-3 border-t border-gray-200 flex gap-2 flex-shrink-0">
            <label htmlFor="boussole-input" className="sr-only">
              Votre message pour Copernic
            </label>
            <textarea
              id="boussole-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Ex. : mon élève confond les chiffres, il est dyscalculique…"
              rows={1}
              className="flex-1 resize-none rounded-lg border border-gray-300 px-3 py-2 text-[15px] focus:outline-none focus:ring-2"
              style={{ '--tw-ring-color': TEAL } as React.CSSProperties}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              aria-label="Envoyer le message"
              className="rounded-lg px-4 py-2 text-white font-medium text-sm disabled:opacity-40 flex-shrink-0"
              style={{ backgroundColor: ORANGE }}
            >
              Envoyer
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2">
        {!isOpen && (
          <span className="hidden sm:block bg-white text-gray-700 text-sm px-3 py-2 rounded-full shadow-md border border-gray-200 max-w-[220px] leading-snug">
            🧭 Besoin d'aide pour choisir une appli ?
          </span>
        )}
        <button
          onClick={() => setIsOpen((v) => !v)}
          aria-label={isOpen ? 'Fermer Copernic' : 'Ouvrir Copernic, assistant du portail PLAI'}
          className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl text-white flex-shrink-0"
          style={{ backgroundColor: TEAL }}
        >
          {isOpen ? '×' : '🧭'}
        </button>
      </div>
    </div>
  );
}
