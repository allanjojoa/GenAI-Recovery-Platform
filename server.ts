import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import { KNOWLEDGE_BASE } from './src/data/knowledgeBase';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Helper to initialize Gemini SDK safely
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY environment variable is not set. Fallback mode will be used.');
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// 1. Get Knowledge Base Topics
app.get('/api/kb', (_req, res) => {
  const kbSummary = KNOWLEDGE_BASE.map(item => ({
    id: item.id,
    topic: item.topic,
    category: item.category,
    summary: item.summary,
    source: item.source,
  }));
  res.json({ success: true, data: kbSummary });
});

// 2. Emergency Script Generation API
app.post('/api/triage/script', async (req, res) => {
  const { experience, location, need, recipientRole } = req.body;

  const role = recipientRole || 'trusted contact';
  const exp = experience || 'distress';
  const loc = location || 'alone';

  // Fallback generator in case API is unavailable or fails
  const generateFallback = () => {
    let script = `Hey, I'm feeling severe ${exp.toLowerCase()} right now and I'm ${loc.toLowerCase()}. Could you please call or check in on me as soon as you see this? I need support.`;
    if (exp.toLowerCase().includes('overdose') || loc.toLowerCase().includes('danger')) {
      script = `URGENT: I am experiencing physical distress or overdose risk right now and I am ${loc.toLowerCase()}. Please call emergency services (911) or come check on me immediately.`;
    } else if (need && need.toLowerCase().includes('caregiver')) {
      script = `Hi, I am reaching out as a supporter. Someone I care about is experiencing ${exp.toLowerCase()} right now and needs calm assistance. Please call me back.`;
    }
    return script;
  };

  try {
    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        success: true,
        script: generateFallback(),
        isFallback: true,
        wordCount: generateFallback().split(' ').length,
        recipientRole: role,
        category: exp,
      });
    }

    const prompt = `User current state: ${exp}. Location/Context: ${loc}. Goal: ${need || 'Emergency check-in'}. Message recipient: ${role}.
Generate an emergency first-person SMS message that is under 35 words. Keep it simple, natural, and clear.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        systemInstruction:
          'You generate short, first-person SMS messages for people experiencing severe recovery distress, panic, or cravings. The message MUST be under 35 words. Do NOT use quotes, markdown formatting, subject lines, or placeholders like [Name]. Output strictly the plain message text.',
        temperature: 0.7,
      },
    });

    const generatedText = response.text ? response.text.trim().replace(/^["']|["']$/g, '') : generateFallback();
    const wordCount = generatedText.split(/\s+/).filter(Boolean).length;

    return res.json({
      success: true,
      script: generatedText,
      wordCount,
      recipientRole: role,
      category: exp,
      isFallback: false,
    });
  } catch (err) {
    console.error('Error generating crisis script:', err);
    const fallbackScript = generateFallback();
    return res.json({
      success: true,
      script: fallbackScript,
      isFallback: true,
      wordCount: fallbackScript.split(' ').length,
      recipientRole: role,
      category: exp,
    });
  }
});

// 3. Grounded RAG Q&A API
app.post('/api/qa/ask', async (req, res) => {
  const { topicId } = req.body;

  const item = KNOWLEDGE_BASE.find(k => k.id === topicId) || KNOWLEDGE_BASE[0];

  try {
    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        success: true,
        topic: item.topic,
        answer: item.summary,
        passage: item.text,
        source: item.source,
        isFallback: true,
      });
    }

    const prompt = `Passage:\n${item.text}\n\nQuestion:\n${item.topic}\n\nAnswer the question using ONLY the provided passage.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        systemInstruction:
          'You are a RAG assistant. Answer using ONLY the provided passage. If the passage does not cover the question, state that you do not have that information. Keep the response gentle, clear, accurate, and concise (2 to 3 sentences).',
        temperature: 0.2,
      },
    });

    const answerText = response.text ? response.text.trim() : item.summary;

    return res.json({
      success: true,
      topic: item.topic,
      answer: answerText,
      passage: item.text,
      source: item.source,
      isFallback: false,
    });
  } catch (err) {
    console.error('Error in Q&A API:', err);
    return res.json({
      success: true,
      topic: item.topic,
      answer: item.summary,
      passage: item.text,
      source: item.source,
      isFallback: true,
    });
  }
});

// Setup Vite or Static File Serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
