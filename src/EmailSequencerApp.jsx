// EmailSequencerApp.jsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Button } from '../components/ui/button';

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
      console.error("Request failed:", err); // Debug error log
      setError('Failed to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">AI Email Sequencer</h1>

      <Tabs defaultValue="compose">
        <TabsList>
          <TabsTrigger value="compose">Compose Email</TabsTrigger>
          <TabsTrigger value="sequence">Follow-Up Setup</TabsTrigger>
        </TabsList>

        <TabsContent value="compose">
          <Card>
            <CardContent className="space-y-4 p-4">
              <h2 className="text-xl font-semibold">Compose AI Outreach Email</h2>
              <Input value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="Goal (e.g., Recruit, Demo, Connect)" />
              <Input value={tone} onChange={(e) => setTone(e.target.value)} placeholder="Tone (e.g., Professional, Friendly)" />
              <Textarea value={context} onChange={(e) => setContext(e.target.value)} placeholder="Describe your product, target, or context..." rows={4} />
              <Button onClick={handleGenerateEmail} disabled={loading}>{loading ? 'Generating...' : 'Generate with AI'}</Button>
              {error && <p className="text-red-500">{error}</p>}
              <Textarea value={generatedEmail} readOnly placeholder="Generated email will appear here..." rows={6} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sequence">
          <Card>
            <CardContent className="space-y-4 p-4">
              <h2 className="text-xl font-semibold">Set Up Follow-Up (Coming Soon)</h2>
              <p className="text-gray-500">This feature will allow you to set up timed follow-up emails automatically.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
