import { useState } from "react";

export default function StuckButton({ topic, lesson }) {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function getHelp() {
    if (loading) return;
    setLoading(true);
    setOpen(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-5',
          max_tokens: 400,
          system: 'You are a friendly tutor. Explain the concept in the simulation in simple everyday language. Use an analogy. Keep it to 3-4 sentences. No equations.',
          messages: [{ role: 'user', content: 'I am looking at a simulation of ' + lesson.title + ' in ' + topic.title + '. Explain what is happening in simple terms and what I should look for.' }],
        }),
      });
      const data = await res.json();
      setResponse(data.content[0].text);
    } catch(e) {
      setResponse('Try adjusting the sliders and observe what changes. Focus on how the variables relate to each other.');
    }
    setLoading(false);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <button
        onClick={getHelp}
        disabled={loading}
        style={{
          padding: '8px 16px', borderRadius: 8,
          border: '0.5px solid rgba(255,255,255,0.2)',
          background: loading ? 'rgba(255,255,255,0.05)' : 'rgba(55,138,221,0.15)',
          color: loading ? 'rgba(255,255,255,0.4)' : '#378ADD',
          fontSize: 13, cursor: loading ? 'not-allowed' : 'pointer',
          fontFamily: 'system-ui, sans-serif', alignSelf: 'flex-start'
        }}>
        {loading ? 'Getting help...' : open ? 'Ask again' : 'I am stuck — explain this to me'}
      </button>
      {open && response && (
        <div style={{
          padding: '12px 14px', borderRadius: 8,
          background: 'rgba(55,138,221,0.08)',
          border: '0.5px solid rgba(55,138,221,0.25)',
          fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 1.7
        }}>
          {response}
        </div>
      )}
    </div>
  );
}