import React, { useState } from 'react';

export default function EmailSequencerApp() {
  const [goal, setGoal] = useState('');
  const [tone, setTone] = useState('');
  const [context, setContext] = useState('');
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateEmail = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('https://email-ai-backend-d5y2.onrender.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal, tone, context }),
      });

      const data = await response.json();
      if (data.email) {
        setGeneratedEmail(data.email);
      } else {
        setError('An error occurred. Please try again.');
      }
    } catch (err) {
      setError('Failed to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>AI Email Sequencer</h1>
      <input value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="Goal (e.g., Recruit)" style={{ width: '100%', marginBottom: '1rem' }} />
      <input value={tone} onChange={(e) => setTone(e.target.value)} placeholder="Tone (e.g., Friendly)" style={{ width: '100%', marginBottom: '1rem' }} />
      <textarea value={context} onChange={(e) => setContext(e.target.value)} placeholder="Context..." rows={4} style={{ width: '100%', marginBottom: '1rem' }} />
      <button onClick={handleGenerateEmail} disabled={loading} style={{ padding: '0.5rem 1rem' }}>
        {loading ? 'Generating...' : 'Generate with AI'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <textarea value={generatedEmail} readOnly placeholder="Generated email will appear here..." rows={6} style={{ width: '100%', marginTop: '1rem' }} />
    </div>
  );
}
