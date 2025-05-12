import React, { useState, useEffect } from 'react';

export default function EmailSequencerApp() {
  const [goal, setGoal] = useState('');
  const [tone, setTone] = useState('');
  const [context, setContext] = useState('');
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log("Frontend loaded and ready!");
  }, []);

  const handleGenerateEmail = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('https://email-ai-backend-d5y2.onrender.com/api/generate-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goal, tone, context }),
      });

      const data = await response.json();
      console.log("API response:", data); // Debug log

      if (data.email) {
        setGeneratedEmail(data.email);
      } else {
        console.warn("No email returned:", data);
        setError('An error occurred. Please try again.');
      }
    } catch (err) {
      console.error("Request failed:", err);
      setError('Failed to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>AI Email Sequencer</h1>

      <label>
        Goal:
        <input
          type="text"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="e.g., Book meetings"
          style={{ width: '100%', marginBottom: '1rem' }}
        />
      </label>

      <label>
        Tone:
        <input
          type="text"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          placeholder="e.g., Friendly"
          style={{ width: '100%', marginBottom: '1rem' }}
        />
      </label>

      <label>
        Context:
        <textarea
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="Describe your product or business context..."
          rows={4}
          style={{ width: '100%', marginBottom: '1rem' }}
        />
      </label>

      <button
        onClick={handleGenerateEmail}
        disabled={loading}
        style={{ padding: '0.5rem 1rem', marginBottom: '1rem' }}
      >
        {loading ? 'Generating...' : 'Generate with AI'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <textarea
        value={generatedEmail}
        readOnly
        placeholder="Your AI-generated email will appear here."
        rows={6}
        style={{ width: '100%' }}
      />
    </div>
  );
}
